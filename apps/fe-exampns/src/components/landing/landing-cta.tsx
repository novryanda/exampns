import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { LANDING_ASSETS } from "./landing-asset-kit";

export function LandingCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#1d4ed8] shadow-[0_8px_32px_rgba(29,78,216,0.25)]">
          <div className="grid items-stretch lg:grid-cols-2">
            <div className="relative min-h-[260px] bg-[#1e3a8a] sm:min-h-[300px] lg:min-h-[320px]">
              <Image
                src={LANDING_ASSETS.cta}
                alt="Calon ASN siap menghadapi ujian"
                fill
                className="object-contain object-bottom p-4 sm:p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6 px-6 py-10 lg:px-10 lg:py-12">
              <h2 className="font-bold text-3xl text-white tracking-tight sm:text-4xl">
                Siap Mengukur Kesiapan Anda Hari Ini?
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Bergabung dengan ribuan calon ASN yang telah mempercayai ExamCPNS sebagai partner
                persiapan SKD. Mulai simulasi gratis sekarang!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-6 text-[#1d4ed8] hover:bg-blue-50"
                >
                  <Link href="/auth/register">Mulai Simulasi Gratis</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/60 bg-transparent px-6 text-white hover:bg-white/10"
                >
                  <Link href="#paket">Lihat Paket</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
