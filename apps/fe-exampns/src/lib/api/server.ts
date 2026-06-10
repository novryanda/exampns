import "server-only";

import { headers } from "next/headers";

import { SERVER_BACKEND_API_URL } from "@/lib/api/backend-url";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T;
  meta: PaginationMeta;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function getRequestHeaders() {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  return {
    ...(cookie ? { cookie } : {}),
  };
}

async function apiFetch<T>(path: string) {
  const response = await fetch(`${SERVER_BACKEND_API_URL}${path}`, {
    method: "GET",
    headers: await getRequestHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Request to backend failed";

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // Ignore non-json payloads.
    }

    throw new ApiClientError(message, response.status);
  }

  return (await response.json()) as T;
}

export async function fetchApiData<T>(path: string) {
  const payload = await apiFetch<ApiSuccessResponse<T>>(path);
  return payload.data;
}

export async function fetchApiPaginated<T>(path: string) {
  return await apiFetch<ApiPaginatedResponse<T>>(path);
}
