import type { z } from 'zod';
export declare class ValidationService {
    validate<T>(schema: z.ZodType<T>, data: unknown): T;
}
