export type AuthUserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export function getPostAuthRedirectPath(role?: AuthUserRole | string | null) {
  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    return "/dashboard";
  }

  return "/";
}
