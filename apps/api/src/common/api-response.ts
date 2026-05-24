export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiMessageResponse {
  success: true;
  message: string;
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

export const apiData = <T>(data: T, message?: string): ApiSuccessResponse<T> => ({
  success: true,
  data,
  ...(message ? { message } : {}),
});

export const apiMessage = (message: string): ApiMessageResponse => ({
  success: true,
  message,
});

export const apiPaginated = <T>(
  data: T,
  meta: PaginationMeta,
): ApiPaginatedResponse<T> => ({
  success: true,
  data,
  meta,
});
