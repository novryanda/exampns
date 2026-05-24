var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { ActivationSource, PaymentStatus, SubscriptionStatus, } from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { addDays, buildInvoiceNumber, buildPaymentUrl, computeDaysRemaining, computeTryoutRemaining, isSubscriptionCurrentlyActive, mapWebhookStatusToPaymentStatus, statusAllowsSubscriptionActivation, verifyWebhookSignature, } from './billing.helpers.js';
import { createCheckoutSchema, listPaymentHistoryQuerySchema, paymentWebhookSchema, } from './billing.schemas.js';
let BillingService = class BillingService {
    prisma;
    validationService;
    constructor(prisma, validationService) {
        this.prisma = prisma;
        this.validationService = validationService;
    }
    async listSubscriptionPlans() {
        const plans = await this.prisma.subscriptionPlan.findMany({
            where: {
                isActive: true,
                isTrial: false,
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
            isTrial: plan.isTrial,
            isActive: plan.isActive,
        }));
    }
    async getMySubscription(actor) {
        const activeSubscription = await this.prisma.userSubscription.findFirst({
            where: {
                userId: actor.id,
                status: SubscriptionStatus.active,
                endDate: {
                    gt: new Date(),
                },
            },
            include: {
                subscriptionPlan: true,
            },
            orderBy: [{ isTrial: 'desc' }, { endDate: 'desc' }, { createdAt: 'desc' }],
        });
        const subscription = activeSubscription ??
            (await this.prisma.userSubscription.findFirst({
                where: {
                    userId: actor.id,
                },
                include: {
                    subscriptionPlan: true,
                },
                orderBy: [{ endDate: 'desc' }, { createdAt: 'desc' }],
            }));
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
    async createCheckout(actor, rawBody, idempotencyKey) {
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
        if (!plan.isActive || plan.isTrial) {
            throw new ConflictException({
                code: 'PLAN_INACTIVE',
                message: 'Plan tidak aktif',
            });
        }
        const sequence = (await this.prisma.paymentTransaction.count()) + 1;
        const now = new Date();
        const expiredAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        const gatewayProvider = process.env.PAYMENT_GATEWAY_PROVIDER?.trim() || 'manual';
        const paymentBaseUrl = process.env.PAYMENT_GATEWAY_BASE_URL?.trim() || 'https://payment-gateway.example';
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
        }
        catch (error) {
            if (normalizedIdempotencyKey &&
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002') {
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
    async getPaymentStatus(paymentTransactionId, actor) {
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
    async listMyPaymentHistory(actor, rawQuery) {
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
    async handlePaymentWebhook(provider, rawBody, headers) {
        const payload = this.validationService.validate(paymentWebhookSchema, rawBody);
        const signature = this.getHeaderValue(headers, 'x-signature');
        const gatewayEventId = this.getHeaderValue(headers, 'x-gateway-event-id') || payload.eventId || payload.invoiceNumber;
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
                payload: rawBody,
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
                        isTrial: false,
                        status: SubscriptionStatus.active,
                        endDate: {
                            gt: new Date(),
                        },
                    },
                    orderBy: { endDate: 'desc' },
                });
                if (activePaidSubscription) {
                    const baseDate = activePaidSubscription.endDate > new Date()
                        ? activePaidSubscription.endDate
                        : new Date();
                    const updatedSubscription = await tx.userSubscription.update({
                        where: { id: activePaidSubscription.id },
                        data: {
                            endDate: addDays(baseDate, payment.subscriptionPlan.durationDays),
                        },
                    });
                    activatedSubscriptionId = updatedSubscription.id;
                }
                else {
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
    toCheckoutResponse(payment) {
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
    assertPaymentAccess(paymentUserId, actor) {
        if (paymentUserId === actor.id) {
            return;
        }
        if (!this.isPrivilegedRole(actor.role)) {
            throw new ForbiddenException('You do not have access to this payment');
        }
    }
    isPrivilegedRole(role) {
        return role === 'ADMIN' || role === 'SUPER_ADMIN';
    }
    getHeaderValue(headers, key) {
        const value = headers[key];
        if (Array.isArray(value)) {
            return value[0];
        }
        return value;
    }
};
BillingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ValidationService])
], BillingService);
export { BillingService };
//# sourceMappingURL=billing.service.js.map