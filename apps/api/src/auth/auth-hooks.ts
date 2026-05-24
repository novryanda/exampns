import { SubscriptionStatus } from '../../generated/prisma/client.js';
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
      activationSource: 'trial',
    },
  });
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
