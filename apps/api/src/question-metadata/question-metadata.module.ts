import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { QuestionMetadataController } from './question-metadata.controller.js';
import { QuestionMetadataService } from './question-metadata.service.js';

@Module({
  imports: [CommonModule],
  controllers: [QuestionMetadataController],
  providers: [QuestionMetadataService],
  exports: [QuestionMetadataService],
})
export class QuestionMetadataModule {}
