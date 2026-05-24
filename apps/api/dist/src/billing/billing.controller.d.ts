import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { BillingService } from './billing.service.js';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    listSubscriptionPlans(): Promise<ApiSuccessResponse<unknown[]>>;
    getMySubscription(actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    createCheckout(body: unknown, idempotencyKey: string | undefined, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    getPaymentStatus(paymentTransactionId: string, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    listMyPaymentHistory(query: Record<string, unknown>, actor: AuthenticatedUser): Promise<ApiPaginatedResponse<unknown[]>>;
    handlePaymentWebhook(provider: string, body: unknown, headers: Record<string, string | string[] | undefined>): Promise<ApiMessageResponse>;
}
