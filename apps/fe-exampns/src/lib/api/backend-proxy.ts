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

export function buildForwardHeaders(
  request: Request,
  headerNames: readonly string[],
): Headers {
  const headers = new Headers();

  for (const name of headerNames) {
    const value = request.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  return headers;
}

function rewriteSetCookieForFrontend(setCookie: string) {
  return setCookie.replace(/;\s*Domain=[^;]*/gi, "");
}

function getSetCookieHeaders(response: Response) {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers.getSetCookie();
  }

  const setCookie = response.headers.get("set-cookie");
  return setCookie ? [setCookie] : [];
}

function buildProxyResponseHeaders(backendResponse: Response, rewriteCookies: boolean) {
  const responseHeaders = new Headers();

  backendResponse.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();

    if (STRIPPED_RESPONSE_HEADERS.includes(normalizedKey as (typeof STRIPPED_RESPONSE_HEADERS)[number])) {
      return;
    }

    if (normalizedKey === "set-cookie") {
      return;
    }

    responseHeaders.set(key, value);
  });

  for (const setCookie of getSetCookieHeaders(backendResponse)) {
    responseHeaders.append(
      "set-cookie",
      rewriteCookies ? rewriteSetCookieForFrontend(setCookie) : setCookie,
    );
  }

  return responseHeaders;
}

export async function proxyBackendRequest(
  targetUrl: string,
  init: RequestInit,
  options?: { rewriteCookies?: boolean },
): Promise<NextResponse> {
  try {
    const backendResponse = await fetch(targetUrl, {
      ...init,
      cache: "no-store",
    });

    const body = await backendResponse.arrayBuffer();

    return new NextResponse(body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: buildProxyResponseHeaders(backendResponse, options?.rewriteCookies ?? false),
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
