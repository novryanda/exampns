import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { RequestWithAuth } from '../auth/auth-request.type.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { MeService, type MeProfile } from './me.service.js';
import type { ChangePasswordDto } from './dto/change-password.dto.js';
import type { UpdateMeDto } from './dto/update-me.dto.js';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  async getProfile(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<MeProfile>> {
    return apiData(await this.meService.getProfile(user.id));
  }

  @Patch()
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpdateMeDto,
    @Req() request: RequestWithAuth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiSuccessResponse<MeProfile>> {
    return apiData(
      await this.meService.updateProfile(user.id, request, response, body),
      'Profile berhasil diperbarui',
    );
  }

  @Patch('password')
  async changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: ChangePasswordDto,
    @Req() request: RequestWithAuth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiMessageResponse> {
    await this.meService.changePassword(user.id, request, response, body);
    return apiMessage('Password berhasil diperbarui');
  }
}
