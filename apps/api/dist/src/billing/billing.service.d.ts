import { PaymentStatus, SubscriptionStatus } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
export declare class BillingService {
    private readonly prisma;
    private readonly validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    listSubscriptionPlans(): Promise<{
        id: string;
        name: string;
        description: string | null;
        durationDays: number;
        price: number;
        currency: string;
        isTrial: boolean;
        isActive: boolean;
    }[]>;
    getMySubscription(actor: AuthenticatedUser): Promise<{
        status: null;
        isTrial: boolean;
        planName: null;
        startDate: null;
        endDate: null;
        tryoutLimit: null;
        tryoutUsed: number;
        tryoutRemaining: null;
        daysRemaining: number;
    } | {
        status: SubscriptionStatus;
        isTrial: boolean;
        planName: string;
        startDate: Date;
        endDate: Date;
        tryoutLimit: number | null;
        tryoutUsed: number;
        tryoutRemaining: number | null;
        daysRemaining: number;
    }>;
    createCheckout(actor: AuthenticatedUser, rawBody: unknown, idempotencyKey?: string): Promise<{
        paymentTransactionId: string;
        invoiceNumber: string;
        amount: number;
        currency: string;
        status: PaymentStatus;
        paymentMethod: string | null;
        paymentUrl: string | null;
        expiredAt: Date | null;
    }>;
    getPaymentStatus(paymentTransactionId: string, actor: AuthenticatedUser): Promise<{
        id: string;
        invoiceNumber: string;
        planName: string;
        amount: number;
        currency: string;
        paymentMethod: string | null;
        status: PaymentStatus;
        paidAt: Date | null;
        subscriptionActivated: boolean;
    }>;
    listMyPaymentHistory(actor: AuthenticatedUser, rawQuery: unknown): Promise<{
        data: {
            id: string;
            invoiceNumber: string;
            planName: string;
            amount: number;
            paymentMethod: string | null;
            status: PaymentStatus;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    handlePaymentWebhook(provider: string, rawBody: unknown, headers: Record<string, string | string[] | undefined>): Promise<void>;
    private toCheckoutResponse;
    private assertPaymentAccess;
    private isPrivilegedRole;
    private getHeaderValue;
}
