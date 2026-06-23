import { Module } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service.js';
import { LearningMaterialAdminController } from './learning-material-admin.controller.js';
import { LearningMaterialSuperAdminController } from './learning-material-super-admin.controller.js';
import { LearningMaterialUserController } from './learning-material-user.controller.js';
import { CommonModule } from '../common/common.module.js';

@Module({
  imports: [CommonModule],
  controllers: [
    LearningMaterialAdminController,
    LearningMaterialSuperAdminController,
    LearningMaterialUserController,
  ],
  providers: [LearningMaterialService],
  exports: [LearningMaterialService],
})
export class LearningMaterialModule {}
