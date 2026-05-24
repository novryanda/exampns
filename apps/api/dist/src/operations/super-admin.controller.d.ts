import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';
export declare class SuperAdminController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
    createAdmin(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
        email: string;
        role: string;
        status: string;
    }>>;
    listAdmins(): Promise<ApiSuccessResponse<unknown[]>>;
    deactivateAdmin(adminId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    createSubscriptionPlan(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
    }>>;
    updateSubscriptionPlan(planId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    getPassingGrade(): Promise<ApiSuccessResponse<unknown>>;
    updatePassingGrade(body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    getTrialConfig(): Promise<ApiSuccessResponse<unknown>>;
    getAiRecommendationSettings(): Promise<ApiSuccessResponse<unknown>>;
    updateTrialConfig(body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    updateAiRecommendationSettings(body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    manualSubscriptionActivation(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    getAuditLogs(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
}
