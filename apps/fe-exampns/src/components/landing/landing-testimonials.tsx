import Image from "next/image";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { TESTIMONIALS } from "./content";
import { landingTheme } from "./landing-theme";

export function LandingTestimonials() {
  return (
    <section id="testimoni" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Testimoni</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            Dipercaya Ribuan Calon ASN di Seluruh Indonesia
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className={cn(landingTheme.card, "flex flex-col p-6")}>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[#475569] text-sm italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-[#f1f5f9] border-t pt-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#0f172a] text-sm">{item.name}</p>
                  <p className="text-[#64748b] text-xs">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-2 rounded-full",
                dot === 0 ? "bg-[#1d4ed8]" : "bg-[#cbd5e1]",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
