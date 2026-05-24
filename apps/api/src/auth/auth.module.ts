import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { AuthSessionService } from './auth-session.service.js';

@Module({
  imports: [CommonModule],
  providers: [AuthSessionService],
  exports: [AuthSessionService],
})
export class AuthModule {}
