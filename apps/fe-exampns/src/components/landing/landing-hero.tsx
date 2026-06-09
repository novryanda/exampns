import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { HERO_TRUST_ITEMS } from "./content";
import { LANDING_ASSETS } from "./landing-asset-kit";
import { landingTheme } from "./landing-theme";

function HeroStatsBar() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-[#e8eef5] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.1)]">
      <div className="flex flex-1 items-center justify-between gap-2 px-4 py-3.5 sm:px-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0f172a] text-sm">Simulasi CAT</span>
            <span className="rounded-md bg-[#dcfce7] px-1.5 py-0.5 font-bold text-[#16a34a] text-[10px] uppercase">
              Live
            </span>
          </div>
          <p className="mt-0.5 font-bold text-3xl text-[#1d4ed8] leading-none">442</p>
        </div>
        <svg viewBox="0 0 64 32" className="h-8 w-16 shrink-0 opacity-80" aria-hidden>
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="2,26 12,22 22,24 32,14 42,16 52,8 62,4"
          />
        </svg>
      </div>

      <div className="w-px bg-[#e8eef5]" />

      <div className="flex flex-1 items-center justify-between gap-2 px-4 py-3.5 sm:px-5">
        <div>
          <p className="font-semibold text-[#0f172a] text-sm">Pengguna Aktif</p>
          <p className="mt-0.5 text-[#0f172a] text-sm leading-snug">
            <span className="font-bold text-[#16a34a]">+12.450</span>{" "}
            <span className="text-[#64748b]">Pengguna</span>
          </p>
        </div>
        <div className="flex h-8 items-end gap-0.5">
          {[35, 50, 40, 65, 55, 70, 45].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-sm bg-[#dbeafe]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroVisualPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
      <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-[#bfdbfe]/60 bg-gradient-to-b from-[#eef6ff] via-[#e8f2ff] to-[#dbeafe] shadow-[0_4px_24px_rgba(59,130,246,0.08)] sm:min-h-[440px] lg:min-h-[480px]">
        {/* Sky & atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ffffff_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute top-6 left-8 h-3 w-16 rounded-full bg-white/50 blur-[1px]" />
        <div className="pointer-events-none absolute top-10 right-12 h-2.5 w-12 rounded-full bg-white/40 blur-[1px]" />
        <div className="pointer-events-none absolute top-16 left-1/3 h-2 w-10 rounded-full bg-white/35" />

        {/* Faint city silhouette */}
        <div className="pointer-events-none absolute top-[18%] right-[8%] flex items-end gap-1 opacity-20">
          {[28, 40, 32, 48, 36].map((h, i) => (
            <div key={i} className="w-3 rounded-t-sm bg-[#64748b]" style={{ height: h }} />
          ))}
        </div>

        {/* Building */}
        <div className="absolute bottom-[72px] left-1/2 z-[1] h-[68%] w-[118%] -translate-x-1/2 sm:bottom-[80px] sm:w-[125%] lg:w-[130%]">
          <Image
            src={LANDING_ASSETS.heroHouse}
            alt=""
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </div>

        {/* People — in front of building, behind stats bar */}
        <div className="absolute bottom-[56px] left-1/2 z-[2] h-[62%] w-[108%] -translate-x-1/2 drop-shadow-[0_12px_24px_rgba(30,58,138,0.15)] sm:bottom-[64px] sm:h-[66%]">
          <Image
            src={LANDING_ASSETS.heroPeople}
            alt="Ilustrasi calon ASN berlatih persiapan CPNS"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 95vw, 45vw"
          />
        </div>

        {/* Stats bar — topmost layer, covers lower torso */}
        <div className="absolute inset-x-3 bottom-3 z-[3] sm:inset-x-4 sm:bottom-4">
          <HeroStatsBar />
        </div>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <section id="beranda" className="relative overflow-visible bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,#dbeafe_0%,transparent_50%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-14">
        <div className="z-10 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#dbeafe] px-4 py-1.5 font-semibold text-[#1d4ed8] text-xs uppercase tracking-wide">
            Platform #1 Persiapan CAT CPNS
          </span>

          <h1 className={cn(landingTheme.heading, "text-4xl leading-tight sm:text-5xl lg:text-[2.75rem]")}>
            Persiapan CAT PNS Jadi Lebih Terarah dan{" "}
            <span className="text-[#1d4ed8]">Siap Bersaing!</span>
          </h1>

          <p className={cn(landingTheme.body, "max-w-xl text-base sm:text-lg")}>
            Ribuan soal berkualitas, simulasi CAT sesungguhnya, dan analisis mendalam untuk
            memaksimalkan peluang lolos SKD CPNS Anda.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className={cn("rounded-full px-6 shadow-md", landingTheme.primary)}>
              <Link href="/auth/register">Mulai Simulasi Gratis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#cbd5e1] bg-white px-6 text-[#334155] shadow-sm hover:bg-[#f8fafc]"
            >
              <Link href="#paket">Lihat Paket</Link>
            </Button>
          </div>

          <ul className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-6">
            {HERO_TRUST_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-[#475569] text-sm">
                <Image src={item.icon} alt="" width={32} height={32} className="size-8 shrink-0" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisualPanel />
      </div>
    </section>
  );
}
