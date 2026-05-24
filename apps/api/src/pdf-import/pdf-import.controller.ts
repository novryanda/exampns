import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { PdfImportService } from './pdf-import.service.js';

@Roles('ADMIN', 'SUPER_ADMIN')
@Controller('admin')
export class PdfImportController {
  constructor(private readonly pdfImportService: PdfImportService) {}

  @Post('pdf-imports')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdfForParsing(
    @UploadedFile()
    file:
      | {
          originalname: string;
          mimetype: string;
          size: number;
          buffer: Buffer;
        }
      | undefined,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.pdfImportService.uploadPdfForParsing(file, body, actor),
      'PDF diterima dan sedang diproses',
    );
  }

  @Get('pdf-imports')
  async listPdfImportBatches(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.pdfImportService.listPdfImportBatches(query);
    return apiPaginated(result.data, result.meta);
  }

  @Get('pdf-imports/:batchId')
  async getPdfImportBatchDetail(
    @Param('batchId') batchId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.pdfImportService.getPdfImportBatchDetail(batchId));
  }

  @Get('parsed-questions/:parsedQuestionId')
  async getParsedQuestionDetail(
    @Param('parsedQuestionId') parsedQuestionId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.pdfImportService.getParsedQuestionDetail(parsedQuestionId));
  }

  @Patch('parsed-questions/:parsedQuestionId')
  async updateParsedQuestion(
    @Param('parsedQuestionId') parsedQuestionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.pdfImportService.updateParsedQuestion(parsedQuestionId, body, actor);
    return apiMessage('Hasil parsing berhasil diperbarui');
  }

  @Post('parsed-questions/:parsedQuestionId/approve')
  @HttpCode(HttpStatus.CREATED)
  async approveParsedQuestion(
    @Param('parsedQuestionId') parsedQuestionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.pdfImportService.approveParsedQuestion(parsedQuestionId, body, actor),
      'Parsed question disetujui dan masuk bank soal',
    );
  }

  @Post('parsed-questions/:parsedQuestionId/reject')
  async rejectParsedQuestion(
    @Param('parsedQuestionId') parsedQuestionId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.pdfImportService.rejectParsedQuestion(parsedQuestionId, body, actor);
    return apiMessage('Parsed question ditolak');
  }
}
