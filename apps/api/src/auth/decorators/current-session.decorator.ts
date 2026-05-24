import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { RequestWithAuth } from '../auth-request.type.js';

export const CurrentSession = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithAuth>();
    return request.auth?.session ?? null;
  },
);
