import { Controller, Get, Param, Query } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator.js';
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
  async getDashboardSummary(): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getAdminDashboardSummary());
  }

  @Get('users')
  async listUsers(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.listUsersForMonitoring(query);
    return apiPaginated(result.data, result.meta);
  }

  @Get('users/:userId')
  async getUserDetail(
    @Param('userId') userId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getUserDetailForAdmin(userId));
  }

  @Get('transactions')
  async listTransactions(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.operationsService.listTransactionsForMonitoring(query);
    return apiPaginated(result.data, result.meta);
  }
}
