import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import midtransClient from 'midtrans-client';
import {
  ActivationSource,
  PaymentStatus,
  SubscriptionStatus,
  SubscriptionTier,
  type Prisma,
  type UserRole,
} from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { PartnerService } from '../partner/partner.service.js';
import {
  addDays,
  buildInvoiceNumber,
  computeDaysRemaining,
  computeTryoutRemaining,
  isSubscriptionCurrentlyActive,
  mapWebhookStatusToPaymentStatus,
  statusAllowsSubscriptionActivation,
  verifyWebhookSignature,
} from './billing.helpers.js';
import {
  createCheckoutSchema,
  listPaymentHistoryQuerySchema,
  paymentWebhookSchema,
} from './billing.schemas.js';

@Injectable()
export class BillingService {
  private readonly snap: midtransClient.Snap;

  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ValidationService,
    private readonly partnerService: PartnerService,
  ) {
    this.snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY || '',
      clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
    });
  }

  async listSubscriptionPlans(showOnLandingPage?: boolean) {
    const plans = await this.prisma.subscriptionPlan.findMany({
      where: {
        isActive: true,
        ...(showOnLandingPage ? { showOnLandingPage: true } : {}),
      },
      orderBy: [{ price: 'asc' }, { createdAt: 'asc' }],
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      tier: plan.tier,
      durationDays: plan.durationDays,
      price: Number(plan.price),
      currency: plan.currency,
      isTrial: plan.isTrial,
      isActive: plan.isActive,
      features: plan.features,
      isPopular: plan.isPopular,
    }));
  }

  async getMySubscription(actor: AuthenticatedUser) {
    const subscription = await this.prisma.userSubscription.findFirst({
      where: {
        userId: actor.id,
      },
      include: {
        subscriptionPlan: true,
      },
      orderBy: [{ endDate: 'desc' }, { createdAt: 'desc' }],
    });

    if (!subscription) {
      return {
        status: null,
        isTrial: false,
        planName: null,
        startDate: null,
        endDate: null,
        tryoutLimit: null,
        tryoutUsed: 0,
        tryoutRemaining: null,
        daysRemaining: 0,
      };
    }

    return {
      status: subscription.status,
      isTrial: subscription.isTrial,
      planName: subscription.subscriptionPlan.name,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      tryoutLimit: subscription.tryoutLimit,
      tryoutUsed: subscription.tryoutUsed,
      tryoutRemaining: computeTryoutRemaining(subscription.tryoutLimit, subscription.tryoutUsed),
      daysRemaining: isSubscriptionCurrentlyActive(subscription.status, subscription.endDate)
        ? computeDaysRemaining(subscription.endDate)
        : 0,
    };
  }

  async previewReferral(rawQuery: unknown) {
    return this.partnerService.previewReferral(rawQuery);
  }

  async createCheckout(
    actor: AuthenticatedUser,
    rawBody: unknown,
    idempotencyKey?: string,
  ) {
    const payload = this.validationService.validate(createCheckoutSchema, rawBody);
    const normalizedIdempotencyKey = idempotencyKey?.trim() || undefined;

    if (normalizedIdempotencyKey) {
      const existingTransaction = await this.prisma.paymentTransaction.findFirst({
        where: {
          userId: actor.id,
          idempotencyKey: normalizedIdempotencyKey,
        },
        include: {
          subscriptionPlan: true,
        },
      });

      if (existingTransaction) {
        return this.toCheckoutResponse(existingTransaction);
      }
    }

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: payload.subscriptionPlanId },
    });

    if (!plan) {
      throw new NotFoundException({
        success: false,
        message: 'Plan tidak ditemukan',
        error: {
          code: 'PLAN_NOT_FOUND',
        },
      });
    }

    if (!plan.isActive || plan.tier === SubscriptionTier.trial || plan.isTrial) {
      throw new ConflictException({
        success: false,
        message: 'Plan tidak aktif',
        error: {
          code: 'PLAN_INACTIVE',
        },
      });
    }

    const activePaidSubscription = await this.prisma.userSubscription.findFirst({
      where: {
        userId: actor.id,
        status: SubscriptionStatus.active,
        endDate: {
          gt: new Date(),
        },
        tierSnapshot: {
          in: [SubscriptionTier.standard, SubscriptionTier.premium],
        },
      },
      orderBy: [{ tierSnapshot: 'desc' }, { endDate: 'desc' }, { createdAt: 'desc' }],
    });

    if (
      activePaidSubscription?.tierSnapshot === SubscriptionTier.premium &&
      plan.tier === SubscriptionTier.standard
    ) {
      throw new ConflictException({
        success: false,
        message: 'Akses premium aktif tidak bisa diturunkan ke plan standard.',
        error: {
          code: 'PLAN_DOWNGRADE_NOT_ALLOWED',
        },
      });
    }

    const referralQuote = await this.partnerService.resolveReferralForCheckout(
      plan,
      payload.referralCode,
    );
    const checkoutPricing = referralQuote ?? {
      originalAmount: Number(plan.price),
      discountAmount: 0,
      finalAmount: Number(plan.price),
      commissionAmount: null,
      referralCodeId: null,
      code: null,
      discountType: null,
      discountValue: null,
      commissionType: null,
      commissionValue: null,
    };

    // Reuse existing pending invoice for the same plan (avoid duplicate charges)
    const existingPendingTransaction = await this.prisma.paymentTransaction.findFirst({
      where: {
        userId: actor.id,
        subscriptionPlanId: payload.subscriptionPlanId,
        referralCodeId: checkoutPricing.referralCodeId,
        referralCodeSnapshot: checkoutPricing.code,
        amount: checkoutPricing.finalAmount,
        discountAmount: checkoutPricing.discountAmount,
        status: PaymentStatus.pending,
        expiredAt: {
          gt: new Date(),
        },
      },
      include: {
        subscriptionPlan: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existingPendingTransaction) {
      return this.toCheckoutResponse(existingPendingTransaction);
    }

    const sequence = (await this.prisma.paymentTransaction.count()) + 1;
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const gatewayProvider = 'midtrans';
    const frontendUrl = process.env.FRONTEND_URL?.trim() || 'http://localhost:3000';

    try {
      const transaction = await this.prisma.paymentTransaction.create({
        data: {
          userId: actor.id,
          subscriptionPlanId: plan.id,
          idempotencyKey: normalizedIdempotencyKey,
          invoiceNumber: buildInvoiceNumber(sequence, now),
          gatewayProvider,
          amount: checkoutPricing.finalAmount,
          originalAmount: checkoutPricing.originalAmount,
          discountAmount: checkoutPricing.discountAmount,
          referralCodeId: checkoutPricing.referralCodeId,
          referralCodeSnapshot: checkoutPricing.code,
          referralDiscountType: checkoutPricing.discountType,
          referralDiscountValue: checkoutPricing.discountValue,
          referralCommissionType: checkoutPricing.commissionType,
          referralCommissionValue: checkoutPricing.commissionValue,
          referralCommissionAmount: checkoutPricing.commissionAmount,
          currency: plan.currency,
          paymentMethod: payload.paymentMethod,
          status: PaymentStatus.pending,
          paymentUrl: 'pending',
          expiredAt,
        },
        include: {
          subscriptionPlan: true,
        },
      });

      const parameter = {
        transaction_details: {
          order_id: transaction.invoiceNumber,
          gross_amount: Number(transaction.amount),
        },
        customer_details: {
          first_name: actor.name.substring(0, 255),
          email: actor.email,
          phone: actor.phone || undefined,
        },
        item_details: [
          {
            id: plan.id,
            price: Number(transaction.amount),
            quantity: 1,
            name: plan.name.substring(0, 50),
          },
        ],
        callbacks: {
          finish: `${frontendUrl}/app/langganan/pembayaran/${transaction.id}`,
        },
      };

      const snapResponse = await this.snap.createTransaction(parameter);
      const paymentUrl = snapResponse.redirect_url;

      const updated = await this.prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          paymentUrl,
          gatewayTransactionId: snapResponse.token,
        },
        include: {
          subscriptionPlan: true,
        },
      });

      return this.toCheckoutResponse(updated);
    } catch (error) {
      if (
        normalizedIdempotencyKey &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        const existingTransaction = await this.prisma.paymentTransaction.findFirst({
          where: {
            userId: actor.id,
            idempotencyKey: normalizedIdempotencyKey,
          },
          include: {
            subscriptionPlan: true,
          },
        });

        if (existingTransaction) {
          return this.toCheckoutResponse(existingTransaction);
        }
      }

      throw new BadRequestException({
        success: false,
        message: 'Gagal membuat pembayaran',
        error: {
          code: 'PAYMENT_GATEWAY_ERROR',
        },
      });
    }
  }

  async getPaymentStatus(paymentTransactionId: string, actor: AuthenticatedUser) {
    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentTransactionId },
      include: {
        subscriptionPlan: true,
        userSubscription: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment transaction not found');
    }

    this.assertPaymentAccess(payment.userId, actor);

    return {
      id: payment.id,
      invoiceNumber: payment.invoiceNumber,
      planName: payment.subscriptionPlan.name,
      amount: Number(payment.amount),
      originalAmount: Number(payment.originalAmount ?? payment.amount),
      discountAmount: Number(payment.discountAmount),
      referralCode: payment.referralCodeSnapshot,
      referralCommissionAmount: Number(payment.referralCommissionAmount ?? 0),
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      paidAt: payment.paidAt,
      expiredAt: payment.expiredAt,
      paymentUrl: payment.paymentUrl,
      subscriptionActivated: Boolean(payment.userSubscriptionId && payment.userSubscription),
    };
  }

  async approvePaymentManually(paymentTransactionId: string, actor: AuthenticatedUser) {
    if (!this.isPrivilegedRole(actor.role)) {
      throw new ForbiddenException('You do not have access to approve this payment');
    }

    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentTransactionId },
      include: {
        subscriptionPlan: true,
        userSubscription: true,
      },
    });

    if (!payment) {
      throw new NotFoundException({
        success: false,
        message: 'Payment transaction not found',
        error: {
          code: 'PAYMENT_NOT_FOUND',
        },
      });
    }

    if (payment.status !== PaymentStatus.pending) {
      throw new ConflictException({
        success: false,
        message: 'Transaksi ini sudah diproses',
        error: {
          code: 'PAYMENT_ALREADY_PROCESSED',
        },
      });
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const activatedSubscriptionId = await this.activateSubscriptionForPayment(tx, payment);
      await this.partnerService.recordCommissionForPayment(tx, payment);
      return tx.paymentTransaction.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.success,
          paidAt: new Date(),
          userSubscriptionId: activatedSubscriptionId,
        },
        include: {
          subscriptionPlan: true,
          userSubscription: true,
        },
      });
    });

    return {
      id: updated.id,
      invoiceNumber: updated.invoiceNumber,
      status: updated.status,
      paidAt: updated.paidAt,
      subscriptionActivated: Boolean(updated.userSubscriptionId && updated.userSubscription),
    };
  }

  async listMyPaymentHistory(actor: AuthenticatedUser, rawQuery: unknown) {
    const query = this.validationService.validate(listPaymentHistoryQuerySchema, rawQuery);
    const skip = (query.page - 1) * query.limit;

    const [payments, totalItems] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where: {
          userId: actor.id,
        },
        include: {
          subscriptionPlan: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: query.limit,
      }),
      this.prisma.paymentTransaction.count({
        where: {
          userId: actor.id,
        },
      }),
    ]);

    return {
      data: payments.map((payment) => ({
        id: payment.id,
        invoiceNumber: payment.invoiceNumber,
        planName: payment.subscriptionPlan.name,
        amount: Number(payment.amount),
        originalAmount: Number(payment.originalAmount ?? payment.amount),
        discountAmount: Number(payment.discountAmount),
        referralCode: payment.referralCodeSnapshot,
        referralCommissionAmount: Number(payment.referralCommissionAmount ?? 0),
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        createdAt: payment.createdAt,
        paymentUrl: payment.status === PaymentStatus.pending ? payment.paymentUrl : null,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async handlePaymentWebhook(
    provider: string,
    rawBody: unknown,
    headers: Record<string, string | string[] | undefined>,
  ) {
    const payload = this.validationService.validate(paymentWebhookSchema, rawBody);
    
    // Midtrans sends signature in payload.signature_key, we don't need header signature
    const webhookSecret = process.env.MIDTRANS_SERVER_KEY?.trim();
    const signatureValid = verifyWebhookSignature(
      payload.order_id,
      payload.status_code,
      payload.gross_amount,
      payload.signature_key,
      webhookSecret
    );

    const gatewayEventId = `${payload.transaction_id || payload.order_id}:${payload.transaction_status}`;

    const existingEvent = await this.prisma.paymentWebhookEvent.findUnique({
      where: { gatewayEventId },
      select: {
        id: true,
      },
    });

    if (existingEvent) {
      return;
    }

    const payment = await this.prisma.paymentTransaction.findUnique({
      where: { invoiceNumber: payload.order_id },
      include: {
        subscriptionPlan: true,
        userSubscription: true,
      },
    });

    const mappedStatus = mapWebhookStatusToPaymentStatus(payload.transaction_status);

    const webhookEvent = await this.prisma.paymentWebhookEvent.create({
      data: {
        paymentTransactionId: payment?.id ?? null,
        gatewayEventId,
        eventType: `${provider}.${payload.transaction_status}`.slice(0, 100),
        payload: rawBody as Prisma.InputJsonValue,
        signatureValid,
        processed: false,
      },
    });

    if (!signatureValid) {
      await this.prisma.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });
      return;
    }

    if (!payment) {
      await this.prisma.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      let activatedSubscriptionId = payment.userSubscriptionId;

      if (statusAllowsSubscriptionActivation(mappedStatus) && !payment.userSubscriptionId) {
        activatedSubscriptionId = await this.activateSubscriptionForPayment(tx, payment);
      }

      if (statusAllowsSubscriptionActivation(mappedStatus)) {
        await this.partnerService.recordCommissionForPayment(tx, payment);
      }

      if (mappedStatus === PaymentStatus.refunded) {
        await this.partnerService.reverseCommissionForPayment(tx, payment);
      }

      await tx.paymentTransaction.update({
        where: { id: payment.id },
        data: {
          gatewayProvider: provider.slice(0, 50),
          gatewayTransactionId: payload.transaction_id ?? payment.gatewayTransactionId,
          paymentMethod: payload.payment_type ?? payment.paymentMethod,
          status: mappedStatus,
          paidAt: mappedStatus === PaymentStatus.success && payload.transaction_time ? new Date(payload.transaction_time) : payment.paidAt,
          userSubscriptionId: activatedSubscriptionId,
        },
      });

      await tx.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });
    });
  }

  private async activateSubscriptionForPayment(
    tx: Prisma.TransactionClient,
    payment: {
      id: string;
      userId: string;
      subscriptionPlanId: string;
      userSubscriptionId: string | null;
      subscriptionPlan: {
        tier: SubscriptionTier;
        durationDays: number;
      };
    },
  ) {
    if (payment.userSubscriptionId) {
      return payment.userSubscriptionId;
    }

    const activePaidSubscription = await tx.userSubscription.findFirst({
      where: {
        userId: payment.userId,
        status: SubscriptionStatus.active,
        endDate: {
          gt: new Date(),
        },
        tierSnapshot: {
          in: [SubscriptionTier.standard, SubscriptionTier.premium],
        },
      },
      orderBy: [{ tierSnapshot: 'desc' }, { endDate: 'desc' }, { createdAt: 'desc' }],
    });

    if (activePaidSubscription) {
      if (
        activePaidSubscription.tierSnapshot === SubscriptionTier.premium &&
        payment.subscriptionPlan.tier === SubscriptionTier.standard
      ) {
        throw new ConflictException('Plan standard tidak bisa mengurangi akses premium yang masih aktif');
      }

      if (activePaidSubscription.tierSnapshot === payment.subscriptionPlan.tier) {
        const baseDate =
          activePaidSubscription.endDate > new Date() ? activePaidSubscription.endDate : new Date();
        const updatedSubscription = await tx.userSubscription.update({
          where: { id: activePaidSubscription.id },
          data: {
            endDate: addDays(baseDate, payment.subscriptionPlan.durationDays),
          },
        });
        return updatedSubscription.id;
      }

      const now = new Date();
      await tx.userSubscription.update({
        where: { id: activePaidSubscription.id },
        data: {
          status: SubscriptionStatus.cancelled,
          endDate: now,
        },
      });

      const createdSubscription = await tx.userSubscription.create({
        data: {
          userId: payment.userId,
          subscriptionPlanId: payment.subscriptionPlanId,
          status: SubscriptionStatus.active,
          startDate: now,
          endDate: addDays(now, payment.subscriptionPlan.durationDays),
          tryoutLimit: null,
          tryoutUsed: 0,
          isTrial: false,
          tierSnapshot: payment.subscriptionPlan.tier,
          activationSource: ActivationSource.payment,
        },
      });
      return createdSubscription.id;
    }

    const now = new Date();
    const createdSubscription = await tx.userSubscription.create({
      data: {
        userId: payment.userId,
        subscriptionPlanId: payment.subscriptionPlanId,
        status: SubscriptionStatus.active,
        startDate: now,
        endDate: addDays(now, payment.subscriptionPlan.durationDays),
        tryoutLimit: null,
        tryoutUsed: 0,
        isTrial: false,
        tierSnapshot: payment.subscriptionPlan.tier,
        activationSource: ActivationSource.payment,
      },
    });
    return createdSubscription.id;
  }

  private toCheckoutResponse(
    payment: {
      id: string;
      invoiceNumber: string;
      amount: Prisma.Decimal | number;
      originalAmount?: Prisma.Decimal | number | null;
      discountAmount?: Prisma.Decimal | number;
      referralCodeSnapshot?: string | null;
      referralCommissionAmount?: Prisma.Decimal | number | null;
      currency: string;
      status: PaymentStatus;
      paymentMethod: string | null;
      paymentUrl: string | null;
      gatewayTransactionId: string | null;
      expiredAt: Date | null;
    },
  ) {
    return {
      paymentTransactionId: payment.id,
      invoiceNumber: payment.invoiceNumber,
      amount: Number(payment.amount),
      originalAmount: Number(payment.originalAmount ?? payment.amount),
      discountAmount: Number(payment.discountAmount ?? 0),
      referralCode: payment.referralCodeSnapshot ?? null,
      referralCommissionAmount: Number(payment.referralCommissionAmount ?? 0),
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      paymentUrl: payment.paymentUrl,
      snapToken: payment.gatewayTransactionId,
      expiredAt: payment.expiredAt,
    };
  }

  private assertPaymentAccess(paymentUserId: string, actor: AuthenticatedUser) {
    if (paymentUserId === actor.id) {
      return;
    }

    if (!this.isPrivilegedRole(actor.role)) {
      throw new ForbiddenException('You do not have access to this payment');
    }
  }

  private isPrivilegedRole(role?: UserRole) {
    return role === 'ADMIN' || role === 'SUPER_ADMIN';
  }

  private getHeaderValue(
    headers: Record<string, string | string[] | undefined>,
    key: string,
  ) {
    const value = headers[key];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }
}
