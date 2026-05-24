import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { ManualQuestionSetController } from './manual-question-set.controller.js';
import { TryoutCatalogController } from './tryout-catalog.controller.js';
import { TryoutManagementService } from './tryout-management.service.js';

@Module({
  imports: [CommonModule],
  controllers: [TryoutCatalogController, ManualQuestionSetController],
  providers: [TryoutManagementService],
})
export class TryoutManagementModule {}
