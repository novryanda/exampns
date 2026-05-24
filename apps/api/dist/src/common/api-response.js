export const apiData = (data, message) => ({
    success: true,
    data,
    ...(message ? { message } : {}),
});
export const apiMessage = (message) => ({
    success: true,
    message,
});
export const apiPaginated = (data, meta) => ({
    success: true,
    data,
    meta,
});
//# sourceMappingURL=api-response.js.map