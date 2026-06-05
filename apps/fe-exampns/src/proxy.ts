import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { BACKEND_API_URL } from "@/lib/auth/config";
import { AUTH_COOKIE_PREFIX } from "@/lib/auth/config";

const guestOnlyAuthRoutes = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
]);

interface ProxySessionPayload {
  user?: {
    role?: "SUPER_ADMIN" | "ADMIN" | "USER";
  } | null;
}

async function getSessionPayload(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");

  const response = await fetch(`${BACKEND_API_URL}/api/auth/get-session`, {
    method: "GET",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as ProxySessionPayload | null;
}

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_COOKIE_PREFIX,
  });

  const { pathname } = request.nextUrl;

  if (
    !sessionCookie &&
    (pathname.startsWith("/app") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/super-admin") ||
      pathname === "/profil")
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (sessionCookie && guestOnlyAuthRoutes.has(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    sessionCookie &&
    (pathname.startsWith("/admin") || pathname.startsWith("/super-admin") || pathname === "/profil")
  ) {
    const session = await getSessionPayload(request);
    const role = session?.user?.role;

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/super-admin") && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname === "/profil" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/app/:path*", "/dashboard/:path*", "/admin/:path*", "/super-admin/:path*", "/profil"],
};
