import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { seedCoreDefaults, seedSuperAdminFromEnv } from '../src/bootstrap/bootstrap-defaults.js';
const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});
async function main() {
    await prisma.$connect();
    await seedCoreDefaults(prisma);
    await seedSuperAdminFromEnv(prisma);
    console.info('[seed] bootstrap defaults completed');
}
main()
    .catch((error) => {
    console.error('[seed] failed', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map