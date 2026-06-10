import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { LANDING_ASSETS } from "./landing-asset-kit";

export function LandingCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(29,78,216,0.25)]">
          <Image
            src={LANDING_ASSETS.ctaBackground}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
          />
          <div className="relative grid items-stretch lg:grid-cols-2">
            <div className="relative order-2 min-h-[180px] sm:min-h-[240px] lg:order-1 lg:min-h-[320px]">
              <Image
                src={LANDING_ASSETS.cta}
                alt="Calon ASN siap menghadapi ujian"
                fill
                className="object-contain object-bottom px-3 pb-0 pt-1 translate-y-1 sm:object-[50%_115%] sm:px-6 sm:pt-4 sm:translate-y-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-1 flex flex-col justify-center space-y-4 px-5 py-8 text-center sm:space-y-6 sm:px-6 sm:py-10 sm:text-left lg:px-10 lg:py-12">
              <h2 className="font-bold text-2xl text-white tracking-tight sm:text-3xl lg:text-4xl">
                Siap Mengukur Kesiapan Anda Hari Ini?
              </h2>
              <p className="text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_4px_rgba(15,23,42,0.45)] sm:text-base lg:text-lg">
                Bergabung dengan ribuan calon ASN yang telah mempercayai ExamCPNS sebagai partner
                persiapan SKD. Mulai simulasi gratis sekarang!
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-white px-6 text-[#1d4ed8] hover:bg-blue-50 sm:w-auto"
                >
                  <Link href="/auth/register">Mulai Simulasi Gratis</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white/60 bg-transparent px-6 text-white hover:bg-white/10 sm:w-auto"
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
