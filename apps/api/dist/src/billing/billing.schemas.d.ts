import { z } from 'zod';
export declare const createCheckoutSchema: z.ZodObject<{
    subscriptionPlanId: z.ZodString;
    paymentMethod: z.ZodPreprocess<z.ZodString>;
}, z.core.$strip>;
export declare const listPaymentHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const paymentWebhookSchema: z.ZodObject<{
    eventId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    transactionId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    invoiceNumber: z.ZodPreprocess<z.ZodString>;
    status: z.ZodPreprocess<z.ZodString>;
    paymentMethod: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    amount: z.ZodCoercedNumber<unknown>;
    paidAt: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
