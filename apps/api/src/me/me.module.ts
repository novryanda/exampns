import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { CommonModule } from '../common/common.module.js';
import { MeController } from './me.controller.js';
import { MeService } from './me.service.js';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
