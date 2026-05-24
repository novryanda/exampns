import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';
export declare class ManualQuestionSetController {
    private readonly tryoutManagementService;
    constructor(tryoutManagementService: TryoutManagementService);
    listManualQuestionSets(tryoutCatalogId: string): Promise<ApiSuccessResponse<unknown[]>>;
    createManualQuestionSet(tryoutCatalogId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
        status: string;
    }>>;
    getManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string): Promise<ApiSuccessResponse<unknown>>;
    updateManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    archiveManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string): Promise<ApiMessageResponse>;
}
