import {
  PartnerStatus,
  PartnerWithdrawalStatus,
  ReferralValueType,
} from '../../generated/prisma/client.js';
import { z } from 'zod';
import { normalizeReferralCode } from './partner.helpers.js';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

const referralValueSchema = z.coerce.number().positive().max(999_999_999);
const dateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD');

export const partnerListQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(PartnerStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const partnerTransactionsQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  fromDate: z.preprocess(emptyToUndefined, dateOnlySchema.optional()),
  toDate: z.preprocess(emptyToUndefined, dateOnlySchema.optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createPartnerSchema = z.object({
  fullName: z.string().trim().min(3).max(150),
  displayName: z.string().trim().min(3).max(150).optional(),
  email: z.string().email().max(255),
  phone: z.preprocess(emptyToUndefined, z.string().max(30).optional()),
  notes: z.preprocess(emptyToUndefined, z.string().max(1000).optional()),
  discountType: z.nativeEnum(ReferralValueType),
  discountValue: referralValueSchema,
  commissionType: z.nativeEnum(ReferralValueType),
  commissionValue: referralValueSchema,
});

export const updatePartnerSchema = z
  .object({
    displayName: z.string().trim().min(3).max(150).optional(),
    phone: z.preprocess(emptyToUndefined, z.string().max(30).nullable().optional()),
    status: z.nativeEnum(PartnerStatus).optional(),
    notes: z.preprocess(emptyToUndefined, z.string().max(1000).nullable().optional()),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

const referralRuleSchema = z.object({
  isActive: z.boolean().default(true),
  discountType: z.nativeEnum(ReferralValueType),
  discountValue: referralValueSchema,
  commissionType: z.nativeEnum(ReferralValueType),
  commissionValue: referralValueSchema,
});

export const referralCodeSchema = referralRuleSchema;

export const updateReferralCodeSchema = referralRuleSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one field is required' },
);

export const referralPreviewSchema = z.object({
  subscriptionPlanId: z.string().uuid(),
  referralCode: z
    .preprocess(emptyToUndefined, z.string().min(3).max(50).optional())
    .transform((value) => (value ? normalizeReferralCode(value) : undefined)),
});

export const partnerBankAccountSchema = z.object({
  bankName: z.string().trim().min(2).max(100),
  accountNumber: z.string().trim().min(4).max(80),
  accountHolderName: z.string().trim().min(3).max(150),
});

export const createWithdrawalSchema = z.object({
  amount: z.coerce.number().positive().max(999_999_999),
  requestedNote: z.preprocess(emptyToUndefined, z.string().max(500).optional()),
});

export const withdrawalListQuerySchema = z.object({
  status: z.preprocess(emptyToUndefined, z.nativeEnum(PartnerWithdrawalStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const superAdminWithdrawalListQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(PartnerWithdrawalStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const rejectWithdrawalSchema = z.object({
  reviewNote: z.string().trim().min(5).max(500),
});

export const approveWithdrawalSchema = z.object({
  reviewNote: z.preprocess(emptyToUndefined, z.string().max(500).optional()),
});
