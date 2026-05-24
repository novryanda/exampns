var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiRecommendationService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIRecommendationStatus, QuestionCategory, } from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import { buildFallbackRecommendationRecord, buildRecommendationPayload, buildWeakAreaItems, mergeRecommendationNarratives, normalizeAiResponse, toInputJson, } from './exam-engine.helpers.js';
let AiRecommendationService = AiRecommendationService_1 = class AiRecommendationService {
    prisma;
    configService;
    logger = new Logger(AiRecommendationService_1.name);
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    queueGeneration(examResultId) {
        void this.processRecommendation(examResultId).catch((error) => {
            this.logger.error(`Failed to process AI recommendation for exam result ${examResultId}`, error instanceof Error ? error.stack : undefined);
        });
    }
    async processRecommendation(examResultId) {
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
        const categoryPassing = {
            [QuestionCategory.TWK]: context.examResult.twkPassed,
            [QuestionCategory.TIU]: context.examResult.tiuPassed,
            [QuestionCategory.TKP]: context.examResult.tkpPassed,
        };
        const currentBreakdown = context.examResult.breakdownJson;
        const weakAreas = buildWeakAreaItems(currentBreakdown, categoryPassing, context.historyBreakdowns);
        const payload = buildRecommendationPayload({
            examResultId: context.examResult.id,
            score: {
                twk: context.examResult.twkScore,
                tiu: context.examResult.tiuScore,
                tkp: context.examResult.tkpScore,
                total: context.examResult.totalScore,
            },
            passingStatus: {
                twkPassed: context.examResult.twkPassed,
                tiuPassed: context.examResult.tiuPassed,
                tkpPassed: context.examResult.tkpPassed,
                totalPassed: context.examResult.totalPassed,
                overallPassed: context.examResult.overallPassed,
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
        const webhookSecret = this.configService.get('N8N_WEBHOOK_SECRET')?.trim();
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
            const responseJson = await response.json().catch(() => null);
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
            const mergedItems = mergeRecommendationNarratives(weakAreas, normalized.recommendations);
            await this.prisma.aIRecommendation.update({
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
                        deleteMany: {},
                        create: mergedItems,
                    },
                },
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Terjadi kegagalan saat memanggil N8N webhook';
            await this.saveFallbackRecommendation(recommendation.id, payload, weakAreas, {
                overallPassed: context.examResult.overallPassed,
                errorMessage: message,
            });
        }
        finally {
            clearTimeout(timeout);
        }
    }
    async getRecommendationContext(examResultId) {
        const examResult = await this.prisma.examResult.findUnique({
            where: { id: examResultId },
            select: {
                id: true,
                userId: true,
                twkScore: true,
                tiuScore: true,
                tkpScore: true,
                totalScore: true,
                twkPassed: true,
                tiuPassed: true,
                tkpPassed: true,
                totalPassed: true,
                overallPassed: true,
                breakdownJson: true,
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
            historyBreakdowns: historyResults.map((item) => item.breakdownJson),
        };
    }
    async saveFallbackRecommendation(recommendationId, payload, weakAreas, params) {
        const fallback = buildFallbackRecommendationRecord({
            weakAreas,
            overallPassed: params.overallPassed,
            rawRequestPayload: payload,
            errorMessage: params.errorMessage,
            rawAiResponse: params.rawAiResponse,
        });
        await this.prisma.aIRecommendation.update({
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
                    deleteMany: {},
                    create: fallback.items,
                },
            },
        });
    }
    resolveWebhookUrl() {
        const rawUrl = this.configService.get('N8N_WEBHOOK_URL')?.trim();
        if (!rawUrl) {
            return null;
        }
        return rawUrl.endsWith('/generate-recommendation')
            ? rawUrl
            : `${rawUrl.replace(/\/+$/, '')}/generate-recommendation`;
    }
    resolveTimeoutMs() {
        const configured = Number(this.configService.get('AI_RECOMMENDATION_TIMEOUT_MS') ?? '8000');
        if (!Number.isFinite(configured) || configured <= 0) {
            return 8000;
        }
        return configured;
    }
};
AiRecommendationService = AiRecommendationService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ConfigService])
], AiRecommendationService);
export { AiRecommendationService };
//# sourceMappingURL=ai-recommendation.service.js.map