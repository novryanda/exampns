import { PrivilegedShell } from "@/app/(main)/_components/privileged-shell";
import { requireSuperAdminProfile } from "@/lib/auth/server-auth";

export default async function SuperAdminLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireSuperAdminProfile();

  return <PrivilegedShell currentUser={currentUser}>{children}</PrivilegedShell>;
}
