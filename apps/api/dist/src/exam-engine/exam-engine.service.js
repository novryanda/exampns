var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { AIRecommendationStatus, ExamSessionStatus, QuestionCategory, QuestionStatus, RandomizationMode, TryoutStatus, TryoutType, } from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { autosaveAnswerSchema, examHistoryQuerySchema, flagQuestionSchema, integrityEventSchema, listResultAnswersQuerySchema, regenerateAiRecommendationSchema, startExamSchema, submitExamSchema, } from './exam-engine.schemas.js';
import { buildBreakdown, ensureUserCanAccessTryout, formatAiRecommendationForResponse, formatResultBreakdownForResponse, isPrivilegedRole, processingAiRecommendationResponse, resolveTryoutCatalogId, sanitizeQuestionOptionsForActiveExam, shuffle, toInputJson, toNullableInputJson, tryoutUsesManualSet, } from './exam-engine.helpers.js';
import { AiRecommendationService } from './ai-recommendation.service.js';
let ExamEngineService = class ExamEngineService {
    prisma;
    validationService;
    aiRecommendationService;
    constructor(prisma, validationService, aiRecommendationService) {
        this.prisma = prisma;
        this.validationService = validationService;
        this.aiRecommendationService = aiRecommendationService;
    }
    async startExam(rawBody, actor) {
        const payload = this.validationService.validate(startExamSchema, rawBody);
        const tryoutCatalogId = resolveTryoutCatalogId(payload);
        await this.autoSubmitExpiredActiveSession(actor.id);
        const activeSession = await this.prisma.examSession.findFirst({
            where: {
                userId: actor.id,
                status: ExamSessionStatus.in_progress,
            },
            select: { id: true },
            orderBy: { createdAt: 'desc' },
        });
        if (activeSession) {
            throw new ConflictException({
                code: 'ACTIVE_SESSION_EXISTS',
                message: 'Anda masih memiliki sesi ujian aktif',
            });
        }
        const currentSubscription = await this.prisma.userSubscription.findFirst({
            where: {
                userId: actor.id,
                status: 'active',
                endDate: {
                    gt: new Date(),
                },
            },
            orderBy: [{ isTrial: 'desc' }, { endDate: 'desc' }],
            select: {
                id: true,
                isTrial: true,
                endDate: true,
            },
        });
        const catalog = await this.prisma.tryoutCatalog.findUnique({
            where: { id: tryoutCatalogId },
            include: {
                generationRule: {
                    include: {
                        sections: {
                            orderBy: { sortOrder: 'asc' },
                        },
                    },
                },
                manualQuestionSets: {
                    where: {
                        status: 'approved',
                    },
                    include: {
                        items: {
                            orderBy: { questionOrder: 'asc' },
                        },
                    },
                    orderBy: { updatedAt: 'desc' },
                },
            },
        });
        if (!catalog || catalog.status !== TryoutStatus.published || !catalog.isPublic) {
            throw new NotFoundException('Tryout catalog tidak tersedia');
        }
        if (!ensureUserCanAccessTryout(catalog.accessType, currentSubscription)) {
            throw new ForbiddenException({
                code: 'ACCESS_EXPIRED',
                message: 'Trial atau subscription Anda tidak aktif untuk tryout ini',
            });
        }
        const selectedQuestions = await this.selectQuestionsForTryout(actor.id, catalog);
        if (selectedQuestions.length !== catalog.totalQuestions) {
            throw new ConflictException({
                code: 'INSUFFICIENT_QUESTIONS',
                message: 'Soal aktif untuk tryout ini belum mencukupi',
            });
        }
        const startedAt = new Date();
        const expiresAt = new Date(startedAt.getTime() + catalog.durationMinutes * 60 * 1000);
        const generationModeSnapshot = catalog.generationRule?.randomizationMode ?? RandomizationMode.manual_question_set;
        const session = await this.prisma.$transaction(async (tx) => {
            const createdSession = await tx.examSession.create({
                data: {
                    userId: actor.id,
                    tryoutCatalogId: catalog.id,
                    status: ExamSessionStatus.in_progress,
                    generationModeSnapshot,
                    tryoutSnapshot: {
                        tryoutCatalogId: catalog.id,
                        name: catalog.name,
                        tryoutType: catalog.tryoutType,
                        accessType: catalog.accessType,
                        durationMinutes: catalog.durationMinutes,
                        totalQuestions: catalog.totalQuestions,
                    },
                    startedAt,
                    expiresAt,
                },
            });
            await tx.examSessionQuestion.createMany({
                data: selectedQuestions.map((question, index) => ({
                    examSessionId: createdSession.id,
                    questionId: question.id,
                    questionOrder: index + 1,
                    questionSnapshot: toInputJson(question.questionSnapshot),
                    optionsSnapshot: toInputJson(question.optionsSnapshot),
                    categorySnapshot: question.categorySnapshot,
                    subCategorySnapshot: question.subCategorySnapshot,
                    topicTagSnapshot: question.topicTagSnapshot,
                    difficultySnapshot: question.difficultySnapshot,
                })),
            });
            return createdSession;
        });
        return {
            examSessionId: session.id,
            status: session.status,
            startedAt: session.startedAt,
            expiresAt: session.expiresAt,
            durationMinutes: catalog.durationMinutes,
            totalQuestions: catalog.totalQuestions,
        };
    }
    async getActiveExam(actor) {
        await this.autoSubmitExpiredActiveSession(actor.id);
        const activeSession = await this.prisma.examSession.findFirst({
            where: {
                userId: actor.id,
                status: ExamSessionStatus.in_progress,
            },
            include: {
                questions: {
                    select: { id: true },
                },
                answers: {
                    select: {
                        selectedLabel: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!activeSession) {
            return {
                hasActiveExam: false,
            };
        }
        const answeredCount = activeSession.answers.filter((answer) => answer.selectedLabel !== null).length;
        return {
            hasActiveExam: true,
            examSessionId: activeSession.id,
            expiresAt: activeSession.expiresAt,
            answeredCount,
            totalQuestions: activeSession.questions.length,
        };
    }
    async getExamSessionDetail(examSessionId, actor) {
        const session = await this.getOwnedExamSession(examSessionId, actor.id);
        if (session.status === ExamSessionStatus.in_progress && session.expiresAt <= new Date()) {
            await this.submitExam(examSessionId, actor, { submitType: 'auto' });
            return await this.getSubmittedExamView(examSessionId, actor.id);
        }
        const questions = session.questions.map((question) => {
            const snapshot = question.questionSnapshot;
            const options = question.optionsSnapshot;
            const answer = question.answers[0] ?? null;
            return {
                examSessionQuestionId: question.id,
                number: question.questionOrder,
                category: question.categorySnapshot,
                subCategory: question.subCategorySnapshot,
                topicTag: question.topicTagSnapshot,
                difficulty: question.difficultySnapshot,
                questionText: snapshot.questionText,
                options: sanitizeQuestionOptionsForActiveExam(options),
                selectedLabel: answer?.selectedLabel ?? null,
                isFlagged: answer?.isFlagged ?? false,
            };
        });
        const answeredCount = session.answers.filter((answer) => answer.selectedLabel !== null).length;
        const flaggedCount = session.answers.filter((answer) => answer.isFlagged).length;
        return {
            examSessionId: session.id,
            status: session.status,
            startedAt: session.startedAt,
            expiresAt: session.expiresAt,
            timerRemainingSeconds: Math.max(0, Math.floor((session.expiresAt.getTime() - Date.now()) / 1000)),
            questions,
            summary: {
                answeredCount,
                unansweredCount: session.questions.length - answeredCount,
                flaggedCount,
            },
        };
    }
    async autosaveAnswer(examSessionId, examSessionQuestionId, rawBody, actor) {
        const payload = this.validationService.validate(autosaveAnswerSchema, rawBody);
        const session = await this.getOwnedExamSession(examSessionId, actor.id);
        if (session.status !== ExamSessionStatus.in_progress) {
            throw new BadRequestException({
                code: 'EXAM_NOT_IN_PROGRESS',
                message: 'Sesi ujian tidak aktif',
            });
        }
        if (session.expiresAt <= new Date()) {
            await this.submitExam(examSessionId, actor, { submitType: 'auto' });
            throw new BadRequestException({
                code: 'EXAM_TIME_EXPIRED',
                message: 'Waktu ujian sudah habis',
            });
        }
        const sessionQuestion = session.questions.find((question) => question.id === examSessionQuestionId);
        if (!sessionQuestion) {
            throw new NotFoundException('Question not found in this exam session');
        }
        const options = sessionQuestion.optionsSnapshot;
        const selectedOption = payload.selectedLabel
            ? options.find((option) => option.label === payload.selectedLabel)
            : null;
        if (payload.selectedLabel && !selectedOption) {
            throw new BadRequestException({
                code: 'INVALID_OPTION',
                message: 'Label opsi tidak valid',
            });
        }
        const updated = await this.prisma.examAnswer.upsert({
            where: {
                examSessionId_examSessionQuestionId: {
                    examSessionId,
                    examSessionQuestionId,
                },
            },
            update: {
                selectedLabel: payload.selectedLabel ?? null,
                selectedOptionId: null,
                isFlagged: payload.isFlagged ?? undefined,
                answeredAt: payload.selectedLabel === undefined ? undefined : new Date(),
            },
            create: {
                examSessionId,
                examSessionQuestionId,
                selectedLabel: payload.selectedLabel ?? null,
                selectedOptionId: null,
                isFlagged: payload.isFlagged ?? false,
                answeredAt: payload.selectedLabel ? new Date() : null,
            },
            select: {
                selectedLabel: true,
                isFlagged: true,
                updatedAt: true,
            },
        });
        return {
            examSessionQuestionId,
            selectedLabel: updated.selectedLabel,
            isFlagged: updated.isFlagged,
            savedAt: updated.updatedAt,
        };
    }
    async flagQuestion(examSessionId, examSessionQuestionId, rawBody, actor) {
        const payload = this.validationService.validate(flagQuestionSchema, rawBody);
        const session = await this.getOwnedExamSession(examSessionId, actor.id);
        if (session.status !== ExamSessionStatus.in_progress) {
            throw new BadRequestException('Sesi ujian tidak aktif');
        }
        const sessionQuestion = session.questions.find((question) => question.id === examSessionQuestionId);
        if (!sessionQuestion) {
            throw new NotFoundException('Question not found in this exam session');
        }
        await this.prisma.examAnswer.upsert({
            where: {
                examSessionId_examSessionQuestionId: {
                    examSessionId,
                    examSessionQuestionId,
                },
            },
            update: {
                isFlagged: payload.isFlagged,
            },
            create: {
                examSessionId,
                examSessionQuestionId,
                isFlagged: payload.isFlagged,
            },
        });
    }
    async submitExam(examSessionId, actor, rawBody) {
        const payload = this.validationService.validate(submitExamSchema, rawBody);
        const ownedSession = await this.getOwnedExamSession(examSessionId, actor.id);
        if (ownedSession.result) {
            return this.toSubmitResponse(ownedSession.result, ownedSession.id, ownedSession.status);
        }
        if (ownedSession.status !== ExamSessionStatus.in_progress) {
            throw new BadRequestException({
                code: 'EXAM_ALREADY_SUBMITTED',
                message: 'Exam sudah pernah disubmit',
            });
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const session = await tx.examSession.findUnique({
                where: { id: examSessionId },
                include: {
                    tryoutCatalog: true,
                    result: true,
                    questions: {
                        orderBy: { questionOrder: 'asc' },
                        include: {
                            answers: true,
                        },
                    },
                },
            });
            if (!session) {
                throw new NotFoundException({
                    code: 'EXAM_NOT_FOUND',
                    message: 'Exam tidak ditemukan',
                });
            }
            if (session.result) {
                return {
                    session,
                    result: session.result,
                };
            }
            const passingGrade = session.tryoutCatalog.passingGradeConfigId
                ? await tx.passingGradeConfig.findUnique({
                    where: { id: session.tryoutCatalog.passingGradeConfigId },
                })
                : await tx.passingGradeConfig.findFirst({
                    where: { isActive: true },
                    orderBy: { effectiveFrom: 'desc' },
                });
            if (!passingGrade) {
                throw new ConflictException('Active passing grade configuration is required');
            }
            let twkScore = 0;
            let tiuScore = 0;
            let tkpScore = 0;
            const answerUpdates = [];
            const breakdownRows = [];
            for (const question of session.questions) {
                const snapshot = question.questionSnapshot;
                const options = question.optionsSnapshot;
                const currentAnswer = question.answers[0] ?? null;
                const selectedOption = currentAnswer?.selectedLabel
                    ? options.find((option) => option.label === currentAnswer.selectedLabel)
                    : null;
                let scoreAwarded = 0;
                let isCorrect = null;
                if (snapshot.category === QuestionCategory.TKP) {
                    scoreAwarded = selectedOption?.tkpWeight ?? 0;
                    isCorrect = null;
                    tkpScore += scoreAwarded;
                }
                else {
                    const correctOption = options.find((option) => option.isCorrect === true);
                    isCorrect = Boolean(selectedOption && correctOption && selectedOption.label === correctOption.label);
                    scoreAwarded = isCorrect ? 5 : 0;
                    if (snapshot.category === QuestionCategory.TWK) {
                        twkScore += scoreAwarded;
                    }
                    else if (snapshot.category === QuestionCategory.TIU) {
                        tiuScore += scoreAwarded;
                    }
                }
                breakdownRows.push({
                    category: snapshot.category,
                    subCategory: snapshot.subCategory,
                    topicTag: snapshot.topicTag,
                    difficulty: snapshot.difficulty,
                    isCorrect,
                    selectedLabel: currentAnswer?.selectedLabel ?? null,
                    scoreAwarded,
                    maxScore: 5,
                });
                answerUpdates.push({
                    id: currentAnswer?.id,
                    examSessionId: session.id,
                    examSessionQuestionId: question.id,
                    selectedLabel: currentAnswer?.selectedLabel ?? null,
                    isCorrect,
                    scoreAwarded,
                    isFlagged: currentAnswer?.isFlagged ?? false,
                    answeredAt: currentAnswer?.answeredAt ?? null,
                });
            }
            for (const answer of answerUpdates) {
                if (answer.id) {
                    await tx.examAnswer.update({
                        where: { id: answer.id },
                        data: {
                            isCorrect: answer.isCorrect,
                            scoreAwarded: answer.scoreAwarded,
                        },
                    });
                }
                else {
                    await tx.examAnswer.create({
                        data: answer,
                    });
                }
            }
            const totalScore = twkScore + tiuScore + tkpScore;
            const twkPassed = twkScore >= passingGrade.twkMinScore;
            const tiuPassed = tiuScore >= passingGrade.tiuMinScore;
            const tkpPassed = tkpScore >= passingGrade.tkpMinScore;
            const totalPassed = totalScore >= passingGrade.totalMinScore;
            const overallPassed = twkPassed && tiuPassed && tkpPassed && totalPassed;
            const breakdown = buildBreakdown(breakdownRows);
            const updatedSession = await tx.examSession.update({
                where: { id: session.id },
                data: {
                    status: payload.submitType === 'auto'
                        ? ExamSessionStatus.auto_submitted
                        : ExamSessionStatus.submitted,
                    submittedAt: new Date(),
                    durationSeconds: Math.max(0, Math.floor((Date.now() - session.startedAt.getTime()) / 1000)),
                },
            });
            const createdResult = await tx.examResult.create({
                data: {
                    examSessionId: session.id,
                    userId: session.userId,
                    passingGradeConfigId: passingGrade.id,
                    twkScore,
                    tiuScore,
                    tkpScore,
                    totalScore,
                    twkPassed,
                    tiuPassed,
                    tkpPassed,
                    totalPassed,
                    overallPassed,
                    breakdownJson: toInputJson(breakdown),
                    generatedAt: new Date(),
                },
            });
            await tx.aIRecommendation.create({
                data: {
                    examResultId: createdResult.id,
                    status: AIRecommendationStatus.processing,
                },
            });
            return {
                session: updatedSession,
                result: createdResult,
            };
        });
        this.aiRecommendationService.queueGeneration(result.result.id);
        return this.toSubmitResponse(result.result, result.session.id, result.session.status);
    }
    async logIntegrityEvent(examSessionId, rawBody, actor) {
        const payload = this.validationService.validate(integrityEventSchema, rawBody);
        await this.getOwnedExamSession(examSessionId, actor.id);
        await this.prisma.examIntegrityLog.create({
            data: {
                examSessionId,
                eventType: payload.eventType,
                metadata: toNullableInputJson(payload.metadata),
            },
        });
        if (payload.eventType === 'tab_switch') {
            await this.prisma.examSession.update({
                where: { id: examSessionId },
                data: {
                    tabSwitchCount: {
                        increment: 1,
                    },
                },
            });
        }
    }
    async getResultDetail(examResultId, actor) {
        const result = await this.prisma.examResult.findUnique({
            where: { id: examResultId },
            include: {
                examSession: true,
                passingGradeConfig: true,
                aiRecommendations: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    select: {
                        status: true,
                    },
                },
            },
        });
        if (!result) {
            throw new NotFoundException('Exam result not found');
        }
        this.assertResultAccess(result.userId, actor);
        const breakdown = formatResultBreakdownForResponse(result.breakdownJson);
        return {
            examResultId: result.id,
            examSessionId: result.examSessionId,
            examDate: result.examSession.startedAt,
            score: {
                twk: result.twkScore,
                tiu: result.tiuScore,
                tkp: result.tkpScore,
                total: result.totalScore,
            },
            passingGrade: {
                twkMinScore: result.passingGradeConfig.twkMinScore,
                tiuMinScore: result.passingGradeConfig.tiuMinScore,
                tkpMinScore: result.passingGradeConfig.tkpMinScore,
                totalMinScore: result.passingGradeConfig.totalMinScore,
            },
            passingStatus: {
                twkPassed: result.twkPassed,
                tiuPassed: result.tiuPassed,
                tkpPassed: result.tkpPassed,
                totalPassed: result.totalPassed,
                overallPassed: result.overallPassed,
            },
            breakdown,
            aiRecommendationStatus: result.aiRecommendations[0]?.status ?? AIRecommendationStatus.processing,
        };
    }
    async getResultAnswers(examResultId, actor, rawQuery) {
        const query = this.validationService.validate(listResultAnswersQuerySchema, rawQuery);
        const result = await this.prisma.examResult.findUnique({
            where: { id: examResultId },
            include: {
                examSession: {
                    include: {
                        questions: {
                            orderBy: { questionOrder: 'asc' },
                            include: {
                                answers: true,
                            },
                        },
                    },
                },
            },
        });
        if (!result) {
            throw new NotFoundException('Exam result not found');
        }
        this.assertResultAccess(result.userId, actor);
        const items = result.examSession.questions
            .map((question) => {
            const snapshot = question.questionSnapshot;
            const options = question.optionsSnapshot;
            const answer = question.answers[0] ?? null;
            const correctOption = options.find((option) => option.isCorrect === true);
            const isCorrect = answer?.isCorrect ?? null;
            return {
                number: question.questionOrder,
                category: question.categorySnapshot,
                subCategory: question.subCategorySnapshot,
                topicTag: question.topicTagSnapshot,
                difficulty: question.difficultySnapshot,
                questionText: snapshot.questionText,
                options: options.map((option) => ({
                    label: option.label,
                    text: option.text,
                })),
                selectedLabel: answer?.selectedLabel ?? null,
                correctLabel: question.categorySnapshot === QuestionCategory.TKP ? null : correctOption?.label ?? null,
                isCorrect,
                scoreAwarded: answer?.scoreAwarded ?? 0,
                explanation: snapshot.explanation ?? null,
            };
        })
            .filter((item) => (query.category ? item.category === query.category : true))
            .filter((item) => {
            if (!query.correctness) {
                return true;
            }
            if (query.correctness === 'empty') {
                return item.selectedLabel === null;
            }
            if (query.correctness === 'correct') {
                return item.isCorrect === true;
            }
            return item.selectedLabel !== null && item.isCorrect !== true;
        });
        const skip = (query.page - 1) * query.limit;
        const paginated = items.slice(skip, skip + query.limit);
        return {
            data: paginated,
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems: items.length,
                totalPages: Math.max(1, Math.ceil(items.length / query.limit)),
            },
        };
    }
    async getAiRecommendation(examResultId, actor) {
        const result = await this.prisma.examResult.findUnique({
            where: { id: examResultId },
            select: {
                id: true,
                userId: true,
            },
        });
        if (!result) {
            throw new NotFoundException('Exam result not found');
        }
        this.assertResultAccess(result.userId, actor);
        const recommendation = await this.prisma.aIRecommendation.findFirst({
            where: { examResultId },
            include: {
                items: {
                    orderBy: { priorityOrder: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!recommendation) {
            return {
                processing: true,
                data: processingAiRecommendationResponse(),
            };
        }
        if (recommendation.status === AIRecommendationStatus.processing) {
            return {
                processing: true,
                data: processingAiRecommendationResponse(),
            };
        }
        return {
            processing: false,
            data: formatAiRecommendationForResponse(recommendation),
        };
    }
    async regenerateAiRecommendation(examResultId, actor, rawBody) {
        if (!isPrivilegedRole(actor.role)) {
            throw new ForbiddenException('You do not have permission to regenerate AI recommendation');
        }
        this.validationService.validate(regenerateAiRecommendationSchema, rawBody);
        const result = await this.prisma.examResult.findUnique({
            where: { id: examResultId },
            select: { id: true },
        });
        if (!result) {
            throw new NotFoundException('Exam result not found');
        }
        const existingProcessing = await this.prisma.aIRecommendation.findFirst({
            where: {
                examResultId,
                status: AIRecommendationStatus.processing,
            },
            orderBy: { createdAt: 'desc' },
            select: { id: true },
        });
        if (!existingProcessing) {
            await this.prisma.aIRecommendation.create({
                data: {
                    examResultId,
                    status: AIRecommendationStatus.processing,
                },
            });
        }
        this.aiRecommendationService.queueGeneration(examResultId);
        return processingAiRecommendationResponse();
    }
    async getExamHistory(actor, rawQuery) {
        const query = this.validationService.validate(examHistoryQuerySchema, rawQuery);
        const where = {
            userId: actor.id,
            ...(query.status === 'passed' ? { overallPassed: true } : {}),
            ...(query.status === 'not_passed' ? { overallPassed: false } : {}),
            ...(query.dateFrom || query.dateTo
                ? {
                    generatedAt: {
                        ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
                        ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
                    },
                }
                : {}),
        };
        const skip = (query.page - 1) * query.limit;
        const [results, totalItems] = await Promise.all([
            this.prisma.examResult.findMany({
                where,
                include: {
                    examSession: true,
                    aiRecommendations: {
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                        include: {
                            items: {
                                orderBy: { priorityOrder: 'asc' },
                                take: 1,
                            },
                        },
                    },
                },
                orderBy: { generatedAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.examResult.count({ where }),
        ]);
        return {
            data: results.map((result) => ({
                examResultId: result.id,
                examSessionId: result.examSessionId,
                examDate: result.examSession.startedAt,
                twkScore: result.twkScore,
                tiuScore: result.tiuScore,
                tkpScore: result.tkpScore,
                totalScore: result.totalScore,
                overallPassed: result.overallPassed,
                weakestTopic: result.aiRecommendations[0]?.items[0]?.topicTag ?? null,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    async autoSubmitExpiredActiveSession(userId) {
        const session = await this.prisma.examSession.findFirst({
            where: {
                userId,
                status: ExamSessionStatus.in_progress,
                expiresAt: {
                    lte: new Date(),
                },
            },
            select: {
                id: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        if (!session) {
            return;
        }
        const actor = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                phone: true,
                role: true,
                status: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!actor) {
            return;
        }
        await this.submitExam(session.id, actor, { submitType: 'auto' });
    }
    async getOwnedExamSession(examSessionId, userId) {
        const session = await this.prisma.examSession.findUnique({
            where: { id: examSessionId },
            include: {
                result: true,
                questions: {
                    orderBy: { questionOrder: 'asc' },
                    include: {
                        answers: true,
                    },
                },
                answers: true,
            },
        });
        if (!session) {
            throw new NotFoundException({
                code: 'EXAM_NOT_FOUND',
                message: 'Exam tidak ditemukan',
            });
        }
        if (session.userId !== userId) {
            throw new ForbiddenException({
                code: 'EXAM_NOT_OWNED',
                message: 'Exam bukan milik user',
            });
        }
        return session;
    }
    async getSubmittedExamView(examSessionId, userId) {
        const session = await this.prisma.examSession.findUnique({
            where: { id: examSessionId },
            include: { result: true },
        });
        if (!session || session.userId !== userId || !session.result) {
            throw new NotFoundException('Exam result not found');
        }
        return this.toSubmitResponse(session.result, session.id, session.status);
    }
    toSubmitResponse(result, examSessionId, status) {
        return {
            examSessionId,
            examResultId: result.id,
            status,
            score: {
                twk: result.twkScore,
                tiu: result.tiuScore,
                tkp: result.tkpScore,
                total: result.totalScore,
            },
            passingStatus: {
                twkPassed: result.twkPassed,
                tiuPassed: result.tiuPassed,
                tkpPassed: result.tkpPassed,
                totalPassed: result.totalPassed,
                overallPassed: result.overallPassed,
            },
            aiRecommendationStatus: AIRecommendationStatus.processing,
        };
    }
    async selectQuestionsForTryout(userId, catalog) {
        const generationMode = catalog.generationRule?.randomizationMode ?? RandomizationMode.manual_question_set;
        const excludedQuestionIds = await this.getExcludedQuestionIds(userId, catalog.generationRule?.avoidRecentQuestions ?? false, catalog.generationRule?.avoidRecentExamCount ?? 0);
        const selected = new Map();
        if (tryoutUsesManualSet(catalog.tryoutType, generationMode)) {
            const approvedSet = catalog.manualQuestionSets[0];
            if (!approvedSet) {
                throw new ConflictException('Approved manual question set is missing');
            }
            const manualQuestions = await this.prisma.question.findMany({
                where: {
                    id: {
                        in: approvedSet.items.map((item) => item.questionId),
                    },
                    status: QuestionStatus.active,
                    deletedAt: null,
                },
                include: {
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
                    options: {
                        orderBy: { displayOrder: 'asc' },
                    },
                },
            });
            const byId = new Map(manualQuestions.map((item) => [item.id, item]));
            for (const item of approvedSet.items) {
                const question = byId.get(item.questionId);
                if (!question) {
                    continue;
                }
                selected.set(question.id, this.toExamSessionQuestionSnapshot(question));
            }
        }
        if (catalog.tryoutType === TryoutType.manual) {
            return [...selected.values()].slice(0, catalog.totalQuestions);
        }
        const sections = catalog.generationRule?.sections ?? [];
        for (const section of sections) {
            const currentCategoryCount = [...selected.values()].filter((item) => item.categorySnapshot === section.category).length;
            const requiredForCategory = Math.max(0, section.questionCount - currentCategoryCount);
            if (requiredForCategory === 0) {
                continue;
            }
            const difficultyDistribution = section.difficultyDistributionJson;
            const topicDistribution = section.topicDistributionJson;
            if (difficultyDistribution) {
                for (const [difficulty, count] of Object.entries(difficultyDistribution)) {
                    await this.appendQuestions(selected, {
                        category: section.category,
                        difficulty,
                        take: count,
                        excludedQuestionIds,
                    });
                }
            }
            else if (topicDistribution) {
                for (const topic of topicDistribution) {
                    await this.appendQuestions(selected, {
                        category: section.category,
                        topicTag: topic.topicTag,
                        take: topic.questionCount,
                        excludedQuestionIds,
                    });
                }
            }
            const stillNeeded = section.questionCount - [...selected.values()].filter((item) => item.categorySnapshot === section.category).length;
            if (stillNeeded > 0) {
                await this.appendQuestions(selected, {
                    category: section.category,
                    take: stillNeeded,
                    excludedQuestionIds,
                });
            }
        }
        return [...selected.values()].slice(0, catalog.totalQuestions);
    }
    async appendQuestions(selected, input) {
        if (input.take <= 0) {
            return;
        }
        const questions = await this.prisma.question.findMany({
            where: {
                status: QuestionStatus.active,
                deletedAt: null,
                category: input.category,
                ...(input.difficulty ? { difficulty: input.difficulty } : {}),
                ...(input.topicTag
                    ? {
                        topicTagRef: {
                            is: {
                                name: input.topicTag,
                            },
                        },
                    }
                    : {}),
                id: {
                    notIn: [...selected.keys(), ...input.excludedQuestionIds],
                },
            },
            include: {
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
                options: {
                    orderBy: { displayOrder: 'asc' },
                },
            },
        });
        for (const question of shuffle(questions).slice(0, input.take)) {
            selected.set(question.id, this.toExamSessionQuestionSnapshot(question));
        }
    }
    async getExcludedQuestionIds(userId, avoidRecentQuestions, avoidRecentExamCount) {
        if (!avoidRecentQuestions || avoidRecentExamCount <= 0) {
            return new Set();
        }
        const recentSessions = await this.prisma.examSession.findMany({
            where: {
                userId,
                status: {
                    in: [ExamSessionStatus.submitted, ExamSessionStatus.auto_submitted],
                },
            },
            select: { id: true },
            orderBy: { createdAt: 'desc' },
            take: avoidRecentExamCount,
        });
        if (recentSessions.length === 0) {
            return new Set();
        }
        const recentQuestions = await this.prisma.examSessionQuestion.findMany({
            where: {
                examSessionId: {
                    in: recentSessions.map((session) => session.id),
                },
            },
            select: {
                questionId: true,
            },
        });
        return new Set(recentQuestions.map((item) => item.questionId));
    }
    toExamSessionQuestionSnapshot(question) {
        return {
            id: question.id,
            questionSnapshot: {
                id: question.id,
                questionText: question.questionText,
                category: question.category,
                subCategory: question.subCategoryRef.name,
                topicTag: question.topicTagRef.name,
                competencyArea: question.competencyArea,
                difficulty: question.difficulty,
                explanation: question.explanation,
            },
            optionsSnapshot: question.options.map((option) => ({
                label: option.label,
                text: option.optionText,
                isCorrect: option.isCorrect,
                tkpWeight: option.tkpWeight,
            })),
            categorySnapshot: question.category,
            subCategorySnapshot: question.subCategoryRef.name,
            topicTagSnapshot: question.topicTagRef.name,
            difficultySnapshot: question.difficulty,
        };
    }
    assertResultAccess(resultUserId, actor) {
        if (resultUserId === actor.id) {
            return;
        }
        if (!isPrivilegedRole(actor.role)) {
            throw new ForbiddenException('You do not have access to this result');
        }
    }
};
ExamEngineService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ValidationService,
        AiRecommendationService])
], ExamEngineService);
export { ExamEngineService };
//# sourceMappingURL=exam-engine.service.js.map