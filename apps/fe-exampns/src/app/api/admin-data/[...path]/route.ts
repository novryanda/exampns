import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent", "content-type"] as const;

async function proxyAdminRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string,
) {
  const { path } = await context.params;
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  const scope = searchParams.get("scope") === "super-admin" ? "super-admin" : "admin";
  searchParams.delete("scope");
  const queryString = searchParams.toString();
  const backendUrl = `${SERVER_BACKEND_API_URL}/api/v1/${scope}/${path.join("/")}${queryString ? `?${queryString}` : ""}`;

  return proxyBackendRequest(backendUrl, {
    method,
    headers,
    body: method === "GET" ? undefined : await request.text(),
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyAdminRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyAdminRequest(request, context, "POST");
}
