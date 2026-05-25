import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserRole, UserStatus } from '../generated/prisma/client.js';
import { auth } from '../src/auth/auth.js';

const APP_URL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
const DEFAULT_PASSWORD = process.env.DUMMY_USER_PASSWORD?.trim() || 'DummyUser123!';

const DUMMY_USERS = [
  { name: 'Budi Santoso', email: 'budi.santoso@dummy.examcpns.local', phone: '081234567801', status: UserStatus.active },
  { name: 'Siti Rahayu', email: 'siti.rahayu@dummy.examcpns.local', phone: '081234567802', status: UserStatus.active },
  { name: 'Andi Wijaya', email: 'andi.wijaya@dummy.examcpns.local', phone: '081234567803', status: UserStatus.active },
  { name: 'Dewi Lestari', email: 'dewi.lestari@dummy.examcpns.local', phone: '081234567804', status: UserStatus.inactive },
  { name: 'Rizki Pratama', email: 'rizki.pratama@dummy.examcpns.local', phone: '081234567805', status: UserStatus.active },
  { name: 'Maya Putri', email: 'maya.putri@dummy.examcpns.local', phone: '081234567806', status: UserStatus.suspended },
  { name: 'Hendra Gunawan', email: 'hendra.gunawan@dummy.examcpns.local', phone: '081234567807', status: UserStatus.active },
  { name: 'Fitri Handayani', email: 'fitri.handayani@dummy.examcpns.local', phone: '081234567808', status: UserStatus.active },
  { name: 'Agus Salim', email: 'agus.salim@dummy.examcpns.local', phone: '081234567809', status: UserStatus.inactive },
  { name: 'Nina Kartika', email: 'nina.kartika@dummy.examcpns.local', phone: '081234567810', status: UserStatus.active },
  { name: 'Arif Hidayat', email: 'arif.hidayat@dummy.examcpns.local', phone: '081234567821', status: UserStatus.active },
  { name: 'Rina Melati', email: 'rina.melati@dummy.examcpns.local', phone: '081234567822', status: UserStatus.active },
  { name: 'Dimas Kurnia', email: 'dimas.kurnia@dummy.examcpns.local', phone: '081234567823', status: UserStatus.inactive },
  { name: 'Eka Safitri', email: 'eka.safitri@dummy.examcpns.local', phone: '081234567824', status: UserStatus.active },
  { name: 'Gilang Perkasa', email: 'gilang.perkasa@dummy.examcpns.local', phone: '081234567825', status: UserStatus.suspended },
  { name: 'Hani Utami', email: 'hani.utami@dummy.examcpns.local', phone: '081234567826', status: UserStatus.active },
  { name: 'Iqbal Ramadhan', email: 'iqbal.ramadhan@dummy.examcpns.local', phone: '081234567827', status: UserStatus.active },
  { name: 'Joko Widodo', email: 'joko.widodo@dummy.examcpns.local', phone: '081234567828', status: UserStatus.inactive },
  { name: 'Kartika Sari', email: 'kartika.sari@dummy.examcpns.local', phone: '081234567829', status: UserStatus.active },
  { name: 'Lukman Hakim', email: 'lukman.hakim@dummy.examcpns.local', phone: '081234567830', status: UserStatus.active },
] as const;

const KEEP_EMAILS = new Set(DUMMY_USERS.map((u) => u.email.toLowerCase()));

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const toAuthHeaders = () => {
  const url = new URL(APP_URL);
  return new Headers({
    origin: APP_URL,
    host: url.host,
    'content-type': 'application/json',
  });
};

async function upsertDummyUser(entry: (typeof DUMMY_USERS)[number]) {
  const email = entry.email.toLowerCase();
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, deletedAt: true },
  });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: entry.name,
        phone: entry.phone,
        role: UserRole.USER,
        status: entry.status,
        emailVerified: true,
        emailVerifiedAt: new Date(),
        passwordSetAt: new Date(),
        deletedAt: null,
      },
    });
    return {
      email,
      action: existing.deletedAt === null ? ('updated' as const) : ('restored' as const),
    };
  }

  const authResponse = await auth.api.signUpEmail({
    asResponse: true,
    headers: toAuthHeaders(),
    body: {
      name: entry.name,
      email,
      password: DEFAULT_PASSWORD,
      phone: entry.phone,
    },
  });

  if (!authResponse.ok) {
    let message = `Failed to create ${email}`;
    try {
      const payload = (await authResponse.json()) as { message?: string };
      if (payload.message) message = payload.message;
    } catch {
      // keep default
    }
    throw new Error(message);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`User not found after signup: ${email}`);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: entry.name,
      phone: entry.phone,
      role: UserRole.USER,
      status: entry.status,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      passwordSetAt: new Date(),
      deletedAt: null,
    },
  });

  await prisma.session.deleteMany({ where: { userId: user.id } });

  return { email, action: 'created' as const };
}

async function removeExtraDummyUsers() {
  const removed = await prisma.user.updateMany({
    where: {
      role: UserRole.USER,
      deletedAt: null,
      email: { endsWith: '@dummy.examcpns.local' },
      NOT: { email: { in: [...KEEP_EMAILS] } },
    },
    data: { deletedAt: new Date() },
  });
  if (removed.count > 0) {
    console.info(`[seed-dummy-users] soft-deleted ${removed.count} extra dummy user(s)`);
  }
}

async function main() {
  await prisma.$connect();
  await removeExtraDummyUsers();
  const results: Array<{ email: string; action: 'created' | 'updated' | 'restored' }> = [];

  for (const entry of DUMMY_USERS) {
    results.push(await upsertDummyUser(entry));
  }

  console.info('[seed-dummy-users] done');
  console.info(`Password (all dummy users): ${DEFAULT_PASSWORD}`);
  for (const row of results) {
    console.info(`  ${row.action}: ${row.email}`);
  }
}

main()
  .catch((error) => {
    console.error('[seed-dummy-users] failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
