import "server-only";

import { headers } from "next/headers";

import { SERVER_BACKEND_API_URL } from "@/lib/api/backend-url";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T;
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export async function serverApiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  const response = await fetch(`${SERVER_BACKEND_API_URL}${path}`, {
    ...init,
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `API request failed: ${path} (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function serverApiUpload<T>(path: string, formData: FormData): Promise<T> {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  const response = await fetch(`${SERVER_BACKEND_API_URL}${path}`, {
    method: "POST",
    headers: cookie ? { cookie } : undefined,
    body: formData,
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `API request failed: ${path} (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function toQueryString(params: Record<string, string | number | boolean | undefined | null>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
