import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent"] as const;

export async function GET(request: NextRequest) {
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);

  return proxyBackendRequest(`${SERVER_BACKEND_API_URL}/api/v1/me`, {
    method: "GET",
    headers,
  });
}
