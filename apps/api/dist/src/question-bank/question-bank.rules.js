import { BadRequestException, ConflictException, } from '@nestjs/common';
import { QuestionCategory } from '../../generated/prisma/client.js';
const expectedLabels = ['A', 'B', 'C', 'D', 'E'];
const assertUniqueLabels = (options) => {
    const labels = options.map((option) => option.label);
    const uniqueLabels = new Set(labels);
    if (uniqueLabels.size !== options.length) {
        throw new ConflictException('Question options must use unique labels');
    }
    const missingLabels = expectedLabels.filter((label) => !uniqueLabels.has(label));
    if (missingLabels.length > 0) {
        throw new BadRequestException('Question options must include labels A, B, C, D, and E');
    }
};
export const assertQuestionOptionRules = (category, options) => {
    if (options.length !== 5) {
        throw new BadRequestException('Question must have exactly 5 options');
    }
    assertUniqueLabels(options);
    if (category === QuestionCategory.TKP) {
        for (const option of options) {
            if (option.tkpWeight === undefined) {
                throw new BadRequestException('TKP question options must include tkpWeight');
            }
            if (option.isCorrect === true) {
                throw new BadRequestException('TKP question options must not use isCorrect');
            }
        }
        return;
    }
    const correctOptions = options.filter((option) => option.isCorrect === true);
    if (correctOptions.length !== 1) {
        throw new BadRequestException('TWK/TIU questions must have exactly one correct option');
    }
    for (const option of options) {
        if (option.tkpWeight !== undefined) {
            throw new BadRequestException('TWK/TIU question options must not include tkpWeight');
        }
    }
};
export const normalizeTags = (tags) => {
    if (!tags) {
        return undefined;
    }
    return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
};
//# sourceMappingURL=question-bank.rules.js.map