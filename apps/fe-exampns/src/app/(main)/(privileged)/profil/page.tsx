import { PrivilegedProfilePage } from "@/app/(main)/_components/privileged-profile-page";
import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

export default async function PrivilegedProfileRoute() {
  const profile = await requirePrivilegedProfile();

  return <PrivilegedProfilePage profile={profile} />;
}
