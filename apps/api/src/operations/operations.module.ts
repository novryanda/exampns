import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { QuestionMetadataModule } from '../question-metadata/question-metadata.module.js';
import { AdminMonitoringController } from './admin-monitoring.controller.js';
import { DashboardController } from './dashboard.controller.js';
import { OperationsService } from './operations.service.js';
import { SuperAdminController } from './super-admin.controller.js';

@Module({
  imports: [CommonModule, QuestionMetadataModule],
  controllers: [DashboardController, AdminMonitoringController, SuperAdminController],
  providers: [OperationsService],
})
export class OperationsModule {}
