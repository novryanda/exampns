import {
  Body,
  Controller,
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
import { OperationsService } from './operations.service.js';

@Roles('SUPER_ADMIN')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post('admins')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; email: string; role: string; status: string }>> {
    return apiData(
      await this.operationsService.createAdmin(body, actor),
      'Akun admin berhasil dibuat',
    );
  }

  @Get('admins')
  async listAdmins(): Promise<ApiSuccessResponse<unknown[]>> {
    return apiData(await this.operationsService.listAdmins());
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

  @Get('audit-logs')
  async getAuditLogs(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.getAuditLogs(query);
    return apiPaginated(result.data, result.meta);
  }
}
