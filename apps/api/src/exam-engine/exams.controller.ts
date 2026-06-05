import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examEngineService: ExamEngineService) {}

  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  async startExam(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.examEngineService.startExam(body, actor),
      'Sesi ujian berhasil dibuat',
    );
  }

  @Get('active')
  async getActiveExam(
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.examEngineService.getActiveExam(actor));
  }

  @Get('history')
  async getExamHistory(
    @Query() query: Record<string, unknown>,
    @CurrentUser() actor: AuthenticatedUser,
  ) {
    const result = await this.examEngineService.getExamHistory(actor, query);
    return apiPaginated(result.data, result.meta);
  }

  @Get(':examSessionId')
  async getExamSessionDetail(
    @Param('examSessionId') examSessionId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.examEngineService.getExamSessionDetail(examSessionId, actor));
  }

  @Put(':examSessionId/answers/:examSessionQuestionId')
  async autosaveAnswer(
    @Param('examSessionId') examSessionId: string,
    @Param('examSessionQuestionId') examSessionQuestionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.examEngineService.autosaveAnswer(
        examSessionId,
        examSessionQuestionId,
        body,
        actor,
      ),
      'Jawaban tersimpan otomatis',
    );
  }

  @Patch(':examSessionId/questions/:examSessionQuestionId/flag')
  async flagQuestion(
    @Param('examSessionId') examSessionId: string,
    @Param('examSessionQuestionId') examSessionQuestionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.examEngineService.flagQuestion(examSessionId, examSessionQuestionId, body, actor);
    return apiMessage('Status ragu-ragu diperbarui');
  }

  @Post(':examSessionId/submit')
  async submitExam(
    @Param('examSessionId') examSessionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.examEngineService.submitExam(examSessionId, actor, body),
      'Ujian berhasil dikumpulkan',
    );
  }

  @Post(':examSessionId/integrity-events')
  @HttpCode(HttpStatus.CREATED)
  async logIntegrityEvent(
    @Param('examSessionId') examSessionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.examEngineService.logIntegrityEvent(examSessionId, body, actor);
    return apiMessage('Integrity event recorded');
  }
}
