import { LandingCta } from "./landing-cta";
import { LandingFaq } from "./landing-faq";
import { LandingFeatures } from "./landing-features";
import { LandingFooter } from "./landing-footer";
import { LandingHero } from "./landing-hero";
import { LandingNavbar } from "./landing-navbar";
import { LandingPaket } from "./landing-paket";
import { LandingStatsBar } from "./landing-stats-bar";
import { LandingSteps } from "./landing-steps";
import { LandingTestimonials } from "./landing-testimonials";

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-white text-[#0f172a]">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingStatsBar />
        <LandingFeatures />
        <LandingSteps />
        <LandingPaket />
        <LandingTestimonials />
        <LandingCta />
        <LandingFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
