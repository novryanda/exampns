import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth } from './auth.js';
import type { RegisterUserInput, ResendVerificationInput } from './auth-registration.schemas.js';
import { prisma } from '../common/prisma.service.js';

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

@Injectable()
export class AuthRegistrationService {
  private toInternalAuthHeaders() {
    const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
    const url = new URL(appUrl);
    return new Headers({
      origin: appUrl,
      host: url.host,
      'content-type': 'application/json',
    });
  }

  async register(input: RegisterUserInput) {
    const email = input.email.toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException({
        success: false,
        message: 'Email sudah terdaftar.',
        error: {
          code: 'EMAIL_ALREADY_REGISTERED',
        },
      });
    }

    const authResponse = await auth.api.signUpEmail({
      asResponse: true,
      headers: this.toInternalAuthHeaders(),
      body: {
        name: input.fullName,
        email,
        password: input.password,
        phone: input.phone,
        callbackURL: `${frontendUrl}/auth/login?verified=1`,
      },
    });

    if (!authResponse.ok) {
      const payload = await this.parseAuthError(authResponse);
      if (this.isDuplicateEmailError(payload.message)) {
        throw new ConflictException({
          success: false,
          message: 'Email sudah terdaftar.',
          error: {
            code: 'EMAIL_ALREADY_REGISTERED',
          },
        });
      }

      throw new InternalServerErrorException({
        success: false,
        message: payload.message ?? 'Registrasi gagal. Silakan coba lagi.',
        error: {
          code: payload.code ?? 'REGISTRATION_FAILED',
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Registrasi gagal membuat akun.',
        error: {
          code: 'REGISTRATION_FAILED',
        },
      });
    }

    return {
      userId: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  async resendVerification(input: ResendVerificationInput) {
    const email = input.email.toLowerCase();

    const authResponse = await auth.api.sendVerificationEmail({
      asResponse: true,
      headers: this.toInternalAuthHeaders(),
      body: {
        email,
        callbackURL: `${frontendUrl}/auth/login?verified=1`,
      },
    });

    if (!authResponse.ok && authResponse.status !== 404) {
      const payload = await this.parseAuthError(authResponse);
      throw new InternalServerErrorException({
        success: false,
        message: payload.message ?? 'Gagal mengirim ulang email verifikasi.',
        error: {
          code: payload.code ?? 'RESEND_VERIFICATION_FAILED',
        },
      });
    }

    return {
      sent: true,
    };
  }

  private async parseAuthError(response: globalThis.Response) {
    try {
      return (await response.json()) as { message?: string; code?: string };
    } catch {
      return {};
    }
  }

  private isDuplicateEmailError(message?: string) {
    if (!message) {
      return false;
    }

    const normalized = message.toLowerCase();
    return (
      normalized.includes('already') ||
      normalized.includes('exists') ||
      normalized.includes('duplicate')
    );
  }
}
