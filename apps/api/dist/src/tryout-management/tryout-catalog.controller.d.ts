import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';
export declare class TryoutCatalogController {
    private readonly tryoutManagementService;
    constructor(tryoutManagementService: TryoutManagementService);
    listCatalogs(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    createCatalog(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
        status: string;
    }>>;
    getCatalogDetail(tryoutCatalogId: string): Promise<ApiSuccessResponse<unknown>>;
    updateCatalog(tryoutCatalogId: string, body: unknown): Promise<ApiMessageResponse>;
    duplicateCatalog(tryoutCatalogId: string, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
    }>>;
    publishCatalog(tryoutCatalogId: string, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    archiveCatalog(tryoutCatalogId: string): Promise<ApiMessageResponse>;
    getGenerationRule(tryoutCatalogId: string): Promise<ApiSuccessResponse<unknown>>;
    upsertGenerationRule(tryoutCatalogId: string, body: unknown): Promise<ApiMessageResponse>;
    runAvailabilityCheck(tryoutCatalogId: string): Promise<ApiSuccessResponse<unknown>>;
}
