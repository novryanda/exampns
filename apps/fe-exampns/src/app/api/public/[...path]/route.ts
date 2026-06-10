import { type NextRequest } from "next/server";

import { proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["content-type"] as const;

async function proxyPublicRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string,
) {
  const { path } = await context.params;
  const headers = new Headers();

  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const query = request.nextUrl.search || "";
  const targetUrl = `${SERVER_BACKEND_API_URL}/api/v1/public/${path.join("/")}${query}`;

  return proxyBackendRequest(targetUrl, {
    method,
    headers,
    body: method === "GET" ? undefined : await request.text(),
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPublicRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPublicRequest(request, context, "POST");
}
