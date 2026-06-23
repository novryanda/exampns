import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator.js';
import {
  apiData,
  apiPaginated,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from '../common/api-response.js';
import { TryoutManagementService } from './tryout-management.service.js';

@Roles('SUPER_ADMIN')
@Controller('super-admin/tryout-catalogs')
export class TryoutCatalogController {
  constructor(private readonly tryoutManagementService: TryoutManagementService) {}

  @Get()
  async listCatalogs(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiPaginatedResponse<unknown[]>> {
    const result = await this.tryoutManagementService.listTryoutCatalogs(query);
    return apiPaginated(result.data, result.meta);
  }

  @Get(':tryoutCatalogId')
  async getCatalogDetail(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.getTryoutCatalogDetail(tryoutCatalogId));
  }

  @Get(':tryoutCatalogId/availability-check')
  async runAvailabilityCheck(
    @Param('tryoutCatalogId') tryoutCatalogId: string,
  ): Promise<ApiSuccessResponse<unknown>> {
    return apiData(await this.tryoutManagementService.runAvailabilityCheck(tryoutCatalogId));
  }
}
