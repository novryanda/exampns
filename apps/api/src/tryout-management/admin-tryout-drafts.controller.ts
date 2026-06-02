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

@Roles('ADMIN')
@Controller('admin/tryout-drafts')
export class AdminTryoutDraftsController {
  constructor(private readonly tryoutManagementService: TryoutManagementService) {}

  @Get()
  async listDrafts(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.tryoutManagementService.listAdminTryoutDrafts(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDraft(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    return apiData(
      await this.tryoutManagementService.createAdminTryoutDraft(body, actor),
      'Tryout draft berhasil dibuat',
    );
  }

  @Get(':tryoutDraftId')
  async getDraftDetail(
    @Param('tryoutDraftId') tryoutDraftId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.getAdminTryoutDraftDetail(tryoutDraftId));
  }

  @Patch(':tryoutDraftId')
  async updateDraft(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.updateAdminTryoutDraft(tryoutDraftId, body, actor);
    return apiMessage('Tryout draft berhasil diperbarui');
  }

  @Post(':tryoutDraftId/duplicate')
  async duplicateDraft(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string }>> {
    const duplicated = await this.tryoutManagementService.duplicateAdminTryoutDraft(
      tryoutDraftId,
      actor,
    );
    return apiData({ id: duplicated.id }, 'Tryout draft berhasil diduplikasi');
  }

  @Post(':tryoutDraftId/submit')
  async submitDraft(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.submitAdminTryoutDraft(tryoutDraftId, actor);
    return apiMessage('Tryout draft berhasil dikirim untuk review');
  }

  @Post(':tryoutDraftId/archive')
  async archiveDraft(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.archiveAdminTryoutDraft(tryoutDraftId, actor);
    return apiMessage('Tryout draft berhasil dihapus dari daftar draft');
  }

  @Get(':tryoutDraftId/generation-rule')
  async getDraftGenerationRule(
    @Param('tryoutDraftId') tryoutDraftId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.tryoutManagementService.getAdminDraftGenerationRule(tryoutDraftId),
    );
  }

  @Post(':tryoutDraftId/generation-rule')
  async upsertDraftGenerationRule(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @Body() body: unknown,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.upsertAdminDraftGenerationRule(tryoutDraftId, body);
    return apiMessage('Tryout generation rule draft berhasil disimpan');
  }

  @Get(':tryoutDraftId/manual-question-set')
  async getWorkingManualQuestionSet(
    @Param('tryoutDraftId') tryoutDraftId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.tryoutManagementService.getAdminDraftWorkingManualQuestionSet(tryoutDraftId),
    );
  }

  @Post(':tryoutDraftId/manual-question-set')
  @HttpCode(HttpStatus.CREATED)
  async createWorkingManualQuestionSet(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    return apiData(
      await this.tryoutManagementService.upsertAdminDraftWorkingManualQuestionSet(
        tryoutDraftId,
        body,
        actor,
      ),
      'Manual question set draft berhasil dibuat',
    );
  }

  @Patch(':tryoutDraftId/manual-question-set')
  async updateWorkingManualQuestionSet(
    @Param('tryoutDraftId') tryoutDraftId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.upsertAdminDraftWorkingManualQuestionSet(
      tryoutDraftId,
      body,
      actor,
    );
    return apiMessage('Manual question set draft berhasil diperbarui');
  }

  @Get(':tryoutDraftId/availability-check')
  async runDraftAvailabilityCheck(
    @Param('tryoutDraftId') tryoutDraftId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.tryoutManagementService.runAdminDraftAvailabilityCheck(tryoutDraftId),
    );
  }
}
