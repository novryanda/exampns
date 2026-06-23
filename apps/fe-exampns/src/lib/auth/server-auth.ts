import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SERVER_BACKEND_API_URL } from "@/lib/api/backend-url";

interface BetterAuthSessionPayload {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    phone?: string | null;
    role?: "SUPER_ADMIN" | "ADMIN" | "PARTNER" | "USER";
    status?: "active" | "inactive" | "suspended";
    emailVerified?: boolean;
  };
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface CurrentUserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "PARTNER" | "USER";
  status: "active" | "inactive" | "suspended";
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PrivilegedRole = "SUPER_ADMIN" | "ADMIN" | "PARTNER";

async function getRequestCookieHeader() {
  const requestHeaders = await headers();
  return requestHeaders.get("cookie") ?? "";
}

async function fetchJson<T>(path: string) {
  const cookie = await getRequestCookieHeader();

  const response = await fetch(`${SERVER_BACKEND_API_URL}${path}`, {
    method: "GET",
    headers: cookie ? { cookie } : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

export async function getServerAuthSession() {
  return await fetchJson<BetterAuthSessionPayload | null>("/api/auth/get-session");
}

export async function requireServerAuthSession() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return session;
}

export async function getServerCurrentUserProfile() {
  const payload = await fetchJson<ApiSuccessResponse<CurrentUserProfile>>("/api/v1/me");
  return payload?.data ?? null;
}

export async function requireServerCurrentUserProfile() {
  await requireServerAuthSession();

  const profile = await getServerCurrentUserProfile();
  if (!profile) {
    redirect("/auth/login");
  }

  return profile;
}

export async function requirePrivilegedProfile() {
  const profile = await requireServerCurrentUserProfile();

  if (profile.role !== "SUPER_ADMIN" && profile.role !== "ADMIN" && profile.role !== "PARTNER") {
    redirect("/unauthorized");
  }

  return profile;
}

export async function requireAdminProfile() {
  const profile = await requirePrivilegedProfile();

  if (profile.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return profile;
}

export async function requireSuperAdminProfile() {
  const profile = await requirePrivilegedProfile();

  if (profile.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return profile;
}

export async function requirePartnerProfile() {
  const profile = await requirePrivilegedProfile();

  if (profile.role !== "PARTNER") {
    redirect("/unauthorized");
  }

  return profile;
}
