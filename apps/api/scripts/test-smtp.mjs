/**
 * Test SMTP from apps/api/.env
 * Usage:
 *   npm run email:test
 *   TEST_EMAIL=you@example.com npm run email:test -- --send
 */
import 'dotenv/config';
import nodemailer from 'nodemailer';

const shouldSend = process.argv.includes('--send');
const testTo = process.env.TEST_EMAIL?.trim();

const normalizePass = (raw) => (raw ?? '').trim().replace(/\s+/g, '');

const user = process.env.SMTP_USER?.trim();
const pass = normalizePass(process.env.SMTP_PASS);
const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();

console.log('EMAIL_PROVIDER:', provider ?? '(unset)');
console.log('SMTP_USER:', user || '(unset)');
console.log('SMTP_PASS chars:', pass.length);

if (provider !== 'smtp') {
  console.error('Set EMAIL_PROVIDER=smtp in apps/api/.env');
  process.exit(1);
}

if (!user || !pass) {
  console.error('Set SMTP_USER and SMTP_PASS in apps/api/.env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log('SMTP verify: OK');
} catch (error) {
  console.error('SMTP verify FAILED:', error.message);
  console.error('');
  console.error('Gmail: bukan password login biasa. Buat App Password:');
  console.error('  https://myaccount.google.com/apppasswords');
  console.error('Lalu paste 16 karakter ke SMTP_PASS di .env (tanpa spasi).');
  process.exit(2);
}

if (!shouldSend) {
  console.log('Login OK. Tambahkan --send dan TEST_EMAIL untuk kirim email percobaan.');
  process.exit(0);
}

if (!testTo) {
  console.error('Set TEST_EMAIL=alamat@email.com untuk kirim email percobaan.');
  process.exit(3);
}

const from = process.env.EMAIL_FROM?.trim() || `ExamCPNS <${user}>`;
const info = await transporter.sendMail({
  from,
  to: testTo,
  subject: 'ExamCPNS — tes SMTP',
  text: 'Email percobaan dari ExamCPNS. SMTP berfungsi.',
  html: '<p>Email percobaan dari <strong>ExamCPNS</strong>. SMTP berfungsi.</p>',
});

console.log('Test email sent:', info.messageId);
console.log('Check inbox (and spam) for', testTo);
