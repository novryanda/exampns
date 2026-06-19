import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiMessageResponse,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';

@Roles('SUPER_ADMIN')
@Controller('super-admin/tryout-catalogs')
export class TryoutCatalogController {
  constructor(private readonly tryoutManagementService: TryoutManagementService) {}

  @Get()
  async listCatalogs(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.tryoutManagementService.listTryoutCatalogs(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCatalog(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    return apiData(
      await this.tryoutManagementService.createTryoutCatalog(body, actor),
      'Tryout catalog berhasil dibuat',
    );
  }

  @Get(':tryoutCatalogId')
  async getCatalogDetail(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.getTryoutCatalogDetail(tryoutCatalogId));
  }

  @Patch(':tryoutCatalogId')
  async updateCatalog(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.updateTryoutCatalog(tryoutCatalogId, body, actor);
    return apiMessage('Tryout catalog berhasil diperbarui');
  }

  @Post(':tryoutCatalogId/duplicate')
  async duplicateCatalog(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string }>> {
    const duplicated = await this.tryoutManagementService.duplicateTryoutCatalog(
      tryoutCatalogId,
      actor,
    );
    return apiData({ id: duplicated.id }, 'Tryout catalog berhasil diduplikasi');
  }

  @Post(':tryoutCatalogId/submit')
  async submitCatalogForReview(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.submitTryoutCatalogForReview(tryoutCatalogId, actor);
    return apiMessage('Tryout catalog berhasil dipublish');
  }

  @Post(':tryoutCatalogId/publish')
  async publishCatalog(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.publishTryoutCatalog(tryoutCatalogId, actor);
    return apiMessage('Tryout catalog berhasil dipublish');
  }

  @Post(':tryoutCatalogId/archive')
  async archiveCatalog(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.archiveTryoutCatalog(tryoutCatalogId, actor);
    return apiMessage('Tryout catalog berhasil diarsipkan');
  }

  @Get(':tryoutCatalogId/generation-rule')
  async getGenerationRule(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.getGenerationRule(tryoutCatalogId));
  }

  @Post(':tryoutCatalogId/generation-rule')
  async upsertGenerationRule(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Body() body: unknown,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.upsertGenerationRule(tryoutCatalogId, body);
    return apiMessage('Tryout generation rule berhasil disimpan');
  }

  @Get(':tryoutCatalogId/manual-question-set')
  async getWorkingManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.tryoutManagementService.getWorkingManualQuestionSetForBuilder(tryoutCatalogId),
    );
  }

  @Post(':tryoutCatalogId/manual-question-set')
  async upsertWorkingManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.upsertWorkingManualQuestionSetForBuilder(
      tryoutCatalogId,
      body,
      actor,
    );
    return apiMessage('Manual question set builder berhasil disimpan');
  }

  @Patch(':tryoutCatalogId/manual-question-set')
  async patchWorkingManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.upsertWorkingManualQuestionSetForBuilder(
      tryoutCatalogId,
      body,
      actor,
    );
    return apiMessage('Manual question set builder berhasil diperbarui');
  }

  @Get(':tryoutCatalogId/availability-check')
  async runAvailabilityCheck(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.runAvailabilityCheck(tryoutCatalogId));
  }
}
