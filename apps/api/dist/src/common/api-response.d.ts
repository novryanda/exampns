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
export declare const apiData: <T>(data: T, message?: string) => ApiSuccessResponse<T>;
export declare const apiMessage: (message: string) => ApiMessageResponse;
export declare const apiPaginated: <T>(data: T, meta: PaginationMeta) => ApiPaginatedResponse<T>;
