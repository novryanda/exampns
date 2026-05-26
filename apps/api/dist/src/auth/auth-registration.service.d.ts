import type { RegisterUserInput, ResendVerificationInput } from './auth-registration.schemas.js';
export declare class AuthRegistrationService {
    private toInternalAuthHeaders;
    register(input: RegisterUserInput): Promise<{
        userId: string;
        email: string;
        emailVerified: boolean;
    }>;
    resendVerification(input: ResendVerificationInput): Promise<{
        sent: boolean;
    }>;
    private parseAuthError;
    private isDuplicateEmailError;
}
