import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';
export declare class AdminMonitoringController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
    getDashboardSummary(actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    listUsers(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    getUserDetail(userId: string): Promise<ApiSuccessResponse<unknown>>;
    listTransactions(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    getMyAuditLogs(actor: AuthenticatedUser, query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
}
