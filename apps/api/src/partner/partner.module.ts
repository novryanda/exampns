import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { PartnerController } from './partner.controller.js';
import { PartnerService } from './partner.service.js';
import { SuperAdminPartnerController } from './super-admin-partner.controller.js';

@Module({
  imports: [CommonModule],
  controllers: [PartnerController, SuperAdminPartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
