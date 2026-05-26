import { Module } from '@nestjs/common';
import { AuditLogService } from './audit-log.service.js';
import { PrismaService, prisma } from './prisma.service.js';
import { ValidationService } from './validation.service.js';

@Module({
  providers: [
    {
      provide: PrismaService,
      useValue: prisma,
    },
    AuditLogService,
    ValidationService,
  ],
  exports: [PrismaService, AuditLogService, ValidationService],
})
export class CommonModule {}
