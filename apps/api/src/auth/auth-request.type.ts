import type { Request } from 'express';
import type { BetterAuthSessionData, AuthenticatedUser } from './auth.types.js';

export interface RequestWithAuth extends Request {
  auth: BetterAuthSessionData | null;
  currentUser: AuthenticatedUser | null;
}
