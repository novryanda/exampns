import { createAuthClient } from "better-auth/react";

import { FRONTEND_APP_URL } from "@/lib/auth/config";

function resolveAuthBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return FRONTEND_APP_URL;
}

export const authClient = createAuthClient({
  baseURL: resolveAuthBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession, getSession } = authClient;
