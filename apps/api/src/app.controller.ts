import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator.js';
import { apiData, type ApiSuccessResponse } from './common/api-response.js';
import { AppService, type HealthPayload } from './app.service.js';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHealth(): ApiSuccessResponse<HealthPayload> {
    return apiData(this.appService.getHealth());
  }
}
