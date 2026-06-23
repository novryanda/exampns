import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';

@Injectable()
export class CertificateTemplateService {
  constructor(private prisma: PrismaService) {}

  async listTemplates() {
    return this.prisma.certificateTemplate.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        displayScale: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { materials: true } }
      }
    });
  }

  async getTemplate(id: string) {
    const template = await this.prisma.certificateTemplate.findUnique({
      where: { id }
    });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async createTemplate(data: { name: string; dataJson: any; canvasDimsJson: any; displayScale: number }, createdBy: string) {
    return this.prisma.certificateTemplate.create({
      data: {
        name: data.name,
        dataJson: data.dataJson,
        canvasDimsJson: data.canvasDimsJson,
        displayScale: data.displayScale,
        createdBy,
      }
    });
  }

  async updateTemplate(id: string, data: { name?: string; dataJson?: any; canvasDimsJson?: any; displayScale?: number }) {
    await this.getTemplate(id); // Check existence
    return this.prisma.certificateTemplate.update({
      where: { id },
      data
    });
  }

  async deleteTemplate(id: string) {
    await this.getTemplate(id); // Check existence
    return this.prisma.certificateTemplate.delete({
      where: { id }
    });
  }
}
