import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { UserStatus, type UserRole } from '../../generated/prisma/client.js';
import { AuthSessionService } from './auth-session.service.js';
import { IS_PUBLIC_KEY, ROLES_KEY } from './auth.constants.js';
import type { RequestWithAuth } from './auth-request.type.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAuth>();
    const response = context.switchToHttp().getResponse<Response>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
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

    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length && (!session.user.role || !roles.includes(session.user.role))) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
