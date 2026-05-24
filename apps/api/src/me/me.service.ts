import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../common/prisma.service.js';
import { AuthSessionService } from '../auth/auth-session.service.js';
import type { RequestWithAuth } from '../auth/auth-request.type.js';
import type { ChangePasswordDto } from './dto/change-password.dto.js';
import type { UpdateMeDto } from './dto/update-me.dto.js';

const meSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  phone: true,
  role: true,
  status: true,
  emailVerified: true,
  emailVerifiedAt: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type MeProfile = Awaited<ReturnType<MeService['getProfile']>>;

@Injectable()
export class MeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: meSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(
    userId: string,
    request: RequestWithAuth,
    response: Response,
    input: UpdateMeDto,
  ) {
    this.validateUpdateProfileInput(input);

    await this.authSessionService.updateCurrentUser(request, response, {
      name: input.name?.trim(),
      image: input.image ?? undefined,
      phone: input.phone?.trim(),
    });

    return await this.getProfile(userId);
  }

  async changePassword(
    userId: string,
    request: RequestWithAuth,
    response: Response,
    input: ChangePasswordDto,
  ) {
    if (!input.currentPassword?.trim()) {
      throw new BadRequestException('Current password is required');
    }

    if (!input.newPassword?.trim()) {
      throw new BadRequestException('New password is required');
    }

    if (input.newPassword.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters');
    }

    if (input.currentPassword === input.newPassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    await this.authSessionService.changeCurrentPassword(request, response, input);

    return await this.getProfile(userId);
  }

  private validateUpdateProfileInput(input: UpdateMeDto) {
    const hasAnyField =
      input.name !== undefined || input.image !== undefined || input.phone !== undefined;

    if (!hasAnyField) {
      throw new BadRequestException('No profile fields provided');
    }

    if (input.name !== undefined && !input.name.trim()) {
      throw new BadRequestException('Name must not be empty');
    }

    if (input.phone !== undefined && !input.phone.trim()) {
      throw new BadRequestException('Phone must not be empty');
    }
  }
}
