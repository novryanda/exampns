import { redirect } from "next/navigation";

import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

export default async function DashboardCompatibilityPage() {
  const profile = await requirePrivilegedProfile();

  if (profile.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  redirect("/super-admin/dashboard");
}
