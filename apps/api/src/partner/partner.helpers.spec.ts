import { BadRequestException, ConflictException } from '@nestjs/common';
import { ReferralValueType } from '../../generated/prisma/client.js';
import { calculateReferralQuote, normalizeReferralCode } from './partner.helpers.js';

describe('Partner referral helpers', () => {
  it('normalizes referral codes to uppercase without spaces', () => {
    expect(normalizeReferralCode('  mitra 2026 ')).toBe('MITRA2026');
  });

  it('calculates percentage discount and commission from final payable amount', () => {
    expect(
      calculateReferralQuote({
        planPrice: 100_000,
        discountType: ReferralValueType.percentage,
        discountValue: 10,
        commissionType: ReferralValueType.percentage,
        commissionValue: 20,
      }),
    ).toEqual({
      originalAmount: 100_000,
      discountAmount: 10_000,
      finalAmount: 90_000,
      commissionAmount: 18_000,
    });
  });

  it('rejects percentage discounts above 99 percent', () => {
    expect(() =>
      calculateReferralQuote({
        planPrice: 100_000,
        discountType: ReferralValueType.percentage,
        discountValue: 100,
        commissionType: ReferralValueType.percentage,
        commissionValue: 10,
      }),
    ).toThrow(BadRequestException);
  });

  it('rejects fixed discounts that make final payable amount zero', () => {
    expect(() =>
      calculateReferralQuote({
        planPrice: 100_000,
        discountType: ReferralValueType.fixed,
        discountValue: 100_000,
        commissionType: ReferralValueType.percentage,
        commissionValue: 10,
      }),
    ).toThrow(BadRequestException);
  });

  it('rejects fixed commission above final payable amount', () => {
    expect(() =>
      calculateReferralQuote({
        planPrice: 100_000,
        discountType: ReferralValueType.fixed,
        discountValue: 20_000,
        commissionType: ReferralValueType.fixed,
        commissionValue: 90_000,
      }),
    ).toThrow(ConflictException);
  });
});
