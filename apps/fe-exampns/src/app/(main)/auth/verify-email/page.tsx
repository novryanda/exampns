import Link from "next/link";
import { redirect } from "next/navigation";

import { APP_CONFIG } from "@/config/app-config";

type VerifyEmailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const error = readParam(params.error);
  const verified = readParam(params.verified);

  const isSuccess = verified === "true";
  const isError = Boolean(error);

  if (isSuccess) {
    redirect("/auth/login?verified=1");
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="space-y-2 text-center">
          <h1 className="font-medium text-3xl">
            {isSuccess ? "Email terverifikasi" : isError ? "Verifikasi gagal" : "Verifikasi email"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isSuccess
              ? "Akun Anda sudah aktif. Silakan login untuk mulai menggunakan ExamCPNS."
              : isError
                ? "Link verifikasi tidak valid atau sudah kedaluwarsa. Daftar ulang atau hubungi admin jika perlu bantuan."
                : "Setelah mengklik link verifikasi di email, Anda akan diarahkan ke halaman login. Lalu masuk dengan akun yang sudah didaftarkan."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={isSuccess ? "/auth/login?verified=1" : "/auth/login"}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-sm font-medium"
          >
            {isSuccess ? "Login sekarang" : "Ke halaman login"}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="text-muted-foreground text-xs">UC-002 Verify Email — ExamCPNS</div>
      </div>
    </>
  );
}
