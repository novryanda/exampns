import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  PaymentStatus,
  SubscriptionStatus,
  type ActivationSource,
} from '../../generated/prisma/client.js';

export const buildInvoiceNumber = (sequence: number, now = new Date()) => {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const paddedSequence = String(sequence).padStart(4, '0');
  return `INV-${year}${month}${day}-${paddedSequence}`;
};

export const buildPaymentUrl = (baseUrl: string, paymentTransactionId: string) =>
  `${baseUrl.replace(/\/+$/, '')}/pay/${paymentTransactionId}`;

export const buildInternalPaymentPageUrl = (frontendUrl: string, paymentTransactionId: string) =>
  `${frontendUrl.replace(/\/+$/, '')}/app/langganan/pembayaran/${paymentTransactionId}`;

export const resolveCheckoutPaymentUrl = ({
  gatewayProvider,
  paymentBaseUrl,
  frontendUrl,
  paymentTransactionId,
}: {
  gatewayProvider: string;
  paymentBaseUrl: string;
  frontendUrl: string;
  paymentTransactionId: string;
}) => {
  const normalizedBase = paymentBaseUrl.replace(/\/+$/, '');

  if (gatewayProvider === 'manual' || normalizedBase.includes('payment-gateway.example')) {
    return buildInternalPaymentPageUrl(frontendUrl, paymentTransactionId);
  }

  return buildPaymentUrl(paymentBaseUrl, paymentTransactionId);
};

export const computeDaysRemaining = (endDate: Date, now = new Date()) =>
  Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));

export const computeTryoutRemaining = (tryoutLimit: number | null, tryoutUsed: number) =>
  tryoutLimit === null ? null : Math.max(0, tryoutLimit - tryoutUsed);

export const addDays = (date: Date, durationDays: number) =>
  new Date(date.getTime() + durationDays * 24 * 60 * 60 * 1000);

export const statusAllowsSubscriptionActivation = (status: PaymentStatus) =>
  status === PaymentStatus.success;

export const mapWebhookStatusToPaymentStatus = (status: string) => {
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

export const verifyWebhookSignature = (
  payload: unknown,
  signature: string | undefined,
  secret: string | undefined,
) => {
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

export const normalizeActivationSource = (source: ActivationSource) => source;

export const isSubscriptionCurrentlyActive = (
  status: SubscriptionStatus,
  endDate: Date,
  now = new Date(),
) => status === SubscriptionStatus.active && endDate > now;
