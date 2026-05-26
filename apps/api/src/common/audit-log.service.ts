import { Injectable } from '@nestjs/common';
import { UserRole, type Prisma } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: {
    actor: AuthenticatedUser;
    action: string;
    module: string;
    targetType?: string;
    targetId?: string;
    metadata?: unknown;
  }) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId: params.actor.id,
        actorRole: params.actor.role ?? UserRole.SUPER_ADMIN,
        action: params.action,
        module: params.module,
        targetType: params.targetType,
        targetId: params.targetId,
        metadata: params.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }
}
