import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import {
  ActivationSource,
  PartnerLedgerEntryType,
  PartnerStatus,
  PartnerWithdrawalStatus,
  ReferralValueType,
  SubscriptionStatus,
  UserRole,
  UserStatus,
  type Prisma,
} from '../../generated/prisma/client.js';
import { auth } from '../auth/auth.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  calculateReferralQuote,
  normalizeReferralCode,
} from './partner.helpers.js';
import {
  approveWithdrawalSchema,
  createPartnerSchema,
  createWithdrawalSchema,
  partnerBankAccountSchema,
  partnerListQuerySchema,
  partnerTransactionsQuerySchema,
  referralCodeSchema,
  referralPreviewSchema,
  rejectWithdrawalSchema,
  superAdminWithdrawalListQuerySchema,
  updatePartnerSchema,
  updateReferralCodeSchema,
  withdrawalListQuerySchema,
} from './partner.schemas.js';
import {
  saveWithdrawalProofFile,
  type UploadedWithdrawalProofFile,
} from './partner-withdrawal.storage.js';

@Injectable()
export class PartnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async createPartner(rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(createPartnerSchema, rawBody);
    const normalizedEmail = payload.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, deletedAt: true },
    });

    if (existing && !existing.deletedAt) {
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
      },
    });

    if (!authResponse.ok) {
      let message = 'Gagal membuat akun mitra';
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
    });

    if (!createdUser) {
      throw new NotFoundException('Akun mitra tidak ditemukan setelah dibuat');
    }

    const profile = await this.prisma.$transaction(async (tx) => {
      const generatedCode = await this.generateUniqueReferralCode(
        tx,
        payload.displayName ?? payload.fullName,
      );

      await tx.user.update({
        where: { id: createdUser.id },
        data: {
          name: payload.fullName,
          phone: payload.phone ?? null,
          role: UserRole.PARTNER,
          status: UserStatus.inactive,
          emailVerified: true,
          emailVerifiedAt: new Date(),
          passwordSetAt: null,
        },
      });

      await tx.userSubscription.deleteMany({
        where: {
          userId: createdUser.id,
          isTrial: true,
          status: SubscriptionStatus.active,
          activationSource: ActivationSource.trial,
        },
      });

      await tx.session.deleteMany({ where: { userId: createdUser.id } });

      const partnerProfile = await tx.partnerProfile.create({
        data: {
          userId: createdUser.id,
          displayName: payload.displayName ?? payload.fullName,
          status: PartnerStatus.active,
          notes: payload.notes ?? null,
          createdBy: actor.id,
        },
      });

      const referralCode = await tx.partnerReferralCode.create({
        data: {
          partnerProfileId: partnerProfile.id,
          code: generatedCode,
          isActive: true,
          discountType: payload.discountType,
          discountValue: payload.discountValue,
          commissionType: payload.commissionType,
          commissionValue: payload.commissionValue,
          createdBy: actor.id,
        },
      });

      return {
        partnerProfile,
        referralCode,
      };
    });

    await this.sendSetPasswordLink(normalizedEmail);

    await this.createAuditLog({
      actor,
      action: 'CREATE_PARTNER',
      targetType: 'partner_profile',
      targetId: profile.partnerProfile.id,
      metadata: {
        email: normalizedEmail,
        fullName: payload.fullName,
        referralCode: profile.referralCode.code,
      },
    });

    return {
      id: profile.partnerProfile.id,
      userId: createdUser.id,
      email: normalizedEmail,
      status: profile.partnerProfile.status,
      referralCode: profile.referralCode.code,
    };
  }

  async listPartners(rawQuery: unknown) {
    const query = this.validationService.validate(partnerListQuerySchema, rawQuery);
    const skip = (query.page - 1) * query.limit;
    const where: Prisma.PartnerProfileWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { displayName: { contains: query.search, mode: 'insensitive' } },
              { user: { email: { contains: query.search, mode: 'insensitive' } } },
              { user: { name: { contains: query.search, mode: 'insensitive' } } },
              { referralCodes: { some: { code: { contains: query.search.toUpperCase() } } } },
            ],
          }
        : {}),
    };

    const [partners, totalItems] = await Promise.all([
      this.prisma.partnerProfile.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, phone: true, status: true } },
          referralCodes: { select: { id: true, isActive: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: query.limit,
      }),
      this.prisma.partnerProfile.count({ where }),
    ]);

    const balances = await Promise.all(partners.map((partner) => this.getBalance(partner.id)));

    return {
      data: partners.map((partner, index) => ({
        id: partner.id,
        userId: partner.userId,
        displayName: partner.displayName,
        status: partner.status,
        userName: partner.user.name,
        email: partner.user.email,
        phone: partner.user.phone,
        userStatus: partner.user.status,
        activeCodes: partner.referralCodes.filter((code) => code.isActive).length,
        totalCodes: partner.referralCodes.length,
        balance: balances[index],
        createdAt: partner.createdAt,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async getPartnerDetail(partnerProfileId: string) {
    const partner = await this.prisma.partnerProfile.findUnique({
      where: { id: partnerProfileId },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, status: true } },
        referralCodes: { orderBy: { createdAt: 'desc' } },
        bankAccounts: { orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }] },
      },
    });

    if (!partner) {
      throw new NotFoundException('Mitra tidak ditemukan');
    }

    const [balance, recentTransactions, withdrawals] = await Promise.all([
      this.getBalance(partner.id),
      this.listPartnerTransactionsByProfile(partner.id, { page: 1, limit: 10 }),
      this.listWithdrawalsByProfile(partner.id, { page: 1, limit: 10 }),
    ]);

    return {
      id: partner.id,
      displayName: partner.displayName,
      status: partner.status,
      notes: partner.notes,
      user: partner.user,
      referralCodes: partner.referralCodes.map((code) => this.toReferralCodeResponse(code)),
      bankAccounts: partner.bankAccounts.map((account) => ({
        id: account.id,
        bankName: account.bankName,
        accountNumber: account.accountNumber,
        accountHolderName: account.accountHolderName,
        isPrimary: account.isPrimary,
      })),
      balance,
      recentTransactions: recentTransactions.data,
      withdrawals: withdrawals.data,
      createdAt: partner.createdAt,
    };
  }

  async listWithdrawals(rawQuery: unknown) {
    const query = this.validationService.validate(superAdminWithdrawalListQuerySchema, rawQuery);
    const skip = (query.page - 1) * query.limit;
    const where: Prisma.PartnerWithdrawalRequestWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { bankNameSnapshot: { contains: query.search, mode: 'insensitive' } },
              { accountNumberSnapshot: { contains: query.search, mode: 'insensitive' } },
              { accountHolderNameSnapshot: { contains: query.search, mode: 'insensitive' } },
              { requestedNote: { contains: query.search, mode: 'insensitive' } },
              { partnerProfile: { displayName: { contains: query.search, mode: 'insensitive' } } },
              { partnerProfile: { user: { email: { contains: query.search, mode: 'insensitive' } } } },
              { partnerProfile: { user: { name: { contains: query.search, mode: 'insensitive' } } } },
            ],
          }
        : {}),
    };

    const [withdrawals, totalItems] = await Promise.all([
      this.prisma.partnerWithdrawalRequest.findMany({
        where,
        include: {
          partnerProfile: {
            select: {
              id: true,
              displayName: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: query.limit,
      }),
      this.prisma.partnerWithdrawalRequest.count({ where }),
    ]);

    return {
      data: withdrawals.map((withdrawal) => ({
        ...this.toWithdrawalResponse(withdrawal),
        partnerProfileId: withdrawal.partnerProfileId,
        partnerDisplayName: withdrawal.partnerProfile.displayName,
        partnerUserName: withdrawal.partnerProfile.user.name,
        partnerEmail: withdrawal.partnerProfile.user.email,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  async updatePartner(partnerProfileId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updatePartnerSchema, rawBody);
    const existing = await this.prisma.partnerProfile.findUnique({
      where: { id: partnerProfileId },
      include: { user: true },
    });

    if (!existing) {
      throw new NotFoundException('Mitra tidak ditemukan');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      if (payload.phone !== undefined || payload.status !== undefined) {
        await tx.user.update({
          where: { id: existing.userId },
          data: {
            ...(payload.phone !== undefined ? { phone: payload.phone } : {}),
            ...(payload.status
              ? {
                  status:
                    payload.status === PartnerStatus.active
                      ? UserStatus.active
                      : payload.status === PartnerStatus.suspended
                        ? UserStatus.suspended
                        : UserStatus.inactive,
                }
              : {}),
          },
        });
      }

      return tx.partnerProfile.update({
        where: { id: partnerProfileId },
        data: {
          ...(payload.displayName ? { displayName: payload.displayName } : {}),
          ...(payload.status ? { status: payload.status } : {}),
          ...(payload.notes !== undefined ? { notes: payload.notes } : {}),
        },
      });
    });

    await this.createAuditLog({
      actor,
      action: 'UPDATE_PARTNER',
      targetType: 'partner_profile',
      targetId: updated.id,
      metadata: payload,
    });

    return { id: updated.id, status: updated.status };
  }

  async createReferralCode(partnerProfileId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(referralCodeSchema, rawBody);
    const partner = await this.prisma.partnerProfile.findUnique({
      where: { id: partnerProfileId },
      select: { id: true, displayName: true },
    });

    if (!partner) {
      throw new NotFoundException('Mitra tidak ditemukan');
    }

    this.assertRuleConfiguration(payload);
    const generatedCode = await this.generateUniqueReferralCode(this.prisma, partner.displayName);

    const created = await this.prisma.partnerReferralCode.create({
      data: {
        partnerProfileId,
        code: generatedCode,
        isActive: payload.isActive,
        discountType: payload.discountType,
        discountValue: payload.discountValue,
        commissionType: payload.commissionType,
        commissionValue: payload.commissionValue,
        createdBy: actor.id,
      },
    }).catch((error) => {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Kode referral sudah digunakan');
      }
      throw error;
    });

    await this.createAuditLog({
      actor,
      action: 'CREATE_REFERRAL_CODE',
      targetType: 'partner_referral_code',
      targetId: created.id,
      metadata: { partnerProfileId, code: created.code },
    });

    return this.toReferralCodeResponse(created);
  }

  async updateReferralCode(referralCodeId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(updateReferralCodeSchema, rawBody);
    const existing = await this.prisma.partnerReferralCode.findUnique({
      where: { id: referralCodeId },
    });

    if (!existing) {
      throw new NotFoundException('Kode referral tidak ditemukan');
    }

    const merged = {
      discountType: payload.discountType ?? existing.discountType,
      discountValue: payload.discountValue ?? Number(existing.discountValue),
      commissionType: payload.commissionType ?? existing.commissionType,
      commissionValue: payload.commissionValue ?? Number(existing.commissionValue),
    };
    this.assertRuleConfiguration(merged);

    const updated = await this.prisma.partnerReferralCode.update({
      where: { id: referralCodeId },
      data: {
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
        ...(payload.discountType ? { discountType: payload.discountType } : {}),
        ...(payload.discountValue !== undefined ? { discountValue: payload.discountValue } : {}),
        ...(payload.commissionType ? { commissionType: payload.commissionType } : {}),
        ...(payload.commissionValue !== undefined ? { commissionValue: payload.commissionValue } : {}),
      },
    }).catch((error) => {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Kode referral sudah digunakan');
      }
      throw error;
    });

    await this.createAuditLog({
      actor,
      action: 'UPDATE_REFERRAL_CODE',
      targetType: 'partner_referral_code',
      targetId: updated.id,
      metadata: payload,
    });

    return this.toReferralCodeResponse(updated);
  }

  async deleteReferralCode(referralCodeId: string, actor: AuthenticatedUser) {
    const existing = await this.prisma.partnerReferralCode.findUnique({
      where: { id: referralCodeId },
      select: { id: true, partnerProfileId: true, code: true },
    });

    if (!existing) {
      throw new NotFoundException('Kode referral tidak ditemukan');
    }

    const usageCount = await this.prisma.paymentTransaction.count({
      where: { referralCodeId },
    });

    if (usageCount > 0) {
      throw new ConflictException('Kode referral sudah pernah dipakai transaksi. Nonaktifkan kode ini saja.');
    }

    await this.prisma.partnerReferralCode.delete({
      where: { id: referralCodeId },
    });

    await this.createAuditLog({
      actor,
      action: 'DELETE_REFERRAL_CODE',
      targetType: 'partner_referral_code',
      targetId: existing.id,
      metadata: { partnerProfileId: existing.partnerProfileId, code: existing.code },
    });

    return { id: existing.id };
  }

  async previewReferral(rawQuery: unknown) {
    const payload = this.validationService.validate(referralPreviewSchema, rawQuery);
    if (!payload.referralCode) {
      return null;
    }

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: payload.subscriptionPlanId },
    });

    if (!plan || !plan.isActive || plan.isTrial) {
      throw new NotFoundException('Plan tidak ditemukan');
    }

    const resolved = await this.resolveReferralForCheckout(plan, payload.referralCode);
    if (!resolved) {
      throw new NotFoundException('Kode referral tidak valid');
    }

    return {
      code: resolved.code,
      partnerName: resolved.partnerName,
      originalAmount: resolved.originalAmount,
      discountAmount: resolved.discountAmount,
      finalAmount: resolved.finalAmount,
      commissionAmount: resolved.commissionAmount,
      discountType: resolved.discountType,
      discountValue: resolved.discountValue,
    };
  }

  async resolveReferralForCheckout(
    plan: { id: string; price: Prisma.Decimal | number },
    referralCode?: string,
  ) {
    const normalizedCode = referralCode ? normalizeReferralCode(referralCode) : undefined;
    if (!normalizedCode) {
      return null;
    }

    const code = await this.prisma.partnerReferralCode.findUnique({
      where: { code: normalizedCode },
      include: {
        partnerProfile: {
          include: {
            user: { select: { status: true } },
          },
        },
      },
    });

    if (
      !code ||
      !code.isActive ||
      code.partnerProfile.status !== PartnerStatus.active ||
      code.partnerProfile.user.status !== UserStatus.active
    ) {
      throw new NotFoundException('Kode referral tidak valid atau tidak aktif');
    }

    const quote = calculateReferralQuote({
      planPrice: Number(plan.price),
      discountType: code.discountType,
      discountValue: Number(code.discountValue),
      commissionType: code.commissionType,
      commissionValue: Number(code.commissionValue),
    });

    return {
      referralCodeId: code.id,
      code: code.code,
      partnerProfileId: code.partnerProfileId,
      partnerName: code.partnerProfile.displayName,
      discountType: code.discountType,
      discountValue: Number(code.discountValue),
      commissionType: code.commissionType,
      commissionValue: Number(code.commissionValue),
      ...quote,
    };
  }

  async recordCommissionForPayment(
    tx: Prisma.TransactionClient,
    payment: {
      id: string;
      invoiceNumber: string;
      referralCodeId: string | null;
      referralCommissionAmount: Prisma.Decimal | number | null;
    },
  ) {
    if (!payment.referralCodeId || !payment.referralCommissionAmount) {
      return;
    }

    const amount = Number(payment.referralCommissionAmount);
    if (amount <= 0) {
      return;
    }

    const referralCode = await tx.partnerReferralCode.findUnique({
      where: { id: payment.referralCodeId },
      select: { partnerProfileId: true },
    });

    if (!referralCode) {
      return;
    }

    await tx.partnerLedgerEntry.upsert({
      where: {
        paymentTransactionId_entryType: {
          paymentTransactionId: payment.id,
          entryType: PartnerLedgerEntryType.commission_earned,
        },
      },
      update: {},
      create: {
        partnerProfileId: referralCode.partnerProfileId,
        paymentTransactionId: payment.id,
        entryType: PartnerLedgerEntryType.commission_earned,
        amount,
        description: `Komisi referral invoice ${payment.invoiceNumber}`,
        metadata: {
          invoiceNumber: payment.invoiceNumber,
          referralCodeId: payment.referralCodeId,
        },
      },
    });
  }

  async reverseCommissionForPayment(
    tx: Prisma.TransactionClient,
    payment: {
      id: string;
      invoiceNumber: string;
    },
  ) {
    const earned = await tx.partnerLedgerEntry.findUnique({
      where: {
        paymentTransactionId_entryType: {
          paymentTransactionId: payment.id,
          entryType: PartnerLedgerEntryType.commission_earned,
        },
      },
    });

    if (!earned) {
      return;
    }

    await tx.partnerLedgerEntry.upsert({
      where: {
        paymentTransactionId_entryType: {
          paymentTransactionId: payment.id,
          entryType: PartnerLedgerEntryType.commission_reversal,
        },
      },
      update: {},
      create: {
        partnerProfileId: earned.partnerProfileId,
        paymentTransactionId: payment.id,
        entryType: PartnerLedgerEntryType.commission_reversal,
        amount: earned.amount,
        description: `Pembalikan komisi invoice ${payment.invoiceNumber}`,
        metadata: { invoiceNumber: payment.invoiceNumber },
      },
    });
  }

  async getMySummary(actor: AuthenticatedUser) {
    const partner = await this.getPartnerProfileForActor(actor);
    const [balance, activeCodes, totalTransactions, pendingWithdrawals, referralCodes] = await Promise.all([
      this.getBalance(partner.id),
      this.prisma.partnerReferralCode.count({
        where: { partnerProfileId: partner.id, isActive: true },
      }),
      this.prisma.paymentTransaction.count({
        where: { referralCode: { partnerProfileId: partner.id } },
      }),
      this.prisma.partnerWithdrawalRequest.count({
        where: { partnerProfileId: partner.id, status: PartnerWithdrawalStatus.pending },
      }),
      this.listPartnerReferralCodes(partner.id),
    ]);

    return {
      partnerProfileId: partner.id,
      displayName: partner.displayName,
      status: partner.status,
      activeCodes,
      totalTransactions,
      pendingWithdrawals,
      balance,
      referralCodes,
    };
  }

  async listMyTransactions(actor: AuthenticatedUser, rawQuery: unknown) {
    const partner = await this.getPartnerProfileForActor(actor);
    const query = this.validationService.validate(partnerTransactionsQuerySchema, rawQuery);
    return this.listPartnerTransactionsByProfile(partner.id, query);
  }

  async getMyBankAccount(actor: AuthenticatedUser) {
    const partner = await this.getPartnerProfileForActor(actor);
    const account = await this.getPrimaryBankAccount(partner.id);
    return account
      ? {
          id: account.id,
          bankName: account.bankName,
          accountNumber: account.accountNumber,
          accountHolderName: account.accountHolderName,
        }
      : null;
  }

  async updateMyBankAccount(actor: AuthenticatedUser, rawBody: unknown) {
    const partner = await this.getPartnerProfileForActor(actor);
    const payload = this.validationService.validate(partnerBankAccountSchema, rawBody);
    const existing = await this.getPrimaryBankAccount(partner.id);

    const account = existing
      ? await this.prisma.partnerBankAccount.update({
          where: { id: existing.id },
          data: payload,
        })
      : await this.prisma.partnerBankAccount.create({
          data: {
            partnerProfileId: partner.id,
            ...payload,
            isPrimary: true,
          },
        });

    return {
      id: account.id,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountHolderName: account.accountHolderName,
    };
  }

  async listMyWithdrawals(actor: AuthenticatedUser, rawQuery: unknown) {
    const partner = await this.getPartnerProfileForActor(actor);
    const query = this.validationService.validate(withdrawalListQuerySchema, rawQuery);
    return this.listWithdrawalsByProfile(partner.id, query);
  }

  async createMyWithdrawal(actor: AuthenticatedUser, rawBody: unknown) {
    const partner = await this.getPartnerProfileForActor(actor);
    const payload = this.validationService.validate(createWithdrawalSchema, rawBody);
    const bankAccount = await this.getPrimaryBankAccount(partner.id);

    if (!bankAccount) {
      throw new ConflictException('Lengkapi rekening mitra terlebih dahulu');
    }

    const balance = await this.getBalance(partner.id);
    if (payload.amount > balance.availableBalance) {
      throw new ConflictException('Saldo tersedia tidak mencukupi');
    }

    const withdrawal = await this.prisma.partnerWithdrawalRequest.create({
      data: {
        partnerProfileId: partner.id,
        amount: payload.amount,
        bankNameSnapshot: bankAccount.bankName,
        accountNumberSnapshot: bankAccount.accountNumber,
        accountHolderNameSnapshot: bankAccount.accountHolderName,
        requestedNote: payload.requestedNote ?? null,
      },
    });

    return this.toWithdrawalResponse(withdrawal);
  }

  async approveWithdrawal(
    withdrawalRequestId: string,
    rawBody: unknown,
    file: UploadedWithdrawalProofFile | undefined,
    actor: AuthenticatedUser,
  ) {
    const payload = this.validationService.validate(approveWithdrawalSchema, rawBody);
    const withdrawal = await this.prisma.partnerWithdrawalRequest.findUnique({
      where: { id: withdrawalRequestId },
    });

    if (!withdrawal) {
      throw new NotFoundException('Pengajuan pencairan tidak ditemukan');
    }

    if (withdrawal.status !== PartnerWithdrawalStatus.pending) {
      throw new ConflictException('Pengajuan pencairan sudah diproses');
    }

    const proof = await saveWithdrawalProofFile(withdrawal.id, file);
    const balance = await this.getBalance(withdrawal.partnerProfileId);
    const amount = Number(withdrawal.amount);

    if (amount > balance.withdrawableBalance) {
      throw new ConflictException('Saldo mitra tidak mencukupi untuk menyetujui pencairan ini');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const approved = await tx.partnerWithdrawalRequest.update({
        where: { id: withdrawal.id },
        data: {
          status: PartnerWithdrawalStatus.approved,
          reviewedBy: actor.id,
          reviewedAt: new Date(),
          reviewNote: payload.reviewNote ?? null,
          transferProofUrl: proof.publicUrl,
        },
      });

      await tx.partnerLedgerEntry.upsert({
        where: {
          withdrawalRequestId_entryType: {
            withdrawalRequestId: withdrawal.id,
            entryType: PartnerLedgerEntryType.withdrawal_debit,
          },
        },
        update: {},
        create: {
          partnerProfileId: withdrawal.partnerProfileId,
          withdrawalRequestId: withdrawal.id,
          entryType: PartnerLedgerEntryType.withdrawal_debit,
          amount: withdrawal.amount,
          description: `Pencairan saldo mitra ${withdrawal.id}`,
          metadata: { transferProofUrl: proof.publicUrl },
        },
      });

      return approved;
    });

    await this.createAuditLog({
      actor,
      action: 'APPROVE_PARTNER_WITHDRAWAL',
      targetType: 'partner_withdrawal_request',
      targetId: updated.id,
      metadata: { amount, transferProofUrl: proof.publicUrl },
    });

    return this.toWithdrawalResponse(updated);
  }

  async rejectWithdrawal(withdrawalRequestId: string, rawBody: unknown, actor: AuthenticatedUser) {
    const payload = this.validationService.validate(rejectWithdrawalSchema, rawBody);
    const withdrawal = await this.prisma.partnerWithdrawalRequest.findUnique({
      where: { id: withdrawalRequestId },
    });

    if (!withdrawal) {
      throw new NotFoundException('Pengajuan pencairan tidak ditemukan');
    }

    if (withdrawal.status !== PartnerWithdrawalStatus.pending) {
      throw new ConflictException('Pengajuan pencairan sudah diproses');
    }

    const updated = await this.prisma.partnerWithdrawalRequest.update({
      where: { id: withdrawal.id },
      data: {
        status: PartnerWithdrawalStatus.rejected,
        reviewedBy: actor.id,
        reviewedAt: new Date(),
        reviewNote: payload.reviewNote,
      },
    });

    await this.createAuditLog({
      actor,
      action: 'REJECT_PARTNER_WITHDRAWAL',
      targetType: 'partner_withdrawal_request',
      targetId: updated.id,
      metadata: { reviewNote: payload.reviewNote },
    });

    return this.toWithdrawalResponse(updated);
  }

  async getBalance(partnerProfileId: string) {
    const [earned, reversed, paidOut, pendingWithdrawals] = await Promise.all([
      this.sumLedger(partnerProfileId, PartnerLedgerEntryType.commission_earned),
      this.sumLedger(partnerProfileId, PartnerLedgerEntryType.commission_reversal),
      this.sumLedger(partnerProfileId, PartnerLedgerEntryType.withdrawal_debit),
      this.prisma.partnerWithdrawalRequest.aggregate({
        where: {
          partnerProfileId,
          status: PartnerWithdrawalStatus.pending,
        },
        _sum: { amount: true },
      }),
    ]);

    const pending = Number(pendingWithdrawals._sum.amount ?? 0);
    const withdrawableBalance = Math.max(0, earned - reversed - paidOut);

    return {
      totalEarned: earned,
      totalReversed: reversed,
      paidOut,
      pendingWithdrawal: pending,
      withdrawableBalance,
      availableBalance: Math.max(0, withdrawableBalance - pending),
    };
  }

  private async listPartnerTransactionsByProfile(
    partnerProfileId: string,
    query: { page: number; limit: number; search?: string; fromDate?: string; toDate?: string },
  ) {
    const skip = (query.page - 1) * query.limit;
    const createdAtFilter =
      query.fromDate || query.toDate
        ? {
            ...(query.fromDate ? { gte: new Date(`${query.fromDate}T00:00:00.000Z`) } : {}),
            ...(query.toDate ? { lte: new Date(`${query.toDate}T23:59:59.999Z`) } : {}),
          }
        : undefined;
    const where: Prisma.PaymentTransactionWhereInput = {
      referralCode: { partnerProfileId },
      ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
      ...(query.search
        ? {
            OR: [
              { invoiceNumber: { contains: query.search, mode: 'insensitive' } },
              { user: { email: { contains: query.search, mode: 'insensitive' } } },
              { user: { name: { contains: query.search, mode: 'insensitive' } } },
              { referralCodeSnapshot: { contains: query.search.toUpperCase() } },
              { subscriptionPlan: { name: { contains: query.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [transactions, totalItems] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where,
        include: {
          user: { select: { name: true, email: true } },
          subscriptionPlan: { select: { name: true } },
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
        buyerName: transaction.user.name,
        buyerEmail: transaction.user.email,
        planName: transaction.subscriptionPlan.name,
        referralCode: transaction.referralCodeSnapshot,
        originalAmount: Number(transaction.originalAmount ?? transaction.amount),
        discountAmount: Number(transaction.discountAmount),
        finalAmount: Number(transaction.amount),
        commissionAmount: Number(transaction.referralCommissionAmount ?? 0),
        status: transaction.status,
        paidAt: transaction.paidAt,
        createdAt: transaction.createdAt,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  private async listWithdrawalsByProfile(
    partnerProfileId: string,
    query: { page: number; limit: number; status?: PartnerWithdrawalStatus },
  ) {
    const skip = (query.page - 1) * query.limit;
    const where: Prisma.PartnerWithdrawalRequestWhereInput = {
      partnerProfileId,
      ...(query.status ? { status: query.status } : {}),
    };

    const [withdrawals, totalItems] = await Promise.all([
      this.prisma.partnerWithdrawalRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: query.limit,
      }),
      this.prisma.partnerWithdrawalRequest.count({ where }),
    ]);

    return {
      data: withdrawals.map((withdrawal) => this.toWithdrawalResponse(withdrawal)),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / query.limit)),
      },
    };
  }

  private async getPartnerProfileForActor(actor: AuthenticatedUser) {
    if (actor.role !== UserRole.PARTNER) {
      throw new NotFoundException('Profil mitra tidak ditemukan');
    }

    const partner = await this.prisma.partnerProfile.findUnique({
      where: { userId: actor.id },
    });

    if (!partner || partner.status !== PartnerStatus.active) {
      throw new NotFoundException('Profil mitra tidak aktif');
    }

    return partner;
  }

  private async assertPartnerExists(partnerProfileId: string) {
    const partner = await this.prisma.partnerProfile.findUnique({
      where: { id: partnerProfileId },
      select: { id: true },
    });

    if (!partner) {
      throw new NotFoundException('Mitra tidak ditemukan');
    }
  }

  private assertRuleConfiguration(payload: {
    discountType: ReferralValueType;
    discountValue: number;
    commissionType: ReferralValueType;
    commissionValue: number;
  }) {
    if (payload.discountType === ReferralValueType.percentage && payload.discountValue > 99) {
      throw new BadRequestException('Diskon persentase maksimal 99');
    }

    if (payload.commissionType === ReferralValueType.percentage && payload.commissionValue > 100) {
      throw new BadRequestException('Komisi persentase maksimal 100');
    }
  }

  private async getPrimaryBankAccount(partnerProfileId: string) {
    return this.prisma.partnerBankAccount.findFirst({
      where: { partnerProfileId, isPrimary: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async sumLedger(partnerProfileId: string, entryType: PartnerLedgerEntryType) {
    const result = await this.prisma.partnerLedgerEntry.aggregate({
      where: { partnerProfileId, entryType },
      _sum: { amount: true },
    });

    return Number(result._sum.amount ?? 0);
  }

  private async listPartnerReferralCodes(partnerProfileId: string) {
    const codes = await this.prisma.partnerReferralCode.findMany({
      where: { partnerProfileId },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
    });

    return codes.map((code) => this.toReferralCodeResponse(code));
  }

  private toReferralCodeResponse(code: {
    id: string;
    code: string;
    isActive: boolean;
    discountType: ReferralValueType;
    discountValue: Prisma.Decimal | number;
    commissionType: ReferralValueType;
    commissionValue: Prisma.Decimal | number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: code.id,
      code: code.code,
      isActive: code.isActive,
      discountType: code.discountType,
      discountValue: Number(code.discountValue),
      commissionType: code.commissionType,
      commissionValue: Number(code.commissionValue),
      createdAt: code.createdAt,
      updatedAt: code.updatedAt,
    };
  }

  private toWithdrawalResponse(withdrawal: {
    id: string;
    amount: Prisma.Decimal | number;
    status: PartnerWithdrawalStatus;
    bankNameSnapshot: string;
    accountNumberSnapshot: string;
    accountHolderNameSnapshot: string;
    requestedNote: string | null;
    reviewedAt: Date | null;
    reviewNote: string | null;
    transferProofUrl: string | null;
    createdAt: Date;
  }) {
    return {
      id: withdrawal.id,
      amount: Number(withdrawal.amount),
      status: withdrawal.status,
      bankName: withdrawal.bankNameSnapshot,
      accountNumber: withdrawal.accountNumberSnapshot,
      accountHolderName: withdrawal.accountHolderNameSnapshot,
      requestedNote: withdrawal.requestedNote,
      reviewedAt: withdrawal.reviewedAt,
      reviewNote: withdrawal.reviewNote,
      transferProofUrl: withdrawal.transferProofUrl,
      createdAt: withdrawal.createdAt,
    };
  }

  private async createAuditLog(params: {
    actor: AuthenticatedUser;
    action: string;
    targetType?: string;
    targetId?: string;
    metadata?: unknown;
  }) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId: params.actor.id,
        actorRole: params.actor.role ?? UserRole.SUPER_ADMIN,
        action: params.action,
        module: 'partner',
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
    return `Ptr!${randomBytes(8).toString('base64url')}`;
  }

  private async generateUniqueReferralCode(
    tx: Prisma.TransactionClient | PrismaService,
    label: string,
  ) {
    const base = normalizeReferralCode(label).replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'MITRA';

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const suffix = randomBytes(3).toString('hex').toUpperCase();
      const code = `${base}${suffix}`;
      const existing = await tx.partnerReferralCode.findUnique({
        where: { code },
        select: { id: true },
      });

      if (!existing) {
        return code;
      }
    }

    throw new InternalServerErrorException('Gagal membuat kode referral unik');
  }

  private isUniqueConstraintError(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    );
  }
}
