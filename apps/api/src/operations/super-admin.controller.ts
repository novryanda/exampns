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
  Put,
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
import { QuestionMetadataService } from '../question-metadata/question-metadata.service.js';
import { OperationsService } from './operations.service.js';

@Roles('SUPER_ADMIN')
@Controller('super-admin')
export class SuperAdminController {
  constructor(
    private readonly operationsService: OperationsService,
    private readonly questionMetadataService: QuestionMetadataService,
  ) {}

  @Post('admins')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; email: string; role: string; status: string }>> {
    return apiData(
      await this.operationsService.createAdmin(body, actor),
      'Akun admin dibuat (inactive). Admin harus atur password dari link di email.',
    );
  }

  @Get('admins')
  async listAdmins(
    @Query() query: unknown,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.listAdmins(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async createPlatformUser(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; email: string; role: string; status: string }>> {
    return apiData(
      await this.operationsService.createPlatformUser(body, actor),
      'Akun user dibuat (inactive). User harus atur password dari link di email.',
    );
  }

  @Patch('users/:userId/status')
  async updatePlatformUserStatus(
    @Param('userId') userId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    return apiData(
      await this.operationsService.updatePlatformUserStatus(userId, body, actor),
      'Status user berhasil diperbarui',
    );
  }

  @Delete('users/:userId')
  async deletePlatformUser(
    @Param('userId') userId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.deletePlatformUser(userId, body, actor);
    return apiMessage('User berhasil dihapus');
  }

  @Patch('admins/:adminId/deactivate')
  async deactivateAdmin(
    @Param('adminId') adminId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.deactivateAdmin(adminId, body, actor);
    return apiMessage('Admin berhasil dinonaktifkan');
  }

  @Post('subscription-plans')
  @HttpCode(HttpStatus.CREATED)
  async createSubscriptionPlan(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string }>> {
    return apiData(
      await this.operationsService.createSubscriptionPlan(body, actor),
      'Subscription plan berhasil dibuat',
    );
  }

  @Get('subscription-plans')
  async listSubscriptionPlans(): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.operationsService.listSubscriptionPlansForAdmin());
  }

  @Patch('subscription-plans/:planId')
  async updateSubscriptionPlan(
    @Param('planId') planId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.updateSubscriptionPlan(planId, body, actor);
    return apiMessage('Subscription plan berhasil diperbarui');
  }

  @Get('passing-grade')
  async getPassingGrade(): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getPassingGrade());
  }

  @Put('passing-grade')
  async updatePassingGrade(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.updatePassingGrade(body, actor);
    return apiMessage(
      'Passing grade berhasil diperbarui. Perubahan berlaku untuk ujian baru.',
    );
  }

  @Get('question-categories')
  async listQuestionCategories(): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.questionMetadataService.listCategories(true));
  }

  @Post('question-categories')
  @HttpCode(HttpStatus.CREATED)
  async createQuestionCategory(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.createCategory(body, actor),
      'Kategori soal berhasil dibuat',
    );
  }

  @Patch('question-categories/:categoryId')
  async updateQuestionCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.updateCategory(categoryId, body, actor),
      'Kategori soal berhasil diperbarui',
    );
  }

  @Patch('question-categories/:categoryId/archive')
  async archiveQuestionCategory(
    @Param('categoryId') categoryId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.questionMetadataService.archiveCategory(categoryId, actor);
    return apiMessage('Kategori soal berhasil diarsipkan');
  }

  @Get('trial-config')
  async getTrialConfig(): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getTrialConfig());
  }

  @Get('ai-recommendation-settings')
  async getAiRecommendationSettings(): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getAiRecommendationSettings());
  }

  @Put('trial-config')
  async updateTrialConfig(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.updateTrialConfig(body, actor);
    return apiMessage('Konfigurasi trial berhasil diperbarui');
  }

  @Put('ai-recommendation-settings')
  async updateAiRecommendationSettings(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.operationsService.updateAiRecommendationSettings(body, actor);
    return apiMessage('Konfigurasi AI recommendation berhasil diperbarui');
  }

  @Post('subscriptions/manual-activation')
  @HttpCode(HttpStatus.CREATED)
  async manualSubscriptionActivation(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.operationsService.manualSubscriptionActivation(body, actor),
      'Subscription berhasil diaktifkan secara manual',
    );
  }

  @Post('users/:userId/access-overrides')
  @HttpCode(HttpStatus.CREATED)
  async grantUserAccessOverride(
    @Param('userId') userId: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.operationsService.grantUserAccessOverride(
        {
          ...body,
          userId,
        },
        actor,
      ),
      'Override akses berhasil diberikan',
    );
  }

  @Get('users/:userId/access-overrides')
  async listUserAccessOverrides(
    @Param('userId') userId: string,
  ): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.operationsService.listUserAccessOverrides(userId));
  }

  @Patch('access-overrides/:overrideId/revoke')
  async revokeUserAccessOverride(
    @Param('overrideId') overrideId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.operationsService.revokeUserAccessOverride(overrideId, body, actor),
      'Override akses berhasil dicabut',
    );
  }

  @Get('audit-logs')
  async getAuditLogs(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.getAuditLogs(query);
    return apiPaginated(result.data, result.meta);
  }
}
