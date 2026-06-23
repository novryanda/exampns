import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { CertificateTemplateController } from './certificate-template.controller.js';
import { CertificateTemplateService } from './certificate-template.service.js';

@Module({
  imports: [CommonModule],
  controllers: [CertificateTemplateController],
  providers: [CertificateTemplateService]
})
export class CertificateTemplateModule {}
