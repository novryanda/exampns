import { z } from 'zod';
export declare const registerUserSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const resendVerificationSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
