import { AIRecommendationStatus, ExamSessionStatus, QuestionCategory, QuestionDifficulty } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { AiRecommendationService } from './ai-recommendation.service.js';
export declare class ExamEngineService {
    private readonly prisma;
    private readonly validationService;
    private readonly aiRecommendationService;
    constructor(prisma: PrismaService, validationService: ValidationService, aiRecommendationService: AiRecommendationService);
    startExam(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        examSessionId: string;
        status: ExamSessionStatus;
        startedAt: Date;
        expiresAt: Date;
        durationMinutes: number;
        totalQuestions: number;
    }>;
    getActiveExam(actor: AuthenticatedUser): Promise<{
        hasActiveExam: boolean;
        examSessionId?: undefined;
        expiresAt?: undefined;
        answeredCount?: undefined;
        totalQuestions?: undefined;
    } | {
        hasActiveExam: boolean;
        examSessionId: string;
        expiresAt: Date;
        answeredCount: number;
        totalQuestions: number;
    }>;
    getExamSessionDetail(examSessionId: string, actor: AuthenticatedUser): Promise<{
        examSessionId: string;
        examResultId: string;
        status: string;
        score: {
            twk: number;
            tiu: number;
            tkp: number;
            total: number;
        };
        passingStatus: {
            twkPassed: boolean;
            tiuPassed: boolean;
            tkpPassed: boolean;
            totalPassed: boolean;
            overallPassed: boolean;
        };
        aiRecommendationStatus: "processing";
    } | {
        examSessionId: string;
        status: ExamSessionStatus;
        startedAt: Date;
        expiresAt: Date;
        timerRemainingSeconds: number;
        questions: {
            examSessionQuestionId: string;
            number: number;
            category: QuestionCategory;
            subCategory: string;
            topicTag: string;
            difficulty: QuestionDifficulty;
            questionText: string;
            options: {
                label: string;
                text: string;
            }[];
            selectedLabel: string | null;
            isFlagged: boolean;
        }[];
        summary: {
            answeredCount: number;
            unansweredCount: number;
            flaggedCount: number;
        };
    }>;
    autosaveAnswer(examSessionId: string, examSessionQuestionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<{
        examSessionQuestionId: string;
        selectedLabel: string | null;
        isFlagged: boolean;
        savedAt: Date;
    }>;
    flagQuestion(examSessionId: string, examSessionQuestionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    submitExam(examSessionId: string, actor: AuthenticatedUser, rawBody: unknown): Promise<{
        examSessionId: string;
        examResultId: string;
        status: string;
        score: {
            twk: number;
            tiu: number;
            tkp: number;
            total: number;
        };
        passingStatus: {
            twkPassed: boolean;
            tiuPassed: boolean;
            tkpPassed: boolean;
            totalPassed: boolean;
            overallPassed: boolean;
        };
        aiRecommendationStatus: "processing";
    }>;
    logIntegrityEvent(examSessionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    getResultDetail(examResultId: string, actor: AuthenticatedUser): Promise<{
        examResultId: string;
        examSessionId: string;
        examDate: Date;
        score: {
            twk: number;
            tiu: number;
            tkp: number;
            total: number;
        };
        passingGrade: {
            twkMinScore: number;
            tiuMinScore: number;
            tkpMinScore: number;
            totalMinScore: number;
        };
        passingStatus: {
            twkPassed: boolean;
            tiuPassed: boolean;
            tkpPassed: boolean;
            totalPassed: boolean;
            overallPassed: boolean;
        };
        breakdown: {
            category: QuestionCategory;
            subCategory: string;
            topicTag: string;
            difficulty: QuestionDifficulty;
            totalQuestions: number;
            correctAnswers: number;
            wrongAnswers: number;
            accuracy: number;
        }[];
        aiRecommendationStatus: AIRecommendationStatus;
    }>;
    getResultAnswers(examResultId: string, actor: AuthenticatedUser, rawQuery: unknown): Promise<{
        data: {
            number: number;
            category: QuestionCategory;
            subCategory: string;
            topicTag: string;
            difficulty: QuestionDifficulty;
            questionText: string;
            options: {
                label: string;
                text: string;
            }[];
            selectedLabel: string | null;
            correctLabel: string | null;
            isCorrect: boolean | null;
            scoreAwarded: number;
            explanation: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getAiRecommendation(examResultId: string, actor: AuthenticatedUser): Promise<{
        processing: boolean;
        data: {
            status: "processing";
        };
    } | {
        processing: boolean;
        data: {
            id: string;
            status: AIRecommendationStatus;
            isFallback: boolean;
            summary: string | null;
            overallAssessment: string | null;
            nextTryoutStrategy: string | null;
            items: import("./exam-engine.helpers.js").PublicAiRecommendationItem[];
            generatedAt: Date | null;
        };
    }>;
    regenerateAiRecommendation(examResultId: string, actor: AuthenticatedUser, rawBody: unknown): Promise<{
        status: "processing";
    }>;
    getExamHistory(actor: AuthenticatedUser, rawQuery: unknown): Promise<{
        data: {
            examResultId: string;
            examSessionId: string;
            examDate: Date;
            twkScore: number;
            tiuScore: number;
            tkpScore: number;
            totalScore: number;
            overallPassed: boolean;
            weakestTopic: string;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    private autoSubmitExpiredActiveSession;
    private getOwnedExamSession;
    private getSubmittedExamView;
    private toSubmitResponse;
    private selectQuestionsForTryout;
    private appendQuestions;
    private getExcludedQuestionIds;
    private toExamSessionQuestionSnapshot;
    private assertResultAccess;
}
