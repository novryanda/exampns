import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { BillingController } from './billing.controller.js';
import { BillingService } from './billing.service.js';

@Module({
  imports: [CommonModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
