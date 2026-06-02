import { AccessType, SubscriptionStatus, SubscriptionTier } from '../../generated/prisma/client.js';

import {
  canAccessTryout,
  pickBestOverride,
  pickBestSubscription,
  resolveEffectiveAccess,
} from './access-control.helpers.js';

describe('access-control helpers', () => {
  const now = new Date('2026-06-01T10:00:00.000Z');

  it('prefers premium override over standard subscription', () => {
    const resolution = resolveEffectiveAccess(
      [
        {
          id: 'sub-standard',
          status: SubscriptionStatus.active,
          endDate: new Date('2026-06-30T00:00:00.000Z'),
          tryoutLimit: null,
          tryoutUsed: 0,
          isTrial: false,
          tierSnapshot: SubscriptionTier.standard,
          createdAt: new Date('2026-05-01T00:00:00.000Z'),
        },
      ],
      [
        {
          id: 'override-premium',
          tier: SubscriptionTier.premium,
          startsAt: new Date('2026-06-01T00:00:00.000Z'),
          expiresAt: new Date('2026-06-02T00:00:00.000Z'),
          revokedAt: null,
          createdAt: new Date('2026-06-01T01:00:00.000Z'),
        },
      ],
      now,
    );

    expect(resolution.effectiveAccessLevel).toBe('premium');
    expect(resolution.effectiveAccessSource).toBe('override');
    expect(resolution.activeOverride?.id).toBe('override-premium');
  });

  it('filters out exhausted trial subscriptions', () => {
    const best = pickBestSubscription(
      [
        {
          id: 'trial-exhausted',
          status: SubscriptionStatus.active,
          endDate: new Date('2026-06-03T00:00:00.000Z'),
          tryoutLimit: 3,
          tryoutUsed: 3,
          isTrial: true,
          tierSnapshot: SubscriptionTier.trial,
          createdAt: new Date('2026-05-20T00:00:00.000Z'),
        },
        {
          id: 'standard-active',
          status: SubscriptionStatus.active,
          endDate: new Date('2026-06-10T00:00:00.000Z'),
          tryoutLimit: null,
          tryoutUsed: 0,
          isTrial: false,
          tierSnapshot: SubscriptionTier.standard,
          createdAt: new Date('2026-05-25T00:00:00.000Z'),
        },
      ],
      now,
    );

    expect(best?.id).toBe('standard-active');
  });

  it('ignores revoked or expired overrides', () => {
    const best = pickBestOverride(
      [
        {
          id: 'override-revoked',
          tier: SubscriptionTier.premium,
          startsAt: new Date('2026-05-30T00:00:00.000Z'),
          expiresAt: new Date('2026-06-05T00:00:00.000Z'),
          revokedAt: new Date('2026-05-31T00:00:00.000Z'),
          createdAt: new Date('2026-05-30T00:00:00.000Z'),
        },
        {
          id: 'override-expired',
          tier: SubscriptionTier.standard,
          startsAt: new Date('2026-05-25T00:00:00.000Z'),
          expiresAt: new Date('2026-05-31T00:00:00.000Z'),
          revokedAt: null,
          createdAt: new Date('2026-05-25T00:00:00.000Z'),
        },
      ],
      now,
    );

    expect(best).toBeNull();
  });

  it('enforces tryout access by effective tier', () => {
    expect(canAccessTryout(AccessType.trial_only, 'trial')).toBe(true);
    expect(canAccessTryout(AccessType.trial_only, 'standard')).toBe(false);
    expect(canAccessTryout(AccessType.paid_only, 'standard')).toBe(true);
    expect(canAccessTryout(AccessType.paid_only, 'premium')).toBe(true);
    expect(canAccessTryout(AccessType.paid_only, 'trial')).toBe(false);
    expect(canAccessTryout(AccessType.premium_only, 'premium')).toBe(true);
    expect(canAccessTryout(AccessType.premium_only, 'standard')).toBe(false);
    expect(canAccessTryout(AccessType.trial_and_paid, 'expired')).toBe(false);
  });
});
