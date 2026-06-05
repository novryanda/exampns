import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  Body,
} from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';

@Controller()
export class ResultsController {
  constructor(private readonly examEngineService: ExamEngineService) {}

  @Get('results/:examResultId')
  async getResultDetail(
    @Param('examResultId') examResultId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.examEngineService.getResultDetail(examResultId, actor));
  }

  @Get('results/:examResultId/ranking')
  async getResultRanking(
    @Param('examResultId') examResultId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.examEngineService.getResultRanking(examResultId, actor));
  }

  @Get('results/:examResultId/answers')
  async getResultAnswers(
    @Param('examResultId') examResultId: string,
    @Query() query: Record<string, unknown>,
    @CurrentUser() actor: AuthenticatedUser,
  ) {
    const result = await this.examEngineService.getResultAnswers(examResultId, actor, query);
    return apiPaginated(result.data, result.meta);
  }

  @Get('results/:examResultId/ai-recommendation')
  async getAiRecommendation(
    @Param('examResultId') examResultId: string,
    @CurrentUser() actor: AuthenticatedUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const recommendation = await this.examEngineService.getAiRecommendation(examResultId, actor);
    if (recommendation.processing) {
      response.status(HttpStatus.ACCEPTED);
      return apiData(recommendation.data, 'AI Recommendation sedang diproses');
    }
    response.status(HttpStatus.OK);
    return apiData(recommendation.data);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post('results/:examResultId/ai-recommendation/regenerate')
  @HttpCode(HttpStatus.ACCEPTED)
  async regenerateAiRecommendation(
    @Param('examResultId') examResultId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ status: string }>> {
    return apiData(
      await this.examEngineService.regenerateAiRecommendation(examResultId, actor, body),
      'Regenerasi rekomendasi AI dimulai',
    );
  }

}
