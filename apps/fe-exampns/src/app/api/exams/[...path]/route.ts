import { type NextRequest, NextResponse } from "next/server";

import { BACKEND_API_URL } from "@/lib/auth/config";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent", "content-type"] as const;

async function proxyExamRequest(
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
  const backendResponse = await fetch(`${BACKEND_API_URL}/api/v1/exams/${path.join("/")}${query}`, {
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
  return proxyExamRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyExamRequest(request, context, "POST");
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyExamRequest(request, context, "PUT");
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyExamRequest(request, context, "PATCH");
}
