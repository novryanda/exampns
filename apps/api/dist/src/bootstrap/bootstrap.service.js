var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BootstrapService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';
import { seedCoreDefaults, seedSuperAdminFromEnv } from './bootstrap-defaults.js';
const isBootstrapEnabled = () => {
    const raw = process.env.BOOTSTRAP_ON_STARTUP?.trim().toLowerCase();
    return raw !== 'false';
};
let BootstrapService = BootstrapService_1 = class BootstrapService {
    prisma;
    logger = new Logger(BootstrapService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onApplicationBootstrap() {
        if (!isBootstrapEnabled()) {
            this.logger.log('Bootstrap defaults disabled by BOOTSTRAP_ON_STARTUP=false');
            return;
        }
        await seedCoreDefaults(this.prisma);
        this.logger.log('Core bootstrap defaults are ready');
        const superAdminResult = await seedSuperAdminFromEnv(this.prisma);
        if (superAdminResult.skipped) {
            this.logger.log('Super admin bootstrap skipped because env credentials are not set');
            return;
        }
        this.logger.log(superAdminResult.created
            ? 'Bootstrap super admin created from environment variables'
            : 'Bootstrap super admin already exists and was synchronized');
    }
};
BootstrapService = BootstrapService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BootstrapService);
export { BootstrapService };
//# sourceMappingURL=bootstrap.service.js.map