import { BadRequestException, ConflictException } from '@nestjs/common';
import { ReferralValueType } from '../../generated/prisma/client.js';

export const normalizeReferralCode = (value: string) =>
  value.trim().toUpperCase().replace(/\s+/g, '');

export const roundMoney = (value: number) => Math.round(value * 100) / 100;

export function calculateReferralValue(params: {
  type: ReferralValueType;
  value: number;
  baseAmount: number;
}) {
  if (params.type === ReferralValueType.percentage) {
    return roundMoney((params.baseAmount * params.value) / 100);
  }

  return roundMoney(params.value);
}

export function calculateReferralQuote(params: {
  planPrice: number;
  discountType: ReferralValueType;
  discountValue: number;
  commissionType: ReferralValueType;
  commissionValue: number;
}) {
  assertReferralRuleValues(params);

  const discountAmount = calculateReferralValue({
    type: params.discountType,
    value: params.discountValue,
    baseAmount: params.planPrice,
  });
  const finalAmount = roundMoney(params.planPrice - discountAmount);

  if (finalAmount <= 0) {
    throw new ConflictException('Diskon referral tidak boleh membuat total pembayaran menjadi 0');
  }

  const commissionAmount = calculateReferralValue({
    type: params.commissionType,
    value: params.commissionValue,
    baseAmount: finalAmount,
  });

  if (commissionAmount > finalAmount) {
    throw new ConflictException('Komisi referral tidak boleh melebihi nominal pembayaran final');
  }

  return {
    originalAmount: roundMoney(params.planPrice),
    discountAmount,
    finalAmount,
    commissionAmount,
  };
}

export function assertReferralRuleValues(params: {
  planPrice: number;
  discountType: ReferralValueType;
  discountValue: number;
  commissionType: ReferralValueType;
  commissionValue: number;
}) {
  if (params.planPrice <= 0) {
    throw new BadRequestException('Harga plan harus lebih dari 0');
  }

  if (params.discountType === ReferralValueType.percentage) {
    if (params.discountValue <= 0 || params.discountValue > 99) {
      throw new BadRequestException('Diskon persentase harus di antara 1 sampai 99');
    }
  } else if (params.discountValue <= 0 || params.discountValue >= params.planPrice) {
    throw new BadRequestException('Diskon nominal harus lebih dari 0 dan lebih kecil dari harga plan');
  }

  if (params.commissionType === ReferralValueType.percentage) {
    if (params.commissionValue <= 0 || params.commissionValue > 100) {
      throw new BadRequestException('Komisi persentase harus di antara 1 sampai 100');
    }
  } else if (params.commissionValue <= 0) {
    throw new BadRequestException('Komisi nominal harus lebih dari 0');
  }
}
