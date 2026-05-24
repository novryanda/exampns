import { ParsedQuestionStatus, QuestionCategory, type Prisma } from '../../generated/prisma/client.js';
export interface UploadedPdfFile {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export interface ParsedQuestionOptionPayload {
    label: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
}
export declare const buildQuestionPreview: (text: string) => string;
export declare const assertPdfFile: (file: UploadedPdfFile | undefined | null, maxSizeBytes: number) => void;
export declare const toInputJson: (value: unknown) => Prisma.InputJsonValue;
export declare const toQuestionOptionCreateMany: (questionId: string, category: QuestionCategory, options: ParsedQuestionOptionPayload[], detectedAnswer?: string) => {
    questionId: string;
    label: "A" | "B" | "C" | "D" | "E";
    optionText: string;
    isCorrect: boolean;
    tkpWeight: null;
    displayOrder: number;
}[];
export declare const deriveParsedQuestionStatusCounters: (parsedQuestions: Array<{
    status: ParsedQuestionStatus;
}>) => {
    totalDetected: number;
    validCount: number;
    invalidCount: number;
};
