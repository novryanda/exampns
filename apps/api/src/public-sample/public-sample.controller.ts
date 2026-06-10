import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator.js';
import {
  apiData,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { ValidationService } from '../common/validation.service.js';
import { checkSampleAnswersSchema } from './public-sample.schemas.js';
import { PublicSampleService } from './public-sample.service.js';

@Controller('public')
export class PublicSampleController {
  constructor(
    private readonly publicSampleService: PublicSampleService,
    private readonly validationService: ValidationService,
  ) {}

  @Public()
  @Get('sample-questions')
  async getSampleQuestions(): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.publicSampleService.getSampleQuestions());
  }

  @Public()
  @Post('sample-questions/check')
  @HttpCode(HttpStatus.OK)
  async checkSampleAnswers(@Body() body: unknown): Promise<ApiSuccessResponse<unknown>> {
    const input = this.validationService.validate(checkSampleAnswersSchema, body);
    return apiData(await this.publicSampleService.checkSampleAnswers(input));
  }
}
