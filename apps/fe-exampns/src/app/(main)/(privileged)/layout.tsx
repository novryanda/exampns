import { PrivilegedShell } from "@/app/(main)/_components/privileged-shell";
import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

export default async function PrivilegedLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requirePrivilegedProfile();

  return <PrivilegedShell currentUser={currentUser}>{children}</PrivilegedShell>;
}
