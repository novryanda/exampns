import type { Response } from 'express';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiSuccessResponse } from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';
export declare class ResultsController {
    private readonly examEngineService;
    constructor(examEngineService: ExamEngineService);
    getResultDetail(examResultId: string, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    getResultAnswers(examResultId: string, query: Record<string, unknown>, actor: AuthenticatedUser): Promise<import("../common/api-response.js").ApiPaginatedResponse<{
        number: number;
        category: import("../../generated/prisma/enums.js").QuestionCategory;
        subCategory: string;
        topicTag: string;
        difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty;
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
    }[]>>;
    getAiRecommendation(examResultId: string, actor: AuthenticatedUser, response: Response): Promise<ApiSuccessResponse<{
        id: string;
        status: import("../../generated/prisma/enums.js").AIRecommendationStatus;
        isFallback: boolean;
        summary: string | null;
        overallAssessment: string | null;
        nextTryoutStrategy: string | null;
        items: import("./exam-engine.helpers.js").PublicAiRecommendationItem[];
        generatedAt: Date | null;
    } | {
        status: "processing";
    }>>;
    regenerateAiRecommendation(examResultId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        status: string;
    }>>;
    getExamHistory(query: Record<string, unknown>, actor: AuthenticatedUser): Promise<import("../common/api-response.js").ApiPaginatedResponse<{
        examResultId: string;
        examSessionId: string;
        examDate: Date;
        twkScore: number;
        tiuScore: number;
        tkpScore: number;
        totalScore: number;
        overallPassed: boolean;
        weakestTopic: string;
    }[]>>;
}
