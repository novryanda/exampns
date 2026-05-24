import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { apiData, type ApiSuccessResponse } from '../common/api-response.js';
import { OperationsService } from './operations.service.js';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('summary')
  async getSummary(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.operationsService.getUserDashboardSummary(actor));
  }
}
