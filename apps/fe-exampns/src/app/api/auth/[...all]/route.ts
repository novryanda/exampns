import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

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
  const targetUrl = `${SERVER_BACKEND_API_URL}/api/auth/${path}${request.nextUrl.search}`;
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  return proxyBackendRequest(targetUrl, init, { rewriteCookies: true });
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
