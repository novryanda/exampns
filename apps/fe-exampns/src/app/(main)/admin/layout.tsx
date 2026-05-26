import { PrivilegedShell } from "@/app/(main)/_components/privileged-shell";
import { requireAdminProfile } from "@/lib/auth/server-auth";

export default async function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireAdminProfile();

  return <PrivilegedShell currentUser={currentUser}>{children}</PrivilegedShell>;
}
