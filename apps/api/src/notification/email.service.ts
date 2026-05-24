import nodemailer from 'nodemailer';
import type Transporter from 'nodemailer/lib/mailer/index.js';

type EmailProvider = 'console' | 'smtp';

export type AuthEmailType = 'verify-email' | 'reset-password';

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  meta?: Record<string, unknown>;
}

const getEmailProvider = (): string =>
  process.env.EMAIL_PROVIDER?.trim().toLowerCase() || 'console';

export const logEmailTransportConfig = () => {
  const provider = getEmailProvider();
  if (provider === 'smtp') {
    const user = process.env.SMTP_USER?.trim() ?? '(unset)';
    console.info(`[email] transport=smtp from=${getEmailFrom()} user=${user}`);
    return;
  }

  console.info(`[email] transport=${provider} (verification links logged to console only)`);
};

const getEmailFrom = (): string => {
  const from = process.env.EMAIL_FROM?.trim();
  if (from) {
    return from;
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  if (smtpUser) {
    return `ExamCPNS <${smtpUser}>`;
  }

  return 'ExamCPNS <no-reply@examcpns.local>';
};

const assertSupportedProvider = (provider: string): provider is EmailProvider =>
  provider === 'console' || provider === 'smtp';

/** Gmail App Passwords are 16 chars; users often paste them with spaces. */
const normalizeSmtpPass = (raw: string | undefined): string => {
  if (!raw) {
    return '';
  }

  return raw.trim().replace(/\s+/g, '');
};

let smtpTransporter: Transporter | null = null;

const getSmtpTransporter = () => {
  if (smtpTransporter) {
    return smtpTransporter;
  }

  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = normalizeSmtpPass(process.env.SMTP_PASS);

  if (!user || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS are required when EMAIL_PROVIDER=smtp');
  }

  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  smtpTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return smtpTransporter;
};

const formatConsoleEmail = (message: EmailMessage) =>
  [
    '[email:console] outgoing message',
    `from: ${getEmailFrom()}`,
    `to: ${message.to}`,
    `subject: ${message.subject}`,
    `text: ${message.text}`,
    message.html ? `html: ${message.html}` : undefined,
    message.meta ? `meta: ${JSON.stringify(message.meta)}` : undefined,
  ]
    .filter(Boolean)
    .join('\n');

const sendWithConsole = async (message: EmailMessage) => {
  console.info(formatConsoleEmail(message));
};

const sendWithSmtp = async (message: EmailMessage) => {
  const transporter = getSmtpTransporter();

  const result = await transporter.sendMail({
    from: getEmailFrom(),
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html ?? message.text,
  });

  console.info(
    `[email:smtp] sent to=${message.to} subject="${message.subject}" messageId=${result.messageId ?? 'n/a'}`,
  );
};

export const sendEmail = async (message: EmailMessage) => {
  const provider = getEmailProvider();

  if (!assertSupportedProvider(provider)) {
    throw new Error(
      `Unsupported EMAIL_PROVIDER "${provider}". Use "console" or "smtp".`,
    );
  }

  if (provider === 'console') {
    await sendWithConsole(message);
    return;
  }

  await sendWithSmtp(message);
};

const buildAuthEmailContent = (
  type: AuthEmailType,
  url: string,
  appName: string,
) => {
  if (type === 'verify-email') {
    return {
      subject: `Verifikasi email — ${appName}`,
      text: `Halo,\n\nTerima kasih telah mendaftar di ${appName}. Klik link berikut untuk memverifikasi email Anda:\n\n${url}\n\nLink berlaku 24 jam. Jika Anda tidak mendaftar, abaikan email ini.`,
      html: `<p>Halo,</p><p>Terima kasih telah mendaftar di <strong>${appName}</strong>.</p><p><a href="${url}">Klik di sini untuk verifikasi email</a></p><p>Atau salin link ini ke browser:<br/><a href="${url}">${url}</a></p><p>Link berlaku 24 jam.</p>`,
    };
  }

  return {
    subject: `Reset password — ${appName}`,
    text: `Halo,\n\nKami menerima permintaan reset password untuk akun ${appName}. Klik link berikut:\n\n${url}\n\nJika bukan Anda, abaikan email ini.`,
    html: `<p>Halo,</p><p>Klik link berikut untuk reset password <strong>${appName}</strong>:</p><p><a href="${url}">${url}</a></p>`,
  };
};

export const sendAuthEmail = async (
  type: AuthEmailType,
  email: string,
  url: string,
  extra?: Record<string, unknown>,
) => {
  const appName = (extra?.appName as string | undefined) ?? 'ExamCPNS';
  const content = buildAuthEmailContent(type, url, appName);

  await sendEmail({
    to: email,
    subject: content.subject,
    text: content.text,
    html: content.html,
    meta: {
      type,
      url,
      ...extra,
    },
  });
};
