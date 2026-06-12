
export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterSuccessData {
  userId: string;
  email: string;
  emailVerified: boolean;
}

interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  error?: {
    code?: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export class RegisterApiError extends Error {
  readonly code?: string;
  readonly details?: Array<{ field: string; message: string }>;

  constructor(message: string, code?: string, details?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = "RegisterApiError";
    this.code = code;
    this.details = details;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccessResponse<T> | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const errorPayload = payload as ApiErrorResponse;
    throw new RegisterApiError(
      errorPayload.message ?? "Permintaan gagal.",
      errorPayload.error?.code,
      errorPayload.error?.details,
    );
  }

  return (payload as ApiSuccessResponse<T>).data;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  return parseResponse<RegisterSuccessData>(response);
}
