import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiSuccessResponse } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';
export declare class DashboardController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
    getSummary(actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
}
