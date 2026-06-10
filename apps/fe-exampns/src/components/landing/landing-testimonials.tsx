"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import { TESTIMONIALS } from "./content";
import { landingTheme } from "./landing-theme";

const AUTOPLAY_MS = 3500;

export function LandingTestimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [api]);

  return (
    <section id="testimoni" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={landingTheme.sectionLabel}>Testimoni</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            Telah Dipercaya Ribuan Calon ASN di Seluruh Indonesia
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="mt-12"
        >
          <CarouselContent className="-ml-4">
            {TESTIMONIALS.map((item) => (
              <CarouselItem key={item.name} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                <article className={cn(landingTheme.card, "flex h-full flex-col p-6")}>
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
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#0f172a] text-sm">{item.name}</p>
                      <p className="text-[#64748b] text-xs">{item.role}</p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Testimoni ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === activeIndex ? "bg-[#1d4ed8]" : "bg-[#cbd5e1]",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
