var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { ImportBatchStatus, ParsedQuestionStatus, QuestionCategory, QuestionStatus, SourceType, } from '../../generated/prisma/client.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { assertQuestionOptionRules } from '../question-bank/question-bank.rules.js';
import { approveParsedQuestionSchema, listParsedQuestionsQuerySchema, listPdfImportBatchesQuerySchema, rejectParsedQuestionSchema, updateParsedQuestionSchema, uploadPdfMetadataSchema, } from './pdf-import.schemas.js';
import { assertPdfFile, buildQuestionPreview, deriveParsedQuestionStatusCounters, toInputJson, toQuestionOptionCreateMany, } from './pdf-import.helpers.js';
let PdfImportService = class PdfImportService {
    prisma;
    auditLogService;
    validationService;
    constructor(prisma, auditLogService, validationService) {
        this.prisma = prisma;
        this.auditLogService = auditLogService;
        this.validationService = validationService;
    }
    async uploadPdfForParsing(file, rawBody, actor) {
        const payload = this.validationService.validate(uploadPdfMetadataSchema, rawBody);
        const maxUploadSizeMb = await this.getMaxUploadSizeMb();
        assertPdfFile(file, maxUploadSizeMb * 1024 * 1024);
        if (!file) {
            throw new NotFoundException('File PDF wajib diunggah');
        }
        const uploadedFile = file;
        const batch = await this.prisma.questionImportBatch.create({
            data: {
                uploadedBy: actor.id,
                fileName: uploadedFile.originalname,
                fileUrl: null,
                fileSizeBytes: uploadedFile.size,
                status: ImportBatchStatus.processing,
            },
            select: {
                id: true,
                status: true,
                fileName: true,
            },
        });
        void this.processPdfImportBatch(batch.id, uploadedFile, payload.categoryHint).catch(() => undefined);
        await this.auditLogService.create({
            actor,
            action: 'UPLOAD_PDF_IMPORT',
            module: 'pdf_import',
            targetType: 'question_import_batch',
            targetId: batch.id,
            metadata: {
                fileName: uploadedFile.originalname,
                categoryHint: payload.categoryHint ?? 'auto',
            },
        });
        return {
            batchId: batch.id,
            status: batch.status,
            fileName: batch.fileName,
        };
    }
    async listParsedQuestions(rawQuery) {
        const query = this.validationService.validate(listParsedQuestionsQuerySchema, rawQuery);
        const skip = (query.page - 1) * query.limit;
        const where = {
            ...(query.batchId ? { batchId: query.batchId } : {}),
            ...(query.status ? { status: query.status } : {}),
            ...(query.category ? { category: query.category } : {}),
            ...(query.search
                ? {
                    OR: [
                        {
                            questionText: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            topicTag: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
                : {}),
        };
        const [items, totalItems] = await Promise.all([
            this.prisma.parsedQuestionReview.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.parsedQuestionReview.count({ where }),
        ]);
        return {
            data: items.map((item) => ({
                id: item.id,
                batchId: item.batchId,
                questionPreview: buildQuestionPreview(item.questionText),
                category: item.category,
                topicTag: item.topicTag,
                difficulty: item.difficulty,
                confidenceScore: item.confidenceScore === null ? null : Number(item.confidenceScore),
                status: item.status,
                createdAt: item.createdAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    async listPdfImportBatches(rawQuery) {
        const query = this.validationService.validate(listPdfImportBatchesQuerySchema, rawQuery);
        const skip = (query.page - 1) * query.limit;
        const where = query.status ? { status: query.status } : {};
        const [batches, totalItems] = await Promise.all([
            this.prisma.questionImportBatch.findMany({
                where,
                include: {
                    uploadedByUser: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.questionImportBatch.count({ where }),
        ]);
        return {
            data: batches.map((batch) => ({
                batchId: batch.id,
                fileName: batch.fileName,
                status: batch.status,
                totalDetected: batch.totalDetected,
                validCount: batch.validCount,
                invalidCount: batch.invalidCount,
                uploadedBy: batch.uploadedByUser.name,
                createdAt: batch.createdAt,
                completedAt: batch.completedAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    async getPdfImportBatchDetail(batchId) {
        const batch = await this.prisma.questionImportBatch.findUnique({
            where: { id: batchId },
            include: {
                parsedQuestions: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!batch) {
            throw new NotFoundException('PDF import batch tidak ditemukan');
        }
        return {
            batchId: batch.id,
            fileName: batch.fileName,
            status: batch.status,
            totalDetected: batch.totalDetected,
            validCount: batch.validCount,
            invalidCount: batch.invalidCount,
            parsedQuestions: batch.parsedQuestions.map((item) => ({
                id: item.id,
                questionPreview: buildQuestionPreview(item.questionText),
                category: item.category,
                subCategory: item.subCategory,
                topicTag: item.topicTag,
                difficulty: item.difficulty,
                confidenceScore: item.confidenceScore === null ? null : Number(item.confidenceScore),
                status: item.status,
            })),
        };
    }
    async getParsedQuestionDetail(parsedQuestionId) {
        const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
            where: { id: parsedQuestionId },
        });
        if (!parsedQuestion) {
            throw new NotFoundException('Parsed question tidak ditemukan');
        }
        return {
            id: parsedQuestion.id,
            batchId: parsedQuestion.batchId,
            questionText: parsedQuestion.questionText,
            options: parsedQuestion.optionsJson,
            detectedAnswer: parsedQuestion.detectedAnswer,
            category: parsedQuestion.category,
            subCategory: parsedQuestion.subCategory,
            topicTag: parsedQuestion.topicTag,
            difficulty: parsedQuestion.difficulty,
            confidenceScore: parsedQuestion.confidenceScore === null ? null : Number(parsedQuestion.confidenceScore),
            status: parsedQuestion.status,
            rawAiOutput: parsedQuestion.rawAiOutput,
            reviewNotes: parsedQuestion.reviewNotes,
            reviewedAt: parsedQuestion.reviewedAt,
        };
    }
    async updateParsedQuestion(parsedQuestionId, rawBody, actor) {
        const payload = this.validationService.validate(updateParsedQuestionSchema, rawBody);
        assertQuestionOptionRules(payload.category, payload.options);
        const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
            where: { id: parsedQuestionId },
            select: {
                id: true,
                status: true,
            },
        });
        if (!parsedQuestion) {
            throw new NotFoundException('Parsed question tidak ditemukan');
        }
        if (parsedQuestion.status === ParsedQuestionStatus.approved) {
            throw new ConflictException('Parsed question yang sudah approved tidak dapat diubah');
        }
        await this.prisma.parsedQuestionReview.update({
            where: { id: parsedQuestionId },
            data: {
                questionText: payload.questionText,
                optionsJson: toInputJson(payload.options),
                detectedAnswer: payload.detectedAnswer ?? null,
                category: payload.category,
                subCategory: payload.subCategory,
                topicTag: payload.topicTag,
                difficulty: payload.difficulty,
                status: ParsedQuestionStatus.pending_review,
                reviewNotes: null,
                reviewedBy: actor.id,
                reviewedAt: new Date(),
            },
        });
        await this.auditLogService.create({
            actor,
            action: 'UPDATE_PARSED_QUESTION',
            module: 'pdf_import',
            targetType: 'parsed_question_review',
            targetId: parsedQuestionId,
            metadata: {
                category: payload.category,
                topicTag: payload.topicTag,
            },
        });
    }
    async approveParsedQuestion(parsedQuestionId, rawBody, actor) {
        const payload = this.validationService.validate(approveParsedQuestionSchema, rawBody);
        const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
            where: { id: parsedQuestionId },
        });
        if (!parsedQuestion) {
            throw new NotFoundException('Parsed question tidak ditemukan');
        }
        if (parsedQuestion.questionId) {
            throw new ConflictException('Parsed question sudah pernah di-approve');
        }
        if (!parsedQuestion.category ||
            !parsedQuestion.subCategory ||
            !parsedQuestion.topicTag ||
            !parsedQuestion.difficulty) {
            throw new ConflictException('Parsed question belum lengkap untuk di-approve');
        }
        const options = parsedQuestion.optionsJson;
        assertQuestionOptionRules(parsedQuestion.category, options.map((option) => ({
            label: option.label,
            text: option.text,
            isCorrect: parsedQuestion.category === QuestionCategory.TKP
                ? undefined
                : option.label === parsedQuestion.detectedAnswer,
            tkpWeight: undefined,
        })));
        const result = await this.prisma.$transaction(async (tx) => {
            const question = await tx.question.create({
                data: {
                    questionText: parsedQuestion.questionText,
                    category: parsedQuestion.category,
                    subCategory: parsedQuestion.subCategory,
                    topicTag: parsedQuestion.topicTag,
                    competencyArea: null,
                    difficulty: parsedQuestion.difficulty,
                    questionType: 'multiple_choice',
                    sourceType: SourceType.pdf_import,
                    status: payload.status ?? QuestionStatus.active,
                    explanation: null,
                    createdBy: actor.id,
                    updatedBy: actor.id,
                },
                select: { id: true },
            });
            await tx.questionOption.createMany({
                data: toQuestionOptionCreateMany(question.id, parsedQuestion.category, options, parsedQuestion.detectedAnswer ?? undefined),
            });
            await tx.parsedQuestionReview.update({
                where: { id: parsedQuestionId },
                data: {
                    questionId: question.id,
                    status: ParsedQuestionStatus.approved,
                    reviewNotes: payload.reviewNotes,
                    reviewedBy: actor.id,
                    reviewedAt: new Date(),
                },
            });
            return question;
        });
        await this.refreshBatchCounters(parsedQuestion.batchId);
        await this.auditLogService.create({
            actor,
            action: 'APPROVE_PARSED_QUESTION',
            module: 'pdf_import',
            targetType: 'parsed_question_review',
            targetId: parsedQuestionId,
            metadata: {
                questionId: result.id,
                status: payload.status ?? QuestionStatus.active,
            },
        });
        return {
            questionId: result.id,
            parsedQuestionStatus: ParsedQuestionStatus.approved,
        };
    }
    async rejectParsedQuestion(parsedQuestionId, rawBody, actor) {
        const payload = this.validationService.validate(rejectParsedQuestionSchema, rawBody);
        const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
            where: { id: parsedQuestionId },
            select: {
                id: true,
                batchId: true,
                status: true,
            },
        });
        if (!parsedQuestion) {
            throw new NotFoundException('Parsed question tidak ditemukan');
        }
        if (parsedQuestion.status === ParsedQuestionStatus.approved) {
            throw new ConflictException('Parsed question yang sudah approved tidak dapat ditolak');
        }
        await this.prisma.parsedQuestionReview.update({
            where: { id: parsedQuestionId },
            data: {
                status: ParsedQuestionStatus.rejected,
                reviewNotes: payload.reviewNotes,
                reviewedBy: actor.id,
                reviewedAt: new Date(),
            },
        });
        await this.refreshBatchCounters(parsedQuestion.batchId);
        await this.auditLogService.create({
            actor,
            action: 'REJECT_PARSED_QUESTION',
            module: 'pdf_import',
            targetType: 'parsed_question_review',
            targetId: parsedQuestionId,
            metadata: {
                reviewNotes: payload.reviewNotes,
            },
        });
    }
    async processPdfImportBatch(batchId, file, categoryHint) {
        const webhookUrl = process.env.PDF_IMPORT_WEBHOOK_URL?.trim();
        if (!webhookUrl) {
            await this.prisma.questionImportBatch.update({
                where: { id: batchId },
                data: {
                    status: ImportBatchStatus.failed,
                    errorMessage: 'AI workflow unavailable',
                    completedAt: new Date(),
                },
            });
            return;
        }
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    batchId,
                    fileName: file.originalname,
                    fileMimeType: file.mimetype,
                    fileContentBase64: file.buffer.toString('base64'),
                    categoryHint: categoryHint ?? 'auto',
                }),
            });
            const responseJson = (await response.json().catch(() => null));
            if (!response.ok || !responseJson?.parsedQuestions) {
                await this.prisma.questionImportBatch.update({
                    where: { id: batchId },
                    data: {
                        status: ImportBatchStatus.failed,
                        errorMessage: responseJson?.errorMessage ?? 'AI workflow unavailable',
                        completedAt: new Date(),
                    },
                });
                return;
            }
            const parsedQuestions = responseJson.parsedQuestions;
            await this.prisma.$transaction(async (tx) => {
                await tx.parsedQuestionReview.createMany({
                    data: parsedQuestions.map((item) => ({
                        batchId,
                        rawAiOutput: toInputJson(item.rawAiOutput ?? item),
                        questionText: item.questionText,
                        optionsJson: toInputJson(item.options),
                        detectedAnswer: item.detectedAnswer ?? null,
                        category: item.category ?? null,
                        subCategory: item.subCategory ?? null,
                        topicTag: item.topicTag ?? null,
                        difficulty: item.difficulty ?? null,
                        confidenceScore: item.confidenceScore ?? null,
                        status: item.status ?? ParsedQuestionStatus.pending_review,
                    })),
                });
                const createdRows = parsedQuestions.map((item) => ({
                    status: item.status ?? ParsedQuestionStatus.pending_review,
                }));
                const counters = deriveParsedQuestionStatusCounters(createdRows);
                const nextStatus = counters.invalidCount > 0 ? ImportBatchStatus.partial_failed : ImportBatchStatus.completed;
                await tx.questionImportBatch.update({
                    where: { id: batchId },
                    data: {
                        status: nextStatus,
                        totalDetected: counters.totalDetected,
                        validCount: counters.validCount,
                        invalidCount: counters.invalidCount,
                        errorMessage: null,
                        completedAt: new Date(),
                    },
                });
            });
        }
        catch {
            await this.prisma.questionImportBatch.update({
                where: { id: batchId },
                data: {
                    status: ImportBatchStatus.failed,
                    errorMessage: 'AI workflow unavailable',
                    completedAt: new Date(),
                },
            });
        }
    }
    async refreshBatchCounters(batchId) {
        const parsedQuestions = await this.prisma.parsedQuestionReview.findMany({
            where: { batchId },
            select: { status: true },
        });
        const counters = deriveParsedQuestionStatusCounters(parsedQuestions);
        await this.prisma.questionImportBatch.update({
            where: { id: batchId },
            data: {
                totalDetected: counters.totalDetected,
                validCount: counters.validCount,
                invalidCount: counters.invalidCount,
            },
        });
    }
    async getMaxUploadSizeMb() {
        const setting = await this.prisma.systemSetting.findUnique({
            where: { key: 'pdf.max_upload_size_mb' },
            select: { value: true },
        });
        if (!setting || typeof setting.value !== 'number') {
            return 20;
        }
        return setting.value;
    }
};
PdfImportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuditLogService,
        ValidationService])
], PdfImportService);
export { PdfImportService };
//# sourceMappingURL=pdf-import.service.js.map