import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiMessageResponse,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { QuestionBankService } from './question-bank.service.js';

@Controller('admin/questions')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  async listQuestions(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.questionBankService.listQuestions(query);
    return apiPaginated(result.data, result.meta);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('overview')
  async getOverview(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.questionBankService.getOverview(query));
  }

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<{ id: string; status: string }>> {
    const created = await this.questionBankService.createQuestion(body, actor);
    return apiData(created, 'Soal berhasil dibuat');
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get(':questionId')
  async getQuestionDetail(
    @Param('questionId') questionId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.questionBankService.getQuestionDetail(questionId));
  }

  @Roles('ADMIN')
  @Patch(':questionId')
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.questionBankService.updateQuestion(questionId, body, actor);
    return apiMessage('Soal berhasil diperbarui');
  }

  @Roles('ADMIN')
  @Delete(':questionId')
  async archiveQuestion(
    @Param('questionId') questionId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.questionBankService.archiveQuestion(questionId, actor);
    return apiMessage('Soal berhasil diarsipkan');
  }
}
