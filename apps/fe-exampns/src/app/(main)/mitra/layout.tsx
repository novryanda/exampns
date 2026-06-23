import { PrivilegedShell } from "@/app/(main)/_components/privileged-shell";
import { requirePartnerProfile } from "@/lib/auth/server-auth";

export default async function MitraLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requirePartnerProfile();

  return <PrivilegedShell currentUser={currentUser}>{children}</PrivilegedShell>;
}
