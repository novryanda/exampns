import { BadRequestException } from '@nestjs/common';
import { ParsedQuestionStatus, QuestionCategory, } from '../../generated/prisma/client.js';
export const buildQuestionPreview = (text) => {
    const compact = text.replace(/\s+/g, ' ').trim();
    return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
};
export const assertPdfFile = (file, maxSizeBytes) => {
    if (!file) {
        throw new BadRequestException({
            code: 'INVALID_FILE_TYPE',
            message: 'File PDF wajib diunggah',
        });
    }
    const lowerName = file.originalname.toLowerCase();
    const isPdf = file.mimetype === 'application/pdf' || lowerName.endsWith('.pdf');
    if (!isPdf) {
        throw new BadRequestException({
            code: 'INVALID_FILE_TYPE',
            message: 'File harus berformat PDF',
        });
    }
    if (file.size > maxSizeBytes) {
        throw new BadRequestException({
            code: 'FILE_TOO_LARGE',
            message: 'Ukuran file melebihi batas maksimum',
        });
    }
};
export const toInputJson = (value) => value;
export const toQuestionOptionCreateMany = (questionId, category, options, detectedAnswer) => options.map((option, index) => ({
    questionId,
    label: option.label,
    optionText: option.text,
    isCorrect: category === QuestionCategory.TKP ? false : option.label === detectedAnswer,
    tkpWeight: null,
    displayOrder: index + 1,
}));
export const deriveParsedQuestionStatusCounters = (parsedQuestions) => ({
    totalDetected: parsedQuestions.length,
    validCount: parsedQuestions.filter((item) => item.status === ParsedQuestionStatus.approved).length,
    invalidCount: parsedQuestions.filter((item) => item.status === ParsedQuestionStatus.rejected).length,
});
//# sourceMappingURL=pdf-import.helpers.js.map