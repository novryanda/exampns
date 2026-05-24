import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/lib/auth/server-auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  redirect(session?.user ? "/dashboard" : "/auth/login");
}
