import nodemailer from 'nodemailer';
const getEmailProvider = () => process.env.EMAIL_PROVIDER?.trim().toLowerCase() || 'console';
export const logEmailTransportConfig = () => {
    const provider = getEmailProvider();
    if (provider === 'smtp') {
        const user = process.env.SMTP_USER?.trim() ?? '(unset)';
        console.info(`[email] transport=smtp from=${getEmailFrom()} user=${user}`);
        return;
    }
    console.info(`[email] transport=${provider} (verification links logged to console only)`);
};
const getEmailFrom = () => {
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
const assertSupportedProvider = (provider) => provider === 'console' || provider === 'smtp';
const normalizeSmtpPass = (raw) => {
    if (!raw) {
        return '';
    }
    return raw.trim().replace(/\s+/g, '');
};
let smtpTransporter = null;
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
const formatConsoleEmail = (message) => [
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
const sendWithConsole = async (message) => {
    console.info(formatConsoleEmail(message));
};
const sendWithSmtp = async (message) => {
    const transporter = getSmtpTransporter();
    const result = await transporter.sendMail({
        from: getEmailFrom(),
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html ?? message.text,
    });
    console.info(`[email:smtp] sent to=${message.to} subject="${message.subject}" messageId=${result.messageId ?? 'n/a'}`);
};
export const sendEmail = async (message) => {
    const provider = getEmailProvider();
    if (!assertSupportedProvider(provider)) {
        throw new Error(`Unsupported EMAIL_PROVIDER "${provider}". Use "console" or "smtp".`);
    }
    if (provider === 'console') {
        await sendWithConsole(message);
        return;
    }
    await sendWithSmtp(message);
};
const buildAuthEmailContent = (type, url, appName) => {
    if (type === 'verify-email') {
        return {
            subject: `Verifikasi email — ${appName}`,
            text: `Halo,\n\nTerima kasih telah mendaftar di ${appName}. Klik link berikut untuk memverifikasi email Anda:\n\n${url}\n\nLink berlaku 24 jam. Jika Anda tidak mendaftar, abaikan email ini.`,
            html: `<p>Halo,</p><p>Terima kasih telah mendaftar di <strong>${appName}</strong>.</p><p><a href="${url}">Klik di sini untuk verifikasi email</a></p><p>Atau salin link ini ke browser:<br/><a href="${url}">${url}</a></p><p>Link berlaku 24 jam.</p>`,
        };
    }
    return {
        subject: `Atur password — ${appName}`,
        text: `Halo,\n\nKlik link berikut untuk mengatur password akun ${appName} Anda:\n\n${url}\n\nLink berlaku 1 jam. Jika Anda tidak meminta ini, abaikan email ini.`,
        html: `<p>Halo,</p><p>Klik link berikut untuk <strong>mengatur password</strong> akun ${appName} Anda:</p><p><a href="${url}">Atur password sekarang</a></p><p>Atau salin link ini ke browser:<br/><a href="${url}">${url}</a></p><p>Link berlaku 1 jam.</p>`,
    };
};
export const sendAuthEmail = async (type, email, url, extra) => {
    const appName = extra?.appName ?? 'ExamCPNS';
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
//# sourceMappingURL=email.service.js.map