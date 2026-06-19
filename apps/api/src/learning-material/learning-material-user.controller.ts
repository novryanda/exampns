import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { LearningMaterialService } from './learning-material.service.js';

interface AuthUser {
  id: string;
  role: string;
}

@Controller('user/learning-materials')
export class LearningMaterialUserController {
  constructor(private readonly service: LearningMaterialService) {}

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    const data = await this.service.listPublishedMaterials(user.id);
    return { data };
  }

  @Get(':materialId')
  async getDetail(
    @Param('materialId') materialId: string,
    @CurrentUser() user: AuthUser,
  ) {
    const data = await this.service.getMaterialWithProgress(materialId, user.id);
    return { data };
  }

  @Get(':materialId/modules/:moduleId')
  async getModuleContent(
    @Param('moduleId') moduleId: string,
    @CurrentUser() user: AuthUser,
  ) {
    const data = await this.service.getModuleContent(moduleId, user.id);
    return { data };
  }

  @Post(':materialId/modules/:moduleId/complete')
  async markComplete(
    @Param('materialId') materialId: string,
    @Param('moduleId') moduleId: string,
    @CurrentUser() user: AuthUser,
    @Body() body: { quizScore?: number },
  ) {
    const data = await this.service.markModuleComplete(
      user.id,
      materialId,
      moduleId,
      body.quizScore,
    );
    return { data };
  }
}
