import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import {
  ActivationSource,
  PaymentStatus,
  QuestionStatus,
  SubscriptionStatus,
  SubscriptionTier,
  UserRole,
  UserStatus,
  type AIRecommendationStatus,
  type Prisma,
} from '../../generated/prisma/client.js';
import { auth } from '../auth/auth.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { AccessResolverService } from '../common/access-resolver.service.js';
import {
  canAccessRequiredPlanTier,
  getSubscriptionTierSnapshot,
} from '../common/access-control.helpers.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  adminAccountsQuerySchema,
  adminTransactionsQuerySchema,
  adminUsersQuerySchema,
  auditLogsQuerySchema,
  createAdminSchema,
  createPlatformUserSchema,
  createSubscriptionPlanSchema,
  createUserAccessOverrideSchema,
  deactivateAdminSchema,
  deletePlatformUserSchema,
  updatePlatformUserStatusSchema,
  manualSubscriptionActivationSchema,
  revokeUserAccessOverrideSchema,
  updateAiRecommendationSettingsSchema,
  updatePassingGradeSchema,
  updateSubscriptionPlanSchema,
  updateTrialConfigSchema,
} from './operations.schemas.js';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accessResolverService: AccessResolverService,
    private readonly validationService: ValidationService,
  ) {}

  async getUserDashboardSummary(actor: AuthenticatedUser) {
    const [accessResolution, subscription, lastResult] = await Promise.all([
      this.accessResolverService.resolveEffectiveAccessLevel(actor.id),
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
          categoryScores: {
            orderBy: { categoryCode: 'asc' },
          },
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
        examSession: {
          include: {
            tryoutCatalog: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        categoryScores: {
          orderBy: { categoryCode: 'asc' },
        },
      },
      orderBy: { generatedAt: 'desc' },
      take: 5,
    });

    const greetingName = actor.name.split(' ')[0] || actor.name;
    const tryoutRemaining =
      subscription?.tryoutLimit === null || subscription?.tryoutLimit === undefined
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
            type: accessResolution.effectiveAccessLevel,
            source: accessResolution.effectiveAccessSource,
            status: subscription.status,
            tryoutRemaining,
            daysRemaining,
            endDate: subscription.endDate,
            tier: getSubscriptionTierSnapshot(subscription),
          }
        : {
            type: 'expired',
            source: 'none',
            status: 'inactive',
            tryoutRemaining: null,
            daysRemaining: 0,
            endDate: null,
            tier: null,
          },
      lastResult: lastResult
        ? {
            examResultId: lastResult.id,
            examDate: lastResult.examSession.startedAt,
            totalScore: lastResult.totalScore,
            categoryScores: lastResult.categoryScores.map((item) => ({
              categoryCode: item.categoryCode,
              categoryName: item.categoryName,
              score: item.score,
              minScore: item.minScore,
              passed: item.passed,
            })),
            overallPassed: lastResult.overallPassed,
          }
        : null,
      latestRecommendation: latestRecommendation
        ? {
            summary: latestRecommendation.summary,
            priorityTopic: latestRecommendation.items[0]?.topicTag ?? null,
          }
        : null,
      weakAreas:
        latestRecommendation?.items.slice(0, 3).map((item) => ({
          category: item.category,
          subCategory: item.subCategory,
          topicTag: item.topicTag,
          accuracy: item.accuracy === null ? null : Number(item.accuracy),
        })) ?? [],
      recentExams: recentResults.map((result) => ({
        examResultId: result.id,
        examSessionId: result.examSessionId,
        tryoutName: result.examSession.tryoutCatalog?.name ?? 'Tryout',
        examDate: result.examSession.startedAt,
        totalScore: result.totalScore,
        categoryScores: result.categoryScores.map((item) => ({
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          score: item.score,
        })),
        overallPassed: result.overallPassed,
      })),
    };
  }

  async listActiveQuestionCategories() {
    return this.prisma.questionCategory.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
      select: {
        id: true,
        code: true,
        name: true,
        answerMode: true,
        sortOrder: true,
      },
    });
  }

  async listAccessibleTryouts(actor: AuthenticatedUser) {
    const accessResolution = await this.accessResolverService.resolveEffectiveAccessLevel(actor.id);
    const tryouts = await this.prisma.tryoutCatalog.findMany({
      where: {
        status: 'published',
        isPublic: true,
        archivedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        tryoutType: true,
        isFeatured: true,
        durationMinutes: true,
        totalQuestions: true,
        showResultImmediately: true,
        showAnswerReview: true,
        publishedAt: true,
        requiredSubscriptionPlan: {
          select: {
            id: true,
            name: true,
            tier: true,
            isActive: true,
          },
        },
        generationRule: {
          select: {
            sections: {
              select: {
                questionCount: true,
                categoryRef: {
                  select: {
                    code: true,
                    name: true,
                  },
                },
              },
              orderBy: {
                sortOrder: 'asc',
              },
            },
          },
        },
      },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { publishedAt: 'desc' }],
    });

    return tryouts.map((tryout) => {
      const canStart = tryout.requiredSubscriptionPlan
        ? canAccessRequiredPlanTier(
            tryout.requiredSubscriptionPlan.tier,
            accessResolution.effectiveAccessLevel,
          )
        : false;

      const lockedReason = canStart
        ? null
        : tryout.requiredSubscriptionPlan
          ? `Butuh paket ${tryout.requiredSubscriptionPlan.name} atau tier yang lebih tinggi`
          : 'Tryout ini belum memiliki paket akses';

      const composition =
        tryout.generationRule?.sections.map((section) => ({
          categoryCode: section.categoryRef.code,
          categoryName: section.categoryRef.name,
          questionCount: section.questionCount,
        })) ?? [];
      const compositionLabel =
        composition.length > 0
          ? composition.map((item) => `${item.categoryCode}${item.questionCount}`).join(' ')
          : null;

      return {
        id: tryout.id,
        name: tryout.name,
        description: tryout.description,
        tryoutType: tryout.tryoutType,
        requiredSubscriptionPlan: tryout.requiredSubscriptionPlan,
        isFeatured: tryout.isFeatured,
        durationMinutes: tryout.durationMinutes,
        totalQuestions: tryout.totalQuestions,
        showResultImmediately: tryout.showResultImmediately,
        showAnswerReview: tryout.showAnswerReview,
        publishedAt: tryout.publishedAt,
        composition,
        compositionLabel,
        canStart,
        lockedReason,
      };
    });
  }

  async getAdminDashboardSummary(actor: AuthenticatedUser) {
    const [
      totalQuestions,
      activeQuestions,
      pendingParsedQuestions,
      draftTryouts,
      submittedReviewTryouts,
      failedPdfBatches,
      recentImportBatches,
      questionDistributionRows,
      recentActivity,
    ] = await Promise.all([
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
      this.prisma.questionCategory.findMany({
        where: {
          isActive: true,
        },
        select: {
          code: true,
          name: true,
          _count: {
            select: {
              questions: {
                where: {
                  status: QuestionStatus.active,
                  deletedAt: null,
                },
              },
            },
          },
        },
        orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
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
      questionDistribution: questionDistributionRows.map((row) => ({
        category: row.code,
        categoryName: row.name,
        activeCount: row._count.questions,
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

  async listUsersForMonitoring(rawQuery: unknown) {
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

    const usersWithAccess = await Promise.all(
      users.map(async (user) => ({
        user,
        accessResolution: await this.accessResolverService.resolveEffectiveAccessLevel(user.id),
      })),
    );

    const filtered = usersWithAccess.filter(({ user, accessResolution }) => {
      if (!query.subscriptionStatus) {
        return true;
      }

      if (
        query.subscriptionStatus === 'trial' ||
        query.subscriptionStatus === 'standard' ||
        query.subscriptionStatus === 'premium'
      ) {
        return accessResolution.effectiveAccessLevel === query.subscriptionStatus;
      }

      return this.deriveSubscriptionStatus(user.userSubscriptions[0] ?? null) === query.subscriptionStatus;
    });

    const skip = (query.page - 1) * query.limit;
    const items = filtered.slice(skip, skip + query.limit);
    const enrichedItems = items.map(({ user, accessResolution }) => ({
      id: user.id,
      fullName: user.name,
      email: user.email,
      image: user.image,
      status: user.status,
      subscriptionStatus: this.deriveSubscriptionStatus(user.userSubscriptions[0] ?? null),
      effectiveAccessLevel: accessResolution.effectiveAccessLevel,
      effectiveAccessSource: accessResolution.effectiveAccessSource,
      totalExams: user._count.examResults,
      lastActiveAt: user.lastLoginAt,
    }));

    return {
      data: enrichedItems,
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)),
      },
    };
  }

  async getUserDetailForAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userSubscriptions: {
          include: {
            subscriptionPlan: true,
          },
          orderBy: { endDate: 'desc' },
          take: 5,
        },
        accessOverrides: {
          include: {
            grantedByUser: {
              select: {
                id: true,
                name: true,
              },
            },
            revokedByUser: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
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
    const accessResolution = await this.accessResolverService.resolveEffectiveAccessLevel(user.id);
    const totalExams = user.examResults.length;
    const averageScore =
      totalExams === 0
        ? 0
        : Math.round(
            user.examResults.reduce((sum, result) => sum + result.totalScore, 0) / totalExams,
          );

    return {
      id: user.id,
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      effectiveAccessLevel: accessResolution.effectiveAccessLevel,
      effectiveAccessSource: accessResolution.effectiveAccessSource,
      subscription: latestSubscription
        ? {
            status: this.deriveSubscriptionStatus(latestSubscription),
            tier: getSubscriptionTierSnapshot(latestSubscription),
            planName: latestSubscription.subscriptionPlan.name,
            endDate: latestSubscription.endDate,
            tryoutUsed: latestSubscription.tryoutUsed,
            tryoutLimit: latestSubscription.tryoutLimit,
          }
        : null,
      accessOverrides: user.accessOverrides.map((override) => ({
        id: override.id,
        tier: override.tier,
        startsAt: override.startsAt,
        expiresAt: override.expiresAt,
        reason: override.reason,
        revokedAt: override.revokedAt,
        grantedBy: override.grantedByUser.name,
        revokedBy: override.revokedByUser?.name ?? null,
      })),
      examSummary: {
        totalExams,
        averageScore,
        lastExamAt: user.examResults[0]?.examSession.startedAt ?? null,
      },
    };
  }

  async createPlatformUser(rawBody: unknown, actor: AuthenticatedUser) {
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
        const responsePayload = (await authResponse.json()) as { message?: string };
        if (responsePayload.message) {
          message = responsePayload.message;
        }
      } catch {
        // keep default
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

  async updatePlatformUserStatus(
    userId: string,
    rawBody: unknown,
    actor: AuthenticatedUser,
  ) {
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

  async deletePlatformUser(userId: string, rawBody: unknown, actor: AuthenticatedUser) {
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

  async listTransactionsForMonitoring(rawQuery: unknown) {
    const query = this.validationService.validate(adminTransactionsQuerySchema, rawQuery);
    const where: Prisma.PaymentTransactionWhereInput = {
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

  async listAdmins(rawQuery: unknown) {
    const query = this.validationService.validate(adminAccountsQuerySchema, rawQuery);
    const where = {
      role: UserRole.ADMIN,
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' as const } },
              { email: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [totalItems, admins] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
    ]);

    return {
      data: admins.map((admin) => ({
        id: admin.id,
        fullName: admin.name,
        email: admin.email,
        image: admin.image,
        status: admin.status,
        lastLoginAt: admin.lastLoginAt,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async createAdmin(rawBody: unknown, actor: AuthenticatedUser) {
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
        const responsePayload = (await authResponse.json()) as { message?: string };
        if (responsePayload.message) {
          message = responsePayload.message;
        }
      } catch {
        // Ignore parsing error and keep default message.
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

  async deactivateAdmin(adminId: string, rawBody: unknown, actor: AuthenticatedUser) {
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

  async listSubscriptionPlansForAdmin() {
    const plans = await this.prisma.subscriptionPlan.findMany({
      orderBy: [
        { isTrial: 'desc' },
        { tier: 'asc' },
        { price: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      tier: plan.tier,
      durationDays: plan.durationDays,
      price: Number(plan.price),
      currency: plan.currency,
      isActive: plan.isActive,
      isTrial: plan.isTrial,
      trialTryoutLimit: plan.trialTryoutLimit,
      trialDayLimit: plan.trialDayLimit,
      features: plan.features,
      isPopular: plan.isPopular,
      showOnLandingPage: plan.showOnLandingPage,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    }));
  }

  async createSubscriptionPlan(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createSubscriptionPlanSchema, rawBody);
    this.assertPlanTierRules({
      name: payload.name,
      description: payload.description,
      tier: payload.tier,
      durationDays: payload.durationDays,
      price: payload.price,
      currency: payload.currency,
      isActive: payload.isActive,
      trialTryoutLimit: payload.trialTryoutLimit,
      trialDayLimit: payload.trialDayLimit,
    });

    const created = await this.prisma.subscriptionPlan.create({
      data: {
        name: payload.name,
        description: payload.description ?? null,
        tier: payload.tier,
        durationDays: payload.durationDays,
        price: payload.price,
        currency: payload.currency,
        isActive: payload.isActive,
        features: payload.features ?? [],
        isPopular: payload.isPopular ?? false,
        showOnLandingPage: payload.showOnLandingPage ?? false,
        isTrial: payload.tier === SubscriptionTier.trial,
        trialTryoutLimit:
          payload.tier === SubscriptionTier.trial ? payload.trialTryoutLimit ?? 0 : null,
        trialDayLimit: payload.tier === SubscriptionTier.trial ? payload.trialDayLimit ?? null : null,
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

  async updateSubscriptionPlan(planId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateSubscriptionPlanSchema, rawBody);
    const existing = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!existing) {
      throw new NotFoundException('Subscription plan tidak ditemukan');
    }

    this.assertPlanTierRules({
      name: payload.name ?? existing.name,
      description: payload.description ?? existing.description,
      tier: payload.tier ?? existing.tier,
      durationDays: payload.durationDays ?? existing.durationDays,
      price: payload.price ?? Number(existing.price),
      currency: payload.currency ?? existing.currency,
      isActive: payload.isActive ?? existing.isActive,
      trialTryoutLimit:
        payload.trialTryoutLimit !== undefined ? payload.trialTryoutLimit : existing.trialTryoutLimit,
      trialDayLimit: payload.trialDayLimit !== undefined ? payload.trialDayLimit : existing.trialDayLimit,
    });

    await this.prisma.subscriptionPlan.update({
      where: { id: planId },
      data: {
        ...(payload.name !== undefined ? { name: payload.name } : {}),
        ...(payload.description !== undefined ? { description: payload.description } : {}),
        ...(payload.tier !== undefined ? { tier: payload.tier } : {}),
        ...(payload.durationDays !== undefined ? { durationDays: payload.durationDays } : {}),
        ...(payload.price !== undefined ? { price: payload.price } : {}),
        ...(payload.currency !== undefined ? { currency: payload.currency } : {}),
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
        ...(payload.features !== undefined ? { features: payload.features } : {}),
        ...(payload.isPopular !== undefined ? { isPopular: payload.isPopular } : {}),
        ...(payload.showOnLandingPage !== undefined ? { showOnLandingPage: payload.showOnLandingPage } : {}),
        ...(payload.tier !== undefined ? { isTrial: payload.tier === SubscriptionTier.trial } : {}),
        ...(payload.tier === SubscriptionTier.trial || (payload.tier === undefined && existing.tier === SubscriptionTier.trial)
          ? {
              ...(payload.trialTryoutLimit !== undefined
                ? { trialTryoutLimit: payload.trialTryoutLimit }
                : {}),
              ...(payload.trialDayLimit !== undefined ? { trialDayLimit: payload.trialDayLimit } : {}),
            }
          : {
              trialTryoutLimit: null,
              trialDayLimit: null,
            }),
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
      include: {
        items: {
          include: {
            categoryRef: {
              select: {
                code: true,
                name: true,
              },
            },
          },
          orderBy: {
            categoryRef: {
              sortOrder: 'asc',
            },
          },
        },
      },
    });

    if (!config) {
      throw new NotFoundException('Passing grade config tidak ditemukan');
    }

    return {
      id: config.id,
      name: config.name,
      totalMinScore: config.totalMinScore,
      isActive: config.isActive,
      effectiveFrom: config.effectiveFrom,
      categoryMinimums: config.items.map((item) => ({
        categoryCode: item.categoryRef.code,
        categoryName: item.categoryRef.name,
        minScore: item.minScore,
      })),
    };
  }

  async updatePassingGrade(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updatePassingGradeSchema, rawBody);
    const categories = await this.prisma.questionCategory.findMany({
      where: {
        code: {
          in: payload.categoryMinimums.map((item) => item.categoryCode),
        },
      },
      select: {
        id: true,
        code: true,
      },
    });
    const categoryIdByCode = new Map(categories.map((item) => [item.code, item.id]));
    const missingCategoryCodes = payload.categoryMinimums
      .map((item) => item.categoryCode)
      .filter((code) => !categoryIdByCode.has(code));

    if (missingCategoryCodes.length > 0) {
      throw new NotFoundException(
        `Kategori tidak ditemukan: ${missingCategoryCodes.join(', ')}`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.passingGradeConfig.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      await tx.passingGradeConfig.create({
        data: {
          name: payload.name,
          totalMinScore: payload.totalMinScore,
          effectiveFrom: new Date(payload.effectiveFrom),
          isActive: true,
          items: {
            create: payload.categoryMinimums.map((item) => ({
              categoryId: categoryIdByCode.get(item.categoryCode)!,
              minScore: item.minScore,
            })),
          },
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

  async updateTrialConfig(rawBody: unknown, actor: AuthenticatedUser) {
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
    ] as const;

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

    const settingsMap = new Map(
      settings.map((setting: (typeof settings)[number]) => [setting.key, setting] as const),
    );
    const lastUpdatedAt = settings.reduce<Date | null>(
      (latest: Date | null, setting: (typeof settings)[number]) =>
        latest && latest > setting.updatedAt ? latest : setting.updatedAt,
      null,
    );

    const totalAiJobsToday = todayAiStats.reduce(
      (
        sum: number,
        item: { status: AIRecommendationStatus; _count: { _all: number } },
      ) => sum + item._count._all,
      0,
    );
    const successfulAiJobsToday = todayAiStats
      .filter(
        (item: { status: AIRecommendationStatus; _count: { _all: number } }) =>
          item.status === 'completed' || item.status === 'fallback',
      )
      .reduce(
        (
          sum: number,
          item: { status: AIRecommendationStatus; _count: { _all: number } },
        ) => sum + item._count._all,
        0,
      );
    const failedAiJobsToday = todayAiStats
      .filter(
        (item: { status: AIRecommendationStatus; _count: { _all: number } }) =>
          item.status === 'failed',
      )
      .reduce(
        (
          sum: number,
          item: { status: AIRecommendationStatus; _count: { _all: number } },
        ) => sum + item._count._all,
        0,
      );

    const getValue = <T>(key: string, fallback: T): T => {
      const setting = settingsMap.get(key);
      return setting ? (setting.value as T) : fallback;
    };

    return {
      enabled: getValue('ai.recommendation.enabled', true),
      fallbackEnabled: getValue('ai.recommendation.fallback_enabled', true),
      providerName: getValue('ai.recommendation.provider_name', 'OpenAI GPT-4o-mini via n8n'),
      timeoutSeconds: getValue('ai.recommendation.timeout_seconds', 60),
      weakAreaAccuracyThreshold: getValue(
        'ai.recommendation.weak_area_accuracy_threshold',
        60,
      ),
      minimumQuestionsPerTopic: getValue(
        'ai.recommendation.minimum_questions_per_topic',
        5,
      ),
      maxWeakAreas: getValue('ai.recommendation.max_weak_areas', 5),
      priorityScoreFormula: getValue(
        'ai.recommendation.priority_score_formula',
        '(1 - accuracy) * 0.6 + (question_count_weight) * 0.4',
      ),
      showSummary: getValue('ai.recommendation.show_summary', true),
      showWeakAreas: getValue('ai.recommendation.show_weak_areas', true),
      showNextTryoutStrategy: getValue(
        'ai.recommendation.show_next_tryout_strategy',
        true,
      ),
      enableResultPageBanner: getValue(
        'ai.recommendation.enable_result_page_banner',
        true,
      ),
      errorNotification: getValue('ai.recommendation.error_notification', true),
      retryFailedJob: getValue('ai.recommendation.retry_failed_job', true),
      logLevel: getValue('ai.recommendation.log_level', 'info'),
      status: process.env.N8N_WEBHOOK_URL ? 'active' : 'degraded',
      n8nConnected: Boolean(process.env.N8N_WEBHOOK_URL),
      lastUpdatedAt,
      aiJobsToday: totalAiJobsToday,
      failedAiJobsToday,
      successRateToday:
        totalAiJobsToday === 0
          ? 100
          : Number(((successfulAiJobsToday / totalAiJobsToday) * 100).toFixed(1)),
    };
  }

  async updateAiRecommendationSettings(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(
      updateAiRecommendationSettingsSchema,
      rawBody,
    );

    await this.prisma.$transaction(
      Object.entries({
        'ai.recommendation.enabled': payload.enabled,
        'ai.recommendation.fallback_enabled': payload.fallbackEnabled,
        'ai.recommendation.provider_name': payload.providerName,
        'ai.recommendation.timeout_seconds': payload.timeoutSeconds,
        'ai.recommendation.weak_area_accuracy_threshold':
          payload.weakAreaAccuracyThreshold,
        'ai.recommendation.minimum_questions_per_topic':
          payload.minimumQuestionsPerTopic,
        'ai.recommendation.max_weak_areas': payload.maxWeakAreas,
        'ai.recommendation.priority_score_formula': payload.priorityScoreFormula,
        'ai.recommendation.show_summary': payload.showSummary,
        'ai.recommendation.show_weak_areas': payload.showWeakAreas,
        'ai.recommendation.show_next_tryout_strategy': payload.showNextTryoutStrategy,
        'ai.recommendation.enable_result_page_banner':
          payload.enableResultPageBanner,
        'ai.recommendation.error_notification': payload.errorNotification,
        'ai.recommendation.retry_failed_job': payload.retryFailedJob,
        'ai.recommendation.log_level': payload.logLevel,
      }).map(([key, value]) =>
        this.prisma.systemSetting.upsert({
          where: { key },
          create: {
            key,
            value,
          },
          update: {
            value,
          },
        }),
      ),
    );

    await this.createAuditLog({
      actor,
      action: 'UPDATE_AI_RECOMMENDATION_SETTINGS',
      module: 'configuration',
      targetType: 'system_setting',
      metadata: payload,
    });
  }

  async manualSubscriptionActivation(rawBody: unknown, actor: AuthenticatedUser) {
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

    if (plan.tier === SubscriptionTier.trial || plan.isTrial) {
      throw new ConflictException('Trial plan tidak dapat digunakan untuk manual activation');
    }

    const now = new Date();
    const subscription = await this.prisma.$transaction(async (tx) => {
      const activePaidSubscription = await tx.userSubscription.findFirst({
        where: {
          userId: payload.userId,
          status: SubscriptionStatus.active,
          endDate: {
            gt: now,
          },
          tierSnapshot: {
            in: [SubscriptionTier.standard, SubscriptionTier.premium],
          },
        },
        orderBy: [{ tierSnapshot: 'desc' }, { endDate: 'desc' }],
      });

      if (activePaidSubscription) {
        if (
          activePaidSubscription.tierSnapshot === SubscriptionTier.premium &&
          plan.tier === SubscriptionTier.standard
        ) {
          throw new ConflictException('Tidak bisa menurunkan akses ke standard saat premium masih aktif');
        }

        if (activePaidSubscription.tierSnapshot === plan.tier) {
          return tx.userSubscription.update({
            where: { id: activePaidSubscription.id },
            data: {
              endDate: new Date(
                activePaidSubscription.endDate.getTime() +
                  payload.durationDays * 24 * 60 * 60 * 1000,
              ),
            },
          });
        }

        await tx.userSubscription.update({
          where: { id: activePaidSubscription.id },
          data: {
            status: SubscriptionStatus.cancelled,
            endDate: now,
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
          tierSnapshot: plan.tier,
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

  async grantUserAccessOverride(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createUserAccessOverrideSchema, rawBody);
    const [user] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: payload.userId },
      }),
    ]);

    if (!user || user.deletedAt !== null || user.role !== UserRole.USER) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const startsAt = new Date(payload.startsAt);
    const expiresAt = new Date(payload.expiresAt);

    if (expiresAt <= startsAt) {
      throw new ConflictException('Masa berlaku override harus setelah waktu mulai');
    }

    const created = await this.prisma.userAccessOverride.create({
      data: {
        userId: payload.userId,
        tier: payload.tier,
        startsAt,
        expiresAt,
        reason: payload.reason,
        grantedBy: actor.id,
      },
    });

    await this.createAuditLog({
      actor,
      action: 'GRANT_USER_ACCESS_OVERRIDE',
      module: 'subscription',
      targetType: 'user_access_override',
      targetId: created.id,
      metadata: payload,
    });

    return {
      id: created.id,
      tier: created.tier,
      expiresAt: created.expiresAt,
    };
  }

  async listUserAccessOverrides(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, deletedAt: true },
    });

    if (!user || user.deletedAt !== null || user.role !== UserRole.USER) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const overrides = await this.prisma.userAccessOverride.findMany({
      where: { userId },
      include: {
        grantedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
        revokedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return overrides.map((override) => ({
      id: override.id,
      tier: override.tier,
      startsAt: override.startsAt,
      expiresAt: override.expiresAt,
      reason: override.reason,
      revokedAt: override.revokedAt,
      grantedBy: override.grantedByUser.name,
      revokedBy: override.revokedByUser?.name ?? null,
      createdAt: override.createdAt,
    }));
  }

  async revokeUserAccessOverride(overrideId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(revokeUserAccessOverrideSchema, rawBody);
    const existing = await this.prisma.userAccessOverride.findUnique({
      where: { id: overrideId },
    });

    if (!existing) {
      throw new NotFoundException('Access override tidak ditemukan');
    }

    if (existing.revokedAt) {
      return {
        id: existing.id,
        revokedAt: existing.revokedAt,
      };
    }

    const revoked = await this.prisma.userAccessOverride.update({
      where: { id: overrideId },
      data: {
        revokedAt: new Date(),
        revokedBy: actor.id,
      },
    });

    await this.createAuditLog({
      actor,
      action: 'REVOKE_USER_ACCESS_OVERRIDE',
      module: 'subscription',
      targetType: 'user_access_override',
      targetId: overrideId,
      metadata: {
        reason: payload.reason ?? null,
      },
    });

    return {
      id: revoked.id,
      revokedAt: revoked.revokedAt,
    };
  }

  async getAuditLogs(rawQuery: unknown) {
    const query = this.validationService.validate(auditLogsQuerySchema, rawQuery);
    const createdAtFilter = this.resolveAuditLogCreatedAtFilter(query);
    const where: Prisma.AuditLogWhereInput = {
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

  async getAdminSelfAuditLogs(actor: AuthenticatedUser, rawQuery: unknown) {
    const query = this.validationService.validate(auditLogsQuerySchema, rawQuery);
    const createdAtFilter = this.resolveAuditLogCreatedAtFilter(query);
    const where: Prisma.AuditLogWhereInput = {
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

  private deriveSubscriptionStatus(
    subscription:
      | {
          isTrial: boolean;
          status: SubscriptionStatus;
          endDate: Date;
          tryoutLimit?: number | null;
          tryoutUsed?: number;
        }
      | null,
  ) {
    if (!subscription) {
      return 'expired';
    }

    if (
      subscription.isTrial &&
      subscription.status === SubscriptionStatus.active &&
      subscription.endDate > new Date() &&
      (subscription.tryoutLimit === null ||
        subscription.tryoutLimit === undefined ||
        (subscription.tryoutUsed ?? 0) < subscription.tryoutLimit)
    ) {
      return 'trial';
    }

    if (subscription.status === SubscriptionStatus.active && subscription.endDate > new Date()) {
      return 'active';
    }

    return 'expired';
  }

  private assertPlanTierRules(payload: {
    name: string;
    description?: string | null;
    tier: SubscriptionTier;
    durationDays?: number;
    price: number;
    currency?: string;
    isActive?: boolean;
    trialTryoutLimit?: number | null;
    trialDayLimit?: number | null;
  }) {
    if (payload.tier === SubscriptionTier.trial) {
      if (payload.price !== 0) {
        throw new ConflictException('Trial plan wajib memiliki harga 0');
      }

      if (payload.trialTryoutLimit === undefined || payload.trialTryoutLimit === null) {
        throw new ConflictException('Trial plan wajib memiliki trialTryoutLimit');
      }

      if (payload.trialDayLimit === undefined || payload.trialDayLimit === null) {
        throw new ConflictException('Trial plan wajib memiliki trialDayLimit');
      }

      return;
    }

    if (payload.trialTryoutLimit !== null && payload.trialTryoutLimit !== undefined) {
      throw new ConflictException('Plan standard atau premium tidak boleh memiliki trialTryoutLimit');
    }

    if (payload.trialDayLimit !== null && payload.trialDayLimit !== undefined) {
      throw new ConflictException('Plan standard atau premium tidak boleh memiliki trialDayLimit');
    }
  }

  private resolveAuditLogCreatedAtFilter(query: {
    dateFrom?: string;
    dateTo?: string;
    period?: 'today' | '7d' | '30d' | 'this_month';
  }) {
    if (query.dateFrom || query.dateTo) {
      return {
        ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
        ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
      } satisfies Prisma.DateTimeFilter;
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
        } satisfies Prisma.DateTimeFilter;
      case '7d':
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        return {
          gte: start,
          lte: now,
        } satisfies Prisma.DateTimeFilter;
      case '30d':
        start.setDate(start.getDate() - 29);
        start.setHours(0, 0, 0, 0);
        return {
          gte: start,
          lte: now,
        } satisfies Prisma.DateTimeFilter;
      case 'this_month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        return {
          gte: start,
          lte: now,
        } satisfies Prisma.DateTimeFilter;
      default:
        return undefined;
    }
  }

  private async createAuditLog(params: {
    actor: AuthenticatedUser;
    action: string;
    module: string;
    targetType?: string;
    targetId?: string;
    metadata?: unknown;
  }) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId: params.actor.id,
        actorRole: params.actor.role ?? UserRole.SUPER_ADMIN,
        action: params.action,
        module: params.module,
        targetType: params.targetType,
        targetId: params.targetId,
        metadata: params.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  private getFrontendUrl() {
    return process.env.FRONTEND_URL ?? 'http://localhost:3000';
  }

  private async sendSetPasswordLink(email: string) {
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
        const responsePayload = (await authResponse.json()) as { message?: string };
        if (responsePayload.message) {
          message = responsePayload.message;
        }
      } catch {
        // keep default
      }

      throw new InternalServerErrorException(message);
    }
  }

  private toInternalAuthHeaders() {
    const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
    const url = new URL(appUrl);
    return new Headers({
      origin: appUrl,
      host: url.host,
      'content-type': 'application/json',
    });
  }

  private generateTemporaryPassword() {
    return `Adm!${randomBytes(8).toString('base64url')}`;
  }
}
