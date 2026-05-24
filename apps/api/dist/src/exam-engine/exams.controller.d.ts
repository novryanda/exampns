import type { AuthenticatedUser } from '../auth/auth.types.js';
import { type ApiMessageResponse, type ApiSuccessResponse } from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';
export declare class ExamsController {
    private readonly examEngineService;
    constructor(examEngineService: ExamEngineService);
    startExam(body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    getActiveExam(actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    getExamSessionDetail(examSessionId: string, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    autosaveAnswer(examSessionId: string, examSessionQuestionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    flagQuestion(examSessionId: string, examSessionQuestionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
    submitExam(examSessionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiSuccessResponse<unknown>>;
    logIntegrityEvent(examSessionId: string, body: unknown, actor: AuthenticatedUser): Promise<ApiMessageResponse>;
}
