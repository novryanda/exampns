import { redirect } from "next/navigation";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";

export default async function Layout() {
  const currentUser = await requireServerCurrentUserProfile();

  if (currentUser.role === "USER") {
    redirect("/unauthorized");
  }

  redirect(currentUser.role === "ADMIN" ? "/admin/dashboard" : "/super-admin/dashboard");
}
