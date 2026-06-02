import { SubscriptionStatus, SubscriptionTier, UserRole, UserStatus } from '../../generated/prisma/client.js';
import { prisma } from '../common/prisma.service.js';

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

export const provisionTrialSubscriptionForUser = async (userId: string) => {
  const activeSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      status: SubscriptionStatus.active,
      endDate: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
    },
  });

  if (activeSubscription) {
    return;
  }

  const [trialConfig, trialPlan] = await Promise.all([
    prisma.trialConfig.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.subscriptionPlan.findFirst({
      where: {
        isActive: true,
        isTrial: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  if (!trialConfig || !trialPlan) {
    console.warn(
      '[auth] skipped trial provisioning because active trial config or trial plan is missing',
    );
    return;
  }

  const startDate = new Date();

  await prisma.userSubscription.create({
    data: {
      userId,
      subscriptionPlanId: trialPlan.id,
      status: SubscriptionStatus.active,
      startDate,
      endDate: addDays(startDate, trialConfig.trialDurationDays),
      tryoutLimit: trialConfig.freeTryoutCount,
      tryoutUsed: 0,
      isTrial: true,
      tierSnapshot: SubscriptionTier.trial,
      activationSource: 'trial',
    },
  });
};

export const markPasswordSetAndActivateIfReady = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { passwordSetAt: new Date() },
    });
    await activateUserAccountIfReady(userId);
  } catch (error) {
    console.warn('[auth] failed to mark password set for user', userId, error);
  }
};

/** Activates invited (inactive) users after email + password onboarding; provisions trial for active USER accounts. */
export const activateUserAccountIfReady = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      status: true,
      emailVerified: true,
      passwordSetAt: true,
      deletedAt: true,
    },
  });

  if (!user || user.deletedAt || user.role === UserRole.SUPER_ADMIN) {
    return;
  }

  if (user.status === UserStatus.suspended) {
    return;
  }

  if (user.status === UserStatus.active) {
    if (user.emailVerified && user.role === UserRole.USER) {
      await provisionTrialSubscriptionForUser(userId);
    }
    return;
  }

  // Akun undangan admin: email sudah dianggap valid, cukup atur password.
  if (user.status === UserStatus.inactive && user.passwordSetAt) {
    await prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.active },
    });

    if (user.role === UserRole.USER) {
      await provisionTrialSubscriptionForUser(userId);
    }
  }
};

export const syncLastLoginForUser = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch (error) {
    console.warn('[auth] failed to update last login timestamp', error);
  }
};
