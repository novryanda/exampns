import { Module } from '@nestjs/common';
import { AccessResolverService } from './access-resolver.service.js';
import { AuditLogService } from './audit-log.service.js';
import { PrismaService, prisma } from './prisma.service.js';
import { ValidationService } from './validation.service.js';

@Module({
  providers: [
    {
      provide: PrismaService,
      useValue: prisma,
    },
    AccessResolverService,
    AuditLogService,
    ValidationService,
  ],
  exports: [PrismaService, AccessResolverService, AuditLogService, ValidationService],
})
export class CommonModule {}
