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
  apiPaginated,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { PartnerService } from './partner.service.js';

@Roles('PARTNER')
@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('summary')
  async getSummary(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.partnerService.getMySummary(actor));
  }

  @Get('transactions')
  async listTransactions(
    @CurrentUser() actor: AuthenticatedUser,
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.partnerService.listMyTransactions(actor, query);
    return apiPaginated(result.data, result.meta);
  }

  @Get('bank-account')
  async getBankAccount(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.partnerService.getMyBankAccount(actor));
  }

  @Patch('bank-account')
  async updateBankAccount(
    @CurrentUser() actor: AuthenticatedUser,
    @Body() body: unknown,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.updateMyBankAccount(actor, body),
      'Rekening mitra berhasil diperbarui',
    );
  }

  @Get('withdrawals')
  async listWithdrawals(
    @CurrentUser() actor: AuthenticatedUser,
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.partnerService.listMyWithdrawals(actor, query);
    return apiPaginated(result.data, result.meta);
  }

  @Post('withdrawals')
  @HttpCode(HttpStatus.CREATED)
  async createWithdrawal(
    @CurrentUser() actor: AuthenticatedUser,
    @Body() body: unknown,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.createMyWithdrawal(actor, body),
      'Pengajuan pencairan berhasil dibuat',
    );
  }
}
