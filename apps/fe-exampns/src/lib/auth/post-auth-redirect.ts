export type AuthUserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export function getPostAuthRedirectPath(role?: AuthUserRole | string | null) {
  if (role === "SUPER_ADMIN") {
    return "/super-admin/dashboard";
  }

  if (role === "ADMIN") {
    return "/admin/dashboard";
  }

  return "/app/dashboard";
}
