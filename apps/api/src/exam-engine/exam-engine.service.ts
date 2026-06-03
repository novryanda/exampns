import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AIRecommendationStatus,
  ExamSessionStatus,
  Prisma,
  QuestionAnswerMode,
  QuestionDifficulty,
  QuestionStatus,
  RandomizationMode,
  TryoutStatus,
  TryoutType,
  UserRole,
} from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AccessResolverService } from '../common/access-resolver.service.js';
import { canAccessTryout } from '../common/access-control.helpers.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  autosaveAnswerSchema,
  examHistoryQuerySchema,
  flagQuestionSchema,
  integrityEventSchema,
  listResultAnswersQuerySchema,
  regenerateAiRecommendationSchema,
  startExamSchema,
  submitExamSchema,
} from './exam-engine.schemas.js';
import {
  buildBreakdown,
  buildWeakAreaItems,
  type BreakdownItem,
  formatAiRecommendationForResponse,
  formatResultBreakdownForResponse,
  isPrivilegedRole,
  processingAiRecommendationResponse,
  resolveTryoutCatalogId,
  sanitizeQuestionOptionsForActiveExam,
  shuffle,
  toInputJson,
  toNullableInputJson,
  type QuestionSnapshotOption,
  type QuestionSnapshotPayload,
} from './exam-engine.helpers.js';
import { AiRecommendationService } from './ai-recommendation.service.js';

interface DynamicCategoryScore {
  categoryCode: string;
  categoryName: string;
  score: number;
  minScore: number;
  passed: boolean;
}

@Injectable()
export class ExamEngineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accessResolverService: AccessResolverService,
    private readonly validationService: ValidationService,
    private readonly aiRecommendationService: AiRecommendationService,
  ) {}

  async startExam(rawBody: unknown, actor: AuthenticatedUser) {
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

    const [accessResolution, catalog] = await Promise.all([
      this.accessResolverService.resolveEffectiveAccessLevel(actor.id),
      this.prisma.tryoutCatalog.findUnique({
        where: { id: tryoutCatalogId },
        include: {
          generationRule: {
            include: {
              sections: {
                include: {
                  categoryRef: true,
                },
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
      }),
    ]);

    if (!catalog || catalog.status !== TryoutStatus.published || !catalog.isPublic) {
      throw new NotFoundException('Tryout catalog tidak tersedia');
    }

    if (!canAccessTryout(catalog.accessType, accessResolution.effectiveAccessLevel)) {
      const message =
        catalog.accessType === 'premium_only'
          ? 'Tryout ini hanya tersedia untuk pengguna premium aktif'
          : catalog.accessType === 'paid_only'
            ? 'Tryout ini membutuhkan subscription berbayar yang aktif'
            : catalog.accessType === 'trial_only'
              ? 'Tryout ini hanya tersedia untuk akses trial aktif'
              : 'Trial atau subscription Anda tidak aktif untuk tryout ini';
      throw new ForbiddenException({
        code: 'ACCESS_LEVEL_REQUIRED',
        message,
      });
    }

    const selectedQuestions = await this.selectQuestionsForTryout(actor.id, catalog);
    if (selectedQuestions.length !== catalog.totalQuestions) {
      throw new ConflictException({
        code: 'TRYOUT_NOT_READY',
        message: 'Soal aktif untuk tryout ini belum mencukupi',
      });
    }

    const startedAt = new Date();
    const expiresAt = new Date(startedAt.getTime() + catalog.durationMinutes * 60 * 1000);
    const generationModeSnapshot =
      catalog.generationRule?.randomizationMode ?? RandomizationMode.manual_question_set;

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
          categoryNameSnapshot: question.categoryNameSnapshot,
          answerModeSnapshot: question.answerModeSnapshot,
          subCategorySnapshot: question.subCategorySnapshot,
          topicTagSnapshot: question.topicTagSnapshot,
          difficultySnapshot: question.difficultySnapshot,
        })),
      });

      const meteredSubscription = accessResolution.activeSubscription;
      if (meteredSubscription?.tryoutLimit !== null && meteredSubscription?.tryoutLimit !== undefined) {
        const updated = await tx.userSubscription.updateMany({
          where: {
            id: meteredSubscription.id,
            status: 'active',
            endDate: {
              gt: startedAt,
            },
            tryoutUsed: {
              lt: meteredSubscription.tryoutLimit,
            },
          },
          data: {
            tryoutUsed: {
              increment: 1,
            },
          },
        });

        if (updated.count === 0) {
          throw new ConflictException({
            code: 'ACCESS_EXPIRED',
            message: 'Kuota tryout aktif Anda sudah habis.',
          });
        }
      }

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

  async getActiveExam(actor: AuthenticatedUser) {
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

  async getExamSessionDetail(examSessionId: string, actor: AuthenticatedUser) {
    const session = await this.getOwnedExamSession(examSessionId, actor.id);

    if (session.result && session.status !== ExamSessionStatus.in_progress) {
      return this.toSubmitResponse(session.result, session.id, session.status);
    }

    if (session.status === ExamSessionStatus.in_progress && session.expiresAt <= new Date()) {
      await this.submitExam(examSessionId, actor, { submitType: 'auto' });
      return await this.getSubmittedExamView(examSessionId, actor.id);
    }

    const questions = session.questions.map((question) => {
      const snapshot = question.questionSnapshot as unknown as QuestionSnapshotPayload;
      const options = question.optionsSnapshot as unknown as QuestionSnapshotOption[];
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
      timerRemainingSeconds: Math.max(
        0,
        Math.floor((session.expiresAt.getTime() - Date.now()) / 1000),
      ),
      questions,
      summary: {
        answeredCount,
        unansweredCount: session.questions.length - answeredCount,
        flaggedCount,
      },
    };
  }

  async autosaveAnswer(
    examSessionId: string,
    examSessionQuestionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

    const options = sessionQuestion.optionsSnapshot as unknown as QuestionSnapshotOption[];
    const selectedOption = payload.selectedLabel
      ? options.find((option) => option.label === payload.selectedLabel)
      : null;

    if (payload.selectedLabel && !selectedOption) {
      throw new BadRequestException({
        code: 'INVALID_OPTION',
        message: 'Label opsi tidak valid',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  async flagQuestion(
    examSessionId: string,
    examSessionQuestionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

  async submitExam(
    examSessionId: string,
    actor: AuthenticatedUser,
    rawBody: unknown,
  ) {
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
          result: {
            include: {
              categoryScores: {
                orderBy: { categoryCode: 'asc' },
              },
            },
          },
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
            include: {
              items: {
                include: {
                  categoryRef: {
                    select: {
                      id: true,
                      code: true,
                      name: true,
                    },
                  },
                },
              },
            },
          })
        : await tx.passingGradeConfig.findFirst({
            where: { isActive: true },
            orderBy: { effectiveFrom: 'desc' },
            include: {
              items: {
                include: {
                  categoryRef: {
                    select: {
                      id: true,
                      code: true,
                      name: true,
                    },
                  },
                },
              },
            },
          });

      if (!passingGrade) {
        throw new ConflictException('Active passing grade configuration is required');
      }

      const passingGradeByCategory = new Map(
        passingGrade.items.map((item) => [
          item.categoryRef.code,
          {
            minScore: item.minScore,
            categoryName: item.categoryRef.name,
          },
        ]),
      );
      const categoryScoreMap = new Map<string, DynamicCategoryScore>();

      const answerUpdates: Array<{
        id?: string;
        examSessionId: string;
        examSessionQuestionId: string;
        selectedLabel: string | null;
        isCorrect: boolean | null;
        scoreAwarded: number;
        isFlagged: boolean;
        answeredAt: Date | null;
      }> = [];

      const breakdownRows: Array<{
        category: string;
        categoryName: string;
        answerMode: QuestionAnswerMode;
        subCategory: string;
        topicTag: string;
        difficulty: QuestionDifficulty;
        isCorrect: boolean | null;
        selectedLabel: string | null;
        scoreAwarded: number;
        maxScore: number;
      }> = [];

      for (const question of session.questions) {
        const snapshot = question.questionSnapshot as unknown as QuestionSnapshotPayload;
        const options = question.optionsSnapshot as unknown as QuestionSnapshotOption[];
        const currentAnswer = question.answers[0] ?? null;
        const selectedOption = currentAnswer?.selectedLabel
          ? options.find((option) => option.label === currentAnswer.selectedLabel)
          : null;
        const categoryCode = question.categorySnapshot;
        const categoryName =
          passingGradeByCategory.get(categoryCode)?.categoryName ?? question.categoryNameSnapshot;
        const maxScore =
          question.answerModeSnapshot === QuestionAnswerMode.weighted_options
            ? Math.max(0, ...options.map((option) => option.optionWeight ?? 0))
            : 5;

        let scoreAwarded = 0;
        let isCorrect: boolean | null = null;

        if (question.answerModeSnapshot === QuestionAnswerMode.weighted_options) {
          scoreAwarded = selectedOption?.optionWeight ?? 0;
          isCorrect = selectedOption ? scoreAwarded >= maxScore : null;
        } else {
          const correctOption = options.find((option) => option.isCorrect === true);
          isCorrect = Boolean(selectedOption && correctOption && selectedOption.label === correctOption.label);
          scoreAwarded = isCorrect ? 5 : 0;
        }

        const currentCategoryScore = categoryScoreMap.get(categoryCode) ?? {
          categoryCode,
          categoryName,
          score: 0,
          minScore: passingGradeByCategory.get(categoryCode)?.minScore ?? 0,
          passed: false,
        };
        currentCategoryScore.score += scoreAwarded;
        categoryScoreMap.set(categoryCode, currentCategoryScore);

        breakdownRows.push({
          category: categoryCode,
          categoryName,
          answerMode: question.answerModeSnapshot,
          subCategory: snapshot.subCategory,
          topicTag: snapshot.topicTag,
          difficulty: snapshot.difficulty,
          isCorrect,
          selectedLabel: currentAnswer?.selectedLabel ?? null,
          scoreAwarded,
          maxScore,
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
        } else {
          await tx.examAnswer.create({
            data: answer,
          });
        }
      }

      const categoryScores = [...categoryScoreMap.values()]
        .map((item) => ({
          ...item,
          passed: item.score >= item.minScore,
        }))
        .sort((left, right) => left.categoryCode.localeCompare(right.categoryCode));

      const totalScore = categoryScores.reduce((sum, item) => sum + item.score, 0);
      const totalPassed = totalScore >= passingGrade.totalMinScore;
      const overallPassed = totalPassed && categoryScores.every((item) => item.passed);
      const breakdown = buildBreakdown(breakdownRows);

      const updatedSession = await tx.examSession.update({
        where: { id: session.id },
        data: {
          status:
            payload.submitType === 'auto'
              ? ExamSessionStatus.auto_submitted
              : ExamSessionStatus.submitted,
          submittedAt: new Date(),
          durationSeconds: Math.max(
            0,
            Math.floor((Date.now() - session.startedAt.getTime()) / 1000),
          ),
        },
      });

      const createdResult = await tx.examResult.create({
        data: {
          examSessionId: session.id,
          userId: session.userId,
          passingGradeConfigId: passingGrade.id,
          totalScore,
          totalPassed,
          overallPassed,
          breakdownJson: toInputJson(breakdown),
          generatedAt: new Date(),
          categoryScores: {
            create: categoryScores,
          },
        },
        include: {
          categoryScores: {
            orderBy: { categoryCode: 'asc' },
          },
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

  async logIntegrityEvent(
    examSessionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

  async getResultDetail(examResultId: string, actor: AuthenticatedUser) {
    const result = await this.prisma.examResult.findUnique({
      where: { id: examResultId },
      include: {
        examSession: true,
        passingGradeConfig: {
          include: {
            items: {
              include: {
                categoryRef: {
                  select: {
                    code: true,
                    name: true,
                  },
                },
              },
              orderBy: {
                categoryRef: {
                  sortOrder: 'asc',
                },
              },
            },
          },
        },
        categoryScores: {
          orderBy: { categoryCode: 'asc' },
        },
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

    const breakdown = formatResultBreakdownForResponse(result.breakdownJson as unknown as Array<{
      category: string;
      categoryName: string;
      answerMode: QuestionAnswerMode;
      subCategory: string;
      topicTag: string;
      difficulty: QuestionDifficulty;
      totalQuestions: number;
      correctAnswers: number;
      wrongAnswers: number;
      accuracy: number;
    }>);

    return {
      examResultId: result.id,
      examSessionId: result.examSessionId,
      examDate: result.examSession.startedAt,
      score: {
        total: result.totalScore,
        categories: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
          minScore: item.minScore,
          passed: item.passed,
        })),
      },
      passingGrade: {
        totalMinScore: result.passingGradeConfig.totalMinScore,
        categoryMinimums: result.passingGradeConfig.items.map((item) => ({
          categoryCode: item.categoryRef.code,
          categoryName: item.categoryRef.name,
          minScore: item.minScore,
        })),
      },
      passingStatus: {
        totalPassed: result.totalPassed,
        overallPassed: result.overallPassed,
        categories: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          passed: item.passed,
        })),
      },
      breakdown,
      aiRecommendationStatus:
        result.aiRecommendations[0]?.status ?? AIRecommendationStatus.processing,
    };
  }

  async getResultAnswers(examResultId: string, actor: AuthenticatedUser, rawQuery: unknown) {
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
        const snapshot = question.questionSnapshot as unknown as QuestionSnapshotPayload;
        const options = question.optionsSnapshot as unknown as QuestionSnapshotOption[];
        const answer = question.answers[0] ?? null;
        const correctOption = options.find((option) => option.isCorrect === true);
        const isCorrect = answer?.isCorrect ?? null;

        return {
          number: question.questionOrder,
          category: question.categorySnapshot,
          categoryName: question.categoryNameSnapshot,
          subCategory: question.subCategorySnapshot,
          topicTag: question.topicTagSnapshot,
          difficulty: question.difficultySnapshot,
          questionText: snapshot.questionText,
          options: options.map((option) => ({
            label: option.label,
            text: option.text,
          })),
          selectedLabel: answer?.selectedLabel ?? null,
          correctLabel:
            question.answerModeSnapshot === QuestionAnswerMode.weighted_options
              ? null
              : correctOption?.label ?? null,
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

  async getAiRecommendation(examResultId: string, actor: AuthenticatedUser) {
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

  async regenerateAiRecommendation(
    examResultId: string,
    actor: AuthenticatedUser,
    rawBody: unknown,
  ) {
    if (!isPrivilegedRole(actor.role as UserRole | undefined)) {
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

  async getExamHistory(actor: AuthenticatedUser, rawQuery: unknown) {
    const query = this.validationService.validate(examHistoryQuerySchema, rawQuery);
    const where: Prisma.ExamResultWhereInput = {
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
          categoryScores: {
            orderBy: { categoryCode: 'asc' },
          },
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
        totalScore: result.totalScore,
        categoryScores: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
          minScore: item.minScore,
          passed: item.passed,
        })),
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

  private async autoSubmitExpiredActiveSession(userId: string) {
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

    await this.submitExam(session.id, actor as AuthenticatedUser, { submitType: 'auto' });
  }

  private async getOwnedExamSession(examSessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: examSessionId },
      include: {
        result: {
          include: {
            categoryScores: {
              orderBy: { categoryCode: 'asc' },
            },
          },
        },
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

  private async getSubmittedExamView(examSessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: examSessionId },
      include: {
        result: {
          include: {
            categoryScores: {
              orderBy: { categoryCode: 'asc' },
            },
          },
        },
      },
    });

    if (!session || session.userId !== userId || !session.result) {
      throw new NotFoundException('Exam result not found');
    }

    return this.toSubmitResponse(session.result, session.id, session.status);
  }

  private toSubmitResponse(
    result: {
      id: string;
      totalScore: number;
      totalPassed: boolean;
      overallPassed: boolean;
      categoryScores: DynamicCategoryScore[];
    },
    examSessionId: string,
    status: string,
  ) {
    return {
      examSessionId,
      examResultId: result.id,
      status,
      score: {
        total: result.totalScore,
        categories: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
          minScore: item.minScore,
          passed: item.passed,
        })),
      },
      passingStatus: {
        totalPassed: result.totalPassed,
        overallPassed: result.overallPassed,
        categories: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          passed: item.passed,
        })),
      },
      aiRecommendationStatus: AIRecommendationStatus.processing,
    };
  }

  private async selectQuestionsForTryout(
    userId: string,
    catalog: Prisma.TryoutCatalogGetPayload<{
      include: {
        generationRule: { include: { sections: { include: { categoryRef: true } } } };
        manualQuestionSets: { include: { items: true } };
      };
    }>,
  ) {
    const excludedQuestionIds = await this.getExcludedQuestionIds(
      userId,
      catalog.generationRule?.avoidRecentQuestions ?? false,
      catalog.generationRule?.avoidRecentExamCount ?? 0,
    );

    const selected = new Map<
      string,
      {
        id: string;
        questionSnapshot: QuestionSnapshotPayload;
        optionsSnapshot: QuestionSnapshotOption[];
        categorySnapshot: string;
        categoryNameSnapshot: string;
        answerModeSnapshot: QuestionAnswerMode;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: QuestionDifficulty;
      }
    >();
    const approvedSet = catalog.manualQuestionSets[0] ?? null;

    switch (catalog.tryoutType) {
      case TryoutType.manual: {
        if (!approvedSet) {
          throw new ConflictException('Approved manual question set is missing');
        }

        await this.appendManualQuestionSet(selected, approvedSet);
        return [...selected.values()].slice(0, catalog.totalQuestions);
      }
      case TryoutType.hybrid: {
        if (!approvedSet) {
          throw new ConflictException('Approved manual question set is missing');
        }

        if (!catalog.generationRule) {
          throw new ConflictException('Generation rule is missing');
        }

        await this.appendManualQuestionSet(selected, approvedSet);
        await this.appendQuestionsUsingGenerationSections(
          selected,
          catalog.generationRule.sections,
          excludedQuestionIds,
        );
        return [...selected.values()].slice(0, catalog.totalQuestions);
      }
      case TryoutType.adaptive: {
        if (!catalog.generationRule) {
          throw new ConflictException('Generation rule is missing');
        }

        await this.appendAdaptiveQuestions(userId, selected, excludedQuestionIds, catalog);
        await this.appendQuestionsUsingGenerationSections(
          selected,
          catalog.generationRule.sections,
          excludedQuestionIds,
        );
        return [...selected.values()].slice(0, catalog.totalQuestions);
      }
      case TryoutType.generated:
      default: {
        if (!catalog.generationRule) {
          throw new ConflictException('Generation rule is missing');
        }

        await this.appendQuestionsUsingGenerationSections(
          selected,
          catalog.generationRule.sections,
          excludedQuestionIds,
        );
        return [...selected.values()].slice(0, catalog.totalQuestions);
      }
    }
  }

  private async appendManualQuestionSet(
    selected: Map<
      string,
      {
        id: string;
        questionSnapshot: QuestionSnapshotPayload;
        optionsSnapshot: QuestionSnapshotOption[];
        categorySnapshot: string;
        categoryNameSnapshot: string;
        answerModeSnapshot: QuestionAnswerMode;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: QuestionDifficulty;
      }
    >,
    approvedSet: {
      items: Array<{ questionId: string }>;
    },
  ) {
    const manualQuestions = await this.prisma.question.findMany({
      where: {
        id: {
          in: approvedSet.items.map((item) => item.questionId),
        },
        status: QuestionStatus.active,
        deletedAt: null,
      },
      include: {
        categoryRef: {
          select: {
            code: true,
            name: true,
            answerMode: true,
          },
        },
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

  private async appendQuestionsUsingGenerationSections(
    selected: Map<
      string,
      {
        id: string;
        questionSnapshot: QuestionSnapshotPayload;
        optionsSnapshot: QuestionSnapshotOption[];
        categorySnapshot: string;
        categoryNameSnapshot: string;
        answerModeSnapshot: QuestionAnswerMode;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: QuestionDifficulty;
      }
    >,
    sections: Array<{
      categoryId: string;
      questionCount: number;
      difficultyDistributionJson: Prisma.JsonValue | null;
      topicDistributionJson: Prisma.JsonValue | null;
      categoryRef: {
        code: string;
        name: string;
        answerMode: QuestionAnswerMode;
      };
    }>,
    excludedQuestionIds: Set<string>,
  ) {
    for (const section of sections) {
      const currentCategoryCount = [...selected.values()].filter(
        (item) => item.categorySnapshot === section.categoryRef.code,
      ).length;
      const requiredForCategory = Math.max(0, section.questionCount - currentCategoryCount);

      if (requiredForCategory === 0) {
        continue;
      }

      const difficultyDistribution = section.difficultyDistributionJson as
        | Record<string, number>
        | null;
      const topicDistribution = section.topicDistributionJson as
        | Array<{ topicTag: string; questionCount: number }>
        | null;

      if (difficultyDistribution) {
        for (const [difficulty, count] of Object.entries(difficultyDistribution)) {
          await this.appendQuestions(selected, {
            categoryCode: section.categoryRef.code,
            difficulty,
            take: count,
            excludedQuestionIds,
          });
        }
      } else if (topicDistribution) {
        for (const topic of topicDistribution) {
          await this.appendQuestions(selected, {
            categoryCode: section.categoryRef.code,
            topicTag: topic.topicTag,
            take: topic.questionCount,
            excludedQuestionIds,
          });
        }
      }

      const stillNeeded = section.questionCount - [...selected.values()].filter(
        (item) => item.categorySnapshot === section.categoryRef.code,
      ).length;

      if (stillNeeded > 0) {
        await this.appendQuestions(selected, {
          categoryCode: section.categoryRef.code,
          take: stillNeeded,
          excludedQuestionIds,
        });
      }
    }
  }

  private async appendAdaptiveQuestions(
    userId: string,
    selected: Map<
      string,
      {
        id: string;
        questionSnapshot: QuestionSnapshotPayload;
        optionsSnapshot: QuestionSnapshotOption[];
        categorySnapshot: string;
        categoryNameSnapshot: string;
        answerModeSnapshot: QuestionAnswerMode;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: QuestionDifficulty;
      }
    >,
    excludedQuestionIds: Set<string>,
    catalog: Prisma.TryoutCatalogGetPayload<{
      include: {
        generationRule: { include: { sections: { include: { categoryRef: true } } } };
        manualQuestionSets: { include: { items: true } };
      };
    }>,
  ) {
    const config = this.readAdaptiveConfig(catalog.generationRule?.rulesJson);
    if (!config) {
      return;
    }

    const weakAreas = await this.getAdaptiveWeakAreas(userId, config.maxWeakAreas);
    for (const weakArea of weakAreas) {
      await this.appendQuestions(selected, {
        categoryCode: weakArea.categoryCode,
        topicTag: weakArea.topicTag,
        take: config.perWeakAreaQuestionCap,
        excludedQuestionIds,
      });
    }
  }

  private async getAdaptiveWeakAreas(userId: string, maxWeakAreas: number) {
    const latestRecommendation = await this.prisma.aIRecommendation.findFirst({
      where: {
        status: {
          in: [AIRecommendationStatus.completed, AIRecommendationStatus.fallback],
        },
        examResult: {
          userId,
        },
      },
      include: {
        items: {
          orderBy: [{ priorityOrder: 'asc' }],
        },
      },
      orderBy: [{ generatedAt: 'desc' }, { createdAt: 'desc' }],
    });

    if (latestRecommendation && latestRecommendation.items.length > 0) {
      return latestRecommendation.items.slice(0, maxWeakAreas).map((item) => ({
        categoryCode: item.category,
        topicTag: item.topicTag,
      }));
    }

    const recentResults = await this.prisma.examResult.findMany({
      where: { userId },
      orderBy: { generatedAt: 'desc' },
      take: 6,
      select: {
        breakdownJson: true,
        categoryScores: {
          select: {
            categoryCode: true,
            passed: true,
          },
        },
      },
    });

    const latestResult = recentResults[0];
    if (!latestResult) {
      return [];
    }

    const weakAreas = buildWeakAreaItems(
      latestResult.breakdownJson as unknown as BreakdownItem[],
      Object.fromEntries(latestResult.categoryScores.map((item) => [item.categoryCode, item.passed])),
      recentResults
        .slice(1)
        .map((item) => item.breakdownJson as unknown as BreakdownItem[]),
    );

    return weakAreas.slice(0, maxWeakAreas).map((item) => ({
      categoryCode: item.category,
      topicTag: item.topicTag,
    }));
  }

  private readAdaptiveConfig(rawValue: Prisma.JsonValue | null | undefined) {
    if (!rawValue || typeof rawValue !== 'object' || Array.isArray(rawValue)) {
      return null;
    }

    const value = rawValue as Record<string, unknown>;
    const strategy =
      value.strategy === 'latest_ai_recommendation' ? 'latest_ai_recommendation' : null;
    const fallbackStrategy =
      value.fallbackStrategy === 'generation_rule' ? 'generation_rule' : null;
    const maxWeakAreas =
      typeof value.maxWeakAreas === 'number' && value.maxWeakAreas > 0
        ? value.maxWeakAreas
        : null;
    const perWeakAreaQuestionCap =
      typeof value.perWeakAreaQuestionCap === 'number' && value.perWeakAreaQuestionCap > 0
        ? value.perWeakAreaQuestionCap
        : null;

    if (!strategy || !fallbackStrategy || !maxWeakAreas || !perWeakAreaQuestionCap) {
      return null;
    }

    return {
      strategy,
      fallbackStrategy,
      maxWeakAreas,
      perWeakAreaQuestionCap,
      includeTrendBoost: value.includeTrendBoost === true,
    };
  }

  private async appendQuestions(
    selected: Map<
      string,
      {
        id: string;
        questionSnapshot: QuestionSnapshotPayload;
        optionsSnapshot: QuestionSnapshotOption[];
        categorySnapshot: string;
        categoryNameSnapshot: string;
        answerModeSnapshot: QuestionAnswerMode;
        subCategorySnapshot: string;
        topicTagSnapshot: string;
        difficultySnapshot: QuestionDifficulty;
      }
    >,
    input: {
      categoryCode: string;
      difficulty?: string;
      topicTag?: string;
      take: number;
      excludedQuestionIds: Set<string>;
    },
  ) {
    if (input.take <= 0) {
      return;
    }

    const questions = await this.prisma.question.findMany({
      where: {
        status: QuestionStatus.active,
        deletedAt: null,
        categoryRef: {
          is: {
            code: input.categoryCode,
          },
        },
        ...(input.difficulty ? { difficulty: input.difficulty as never } : {}),
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
        categoryRef: {
          select: {
            code: true,
            name: true,
            answerMode: true,
          },
        },
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

  private async getExcludedQuestionIds(
    userId: string,
    avoidRecentQuestions: boolean,
    avoidRecentExamCount: number,
  ) {
    if (!avoidRecentQuestions || avoidRecentExamCount <= 0) {
      return new Set<string>();
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
      return new Set<string>();
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

  private toExamSessionQuestionSnapshot(question: {
    id: string;
    questionText: string;
    categoryRef: {
      code: string;
      name: string;
      answerMode: QuestionAnswerMode;
    };
    subCategoryRef: {
      name: string;
    };
    topicTagRef: {
      name: string;
    };
    competencyArea: string | null;
    difficulty: QuestionDifficulty;
    explanation: string | null;
    options: Array<{
      label: string;
      optionText: string;
      isCorrect: boolean;
      optionWeight: number | null;
    }>;
  }) {
    return {
      id: question.id,
      questionSnapshot: {
        id: question.id,
        questionText: question.questionText,
        category: question.categoryRef.code,
        categoryName: question.categoryRef.name,
        answerMode: question.categoryRef.answerMode,
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
        optionWeight: option.optionWeight,
      })),
      categorySnapshot: question.categoryRef.code,
      categoryNameSnapshot: question.categoryRef.name,
      answerModeSnapshot: question.categoryRef.answerMode,
      subCategorySnapshot: question.subCategoryRef.name,
      topicTagSnapshot: question.topicTagRef.name,
      difficultySnapshot: question.difficulty,
    };
  }

  private assertResultAccess(resultUserId: string, actor: AuthenticatedUser) {
    if (resultUserId === actor.id) {
      return;
    }

    if (!isPrivilegedRole(actor.role as UserRole | undefined)) {
      throw new ForbiddenException('You do not have access to this result');
    }
  }
}
