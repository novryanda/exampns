import { TryoutType } from '../../generated/prisma/client.js';
import type { CreateTryoutCatalogInput, GenerationRuleInput, ManualQuestionSetInput, UpdateManualQuestionSetInput } from './tryout-management.schemas.js';
export declare const assertTryoutCatalogRules: (payload: CreateTryoutCatalogInput) => void;
export declare const assertGenerationRuleRules: (catalog: {
    totalQuestions: number;
    tryoutType: TryoutType;
}, input: GenerationRuleInput) => void;
export declare const assertManualQuestionSetRules: (catalog: {
    totalQuestions: number;
    tryoutType: TryoutType;
}, input: ManualQuestionSetInput | UpdateManualQuestionSetInput) => void;
