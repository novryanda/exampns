import { QuestionCategory, SourceType } from '../../generated/prisma/client.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
export declare class QuestionBankService {
    private readonly prisma;
    private readonly auditLogService;
    private readonly validationService;
    constructor(prisma: PrismaService, auditLogService: AuditLogService, validationService: ValidationService);
    listQuestions(rawQuery: unknown): Promise<{
        data: {
            id: string;
            questionPreview: string;
            category: QuestionCategory;
            subCategory: string;
            topicTag: string;
            difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty;
            status: import("../../generated/prisma/enums.js").QuestionStatus;
            sourceType: SourceType;
            updatedAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    createQuestion(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        status: import("../../generated/prisma/enums.js").QuestionStatus;
    }>;
    getQuestionDetail(questionId: string): Promise<{
        id: string;
        questionText: string;
        category: QuestionCategory;
        subCategory: string;
        topicTag: string;
        competencyArea: string | null;
        difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty;
        sourceType: SourceType;
        status: import("../../generated/prisma/enums.js").QuestionStatus;
        explanation: string | null;
        options: {
            id: string;
            label: string;
            text: string;
            isCorrect: boolean;
            tkpWeight: number | null;
        }[];
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuestion(questionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    archiveQuestion(questionId: string, actor: AuthenticatedUser): Promise<void>;
    private buildListWhere;
}
