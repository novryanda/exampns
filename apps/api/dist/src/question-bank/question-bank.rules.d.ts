import { QuestionCategory } from '../../generated/prisma/client.js';
import type { QuestionOptionInput } from './question-bank.schemas.js';
export declare const assertQuestionOptionRules: (category: QuestionCategory, options: QuestionOptionInput[]) => void;
export declare const normalizeTags: (tags?: string[]) => string[] | undefined;
