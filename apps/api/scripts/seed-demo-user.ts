import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole, UserStatus } from '../generated/prisma/client.js';
import { activateUserAccountIfReady } from '../src/auth/auth-hooks.js';
import { auth } from '../src/auth/auth.js';

const DEMO_EMAIL = 'givemee1337@gmail.com';
const DEMO_PASSWORD = 'Akugans123';
const DEMO_NAME = 'Demo User';
const DEMO_PHONE = '081337133700';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const toBootstrapHeaders = () => {
  const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
  const url = new URL(appUrl);
  return new Headers({
    origin: appUrl,
    host: url.host,
    'content-type': 'application/json',
  });
};

async function main() {
  await prisma.$connect();

  const email = DEMO_EMAIL.toLowerCase();
  let user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  if (!user) {
    const authResponse = await auth.api.signUpEmail({
      asResponse: true,
      headers: toBootstrapHeaders(),
      body: {
        name: DEMO_NAME,
        email,
        password: DEMO_PASSWORD,
        phone: DEMO_PHONE,
      },
    });

    if (!authResponse.ok) {
      const payload = (await authResponse.json().catch(() => ({}))) as { message?: string };
      throw new Error(payload.message ?? 'Failed to create demo user');
    }

    user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });
  }

  if (!user) {
    throw new Error('Demo user could not be found after creation');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: DEMO_NAME,
      phone: DEMO_PHONE,
      role: UserRole.USER,
      status: UserStatus.active,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  await activateUserAccountIfReady(user.id);

  console.info(`[seed-demo-user] ready: ${user.email}`);
}

main()
  .catch((error) => {
    console.error('[seed-demo-user] failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
