import { PaymentStatus, SubscriptionStatus } from '../../generated/prisma/client.js';
import {
  addDays,
  buildInvoiceNumber,
  buildPaymentUrl,
  computeDaysRemaining,
  computeTryoutRemaining,
  isSubscriptionCurrentlyActive,
  mapWebhookStatusToPaymentStatus,
  verifyWebhookSignature,
} from './billing.helpers.js';
import { createHmac } from 'node:crypto';

describe('Billing helpers', () => {
  it('builds invoice number with date and padded sequence', () => {
    expect(buildInvoiceNumber(7, new Date('2026-05-17T00:00:00.000Z'))).toBe(
      'INV-20260517-0007',
    );
  });

  it('builds payment url without duplicate slashes', () => {
    expect(buildPaymentUrl('https://pay.example/', 'pay-123')).toBe(
      'https://pay.example/pay/pay-123',
    );
  });

  it('computes tryout and day remaining correctly', () => {
    expect(computeTryoutRemaining(3, 1)).toBe(2);
    expect(computeTryoutRemaining(null, 10)).toBeNull();
    expect(computeDaysRemaining(new Date('2026-05-20T00:00:00.000Z'), new Date('2026-05-17T12:00:00.000Z'))).toBe(3);
  });

  it('maps webhook status to payment status', () => {
    expect(mapWebhookStatusToPaymentStatus('settlement')).toBe(PaymentStatus.success);
    expect(mapWebhookStatusToPaymentStatus('expired')).toBe(PaymentStatus.expired);
  });

  it('verifies webhook signature using sha256 hmac', () => {
    const payload = { invoiceNumber: 'INV-1', status: 'success' };
    const secret = 'webhook-secret';
    const signature = createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
    expect(verifyWebhookSignature(payload, 'bad-signature', secret)).toBe(false);
  });

  it('checks whether subscription is currently active', () => {
    expect(
      isSubscriptionCurrentlyActive(
        SubscriptionStatus.active,
        new Date('2026-05-20T00:00:00.000Z'),
        new Date('2026-05-17T00:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSubscriptionCurrentlyActive(
        SubscriptionStatus.expired,
        new Date('2026-05-20T00:00:00.000Z'),
        new Date('2026-05-17T00:00:00.000Z'),
      ),
    ).toBe(false);
  });

  it('adds days to a date', () => {
    expect(addDays(new Date('2026-05-17T00:00:00.000Z'), 30).toISOString()).toBe(
      '2026-06-16T00:00:00.000Z',
    );
  });
});
