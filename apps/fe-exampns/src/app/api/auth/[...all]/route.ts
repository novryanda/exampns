import { type NextRequest, NextResponse } from "next/server";

import { BACKEND_API_URL } from "@/lib/auth/config";

const FORWARD_REQUEST_HEADERS = [
  "cookie",
  "content-type",
  "origin",
  "referer",
  "user-agent",
  "x-better-auth-csrf",
  "better-auth-csrf",
] as const;

async function proxyAuth(request: NextRequest, segments: string[]) {
  const path = segments.join("/");
  const targetUrl = `${BACKEND_API_URL}/api/auth/${path}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const backendResponse = await fetch(targetUrl, init);
  const responseHeaders = new Headers(backendResponse.headers);
  const body = await backendResponse.arrayBuffer();

  return new NextResponse(body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

type RouteContext = {
  params: Promise<{ all: string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { all } = await context.params;
  return proxyAuth(request, all);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { all } = await context.params;
  return proxyAuth(request, all);
}
