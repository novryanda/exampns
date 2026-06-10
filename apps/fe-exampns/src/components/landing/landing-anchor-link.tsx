"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { scrollToLandingSection } from "./landing-scroll";

type LandingAnchorLinkProps = ComponentProps<typeof Link>;

export function LandingAnchorLink({
  href,
  onClick,
  ...props
}: LandingAnchorLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
      event.preventDefault();
      scrollToLandingSection(href);
    }

    onClick?.(event);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
