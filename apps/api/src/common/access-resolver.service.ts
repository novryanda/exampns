import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import {
  resolveEffectiveAccess,
  type EffectiveAccessResolution,
  type AccessOverrideSnapshot,
  type AccessSubscriptionSnapshot,
} from './access-control.helpers.js';

@Injectable()
export class AccessResolverService {
  constructor(private readonly prisma: PrismaService) {}

  async resolveEffectiveAccessLevel(userId: string, now = new Date()): Promise<EffectiveAccessResolution> {
    const [subscriptions, overrides] = await Promise.all([
      this.prisma.userSubscription.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          status: true,
          endDate: true,
          tryoutLimit: true,
          tryoutUsed: true,
          isTrial: true,
          tierSnapshot: true,
          createdAt: true,
        },
        orderBy: [{ endDate: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.userAccessOverride.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          subscriptionPlanId: true,
          subscriptionPlan: {
            select: {
              id: true,
              name: true,
              tier: true,
            },
          },
          revokedAt: true,
          createdAt: true,
        },
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);

    return resolveEffectiveAccess(
      subscriptions as AccessSubscriptionSnapshot[],
      overrides.map((override) => ({
        id: override.id,
        subscriptionPlanId: override.subscriptionPlanId,
        subscriptionPlanName: override.subscriptionPlan.name,
        subscriptionPlanTier: override.subscriptionPlan.tier,
        revokedAt: override.revokedAt,
        createdAt: override.createdAt,
      })) as AccessOverrideSnapshot[],
      now,
    );
  }
}
