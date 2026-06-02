import {
  AccessType,
  SubscriptionStatus,
  SubscriptionTier,
} from '../../generated/prisma/client.js';

export type EffectiveAccessLevel = 'expired' | 'trial' | 'standard' | 'premium';
export type EffectiveAccessSource =
  | 'none'
  | 'override'
  | 'trial_subscription'
  | 'standard_subscription'
  | 'premium_subscription';

export interface AccessSubscriptionSnapshot {
  id: string;
  status: SubscriptionStatus;
  endDate: Date;
  tryoutLimit: number | null;
  tryoutUsed: number;
  isTrial: boolean;
  tierSnapshot: SubscriptionTier;
  createdAt: Date;
}

export interface AccessOverrideSnapshot {
  id: string;
  tier: SubscriptionTier;
  startsAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export interface EffectiveAccessResolution {
  effectiveAccessLevel: EffectiveAccessLevel;
  effectiveAccessSource: EffectiveAccessSource;
  activeSubscription: AccessSubscriptionSnapshot | null;
  activeOverride: AccessOverrideSnapshot | null;
}

const tierRank: Record<SubscriptionTier, number> = {
  trial: 1,
  standard: 2,
  premium: 3,
};

export const toEffectiveAccessLevel = (tier: SubscriptionTier): EffectiveAccessLevel => tier;

export const getSubscriptionTierSnapshot = (subscription: {
  tierSnapshot?: SubscriptionTier | null;
  isTrial: boolean;
}) => subscription.tierSnapshot ?? (subscription.isTrial ? SubscriptionTier.trial : SubscriptionTier.standard);

export const isSubscriptionUsableNow = (
  subscription: Pick<AccessSubscriptionSnapshot, 'status' | 'endDate' | 'tryoutLimit' | 'tryoutUsed'>,
  now = new Date(),
) => {
  if (subscription.status !== SubscriptionStatus.active || subscription.endDate <= now) {
    return false;
  }

  if (subscription.tryoutLimit !== null && subscription.tryoutUsed >= subscription.tryoutLimit) {
    return false;
  }

  return true;
};

export const pickBestSubscription = (
  subscriptions: AccessSubscriptionSnapshot[],
  now = new Date(),
) =>
  subscriptions
    .filter((subscription) => isSubscriptionUsableNow(subscription, now))
    .sort((left, right) => {
      const tierDelta =
        tierRank[getSubscriptionTierSnapshot(right)] - tierRank[getSubscriptionTierSnapshot(left)];
      if (tierDelta !== 0) {
        return tierDelta;
      }

      const endDateDelta = right.endDate.getTime() - left.endDate.getTime();
      if (endDateDelta !== 0) {
        return endDateDelta;
      }

      return right.createdAt.getTime() - left.createdAt.getTime();
    })[0] ?? null;

export const pickBestOverride = (overrides: AccessOverrideSnapshot[], now = new Date()) =>
  overrides
    .filter((override) => override.revokedAt === null && override.startsAt <= now && override.expiresAt > now)
    .sort((left, right) => {
      const tierDelta = tierRank[right.tier] - tierRank[left.tier];
      if (tierDelta !== 0) {
        return tierDelta;
      }

      const expiryDelta = right.expiresAt.getTime() - left.expiresAt.getTime();
      if (expiryDelta !== 0) {
        return expiryDelta;
      }

      return right.createdAt.getTime() - left.createdAt.getTime();
    })[0] ?? null;

export const resolveEffectiveAccess = (
  subscriptions: AccessSubscriptionSnapshot[],
  overrides: AccessOverrideSnapshot[],
  now = new Date(),
): EffectiveAccessResolution => {
  const activeOverride = pickBestOverride(overrides, now);
  if (activeOverride) {
    return {
      effectiveAccessLevel: toEffectiveAccessLevel(activeOverride.tier),
      effectiveAccessSource: 'override',
      activeSubscription: pickBestSubscription(subscriptions, now),
      activeOverride,
    };
  }

  const activeSubscription = pickBestSubscription(subscriptions, now);
  if (!activeSubscription) {
    return {
      effectiveAccessLevel: 'expired',
      effectiveAccessSource: 'none',
      activeSubscription: null,
      activeOverride: null,
    };
  }

  const tier = getSubscriptionTierSnapshot(activeSubscription);
  return {
    effectiveAccessLevel: toEffectiveAccessLevel(tier),
    effectiveAccessSource:
      tier === SubscriptionTier.trial
        ? 'trial_subscription'
        : tier === SubscriptionTier.premium
          ? 'premium_subscription'
          : 'standard_subscription',
    activeSubscription,
    activeOverride: null,
  };
};

export const canAccessTryout = (
  accessType: AccessType,
  effectiveAccessLevel: EffectiveAccessLevel,
) => {
  switch (accessType) {
    case AccessType.trial_only:
      return effectiveAccessLevel === 'trial';
    case AccessType.trial_and_paid:
      return effectiveAccessLevel !== 'expired';
    case AccessType.paid_only:
      return effectiveAccessLevel === 'standard' || effectiveAccessLevel === 'premium';
    case AccessType.premium_only:
      return effectiveAccessLevel === 'premium';
    default:
      return false;
  }
};
