import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { normalizeQuestionCategoryCode, type QuestionCategoryCode } from '../common/question-category.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  createQuestionCategorySchema,
  createSubCategorySchema,
  createTopicTagSchema,
  listSubCategoriesQuerySchema,
  listTopicTagQuestionsQuerySchema,
  listTopicTagsQuerySchema,
  metadataOptionsQuerySchema,
  metadataSummaryQuerySchema,
  updateQuestionCategorySchema,
  updateSubCategorySchema,
  updateTopicTagSchema,
} from './question-metadata.schemas.js';
import { normalizeMetadataName, toMetadataSlug } from './question-metadata.utils.js';

const buildQuestionPreview = (text: string) => {
  const compact = text.replace(/\s+/g, ' ').trim();
  return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
};

@Injectable()
export class QuestionMetadataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
    private readonly validationService: ValidationService,
  ) {}

  async getOptions(rawQuery: unknown) {
    const query = this.validationService.validate(metadataOptionsQuerySchema, rawQuery);

    const [categories, subCategories, topicTags] = await Promise.all([
      this.prisma.questionCategory.findMany({
        where: {
          ...(query.category ? { code: query.category } : {}),
          isActive: true,
        },
        orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
        select: {
          id: true,
          code: true,
          name: true,
          answerMode: true,
          isActive: true,
          sortOrder: true,
        },
      }),
      this.prisma.questionSubCategory.findMany({
        where: {
          isActive: true,
          ...(query.category
            ? {
                categoryRef: {
                  is: {
                    code: query.category,
                  },
                },
              }
            : {}),
        },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          categoryRef: {
            select: {
              code: true,
            },
          },
          name: true,
        },
      }),
      this.prisma.questionTopicTag.findMany({
        where: {
          isActive: true,
          ...(query.subCategoryId ? { subCategoryId: query.subCategoryId } : {}),
          ...(query.category
            ? {
                subCategory: {
                  is: {
                    categoryRef: {
                      is: {
                        code: query.category,
                      },
                    },
                  },
                },
              }
            : {}),
        },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          subCategoryId: true,
        },
      }),
    ]);

    return {
      categories,
      subCategories: subCategories.map((item) => ({
        id: item.id,
        category: item.categoryRef.code,
        name: item.name,
      })),
      topicTags,
    };
  }

  async getSummary(rawQuery: unknown) {
    const query = this.validationService.validate(metadataSummaryQuerySchema, rawQuery);
    const subCategoryWhere = {
      ...(query.category
        ? {
            categoryRef: {
              is: {
                code: query.category,
              },
            },
          }
        : {}),
    };
    const topicTagWhere = {
      ...(query.category
        ? {
            subCategory: {
              is: {
                categoryRef: {
                  is: {
                    code: query.category,
                  },
                },
              },
            },
          }
        : {}),
    };

    const [totalSubCategories, activeSubCategories, totalTopicTags, activeTopicTags] = await Promise.all([
      this.prisma.questionSubCategory.count({ where: subCategoryWhere }),
      this.prisma.questionSubCategory.count({
        where: {
          ...subCategoryWhere,
          isActive: true,
        },
      }),
      this.prisma.questionTopicTag.count({ where: topicTagWhere }),
      this.prisma.questionTopicTag.count({
        where: {
          ...topicTagWhere,
          isActive: true,
        },
      }),
    ]);

    return {
      totalSubCategories,
      activeSubCategories,
      inactiveSubCategories: totalSubCategories - activeSubCategories,
      totalTopicTags,
      activeTopicTags,
      inactiveTopicTags: totalTopicTags - activeTopicTags,
    };
  }

  async listSubCategories(rawQuery: unknown) {
    const query = this.validationService.validate(listSubCategoriesQuerySchema, rawQuery);
    const where = {
      ...(query.category
        ? {
            categoryRef: {
              is: {
                code: query.category,
              },
            },
          }
        : {}),
      ...(query.search
        ? {
            name: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
      ...(query.includeInactive ? {} : { isActive: true }),
    };
    const skip = (query.page - 1) * query.limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.questionSubCategory.findMany({
        where,
        orderBy: [{ categoryRef: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          categoryRef: {
            select: {
              code: true,
            },
          },
          name: true,
          slug: true,
          isActive: true,
          sortOrder: true,
          _count: {
            select: {
              topicTags: true,
              questions: true,
            },
          },
        },
        skip,
        take: query.limit,
      }),
      this.prisma.questionSubCategory.count({ where }),
    ]);

    return {
      data: items.map((item) => ({
        id: item.id,
        category: item.categoryRef.code,
        name: item.name,
        slug: item.slug,
        isActive: item.isActive,
        sortOrder: item.sortOrder,
        topicTagCount: item._count.topicTags,
        questionCount: item._count.questions,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async createSubCategory(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createSubCategorySchema, rawBody);
    const category = await this.getCategoryByCode(payload.categoryCode);
    const name = normalizeMetadataName(payload.name);
    const slug = toMetadataSlug(name);

    await this.assertSubCategorySlugAvailable(category.id, slug);
    const sortOrder = payload.sortOrder ?? (await this.getNextSubCategorySortOrder(category.id));

    const created = await this.prisma.questionSubCategory.create({
      data: {
        categoryId: category.id,
        name,
        slug,
        sortOrder,
      },
      select: {
        id: true,
        categoryRef: {
          select: {
            code: true,
          },
        },
        name: true,
        isActive: true,
        sortOrder: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'CREATE_QUESTION_SUB_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_sub_category',
      targetId: created.id,
      metadata: created,
    });

    return {
      ...created,
      category: created.categoryRef.code,
    };
  }

  async updateSubCategory(subCategoryId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateSubCategorySchema, rawBody);
    const existing = await this.prisma.questionSubCategory.findUnique({
      where: { id: subCategoryId },
      select: {
        id: true,
        categoryId: true,
        categoryRef: {
          select: {
            code: true,
          },
        },
        name: true,
        slug: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Question sub-category not found');
    }

    const nextName = payload.name ? normalizeMetadataName(payload.name) : existing.name;
    const nextSlug = payload.name ? toMetadataSlug(nextName) : existing.slug;

    if (nextSlug !== existing.slug) {
      await this.assertSubCategorySlugAvailable(existing.categoryId, nextSlug, subCategoryId);
    }

    const updated = await this.prisma.questionSubCategory.update({
      where: { id: subCategoryId },
      data: {
        ...(payload.name !== undefined ? { name: nextName, slug: nextSlug } : {}),
        ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
      },
      select: {
        id: true,
        categoryRef: {
          select: {
            code: true,
          },
        },
        name: true,
        isActive: true,
        sortOrder: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'UPDATE_QUESTION_SUB_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_sub_category',
      targetId: subCategoryId,
      metadata: payload,
    });

    return {
      ...updated,
      category: updated.categoryRef.code,
    };
  }

  async archiveSubCategory(subCategoryId: string, actor: AuthenticatedUser) {
    const existing = await this.prisma.questionSubCategory.findUnique({
      where: { id: subCategoryId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Question sub-category not found');
    }

    await this.prisma.questionSubCategory.update({
      where: { id: subCategoryId },
      data: { isActive: false },
    });

    await this.auditLogService.create({
      actor,
      action: 'ARCHIVE_QUESTION_SUB_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_sub_category',
      targetId: subCategoryId,
    });
  }

  async listTopicTags(rawQuery: unknown) {
    const query = this.validationService.validate(listTopicTagsQuerySchema, rawQuery);
    const where = {
      ...(query.subCategoryId ? { subCategoryId: query.subCategoryId } : {}),
      ...(query.category
        ? {
            subCategory: {
              is: {
                categoryRef: {
                  is: {
                    code: query.category,
                  },
                },
              },
            },
          }
        : {}),
      ...(query.search
        ? {
            name: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
      ...(query.includeInactive ? {} : { isActive: true }),
    };
    const skip = (query.page - 1) * query.limit;
    const [items, totalItems] = await Promise.all([
      this.prisma.questionTopicTag.findMany({
        where,
        orderBy: [
          { subCategory: { categoryRef: { sortOrder: 'asc' } } },
          { subCategory: { name: 'asc' } },
          { sortOrder: 'asc' },
          { name: 'asc' },
        ],
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
          sortOrder: true,
          subCategoryId: true,
          subCategory: {
            select: {
              categoryRef: {
                select: {
                  code: true,
                },
              },
              name: true,
            },
          },
          _count: {
            select: {
              questions: true,
            },
          },
        },
        skip,
        take: query.limit,
      }),
      this.prisma.questionTopicTag.count({ where }),
    ]);

    return {
      data: items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        isActive: item.isActive,
        sortOrder: item.sortOrder,
        subCategoryId: item.subCategoryId,
        subCategory: item.subCategory.name,
        category: item.subCategory.categoryRef.code,
        questionCount: item._count.questions,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async listTopicTagQuestions(topicTagId: string, rawQuery: unknown) {
    const query = this.validationService.validate(listTopicTagQuestionsQuerySchema, rawQuery);
    const topicTag = await this.prisma.questionTopicTag.findUnique({
      where: { id: topicTagId },
      select: {
        id: true,
      },
    });

    if (!topicTag) {
      throw new NotFoundException('Question topic tag not found');
    }

    const where = {
      topicTagId,
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
                competencyArea: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                explanation: {
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
    } satisfies Prisma.QuestionWhereInput;
    const skip = (query.page - 1) * query.limit;

    const [items, totalItems] = await Promise.all([
      this.prisma.question.findMany({
        where,
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          id: true,
          questionText: true,
          categoryRef: {
            select: {
              code: true,
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

  async createTopicTag(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createTopicTagSchema, rawBody);
    const subCategory = await this.getEditableSubCategory(payload.subCategoryId);
    const name = normalizeMetadataName(payload.name);
    const slug = toMetadataSlug(name);

    await this.assertTopicTagSlugAvailable(payload.subCategoryId, slug);
    const sortOrder = payload.sortOrder ?? (await this.getNextTopicTagSortOrder(payload.subCategoryId));

    const created = await this.prisma.questionTopicTag.create({
      data: {
        subCategoryId: payload.subCategoryId,
        name,
        slug,
        sortOrder,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        sortOrder: true,
        subCategoryId: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'CREATE_QUESTION_TOPIC_TAG',
      module: 'question_metadata',
      targetType: 'question_topic_tag',
      targetId: created.id,
      metadata: {
        ...created,
        category: subCategory.categoryRef.code,
      },
    });

    return created;
  }

  async updateTopicTag(topicTagId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateTopicTagSchema, rawBody);
    const existing = await this.prisma.questionTopicTag.findUnique({
      where: { id: topicTagId },
      select: {
        id: true,
        subCategoryId: true,
        name: true,
        slug: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Question topic tag not found');
    }

    const nextSubCategoryId = payload.subCategoryId ?? existing.subCategoryId;
    await this.getEditableSubCategory(nextSubCategoryId);

    const nextName = payload.name ? normalizeMetadataName(payload.name) : existing.name;
    const nextSlug = payload.name ? toMetadataSlug(nextName) : existing.slug;

    if (nextSubCategoryId !== existing.subCategoryId || nextSlug !== existing.slug) {
      await this.assertTopicTagSlugAvailable(nextSubCategoryId, nextSlug, topicTagId);
    }

    const updated = await this.prisma.questionTopicTag.update({
      where: { id: topicTagId },
      data: {
        ...(payload.subCategoryId !== undefined ? { subCategoryId: payload.subCategoryId } : {}),
        ...(payload.name !== undefined ? { name: nextName, slug: nextSlug } : {}),
        ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        sortOrder: true,
        subCategoryId: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'UPDATE_QUESTION_TOPIC_TAG',
      module: 'question_metadata',
      targetType: 'question_topic_tag',
      targetId: topicTagId,
      metadata: payload,
    });

    return updated;
  }

  async archiveTopicTag(topicTagId: string, actor: AuthenticatedUser) {
    const existing = await this.prisma.questionTopicTag.findUnique({
      where: { id: topicTagId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Question topic tag not found');
    }

    await this.prisma.questionTopicTag.update({
      where: { id: topicTagId },
      data: { isActive: false },
    });

    await this.auditLogService.create({
      actor,
      action: 'ARCHIVE_QUESTION_TOPIC_TAG',
      module: 'question_metadata',
      targetType: 'question_topic_tag',
      targetId: topicTagId,
    });
  }

  async listCategories(includeInactive = true) {
    return this.prisma.questionCategory.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        isActive: true,
        sortOrder: true,
      },
    });
  }

  async createCategory(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createQuestionCategorySchema, rawBody);
    const code = normalizeQuestionCategoryCode(payload.code);
    const name = normalizeMetadataName(payload.name);

    const existing = await this.prisma.questionCategory.findUnique({
      where: { code },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Category code sudah digunakan');
    }

    const sortOrder = payload.sortOrder ?? (await this.getNextCategorySortOrder());

    const activePassingGrade = await this.prisma.passingGradeConfig.findFirst({
      where: { isActive: true },
      select: { id: true },
      orderBy: { effectiveFrom: 'desc' },
    });

    const created = await this.prisma.$transaction(async (tx) => {
      const category = await tx.questionCategory.create({
        data: {
          code,
          name,
          answerMode: payload.answerMode,
          sortOrder,
        },
        select: {
          id: true,
          code: true,
          name: true,
          answerMode: true,
          isActive: true,
          sortOrder: true,
        },
      });

      if (activePassingGrade) {
        await tx.passingGradeConfigItem.create({
          data: {
            passingGradeConfigId: activePassingGrade.id,
            categoryId: category.id,
            minScore: 0,
          },
        });
      }

      return category;
    });

    await this.auditLogService.create({
      actor,
      action: 'CREATE_QUESTION_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_category',
      targetId: created.id,
      metadata: created,
    });

    return created;
  }

  async updateCategory(categoryId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateQuestionCategorySchema, rawBody);
    const existing = await this.prisma.questionCategory.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Question category not found');
    }

    const updated = await this.prisma.questionCategory.update({
      where: { id: categoryId },
      data: {
        ...(payload.name !== undefined ? { name: normalizeMetadataName(payload.name) } : {}),
        ...(payload.answerMode !== undefined ? { answerMode: payload.answerMode } : {}),
        ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
      },
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        isActive: true,
        sortOrder: true,
      },
    });

    await this.auditLogService.create({
      actor,
      action: 'UPDATE_QUESTION_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_category',
      targetId: categoryId,
      metadata: payload,
    });

    return updated;
  }

  async archiveCategory(categoryId: string, actor: AuthenticatedUser) {
    const existing = await this.prisma.questionCategory.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Question category not found');
    }

    await this.prisma.questionCategory.update({
      where: { id: categoryId },
      data: { isActive: false },
    });

    await this.auditLogService.create({
      actor,
      action: 'ARCHIVE_QUESTION_CATEGORY',
      module: 'question_metadata',
      targetType: 'question_category',
      targetId: categoryId,
    });
  }

  private async assertSubCategorySlugAvailable(
    categoryId: string,
    slug: string,
    currentId?: string,
  ) {
    const existing = await this.prisma.questionSubCategory.findFirst({
      where: {
        categoryId,
        slug,
        ...(currentId ? { id: { not: currentId } } : {}),
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Sub-category sudah ada pada category ini');
    }
  }

  private async assertTopicTagSlugAvailable(
    subCategoryId: string,
    slug: string,
    currentId?: string,
  ) {
    const existing = await this.prisma.questionTopicTag.findFirst({
      where: {
        subCategoryId,
        slug,
        ...(currentId ? { id: { not: currentId } } : {}),
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Topic tag sudah ada pada sub-category ini');
    }
  }

  private async getNextSubCategorySortOrder(categoryId: string) {
    const latest = await this.prisma.questionSubCategory.findFirst({
      where: { categoryId },
      orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
      select: { sortOrder: true },
    });

    return (latest?.sortOrder ?? -1) + 1;
  }

  private async getNextTopicTagSortOrder(subCategoryId: string) {
    const latest = await this.prisma.questionTopicTag.findFirst({
      where: { subCategoryId },
      orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
      select: { sortOrder: true },
    });

    return (latest?.sortOrder ?? -1) + 1;
  }

  private async getEditableSubCategory(subCategoryId: string) {
    const subCategory = await this.prisma.questionSubCategory.findUnique({
      where: { id: subCategoryId },
      select: {
        id: true,
        categoryRef: {
          select: {
            code: true,
          },
        },
        isActive: true,
      },
    });

    if (!subCategory) {
      throw new NotFoundException('Question sub-category not found');
    }

    if (!subCategory.isActive) {
      throw new BadRequestException('Cannot attach topic tag to inactive sub-category');
    }

    return subCategory;
  }

  private async getCategoryByCode(categoryCode: QuestionCategoryCode) {
    const category = await this.prisma.questionCategory.findUnique({
      where: { code: normalizeQuestionCategoryCode(categoryCode) },
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        isActive: true,
        sortOrder: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Question category not found');
    }

    return category;
  }

  private async getNextCategorySortOrder() {
    const latest = await this.prisma.questionCategory.findFirst({
      orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
      select: { sortOrder: true },
    });

    return (latest?.sortOrder ?? -1) + 1;
  }
}
