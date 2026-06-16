import 'dotenv/config';
import { prisma } from '../src/common/prisma.service.js';
import { auth } from '../src/auth/auth.js';
import { UserRole, UserStatus } from '../generated/prisma/client.js';

async function main() {
  const users = [
    { name: 'Demo Admin', email: 'admin@atios.id', password: 'Password123', role: UserRole.ADMIN },
    { name: 'Demo User', email: 'user@atios.id', password: 'Password123', role: UserRole.USER }
  ];

  const headers = new Headers({
    origin: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
    'content-type': 'application/json',
  });

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email }});
    if (existing) {
      console.log(`User ${u.email} already exists.`);
      continue;
    }

    const res = await auth.api.signUpEmail({
      asResponse: true,
      headers,
      body: {
        name: u.name,
        email: u.email,
        password: u.password,
      }
    });

    if (!res.ok) {
      console.error(`Failed to create ${u.email}:`, await res.text());
      continue;
    }

    // Update role and verification status
    const created = await prisma.user.findUnique({ where: { email: u.email }});
    if (created) {
      await prisma.user.update({
        where: { id: created.id },
        data: {
          role: u.role,
          status: UserStatus.active,
          emailVerified: true,
          emailVerifiedAt: new Date(),
        }
      });
      console.log(`Created ${u.email} with role ${u.role}`);
    }
  }
}

main().catch(console.error).finally(() => process.exit(0));
