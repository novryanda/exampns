import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile()
    file:
      | {
          originalname: string;
          mimetype: string;
          size: number;
          buffer: Buffer;
        }
      | undefined,
    @Req() request: RequestWithAuth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiSuccessResponse<MeProfile>> {
    return apiData(
      await this.meService.uploadAvatar(user.id, request, response, file),
      'Foto profil berhasil diunggah',
    );
  }

  @Delete('avatar')
  @HttpCode(HttpStatus.OK)
  async removeAvatar(
    @CurrentUser() user: AuthenticatedUser,
    @Req() request: RequestWithAuth,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiSuccessResponse<MeProfile>> {
    return apiData(
      await this.meService.removeAvatar(user.id, request, response),
      'Foto profil dihapus',
    );
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
