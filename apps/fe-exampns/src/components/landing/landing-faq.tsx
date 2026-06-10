"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { FAQ_ITEMS } from "./content";
import { landingTheme } from "./landing-theme";

export function LandingFaq() {
  return (
    <section id="faq" className={cn(landingTheme.sectionAlt, "scroll-mt-16 py-16 sm:py-20")}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={landingTheme.sectionLabel}>FAQ</p>
          <h2 className={cn(landingTheme.heading, "mt-2 text-3xl sm:text-4xl")}>
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-[#e2e8f0] bg-white px-4 first:rounded-t-xl last:rounded-b-xl"
            >
              <AccordionTrigger className="text-left font-medium text-[#0f172a] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className={cn(landingTheme.body, "text-sm")}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
