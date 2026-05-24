var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';
import { AuthSessionService } from '../auth/auth-session.service.js';
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
};
let MeService = class MeService {
    prisma;
    authSessionService;
    constructor(prisma, authSessionService) {
        this.prisma = prisma;
        this.authSessionService = authSessionService;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: meSelect,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, request, response, input) {
        this.validateUpdateProfileInput(input);
        await this.authSessionService.updateCurrentUser(request, response, {
            name: input.name?.trim(),
            image: input.image ?? undefined,
            phone: input.phone?.trim(),
        });
        return await this.getProfile(userId);
    }
    async changePassword(userId, request, response, input) {
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
    validateUpdateProfileInput(input) {
        const hasAnyField = input.name !== undefined || input.image !== undefined || input.phone !== undefined;
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
};
MeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuthSessionService])
], MeService);
export { MeService };
//# sourceMappingURL=me.service.js.map