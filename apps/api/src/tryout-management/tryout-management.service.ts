import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ManualQuestionSetStatus,
  Prisma,
  QuestionStatus,
  RandomizationMode,
  TryoutStatus,
  TryoutType,
} from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  assertGenerationRuleRules,
  assertManualQuestionSetRules,
  assertTryoutCatalogRules,
} from './tryout-management.rules.js';
import {
  createTryoutCatalogSchema,
  generationRuleSchema,
  listTryoutCatalogsQuerySchema,
  manualQuestionSetSchema,
  updateManualQuestionSetSchema,
  updateTryoutCatalogSchema,
} from './tryout-management.schemas.js';

const catalogListSelect = {
  id: true,
  name: true,
  tryoutType: true,
  accessType: true,
  status: true,
  isPublic: true,
  isFeatured: true,
  totalQuestions: true,
  durationMinutes: true,
  updatedAt: true,
} as const;

const catalogDetailSelect = {
  id: true,
  name: true,
  description: true,
  tryoutType: true,
  accessType: true,
  status: true,
  isPublic: true,
  isFeatured: true,
  sortOrder: true,
  durationMinutes: true,
  totalQuestions: true,
  passingGradeConfigId: true,
  showResultImmediately: true,
  showAnswerReview: true,
  approvedBy: true,
  publishedAt: true,
  archivedAt: true,
  createdAt: true,
  updatedAt: true,
  generationRule: {
    select: {
      id: true,
      randomizationMode: true,
      questionOrderMode: true,
      avoidRecentQuestions: true,
      avoidRecentExamCount: true,
      rulesJson: true,
      sections: {
        select: {
          id: true,
          category: true,
          questionCount: true,
          difficultyDistributionJson: true,
          topicDistributionJson: true,
          sortOrder: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  },
  manualQuestionSets: {
    select: {
      id: true,
      name: true,
      status: true,
      updatedAt: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  },
} as const;

const manualSetSelect = {
  id: true,
  tryoutCatalogId: true,
  name: true,
  description: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  items: {
    select: {
      questionOrder: true,
      question: {
        select: {
          id: true,
          questionText: true,
          category: true,
          subCategory: true,
          topicTag: true,
          difficulty: true,
          status: true,
        },
      },
    },
    orderBy: {
      questionOrder: 'asc',
    },
  },
} as const;

@Injectable()
export class TryoutManagementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
    private readonly validationService: ValidationService,
  ) {}

  async listTryoutCatalogs(rawQuery: unknown) {
    const query = this.validationService.validate(listTryoutCatalogsQuerySchema, rawQuery);
    const where: Prisma.TryoutCatalogWhereInput = {
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { description: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(query.tryoutType ? { tryoutType: query.tryoutType } : {}),
      ...(query.accessType ? { accessType: query.accessType } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.isPublic !== undefined ? { isPublic: query.isPublic } : {}),
    };

    const skip = (query.page - 1) * query.limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.tryoutCatalog.findMany({
        where,
        select: catalogListSelect,
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        skip,
        take: query.limit,
      }),
      this.prisma.tryoutCatalog.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async createTryoutCatalog(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createTryoutCatalogSchema, rawBody);
    assertTryoutCatalogRules(payload);

    await this.ensurePassingGradeExists(payload.passingGradeConfigId);

    const created = await this.prisma.tryoutCatalog.create({
      data: {
        ...payload,
        description: payload.description ?? null,
        passingGradeConfigId: payload.passingGradeConfigId ?? null,
        createdBy: actor.id,
      },
      select: {
        id: true,
        status: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'CREATE_TRYOUT_CATALOG',
      module: 'tryout_draft',
      targetType: 'tryout_catalog',
      targetId: created.id,
      metadata: {
        status: created.status,
        tryoutType: payload.tryoutType,
      },
    });

    return created;
  }

  async getTryoutCatalogDetail(tryoutCatalogId: string) {
    const catalog = await this.prisma.tryoutCatalog.findUnique({
      where: { id: tryoutCatalogId },
      select: catalogDetailSelect,
    });

    if (!catalog) {
      throw new NotFoundException('Tryout catalog not found');
    }

    return {
      ...catalog,
      manualQuestionSets: catalog.manualQuestionSets.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        itemCount: item._count.items,
        updatedAt: item.updatedAt,
      })),
    };
  }

  async updateTryoutCatalog(
    tryoutCatalogId: string,
    rawBody: unknown,
    actor?: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(updateTryoutCatalogSchema, rawBody);
    await this.ensureTryoutCatalogExists(tryoutCatalogId);
    await this.ensurePassingGradeExists(payload.passingGradeConfigId);

    await this.prisma.tryoutCatalog.update({
      where: { id: tryoutCatalogId },
      data: {
        ...(payload.name !== undefined ? { name: payload.name } : {}),
        ...(payload.description !== undefined ? { description: payload.description ?? null } : {}),
        ...(payload.tryoutType !== undefined ? { tryoutType: payload.tryoutType } : {}),
        ...(payload.accessType !== undefined ? { accessType: payload.accessType } : {}),
        ...(payload.status !== undefined ? { status: payload.status } : {}),
        ...(payload.isPublic !== undefined ? { isPublic: payload.isPublic } : {}),
        ...(payload.isFeatured !== undefined ? { isFeatured: payload.isFeatured } : {}),
        ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
        ...(payload.durationMinutes !== undefined
          ? { durationMinutes: payload.durationMinutes }
          : {}),
        ...(payload.totalQuestions !== undefined ? { totalQuestions: payload.totalQuestions } : {}),
        ...(payload.passingGradeConfigId !== undefined
          ? { passingGradeConfigId: payload.passingGradeConfigId ?? null }
          : {}),
        ...(payload.showResultImmediately !== undefined
          ? { showResultImmediately: payload.showResultImmediately }
          : {}),
        ...(payload.showAnswerReview !== undefined
          ? { showAnswerReview: payload.showAnswerReview }
          : {}),
      },
    });

    if (actor) {
      await this.auditLogService.create({
        actor,
        action: 'UPDATE_TRYOUT_CATALOG',
        module: 'tryout_draft',
        targetType: 'tryout_catalog',
        targetId: tryoutCatalogId,
        metadata: payload,
      });
    }
  }

  async duplicateTryoutCatalog(tryoutCatalogId: string, actor: AuthenticatedUser) {
    const catalog = await this.prisma.tryoutCatalog.findUnique({
      where: { id: tryoutCatalogId },
      include: {
        generationRule: {
          include: {
            sections: true,
          },
        },
        manualQuestionSets: {
          include: {
            items: {
              orderBy: {
                questionOrder: 'asc',
              },
            },
          },
        },
      },
    });

    if (!catalog) {
      throw new NotFoundException('Tryout catalog not found');
    }

    const duplicatedCatalog = await this.prisma.$transaction(async (tx) => {
      const duplicatedCatalog = await tx.tryoutCatalog.create({
        data: {
          name: `${catalog.name} Copy`,
          description: catalog.description,
          tryoutType: catalog.tryoutType,
          accessType: catalog.accessType,
          status: TryoutStatus.draft,
          isPublic: false,
          isFeatured: false,
          sortOrder: catalog.sortOrder,
          durationMinutes: catalog.durationMinutes,
          totalQuestions: catalog.totalQuestions,
          passingGradeConfigId: catalog.passingGradeConfigId,
          showResultImmediately: catalog.showResultImmediately,
          showAnswerReview: catalog.showAnswerReview,
          createdBy: actor.id,
        },
      });

      if (catalog.generationRule) {
        await tx.tryoutGenerationRule.create({
          data: {
            tryoutCatalogId: duplicatedCatalog.id,
            randomizationMode: catalog.generationRule.randomizationMode,
            questionOrderMode: catalog.generationRule.questionOrderMode,
            avoidRecentQuestions: catalog.generationRule.avoidRecentQuestions,
            avoidRecentExamCount: catalog.generationRule.avoidRecentExamCount,
            rulesJson: catalog.generationRule.rulesJson ?? undefined,
            sections: {
              create: catalog.generationRule.sections.map((section) => ({
                category: section.category,
                questionCount: section.questionCount,
                difficultyDistributionJson: section.difficultyDistributionJson ?? undefined,
                topicDistributionJson: section.topicDistributionJson ?? undefined,
                sortOrder: section.sortOrder,
              })),
            },
          },
        });
      }

      for (const manualSet of catalog.manualQuestionSets) {
        await tx.manualQuestionSet.create({
          data: {
            tryoutCatalogId: duplicatedCatalog.id,
            name: manualSet.name,
            description: manualSet.description,
            status: ManualQuestionSetStatus.draft,
            createdBy: actor.id,
            items: {
              create: manualSet.items.map((item) => ({
                questionId: item.questionId,
                questionOrder: item.questionOrder,
              })),
            },
          },
        });
      }

      return duplicatedCatalog;
    });

    await this.auditLogService.create({
      actor,
      action: 'DUPLICATE_TRYOUT_CATALOG',
      module: 'tryout_draft',
      targetType: 'tryout_catalog',
      targetId: duplicatedCatalog.id,
      metadata: {
        sourceTryoutCatalogId: tryoutCatalogId,
      },
    });

    return duplicatedCatalog;
  }

  async publishTryoutCatalog(tryoutCatalogId: string, actor: AuthenticatedUser) {
    const availability = await this.runAvailabilityCheck(tryoutCatalogId);
    if (!availability.isReady) {
      throw new BadRequestException({
        message: 'Tryout catalog is not ready to publish',
        issues: availability.issues,
      });
    }

    await this.prisma.tryoutCatalog.update({
      where: { id: tryoutCatalogId },
      data: {
        status: TryoutStatus.published,
        approvedBy: actor.id,
        publishedAt: new Date(),
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'PUBLISH_TRYOUT_CATALOG',
      module: 'tryout_catalog',
      targetType: 'tryout_catalog',
      targetId: tryoutCatalogId,
      metadata: {
        issuesChecked: availability.issues.length,
      },
    });
  }

  async archiveTryoutCatalog(tryoutCatalogId: string, actor?: AuthenticatedUser) {
    await this.ensureTryoutCatalogExists(tryoutCatalogId);
    await this.prisma.tryoutCatalog.update({
      where: { id: tryoutCatalogId },
      data: {
        status: TryoutStatus.archived,
        isPublic: false,
        archivedAt: new Date(),
      },
    });

    if (actor) {
      await this.auditLogService.create({
        actor,
        action: 'ARCHIVE_TRYOUT_CATALOG',
        module: 'tryout_catalog',
        targetType: 'tryout_catalog',
        targetId: tryoutCatalogId,
      });
    }
  }

  async listAdminTryoutDrafts(rawQuery: unknown) {
    const query = this.validationService.validate(listTryoutCatalogsQuerySchema, rawQuery);
    if (
      query.status &&
      query.status !== TryoutStatus.draft &&
      query.status !== TryoutStatus.review
    ) {
      throw new BadRequestException('Admin drafts only support draft or review status');
    }

    const where: Prisma.TryoutCatalogWhereInput = {
      status: query.status ?? { in: [TryoutStatus.draft, TryoutStatus.review] },
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { description: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(query.tryoutType ? { tryoutType: query.tryoutType } : {}),
      ...(query.accessType ? { accessType: query.accessType } : {}),
    };

    const skip = (query.page - 1) * query.limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.tryoutCatalog.findMany({
        where,
        select: catalogListSelect,
        orderBy: [{ updatedAt: 'desc' }],
        skip,
        take: query.limit,
      }),
      this.prisma.tryoutCatalog.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async createAdminTryoutDraft(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createTryoutCatalogSchema, rawBody);
    this.assertAdminDraftStatus(payload.status);
    return await this.createTryoutCatalog(
      {
        ...payload,
        isPublic: false,
      },
      actor,
    );
  }

  async getAdminTryoutDraftDetail(tryoutCatalogId: string) {
    const catalog = await this.ensureAdminEditableDraft(tryoutCatalogId);
    return await this.getTryoutCatalogDetail(catalog.id);
  }

  async updateAdminTryoutDraft(
    tryoutCatalogId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(updateTryoutCatalogSchema, rawBody);
    await this.ensureAdminEditableDraft(tryoutCatalogId);

    if (payload.status) {
      this.assertAdminDraftStatus(payload.status);
    }

    await this.updateTryoutCatalog(
      tryoutCatalogId,
      {
        ...payload,
        ...(payload.isPublic !== undefined ? { isPublic: false } : {}),
      },
      actor,
    );
  }

  async duplicateAdminTryoutDraft(tryoutCatalogId: string, actor: AuthenticatedUser) {
    await this.ensureAdminEditableDraft(tryoutCatalogId);
    return await this.duplicateTryoutCatalog(tryoutCatalogId, actor);
  }

  async submitAdminTryoutDraft(tryoutCatalogId: string, actor: AuthenticatedUser) {
    const catalog = await this.ensureAdminEditableDraft(tryoutCatalogId);
    if (catalog.status === TryoutStatus.review) {
      return;
    }

    await this.prisma.tryoutCatalog.update({
      where: { id: tryoutCatalogId },
      data: {
        status: TryoutStatus.review,
        isPublic: false,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'SUBMIT_TRYOUT_DRAFT',
      module: 'tryout_draft',
      targetType: 'tryout_catalog',
      targetId: tryoutCatalogId,
    });
  }

  async getGenerationRule(tryoutCatalogId: string) {
    await this.ensureTryoutCatalogExists(tryoutCatalogId);
    const rule = await this.prisma.tryoutGenerationRule.findUnique({
      where: { tryoutCatalogId },
      include: {
        sections: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });

    if (!rule) {
      throw new NotFoundException('Tryout generation rule not found');
    }

    return rule;
  }

  async upsertGenerationRule(tryoutCatalogId: string, rawBody: unknown) {
    const payload = this.validationService.validate(generationRuleSchema, rawBody);
    const catalog = await this.ensureTryoutCatalogExists(tryoutCatalogId);
    assertGenerationRuleRules(catalog, payload);

    return await this.prisma.$transaction(async (tx) => {
      const existing = await tx.tryoutGenerationRule.findUnique({
        where: { tryoutCatalogId },
        select: { id: true },
      });

      if (existing) {
        await tx.tryoutRuleSection.deleteMany({
          where: { tryoutGenerationRuleId: existing.id },
        });

        return await tx.tryoutGenerationRule.update({
          where: { tryoutCatalogId },
          data: {
            randomizationMode: payload.randomizationMode,
            questionOrderMode: payload.questionOrderMode,
            avoidRecentQuestions: payload.avoidRecentQuestions,
            avoidRecentExamCount: payload.avoidRecentExamCount,
            rulesJson: this.toNullableJsonValue(payload.rulesJson),
            sections: {
              create: payload.sections.map((section, index) => ({
                category: section.category,
                questionCount: section.questionCount,
                difficultyDistributionJson: section.difficultyDistribution,
                topicDistributionJson: section.topicDistribution,
                sortOrder: section.sortOrder ?? index,
              })),
            },
          },
          include: {
            sections: {
              orderBy: {
                sortOrder: 'asc',
              },
            },
          },
        });
      }

      return await tx.tryoutGenerationRule.create({
        data: {
          tryoutCatalogId,
          randomizationMode: payload.randomizationMode,
          questionOrderMode: payload.questionOrderMode,
          avoidRecentQuestions: payload.avoidRecentQuestions,
          avoidRecentExamCount: payload.avoidRecentExamCount,
          rulesJson: this.toNullableJsonValue(payload.rulesJson),
          sections: {
            create: payload.sections.map((section, index) => ({
              category: section.category,
              questionCount: section.questionCount,
              difficultyDistributionJson: section.difficultyDistribution,
              topicDistributionJson: section.topicDistribution,
              sortOrder: section.sortOrder ?? index,
            })),
          },
        },
        include: {
          sections: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      });
    });
  }

  async listManualQuestionSets(tryoutCatalogId: string) {
    await this.ensureTryoutCatalogExists(tryoutCatalogId);
    return await this.prisma.manualQuestionSet.findMany({
      where: { tryoutCatalogId },
      select: {
        id: true,
        name: true,
        status: true,
        updatedAt: true,
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy: [{ updatedAt: 'desc' }],
    });
  }

  async createManualQuestionSet(
    tryoutCatalogId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(manualQuestionSetSchema, rawBody);
    const catalog = await this.ensureTryoutCatalogExists(tryoutCatalogId);
    assertManualQuestionSetRules(catalog, payload);
    await this.assertQuestionsReadyForManualSet(payload.questionIds);

    return await this.prisma.manualQuestionSet.create({
      data: {
        tryoutCatalogId,
        name: payload.name,
        description: payload.description ?? null,
        status: payload.status,
        createdBy: actor.id,
        items: {
          create: payload.questionIds.map((questionId, index) => ({
            questionId,
            questionOrder: index + 1,
          })),
        },
      },
      select: {
        id: true,
        status: true,
      },
    });
  }

  async getManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string) {
    const set = await this.prisma.manualQuestionSet.findFirst({
      where: {
        id: manualQuestionSetId,
        tryoutCatalogId,
      },
      select: manualSetSelect,
    });

    if (!set) {
      throw new NotFoundException('Manual question set not found');
    }

    return {
      ...set,
      questionIds: set.items.map((item) => item.question.id),
      items: set.items.map((item) => ({
        order: item.questionOrder,
        question: {
          id: item.question.id,
          questionPreview: item.question.questionText.slice(0, 120),
          category: item.question.category,
          subCategory: item.question.subCategory,
          topicTag: item.question.topicTag,
          difficulty: item.question.difficulty,
          status: item.question.status,
        },
      })),
    };
  }

  async updateManualQuestionSet(
    tryoutCatalogId: string,
    manualQuestionSetId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(updateManualQuestionSetSchema, rawBody);
    const catalog = await this.ensureTryoutCatalogExists(tryoutCatalogId);
    assertManualQuestionSetRules(catalog, payload);

    const existing = await this.prisma.manualQuestionSet.findFirst({
      where: { id: manualQuestionSetId, tryoutCatalogId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Manual question set not found');
    }

    if (payload.questionIds) {
      await this.assertQuestionsReadyForManualSet(payload.questionIds);
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.manualQuestionSet.update({
        where: { id: manualQuestionSetId },
        data: {
          ...(payload.name !== undefined ? { name: payload.name } : {}),
          ...(payload.description !== undefined
            ? { description: payload.description ?? null }
            : {}),
          ...(payload.status !== undefined ? { status: payload.status } : {}),
          createdBy: actor.id,
        },
      });

      if (payload.questionIds) {
        await tx.manualQuestionSetItem.deleteMany({
          where: { manualQuestionSetId },
        });

        await tx.manualQuestionSetItem.createMany({
          data: payload.questionIds.map((questionId, index) => ({
            manualQuestionSetId,
            questionId,
            questionOrder: index + 1,
          })),
        });
      }
    });
  }

  async archiveManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string) {
    const existing = await this.prisma.manualQuestionSet.findFirst({
      where: { id: manualQuestionSetId, tryoutCatalogId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Manual question set not found');
    }

    await this.prisma.manualQuestionSet.update({
      where: { id: manualQuestionSetId },
      data: {
        status: ManualQuestionSetStatus.archived,
      },
    });
  }

  async runAvailabilityCheck(tryoutCatalogId: string) {
    const catalog = await this.prisma.tryoutCatalog.findUnique({
      where: { id: tryoutCatalogId },
      include: {
        generationRule: {
          include: {
            sections: true,
          },
        },
        manualQuestionSets: {
          where: {
            status: {
              not: ManualQuestionSetStatus.archived,
            },
          },
          include: {
            items: true,
          },
        },
      },
    });

    if (!catalog) {
      throw new NotFoundException('Tryout catalog not found');
    }

    const issues: string[] = [];
    const checks: Record<string, unknown> = {
      tryoutType: catalog.tryoutType,
      totalQuestions: catalog.totalQuestions,
      passingGradeConfigured: Boolean(catalog.passingGradeConfigId),
    };

    if (!catalog.passingGradeConfigId) {
      issues.push('Passing grade configuration is missing');
    }

    if (catalog.tryoutType !== TryoutType.manual) {
      if (!catalog.generationRule) {
        issues.push('Generation rule is missing');
      } else {
        const sectionSummary: Array<Record<string, unknown>> = [];

        for (const section of catalog.generationRule.sections) {
          const availableQuestions = await this.prisma.question.count({
            where: {
              status: QuestionStatus.active,
              deletedAt: null,
              category: section.category,
            },
          });

          const detail: Record<string, unknown> = {
            category: section.category,
            required: section.questionCount,
            available: availableQuestions,
          };

          const difficultyDistribution = section.difficultyDistributionJson as
            | Record<string, number>
            | null;

          if (difficultyDistribution) {
            const difficultyChecks: Array<Record<string, unknown>> = [];
            for (const [difficulty, requiredCount] of Object.entries(difficultyDistribution)) {
              const availableByDifficulty = await this.prisma.question.count({
                where: {
                  status: QuestionStatus.active,
                  deletedAt: null,
                  category: section.category,
                  difficulty: difficulty as never,
                },
              });

              difficultyChecks.push({
                difficulty,
                required: requiredCount,
                available: availableByDifficulty,
              });

              if (availableByDifficulty < requiredCount) {
                issues.push(
                  `Not enough active ${section.category} questions for difficulty ${difficulty}`,
                );
              }
            }

            detail.difficultyChecks = difficultyChecks;
          }

          const topicDistribution = section.topicDistributionJson as
            | Array<{ topicTag: string; questionCount: number }>
            | null;

          if (topicDistribution) {
            const topicChecks: Array<Record<string, unknown>> = [];
            for (const topic of topicDistribution) {
              const availableByTopic = await this.prisma.question.count({
                where: {
                  status: QuestionStatus.active,
                  deletedAt: null,
                  category: section.category,
                  topicTag: topic.topicTag,
                },
              });

              topicChecks.push({
                topicTag: topic.topicTag,
                required: topic.questionCount,
                available: availableByTopic,
              });

              if (availableByTopic < topic.questionCount) {
                issues.push(
                  `Not enough active ${section.category} questions for topic ${topic.topicTag}`,
                );
              }
            }

            detail.topicChecks = topicChecks;
          }

          if (availableQuestions < section.questionCount) {
            issues.push(`Not enough active questions for category ${section.category}`);
          }

          sectionSummary.push(detail);
        }

        checks.generationRule = {
          randomizationMode: catalog.generationRule.randomizationMode,
          questionOrderMode: catalog.generationRule.questionOrderMode,
          sections: sectionSummary,
        };

        const generationTotal = catalog.generationRule.sections.reduce(
          (sum, section) => sum + section.questionCount,
          0,
        );

        if (generationTotal !== catalog.totalQuestions) {
          issues.push('Generation rule total does not match tryout catalog totalQuestions');
        }
      }
    }

    if (catalog.tryoutType !== TryoutType.generated) {
      if (catalog.manualQuestionSets.length === 0) {
        issues.push('Manual question set is missing');
      }

      checks.manualQuestionSets = catalog.manualQuestionSets.map((set) => ({
        id: set.id,
        name: set.name,
        status: set.status,
        itemCount: set.items.length,
      }));

      if (catalog.tryoutType === TryoutType.manual) {
        const approvedSet = catalog.manualQuestionSets.find(
          (set) => set.status === ManualQuestionSetStatus.approved,
        );

        if (!approvedSet) {
          issues.push('At least one approved manual question set is required');
        } else if (approvedSet.items.length !== catalog.totalQuestions) {
          issues.push(
            'Approved manual question set item count must match tryout catalog totalQuestions',
          );
        }
      }
    }

    return {
      isReady: issues.length === 0,
      issues,
      checks,
    };
  }

  private async ensureTryoutCatalogExists(tryoutCatalogId: string) {
    const catalog = await this.prisma.tryoutCatalog.findUnique({
      where: { id: tryoutCatalogId },
      select: {
        id: true,
        totalQuestions: true,
        tryoutType: true,
      },
    });

    if (!catalog) {
      throw new NotFoundException('Tryout catalog not found');
    }

    return catalog;
  }

  private async ensureAdminEditableDraft(tryoutCatalogId: string) {
    const catalog = await this.prisma.tryoutCatalog.findUnique({
      where: { id: tryoutCatalogId },
      select: {
        id: true,
        status: true,
      },
    });

    if (!catalog) {
      throw new NotFoundException('Tryout catalog not found');
    }

    if (catalog.status !== TryoutStatus.draft && catalog.status !== TryoutStatus.review) {
      throw new BadRequestException('Admin can only access draft or review tryouts');
    }

    return catalog;
  }

  private assertAdminDraftStatus(status: TryoutStatus) {
    if (status !== TryoutStatus.draft && status !== TryoutStatus.review) {
      throw new BadRequestException('Admin drafts can only be saved as draft or review');
    }
  }

  private async ensurePassingGradeExists(passingGradeConfigId?: string) {
    if (!passingGradeConfigId) {
      return;
    }

    const exists = await this.prisma.passingGradeConfig.findUnique({
      where: { id: passingGradeConfigId },
      select: { id: true },
    });

    if (!exists) {
      throw new BadRequestException('Passing grade configuration not found');
    }
  }

  private async assertQuestionsReadyForManualSet(questionIds: string[]) {
    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds },
      },
      select: {
        id: true,
        status: true,
        deletedAt: true,
      },
    });

    if (questions.length !== questionIds.length) {
      throw new BadRequestException('One or more questions do not exist');
    }

    const invalidQuestion = questions.find(
      (question) => question.status !== QuestionStatus.active || question.deletedAt !== null,
    );

    if (invalidQuestion) {
      throw new ConflictException(
        'Manual question set can only use active questions that are not archived',
      );
    }
  }

  private toNullableJsonValue(value: unknown) {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return Prisma.JsonNull;
    }

    return value as Prisma.InputJsonValue;
  }
}
