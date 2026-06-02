import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ActivationSource,
  PaymentStatus,
  SubscriptionStatus,
  SubscriptionTier,
  type Prisma,
  type UserRole,
} from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AccessResolverService } from '../common/access-resolver.service.js';
import { getSubscriptionTierSnapshot } from '../common/access-control.helpers.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  addDays,
  buildInvoiceNumber,
  buildPaymentUrl,
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
  constructor(
    private readonly prisma: PrismaService,
    private readonly accessResolverService: AccessResolverService,
    private readonly validationService: ValidationService,
  ) {}

  async listSubscriptionPlans() {
    const plans = await this.prisma.subscriptionPlan.findMany({
      where: {
        isActive: true,
        tier: {
          in: [SubscriptionTier.standard, SubscriptionTier.premium],
        },
      },
      orderBy: [{ price: 'asc' }, { createdAt: 'asc' }],
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      durationDays: plan.durationDays,
      price: Number(plan.price),
      currency: plan.currency,
      tier: plan.tier,
      isTrial: plan.isTrial,
      isActive: plan.isActive,
    }));
  }

  async getMySubscription(actor: AuthenticatedUser) {
    const [accessResolution, subscription] = await Promise.all([
      this.accessResolverService.resolveEffectiveAccessLevel(actor.id),
      this.prisma.userSubscription.findFirst({
        where: {
          userId: actor.id,
        },
        include: {
          subscriptionPlan: true,
        },
        orderBy: [{ endDate: 'desc' }, { createdAt: 'desc' }],
      }),
    ]);

    if (!subscription) {
      return {
        status: null,
        isTrial: false,
        tier: null,
        accessLevel: 'expired',
        accessSource: 'none',
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
      tier: getSubscriptionTierSnapshot(subscription),
      accessLevel: accessResolution.effectiveAccessLevel,
      accessSource: accessResolution.effectiveAccessSource,
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
        code: 'PLAN_NOT_FOUND',
        message: 'Plan tidak ditemukan',
      });
    }

    if (!plan.isActive || plan.tier === SubscriptionTier.trial || plan.isTrial) {
      throw new ConflictException({
        code: 'PLAN_INACTIVE',
        message: 'Plan tidak aktif',
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
        code: 'PLAN_DOWNGRADE_NOT_ALLOWED',
        message: 'Akses premium aktif tidak bisa diturunkan ke plan standard.',
      });
    }

    const sequence = (await this.prisma.paymentTransaction.count()) + 1;
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const gatewayProvider = process.env.PAYMENT_GATEWAY_PROVIDER?.trim() || 'manual';
    const paymentBaseUrl =
      process.env.PAYMENT_GATEWAY_BASE_URL?.trim() || 'https://payment-gateway.example';

    try {
      const transaction = await this.prisma.paymentTransaction.create({
        data: {
          userId: actor.id,
          subscriptionPlanId: plan.id,
          idempotencyKey: normalizedIdempotencyKey,
          invoiceNumber: buildInvoiceNumber(sequence, now),
          gatewayProvider,
          amount: plan.price,
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

      const paymentUrl = buildPaymentUrl(paymentBaseUrl, transaction.id);
      const updated = await this.prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          paymentUrl,
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
        code: 'PAYMENT_GATEWAY_ERROR',
        message: 'Gagal membuat pembayaran',
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
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      paidAt: payment.paidAt,
      subscriptionActivated: Boolean(payment.userSubscriptionId && payment.userSubscription),
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
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        createdAt: payment.createdAt,
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
    const signature = this.getHeaderValue(headers, 'x-signature');
    const gatewayEventId =
      this.getHeaderValue(headers, 'x-gateway-event-id') || payload.eventId || payload.invoiceNumber;
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET?.trim();
    const signatureValid = verifyWebhookSignature(payload, signature, webhookSecret);

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
      where: { invoiceNumber: payload.invoiceNumber },
      include: {
        subscriptionPlan: true,
        userSubscription: true,
      },
    });

    const mappedStatus = mapWebhookStatusToPaymentStatus(payload.status);

    const webhookEvent = await this.prisma.paymentWebhookEvent.create({
      data: {
        paymentTransactionId: payment?.id ?? null,
        gatewayEventId,
        eventType: `${provider}.${payload.status}`.slice(0, 100),
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
              activePaidSubscription.endDate > new Date()
                ? activePaidSubscription.endDate
                : new Date();
            const updatedSubscription = await tx.userSubscription.update({
              where: { id: activePaidSubscription.id },
              data: {
                endDate: addDays(baseDate, payment.subscriptionPlan.durationDays),
              },
            });
            activatedSubscriptionId = updatedSubscription.id;
          } else {
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
            activatedSubscriptionId = createdSubscription.id;
          }
        } else {
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
          activatedSubscriptionId = createdSubscription.id;
        }
      }

      await tx.paymentTransaction.update({
        where: { id: payment.id },
        data: {
          gatewayProvider: provider.slice(0, 50),
          gatewayTransactionId: payload.transactionId ?? payment.gatewayTransactionId,
          paymentMethod: payload.paymentMethod ?? payment.paymentMethod,
          status: mappedStatus,
          paidAt: mappedStatus === PaymentStatus.success && payload.paidAt ? new Date(payload.paidAt) : payment.paidAt,
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

  private toCheckoutResponse(
    payment: {
      id: string;
      invoiceNumber: string;
      amount: Prisma.Decimal;
      currency: string;
      status: PaymentStatus;
      paymentMethod: string | null;
      paymentUrl: string | null;
      expiredAt: Date | null;
    },
  ) {
    return {
      paymentTransactionId: payment.id,
      invoiceNumber: payment.invoiceNumber,
      amount: Number(payment.amount),
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      paymentUrl: payment.paymentUrl,
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
