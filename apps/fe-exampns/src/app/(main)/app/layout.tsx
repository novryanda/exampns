import { redirect } from "next/navigation";

import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";

export default async function AppLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireServerCurrentUserProfile();

  if (currentUser.role !== "USER") {
    redirect(
      currentUser.role === "ADMIN"
        ? "/admin/dashboard"
        : currentUser.role === "PARTNER"
          ? "/mitra/dashboard"
          : "/super-admin/dashboard",
    );
  }

  return <>{children}</>;
}
