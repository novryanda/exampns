export interface ClientPaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ClientPaginatedResponse<T> {
  success: true;
  data: T;
  meta: ClientPaginationMeta;
}

function toQueryString(params: Record<string, string | number | boolean | undefined | null>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function fetchAdminData<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>,
  options?: { scope?: "admin" | "super-admin" },
): Promise<T> {
  const response = await fetch(
    `/api/admin-data/${path}${toQueryString({
      ...(params ?? {}),
      ...(options?.scope ? { scope: options.scope } : {}),
    })}`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
    },
  );

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
