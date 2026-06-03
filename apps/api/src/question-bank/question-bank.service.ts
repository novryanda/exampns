import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  QuestionDifficulty,
  QuestionStatus,
  SourceType,
  Prisma,
  type QuestionAnswerMode,
} from '../../generated/prisma/client.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import {
  createQuestionSchema,
  listQuestionsQuerySchema,
  questionOverviewQuerySchema,
  updateQuestionSchema,
  type CreateQuestionInput,
  type ListQuestionsQuery,
  type UpdateQuestionInput,
} from './question-bank.schemas.js';
import {
  assertQuestionOptionRules,
  normalizeTags,
} from './question-bank.rules.js';

const listSelect = {
  id: true,
  questionText: true,
  categoryId: true,
  categoryRef: {
    select: {
      code: true,
      name: true,
      answerMode: true,
    },
  },
  subCategoryId: true,
  topicTagId: true,
  subCategoryRef: {
    select: {
      name: true,
    },
  },
  topicTagRef: {
    select: {
      name: true,
    },
  },
  difficulty: true,
  status: true,
  sourceType: true,
  updatedAt: true,
} as const;

const detailSelect = {
  id: true,
  questionText: true,
  categoryId: true,
  categoryRef: {
    select: {
      id: true,
      code: true,
      name: true,
      answerMode: true,
      isActive: true,
    },
  },
  subCategoryId: true,
  topicTagId: true,
  subCategoryRef: {
    select: {
      id: true,
      name: true,
      categoryRef: {
        select: {
          code: true,
        },
      },
      isActive: true,
    },
  },
  topicTagRef: {
    select: {
      id: true,
      name: true,
      subCategoryId: true,
      isActive: true,
    },
  },
  competencyArea: true,
  difficulty: true,
  sourceType: true,
  status: true,
  explanation: true,
  createdAt: true,
  updatedAt: true,
  options: {
    select: {
      id: true,
      label: true,
      optionText: true,
      isCorrect: true,
      optionWeight: true,
      displayOrder: true,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  },
  tags: {
    select: {
      tag: true,
    },
    orderBy: {
      tag: 'asc',
    },
  },
} as const;

const buildQuestionPreview = (text: string) => {
  const compact = text.replace(/\s+/g, ' ').trim();
  return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
};

@Injectable()
export class QuestionBankService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
    private readonly validationService: ValidationService,
  ) {}

  async getOverview(rawQuery: unknown) {
    const query = this.validationService.validate(questionOverviewQuerySchema, rawQuery);
    const baseWhere = {
      deletedAt: null,
    } satisfies Prisma.QuestionWhereInput;
    const statusPeriodWhere =
      query.statusPeriod === '7d'
        ? {
            ...baseWhere,
            updatedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          }
        : baseWhere;

    const [
      totalQuestions,
      activeQuestions,
      totalSubCategories,
      totalTopicTags,
      categoryRows,
      periodActiveQuestions,
      periodInactiveQuestions,
      difficultyRows,
      topTopicTagGroups,
    ] = await Promise.all([
      this.prisma.question.count({ where: baseWhere }),
      this.prisma.question.count({
        where: {
          ...baseWhere,
          status: QuestionStatus.active,
        },
      }),
      this.prisma.questionSubCategory.count(),
      this.prisma.questionTopicTag.count(),
      this.prisma.question.groupBy({
        by: ['categoryId'],
        where: baseWhere,
        _count: {
          _all: true,
        },
      }),
      this.prisma.question.count({
        where: {
          ...statusPeriodWhere,
          status: QuestionStatus.active,
        },
      }),
      this.prisma.question.count({
        where: {
          ...statusPeriodWhere,
          status: {
            not: QuestionStatus.active,
          },
        },
      }),
      this.prisma.question.groupBy({
        by: ['difficulty'],
        where: baseWhere,
        _count: {
          _all: true,
        },
      }),
      this.prisma.question.groupBy({
        by: ['topicTagId'],
        where: baseWhere,
        _count: {
          _all: true,
        },
      }),
    ]);

    const topTopicTagIds = [...topTopicTagGroups]
      .sort((left, right) => right._count._all - left._count._all)
      .slice(0, 5)
      .map((item) => item.topicTagId);

    const topTopicTagDetails = topTopicTagIds.length
      ? await this.prisma.questionTopicTag.findMany({
          where: {
            id: {
              in: topTopicTagIds,
            },
          },
          select: {
            id: true,
            name: true,
            subCategory: {
              select: {
                name: true,
                categoryRef: {
                  select: {
                    code: true,
                  },
                },
              },
            },
          },
        })
      : [];

    const topTopicTagCountMap = new Map(
      topTopicTagGroups.map((item) => [item.topicTagId, item._count._all]),
    );

    const toDistribution = (
      rows: Array<{ key: string; count: number }>,
      total: number,
    ) =>
      rows.map((row) => ({
        key: row.key,
        count: row.count,
        percentage: total > 0 ? Number(((row.count / total) * 100).toFixed(1)) : 0,
      }));

    const categories = categoryRows.length
      ? await this.prisma.questionCategory.findMany({
          where: {
            id: {
              in: categoryRows.map((row) => row.categoryId),
            },
          },
          select: {
            id: true,
            code: true,
          },
        })
      : [];
    const categoryCodeMap = new Map(categories.map((item) => [item.id, item.code]));

    const categoryDistribution = toDistribution(
      categoryRows.map((row) => ({
        key: categoryCodeMap.get(row.categoryId) ?? row.categoryId,
        count: row._count._all,
      })),
      totalQuestions,
    );

    const statusPeriodTotal = periodActiveQuestions + periodInactiveQuestions;
    const statusDistribution = toDistribution(
      [
        { key: 'active', count: periodActiveQuestions },
        { key: 'inactive', count: periodInactiveQuestions },
      ],
      statusPeriodTotal,
    );

    const difficultyDistribution = toDistribution(
      [QuestionDifficulty.easy, QuestionDifficulty.medium, QuestionDifficulty.hard].map((difficulty) => ({
        key: difficulty,
        count:
          difficultyRows.find((row) => row.difficulty === difficulty)?._count._all ?? 0,
      })),
      totalQuestions,
    );

    return {
      totalQuestions,
      activeQuestions,
      inactiveQuestions: totalQuestions - activeQuestions,
      totalSubCategories,
      totalTopicTags,
      categoryDistribution,
      statusDistribution,
      statusPeriod: query.statusPeriod,
      difficultyDistribution,
      topTopicTags: topTopicTagIds
        .map((topicTagId) => {
          const detail = topTopicTagDetails.find((item) => item.id === topicTagId);
          if (!detail) {
            return null;
          }

          return {
            id: detail.id,
            name: detail.name,
            category: detail.subCategory.categoryRef.code,
            subCategory: detail.subCategory.name,
            questionCount: topTopicTagCountMap.get(topicTagId) ?? 0,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    };
  }

  async listQuestions(rawQuery: unknown) {
    const query = this.validationService.validate(listQuestionsQuerySchema, rawQuery);
    const where = this.buildListWhere(query);
    const skip = (query.page - 1) * query.limit;

    const [items, totalItems] = await Promise.all([
      this.prisma.question.findMany({
        where,
        select: listSelect,
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take: query.limit,
      }),
      this.prisma.question.count({ where }),
    ]);

    return {
      data: items.map((item) => ({
        id: item.id,
        questionPreview: buildQuestionPreview(item.questionText),
        category: item.categoryRef.code,
        categoryName: item.categoryRef.name,
        answerMode: item.categoryRef.answerMode,
        subCategoryId: item.subCategoryId,
        topicTagId: item.topicTagId,
        subCategory: item.subCategoryRef.name,
        topicTag: item.topicTagRef.name,
        difficulty: item.difficulty,
        status: item.status,
        sourceType: item.sourceType,
        updatedAt: item.updatedAt,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async createQuestion(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createQuestionSchema, rawBody);
    const category = await this.getCategoryByCode(payload.categoryCode);
    assertQuestionOptionRules(category.answerMode, payload.options);
    await this.assertQuestionMetadata(category.id, payload.subCategoryId, payload.topicTagId);

    const tags = normalizeTags(payload.tags);

    const created = await this.prisma.question.create({
      data: {
        questionText: payload.questionText,
        categoryId: category.id,
        subCategoryId: payload.subCategoryId,
        topicTagId: payload.topicTagId,
        competencyArea: payload.competencyArea,
        difficulty: payload.difficulty,
        questionType: 'multiple_choice',
        sourceType: SourceType.manual,
        status: payload.status,
        explanation: payload.explanation,
        createdBy: actor.id,
        updatedBy: actor.id,
        options: {
          create: payload.options.map((option, index) => ({
            label: option.label,
            optionText: option.text,
            isCorrect: category.answerMode === 'weighted_options' ? false : option.isCorrect === true,
            optionWeight: category.answerMode === 'weighted_options' ? option.optionWeight ?? null : null,
            displayOrder: index + 1,
          })),
        },
        ...(tags
          ? {
              tags: {
                create: tags.map((tag) => ({ tag })),
              },
            }
          : {}),
      },
      select: {
        id: true,
        status: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'CREATE_QUESTION',
      module: 'question_bank',
      targetType: 'question',
      targetId: created.id,
      metadata: {
        categoryCode: category.code,
        difficulty: payload.difficulty,
        status: payload.status,
      },
    });

    return created;
  }

  async getQuestionDetail(questionId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: detailSelect,
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return {
      id: question.id,
      questionText: question.questionText,
      category: question.categoryRef.code,
      categoryName: question.categoryRef.name,
      answerMode: question.categoryRef.answerMode,
      subCategoryId: question.subCategoryId,
      topicTagId: question.topicTagId,
      subCategory: question.subCategoryRef.name,
      topicTag: question.topicTagRef.name,
      competencyArea: question.competencyArea,
      difficulty: question.difficulty,
      sourceType: question.sourceType,
      status: question.status,
      explanation: question.explanation,
      options: question.options.map((option) => ({
        id: option.id,
        label: option.label,
        text: option.optionText,
        isCorrect: option.isCorrect,
        optionWeight: option.optionWeight,
      })),
      tags: question.tags.map((tag) => tag.tag),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }

  async updateQuestion(questionId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateQuestionSchema, rawBody);
    const existing = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        categoryId: true,
        subCategoryId: true,
        topicTagId: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Question not found');
    }

    const nextCategory = payload.categoryCode
      ? await this.getCategoryByCode(payload.categoryCode)
      : await this.getCategoryById(existing.categoryId);
    const nextSubCategoryId = payload.subCategoryId ?? existing.subCategoryId;
    const nextTopicTagId = payload.topicTagId ?? existing.topicTagId;
    const tags = normalizeTags(payload.tags);

    if (payload.options) {
      assertQuestionOptionRules(nextCategory.answerMode, payload.options);
    }

    if (
      payload.categoryCode !== undefined ||
      payload.subCategoryId !== undefined ||
      payload.topicTagId !== undefined
    ) {
      await this.assertQuestionMetadata(nextCategory.id, nextSubCategoryId, nextTopicTagId);
    }

    await this.prisma.$transaction(async (tx) => {
      const nextStatus = payload.status;
      await tx.question.update({
        where: { id: questionId },
        data: {
          ...(payload.questionText !== undefined ? { questionText: payload.questionText } : {}),
          ...(payload.categoryCode !== undefined ? { categoryId: nextCategory.id } : {}),
          ...(payload.subCategoryId !== undefined ? { subCategoryId: payload.subCategoryId } : {}),
          ...(payload.topicTagId !== undefined ? { topicTagId: payload.topicTagId } : {}),
          ...(payload.competencyArea !== undefined
            ? { competencyArea: payload.competencyArea ?? null }
            : {}),
          ...(payload.difficulty !== undefined ? { difficulty: payload.difficulty } : {}),
          ...(payload.status !== undefined ? { status: payload.status } : {}),
          ...(nextStatus !== undefined
            ? { deletedAt: nextStatus === 'archived' ? new Date() : null }
            : {}),
          ...(payload.explanation !== undefined ? { explanation: payload.explanation ?? null } : {}),
          updatedBy: actor.id,
        },
      });

      if (payload.options) {
        await tx.questionOption.deleteMany({
          where: { questionId },
        });

        await tx.questionOption.createMany({
          data: payload.options.map((option, index) => ({
            questionId,
            label: option.label,
            optionText: option.text,
            isCorrect: nextCategory.answerMode === 'weighted_options' ? false : option.isCorrect === true,
            optionWeight: nextCategory.answerMode === 'weighted_options' ? option.optionWeight ?? null : null,
            displayOrder: index + 1,
          })),
        });
      }

      if (payload.tags !== undefined) {
        await tx.questionTag.deleteMany({
          where: { questionId },
        });

        if (tags && tags.length > 0) {
          await tx.questionTag.createMany({
            data: tags.map((tag) => ({
              questionId,
              tag,
            })),
          });
        }
      }
    });

    await this.auditLogService.create({
      actor,
      action: 'UPDATE_QUESTION',
      module: 'question_bank',
      targetType: 'question',
      targetId: questionId,
      metadata: {
        categoryCode: nextCategory.code,
        status: payload.status,
      },
    });
  }

  async archiveQuestion(questionId: string, actor: AuthenticatedUser) {
    const existing = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Question not found');
    }

    await this.prisma.question.update({
      where: { id: questionId },
      data: {
        status: 'archived',
        deletedAt: new Date(),
        updatedBy: actor.id,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'ARCHIVE_QUESTION',
      module: 'question_bank',
      targetType: 'question',
      targetId: questionId,
    });
  }

  async toggleQuestionStatus(
    questionId: string,
    nextStatus: 'active' | 'archived',
    actor: AuthenticatedUser,
  ) {
    const existing = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        status: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Question not found');
    }

    await this.prisma.question.update({
      where: { id: questionId },
      data: {
        status: nextStatus,
        deletedAt: nextStatus === 'archived' ? new Date() : null,
        updatedBy: actor.id,
      },
    });

    await this.auditLogService.create({
      actor,
      action: nextStatus === 'archived' ? 'ARCHIVE_QUESTION' : 'ACTIVATE_QUESTION',
      module: 'question_bank',
      targetType: 'question',
      targetId: questionId,
      metadata: {
        previousStatus: existing.status,
        nextStatus,
      },
    });
  }

  private buildListWhere(query: ListQuestionsQuery) {
    return {
      ...(query.search
        ? {
            OR: [
              {
                questionText: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                subCategoryRef: {
                  is: {
                    name: {
                      contains: query.search,
                      mode: 'insensitive' as const,
                    },
                  },
                },
              },
              {
                topicTagRef: {
                  is: {
                    name: {
                      contains: query.search,
                      mode: 'insensitive' as const,
                    },
                  },
                },
              },
              {
                competencyArea: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                tags: {
                  some: {
                    tag: {
                      contains: query.search,
                      mode: 'insensitive' as const,
                    },
                  },
                },
              },
            ],
          }
        : {}),
      ...(query.category
        ? {
            categoryRef: {
              is: {
                code: query.category,
              },
            },
          }
        : {}),
      ...(query.subCategoryId ? { subCategoryId: query.subCategoryId } : {}),
      ...(query.subCategory
        ? {
            subCategoryRef: {
              is: {
                name: {
                  contains: query.subCategory,
                  mode: 'insensitive' as const,
                },
              },
            },
          }
        : {}),
      ...(query.topicTagId ? { topicTagId: query.topicTagId } : {}),
      ...(query.topicTag
        ? {
            topicTagRef: {
              is: {
                name: {
                  contains: query.topicTag,
                  mode: 'insensitive' as const,
                },
              },
            },
          }
        : {}),
      ...(query.difficulty ? { difficulty: query.difficulty } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.sourceType ? { sourceType: query.sourceType } : {}),
    } satisfies Prisma.QuestionWhereInput;
  }

  private async assertQuestionMetadata(
    categoryId: string,
    subCategoryId: string,
    topicTagId: string,
  ) {
    const [subCategory, topicTag] = await Promise.all([
      this.prisma.questionSubCategory.findUnique({
        where: { id: subCategoryId },
        select: {
          id: true,
          categoryId: true,
          isActive: true,
        },
      }),
      this.prisma.questionTopicTag.findUnique({
        where: { id: topicTagId },
        select: {
          id: true,
          subCategoryId: true,
          isActive: true,
        },
      }),
    ]);

    if (!subCategory || subCategory.categoryId !== categoryId) {
      throw new BadRequestException('Sub-category tidak valid untuk category yang dipilih');
    }

    if (!subCategory.isActive) {
      throw new BadRequestException('Sub-category inactive tidak dapat dipakai untuk soal baru');
    }

    if (!topicTag || topicTag.subCategoryId !== subCategoryId) {
      throw new BadRequestException('Topic tag tidak cocok dengan sub-category yang dipilih');
    }

    if (!topicTag.isActive) {
      throw new BadRequestException('Topic tag inactive tidak dapat dipakai untuk soal baru');
    }
  }

  private async getCategoryByCode(categoryCode: string) {
    const category = await this.prisma.questionCategory.findUnique({
      where: { code: categoryCode },
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        isActive: true,
      },
    });

    if (!category) {
      throw new BadRequestException('Category tidak ditemukan');
    }

    if (!category.isActive) {
      throw new BadRequestException('Category inactive tidak dapat dipakai');
    }

    return category;
  }

  private async getCategoryById(categoryId: string) {
    const category = await this.prisma.questionCategory.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        isActive: true,
      },
    });

    if (!category) {
      throw new BadRequestException('Category tidak ditemukan');
    }

    return category;
  }
}
