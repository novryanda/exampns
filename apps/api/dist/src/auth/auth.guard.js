var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserStatus } from '../../generated/prisma/client.js';
import { AuthSessionService } from './auth-session.service.js';
import { IS_PUBLIC_KEY, ROLES_KEY } from './auth.constants.js';
let AuthGuard = class AuthGuard {
    reflector;
    authSessionService;
    constructor(reflector, authSessionService) {
        this.reflector = reflector;
        this.authSessionService = authSessionService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const session = await this.authSessionService.getSessionFromRequest(request, response);
        request.auth = session;
        request.currentUser = session?.user ?? null;
        if (isPublic) {
            return true;
        }
        if (!session?.user) {
            throw new UnauthorizedException('Authentication required');
        }
        if (session.user.status && session.user.status !== UserStatus.active) {
            throw new ForbiddenException('Your account is not active');
        }
        const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (roles?.length && (!session.user.role || !roles.includes(session.user.role))) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
        return true;
    }
};
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthSessionService])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map