import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { LearningMaterialService } from './learning-material.service.js';
import { saveMaterialFile, type UploadedMaterialFile } from './learning-material.storage.js';
import { MaterialStatus, ModuleType } from '../../generated/prisma/client.js';

@Controller('admin/learning-materials')
@Roles('ADMIN', 'SUPER_ADMIN')
export class LearningMaterialAdminController {
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

  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body()
    body: {
      title: string;
      description?: string;
      coverImageUrl?: string;
      categoryId: string;
      requiredSubscriptionPlanId?: string;
      certificateTemplateId?: string | null;
      certificatePassingGrade?: number | null;
    },
  ) {
    const data = await this.service.createMaterial({
      ...body,
      createdBy: user.id,
    });
    return { data };
  }

  @Patch(':materialId')
  async update(
    @Param('materialId') materialId: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      coverImageUrl?: string;
      categoryId?: string;
      requiredSubscriptionPlanId?: string;
      sortOrder?: number;
      certificateTemplateId?: string | null;
      certificatePassingGrade?: number | null;
    },
  ) {
    const data = await this.service.updateMaterial(materialId, body);
    return { data };
  }

  @Post(':materialId/publish')
  async publish(@Param('materialId') materialId: string) {
    const data = await this.service.publishMaterial(materialId);
    return { data };
  }

  @Post(':materialId/archive')
  async archive(@Param('materialId') materialId: string) {
    const data = await this.service.archiveMaterial(materialId);
    return { data };
  }

  @Delete(':materialId')
  async remove(@Param('materialId') materialId: string) {
    await this.service.deleteMaterial(materialId);
    return { message: 'Material deleted' };
  }

  // ─── Module management ───────────────────────────────────────────────────

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: UploadedMaterialFile,
  ) {
    const result = await saveMaterialFile(file);
    return { data: result };
  }

  @Get(':materialId/modules/:moduleId')
  async getModuleContent(@Param('moduleId') moduleId: string) {
    const data = await this.service.getModuleContent(moduleId);
    return { data };
  }

  @Post(':materialId/modules')
  async createModule(
    @Param('materialId') materialId: string,
    @Body()
    body: {
      title: string;
      description?: string;
      moduleType: ModuleType;
      content?: string;
      videoUrl?: string;
      pdfUrl?: string;
      durationMinutes?: number;
      manualQuestions?: Array<{
        questionText: string;
        options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
      }>;
    },
  ) {
    const data = await this.service.createModule(materialId, body);
    return { data };
  }

  // NOTE: 'reorder' must be declared BEFORE ':moduleId' so NestJS matches the
  // literal segment first and does not swallow it as a dynamic parameter.
  @Patch(':materialId/modules/reorder')
  async reorderModules(
    @Param('materialId') materialId: string,
    @Body() body: { moduleIds: string[] },
  ) {
    const data = await this.service.reorderModules(materialId, body.moduleIds);
    return { data };
  }

  @Patch(':materialId/modules/:moduleId')
  async updateModule(
    @Param('moduleId') moduleId: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      moduleType?: ModuleType;
      content?: string;
      videoUrl?: string;
      pdfUrl?: string;
      durationMinutes?: number;
      manualQuestions?: Array<{
        questionText: string;
        options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
      }>;
    },
  ) {
    const data = await this.service.updateModule(moduleId, body);
    return { data };
  }

  @Delete(':materialId/modules/:moduleId')
  async deleteModule(@Param('moduleId') moduleId: string) {
    await this.service.deleteModule(moduleId);
    return { message: 'Module deleted' };
  }

  // ─── Quiz question management ────────────────────────────────────────────

  @Post(':materialId/modules/:moduleId/quiz-questions')
  async setQuizQuestions(
    @Param('moduleId') moduleId: string,
    @Body() body: { questionIds: string[] },
  ) {
    const data = await this.service.setQuizQuestions(moduleId, body.questionIds);
    return { data };
  }

  @Delete(':materialId/modules/:moduleId/questions/:questionId')
  async removeManualQuestion(
    @Param('materialId') materialId: string,
    @Param('moduleId') moduleId: string,
    @Param('questionId') questionId: string,
  ) {
    await this.service.deleteModuleManualQuestion(materialId, moduleId, questionId);
    return { message: 'Question deleted' };
  }

  // ─── User Certificates ───────────────────────────────────────────────────

  @Get('user-certificates/all')
  async listUserCertificates() {
    const data = await this.service.getAdminUserCertificates();
    return { data };
  }

  @Delete('user-certificates/:certId')
  async removeUserCertificate(@Param('certId') certId: string) {
    await this.service.deleteUserCertificate(certId);
    return { message: 'User certificate deleted' };
  }

  @Post(':materialId/modules/:moduleId/manual-quiz-questions')
  async setManualQuizQuestions(
    @Param('moduleId') moduleId: string,
    @Body() body: { 
      questions: Array<{
        questionText: string;
        options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
      }> 
    },
  ) {
    const data = await this.service.setManualQuizQuestions(moduleId, body.questions);
    return { data };
  }
}
