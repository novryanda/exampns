import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { landingTheme } from "./landing-theme";

const PACKAGES = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "selamanya",
    description: "Coba platform dan rasakan simulasi CAT pertama Anda.",
    features: ["1 simulasi CAT", "Analisis skor dasar", "Akses 50 soal latihan"],
    highlighted: false,
    cta: "Mulai Gratis",
    href: "/auth/register",
  },
  {
    name: "Pro",
    price: "Rp 99.000",
    period: "/bulan",
    description: "Paket lengkap untuk persiapan intensif SKD CPNS.",
    features: [
      "Simulasi CAT unlimited",
      "Analisis & prediksi skor",
      "Rekomendasi AI personal",
      "10.000+ bank soal",
      "Leaderboard nasional",
    ],
    highlighted: true,
    cta: "Pilih Pro",
    href: "/auth/register",
  },
  {
    name: "Premium",
    price: "Rp 249.000",
    period: "/3 bulan",
    description: "Hemat lebih banyak untuk persiapan jangka panjang.",
    features: [
      "Semua fitur Pro",
      "Tryout mingguan live",
      "Konsultasi strategi belajar",
      "Sertifikat latihan",
      "Prioritas support",
    ],
    highlighted: false,
    cta: "Pilih Premium",
    href: "/auth/register",
  },
] as const;

export function LandingPaket() {
  return (
    <section id="paket" className={cn(landingTheme.sectionAlt, "py-16 sm:py-20")}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Paket</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            Pilih Paket Sesuai Kebutuhan Anda
          </h2>
          <p className={cn(landingTheme.body, "mt-4")}>
            Mulai gratis, upgrade kapan saja untuk akses fitur lengkap.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={cn(
                landingTheme.card,
                "relative flex flex-col p-6",
                pkg.highlighted && "border-[#1d4ed8] ring-2 ring-[#1d4ed8]/20",
              )}
            >
              {pkg.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1d4ed8] px-3 py-0.5 font-semibold text-white text-xs">
                  Paling Populer
                </span>
              ) : null}
              <h3 className="font-bold text-[#0f172a] text-xl">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-bold text-3xl text-[#1d4ed8]">{pkg.price}</span>
                <span className="text-[#64748b] text-sm">{pkg.period}</span>
              </div>
              <p className={cn(landingTheme.body, "mt-3 text-sm")}>{pkg.description}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[#475569] text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1d4ed8]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={cn(
                  "mt-6 w-full rounded-full",
                  pkg.highlighted ? landingTheme.primary : landingTheme.primaryOutline,
                )}
                variant={pkg.highlighted ? "default" : "outline"}
              >
                <Link href={pkg.href}>{pkg.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
