export type AuthUserRole = "SUPER_ADMIN" | "ADMIN" | "PARTNER" | "USER";

export function readAuthUserRole(user: unknown): AuthUserRole | null {
  if (!user || typeof user !== "object" || !("role" in user)) {
    return null;
  }

  const role = user.role;
  if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "PARTNER" || role === "USER") {
    return role;
  }

  return null;
}

export function getPostAuthRedirectPath(role?: AuthUserRole | string | null) {
  if (role === "SUPER_ADMIN") {
    return "/super-admin/dashboard";
  }

  if (role === "ADMIN") {
    return "/admin/dashboard";
  }

  if (role === "PARTNER") {
    return "/mitra/dashboard";
  }

  return "/app/dashboard";
}
