import { createHmac, timingSafeEqual } from 'node:crypto';
import { PaymentStatus, SubscriptionStatus, } from '../../generated/prisma/client.js';
export const buildInvoiceNumber = (sequence, now = new Date()) => {
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const paddedSequence = String(sequence).padStart(4, '0');
    return `INV-${year}${month}${day}-${paddedSequence}`;
};
export const buildPaymentUrl = (baseUrl, paymentTransactionId) => `${baseUrl.replace(/\/+$/, '')}/pay/${paymentTransactionId}`;
export const computeDaysRemaining = (endDate, now = new Date()) => Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
export const computeTryoutRemaining = (tryoutLimit, tryoutUsed) => tryoutLimit === null ? null : Math.max(0, tryoutLimit - tryoutUsed);
export const addDays = (date, durationDays) => new Date(date.getTime() + durationDays * 24 * 60 * 60 * 1000);
export const statusAllowsSubscriptionActivation = (status) => status === PaymentStatus.success;
export const mapWebhookStatusToPaymentStatus = (status) => {
    switch (status.toLowerCase()) {
        case 'success':
        case 'paid':
        case 'settlement':
            return PaymentStatus.success;
        case 'failed':
        case 'deny':
            return PaymentStatus.failed;
        case 'expired':
            return PaymentStatus.expired;
        case 'cancelled':
        case 'canceled':
            return PaymentStatus.cancelled;
        case 'refunded':
            return PaymentStatus.refunded;
        default:
            return PaymentStatus.pending;
    }
};
export const verifyWebhookSignature = (payload, signature, secret) => {
    if (!signature || !secret) {
        return false;
    }
    const body = JSON.stringify(payload);
    const expectedSignature = createHmac('sha256', secret).update(body).digest('hex');
    const actual = Buffer.from(signature, 'utf8');
    const expected = Buffer.from(expectedSignature, 'utf8');
    if (actual.length !== expected.length) {
        return false;
    }
    return timingSafeEqual(actual, expected);
};
export const normalizeActivationSource = (source) => source;
export const isSubscriptionCurrentlyActive = (status, endDate, now = new Date()) => status === SubscriptionStatus.active && endDate > now;
//# sourceMappingURL=billing.helpers.js.map