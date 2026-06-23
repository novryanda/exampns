import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CertificateTemplateService } from './certificate-template.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
// Assuming we want admin guards, but for now we'll match existing patterns
// The module should be exported or imported appropriately.

@Controller('admin/certificate-templates')
@Roles('ADMIN', 'SUPER_ADMIN')
export class CertificateTemplateController {
  constructor(private readonly service: CertificateTemplateService) {}

  @Get()
  async listTemplates() {
    const data = await this.service.listTemplates();
    return { data };
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string) {
    const data = await this.service.getTemplate(id);
    return { data };
  }

  @Post()
  async createTemplate(
    @Body() body: { name: string; dataJson: any; canvasDimsJson: any; displayScale: number },
    @CurrentUser() user: { id: string }
  ) {
    const data = await this.service.createTemplate(body, user.id);
    return { data };
  }

  @Patch(':id')
  async updateTemplate(
    @Param('id') id: string,
    @Body() body: { name?: string; dataJson?: any; canvasDimsJson?: any; displayScale?: number }
  ) {
    const data = await this.service.updateTemplate(id, body);
    return { data };
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string) {
    const data = await this.service.deleteTemplate(id);
    return { data };
  }
}
