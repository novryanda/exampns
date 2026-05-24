import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { QuestionBankController } from './question-bank.controller.js';
import { QuestionBankService } from './question-bank.service.js';

@Module({
  imports: [CommonModule],
  controllers: [QuestionBankController],
  providers: [QuestionBankService],
})
export class QuestionBankModule {}
