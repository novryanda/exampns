import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service.js';
export declare class AiRecommendationService {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    queueGeneration(examResultId: string): void;
    private processRecommendation;
    private getRecommendationContext;
    private saveFallbackRecommendation;
    private resolveWebhookUrl;
    private resolveTimeoutMs;
}
