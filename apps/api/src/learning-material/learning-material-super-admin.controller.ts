import { Controller, Get, Param, Query } from '@nestjs/common';
import { MaterialStatus } from '../../generated/prisma/client.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { LearningMaterialService } from './learning-material.service.js';

@Controller('super-admin/learning-materials')
@Roles('SUPER_ADMIN')
export class LearningMaterialSuperAdminController {
  constructor(private readonly service: LearningMaterialService) {}

  @Get()
  async list(
    @Query('status') status?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const filters: { status?: MaterialStatus; categoryId?: string } = {};
    if (status && Object.values(MaterialStatus).includes(status as MaterialStatus)) {
      filters.status = status as MaterialStatus;
    }
    if (categoryId) filters.categoryId = categoryId;

    const data = await this.service.listMaterials(filters);
    return { data };
  }

  @Get(':materialId')
  async getById(@Param('materialId') materialId: string) {
    const data = await this.service.getMaterialById(materialId);
    return { data };
  }
}
