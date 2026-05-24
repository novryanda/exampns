import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { provisionTrialSubscriptionForUser, syncLastLoginForUser } from './auth-hooks.js';
import { prisma } from '../common/prisma.service.js';
import { sendAuthEmail } from '../notification/email.service.js';

const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';
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
      create: {
        async after(user) {
          await provisionTrialSubscriptionForUser(user.id);
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
    sendResetPassword: async ({ user, url }) => {
      void sendAuthEmail('reset-password', user.email, url, {
        appName: 'ExamCPNS API',
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendAuthEmail('verify-email', user.email, url, {
        appName: 'ExamCPNS API',
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
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
