import { OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';
export declare class BootstrapService implements OnApplicationBootstrap {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    onApplicationBootstrap(): Promise<void>;
}
