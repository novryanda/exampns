import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AIRecommendationStatus,
  type Prisma,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import {
  buildFallbackRecommendationRecord,
  buildRecommendationPayload,
  buildWeakAreaItems,
  mergeRecommendationNarratives,
  normalizeAiResponse,
  toInputJson,
  type BreakdownItem,
} from './exam-engine.helpers.js';

interface RecommendationContext {
  examResult: {
    id: string;
    totalScore: number;
    totalPassed: boolean;
    overallPassed: boolean;
    breakdownJson: Prisma.JsonValue;
    userId: string;
    categoryScores: Array<{
      categoryCode: string;
      categoryName: string;
      score: number;
      minScore: number;
      passed: boolean;
    }>;
  };
  historyBreakdowns: BreakdownItem[][];
}

@Injectable()
export class AiRecommendationService {
  private readonly logger = new Logger(AiRecommendationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  queueGeneration(examResultId: string) {
    void this.processRecommendation(examResultId).catch((error: unknown) => {
      this.logger.error(
        `Failed to process AI recommendation for exam result ${examResultId}`,
        error instanceof Error ? error.stack : undefined,
      );
    });
  }

  private async processRecommendation(examResultId: string) {
    const recommendation = await this.prisma.aIRecommendation.findFirst({
      where: { examResultId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
      },
    });

    if (!recommendation || recommendation.status !== AIRecommendationStatus.processing) {
      return;
    }

    const context = await this.getRecommendationContext(examResultId);
    const categoryPassing = Object.fromEntries(
      context.examResult.categoryScores.map((item) => [item.categoryCode, item.passed]),
    );
    const currentBreakdown = context.examResult.breakdownJson as unknown as BreakdownItem[];
    const weakAreas = buildWeakAreaItems(
      currentBreakdown,
      categoryPassing,
      context.historyBreakdowns,
    );
    const payload = buildRecommendationPayload({
      examResultId: context.examResult.id,
      score: {
        total: context.examResult.totalScore,
        categories: context.examResult.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
          minScore: item.minScore,
          passed: item.passed,
        })),
      },
      passingStatus: {
        totalPassed: context.examResult.totalPassed,
        overallPassed: context.examResult.overallPassed,
        categories: context.examResult.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
          minScore: item.minScore,
          passed: item.passed,
        })),
      },
      breakdown: currentBreakdown,
      weakAreas,
    });

    await this.prisma.aIRecommendation.update({
      where: { id: recommendation.id },
      data: {
        rawRequestPayload: toInputJson(payload),
      },
    });

    const webhookUrl = this.resolveWebhookUrl();
    const webhookSecret = this.configService.get<string>('N8N_WEBHOOK_SECRET')?.trim();

    if (!webhookUrl || !webhookSecret) {
      await this.saveFallbackRecommendation(recommendation.id, payload, weakAreas, {
        overallPassed: context.examResult.overallPassed,
        errorMessage: 'N8N webhook belum dikonfigurasi',
      });
      return;
    }

    const timeoutMs = this.resolveTimeoutMs();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': webhookSecret,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const responseJson: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        await this.saveFallbackRecommendation(recommendation.id, payload, weakAreas, {
          overallPassed: context.examResult.overallPassed,
          errorMessage: `N8N webhook merespons ${response.status}`,
          rawAiResponse: responseJson,
        });
        return;
      }

      const normalized = normalizeAiResponse(responseJson);
      if (!normalized) {
        await this.saveFallbackRecommendation(recommendation.id, payload, weakAreas, {
          overallPassed: context.examResult.overallPassed,
          errorMessage: 'Format respons AI tidak sesuai kontrak',
          rawAiResponse: responseJson,
        });
        return;
      }

      const mergedItems = mergeRecommendationNarratives(
        weakAreas,
        normalized.recommendations,
      );

      await this.prisma.$transaction([
        this.prisma.aIRecommendationItem.deleteMany({
          where: { aiRecommendationId: recommendation.id },
        }),
        this.prisma.aIRecommendation.update({
          where: { id: recommendation.id },
          data: {
            status: AIRecommendationStatus.completed,
            isFallback: false,
            summary: normalized.summary,
            overallAssessment: normalized.overallAssessment,
            nextTryoutStrategy: normalized.nextTryoutStrategy,
            rawRequestPayload: toInputJson(payload),
            rawAiResponse: toInputJson(responseJson),
            errorMessage: null,
            generatedAt: new Date(),
            items: {
              create: mergedItems,
            },
          },
        }),
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Terjadi kegagalan saat memanggil N8N webhook';
      await this.saveFallbackRecommendation(recommendation.id, payload, weakAreas, {
        overallPassed: context.examResult.overallPassed,
        errorMessage: message,
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  private async getRecommendationContext(examResultId: string): Promise<RecommendationContext> {
    const examResult = await this.prisma.examResult.findUnique({
      where: { id: examResultId },
      select: {
        id: true,
        userId: true,
        totalScore: true,
        totalPassed: true,
        overallPassed: true,
        breakdownJson: true,
        categoryScores: {
          select: {
            categoryCode: true,
            categoryName: true,
            score: true,
            minScore: true,
            passed: true,
          },
          orderBy: { categoryCode: 'asc' },
        },
      },
    });

    if (!examResult) {
      throw new Error(`Exam result ${examResultId} not found while generating recommendation`);
    }

    const historyResults = await this.prisma.examResult.findMany({
      where: {
        userId: examResult.userId,
        id: {
          not: examResult.id,
        },
      },
      orderBy: { generatedAt: 'desc' },
      take: 5,
      select: {
        breakdownJson: true,
      },
    });

    return {
      examResult,
      historyBreakdowns: historyResults.map(
        (item) => item.breakdownJson as unknown as BreakdownItem[],
      ),
    };
  }

  private async saveFallbackRecommendation(
    recommendationId: string,
    payload: ReturnType<typeof buildRecommendationPayload>,
    weakAreas: ReturnType<typeof buildWeakAreaItems>,
    params: {
      overallPassed: boolean;
      errorMessage?: string;
      rawAiResponse?: unknown;
    },
  ) {
    const fallback = buildFallbackRecommendationRecord({
      weakAreas,
      overallPassed: params.overallPassed,
      rawRequestPayload: payload,
      errorMessage: params.errorMessage,
      rawAiResponse: params.rawAiResponse,
    });

    await this.prisma.$transaction([
      this.prisma.aIRecommendationItem.deleteMany({
        where: { aiRecommendationId: recommendationId },
      }),
      this.prisma.aIRecommendation.update({
        where: { id: recommendationId },
        data: {
          status: fallback.status,
          isFallback: fallback.isFallback,
          summary: fallback.summary,
          overallAssessment: fallback.overallAssessment,
          nextTryoutStrategy: fallback.nextTryoutStrategy,
          rawRequestPayload: fallback.rawRequestPayload,
          rawAiResponse: fallback.rawAiResponse,
          errorMessage: fallback.errorMessage,
          generatedAt: fallback.generatedAt,
          items: {
            create: fallback.items,
          },
        },
      }),
    ]);
  }

  private resolveWebhookUrl() {
    const rawUrl = this.configService.get<string>('N8N_WEBHOOK_URL')?.trim();
    if (!rawUrl) {
      return null;
    }

    return rawUrl.endsWith('/generate-recommendation')
      ? rawUrl
      : `${rawUrl.replace(/\/+$/, '')}/generate-recommendation`;
  }

  private resolveTimeoutMs() {
    const configured = Number(this.configService.get<string>('AI_RECOMMENDATION_TIMEOUT_MS') ?? '8000');
    if (!Number.isFinite(configured) || configured <= 0) {
      return 8000;
    }
    return configured;
  }
}
