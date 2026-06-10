import Image from "next/image";
import { Star } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

import { TESTIMONIALS } from "./content";
import { landingTheme } from "./landing-theme";

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <article
      className={cn(
        landingTheme.card,
        "flex w-[300px] shrink-0 flex-col p-6 sm:w-[340px]",
      )}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-[#fbbf24] text-[#fbbf24]" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[#475569] text-sm italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-[#f1f5f9] border-t pt-4">
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-[#0f172a] text-sm">{name}</p>
          <p className="text-[#64748b] text-xs">{role}</p>
        </div>
      </div>
    </article>
  );
}

export function LandingTestimonials() {
  return (
    <section id="testimoni" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Testimoni</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            Telah Dipercaya Ribuan Calon ASN di Seluruh Indonesia
          </h2>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.25rem] sm:[--gap:1.5rem]">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
