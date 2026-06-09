import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ImportBatchStatus,
  ParsedQuestionStatus,
  Prisma,
  QuestionAnswerMode,
  QuestionStatus,
  SourceType,
} from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AuditLogService } from '../common/audit-log.service.js';
import { normalizeQuestionCategoryCode } from '../common/question-category.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { assertQuestionOptionRules } from '../question-bank/question-bank.rules.js';
import { normalizeMetadataName, toMetadataSlug } from '../question-metadata/question-metadata.utils.js';
import {
  bulkApproveParsedQuestionsSchema,
  approveParsedQuestionSchema,
  listParsedQuestionsQuerySchema,
  listPdfImportBatchesQuerySchema,
  pdfImportCallbackSchema,
  rejectParsedQuestionSchema,
  updateParsedQuestionSchema,
  uploadPdfMetadataSchema,
} from './pdf-import.schemas.js';
import type {
  ApproveParsedQuestionInput,
  BulkApproveParsedQuestionsInput,
} from './pdf-import.schemas.js';
import {
  assertPdfFile,
  buildQuestionPreview,
  deriveParsedQuestionStatusCounters,
  getApiPublicBase,
  toInputJson,
  toQuestionOptionCreateMany,
  type ParsedQuestionCallbackPayload,
  type ParsedQuestionOptionPayload,
  type UploadedPdfFile,
} from './pdf-import.helpers.js';

@Injectable()
export class PdfImportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
    private readonly validationService: ValidationService,
  ) {}

  async uploadPdfForParsing(
    file: UploadedPdfFile | undefined,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

  async listParsedQuestions(rawQuery: unknown) {
    const query = this.validationService.validate(listParsedQuestionsQuerySchema, rawQuery);
    const skip = (query.page - 1) * query.limit;
    const where = {
      ...(query.batchId ? { batchId: query.batchId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.category ? { categoryCode: query.category } : {}),
      ...(query.search
        ? {
            OR: [
              {
                questionText: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                topicTag: {
                  contains: query.search,
                  mode: 'insensitive' as const,
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
        category: item.categoryCode,
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

  async listPdfImportBatches(rawQuery: unknown) {
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

  async getPdfImportBatchDetail(batchId: string) {
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
      errorMessage: batch.errorMessage,
      parsedQuestions: batch.parsedQuestions.map((item) => ({
        id: item.id,
        questionPreview: buildQuestionPreview(item.questionText),
        category: item.categoryCode,
        subCategory: item.subCategory,
        topicTag: item.topicTag,
        resolvedSubCategoryId: item.resolvedSubCategoryId,
        resolvedTopicTagId: item.resolvedTopicTagId,
        difficulty: item.difficulty,
        confidenceScore: item.confidenceScore === null ? null : Number(item.confidenceScore),
        status: item.status,
      })),
    };
  }

  async getParsedQuestionDetail(parsedQuestionId: string) {
    const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
      where: { id: parsedQuestionId },
      include: {
        resolvedSubCategoryRef: {
          select: {
            id: true,
            name: true,
            categoryRef: {
              select: {
                code: true,
              },
            },
          },
        },
        resolvedTopicTagRef: {
          select: {
            id: true,
            name: true,
            subCategoryId: true,
          },
        },
      },
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
      category: parsedQuestion.categoryCode,
      subCategory: parsedQuestion.subCategory,
      topicTag: parsedQuestion.topicTag,
      resolvedSubCategoryId: parsedQuestion.resolvedSubCategoryId,
      resolvedTopicTagId: parsedQuestion.resolvedTopicTagId,
      resolvedSubCategory: parsedQuestion.resolvedSubCategoryRef?.name ?? null,
      resolvedTopicTag: parsedQuestion.resolvedTopicTagRef?.name ?? null,
      difficulty: parsedQuestion.difficulty,
      confidenceScore:
        parsedQuestion.confidenceScore === null ? null : Number(parsedQuestion.confidenceScore),
      status: parsedQuestion.status,
      rawAiOutput: parsedQuestion.rawAiOutput,
      reviewNotes: parsedQuestion.reviewNotes,
      reviewedAt: parsedQuestion.reviewedAt,
    };
  }

  async handlePdfImportCallback(rawBody: unknown, apiKey: string | undefined) {
    this.assertPdfImportCallbackSecret(apiKey);
    const payload = this.validationService.validate(pdfImportCallbackSchema, rawBody);

    if (payload.success) {
      await this.finalizePdfImportSuccess(payload.batchId, payload.parsedQuestions ?? []);
      return;
    }

    await this.markBatchFailedIfIncomplete(
      payload.batchId,
      payload.errorMessage ?? 'AI workflow failed',
    );
  }

  async updateParsedQuestion(
    parsedQuestionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(updateParsedQuestionSchema, rawBody);
    const category = await this.getCategoryByCode(payload.categoryCode);
    assertQuestionOptionRules(
      category.answerMode,
      payload.options.map((option) => ({
        label: option.label,
        text: option.text,
        isCorrect:
          category.answerMode === QuestionAnswerMode.weighted_options
            ? undefined
            : option.label === payload.detectedAnswer,
        optionWeight:
          category.answerMode === QuestionAnswerMode.weighted_options
            ? option.optionWeight ?? undefined
            : undefined,
      })),
    );

    let resolvedSubCategoryId = payload.resolvedSubCategoryId ?? null;
    let resolvedTopicTagId = payload.resolvedTopicTagId ?? null;

    if (!resolvedSubCategoryId || !resolvedTopicTagId) {
      resolvedSubCategoryId = null;
      resolvedTopicTagId = null;
    } else {
      try {
        await this.assertResolvedMetadata(
          category.code,
          resolvedSubCategoryId,
          resolvedTopicTagId,
        );
      } catch {
        resolvedSubCategoryId = null;
        resolvedTopicTagId = null;
      }
    }

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
        detectedAnswer:
          category.answerMode === QuestionAnswerMode.weighted_options
            ? null
            : (payload.detectedAnswer ?? null),
        categoryCode: category.code,
        resolvedSubCategoryId,
        resolvedTopicTagId,
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
        categoryCode: category.code,
        resolvedSubCategoryId,
        resolvedTopicTagId,
      },
    });
  }

  async approveParsedQuestion(
    parsedQuestionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(approveParsedQuestionSchema, rawBody);
    return this.approveParsedQuestionWithPayload(parsedQuestionId, payload, actor);
  }

  async bulkApproveParsedQuestions(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(bulkApproveParsedQuestionsSchema, rawBody);
    const parsedQuestionIds = [...new Set(payload.parsedQuestionIds)];
    const approvedItems: Array<{ parsedQuestionId: string; questionId: string }> = [];
    const failedItems: Array<{ parsedQuestionId: string; reason: string }> = [];

    for (const parsedQuestionId of parsedQuestionIds) {
      try {
        const approved = await this.approveParsedQuestionWithPayload(parsedQuestionId, payload, actor);
        approvedItems.push({
          parsedQuestionId,
          questionId: approved.questionId,
        });
      } catch (error) {
        failedItems.push({
          parsedQuestionId,
          reason: error instanceof Error ? error.message : 'Parsed question gagal disetujui',
        });
      }
    }

    return {
      totalRequested: parsedQuestionIds.length,
      approvedCount: approvedItems.length,
      failedCount: failedItems.length,
      approvedItems,
      failedItems,
    };
  }

  private async approveParsedQuestionWithPayload(
    parsedQuestionId: string,
    payload: ApproveParsedQuestionInput | BulkApproveParsedQuestionsInput,
    actor: AuthenticatedUser,
  ) {
    const parsedQuestion = await this.prisma.parsedQuestionReview.findUnique({
      where: { id: parsedQuestionId },
    });

    if (!parsedQuestion) {
      throw new NotFoundException('Parsed question tidak ditemukan');
    }

    if (parsedQuestion.questionId) {
      throw new ConflictException('Parsed question sudah pernah di-approve');
    }

    if (!parsedQuestion.categoryCode || !parsedQuestion.difficulty) {
      throw new ConflictException('Parsed question belum lengkap untuk di-approve');
    }

    const category = await this.getCategoryByCode(parsedQuestion.categoryCode);
    const options = parsedQuestion.optionsJson as unknown as ParsedQuestionOptionPayload[];
    assertQuestionOptionRules(category.answerMode, options.map((option) => ({
      label: option.label,
      text: option.text,
      isCorrect:
        category.answerMode === QuestionAnswerMode.weighted_options
          ? undefined
          : option.label === parsedQuestion.detectedAnswer,
      optionWeight:
        category.answerMode === QuestionAnswerMode.weighted_options
          ? option.optionWeight ?? undefined
          : undefined,
    })));

    const result = await this.prisma.$transaction(async (tx) => {
      const { subCategoryId: resolvedSubCategoryId, topicTagId: resolvedTopicTagId } =
        await this.resolveMetadataForApproval(tx, parsedQuestion);

      const question = await tx.question.create({
        data: {
          questionText: parsedQuestion.questionText,
          categoryId: category.id,
          subCategoryId: resolvedSubCategoryId,
          topicTagId: resolvedTopicTagId,
          competencyArea: null,
          difficulty: parsedQuestion.difficulty!,
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
        data: toQuestionOptionCreateMany(
          question.id,
          category.answerMode,
          options,
          parsedQuestion.detectedAnswer ?? undefined,
        ),
      });

      const topicTag = await tx.questionTopicTag.findUnique({
        where: { id: resolvedTopicTagId },
        select: { name: true },
      });

      if (topicTag?.name) {
        await tx.questionTag.create({
          data: {
            questionId: question.id,
            tag: topicTag.name,
          },
        });
      }

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

      return {
        id: question.id,
        resolvedSubCategoryId,
        resolvedTopicTagId,
      };
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
        resolvedSubCategoryId: result.resolvedSubCategoryId,
        resolvedTopicTagId: result.resolvedTopicTagId,
      },
    });

    return {
      questionId: result.id,
      parsedQuestionStatus: ParsedQuestionStatus.approved,
    };
  }

  async rejectParsedQuestion(
    parsedQuestionId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

  private async processPdfImportBatch(
    batchId: string,
    file: UploadedPdfFile,
    categoryHint?: string,
  ) {
    const webhookUrl = process.env.PDF_IMPORT_WEBHOOK_URL?.trim();
    const callbackSecret = this.resolvePdfImportCallbackSecret();

    if (!webhookUrl || !callbackSecret) {
      await this.markBatchFailedIfIncomplete(batchId, 'PDF import workflow belum dikonfigurasi');
      return;
    }

    const requestPromise = fetch(webhookUrl, {
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
        callbackUrl: this.buildPdfImportCallbackUrl(),
        callbackSecret,
      }),
    })
      .then(async (response) => {
        const responseJson = (await response.json().catch(() => null)) as
          | {
              parsedQuestions?: ParsedQuestionCallbackPayload[];
              errorMessage?: string;
              accepted?: boolean;
            }
          | null;

        if (response.ok && responseJson?.parsedQuestions) {
          await this.finalizePdfImportSuccess(batchId, responseJson.parsedQuestions);
          return;
        }

        if (response.ok) {
          return;
        }

        await this.markBatchFailedIfIncomplete(
          batchId,
          responseJson?.errorMessage ?? `AI workflow merespons ${response.status}`,
        );
      })
      .catch(async (error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Terjadi kegagalan saat memanggil AI workflow';
        await this.markBatchFailedIfIncomplete(batchId, message);
      });

    await Promise.race([requestPromise, this.delay(1500)]);
  }

  private async finalizePdfImportSuccess(
    batchId: string,
    parsedQuestions: ParsedQuestionCallbackPayload[],
  ) {
    const batch = await this.prisma.questionImportBatch.findUnique({
      where: { id: batchId },
      select: {
        id: true,
        status: true,
        _count: {
          select: {
            parsedQuestions: true,
          },
        },
      },
    });

    if (!batch) {
      throw new NotFoundException('PDF import batch tidak ditemukan');
    }

    if (
      batch._count.parsedQuestions > 0 ||
      batch.status === ImportBatchStatus.completed ||
      batch.status === ImportBatchStatus.partial_failed
    ) {
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.parsedQuestionReview.createMany({
        data: parsedQuestions.map((item) => ({
          batchId,
          rawAiOutput: toInputJson(item.rawAiOutput ?? item),
          questionText: item.questionText,
          optionsJson: toInputJson(item.options),
          detectedAnswer: item.detectedAnswer ?? null,
          categoryCode: item.categoryCode ? normalizeQuestionCategoryCode(item.categoryCode) : null,
          subCategory: item.subCategory ?? null,
          topicTag: item.topicTag ?? null,
          resolvedSubCategoryId: null,
          resolvedTopicTagId: null,
          difficulty: item.difficulty ?? null,
          confidenceScore: item.confidenceScore ?? null,
          status: item.status ?? ParsedQuestionStatus.pending_review,
        })),
      });

      await tx.$executeRawUnsafe(
        `
          UPDATE "parsed_question_reviews" p
          SET
            "resolved_sub_category_id" = qsc."id",
            "resolved_topic_tag_id" = qtt."id"
          FROM "question_sub_categories" qsc
          JOIN "question_topic_tags" qtt
            ON qtt."sub_category_id" = qsc."id"
          JOIN "question_categories" qc
            ON qc."id" = qsc."category_id"
          WHERE p."batch_id" = $1
            AND p."category_code" IS NOT NULL
            AND p."sub_category" IS NOT NULL
            AND p."topic_tag" IS NOT NULL
            AND qc."code" = p."category_code"
            AND qsc."slug" = regexp_replace(
              regexp_replace(lower(btrim(p."sub_category")), '\\s+', ' ', 'g'),
              '[^a-z0-9]+',
              '_',
              'g'
            )
            AND qtt."slug" = regexp_replace(
              regexp_replace(lower(btrim(p."topic_tag")), '\\s+', ' ', 'g'),
              '[^a-z0-9]+',
              '_',
              'g'
            )
        `,
        batchId,
      );

      const createdRows = parsedQuestions.map((item) => ({
        status: item.status ?? ParsedQuestionStatus.pending_review,
      }));
      const counters = deriveParsedQuestionStatusCounters(createdRows);
      const nextStatus =
        counters.invalidCount > 0 ? ImportBatchStatus.partial_failed : ImportBatchStatus.completed;

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

  private async markBatchFailedIfIncomplete(batchId: string, errorMessage: string) {
    await this.prisma.questionImportBatch.updateMany({
      where: {
        id: batchId,
        status: {
          notIn: [ImportBatchStatus.completed, ImportBatchStatus.partial_failed],
        },
      },
      data: {
        status: ImportBatchStatus.failed,
        errorMessage,
        completedAt: new Date(),
      },
    });
  }

  private buildPdfImportCallbackUrl() {
    return `${getApiPublicBase()}/api/v1/internal/pdf-imports/callback`;
  }

  private resolvePdfImportCallbackSecret() {
    return process.env.PDF_IMPORT_CALLBACK_SECRET?.trim() || process.env.N8N_WEBHOOK_SECRET?.trim() || null;
  }

  private assertPdfImportCallbackSecret(apiKey: string | undefined) {
    const expected = this.resolvePdfImportCallbackSecret();

    if (!expected) {
      throw new UnauthorizedException('PDF import callback secret belum dikonfigurasi');
    }

    if (!apiKey || apiKey !== expected) {
      throw new UnauthorizedException('PDF import callback secret tidak valid');
    }
  }

  private delay(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private async refreshBatchCounters(batchId: string) {
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

  private async getMaxUploadSizeMb() {
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'pdf.max_upload_size_mb' },
      select: { value: true },
    });

    if (!setting || typeof setting.value !== 'number') {
      return 20;
    }

    return setting.value;
  }

  private async assertResolvedMetadata(
    categoryCode: string,
    resolvedSubCategoryId: string,
    resolvedTopicTagId: string,
    db:
      | Pick<PrismaService, 'questionSubCategory' | 'questionTopicTag'>
      | Prisma.TransactionClient = this.prisma,
  ) {
    const [subCategory, topicTag] = await Promise.all([
      db.questionSubCategory.findUnique({
        where: { id: resolvedSubCategoryId },
        select: {
          id: true,
          categoryRef: {
            select: {
              code: true,
            },
          },
          isActive: true,
        },
      }),
      db.questionTopicTag.findUnique({
        where: { id: resolvedTopicTagId },
        select: {
          id: true,
          subCategoryId: true,
          isActive: true,
        },
      }),
    ]);

    if (!subCategory || subCategory.categoryRef.code !== categoryCode) {
      throw new BadRequestException('Resolved sub-category tidak valid untuk category terpilih');
    }

    if (!subCategory.isActive) {
      throw new BadRequestException('Resolved sub-category inactive tidak dapat dipakai');
    }

    if (!topicTag || topicTag.subCategoryId !== resolvedSubCategoryId) {
      throw new BadRequestException('Resolved topic tag tidak cocok dengan sub-category');
    }

    if (!topicTag.isActive) {
      throw new BadRequestException('Resolved topic tag inactive tidak dapat dipakai');
    }
  }

  private async resolveMetadataForApproval(
    tx: Prisma.TransactionClient,
    parsedQuestion: {
      categoryCode: string | null;
      resolvedSubCategoryId: string | null;
      resolvedTopicTagId: string | null;
      subCategory: string | null;
      topicTag: string | null;
    },
  ) {
    if (!parsedQuestion.categoryCode) {
      throw new ConflictException('Kategori parsed question belum lengkap');
    }

    const category = await this.getCategoryByCode(parsedQuestion.categoryCode);

    if (parsedQuestion.resolvedSubCategoryId && parsedQuestion.resolvedTopicTagId) {
      await this.assertResolvedMetadata(
        category.code,
        parsedQuestion.resolvedSubCategoryId,
        parsedQuestion.resolvedTopicTagId,
        tx,
      );

      return {
        subCategoryId: parsedQuestion.resolvedSubCategoryId,
        topicTagId: parsedQuestion.resolvedTopicTagId,
      };
    }

    const detectedSubCategory = parsedQuestion.subCategory ? normalizeMetadataName(parsedQuestion.subCategory) : null;
    const detectedTopicTag = parsedQuestion.topicTag ? normalizeMetadataName(parsedQuestion.topicTag) : null;

    if (!detectedSubCategory || !detectedTopicTag) {
      throw new ConflictException(
        'Parsed question belum dipetakan ke metadata master dan deteksi AI belum cukup untuk membuat metadata baru',
      );
    }

    const subCategorySlug = toMetadataSlug(detectedSubCategory);
    const topicTagSlug = toMetadataSlug(detectedTopicTag);

    let subCategoryId = parsedQuestion.resolvedSubCategoryId;
    if (!subCategoryId) {
      const existingSubCategory = await tx.questionSubCategory.findFirst({
        where: {
          categoryId: category.id,
          slug: subCategorySlug,
        },
        select: {
          id: true,
          isActive: true,
        },
      });

      if (existingSubCategory) {
        if (!existingSubCategory.isActive) {
          throw new ConflictException('Sub-kategori hasil deteksi AI sudah ada tetapi nonaktif');
        }
        subCategoryId = existingSubCategory.id;
      } else {
        const latestSubCategory = await tx.questionSubCategory.findFirst({
          where: { categoryId: category.id },
          orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
          select: { sortOrder: true },
        });

        const createdSubCategory = await tx.questionSubCategory.create({
          data: {
            categoryId: category.id,
            name: detectedSubCategory,
            slug: subCategorySlug,
            sortOrder: (latestSubCategory?.sortOrder ?? -1) + 1,
          },
          select: { id: true },
        });

        subCategoryId = createdSubCategory.id;
      }
    }

    let topicTagId = parsedQuestion.resolvedTopicTagId;
    if (!topicTagId) {
      const existingTopicTag = await tx.questionTopicTag.findFirst({
        where: {
          subCategoryId,
          slug: topicTagSlug,
        },
        select: {
          id: true,
          isActive: true,
        },
      });

      if (existingTopicTag) {
        if (!existingTopicTag.isActive) {
          throw new ConflictException('Topik tag hasil deteksi AI sudah ada tetapi nonaktif');
        }
        topicTagId = existingTopicTag.id;
      } else {
        const latestTopicTag = await tx.questionTopicTag.findFirst({
          where: { subCategoryId },
          orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
          select: { sortOrder: true },
        });

        const createdTopicTag = await tx.questionTopicTag.create({
          data: {
            subCategoryId,
            name: detectedTopicTag,
            slug: topicTagSlug,
            sortOrder: (latestTopicTag?.sortOrder ?? -1) + 1,
          },
          select: { id: true },
        });

        topicTagId = createdTopicTag.id;
      }
    }

    await this.assertResolvedMetadata(category.code, subCategoryId, topicTagId, tx);

    return {
      subCategoryId,
      topicTagId,
    };
  }

  private async getCategoryByCode(categoryCode: string) {
    const category = await this.prisma.questionCategory.findUnique({
      where: { code: normalizeQuestionCategoryCode(categoryCode) },
      select: {
        id: true,
        code: true,
        answerMode: true,
        isActive: true,
      },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException('Kategori soal tidak ditemukan atau tidak aktif');
    }

    return category;
  }
}
