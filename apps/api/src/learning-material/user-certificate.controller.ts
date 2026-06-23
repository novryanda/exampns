import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { LearningMaterialService } from './learning-material.service.js';

interface AuthUser {
  id: string;
  role: string;
}

@Controller('user/certificates')
export class UserCertificateController {
  constructor(private readonly service: LearningMaterialService) {}

  @Get()
  async getMyCertificates(@CurrentUser() user: AuthUser) {
    const data = await this.service.getUserCertificates(user.id);
    return { data };
  }
}
