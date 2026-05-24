import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { AiRecommendationService } from './ai-recommendation.service.js';
import { ExamEngineService } from './exam-engine.service.js';
import { ExamsController } from './exams.controller.js';
import { ResultsController } from './results.controller.js';

@Module({
  imports: [CommonModule],
  controllers: [ExamsController, ResultsController],
  providers: [ExamEngineService, AiRecommendationService],
})
export class ExamEngineModule {}
