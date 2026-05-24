import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_PREFIX } from "@/lib/auth/config";

const authRoutes = new Set(["/auth/login", "/auth/register", "/auth/verify-email"]);

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_COOKIE_PREFIX,
  });

  const { pathname } = request.nextUrl;

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (sessionCookie && authRoutes.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(sessionCookie ? "/dashboard" : "/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
