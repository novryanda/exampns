import { type NextRequest } from "next/server";

import { proxyBackendRequest, SERVER_BACKEND_API_URL } from "@/lib/api/backend-proxy";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type");

  return proxyBackendRequest(`${SERVER_BACKEND_API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: contentType ? { "content-type": contentType } : undefined,
    body: await request.text(),
  });
}
