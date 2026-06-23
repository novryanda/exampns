import { Injectable, NotFoundException, BadRequestException, Logger, ForbiddenException } from '@nestjs/common';
import { AccessResolverService } from '../common/access-resolver.service.js';
import { canAccessRequiredPlanTier } from '../common/access-control.helpers.js';
import { PrismaService } from '../common/prisma.service.js';
import {
  MaterialStatus,
  ModuleType,
  SubscriptionTier,
  type Prisma,
} from '../../generated/prisma/client.js';

@Injectable()
export class LearningMaterialService {
  private readonly logger = new Logger(LearningMaterialService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly accessResolverService: AccessResolverService,
  ) {}

  // ─── Admin: Material CRUD ──────────────────────────────────────────────────

  async listMaterials(filters?: { status?: MaterialStatus; categoryId?: string }) {
    const where: Prisma.MaterialWhereInput = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.categoryId) where.categoryId = filters.categoryId;

    return this.prisma.material.findMany({
      where,
      include: {
        categoryRef: { select: { id: true, code: true, name: true } },
        createdByUser: { select: { id: true, name: true } },
        requiredSubscriptionPlan: { select: { id: true, name: true, tier: true, isActive: true } },
        _count: { select: { modules: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getMaterialById(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        categoryRef: { select: { id: true, code: true, name: true } },
        createdByUser: { select: { id: true, name: true } },
        requiredSubscriptionPlan: { select: { id: true, name: true, tier: true, isActive: true } },
        modules: {
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: { select: { quizQuestions: true, manualQuestions: true } },
          },
        },
      },
    });

    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  async createMaterial(data: {
    title: string;
    description?: string;
    coverImageUrl?: string;
    categoryId: string;
    requiredSubscriptionPlanId?: string;
    sortOrder?: number;
    certificateTemplateId?: string | null;
    certificatePassingGrade?: number | null;
    createdBy: string;
  }) {
    const requiredSubscriptionPlan = await this.ensureSubscriptionPlanExists(data.requiredSubscriptionPlanId);

    return this.prisma.material.create({
      data: {
        title: data.title,
        description: data.description,
        coverImageUrl: data.coverImageUrl,
        categoryId: data.categoryId,
        requiredTier: requiredSubscriptionPlan?.tier ?? SubscriptionTier.trial,
        requiredSubscriptionPlanId: data.requiredSubscriptionPlanId ?? null,
        sortOrder: data.sortOrder,
        certificateTemplateId: data.certificateTemplateId ?? null,
        certificatePassingGrade: data.certificatePassingGrade ?? null,
        createdBy: data.createdBy,
      },
    });
  }

  async updateMaterial(
    id: string,
    data: {
      title?: string;
      description?: string;
      coverImageUrl?: string;
      categoryId?: string;
      requiredSubscriptionPlanId?: string;
      sortOrder?: number;
      certificateTemplateId?: string | null;
      certificatePassingGrade?: number | null;
    },
  ) {
    await this.assertMaterialExists(id);
    const requiredSubscriptionPlan =
      data.requiredSubscriptionPlanId !== undefined
        ? await this.ensureSubscriptionPlanExists(data.requiredSubscriptionPlanId)
        : null;

    return this.prisma.material.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        coverImageUrl: data.coverImageUrl,
        categoryId: data.categoryId,
        ...(data.requiredSubscriptionPlanId !== undefined
          ? {
              requiredSubscriptionPlanId: data.requiredSubscriptionPlanId || null,
              requiredTier: requiredSubscriptionPlan?.tier ?? SubscriptionTier.trial,
            }
          : {}),
        sortOrder: data.sortOrder,
        certificateTemplateId: data.certificateTemplateId !== undefined ? (data.certificateTemplateId || null) : undefined,
        certificatePassingGrade: data.certificatePassingGrade !== undefined ? (data.certificatePassingGrade || null) : undefined,
      },
    });
  }

  async publishMaterial(id: string) {
    const material = await this.assertMaterialExists(id);
    if (material.status === MaterialStatus.published) {
      throw new BadRequestException('Material is already published');
    }

    const moduleCount = await this.prisma.materialModule.count({ where: { materialId: id } });
    if (moduleCount === 0) {
      throw new BadRequestException('Cannot publish material without modules');
    }

    if (!material.requiredSubscriptionPlanId) {
      throw new BadRequestException('Cannot publish material without required subscription plan');
    }

    return this.prisma.material.update({
      where: { id },
      data: { status: MaterialStatus.published, publishedAt: new Date() },
    });
  }

  async archiveMaterial(id: string) {
    await this.assertMaterialExists(id);
    return this.prisma.material.update({
      where: { id },
      data: { status: MaterialStatus.archived, archivedAt: new Date() },
    });
  }

  async deleteMaterial(id: string) {
    await this.assertMaterialExists(id);
    return this.prisma.material.delete({ where: { id } });
  }

  // ─── Admin: Module CRUD ────────────────────────────────────────────────────

  async createModule(
    materialId: string,
    data: {
      title: string;
      description?: string;
      moduleType: ModuleType;
      content?: string;
      videoUrl?: string;
      pdfUrl?: string;
      durationMinutes?: number;
      manualQuestions?: Array<{
        questionText: string;
        options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
      }>;
    },
  ) {
    await this.assertMaterialExists(materialId);

    const maxOrder = await this.prisma.materialModule.aggregate({
      where: { materialId },
      _max: { sortOrder: true },
    });

    const { manualQuestions, ...rest } = data;

    const newModule = await this.prisma.materialModule.create({
      data: {
        ...rest,
        materialId,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    if (newModule.moduleType === ModuleType.quiz && manualQuestions && manualQuestions.length > 0) {
      await this.setManualQuizQuestions(newModule.id, manualQuestions);
    }

    return newModule;
  }

  async updateModule(
    moduleId: string,
    data: {
      title?: string;
      description?: string;
      moduleType?: ModuleType;
      content?: string;
      videoUrl?: string;
      pdfUrl?: string;
      durationMinutes?: number;
      manualQuestions?: Array<{
        questionText: string;
        options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
      }>;
    },
  ) {
    await this.assertModuleExists(moduleId);
    const { manualQuestions, ...rest } = data;
    
    const updated = await this.prisma.materialModule.update({ where: { id: moduleId }, data: rest });

    if (updated.moduleType === ModuleType.quiz && manualQuestions !== undefined) {
      await this.setManualQuizQuestions(moduleId, manualQuestions);
    }

    return updated;
  }

  async deleteModule(moduleId: string) {
    await this.assertModuleExists(moduleId);
    return this.prisma.materialModule.delete({ where: { id: moduleId } });
  }

  async reorderModules(materialId: string, moduleIds: string[]) {
    await this.assertMaterialExists(materialId);

    // Two-phase update inside an interactive transaction to avoid the unique
    // constraint on (materialId, sortOrder). Using a large offset in phase 1
    // ensures temporary values never collide with the final sequential indexes
    // set in phase 2.
    const offset = 1_000_000;

    await this.prisma.$transaction(async (tx) => {
      // Phase 1 – assign temporary unique high-offset values so existing rows
      // are safely out of the way before we rewrite them.
      for (let i = 0; i < moduleIds.length; i++) {
        await tx.materialModule.update({
          where: { id: moduleIds[i] },
          data: { sortOrder: offset + i },
        });
      }

      // Phase 2 – assign the final 0-based sequential sort orders.
      for (let i = 0; i < moduleIds.length; i++) {
        await tx.materialModule.update({
          where: { id: moduleIds[i] },
          data: { sortOrder: i },
        });
      }
    });

    return { success: true };
  }

  // ─── Admin: Quiz Question Management ───────────────────────────────────────

  async setQuizQuestions(moduleId: string, questionIds: string[]) {
    const module = await this.assertModuleExists(moduleId);
    if (module.moduleType !== ModuleType.quiz) {
      throw new BadRequestException('Module is not a quiz type');
    }

    await this.prisma.materialModuleQuiz.deleteMany({ where: { moduleId } });

    if (questionIds.length > 0) {
      await this.prisma.materialModuleQuiz.createMany({
        data: questionIds.map((questionId, index) => ({
          moduleId,
          questionId,
          questionOrder: index,
        })),
      });
    }

    return { success: true, count: questionIds.length };
  }

  async setManualQuizQuestions(
    moduleId: string, 
    questions: Array<{
      questionText: string;
      options: Array<{ label: string; optionText: string; isCorrect: boolean }>;
    }>
  ) {
    const module = await this.assertModuleExists(moduleId);
    if (module.moduleType !== ModuleType.quiz) {
      throw new BadRequestException('Module is not a quiz type');
    }

    // Replace all existing manual questions for this module
    return this.prisma.$transaction(async (tx) => {
      await tx.materialModuleManualQuestion.deleteMany({ where: { moduleId } });
      
      let count = 0;
      for (const [index, q] of questions.entries()) {
        await tx.materialModuleManualQuestion.create({
          data: {
            moduleId,
            questionText: q.questionText,
            questionOrder: index,
            options: {
              create: q.options.map((opt, optIndex) => ({
                label: opt.label,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
                displayOrder: optIndex,
              })),
            },
          },
        });
        count++;
      }
      return { success: true, count };
    });
  }

  // ─── User: List accessible materials ───────────────────────────────────────

  async listPublishedMaterials(userId: string) {
    const accessResolution = await this.accessResolverService.resolveEffectiveAccessLevel(userId);
    const materials = await this.prisma.material.findMany({
      where: { status: MaterialStatus.published },
      include: {
        categoryRef: { select: { id: true, code: true, name: true } },
        requiredSubscriptionPlan: { select: { id: true, name: true, tier: true, isActive: true } },
        _count: { select: { modules: true } },
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return materials.map((m) => ({
      ...m,
      isAccessible: m.requiredSubscriptionPlan
        ? canAccessRequiredPlanTier(
            m.requiredSubscriptionPlan.tier,
            accessResolution.effectiveAccessLevel,
          )
        : false,
    }));
  }

  // ─── User: Material detail with progress ───────────────────────────────────

  async getMaterialWithProgress(materialId: string, userId: string) {
    const material = await this.prisma.material.findUnique({
      where: { id: materialId, status: MaterialStatus.published },
      include: {
        categoryRef: { select: { id: true, code: true, name: true } },
        requiredSubscriptionPlan: { select: { id: true, name: true, tier: true, isActive: true } },
        modules: {
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: { select: { quizQuestions: true, manualQuestions: true } },
          },
        },
      },
    });

    if (!material) throw new NotFoundException('Material not found');
    await this.assertUserCanAccessMaterial(userId, material);

    const progress = await this.prisma.userMaterialProgress.findMany({
      where: { userId, materialId },
      select: { moduleId: true, completedAt: true, quizScore: true },
    });

    const completedModuleIds = new Set(progress.filter(p => p.completedAt !== null).map((p) => p.moduleId));
    const progressMap = new Map(progress.map((p) => [p.moduleId, p]));

    const modulesWithProgress = material.modules.map((mod) => ({
      ...mod,
      isCompleted: completedModuleIds.has(mod.id),
      quizScore: progressMap.get(mod.id)?.quizScore ?? null,
      completedAt: progressMap.get(mod.id)?.completedAt ?? null,
    }));

    return {
      ...material,
      modules: modulesWithProgress,
      totalModules: material.modules.length,
      completedModules: completedModuleIds.size,
      progressPercent:
        material.modules.length > 0
          ? Math.round((completedModuleIds.size / material.modules.length) * 100)
          : 0,
    };
  }

  // ─── User: Get module content ──────────────────────────────────────────────

  async getModuleContent(moduleId: string, userId?: string) {
    const module = await this.prisma.materialModule.findUnique({
      where: { id: moduleId },
      include: {
        material: {
          include: {
            requiredSubscriptionPlan: { select: { id: true, name: true, tier: true, isActive: true } },
          },
        },
        quizQuestions: {
          orderBy: { questionOrder: 'asc' },
          include: {
            question: {
              include: {
                options: { orderBy: { displayOrder: 'asc' } },
                categoryRef: { select: { code: true, name: true } },
              },
            },
          },
        },
        manualQuestions: {
          orderBy: { questionOrder: 'asc' },
          include: {
            options: { orderBy: { displayOrder: 'asc' } },
          },
        },
      },
    });

    if (!module) throw new NotFoundException('Module not found');
    if (userId) {
      await this.assertUserCanAccessMaterial(userId, module.material);
    }
    return module;
  }

  async markModuleComplete(userId: string, materialId: string, moduleId: string, quizScore?: number) {
    await this.assertModuleExists(moduleId);

    const material = await this.prisma.material.findUnique({
      where: { id: materialId },
      include: {
        modules: true,
        certificateTemplate: true
      }
    });

    let isCompleted = true;
    if (quizScore !== undefined && material?.certificatePassingGrade !== null && material?.certificatePassingGrade !== undefined) {
      if (quizScore < material.certificatePassingGrade) {
        isCompleted = false;
      }
    }

    const progress = await this.prisma.userMaterialProgress.upsert({
      where: { userId_moduleId: { userId, moduleId } },
      create: { 
        userId, 
        materialId, 
        moduleId, 
        quizScore,
        completedAt: isCompleted ? new Date() : null
      },
      update: { 
        quizScore, 
        completedAt: isCompleted ? new Date() : null
      },
    });
    
    let certificateIssued = false;

    // Check if material is fully completed and issue certificate

    if (material && material.certificateTemplateId) {
      const allProgress = await this.prisma.userMaterialProgress.findMany({
        where: { userId, materialId }
      });
      const completedModuleIds = new Set(allProgress.filter(p => p.completedAt !== null).map(p => p.moduleId));
      const allModulesCompleted = material.modules.every(m => completedModuleIds.has(m.id));

      if (allModulesCompleted) {
        let meetsPassingGrade = true;

        if (material.certificatePassingGrade !== null) {
          const quizModulesProgress = allProgress.filter((p) => p.quizScore !== null);
          if (quizModulesProgress.length > 0) {
            // Option C: Setiap kuis wajib mencapai >= Passing Grade secara mandiri
            const hasFailedQuiz = quizModulesProgress.some(
              (p) => (p.quizScore || 0) < material.certificatePassingGrade!
            );
            if (hasFailedQuiz) {
              meetsPassingGrade = false;
            }
          } else {
            // If there are no quizzes, how can they pass a passing grade? We assume they pass.
          }
        }

        if (meetsPassingGrade) {
          // Issue certificate if not already issued
          const existingCert = await this.prisma.userCertificate.findUnique({
            where: { userId_materialId: { userId, materialId } }
          });

          if (!existingCert) {
            await this.prisma.userCertificate.create({
              data: {
                userId,
                materialId,
                templateId: material.certificateTemplateId
              }
            });
            certificateIssued = true;
          }
        }
      }
    }

    return { progress, certificateIssued };
  }

  // ─── User: Certificates ────────────────────────────────────────────────────

  async getUserCertificates(userId: string) {
    return this.prisma.userCertificate.findMany({
      where: { userId },
      include: {
        material: {
          select: { title: true, coverImageUrl: true }
        },
        template: {
          select: { name: true, dataJson: true, canvasDimsJson: true, displayScale: true }
        }
      },
      orderBy: { issuedAt: 'desc' }
    });
  }

  // ─── Admin User Certificates ───────────────────────────────────────────────

  async getAdminUserCertificates() {
    return this.prisma.userCertificate.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        material: { select: { id: true, title: true } },
        template: { select: { id: true, name: true } },
      },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async deleteUserCertificate(id: string) {
    const cert = await this.prisma.userCertificate.findUnique({ where: { id } });
    if (!cert) throw new NotFoundException('User certificate not found');

    return this.prisma.userCertificate.delete({
      where: { id },
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private async assertMaterialExists(id: string) {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  private async ensureSubscriptionPlanExists(requiredSubscriptionPlanId?: string) {
    if (!requiredSubscriptionPlanId) {
      return null;
    }

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: requiredSubscriptionPlanId },
      select: {
        id: true,
        name: true,
        tier: true,
        isActive: true,
      },
    });

    if (!plan) {
      throw new BadRequestException('Subscription plan akses materi tidak ditemukan');
    }

    return plan;
  }

  private async assertUserCanAccessMaterial(
    userId: string,
    material: {
      requiredSubscriptionPlan: {
        id: string;
        name: string;
        tier: SubscriptionTier;
        isActive: boolean;
      } | null;
    },
  ) {
    if (!material.requiredSubscriptionPlan) {
      throw new ForbiddenException('Materi ini belum memiliki subscription plan akses.');
    }

    const accessResolution = await this.accessResolverService.resolveEffectiveAccessLevel(userId);
    const canAccess = canAccessRequiredPlanTier(
      material.requiredSubscriptionPlan.tier,
      accessResolution.effectiveAccessLevel,
    );

    if (!canAccess) {
      throw new ForbiddenException(
        `Materi ini membutuhkan paket ${material.requiredSubscriptionPlan.name} atau tier yang lebih tinggi.`,
      );
    }
  }

  private async assertModuleExists(id: string) {
    const module = await this.prisma.materialModule.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async deleteModuleManualQuestion(materialId: string, moduleId: string, questionId: string) {
    return this.prisma.manualQuestionSet.delete({
      where: { id: questionId }
    });
  }
}
