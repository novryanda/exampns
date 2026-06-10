"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app-config";
import { cn } from "@/lib/utils";

import { LandingAnchorLink } from "./landing-anchor-link";
import { NAV_LINKS } from "./content";
import { landingTheme } from "./landing-theme";

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0]/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <LandingAnchorLink
          href="#beranda"
          className="flex items-center gap-2 font-bold text-[#1d4ed8] text-lg"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#1d4ed8] font-bold text-sm text-white">
            E
          </span>
          {APP_CONFIG.name}
        </LandingAnchorLink>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <LandingAnchorLink
              key={link.href}
              href={link.href}
              className="font-medium text-[#475569] text-sm transition-colors hover:text-[#1d4ed8]"
            >
              {link.label}
            </LandingAnchorLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="text-[#475569] hover:text-[#1d4ed8]">
            <Link href="/auth/login">Masuk</Link>
          </Button>
          <Button asChild className={cn("rounded-full px-5", landingTheme.primary)}>
            <Link href="/auth/register">Daftar Gratis</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-[#e2e8f0] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-[#e2e8f0] border-t bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <LandingAnchorLink
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 font-medium text-[#475569] text-sm hover:bg-[#f1f5f9]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </LandingAnchorLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button asChild className={cn("w-full", landingTheme.primary)}>
              <Link href="/auth/register">Daftar Gratis</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
