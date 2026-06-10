import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  fetchPublicSampleQuestions,
  type PublicSampleQuestionsResponse,
} from "@/lib/api/public-sample";

import { LandingAnchorLink } from "./landing-anchor-link";
import { LandingHeroMiniTryout } from "./landing-hero-mini-tryout";
import { LANDING_ASSETS } from "./landing-asset-kit";
import { landingTheme } from "./landing-theme";

interface HeroMiniTryoutState {
  initialData: PublicSampleQuestionsResponse | null;
  initialError: string | null;
  initialIsEmpty: boolean;
}

async function loadHeroMiniTryoutState(): Promise<HeroMiniTryoutState> {
  try {
    const data = await fetchPublicSampleQuestions();

    if (data.questions.length === 0) {
      return {
        initialData: null,
        initialError: null,
        initialIsEmpty: true,
      };
    }

    return {
      initialData: data,
      initialError: null,
      initialIsEmpty: false,
    };
  } catch (error) {
    return {
      initialData: null,
      initialError: error instanceof Error ? error.message : "Gagal memuat soal",
      initialIsEmpty: false,
    };
  }
}

function HeroVisualPanel({ miniTryoutState }: { readonly miniTryoutState: HeroMiniTryoutState }) {
  return (
    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
      <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-[#bfdbfe]/60 bg-gradient-to-b from-[#eef6ff] via-[#e8f2ff] to-[#dbeafe] shadow-[0_4px_24px_rgba(59,130,246,0.08)] sm:min-h-[420px] sm:rounded-3xl lg:min-h-[540px]">
        <div className="absolute inset-1.5 overflow-hidden rounded-xl bg-white shadow-sm sm:inset-3 sm:rounded-2xl">
          <LandingHeroMiniTryout
            initialData={miniTryoutState.initialData}
            initialError={miniTryoutState.initialError}
            initialIsEmpty={miniTryoutState.initialIsEmpty}
          />
        </div>
      </div>
    </div>
  );
}

export async function LandingHero() {
  const miniTryoutState = await loadHeroMiniTryoutState();
  return (
    <section id="beranda" className="relative scroll-mt-16 overflow-hidden bg-[#e8f2ff]">
      <Image
        src={LANDING_ASSETS.heroSectionBackground}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-6 px-4 pt-3 pb-10 sm:gap-8 sm:px-6 sm:pt-6 sm:pb-16 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-12 lg:pb-28">
        <div className="z-10 space-y-3 text-center sm:space-y-5 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#dbeafe] px-3 py-1 font-semibold text-[#1d4ed8] text-[11px] uppercase tracking-wide sm:px-4 sm:py-1.5 sm:text-xs">
            Platform #1 Persiapan CAT CPNS
          </span>

          <h1
            className={cn(
              landingTheme.heading,
              "text-[1.65rem] leading-snug sm:text-4xl sm:leading-tight lg:text-[2.75rem]",
            )}
          >
            Persiapan CAT PNS Jadi Lebih Terarah dan{" "}
            <span className="text-[#1d4ed8]">Siap Bersaing!</span>
          </h1>

          <p className="mx-auto max-w-xl font-semibold text-[#1e293b] text-sm leading-relaxed sm:text-base lg:mx-0 lg:text-lg [text-shadow:0_1px_8px_rgba(255,255,255,0.85)]">
            Ribuan soal berkualitas, simulasi CAT sesungguhnya, dan analisis mendalam untuk
            memaksimalkan peluang lolos SKD CPNS Anda.
          </p>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 lg:justify-start">
            <Button
              asChild
              size="lg"
              className={cn("w-full rounded-full px-6 shadow-md sm:w-auto", landingTheme.primary)}
            >
              <Link href="/auth/register">Mulai Simulasi Gratis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-[#cbd5e1] bg-white px-6 text-[#334155] shadow-sm hover:bg-[#f8fafc] sm:w-auto"
            >
              <LandingAnchorLink href="#paket">Lihat Paket</LandingAnchorLink>
            </Button>
          </div>
        </div>

        <HeroVisualPanel miniTryoutState={miniTryoutState} />
      </div>
    </section>
  );
}
