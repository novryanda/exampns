import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator.js';
import { apiMessage, type ApiMessageResponse } from '../common/api-response.js';
import { PdfImportService } from './pdf-import.service.js';

@Controller('internal/pdf-imports')
export class PdfImportWebhookController {
  constructor(private readonly pdfImportService: PdfImportService) {}

  @Public()
  @Post('callback')
  async handlePdfImportCallback(
    @Body() body: unknown,
    @Headers('x-api-key') apiKey: string | undefined,
  ): Promise<ApiMessageResponse> {
    await this.pdfImportService.handlePdfImportCallback(body, apiKey);
    return apiMessage('PDF import callback processed');
  }
}
