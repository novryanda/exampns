import "server-only";

import { NextResponse } from "next/server";

import { SERVER_BACKEND_API_URL } from "@/lib/api/backend-url";

const STRIPPED_RESPONSE_HEADERS = [
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
] as const;

export { SERVER_BACKEND_API_URL };

export async function proxyBackendRequest(
  targetUrl: string,
  init: RequestInit,
): Promise<NextResponse> {
  try {
    const backendResponse = await fetch(targetUrl, {
      ...init,
      cache: "no-store",
    });

    const responseHeaders = new Headers(backendResponse.headers);

    for (const name of STRIPPED_RESPONSE_HEADERS) {
      responseHeaders.delete(name);
    }

    const body = await backendResponse.arrayBuffer();

    return new NextResponse(body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";

    return NextResponse.json(
      {
        success: false,
        message: `Tidak dapat terhubung ke API backend (${detail})`,
      },
      { status: 502 },
    );
  }
}
