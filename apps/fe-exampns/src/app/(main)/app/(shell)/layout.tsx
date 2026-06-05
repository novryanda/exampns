import { PrivilegedShell } from "@/app/(main)/_components/privileged-shell";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";

export default async function UserShellLayout({ children }: { readonly children: React.ReactNode }) {
  const currentUser = await requireServerCurrentUserProfile();

  return <PrivilegedShell currentUser={currentUser}>{children}</PrivilegedShell>;
}
