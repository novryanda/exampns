import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { landingTheme } from "./landing-theme";

import { getSubscriptionPlans } from "@/server/user-dashboard-data";

export async function LandingPaket() {
  const plansData = await getSubscriptionPlans(true).catch(() => []);
  // Sort plans so we can display them nicely (e.g. cheapest first)
  const sortedPlans = plansData ? [...plansData].sort((a, b) => a.price - b.price) : [];
  return (
    <section id="paket" className={cn(landingTheme.sectionAlt, "scroll-mt-16 py-16 sm:py-20")}>
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
          {sortedPlans.length > 0 ? (
            sortedPlans.map((pkg) => (
              <article
                key={pkg.id}
                className={cn(
                  landingTheme.card,
                  "relative flex flex-col p-6",
                  pkg.isPopular && "border-[#1d4ed8] ring-2 ring-[#1d4ed8]/20",
                )}
              >
                {pkg.isPopular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1d4ed8] px-3 py-0.5 font-semibold text-white text-xs">
                    Paling Populer
                  </span>
                ) : null}
                <h3 className="font-bold text-[#0f172a] text-xl">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-bold text-3xl text-[#1d4ed8]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: pkg.currency || "IDR",
                      maximumFractionDigits: 0,
                    }).format(pkg.price)}
                  </span>
                  <span className="text-[#64748b] text-sm">
                    {pkg.durationDays > 0 ? `/${pkg.durationDays} hari` : "selamanya"}
                  </span>
                </div>
                <p className={cn(landingTheme.body, "mt-3 text-sm")}>{pkg.description}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {pkg.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#475569] text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1d4ed8]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "mt-6 w-full rounded-full",
                    pkg.isPopular ? landingTheme.primary : landingTheme.primaryOutline,
                  )}
                  variant={pkg.isPopular ? "default" : "outline"}
                >
                  <Link href="/auth/register">Pilih {pkg.name}</Link>
                </Button>
              </article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              Belum ada paket yang tersedia.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
