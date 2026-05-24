import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';
import { seedCoreDefaults, seedSuperAdminFromEnv } from './bootstrap-defaults.js';

const isBootstrapEnabled = () => {
  const raw = process.env.BOOTSTRAP_ON_STARTUP?.trim().toLowerCase();
  return raw !== 'false';
};

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private readonly prisma: PrismaService) {}

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

    this.logger.log(
      superAdminResult.created
        ? 'Bootstrap super admin created from environment variables'
        : 'Bootstrap super admin already exists and was synchronized',
    );
  }
}
