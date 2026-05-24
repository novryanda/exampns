import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { BootstrapService } from './bootstrap.service.js';

@Module({
  imports: [CommonModule],
  providers: [BootstrapService],
})
export class BootstrapModule {}
