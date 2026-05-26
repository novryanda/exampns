import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiPaginated,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { OperationsService } from './operations.service.js';

@Roles('ADMIN', 'SUPER_ADMIN')
@Controller('admin')
export class AdminMonitoringController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('dashboard/summary')
  async getDashboardSummary(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getAdminDashboardSummary(actor));
  }

  @Roles('SUPER_ADMIN')
  @Get('users')
  async listUsers(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.listUsersForMonitoring(query);
    return apiPaginated(result.data, result.meta);
  }

  @Roles('SUPER_ADMIN')
  @Get('users/:userId')
  async getUserDetail(
    @Param('userId') userId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getUserDetailForAdmin(userId));
  }

  @Roles('SUPER_ADMIN')
  @Get('transactions')
  async listTransactions(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.listTransactionsForMonitoring(query);
    return apiPaginated(result.data, result.meta);
  }

  @Get('audit-logs/me')
  async getMyAuditLogs(
    @CurrentUser() actor: AuthenticatedUser,
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.getAdminSelfAuditLogs(actor, query);
    return apiPaginated(result.data, result.meta);
  }
}
