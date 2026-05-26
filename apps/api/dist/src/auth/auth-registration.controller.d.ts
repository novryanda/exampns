import { type ApiMessageResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { ValidationService } from '../common/validation.service.js';
import { AuthRegistrationService } from './auth-registration.service.js';
interface RegisterResponseData {
    userId: string;
    email: string;
    emailVerified: boolean;
}
export declare class AuthRegistrationController {
    private readonly authRegistrationService;
    private readonly validationService;
    constructor(authRegistrationService: AuthRegistrationService, validationService: ValidationService);
    register(body: unknown): Promise<ApiSuccessResponse<RegisterResponseData>>;
    resendVerification(body: unknown): Promise<ApiMessageResponse>;
    private validateRegisterBody;
}
export {};
