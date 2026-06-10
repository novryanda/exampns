import Image from "next/image";

import { cn } from "@/lib/utils";

import { FEATURES } from "./content";
import { landingTheme } from "./landing-theme";

export function LandingFeatures() {
  return (
    <section id="fitur" className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Fitur Unggulan</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-2xl sm:text-4xl")}>
            Semua yang Anda Butuhkan untuk Lolos SKD CPNS
          </h2>
          <p className={cn(landingTheme.body, "mt-4")}>
            Platform lengkap dengan fitur-fitur canggih untuk memaksimalkan persiapan ujian Anda.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                landingTheme.card,
                "flex flex-col items-center p-5 text-center transition-shadow hover:shadow-md sm:p-8 lg:p-10",
              )}
            >
              <div className="mb-4 flex h-32 w-full items-center justify-center sm:mb-6 sm:h-44 md:h-48">
                <Image
                  src={feature.icon}
                  alt=""
                  width={200}
                  height={200}
                  className="h-full max-h-44 w-auto max-w-[85%] object-contain sm:max-h-48"
                />
              </div>
              <h3 className="font-bold text-[#0f172a] text-lg sm:text-xl">{feature.title}</h3>
              <p className={cn(landingTheme.body, "mt-3 max-w-xs text-sm leading-relaxed")}>
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
