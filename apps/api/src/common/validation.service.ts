import { BadRequestException, Injectable } from '@nestjs/common';
import type { z } from 'zod';
import { ZodError } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(schema: z.ZodType<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          success: false,
          message: 'Validation failed',
          error: {
            code: 'VALIDATION_ERROR',
            details: error.issues.map((issue) => ({
              field: issue.path.join('.') || 'body',
              message: issue.message,
            })),
          },
        });
      }

      throw error;
    }
  }
}
