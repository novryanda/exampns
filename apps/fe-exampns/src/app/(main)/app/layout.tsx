import { redirect } from "next/navigation";

import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";

export default async function AppLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireServerCurrentUserProfile();

  if (currentUser.role !== "USER") {
    redirect(currentUser.role === "ADMIN" ? "/admin/dashboard" : "/super-admin/dashboard");
  }

  return <>{children}</>;
}
