import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { seedDemoTryoutCatalog } from '../src/bootstrap/seed-demo-catalog.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  await prisma.$connect();
  await seedDemoTryoutCatalog(prisma);
  console.info('[seed-demo-catalog] demo tryout catalog and question bank are ready');
}

main()
  .catch((error) => {
    console.error('[seed-demo-catalog] failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
