import { createAuthClient } from "better-auth/react";

import { BACKEND_API_URL } from "@/lib/auth/config";

export const authClient = createAuthClient({
  baseURL: BACKEND_API_URL,
});

export const { signIn, signOut, signUp, useSession, getSession } = authClient;
