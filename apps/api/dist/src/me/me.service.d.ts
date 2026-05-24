import type { Response } from 'express';
import { PrismaService } from '../common/prisma.service.js';
import { AuthSessionService } from '../auth/auth-session.service.js';
import type { RequestWithAuth } from '../auth/auth-request.type.js';
import type { ChangePasswordDto } from './dto/change-password.dto.js';
import type { UpdateMeDto } from './dto/update-me.dto.js';
export type MeProfile = Awaited<ReturnType<MeService['getProfile']>>;
export declare class MeService {
    private readonly prisma;
    private readonly authSessionService;
    constructor(prisma: PrismaService, authSessionService: AuthSessionService);
    getProfile(userId: string): Promise<{
        id: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        image: string | null;
        phone: string | null;
        role: import("../../generated/prisma/enums.js").UserRole;
        emailVerified: boolean;
        emailVerifiedAt: Date | null;
        lastLoginAt: Date | null;
    }>;
    updateProfile(userId: string, request: RequestWithAuth, response: Response, input: UpdateMeDto): Promise<{
        id: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        image: string | null;
        phone: string | null;
        role: import("../../generated/prisma/enums.js").UserRole;
        emailVerified: boolean;
        emailVerifiedAt: Date | null;
        lastLoginAt: Date | null;
    }>;
    changePassword(userId: string, request: RequestWithAuth, response: Response, input: ChangePasswordDto): Promise<{
        id: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        image: string | null;
        phone: string | null;
        role: import("../../generated/prisma/enums.js").UserRole;
        emailVerified: boolean;
        emailVerifiedAt: Date | null;
        lastLoginAt: Date | null;
    }>;
    private validateUpdateProfileInput;
}
