import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";
import { getPostAuthRedirectPath } from "@/lib/auth/post-auth-redirect";
import { getServerAuthSession } from "@/lib/auth/server-auth";

import { ResetPasswordForm } from "../_components/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect(getPostAuthRedirectPath(session.user.role));
  }

  const params = await searchParams;
  const token = readParam(params.token);
  const error = readParam(params.error);

  const hasInvalidToken = error === "INVALID_TOKEN" || !token;

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">Atur password</h1>
          <p className="text-muted-foreground text-sm">
            {hasInvalidToken
              ? "Link tidak valid atau sudah kedaluwarsa. Minta link baru ke admin."
              : "Buat password baru untuk akun ExamCPNS Anda."}
          </p>
        </div>
        <div className="space-y-6">
          {hasInvalidToken ? (
            <div className="text-center text-sm">
              <Link prefetch={false} className="text-foreground underline" href="/auth/login">
                Kembali ke halaman masuk
              </Link>
            </div>
          ) : (
            <ResetPasswordForm token={token} />
          )}
        </div>
      </div>

      <div className="absolute top-5 flex w-full justify-end px-10">
        <div className="text-muted-foreground text-sm">
          Sudah punya password?{" "}
          <Link prefetch={false} className="text-foreground" href="/auth/login">
            Masuk
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-xs">Atur password akun baru.</div>
      </div>
    </>
  );
}
