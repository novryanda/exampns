import type { Response } from 'express';
import type { RequestWithAuth } from '../auth/auth-request.type.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { MeService, type MeProfile } from './me.service.js';
import type { ChangePasswordDto } from './dto/change-password.dto.js';
import type { UpdateMeDto } from './dto/update-me.dto.js';
export declare class MeController {
    private readonly meService;
    constructor(meService: MeService);
    getProfile(user: AuthenticatedUser): Promise<ApiSuccessResponse<MeProfile>>;
    updateProfile(user: AuthenticatedUser, body: UpdateMeDto, request: RequestWithAuth, response: Response): Promise<ApiSuccessResponse<MeProfile>>;
    changePassword(user: AuthenticatedUser, body: ChangePasswordDto, request: RequestWithAuth, response: Response): Promise<ApiMessageResponse>;
}
