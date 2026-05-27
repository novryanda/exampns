var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { ActivationSource, QuestionStatus, SubscriptionStatus, UserRole, UserStatus, } from '../../generated/prisma/client.js';
import { auth } from '../auth/auth.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import { adminTransactionsQuerySchema, adminUsersQuerySchema, auditLogsQuerySchema, createAdminSchema, createPlatformUserSchema, createSubscriptionPlanSchema, deactivateAdminSchema, deletePlatformUserSchema, updatePlatformUserStatusSchema, manualSubscriptionActivationSchema, updateAiRecommendationSettingsSchema, updatePassingGradeSchema, updateSubscriptionPlanSchema, updateTrialConfigSchema, } from './operations.schemas.js';
let OperationsService = class OperationsService {
    prisma;
    validationService;
    constructor(prisma, validationService) {
        this.prisma = prisma;
        this.validationService = validationService;
    }
    async getUserDashboardSummary(actor) {
        const [subscription, lastResult] = await Promise.all([
            this.prisma.userSubscription.findFirst({
                where: {
                    userId: actor.id,
                },
                include: {
                    subscriptionPlan: true,
                },
                orderBy: [{ status: 'asc' }, { endDate: 'desc' }, { createdAt: 'desc' }],
            }),
            this.prisma.examResult.findFirst({
                where: {
                    userId: actor.id,
                },
                include: {
                    examSession: true,
                    aiRecommendations: {
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                        include: {
                            items: {
                                orderBy: { priorityOrder: 'asc' },
                                take: 3,
                            },
                        },
                    },
                },
                orderBy: { generatedAt: 'desc' },
            }),
        ]);
        const recentResults = await this.prisma.examResult.findMany({
            where: {
                userId: actor.id,
            },
            include: {
                examSession: true,
            },
            orderBy: { generatedAt: 'desc' },
            take: 5,
        });
        const greetingName = actor.name.split(' ')[0] || actor.name;
        const accessType = subscription?.isTrial ? 'trial' : 'paid';
        const tryoutRemaining = subscription?.tryoutLimit === null || subscription?.tryoutLimit === undefined
            ? null
            : Math.max(0, subscription.tryoutLimit - subscription.tryoutUsed);
        const daysRemaining = subscription
            ? Math.max(0, Math.ceil((subscription.endDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000)))
            : 0;
        const latestRecommendation = lastResult?.aiRecommendations[0] ?? null;
        return {
            greetingName,
            accessStatus: subscription
                ? {
                    type: accessType,
                    status: subscription.status,
                    tryoutRemaining,
                    daysRemaining,
                    endDate: subscription.endDate,
                }
                : {
                    type: 'none',
                    status: 'inactive',
                    tryoutRemaining: null,
                    daysRemaining: 0,
                    endDate: null,
                },
            lastResult: lastResult
                ? {
                    examResultId: lastResult.id,
                    examDate: lastResult.examSession.startedAt,
                    twkScore: lastResult.twkScore,
                    tiuScore: lastResult.tiuScore,
                    tkpScore: lastResult.tkpScore,
                    totalScore: lastResult.totalScore,
                    overallPassed: lastResult.overallPassed,
                }
                : null,
            latestRecommendation: latestRecommendation
                ? {
                    summary: latestRecommendation.summary,
                    priorityTopic: latestRecommendation.items[0]?.topicTag ?? null,
                }
                : null,
            weakAreas: latestRecommendation?.items.slice(0, 3).map((item) => ({
                category: item.category,
                subCategory: item.subCategory,
                topicTag: item.topicTag,
                accuracy: item.accuracy === null ? null : Number(item.accuracy),
            })) ?? [],
            recentExams: recentResults.map((result) => ({
                examResultId: result.id,
                examDate: result.examSession.startedAt,
                totalScore: result.totalScore,
                overallPassed: result.overallPassed,
            })),
        };
    }
    async getAdminDashboardSummary(actor) {
        const [totalQuestions, activeQuestions, pendingParsedQuestions, draftTryouts, submittedReviewTryouts, failedPdfBatches, recentImportBatches, questionDistributionRows, recentActivity,] = await Promise.all([
            this.prisma.question.count({
                where: {
                    deletedAt: null,
                },
            }),
            this.prisma.question.count({
                where: {
                    status: QuestionStatus.active,
                    deletedAt: null,
                },
            }),
            this.prisma.parsedQuestionReview.count({
                where: {
                    status: 'pending_review',
                },
            }),
            this.prisma.tryoutCatalog.count({
                where: {
                    status: 'draft',
                },
            }),
            this.prisma.tryoutCatalog.count({
                where: {
                    status: 'review',
                },
            }),
            this.prisma.questionImportBatch.count({
                where: {
                    status: {
                        in: ['failed', 'partial_failed'],
                    },
                },
            }),
            this.prisma.questionImportBatch.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            this.prisma.question.groupBy({
                by: ['category'],
                _count: {
                    _all: true,
                },
                where: {
                    status: QuestionStatus.active,
                    deletedAt: null,
                },
            }),
            this.prisma.auditLog.findMany({
                where: {
                    actorUserId: actor.id,
                    module: {
                        in: ['question_bank', 'pdf_import', 'tryout_draft'],
                    },
                },
                include: {
                    actorUser: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
        ]);
        return {
            totalQuestions,
            activeQuestions,
            pendingParsedQuestions,
            draftTryouts,
            submittedReviewTryouts,
            failedPdfBatches,
            questionDistribution: ['TWK', 'TIU', 'TKP'].map((category) => ({
                category,
                activeCount: questionDistributionRows.find((row) => row.category === category)?._count._all ?? 0,
            })),
            recentImportBatches: recentImportBatches.map((batch) => ({
                batchId: batch.id,
                fileName: batch.fileName,
                status: batch.status,
                totalDetected: batch.totalDetected,
                validCount: batch.validCount,
                invalidCount: batch.invalidCount,
                createdAt: batch.createdAt,
            })),
            recentActivity: recentActivity.map((log) => ({
                id: log.id,
                actorName: log.actorUser?.name ?? actor.name,
                action: log.action,
                module: log.module,
                targetType: log.targetType,
                targetId: log.targetId,
                createdAt: log.createdAt,
            })),
        };
    }
    async listUsersForMonitoring(rawQuery) {
        const query = this.validationService.validate(adminUsersQuerySchema, rawQuery);
        const users = await this.prisma.user.findMany({
            where: {
                role: UserRole.USER,
                deletedAt: null,
                ...(query.status ? { status: query.status } : {}),
                ...(query.search
                    ? {
                        OR: [
                            { name: { contains: query.search, mode: 'insensitive' } },
                            { email: { contains: query.search, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            include: {
                userSubscriptions: {
                    orderBy: { endDate: 'desc' },
                    take: 1,
                },
                _count: {
                    select: {
                        examResults: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const filtered = users.filter((user) => {
            const latestSubscription = user.userSubscriptions[0] ?? null;
            const derivedStatus = this.deriveSubscriptionStatus(latestSubscription);
            return query.subscriptionStatus ? derivedStatus === query.subscriptionStatus : true;
        });
        const skip = (query.page - 1) * query.limit;
        const items = filtered.slice(skip, skip + query.limit);
        return {
            data: items.map((user) => ({
                id: user.id,
                fullName: user.name,
                email: user.email,
                status: user.status,
                subscriptionStatus: this.deriveSubscriptionStatus(user.userSubscriptions[0] ?? null),
                totalExams: user._count.examResults,
                lastActiveAt: user.lastLoginAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems: filtered.length,
                totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)),
            },
        };
    }
    async getUserDetailForAdmin(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userSubscriptions: {
                    include: {
                        subscriptionPlan: true,
                    },
                    orderBy: { endDate: 'desc' },
                    take: 1,
                },
                examResults: {
                    orderBy: { generatedAt: 'desc' },
                    take: 50,
                    include: {
                        examSession: true,
                    },
                },
            },
        });
        if (!user || user.deletedAt !== null || user.role !== UserRole.USER) {
            throw new NotFoundException('User tidak ditemukan');
        }
        const latestSubscription = user.userSubscriptions[0] ?? null;
        const totalExams = user.examResults.length;
        const averageScore = totalExams === 0
            ? 0
            : Math.round(user.examResults.reduce((sum, result) => sum + result.totalScore, 0) / totalExams);
        return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
            subscription: latestSubscription
                ? {
                    status: this.deriveSubscriptionStatus(latestSubscription),
                    endDate: latestSubscription.endDate,
                    tryoutUsed: latestSubscription.tryoutUsed,
                    tryoutLimit: latestSubscription.tryoutLimit,
                }
                : null,
            examSummary: {
                totalExams,
                averageScore,
                lastExamAt: user.examResults[0]?.examSession.startedAt ?? null,
            },
        };
    }
    async createPlatformUser(rawBody, actor) {
        const payload = this.validationService.validate(createPlatformUserSchema, rawBody);
        const normalizedEmail = payload.email.trim().toLowerCase();
        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true, deletedAt: true },
        });
        if (existingUser && existingUser.deletedAt === null) {
            throw new ConflictException('Email sudah terdaftar');
        }
        const temporaryPassword = this.generateTemporaryPassword();
        const authResponse = await auth.api.signUpEmail({
            asResponse: true,
            headers: this.toInternalAuthHeaders(),
            body: {
                name: payload.fullName,
                email: normalizedEmail,
                password: temporaryPassword,
                phone: payload.phone,
            },
        });
        if (!authResponse.ok) {
            let message = 'Gagal membuat akun user';
            try {
                const responsePayload = (await authResponse.json());
                if (responsePayload.message) {
                    message = responsePayload.message;
                }
            }
            catch {
            }
            throw new ConflictException(message);
        }
        const createdUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true, email: true, emailVerifiedAt: true },
        });
        if (!createdUser) {
            throw new NotFoundException('User tidak ditemukan setelah dibuat');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: createdUser.id },
                data: {
                    name: payload.fullName,
                    phone: payload.phone ?? null,
                    role: UserRole.USER,
                    status: UserStatus.inactive,
                    emailVerified: true,
                    emailVerifiedAt: new Date(),
                    passwordSetAt: null,
                    deletedAt: null,
                },
            });
            await tx.session.deleteMany({ where: { userId: createdUser.id } });
        });
        await this.sendSetPasswordLink(normalizedEmail);
        await this.createAuditLog({
            actor,
            action: 'CREATE_PLATFORM_USER',
            module: 'user_management',
            targetType: 'user',
            targetId: createdUser.id,
            metadata: {
                email: normalizedEmail,
                fullName: payload.fullName,
            },
        });
        return {
            id: createdUser.id,
            email: createdUser.email,
            role: UserRole.USER,
            status: UserStatus.inactive,
        };
    }
    async updatePlatformUserStatus(userId, rawBody, actor) {
        const payload = this.validationService.validate(updatePlatformUserStatusSchema, rawBody);
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.deletedAt !== null || user.role !== UserRole.USER) {
            throw new NotFoundException('User tidak ditemukan');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: { status: payload.status },
            });
            if (payload.status !== UserStatus.active) {
                await tx.session.deleteMany({ where: { userId } });
            }
        });
        await this.createAuditLog({
            actor,
            action: 'UPDATE_USER_STATUS',
            module: 'user_management',
            targetType: 'user',
            targetId: userId,
            metadata: {
                previousStatus: user.status,
                nextStatus: payload.status,
            },
        });
        return {
            id: userId,
            status: payload.status,
        };
    }
    async deletePlatformUser(userId, rawBody, actor) {
        const payload = this.validationService.validate(deletePlatformUserSchema, rawBody);
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.deletedAt !== null || user.role !== UserRole.USER) {
            throw new NotFoundException('User tidak ditemukan');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: {
                    deletedAt: new Date(),
                    status: UserStatus.inactive,
                },
            });
            await tx.session.deleteMany({ where: { userId } });
        });
        await this.createAuditLog({
            actor,
            action: 'DELETE_PLATFORM_USER',
            module: 'user_management',
            targetType: 'user',
            targetId: userId,
            metadata: {
                email: user.email,
                reason: payload.reason,
            },
        });
    }
    async listTransactionsForMonitoring(rawQuery) {
        const query = this.validationService.validate(adminTransactionsQuerySchema, rawQuery);
        const where = {
            ...(query.status ? { status: query.status } : {}),
            ...(query.paymentMethod ? { paymentMethod: query.paymentMethod } : {}),
            ...(query.dateFrom || query.dateTo
                ? {
                    createdAt: {
                        ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
                        ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
                    },
                }
                : {}),
            ...(query.search
                ? {
                    OR: [
                        { invoiceNumber: { contains: query.search, mode: 'insensitive' } },
                        { user: { email: { contains: query.search, mode: 'insensitive' } } },
                    ],
                }
                : {}),
        };
        const skip = (query.page - 1) * query.limit;
        const [transactions, totalItems] = await Promise.all([
            this.prisma.paymentTransaction.findMany({
                where,
                include: {
                    user: true,
                    subscriptionPlan: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.paymentTransaction.count({ where }),
        ]);
        return {
            data: transactions.map((transaction) => ({
                id: transaction.id,
                invoiceNumber: transaction.invoiceNumber,
                userName: transaction.user.name,
                userEmail: transaction.user.email,
                planName: transaction.subscriptionPlan.name,
                amount: Number(transaction.amount),
                paymentMethod: transaction.paymentMethod,
                status: transaction.status,
                createdAt: transaction.createdAt,
                paidAt: transaction.paidAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    async listAdmins() {
        const admins = await this.prisma.user.findMany({
            where: {
                role: UserRole.ADMIN,
                deletedAt: null,
            },
            orderBy: { createdAt: 'desc' },
        });
        return admins.map((admin) => ({
            id: admin.id,
            fullName: admin.name,
            email: admin.email,
            status: admin.status,
            lastLoginAt: admin.lastLoginAt,
        }));
    }
    async createAdmin(rawBody, actor) {
        const payload = this.validationService.validate(createAdminSchema, rawBody);
        const normalizedEmail = payload.email.trim().toLowerCase();
        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
                id: true,
            },
        });
        if (existingUser) {
            throw new ConflictException('Email admin sudah terdaftar');
        }
        const temporaryPassword = this.generateTemporaryPassword();
        const authResponse = await auth.api.signUpEmail({
            asResponse: true,
            headers: this.toInternalAuthHeaders(),
            body: {
                name: payload.fullName,
                email: normalizedEmail,
                password: temporaryPassword,
            },
        });
        if (!authResponse.ok) {
            let message = 'Gagal membuat akun admin';
            try {
                const responsePayload = (await authResponse.json());
                if (responsePayload.message) {
                    message = responsePayload.message;
                }
            }
            catch {
            }
            throw new ConflictException(message);
        }
        const createdAdmin = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: {
                id: true,
                email: true,
                emailVerifiedAt: true,
            },
        });
        if (!createdAdmin) {
            throw new NotFoundException('Akun admin tidak ditemukan setelah dibuat');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: createdAdmin.id },
                data: {
                    name: payload.fullName,
                    phone: payload.phone ?? null,
                    role: UserRole.ADMIN,
                    status: UserStatus.inactive,
                    emailVerified: true,
                    emailVerifiedAt: new Date(),
                    passwordSetAt: null,
                },
            });
            await tx.userSubscription.deleteMany({
                where: {
                    userId: createdAdmin.id,
                    isTrial: true,
                    status: SubscriptionStatus.active,
                    activationSource: ActivationSource.trial,
                },
            });
            await tx.session.deleteMany({
                where: {
                    userId: createdAdmin.id,
                },
            });
        });
        await this.sendSetPasswordLink(normalizedEmail);
        await this.createAuditLog({
            actor,
            action: 'CREATE_ADMIN',
            module: 'admin_management',
            targetType: 'user',
            targetId: createdAdmin.id,
            metadata: {
                email: normalizedEmail,
                fullName: payload.fullName,
            },
        });
        return {
            id: createdAdmin.id,
            email: createdAdmin.email,
            role: UserRole.ADMIN,
            status: UserStatus.inactive,
        };
    }
    async deactivateAdmin(adminId, rawBody, actor) {
        const payload = this.validationService.validate(deactivateAdminSchema, rawBody);
        const admin = await this.prisma.user.findUnique({
            where: { id: adminId },
        });
        if (!admin || admin.deletedAt !== null || admin.role !== UserRole.ADMIN) {
            throw new NotFoundException('Admin tidak ditemukan');
        }
        await this.prisma.user.update({
            where: { id: adminId },
            data: {
                status: UserStatus.inactive,
            },
        });
        await this.createAuditLog({
            actor,
            action: 'DEACTIVATE_ADMIN',
            module: 'admin_management',
            targetType: 'user',
            targetId: adminId,
            metadata: {
                reason: payload.reason,
            },
        });
    }
    async createSubscriptionPlan(rawBody, actor) {
        const payload = this.validationService.validate(createSubscriptionPlanSchema, rawBody);
        const created = await this.prisma.subscriptionPlan.create({
            data: {
                name: payload.name,
                description: payload.description ?? null,
                durationDays: payload.durationDays,
                price: payload.price,
                currency: payload.currency,
                isActive: payload.isActive,
                isTrial: false,
            },
        });
        await this.createAuditLog({
            actor,
            action: 'CREATE_SUBSCRIPTION_PLAN',
            module: 'configuration',
            targetType: 'subscription_plan',
            targetId: created.id,
            metadata: payload,
        });
        return { id: created.id };
    }
    async updateSubscriptionPlan(planId, rawBody, actor) {
        const payload = this.validationService.validate(updateSubscriptionPlanSchema, rawBody);
        const existing = await this.prisma.subscriptionPlan.findUnique({
            where: { id: planId },
        });
        if (!existing) {
            throw new NotFoundException('Subscription plan tidak ditemukan');
        }
        await this.prisma.subscriptionPlan.update({
            where: { id: planId },
            data: {
                ...(payload.name !== undefined ? { name: payload.name } : {}),
                ...(payload.description !== undefined ? { description: payload.description } : {}),
                ...(payload.durationDays !== undefined ? { durationDays: payload.durationDays } : {}),
                ...(payload.price !== undefined ? { price: payload.price } : {}),
                ...(payload.currency !== undefined ? { currency: payload.currency } : {}),
                ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
            },
        });
        await this.createAuditLog({
            actor,
            action: 'UPDATE_SUBSCRIPTION_PLAN',
            module: 'configuration',
            targetType: 'subscription_plan',
            targetId: planId,
            metadata: payload,
        });
    }
    async getPassingGrade() {
        const config = await this.prisma.passingGradeConfig.findFirst({
            where: { isActive: true },
            orderBy: { effectiveFrom: 'desc' },
        });
        if (!config) {
            throw new NotFoundException('Passing grade config tidak ditemukan');
        }
        return config;
    }
    async updatePassingGrade(rawBody, actor) {
        const payload = this.validationService.validate(updatePassingGradeSchema, rawBody);
        await this.prisma.$transaction(async (tx) => {
            await tx.passingGradeConfig.updateMany({
                where: { isActive: true },
                data: { isActive: false },
            });
            await tx.passingGradeConfig.create({
                data: {
                    ...payload,
                    effectiveFrom: new Date(payload.effectiveFrom),
                    isActive: true,
                },
            });
        });
        await this.createAuditLog({
            actor,
            action: 'UPDATE_PASSING_GRADE',
            module: 'configuration',
            targetType: 'passing_grade_config',
            metadata: payload,
        });
    }
    async getTrialConfig() {
        const config = await this.prisma.trialConfig.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!config) {
            throw new NotFoundException('Trial config tidak ditemukan');
        }
        return config;
    }
    async updateTrialConfig(rawBody, actor) {
        const payload = this.validationService.validate(updateTrialConfigSchema, rawBody);
        const current = await this.prisma.trialConfig.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!current) {
            throw new NotFoundException('Trial config tidak ditemukan');
        }
        await this.prisma.trialConfig.update({
            where: { id: current.id },
            data: payload,
        });
        await this.createAuditLog({
            actor,
            action: 'UPDATE_TRIAL_CONFIG',
            module: 'configuration',
            targetType: 'trial_config',
            targetId: current.id,
            metadata: payload,
        });
    }
    async getAiRecommendationSettings() {
        const settingKeys = [
            'ai.recommendation.enabled',
            'ai.recommendation.fallback_enabled',
            'ai.recommendation.provider_name',
            'ai.recommendation.timeout_seconds',
            'ai.recommendation.weak_area_accuracy_threshold',
            'ai.recommendation.minimum_questions_per_topic',
            'ai.recommendation.max_weak_areas',
            'ai.recommendation.priority_score_formula',
            'ai.recommendation.show_summary',
            'ai.recommendation.show_weak_areas',
            'ai.recommendation.show_next_tryout_strategy',
            'ai.recommendation.enable_result_page_banner',
            'ai.recommendation.error_notification',
            'ai.recommendation.retry_failed_job',
            'ai.recommendation.log_level',
        ];
        const [settings, todayAiStats] = await Promise.all([
            this.prisma.systemSetting.findMany({
                where: {
                    key: {
                        in: [...settingKeys],
                    },
                },
            }),
            this.prisma.aIRecommendation.groupBy({
                by: ['status'],
                _count: {
                    _all: true,
                },
                where: {
                    createdAt: {
                        gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                    },
                },
            }),
        ]);
        const settingsMap = new Map(settings.map((setting) => [setting.key, setting]));
        const lastUpdatedAt = settings.reduce((latest, setting) => latest && latest > setting.updatedAt ? latest : setting.updatedAt, null);
        const totalAiJobsToday = todayAiStats.reduce((sum, item) => sum + item._count._all, 0);
        const successfulAiJobsToday = todayAiStats
            .filter((item) => item.status === 'completed' || item.status === 'fallback')
            .reduce((sum, item) => sum + item._count._all, 0);
        const failedAiJobsToday = todayAiStats
            .filter((item) => item.status === 'failed')
            .reduce((sum, item) => sum + item._count._all, 0);
        const getValue = (key, fallback) => {
            const setting = settingsMap.get(key);
            return setting ? setting.value : fallback;
        };
        return {
            enabled: getValue('ai.recommendation.enabled', true),
            fallbackEnabled: getValue('ai.recommendation.fallback_enabled', true),
            providerName: getValue('ai.recommendation.provider_name', 'OpenAI GPT-4o-mini via n8n'),
            timeoutSeconds: getValue('ai.recommendation.timeout_seconds', 60),
            weakAreaAccuracyThreshold: getValue('ai.recommendation.weak_area_accuracy_threshold', 60),
            minimumQuestionsPerTopic: getValue('ai.recommendation.minimum_questions_per_topic', 5),
            maxWeakAreas: getValue('ai.recommendation.max_weak_areas', 5),
            priorityScoreFormula: getValue('ai.recommendation.priority_score_formula', '(1 - accuracy) * 0.6 + (question_count_weight) * 0.4'),
            showSummary: getValue('ai.recommendation.show_summary', true),
            showWeakAreas: getValue('ai.recommendation.show_weak_areas', true),
            showNextTryoutStrategy: getValue('ai.recommendation.show_next_tryout_strategy', true),
            enableResultPageBanner: getValue('ai.recommendation.enable_result_page_banner', true),
            errorNotification: getValue('ai.recommendation.error_notification', true),
            retryFailedJob: getValue('ai.recommendation.retry_failed_job', true),
            logLevel: getValue('ai.recommendation.log_level', 'info'),
            status: process.env.N8N_WEBHOOK_URL ? 'active' : 'degraded',
            n8nConnected: Boolean(process.env.N8N_WEBHOOK_URL),
            lastUpdatedAt,
            aiJobsToday: totalAiJobsToday,
            failedAiJobsToday,
            successRateToday: totalAiJobsToday === 0
                ? 100
                : Number(((successfulAiJobsToday / totalAiJobsToday) * 100).toFixed(1)),
        };
    }
    async updateAiRecommendationSettings(rawBody, actor) {
        const payload = this.validationService.validate(updateAiRecommendationSettingsSchema, rawBody);
        await this.prisma.$transaction(Object.entries({
            'ai.recommendation.enabled': payload.enabled,
            'ai.recommendation.fallback_enabled': payload.fallbackEnabled,
            'ai.recommendation.provider_name': payload.providerName,
            'ai.recommendation.timeout_seconds': payload.timeoutSeconds,
            'ai.recommendation.weak_area_accuracy_threshold': payload.weakAreaAccuracyThreshold,
            'ai.recommendation.minimum_questions_per_topic': payload.minimumQuestionsPerTopic,
            'ai.recommendation.max_weak_areas': payload.maxWeakAreas,
            'ai.recommendation.priority_score_formula': payload.priorityScoreFormula,
            'ai.recommendation.show_summary': payload.showSummary,
            'ai.recommendation.show_weak_areas': payload.showWeakAreas,
            'ai.recommendation.show_next_tryout_strategy': payload.showNextTryoutStrategy,
            'ai.recommendation.enable_result_page_banner': payload.enableResultPageBanner,
            'ai.recommendation.error_notification': payload.errorNotification,
            'ai.recommendation.retry_failed_job': payload.retryFailedJob,
            'ai.recommendation.log_level': payload.logLevel,
        }).map(([key, value]) => this.prisma.systemSetting.upsert({
            where: { key },
            create: {
                key,
                value,
            },
            update: {
                value,
            },
        })));
        await this.createAuditLog({
            actor,
            action: 'UPDATE_AI_RECOMMENDATION_SETTINGS',
            module: 'configuration',
            targetType: 'system_setting',
            metadata: payload,
        });
    }
    async manualSubscriptionActivation(rawBody, actor) {
        const payload = this.validationService.validate(manualSubscriptionActivationSchema, rawBody);
        const [user, plan] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: payload.userId },
            }),
            this.prisma.subscriptionPlan.findUnique({
                where: { id: payload.subscriptionPlanId },
            }),
        ]);
        if (!user || user.deletedAt !== null) {
            throw new NotFoundException('User tidak ditemukan');
        }
        if (!plan || !plan.isActive) {
            throw new NotFoundException('Subscription plan tidak ditemukan');
        }
        if (plan.isTrial) {
            throw new ConflictException('Trial plan tidak dapat digunakan untuk manual activation');
        }
        const now = new Date();
        const subscription = await this.prisma.$transaction(async (tx) => {
            const activePaidSubscription = await tx.userSubscription.findFirst({
                where: {
                    userId: payload.userId,
                    isTrial: false,
                    status: SubscriptionStatus.active,
                    endDate: {
                        gt: now,
                    },
                },
                orderBy: { endDate: 'desc' },
            });
            if (activePaidSubscription) {
                return tx.userSubscription.update({
                    where: { id: activePaidSubscription.id },
                    data: {
                        endDate: new Date(activePaidSubscription.endDate.getTime() +
                            payload.durationDays * 24 * 60 * 60 * 1000),
                    },
                });
            }
            return tx.userSubscription.create({
                data: {
                    userId: payload.userId,
                    subscriptionPlanId: payload.subscriptionPlanId,
                    status: SubscriptionStatus.active,
                    startDate: now,
                    endDate: new Date(now.getTime() + payload.durationDays * 24 * 60 * 60 * 1000),
                    tryoutLimit: null,
                    tryoutUsed: 0,
                    isTrial: false,
                    activationSource: ActivationSource.manual,
                    activatedBy: actor.id,
                },
            });
        });
        await this.createAuditLog({
            actor,
            action: 'MANUAL_SUBSCRIPTION_ACTIVATION',
            module: 'subscription',
            targetType: 'user_subscription',
            targetId: subscription.id,
            metadata: payload,
        });
        return {
            userSubscriptionId: subscription.id,
            status: subscription.status,
            endDate: subscription.endDate,
        };
    }
    async getAuditLogs(rawQuery) {
        const query = this.validationService.validate(auditLogsQuerySchema, rawQuery);
        const createdAtFilter = this.resolveAuditLogCreatedAtFilter(query);
        const where = {
            ...(query.actorUserId ? { actorUserId: query.actorUserId } : {}),
            ...(query.module ? { module: query.module } : {}),
            ...(query.action ? { action: query.action } : {}),
            ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
        };
        const skip = (query.page - 1) * query.limit;
        const [logs, totalItems] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                include: {
                    actorUser: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            data: logs.map((log) => ({
                id: log.id,
                actorUserId: log.actorUserId,
                actorName: log.actorUser?.name ?? null,
                actorRole: log.actorRole,
                action: log.action,
                module: log.module,
                targetType: log.targetType,
                targetId: log.targetId,
                metadata: log.metadata,
                createdAt: log.createdAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    async getAdminSelfAuditLogs(actor, rawQuery) {
        const query = this.validationService.validate(auditLogsQuerySchema, rawQuery);
        const createdAtFilter = this.resolveAuditLogCreatedAtFilter(query);
        const where = {
            actorUserId: actor.id,
            ...(query.module ? { module: query.module } : {}),
            ...(query.action ? { action: query.action } : {}),
            ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
        };
        const skip = (query.page - 1) * query.limit;
        const [logs, totalItems] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                include: {
                    actorUser: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: query.limit,
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            data: logs.map((log) => ({
                id: log.id,
                actorUserId: log.actorUserId,
                actorName: log.actorUser?.name ?? null,
                actorRole: log.actorRole,
                action: log.action,
                module: log.module,
                targetType: log.targetType,
                targetId: log.targetId,
                metadata: log.metadata,
                createdAt: log.createdAt,
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
            },
        };
    }
    deriveSubscriptionStatus(subscription) {
        if (!subscription) {
            return 'expired';
        }
        if (subscription.isTrial && subscription.status === SubscriptionStatus.active && subscription.endDate > new Date()) {
            return 'trial';
        }
        if (subscription.status === SubscriptionStatus.active && subscription.endDate > new Date()) {
            return 'active';
        }
        return 'expired';
    }
    resolveAuditLogCreatedAtFilter(query) {
        if (query.dateFrom || query.dateTo) {
            return {
                ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
                ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
            };
        }
        if (!query.period) {
            return undefined;
        }
        const now = new Date();
        const start = new Date(now);
        switch (query.period) {
            case 'today':
                start.setHours(0, 0, 0, 0);
                return {
                    gte: start,
                    lte: now,
                };
            case '7d':
                start.setDate(start.getDate() - 6);
                start.setHours(0, 0, 0, 0);
                return {
                    gte: start,
                    lte: now,
                };
            case '30d':
                start.setDate(start.getDate() - 29);
                start.setHours(0, 0, 0, 0);
                return {
                    gte: start,
                    lte: now,
                };
            case 'this_month':
                start.setDate(1);
                start.setHours(0, 0, 0, 0);
                return {
                    gte: start,
                    lte: now,
                };
            default:
                return undefined;
        }
    }
    async createAuditLog(params) {
        await this.prisma.auditLog.create({
            data: {
                actorUserId: params.actor.id,
                actorRole: params.actor.role ?? UserRole.SUPER_ADMIN,
                action: params.action,
                module: params.module,
                targetType: params.targetType,
                targetId: params.targetId,
                metadata: params.metadata,
            },
        });
    }
    getFrontendUrl() {
        return process.env.FRONTEND_URL ?? 'http://localhost:3000';
    }
    async sendSetPasswordLink(email) {
        const authResponse = await auth.api.requestPasswordReset({
            asResponse: true,
            headers: this.toInternalAuthHeaders(),
            body: {
                email,
                redirectTo: `${this.getFrontendUrl()}/auth/reset-password`,
            },
        });
        if (!authResponse.ok) {
            let message = 'Gagal mengirim email atur password';
            try {
                const responsePayload = (await authResponse.json());
                if (responsePayload.message) {
                    message = responsePayload.message;
                }
            }
            catch {
            }
            throw new InternalServerErrorException(message);
        }
    }
    toInternalAuthHeaders() {
        const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
        const url = new URL(appUrl);
        return new Headers({
            origin: appUrl,
            host: url.host,
            'content-type': 'application/json',
        });
    }
    generateTemporaryPassword() {
        return `Adm!${randomBytes(8).toString('base64url')}`;
    }
};
OperationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ValidationService])
], OperationsService);
export { OperationsService };
//# sourceMappingURL=operations.service.js.map