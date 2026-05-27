import { ImportBatchStatus, ParsedQuestionStatus, QuestionCategory } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { type UploadedPdfFile } from './pdf-import.helpers.js';
export declare class PdfImportService {
    private readonly prisma;
    private readonly auditLogService;
    private readonly validationService;
    constructor(prisma: PrismaService, auditLogService: AuditLogService, validationService: ValidationService);
    uploadPdfForParsing(file: UploadedPdfFile | undefined, rawBody: unknown, actor: AuthenticatedUser): Promise<{
        batchId: string;
        status: ImportBatchStatus;
        fileName: string;
    }>;
    listParsedQuestions(rawQuery: unknown): Promise<{
        data: {
            id: string;
            batchId: string;
            questionPreview: string;
            category: QuestionCategory | null;
            topicTag: string | null;
            difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty | null;
            confidenceScore: number | null;
            status: ParsedQuestionStatus;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    listPdfImportBatches(rawQuery: unknown): Promise<{
        data: {
            batchId: string;
            fileName: string;
            status: ImportBatchStatus;
            totalDetected: number;
            validCount: number;
            invalidCount: number;
            uploadedBy: string;
            createdAt: Date;
            completedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getPdfImportBatchDetail(batchId: string): Promise<{
        batchId: string;
        fileName: string;
        status: ImportBatchStatus;
        totalDetected: number;
        validCount: number;
        invalidCount: number;
        parsedQuestions: {
            id: string;
            questionPreview: string;
            category: QuestionCategory | null;
            subCategory: string | null;
            topicTag: string | null;
            resolvedSubCategoryId: string | null;
            resolvedTopicTagId: string | null;
            difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty | null;
            confidenceScore: number | null;
            status: ParsedQuestionStatus;
        }[];
    }>;
    getParsedQuestionDetail(parsedQuestionId: string): Promise<{
        id: string;
        batchId: string;
        questionText: string;
        options: import("@prisma/client/runtime/client").JsonValue;
        detectedAnswer: string | null;
        category: QuestionCategory | null;
        subCategory: string | null;
        topicTag: string | null;
        resolvedSubCategoryId: string | null;
        resolvedTopicTagId: string | null;
        resolvedSubCategory: string | null;
        resolvedTopicTag: string | null;
        difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty | null;
        confidenceScore: number | null;
        status: ParsedQuestionStatus;
        rawAiOutput: import("@prisma/client/runtime/client").JsonValue;
        reviewNotes: string | null;
        reviewedAt: Date | null;
    }>;
    updateParsedQuestion(parsedQuestionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    approveParsedQuestion(parsedQuestionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<{
        questionId: string;
        parsedQuestionStatus: "approved";
    }>;
    rejectParsedQuestion(parsedQuestionId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    private processPdfImportBatch;
    private refreshBatchCounters;
    private getMaxUploadSizeMb;
    private assertResolvedMetadata;
}
