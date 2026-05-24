type EmailProvider = 'console';

export type AuthEmailType = 'verify-email' | 'reset-password';

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  meta?: Record<string, unknown>;
}

const getEmailProvider = (): string => process.env.EMAIL_PROVIDER?.trim().toLowerCase() || 'console';

const getEmailFrom = (): string => process.env.EMAIL_FROM?.trim() || 'no-reply@examcpns.local';

const assertSupportedProvider = (provider: string): provider is EmailProvider => provider === 'console';

const formatConsoleEmail = (message: EmailMessage) => [
  '[email:console] outgoing message',
  `from: ${getEmailFrom()}`,
  `to: ${message.to}`,
  `subject: ${message.subject}`,
  `text: ${message.text}`,
  message.html ? `html: ${message.html}` : undefined,
  message.meta ? `meta: ${JSON.stringify(message.meta)}` : undefined,
].filter(Boolean).join('\n');

const sendWithConsole = async (message: EmailMessage) => {
  console.info(formatConsoleEmail(message));
};

export const sendEmail = async (message: EmailMessage) => {
  const provider = getEmailProvider();

  if (!assertSupportedProvider(provider)) {
    throw new Error(
      `Unsupported EMAIL_PROVIDER "${provider}". Add its implementation in src/notification/email.service.ts.`,
    );
  }

  await sendWithConsole(message);
};

export const sendAuthEmail = async (
  type: AuthEmailType,
  email: string,
  url: string,
  extra?: Record<string, unknown>,
) => {
  const isVerification = type === 'verify-email';

  await sendEmail({
    to: email,
    subject: isVerification ? 'Verify your ExamCPNS account' : 'Reset your ExamCPNS password',
    text: isVerification
      ? `Open this link to verify your account: ${url}`
      : `Open this link to reset your password: ${url}`,
    meta: {
      type,
      url,
      ...extra,
    },
  });
};
