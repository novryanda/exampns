import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { PdfImportController } from './pdf-import.controller.js';
import { PdfImportWebhookController } from './pdf-import-webhook.controller.js';
import { PdfImportService } from './pdf-import.service.js';

@Module({
  imports: [CommonModule],
  controllers: [PdfImportController, PdfImportWebhookController],
  providers: [PdfImportService],
})
export class PdfImportModule {}
