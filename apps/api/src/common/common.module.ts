import { Module } from '@nestjs/common';
import { PrismaService, prisma } from './prisma.service.js';
import { ValidationService } from './validation.service.js';

@Module({
  providers: [
    {
      provide: PrismaService,
      useValue: prisma,
    },
    ValidationService,
  ],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}
