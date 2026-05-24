import type { PrismaClient } from '../../generated/prisma/client.js';
import type { PrismaService } from '../common/prisma.service.js';
type BootstrapPrismaClient = PrismaService | PrismaClient;
export declare const seedCoreDefaults: (prisma: BootstrapPrismaClient) => Promise<void>;
export declare const seedSuperAdminFromEnv: (prisma: BootstrapPrismaClient) => Promise<{
    created: boolean;
    skipped: boolean;
}>;
export {};
