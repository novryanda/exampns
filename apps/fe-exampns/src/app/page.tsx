import { redirect } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect(getPostAuthRedirectPath(session.user.role));
  }

  return <LandingPage />;
}
