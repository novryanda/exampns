import {
  AccessType,
  QuestionAnswerMode,
  QuestionDifficulty,
  QuestionOrderMode,
  QuestionStatus,
  RandomizationMode,
  SourceType,
  TryoutStatus,
  TryoutType,
  type Prisma,
} from '../../generated/prisma/client.js';
import type { PrismaService } from '../common/prisma.service.js';

type BootstrapPrismaClient = PrismaService | Prisma.TransactionClient;

const questionTargetsByCategory = {
  TWK: 30,
  TIU: 35,
  TKP: 45,
} as const;

const demoTryouts = [
  {
    name: 'Tryout SKD Mini',
    description: 'Latihan singkat format SKD CPNS dengan komposisi TWK, TIU, dan TKP.',
    totalQuestions: 30,
    durationMinutes: 45,
    accessType: AccessType.trial_and_paid,
    isFeatured: true,
    sortOrder: 0,
    sections: [
      { categoryCode: 'TWK', questionCount: 10, sortOrder: 0 },
      { categoryCode: 'TIU', questionCount: 10, sortOrder: 1 },
      { categoryCode: 'TKP', questionCount: 10, sortOrder: 2 },
    ],
  },
  {
    name: 'Tryout SKD Simulasi CPNS',
    description: 'Simulasi lengkap SKD sesuai komposisi resmi TWK 30, TIU 35, dan TKP 45.',
    totalQuestions: 110,
    durationMinutes: 100,
    accessType: AccessType.trial_and_paid,
    isFeatured: false,
    sortOrder: 1,
    sections: [
      { categoryCode: 'TWK', questionCount: 30, sortOrder: 0 },
      { categoryCode: 'TIU', questionCount: 35, sortOrder: 1 },
      { categoryCode: 'TKP', questionCount: 45, sortOrder: 2 },
    ],
  },
] as const;

const buildSingleCorrectOptions = () =>
  ['A', 'B', 'C', 'D', 'E'].map((label, index) => ({
    label,
    optionText: `Pilihan ${label} untuk soal ini`,
    isCorrect: index === 0,
    displayOrder: index + 1,
  }));

const buildWeightedOptions = () =>
  ['A', 'B', 'C', 'D', 'E'].map((label, index) => ({
    label,
    optionText: `Pilihan ${label} untuk soal ini`,
    isCorrect: false,
    optionWeight: index + 1,
    displayOrder: index + 1,
  }));

async function ensureCategoryMetadata(
  prisma: BootstrapPrismaClient,
  category: { id: string; code: string; answerMode: QuestionAnswerMode },
) {
  const subCategory = await prisma.questionSubCategory.upsert({
    where: {
      categoryId_slug: {
        categoryId: category.id,
        slug: 'umum',
      },
    },
    create: {
      categoryId: category.id,
      name: 'Umum',
      slug: 'umum',
      sortOrder: 0,
    },
    update: {
      isActive: true,
      name: 'Umum',
    },
  });

  const topicTag = await prisma.questionTopicTag.upsert({
    where: {
      subCategoryId_slug: {
        subCategoryId: subCategory.id,
        slug: 'latihan-dasar',
      },
    },
    create: {
      subCategoryId: subCategory.id,
      name: 'Latihan Dasar',
      slug: 'latihan-dasar',
      sortOrder: 0,
    },
    update: {
      isActive: true,
      name: 'Latihan Dasar',
    },
  });

  return { subCategory, topicTag };
}

async function ensureQuestionsForCategory(
  prisma: BootstrapPrismaClient,
  params: {
    category: { id: string; code: string; answerMode: QuestionAnswerMode };
    subCategoryId: string;
    topicTagId: string;
    createdBy: string;
    targetCount: number;
  },
) {
  const existingCount = await prisma.question.count({
    where: {
      categoryId: params.category.id,
      status: QuestionStatus.active,
      deletedAt: null,
    },
  });

  if (existingCount >= params.targetCount) {
    return;
  }

  const toCreate = params.targetCount - existingCount;
  const options =
    params.category.answerMode === QuestionAnswerMode.weighted_options
      ? buildWeightedOptions()
      : buildSingleCorrectOptions();

  for (let index = 0; index < toCreate; index += 1) {
    const sequence = existingCount + index + 1;
    await prisma.question.create({
      data: {
        questionText: `Soal ${params.category.code} demo #${sequence}`,
        categoryId: params.category.id,
        subCategoryId: params.subCategoryId,
        topicTagId: params.topicTagId,
        difficulty:
          sequence % 3 === 0
            ? QuestionDifficulty.hard
            : sequence % 2 === 0
              ? QuestionDifficulty.medium
              : QuestionDifficulty.easy,
        sourceType: SourceType.manual,
        status: QuestionStatus.active,
        explanation: `Pembahasan demo untuk soal ${params.category.code} #${sequence}.`,
        createdBy: params.createdBy,
        options: {
          create: options,
        },
      },
    });
  }
}

async function ensurePublishedTryout(
  prisma: BootstrapPrismaClient,
  params: {
    definition: (typeof demoTryouts)[number];
    createdBy: string;
    passingGradeConfigId: string;
    categoryIdByCode: Map<string, string>;
  },
) {
  const existing = await prisma.tryoutCatalog.findFirst({
    where: { name: params.definition.name },
    select: { id: true, status: true },
  });

  if (existing?.status === TryoutStatus.published) {
    return;
  }

  let tryoutCatalogId: string;

  if (existing) {
    await prisma.tryoutCatalog.update({
      where: { id: existing.id },
      data: {
        description: params.definition.description,
        tryoutType: TryoutType.generated,
        accessType: params.definition.accessType,
        status: TryoutStatus.published,
        isPublic: true,
        isFeatured: params.definition.isFeatured,
        sortOrder: params.definition.sortOrder,
        durationMinutes: params.definition.durationMinutes,
        totalQuestions: params.definition.totalQuestions,
        passingGradeConfigId: params.passingGradeConfigId,
        approvedBy: params.createdBy,
        publishedAt: new Date(),
        archivedAt: null,
      },
    });
    tryoutCatalogId = existing.id;
  } else {
    const created = await prisma.tryoutCatalog.create({
      data: {
        name: params.definition.name,
        description: params.definition.description,
        tryoutType: TryoutType.generated,
        accessType: params.definition.accessType,
        status: TryoutStatus.published,
        isPublic: true,
        isFeatured: params.definition.isFeatured,
        sortOrder: params.definition.sortOrder,
        durationMinutes: params.definition.durationMinutes,
        totalQuestions: params.definition.totalQuestions,
        passingGradeConfigId: params.passingGradeConfigId,
        showResultImmediately: true,
        showAnswerReview: true,
        createdBy: params.createdBy,
        approvedBy: params.createdBy,
        publishedAt: new Date(),
      },
    });
    tryoutCatalogId = created.id;
  }

  await prisma.tryoutGenerationRule.upsert({
    where: { tryoutCatalogId },
    create: {
      tryoutCatalogId,
      randomizationMode: RandomizationMode.random_by_category,
      questionOrderMode: QuestionOrderMode.category_order,
      avoidRecentQuestions: false,
      avoidRecentExamCount: 0,
      sections: {
        create: params.definition.sections.map((section) => ({
          categoryId: params.categoryIdByCode.get(section.categoryCode)!,
          questionCount: section.questionCount,
          sortOrder: section.sortOrder,
        })),
      },
    },
    update: {
      randomizationMode: RandomizationMode.random_by_category,
      questionOrderMode: QuestionOrderMode.category_order,
    },
  });

  const rule = await prisma.tryoutGenerationRule.findUnique({
    where: { tryoutCatalogId },
    select: { id: true },
  });

  if (!rule) {
    return;
  }

  await prisma.tryoutRuleSection.deleteMany({
    where: { tryoutGenerationRuleId: rule.id },
  });

  await prisma.tryoutRuleSection.createMany({
    data: params.definition.sections.map((section) => ({
      tryoutGenerationRuleId: rule.id,
      categoryId: params.categoryIdByCode.get(section.categoryCode)!,
      questionCount: section.questionCount,
      sortOrder: section.sortOrder,
    })),
  });
}

export async function seedDemoTryoutCatalog(prisma: BootstrapPrismaClient) {
  const publishedCount = await prisma.tryoutCatalog.count({
    where: {
      status: TryoutStatus.published,
      isPublic: true,
      archivedAt: null,
    },
  });

  if (publishedCount > 0) {
    return;
  }

  const creator = await prisma.user.findFirst({
    where: {
      role: {
        in: ['SUPER_ADMIN', 'ADMIN'],
      },
    },
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  });

  if (!creator) {
    return;
  }

  const passingGrade = await prisma.passingGradeConfig.findFirst({
    where: { isActive: true },
    orderBy: { effectiveFrom: 'desc' },
    select: { id: true },
  });

  if (!passingGrade) {
    return;
  }

  const categories = await prisma.questionCategory.findMany({
    where: {
      code: {
        in: ['TWK', 'TIU', 'TKP'],
      },
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      answerMode: true,
    },
    orderBy: { sortOrder: 'asc' },
  });

  if (categories.length !== 3) {
    return;
  }

  const categoryIdByCode = new Map(categories.map((item) => [item.code, item.id]));

  for (const category of categories) {
    const targetCount = questionTargetsByCategory[category.code as keyof typeof questionTargetsByCategory];
    const metadata = await ensureCategoryMetadata(prisma, category);
    await ensureQuestionsForCategory(prisma, {
      category,
      subCategoryId: metadata.subCategory.id,
      topicTagId: metadata.topicTag.id,
      createdBy: creator.id,
      targetCount,
    });
  }

  for (const definition of demoTryouts) {
    await ensurePublishedTryout(prisma, {
      definition,
      createdBy: creator.id,
      passingGradeConfigId: passingGrade.id,
      categoryIdByCode,
    });
  }
}
