import type { UserRole } from '../../../generated/prisma/client.js';
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
