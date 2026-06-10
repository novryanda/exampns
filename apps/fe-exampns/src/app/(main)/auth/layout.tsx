import type { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="bg-white">
      <div className="grid h-dvh justify-center gap-2 p-2 lg:grid-cols-2">
        <div className="relative order-1 flex h-full overflow-hidden rounded-3xl bg-white">
          <div className="absolute top-5 left-5 z-10 sm:top-6 sm:left-6">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Kembali ke halaman utama
              </Link>
            </Button>
          </div>
          {children}
        </div>

        <div className="relative order-2 hidden h-full overflow-hidden rounded-3xl bg-[#eef6ff] lg:block">
          <Image
            src="/auth/authlayout.png"
            alt="ExamCPNS - Persiapan CAT CPNS"
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
      </div>
    </main>
  );
}
