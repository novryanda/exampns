import type { Response as ExpressResponse } from 'express';
import type { RequestWithAuth } from './auth-request.type.js';
import type { BetterAuthSessionData } from './auth.types.js';
interface UpdateUserInput {
    name?: string;
    image?: string | null;
    phone?: string;
}
interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
    revokeOtherSessions?: boolean;
}
export declare class AuthSessionService {
    private applyAuthCookies;
    private parseAuthJson;
    private assertAuthResponse;
    getSessionFromRequest(request: RequestWithAuth, response: ExpressResponse, disableCookieCache?: boolean): Promise<BetterAuthSessionData | null>;
    requireSessionFromRequest(request: RequestWithAuth, response: ExpressResponse): Promise<BetterAuthSessionData>;
    updateCurrentUser(request: RequestWithAuth, response: ExpressResponse, input: UpdateUserInput): Promise<void>;
    changeCurrentPassword(request: RequestWithAuth, response: ExpressResponse, input: ChangePasswordInput): Promise<{
        token?: string | null;
    }>;
}
export {};
