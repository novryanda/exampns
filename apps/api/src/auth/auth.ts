import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  activateUserAccountIfReady,
  markPasswordSetAndActivateIfReady,
  syncLastLoginForUser,
} from './auth-hooks.js';
import { prisma } from '../common/prisma.service.js';
import { sendAuthEmail } from '../notification/email.service.js';

const apiOrigin = (process.env.BETTER_AUTH_URL ?? 'http://localhost:3001').replace(/\/$/, '');
const appUrl = apiOrigin.endsWith('/api/auth') ? apiOrigin : `${apiOrigin}/api/auth`;
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const isProduction = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
  appName: 'ExamCPNS API',
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  experimental: {
    joins: true,
  },
  trustedOrigins: [appUrl, frontendUrl],
  databaseHooks: {
    user: {
      update: {
        async after(user) {
          if (user.emailVerified) {
            await activateUserAccountIfReady(user.id);
          }
        },
      },
    },
    session: {
      create: {
        async after(session) {
          await syncLastLoginForUser(session.userId);
        },
      },
    },
  },
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
      },
      role: {
        type: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        required: false,
        defaultValue: 'USER',
        input: false,
      },
      status: {
        type: ['active', 'inactive', 'suspended'],
        required: false,
        defaultValue: 'active',
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    onPasswordReset: async ({ user }) => {
      await markPasswordSetAndActivateIfReady(user.id);
    },
    sendResetPassword: async ({ user, url, token }) => {
      const resetUrl = token
        ? `${frontendUrl.replace(/\/$/, '')}/auth/reset-password?token=${encodeURIComponent(token)}`
        : url;

      try {
        await sendAuthEmail('reset-password', user.email, resetUrl, {
          appName: 'ExamCPNS',
        });
      } catch (error: unknown) {
        console.error('[email] failed to send reset-password email', error);
        throw error;
      }
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendAuthEmail('verify-email', user.email, url, {
          appName: 'ExamCPNS',
        });
      } catch (error: unknown) {
        console.error('[email] failed to send verify-email to', user.email, error);
        throw error;
      }
    },
    // Hanya registrasi mandiri yang memicu email verifikasi (lihat AuthRegistrationService).
    sendOnSignUp: false,
    autoSignInAfterVerification: false,
    expiresIn: 60 * 60 * 24,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: 'jwe',
    },
  },
  account: {
    encryptOAuthTokens: true,
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
    storage: 'memory',
    customRules: {
      '/sign-in/email': {
        window: 10,
        max: 3,
      },
      '/sign-up/email': {
        window: 60,
        max: 5,
      },
      '/forget-password': {
        window: 60,
        max: 3,
      },
    },
  },
  advanced: {
    useSecureCookies: isProduction,
    cookiePrefix: 'examcpns',
  },
});
