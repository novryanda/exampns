import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Public } from './decorators/public.decorator.js';
import {
  apiData,
  apiMessage,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { ValidationService } from '../common/validation.service.js';
import {
  registerUserSchema,
  resendVerificationSchema,
} from './auth-registration.schemas.js';
import { AuthRegistrationService } from './auth-registration.service.js';

interface RegisterResponseData {
  userId: string;
  email: string;
  emailVerified: boolean;
}

@Controller('auth')
export class AuthRegistrationController {
  constructor(
    private readonly authRegistrationService: AuthRegistrationService,
    private readonly validationService: ValidationService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: unknown,
  ): Promise<ApiSuccessResponse<RegisterResponseData>> {
    const input = this.validateRegisterBody(body);
    const data = await this.authRegistrationService.register(input);

    return apiData(
      data,
      'Registrasi berhasil. Silakan cek email untuk verifikasi akun.',
    );
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(
    @Body() body: unknown,
  ): Promise<ApiMessageResponse> {
    const input = this.validationService.validate(resendVerificationSchema, body);
    await this.authRegistrationService.resendVerification(input);

    return apiMessage(
      'Jika email terdaftar, link verifikasi akan dikirim ulang.',
    );
  }

  private validateRegisterBody(body: unknown) {
    try {
      return registerUserSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const passwordIssue = error.issues.find((issue) => issue.path[0] === 'password');
        throw new BadRequestException({
          success: false,
          message: passwordIssue
            ? 'Password tidak memenuhi ketentuan.'
            : 'Input tidak valid.',
          error: {
            code: passwordIssue ? 'WEAK_PASSWORD' : 'VALIDATION_ERROR',
            details: error.issues.map((issue) => ({
              field: issue.path.join('.') || 'unknown',
              message: issue.message,
            })),
          },
        });
      }

      throw error;
    }
  }
}
