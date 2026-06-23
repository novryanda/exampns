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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import type { UploadedWithdrawalProofFile } from './partner-withdrawal.storage.js';

@Roles('SUPER_ADMIN')
@Controller('super-admin/partners')
export class SuperAdminPartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async listPartners(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.partnerService.listPartners(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPartner(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.partnerService.createPartner(body, actor), 'Mitra berhasil dibuat');
  }

  @Get('withdrawals')
  async listWithdrawals(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.partnerService.listWithdrawals(query);
    return apiPaginated(result.data, result.meta);
  }

  @Get(':partnerProfileId')
  async getPartnerDetail(
    @Param('partnerProfileId') partnerProfileId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.partnerService.getPartnerDetail(partnerProfileId));
  }

  @Patch(':partnerProfileId')
  async updatePartner(
    @Param('partnerProfileId') partnerProfileId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.updatePartner(partnerProfileId, body, actor),
      'Mitra berhasil diperbarui',
    );
  }

  @Post(':partnerProfileId/referral-codes')
  @HttpCode(HttpStatus.CREATED)
  async createReferralCode(
    @Param('partnerProfileId') partnerProfileId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.createReferralCode(partnerProfileId, body, actor),
      'Kode referral berhasil dibuat',
    );
  }

  @Patch('referral-codes/:referralCodeId')
  async updateReferralCode(
    @Param('referralCodeId') referralCodeId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.updateReferralCode(referralCodeId, body, actor),
      'Kode referral berhasil diperbarui',
    );
  }

  @Delete('referral-codes/:referralCodeId')
  async deleteReferralCode(
    @Param('referralCodeId') referralCodeId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.deleteReferralCode(referralCodeId, actor),
      'Kode referral berhasil dihapus',
    );
  }

  @Post('withdrawals/:withdrawalRequestId/approve')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async approveWithdrawal(
    @Param('withdrawalRequestId') withdrawalRequestId: string,
    @Body() body: Record<string, unknown>,
    @UploadedFile() file: UploadedWithdrawalProofFile | undefined,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.approveWithdrawal(withdrawalRequestId, body, file, actor),
      'Pencairan mitra berhasil disetujui',
    );
  }

  @Post('withdrawals/:withdrawalRequestId/reject')
  @HttpCode(HttpStatus.OK)
  async rejectWithdrawal(
    @Param('withdrawalRequestId') withdrawalRequestId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.partnerService.rejectWithdrawal(withdrawalRequestId, body, actor),
      'Pencairan mitra berhasil ditolak',
    );
  }
}
