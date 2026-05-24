import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module.js';
import { AuthRegistrationController } from './auth-registration.controller.js';
import { AuthRegistrationService } from './auth-registration.service.js';
import { AuthSessionService } from './auth-session.service.js';

@Module({
  imports: [CommonModule],
  controllers: [AuthRegistrationController],
  providers: [AuthSessionService, AuthRegistrationService],
  exports: [AuthSessionService],
})
export class AuthModule {}
