import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = [
  "cookie",
  "origin",
  "referer",
  "user-agent",
  "content-type",
  "x-idempotency-key",
] as const;

async function proxyPaymentRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string,
) {
  const { path } = await context.params;
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);
  const query = request.nextUrl.search || "";

  return proxyBackendRequest(`${SERVER_BACKEND_API_URL}/api/v1/payments/${path.join("/")}${query}`, {
    method,
    headers,
    body: method === "GET" ? undefined : await request.arrayBuffer(),
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPaymentRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPaymentRequest(request, context, "POST");
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPaymentRequest(request, context, "PUT");
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPaymentRequest(request, context, "PATCH");
}
