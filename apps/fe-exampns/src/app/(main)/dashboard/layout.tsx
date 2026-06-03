import { redirect } from "next/navigation";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";

export default async function Layout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireServerCurrentUserProfile();

  if (currentUser.role === "USER") {
    return <>{children}</>;
  }

  redirect(currentUser.role === "ADMIN" ? "/admin/dashboard" : "/super-admin/dashboard");
}
