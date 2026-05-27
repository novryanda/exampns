import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  apiData,
  apiMessage,
  apiPaginated,
  type ApiPaginatedResponse,
  type ApiMessageResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { QuestionMetadataService } from './question-metadata.service.js';

@Roles('ADMIN', 'SUPER_ADMIN')
@Controller('admin/question-metadata')
export class QuestionMetadataController {
  constructor(private readonly questionMetadataService: QuestionMetadataService) {}

  @Get('options')
  async getOptions(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.questionMetadataService.getOptions(query));
  }

  @Get('sub-categories')
  async listSubCategories(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.questionMetadataService.listSubCategories(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post('sub-categories')
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.createSubCategory(body, actor),
      'Sub-category berhasil dibuat',
    );
  }

  @Patch('sub-categories/:subCategoryId')
  async updateSubCategory(
    @Param('subCategoryId') subCategoryId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.updateSubCategory(subCategoryId, body, actor),
      'Sub-category berhasil diperbarui',
    );
  }

  @Delete('sub-categories/:subCategoryId')
  async archiveSubCategory(
    @Param('subCategoryId') subCategoryId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.questionMetadataService.archiveSubCategory(subCategoryId, actor);
    return apiMessage('Sub-category berhasil dinonaktifkan');
  }

  @Get('topic-tags')
  async listTopicTags(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.questionMetadataService.listTopicTags(query);
    return apiPaginated(result.data, result.meta);
  }

  @Post('topic-tags')
  @HttpCode(HttpStatus.CREATED)
  async createTopicTag(
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.createTopicTag(body, actor),
      'Topic tag berhasil dibuat',
    );
  }

  @Patch('topic-tags/:topicTagId')
  async updateTopicTag(
    @Param('topicTagId') topicTagId: string,
    @Body() body: unknown,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(
      await this.questionMetadataService.updateTopicTag(topicTagId, body, actor),
      'Topic tag berhasil diperbarui',
    );
  }

  @Delete('topic-tags/:topicTagId')
  async archiveTopicTag(
    @Param('topicTagId') topicTagId: string,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<ApiMessageResponse> {
    await this.questionMetadataService.archiveTopicTag(topicTagId, actor);
    return apiMessage('Topic tag berhasil dinonaktifkan');
  }
}
