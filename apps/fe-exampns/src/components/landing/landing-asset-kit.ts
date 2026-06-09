/** Static asset paths served from /public/landing (copied from /asset). */
export const LANDING_ASSETS = {
  heroHouse: "/landing/herocardhouse2.png",
  heroPeople: "/landing/herocardpeople.png",
  cta: "/landing/sectioncard.png",
  icons: [
    "/landing/icon1.png",
    "/landing/icon2.png",
    "/landing/icon3.png",
    "/landing/icon4.png",
    "/landing/icon5.png",
    "/landing/icon6.png",
  ] as const,
  steps: [
    "/landing/carakerja1.png",
    "/landing/carakerja2.png",
    "/landing/carakerja3.png",
    "/landing/carakerja4.png",
  ] as const,
  badges: [
    "/landing/badge1.png",
    "/landing/badge2.png",
    "/landing/badge3.png",
    "/landing/badge4.png",
    "/landing/badge5.png",
  ] as const,
  avatars: ["/landing/avatar1.png", "/landing/avatar2.png"] as const,
} as const;
