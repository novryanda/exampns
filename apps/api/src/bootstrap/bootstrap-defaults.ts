import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  ActivationSource,
  QuestionAnswerMode,
  SubscriptionTier,
  SubscriptionStatus,
  UserRole,
  UserStatus,
} from '../../generated/prisma/client.js';
import type { PrismaService } from '../common/prisma.service.js';
import { auth } from '../auth/auth.js';
import { seedDemoTryoutCatalog } from './seed-demo-catalog.js';

type BootstrapPrismaClient = PrismaService | PrismaClient;

const APP_URL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';

const defaultQuestionCategories = [
  {
    code: 'TWK',
    name: 'TWK',
    answerMode: QuestionAnswerMode.single_correct,
    sortOrder: 0,
  },
  {
    code: 'TIU',
    name: 'TIU',
    answerMode: QuestionAnswerMode.single_correct,
    sortOrder: 1,
  },
  {
    code: 'TKP',
    name: 'TKP',
    answerMode: QuestionAnswerMode.weighted_options,
    sortOrder: 2,
  },
] as const;

const defaultPassingGradeCategoryMinimums = [
  { categoryCode: 'TWK', minScore: 65 },
  { categoryCode: 'TIU', minScore: 80 },
  { categoryCode: 'TKP', minScore: 166 },
] as const;

const defaultTrialConfig = {
  name: 'Default Trial Configuration',
  freeTryoutCount: 3,
  trialDurationDays: 7,
  isActive: true,
};

const defaultPlans = [
  {
    name: 'Trial Gratis',
    description: 'Akses trial tryout CPNS untuk pengguna baru',
    durationDays: 7,
    price: '0',
    currency: 'IDR',
    isActive: true,
    isTrial: true,
    tier: SubscriptionTier.trial,
    trialTryoutLimit: 3,
    trialDayLimit: 7,
  },
  {
    name: 'Paket Bulanan',
    description: 'Akses tryout CPNS selama 30 hari',
    durationDays: 30,
    price: '49000',
    currency: 'IDR',
    isActive: true,
    isTrial: false,
    tier: SubscriptionTier.standard,
    trialTryoutLimit: null,
    trialDayLimit: null,
  },
  {
    name: 'Paket 3 Bulan',
    description: 'Akses tryout CPNS selama 90 hari',
    durationDays: 90,
    price: '119000',
    currency: 'IDR',
    isActive: true,
    isTrial: false,
    tier: SubscriptionTier.standard,
    trialTryoutLimit: null,
    trialDayLimit: null,
  },
];

const defaultSystemSettings = [
  {
    key: 'pdf.max_upload_size_mb',
    value: 10,
    description: 'Maximum PDF upload size in MB for question import.',
  },
  {
    key: 'ai.recommendation.enabled',
    value: true,
    description: 'Enable AI recommendation after exam completion.',
  },
  {
    key: 'ai.recommendation.fallback_enabled',
    value: true,
    description: 'Fallback to internal recommendation logic when AI provider fails.',
  },
  {
    key: 'ai.recommendation.provider_name',
    value: 'OpenAI GPT-4o-mini via n8n',
    description: 'Display name for the active AI recommendation provider.',
  },
  {
    key: 'ai.recommendation.timeout_seconds',
    value: 60,
    description: 'Maximum processing time before AI recommendation falls back.',
  },
  {
    key: 'ai.recommendation.weak_area_accuracy_threshold',
    value: 60,
    description: 'Accuracy threshold below which a topic is considered weak.',
  },
  {
    key: 'ai.recommendation.minimum_questions_per_topic',
    value: 5,
    description: 'Minimum number of questions before a topic can be considered for recommendation.',
  },
  {
    key: 'ai.recommendation.max_weak_areas',
    value: 5,
    description: 'Maximum number of weak areas returned by the recommendation engine.',
  },
  {
    key: 'ai.recommendation.priority_score_formula',
    value: '(1 - accuracy) * 0.6 + (question_count_weight) * 0.4',
    description: 'Human readable representation of the weak area priority score formula.',
  },
  {
    key: 'ai.recommendation.show_summary',
    value: true,
    description: 'Show AI recommendation summary on result page.',
  },
  {
    key: 'ai.recommendation.show_weak_areas',
    value: true,
    description: 'Show weak areas on result page.',
  },
  {
    key: 'ai.recommendation.show_next_tryout_strategy',
    value: true,
    description: 'Show next tryout strategy recommendation on result page.',
  },
  {
    key: 'ai.recommendation.enable_result_page_banner',
    value: true,
    description: 'Show AI recommendation banner on result page.',
  },
  {
    key: 'ai.recommendation.error_notification',
    value: true,
    description: 'Enable error notifications for AI recommendation failures.',
  },
  {
    key: 'ai.recommendation.retry_failed_job',
    value: true,
    description: 'Automatically retry failed AI recommendation jobs.',
  },
  {
    key: 'ai.recommendation.log_level',
    value: 'info',
    description: 'Log verbosity for AI recommendation pipeline.',
  },
];

const toBootstrapHeaders = () => {
  const url = new URL(APP_URL);
  return new Headers({
    origin: APP_URL,
    host: url.host,
    'content-type': 'application/json',
  });
};

const seedQuestionCategories = async (prisma: BootstrapPrismaClient) => {
  for (const category of defaultQuestionCategories) {
    await prisma.questionCategory.upsert({
      where: { code: category.code },
      create: category,
      update: {
        name: category.name,
        answerMode: category.answerMode,
        isActive: true,
        sortOrder: category.sortOrder,
      },
    });
  }
};

export const seedCoreDefaults = async (prisma: BootstrapPrismaClient) => {
  await seedQuestionCategories(prisma);

  const activePassingGrade = await prisma.passingGradeConfig.findFirst({
    where: { isActive: true },
    select: { id: true },
  });

  if (!activePassingGrade) {
    const categories = await prisma.questionCategory.findMany({
      where: {
        code: {
          in: defaultPassingGradeCategoryMinimums.map((item) => item.categoryCode),
        },
      },
      select: { id: true, code: true },
    });
    const categoryIdByCode = new Map(categories.map((item) => [item.code, item.id]));

    await prisma.passingGradeConfig.create({
      data: {
        name: 'Default Passing Grade',
        totalMinScore: 311,
        isActive: true,
        effectiveFrom: new Date('2026-05-14T00:00:00.000Z'),
        items: {
          create: defaultPassingGradeCategoryMinimums.map((item) => ({
            categoryId: categoryIdByCode.get(item.categoryCode)!,
            minScore: item.minScore,
          })),
        },
      },
    });
  }

  const activeTrialConfig = await prisma.trialConfig.findFirst({
    where: { isActive: true },
    select: { id: true },
  });

  if (!activeTrialConfig) {
    await prisma.trialConfig.create({
      data: defaultTrialConfig,
    });
  }

  for (const plan of defaultPlans) {
    const existingPlan = await prisma.subscriptionPlan.findFirst({
      where: { name: plan.name },
      select: { id: true },
    });

    if (!existingPlan) {
      await prisma.subscriptionPlan.create({
        data: plan,
      });
    }
  }

  for (const setting of defaultSystemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: {
        description: setting.description,
      },
    });
  }

  await seedDemoTryoutCatalog(prisma);
};

export const seedSuperAdminFromEnv = async (prisma: BootstrapPrismaClient) => {
  const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD?.trim();
  const name = process.env.SUPER_ADMIN_NAME?.trim() || 'Super Admin';

  if (!email || !password) {
    return { created: false, skipped: true };
  }

  let user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      emailVerifiedAt: true,
    },
  });

  let createdNow = false;

  if (!user) {
    const authResponse = await auth.api.signUpEmail({
      asResponse: true,
      headers: toBootstrapHeaders(),
      body: {
        name,
        email,
        password,
      },
    });

    if (!authResponse.ok) {
      let message = 'Failed to create bootstrap super admin';
      try {
        const payload = (await authResponse.json()) as { message?: string };
        if (payload.message) {
          message = payload.message;
        }
      } catch {
        // Intentionally ignored. We keep the default error message.
      }

      throw new Error(message);
    }

    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
      },
    });

    createdNow = true;
  }

  if (!user) {
    throw new Error('Bootstrap super admin could not be found after creation');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.active,
      emailVerified: true,
      emailVerifiedAt: user.emailVerifiedAt ?? new Date(),
    },
  });

  if (createdNow) {
    await prisma.userSubscription.deleteMany({
      where: {
        userId: user.id,
        isTrial: true,
        status: SubscriptionStatus.active,
        activationSource: ActivationSource.trial,
      },
    });
  }

  return { created: createdNow, skipped: false };
};
