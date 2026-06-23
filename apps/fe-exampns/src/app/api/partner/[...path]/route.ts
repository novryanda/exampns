import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent", "content-type"] as const;

async function proxyPartnerRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string,
) {
  const { path } = await context.params;
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);
  const query = request.nextUrl.search || "";

  return proxyBackendRequest(`${SERVER_BACKEND_API_URL}/api/v1/partner/${path.join("/")}${query}`, {
    method,
    headers,
    body: method === "GET" ? undefined : await request.arrayBuffer(),
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPartnerRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPartnerRequest(request, context, "POST");
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPartnerRequest(request, context, "PATCH");
}
