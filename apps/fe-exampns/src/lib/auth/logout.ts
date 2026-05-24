"use client";

import { signOut } from "@/lib/auth/auth-client";
import { AUTH_COOKIE_PREFIX } from "@/lib/auth/config";
import { deleteClientCookie } from "@/lib/cookie.client";

function clearAuthCookies() {
  if (typeof document === "undefined") {
    return;
  }

  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (name?.startsWith(AUTH_COOKIE_PREFIX)) {
      deleteClientCookie(name);
    }
  }
}

export async function performLogout() {
  const { error } = await signOut();

  clearAuthCookies();

  if (error) {
    return {
      success: false as const,
      message: error.message ?? "Logout gagal. Silakan coba lagi.",
    };
  }

  return { success: true as const };
}
