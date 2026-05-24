import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthSessionService } from './auth-session.service.js';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly authSessionService;
    constructor(reflector: Reflector, authSessionService: AuthSessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
