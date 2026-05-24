import type { UserRole, UserStatus } from '../../generated/prisma/client.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  phone?: string | null;
  role?: UserRole;
  status?: UserStatus;
  emailVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AuthenticatedSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface BetterAuthSessionData {
  user: AuthenticatedUser;
  session: AuthenticatedSession;
}
