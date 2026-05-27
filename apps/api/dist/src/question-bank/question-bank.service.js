var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { QuestionCategory, SourceType, } from '../../generated/prisma/client.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { createQuestionSchema, listQuestionsQuerySchema, updateQuestionSchema, } from './question-bank.schemas.js';
import { assertQuestionOptionRules, normalizeTags, } from './question-bank.rules.js';
const listSelect = {
    id: true,
    questionText: true,
    category: true,
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
};
const detailSelect = {
    id: true,
    questionText: true,
    category: true,
    subCategoryId: true,
    topicTagId: true,
    subCategoryRef: {
        select: {
            id: true,
            name: true,
            category: true,
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
            tkpWeight: true,
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
};
const buildQuestionPreview = (text) => {
    const compact = text.replace(/\s+/g, ' ').trim();
    return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
};
let QuestionBankService = class QuestionBankService {
    prisma;
    auditLogService;
    validationService;
    constructor(prisma, auditLogService, validationService) {
        this.prisma = prisma;
        this.auditLogService = auditLogService;
        this.validationService = validationService;
    }
    async listQuestions(rawQuery) {
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
                category: item.category,
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
    async createQuestion(rawBody, actor) {
        const payload = this.validationService.validate(createQuestionSchema, rawBody);
        assertQuestionOptionRules(payload.category, payload.options);
        await this.assertQuestionMetadata(payload.category, payload.subCategoryId, payload.topicTagId);
        const tags = normalizeTags(payload.tags);
        const created = await this.prisma.question.create({
            data: {
                questionText: payload.questionText,
                category: payload.category,
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
                        isCorrect: payload.category === QuestionCategory.TKP ? false : option.isCorrect === true,
                        tkpWeight: payload.category === QuestionCategory.TKP ? option.tkpWeight : null,
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
                category: payload.category,
                difficulty: payload.difficulty,
                status: payload.status,
            },
        });
        return created;
    }
    async getQuestionDetail(questionId) {
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
            category: question.category,
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
                tkpWeight: option.tkpWeight,
            })),
            tags: question.tags.map((tag) => tag.tag),
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
        };
    }
    async updateQuestion(questionId, rawBody, actor) {
        const payload = this.validationService.validate(updateQuestionSchema, rawBody);
        const existing = await this.prisma.question.findUnique({
            where: { id: questionId },
            select: {
                id: true,
                category: true,
                subCategoryId: true,
                topicTagId: true,
            },
        });
        if (!existing) {
            throw new NotFoundException('Question not found');
        }
        const nextCategory = payload.category ?? existing.category;
        const nextSubCategoryId = payload.subCategoryId ?? existing.subCategoryId;
        const nextTopicTagId = payload.topicTagId ?? existing.topicTagId;
        const tags = normalizeTags(payload.tags);
        if (payload.options) {
            assertQuestionOptionRules(nextCategory, payload.options);
        }
        if (payload.category !== undefined ||
            payload.subCategoryId !== undefined ||
            payload.topicTagId !== undefined) {
            await this.assertQuestionMetadata(nextCategory, nextSubCategoryId, nextTopicTagId);
        }
        await this.prisma.$transaction(async (tx) => {
            const nextStatus = payload.status;
            await tx.question.update({
                where: { id: questionId },
                data: {
                    ...(payload.questionText !== undefined ? { questionText: payload.questionText } : {}),
                    ...(payload.category !== undefined ? { category: payload.category } : {}),
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
                        isCorrect: nextCategory === QuestionCategory.TKP ? false : option.isCorrect === true,
                        tkpWeight: nextCategory === QuestionCategory.TKP ? option.tkpWeight ?? null : null,
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
                category: nextCategory,
                status: payload.status,
            },
        });
    }
    async archiveQuestion(questionId, actor) {
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
    async toggleQuestionStatus(questionId, nextStatus, actor) {
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
    buildListWhere(query) {
        return {
            ...(query.search
                ? {
                    OR: [
                        {
                            questionText: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            subCategoryRef: {
                                is: {
                                    name: {
                                        contains: query.search,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                        {
                            topicTagRef: {
                                is: {
                                    name: {
                                        contains: query.search,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                        {
                            competencyArea: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            tags: {
                                some: {
                                    tag: {
                                        contains: query.search,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                    ],
                }
                : {}),
            ...(query.category ? { category: query.category } : {}),
            ...(query.subCategory
                ? {
                    subCategoryRef: {
                        is: {
                            name: {
                                contains: query.subCategory,
                                mode: 'insensitive',
                            },
                        },
                    },
                }
                : {}),
            ...(query.topicTag
                ? {
                    topicTagRef: {
                        is: {
                            name: {
                                contains: query.topicTag,
                                mode: 'insensitive',
                            },
                        },
                    },
                }
                : {}),
            ...(query.difficulty ? { difficulty: query.difficulty } : {}),
            ...(query.status ? { status: query.status } : {}),
            ...(query.sourceType ? { sourceType: query.sourceType } : {}),
        };
    }
    async assertQuestionMetadata(category, subCategoryId, topicTagId) {
        const [subCategory, topicTag] = await Promise.all([
            this.prisma.questionSubCategory.findUnique({
                where: { id: subCategoryId },
                select: {
                    id: true,
                    category: true,
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
        if (!subCategory || subCategory.category !== category) {
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
};
QuestionBankService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuditLogService,
        ValidationService])
], QuestionBankService);
export { QuestionBankService };
//# sourceMappingURL=question-bank.service.js.map