var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, } from '@nestjs/common';
import { ZodError } from 'zod';
import { Public } from './decorators/public.decorator.js';
import { apiData, apiMessage, } from '../common/api-response.js';
import { ValidationService } from '../common/validation.service.js';
import { registerUserSchema, resendVerificationSchema, } from './auth-registration.schemas.js';
import { AuthRegistrationService } from './auth-registration.service.js';
let AuthRegistrationController = class AuthRegistrationController {
    authRegistrationService;
    validationService;
    constructor(authRegistrationService, validationService) {
        this.authRegistrationService = authRegistrationService;
        this.validationService = validationService;
    }
    async register(body) {
        const input = this.validateRegisterBody(body);
        const data = await this.authRegistrationService.register(input);
        return apiData(data, 'Registrasi berhasil. Silakan cek email untuk verifikasi akun.');
    }
    async resendVerification(body) {
        const input = this.validationService.validate(resendVerificationSchema, body);
        await this.authRegistrationService.resendVerification(input);
        return apiMessage('Jika email terdaftar, link verifikasi akan dikirim ulang.');
    }
    validateRegisterBody(body) {
        try {
            return registerUserSchema.parse(body);
        }
        catch (error) {
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
};
__decorate([
    Public(),
    Post('register'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthRegistrationController.prototype, "register", null);
__decorate([
    Public(),
    Post('resend-verification'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthRegistrationController.prototype, "resendVerification", null);
AuthRegistrationController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthRegistrationService,
        ValidationService])
], AuthRegistrationController);
export { AuthRegistrationController };
//# sourceMappingURL=auth-registration.controller.js.map