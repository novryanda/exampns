import "server-only";

/**
 * URL API untuk request server-side (route handler, RSC).
 * Utamakan API_URL agar tidak ikut URL publik frontend.
 */
export const SERVER_BACKEND_API_URL =
  process.env.API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "http://localhost:3001";
