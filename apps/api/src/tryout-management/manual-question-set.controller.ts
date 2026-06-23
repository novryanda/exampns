import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';

@Roles('ADMIN')
@Controller('admin/tryout-catalogs/:tryoutCatalogId/manual-question-sets')
export class ManualQuestionSetController {
  constructor(private readonly tryoutManagementService: TryoutManagementService) {}

  @Get()
  async listManualQuestionSets(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.tryoutManagementService.listManualQuestionSets(tryoutCatalogId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    return apiData(
      await this.tryoutManagementService.createManualQuestionSet(tryoutCatalogId, body, actor),
      'Manual question set berhasil dibuat',
    );
  }

  @Get(':manualQuestionSetId')
  async getManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Param('manualQuestionSetId') manualQuestionSetId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.tryoutManagementService.getManualQuestionSet(
        tryoutCatalogId,
        manualQuestionSetId,
      ),
    );
  }

  @Patch(':manualQuestionSetId')
  async updateManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Param('manualQuestionSetId') manualQuestionSetId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.updateManualQuestionSet(
      tryoutCatalogId,
      manualQuestionSetId,
      body,
      actor,
    );
    return apiMessage('Manual question set berhasil diperbarui');
  }

  @Delete(':manualQuestionSetId')
  async archiveManualQuestionSet(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
    @Param('manualQuestionSetId') manualQuestionSetId: string,
  ): Promise<ApiMessageResponse> {
    await this.tryoutManagementService.archiveManualQuestionSet(
      tryoutCatalogId,
      manualQuestionSetId,
    );
    return apiMessage('Manual question set berhasil diarsipkan');
  }
}
