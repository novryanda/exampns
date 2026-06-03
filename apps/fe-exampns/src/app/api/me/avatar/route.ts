import { type NextRequest, NextResponse } from "next/server";

import { BACKEND_API_URL } from "@/lib/auth/config";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent"] as const;

function buildForwardHeaders(request: NextRequest) {
  const headers = new Headers();

  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  return headers;
}

async function proxyToBackend(request: NextRequest, method: "POST" | "DELETE") {
  const headers = buildForwardHeaders(request);
  const init: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };

  if (method === "POST") {
    init.body = await request.arrayBuffer();
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("content-type", contentType);
    }
  }

  const backendResponse = await fetch(`${BACKEND_API_URL}/api/v1/me/avatar`, init);
  const responseHeaders = new Headers(backendResponse.headers);
  const body = await backendResponse.arrayBuffer();

  return new NextResponse(body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, "POST");
}

export async function DELETE(request: NextRequest) {
  return proxyToBackend(request, "DELETE");
}
