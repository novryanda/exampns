import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiPaginatedResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { QuestionBankService } from './question-bank.service.js';
export declare class QuestionBankController {
    private readonly questionBankService;
    constructor(questionBankService: QuestionBankService);
    listQuestions(query: Record<string, unknown>): Promise<ApiPaginatedResponse<unknown[]>>;
    createQuestion(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<{
        id: string;
        status: string;
    }>>;
    getQuestionDetail(questionId: string): Promise<ApiSuccessResponse<unknown>>;
    updateQuestion(questionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    archiveQuestion(questionId: string, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
}
