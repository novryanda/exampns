var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, } from '@nestjs/common';
import { QuestionCategory, SourceType, } from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { createQuestionSchema, listQuestionsQuerySchema, updateQuestionSchema, } from './question-bank.schemas.js';
import { assertQuestionOptionRules, normalizeTags, } from './question-bank.rules.js';
const listSelect = {
    id: true,
    questionText: true,
    category: true,
    subCategory: true,
    topicTag: true,
    difficulty: true,
    status: true,
    sourceType: true,
    updatedAt: true,
};
const detailSelect = {
    id: true,
    questionText: true,
    category: true,
    subCategory: true,
    topicTag: true,
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
    validationService;
    constructor(prisma, validationService) {
        this.prisma = prisma;
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
                subCategory: item.subCategory,
                topicTag: item.topicTag,
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
        const tags = normalizeTags(payload.tags);
        const created = await this.prisma.question.create({
            data: {
                questionText: payload.questionText,
                category: payload.category,
                subCategory: payload.subCategory,
                topicTag: payload.topicTag,
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
            subCategory: question.subCategory,
            topicTag: question.topicTag,
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
            },
        });
        if (!existing) {
            throw new NotFoundException('Question not found');
        }
        const nextCategory = payload.category ?? existing.category;
        const tags = normalizeTags(payload.tags);
        if (payload.options) {
            assertQuestionOptionRules(nextCategory, payload.options);
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.question.update({
                where: { id: questionId },
                data: {
                    ...(payload.questionText !== undefined ? { questionText: payload.questionText } : {}),
                    ...(payload.category !== undefined ? { category: payload.category } : {}),
                    ...(payload.subCategory !== undefined ? { subCategory: payload.subCategory } : {}),
                    ...(payload.topicTag !== undefined ? { topicTag: payload.topicTag } : {}),
                    ...(payload.competencyArea !== undefined
                        ? { competencyArea: payload.competencyArea ?? null }
                        : {}),
                    ...(payload.difficulty !== undefined ? { difficulty: payload.difficulty } : {}),
                    ...(payload.status !== undefined ? { status: payload.status } : {}),
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
                            topicTag: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
                : {}),
            ...(query.category ? { category: query.category } : {}),
            ...(query.subCategory
                ? {
                    subCategory: {
                        contains: query.subCategory,
                        mode: 'insensitive',
                    },
                }
                : {}),
            ...(query.topicTag
                ? {
                    topicTag: {
                        contains: query.topicTag,
                        mode: 'insensitive',
                    },
                }
                : {}),
            ...(query.difficulty ? { difficulty: query.difficulty } : {}),
            ...(query.status ? { status: query.status } : {}),
            ...(query.sourceType ? { sourceType: query.sourceType } : {}),
        };
    }
};
QuestionBankService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ValidationService])
], QuestionBankService);
export { QuestionBankService };
//# sourceMappingURL=question-bank.service.js.map