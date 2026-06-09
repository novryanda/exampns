import Link from "next/link";
import { siInstagram, siTiktok, siX, siYoutube } from "simple-icons";

import { SimpleIcon } from "@/components/ui/simple-icon";
import { APP_CONFIG } from "@/config/app-config";

import { FOOTER_LINKS } from "./content";

const SOCIAL_LINKS = [
  { icon: siX, href: "#", label: "X" },
  { icon: siInstagram, href: "#", label: "Instagram" },
  { icon: siYoutube, href: "#", label: "YouTube" },
  { icon: siTiktok, href: "#", label: "TikTok" },
] as const;

export function LandingFooter() {
  return (
    <footer className="border-[#e2e8f0] border-t bg-white pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="#beranda" className="flex items-center gap-2 font-bold text-[#1d4ed8] text-lg">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#1d4ed8] font-bold text-sm text-white">
                E
              </span>
              {APP_CONFIG.name}
            </Link>
            <p className="mt-4 max-w-xs text-[#64748b] text-sm leading-relaxed">
              Platform persiapan CAT CPNS terpercaya dengan simulasi sesungguhnya, analisis mendalam,
              dan rekomendasi belajar berbasis AI.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#64748b] transition-colors hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                >
                  <SimpleIcon icon={icon} className="size-4 fill-current" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#0f172a] text-sm">Produk</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.produk.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#64748b] text-sm hover:text-[#1d4ed8]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#0f172a] text-sm">Perusahaan</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.perusahaan.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#64748b] text-sm hover:text-[#1d4ed8]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#0f172a] text-sm">Bantuan</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.bantuan.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#64748b] text-sm hover:text-[#1d4ed8]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-[#e2e8f0] border-t pt-6 text-center text-[#94a3b8] text-sm">
          © 2024 {APP_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
