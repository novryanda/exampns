import { type ApiSuccessResponse } from './common/api-response.js';
import { AppService, type HealthPayload } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHealth(): ApiSuccessResponse<HealthPayload>;
}
