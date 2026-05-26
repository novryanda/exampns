import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { PdfImportService } from './pdf-import.service.js';
export declare class PdfImportController {
    private readonly pdfImportService;
    constructor(pdfImportService: PdfImportService);
    uploadPdfForParsing(file: {
        originalname: string;
        mimetype: string;
        size: number;
        buffer: Buffer;
    } | undefined, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    listPdfImportBatches(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    listParsedQuestions(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    getPdfImportBatchDetail(batchId: string): Promise<ApiSuccessResponse<unknown>>;
    getParsedQuestionDetail(parsedQuestionId: string): Promise<ApiSuccessResponse<unknown>>;
    updateParsedQuestion(parsedQuestionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    approveParsedQuestion(parsedQuestionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    rejectParsedQuestion(parsedQuestionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
}
