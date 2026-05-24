import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { UserStatus } from '../../generated/prisma/client.js';
import { auth } from './auth.js';
import type { RequestWithAuth } from './auth-request.type.js';
import type { BetterAuthSessionData } from './auth.types.js';

interface AuthEndpointErrorPayload {
  message?: string;
  code?: string;
}

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

const toHeaders = (request: RequestWithAuth) => {
  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
      continue;
    }

    if (typeof value === 'string') {
      headers.set(key, value);
    }
  }

  return headers;
};

const getSetCookieHeaders = (response: globalThis.Response) => {
  if (typeof response.headers.getSetCookie === 'function') {
    return response.headers.getSetCookie();
  }

  const setCookie = response.headers.get('set-cookie');
  return setCookie ? [setCookie] : [];
};

const parseErrorPayload = async (
  response: globalThis.Response,
): Promise<AuthEndpointErrorPayload> => {
  try {
    return (await response.json()) as AuthEndpointErrorPayload;
  } catch {
    return {};
  }
};

@Injectable()
export class AuthSessionService {
  private applyAuthCookies(target: ExpressResponse, authResponse: globalThis.Response) {
    const setCookies = getSetCookieHeaders(authResponse);

    if (setCookies.length > 0) {
      target.setHeader('set-cookie', setCookies);
    }
  }

  private async parseAuthJson<T>(authResponse: globalThis.Response): Promise<T> {
    if (authResponse.status === 204) {
      return undefined as T;
    }

    return (await authResponse.json()) as T;
  }

  private async assertAuthResponse(response: globalThis.Response) {
    if (response.ok) {
      return;
    }

    const payload = await parseErrorPayload(response);
    throw new HttpException(
      {
        success: false,
        message: payload.message ?? 'Authentication request failed',
        code: payload.code,
      },
      response.status,
    );
  }

  async getSessionFromRequest(
    request: RequestWithAuth,
    response: ExpressResponse,
    disableCookieCache = false,
  ): Promise<BetterAuthSessionData | null> {
    const authResponse = await auth.api.getSession({
      asResponse: true,
      headers: toHeaders(request),
      query: disableCookieCache ? { disableCookieCache: true } : undefined,
    });

    this.applyAuthCookies(response, authResponse);
    await this.assertAuthResponse(authResponse);

    return await this.parseAuthJson<BetterAuthSessionData | null>(authResponse);
  }

  async requireSessionFromRequest(
    request: RequestWithAuth,
    response: ExpressResponse,
  ): Promise<BetterAuthSessionData> {
    const session = await this.getSessionFromRequest(request, response);

    if (!session?.user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (session.user.status && session.user.status !== UserStatus.active) {
      throw new UnauthorizedException('Your account is not active');
    }

    return session;
  }

  async updateCurrentUser(
    request: RequestWithAuth,
    response: ExpressResponse,
    input: UpdateUserInput,
  ) {
    const authResponse = await auth.api.updateUser({
      asResponse: true,
      headers: toHeaders(request),
      body: input,
    });

    this.applyAuthCookies(response, authResponse);
    await this.assertAuthResponse(authResponse);
  }

  async changeCurrentPassword(
    request: RequestWithAuth,
    response: ExpressResponse,
    input: ChangePasswordInput,
  ) {
    const authResponse = await auth.api.changePassword({
      asResponse: true,
      headers: toHeaders(request),
      body: {
        ...input,
        revokeOtherSessions: input.revokeOtherSessions ?? true,
      },
    });

    this.applyAuthCookies(response, authResponse);
    await this.assertAuthResponse(authResponse);

    const payload = await this.parseAuthJson<{ token?: string | null }>(authResponse);

    if (payload === undefined) {
      throw new InternalServerErrorException('Password change returned an invalid response');
    }

    return payload;
  }
}
