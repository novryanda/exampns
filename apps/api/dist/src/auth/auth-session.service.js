var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { UserStatus } from '../../generated/prisma/client.js';
import { auth } from './auth.js';
const toHeaders = (request) => {
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
const getSetCookieHeaders = (response) => {
    if (typeof response.headers.getSetCookie === 'function') {
        return response.headers.getSetCookie();
    }
    const setCookie = response.headers.get('set-cookie');
    return setCookie ? [setCookie] : [];
};
const parseErrorPayload = async (response) => {
    try {
        return (await response.json());
    }
    catch {
        return {};
    }
};
let AuthSessionService = class AuthSessionService {
    applyAuthCookies(target, authResponse) {
        const setCookies = getSetCookieHeaders(authResponse);
        if (setCookies.length > 0) {
            target.setHeader('set-cookie', setCookies);
        }
    }
    async parseAuthJson(authResponse) {
        if (authResponse.status === 204) {
            return undefined;
        }
        return (await authResponse.json());
    }
    async assertAuthResponse(response) {
        if (response.ok) {
            return;
        }
        const payload = await parseErrorPayload(response);
        throw new HttpException({
            success: false,
            message: payload.message ?? 'Authentication request failed',
            code: payload.code,
        }, response.status);
    }
    async getSessionFromRequest(request, response, disableCookieCache = false) {
        const authResponse = await auth.api.getSession({
            asResponse: true,
            headers: toHeaders(request),
            query: disableCookieCache ? { disableCookieCache: true } : undefined,
        });
        this.applyAuthCookies(response, authResponse);
        await this.assertAuthResponse(authResponse);
        return await this.parseAuthJson(authResponse);
    }
    async requireSessionFromRequest(request, response) {
        const session = await this.getSessionFromRequest(request, response);
        if (!session?.user) {
            throw new UnauthorizedException('Authentication required');
        }
        if (session.user.status && session.user.status !== UserStatus.active) {
            throw new UnauthorizedException('Your account is not active');
        }
        return session;
    }
    async updateCurrentUser(request, response, input) {
        const authResponse = await auth.api.updateUser({
            asResponse: true,
            headers: toHeaders(request),
            body: input,
        });
        this.applyAuthCookies(response, authResponse);
        await this.assertAuthResponse(authResponse);
    }
    async changeCurrentPassword(request, response, input) {
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
        const payload = await this.parseAuthJson(authResponse);
        if (payload === undefined) {
            throw new InternalServerErrorException('Password change returned an invalid response');
        }
        return payload;
    }
};
AuthSessionService = __decorate([
    Injectable()
], AuthSessionService);
export { AuthSessionService };
//# sourceMappingURL=auth-session.service.js.map