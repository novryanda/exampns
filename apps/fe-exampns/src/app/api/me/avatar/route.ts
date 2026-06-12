import { type NextRequest } from "next/server";

import { buildForwardHeaders, proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

const FORWARD_REQUEST_HEADERS = ["cookie", "origin", "referer", "user-agent"] as const;

async function proxyToBackend(request: NextRequest, method: "POST" | "DELETE") {
  const headers = buildForwardHeaders(request, FORWARD_REQUEST_HEADERS);
  const init: RequestInit = {
    method,
    headers,
  };

  if (method === "POST") {
    init.body = await request.arrayBuffer();
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("content-type", contentType);
    }
  }

  return proxyBackendRequest(`${SERVER_BACKEND_API_URL}/api/v1/me/avatar`, init);
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, "POST");
}

export async function DELETE(request: NextRequest) {
  return proxyToBackend(request, "DELETE");
}
