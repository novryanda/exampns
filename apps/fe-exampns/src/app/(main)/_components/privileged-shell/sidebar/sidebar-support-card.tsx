import Link from "next/link";

import { siX } from "simple-icons";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleIcon } from "@/components/ui/simple-icon";

export function SidebarSupportCard() {
  return (
    <Card size="sm" className="shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Butuh bantuan lain?</CardTitle>
        <CardDescription>
          Buat issue atau hubungi saya lewat&nbsp;
          <Link
            href="https://x.com/arhamkhnz"
            target="_blank"
            rel="noreferrer"
            aria-label="Hubungi lewat X"
            className="inline-flex items-center text-foreground"
          >
            <SimpleIcon icon={siX} aria-hidden className="size-3 fill-current" />
          </Link>
          .
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
