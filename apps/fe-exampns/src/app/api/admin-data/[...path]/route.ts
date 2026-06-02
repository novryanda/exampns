import { type NextRequest, NextResponse } from "next/server";

import { BACKEND_API_URL } from "@/lib/auth/config";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent"] as const;

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const headers = new Headers();

  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  const scope = searchParams.get("scope") === "super-admin" ? "super-admin" : "admin";
  searchParams.delete("scope");
  const queryString = searchParams.toString();
  const backendUrl = `${BACKEND_API_URL}/api/v1/${scope}/${path.join("/")}${queryString ? `?${queryString}` : ""}`;
  const backendResponse = await fetch(backendUrl, {
    method: "GET",
    headers,
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
