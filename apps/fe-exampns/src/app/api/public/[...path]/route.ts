import { type NextRequest, NextResponse } from "next/server";

import { BACKEND_API_URL } from "@/lib/auth/config";

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
  const backendResponse = await fetch(`${BACKEND_API_URL}/api/v1/public/${path.join("/")}${query}`, {
    method,
    headers,
    body: method === "GET" ? undefined : await request.text(),
    cache: "no-store",
  });

  const responseHeaders = new Headers(backendResponse.headers);
  const body = await backendResponse.arrayBuffer();

  return new NextResponse(body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPublicRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyPublicRequest(request, context, "POST");
}
