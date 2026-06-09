import Image from "next/image";

import { cn } from "@/lib/utils";

import { STEPS } from "./content";
import { landingTheme } from "./landing-theme";

export function LandingSteps() {
  return (
    <section id="cara-kerja" className={cn(landingTheme.sectionAlt, "py-16 sm:py-20")}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Cara Kerja</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            4 Langkah Mudah Menuju Skor Maksimal
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <article
              key={step.step}
              className={cn(landingTheme.card, "flex flex-col overflow-hidden p-5 text-center")}
            >
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#1d4ed8] font-bold text-white">
                {step.step}
              </div>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[180px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain"
                  sizes="180px"
                />
              </div>
              <h3 className="mt-4 font-semibold text-[#0f172a]">{step.title}</h3>
              <p className={cn(landingTheme.body, "mt-2 text-sm")}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
