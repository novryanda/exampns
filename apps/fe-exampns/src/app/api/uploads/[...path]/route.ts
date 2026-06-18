import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent"] as const;

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  const queryString = searchParams.toString();
  const backendUrl = `${SERVER_BACKEND_API_URL}/api/v1/uploads/${path.join("/")}${queryString ? `?${queryString}` : ""}`;

  return proxyBackendRequest(backendUrl, {
    method: "GET",
    headers,
  });
}
