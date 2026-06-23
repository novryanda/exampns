import { Module } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service.js';
import { LearningMaterialAdminController } from './learning-material-admin.controller.js';
import { LearningMaterialUserController } from './learning-material-user.controller.js';
import { UserCertificateController } from './user-certificate.controller.js';
import { CommonModule } from '../common/common.module.js';

@Module({
  imports: [CommonModule],
  controllers: [LearningMaterialAdminController, LearningMaterialUserController, UserCertificateController],
  providers: [LearningMaterialService],
  exports: [LearningMaterialService],
})
export class LearningMaterialModule {}
