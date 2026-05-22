import { useEffect, useState } from "react";
import HeroMedia from "./HeroMedia";
import { LinkButton } from "./Button";
import { INTRO_SESSION_KEY, INTRO_HERO_REVEAL_AT_MS } from "./Intro";
import hero from "@/assets/hero-drone.jpg";

interface Props {
  onContact: () => void;
}

/**
 * Compute the reveal offset for hero contents.
 * If the cinematic intro is about to play, delay the hero's animations so
 * they land *during* the veil dissolve instead of finishing behind a black veil.
 */
function getInitialRevealDelay(): number {
  if (typeof window === "undefined") return 0;
  if (window.location.pathname !== "/") return 0;
  if (new URLSearchParams(window.location.search).has("nointro")) return 0;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return 0;
  if (sessionStorage.getItem(INTRO_SESSION_KEY)) return 0;
  return INTRO_HERO_REVEAL_AT_MS;
}


export default function Hero({ onContact }: Props) {
  // When the intro is about to play, hold the hero animations until the
  // dissolve begins, then snap to 0 so the natural choreography runs.
  const [revealDelay, setRevealDelay] = useState<number>(getInitialRevealDelay);

  useEffect(() => {
    if (revealDelay === 0) return;
    const onExit = () => setRevealDelay(0);
    window.addEventListener("f4m:intro:exit", onExit as EventListener);
    return () => window.removeEventListener("f4m:intro:exit", onExit as EventListener);
  }, [revealDelay]);

  // Offset original animation delays by the intro's dissolve mark so the
  // hero reveals land *as* the veil clears, not after a beat of black.
  const d = (base: number) => `${base + revealDelay}ms`;

  return (
    <section
      id="top"
      /*
        bg-[#0a0a0a] — if the poster is momentarily absent, the dark
        background is consistent with the vignette rather than flashing
        the old light bg-secondary.
      */
      className="relative w-full overflow-hidden bg-[#0a0a0a] h-[100svh] md:h-[100dvh] max-h-[100dvh]"
    >
      {/* Media layer — full-viewport subject, not wallpaper */}
      <HeroMedia
        image={hero}
        alt="Aerial drone footage over the Canadian Rockies"
        priority
        sources={[
          { src: "/hero/hero-drone-mobile.mp4", type: "video/mp4", media: "(max-width: 768px)" },
          { src: "/hero/hero-drone.webm", type: "video/webm" },
          { src: "/hero/hero-drone.mp4",  type: "video/mp4" },
        ]}
        nextSources={[
          { src: "/hero/dji-0398.mp4", type: "video/mp4" },
        ]}
      />

      {/*
        Cinematic vignette — replaces the cheap left-to-right gradient wipe.
        Desktop: a dark radial ellipse anchored left-center where the copy lives.
        The right 50%+ of the aerial footage is completely unobstructed.
        Mobile: bottom-rise so the copy at the lower viewport reads clearly.
        See .hero-vignette in index.css for the gradient definition.
      */}
      <div className="absolute inset-0 hero-vignette" aria-hidden />

      {/* Content — relative so it sits above both media and vignette layers */}
      <div className="relative container-x h-full hero-pt hero-pb flex flex-col">

        {/* Main copy — vertically centered, constrained to left column */}
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-2xl lg:max-w-[52rem]">

          {/* Headline — leads the sequence, no eyebrow crutch */}
          <h1
            className="hero-display wrap-editorial text-background t-reveal-track"
            style={{ animationDelay: "0ms" }}
          >
            Your competitors
            <br />
            look ordinary
            <br />
            from up here.
          </h1>

          {/* Lede — cascades in as headline is mid-animation */}
          <p
            className="hero-lede hero-gap-lede max-w-[44ch] text-background/60 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            Two consistent impressions. That's all it takes for
            someone to decide who you are — and sometimes, they
            never revise it. We make sure the perception they
            keep is the one you've actually earned.
          </p>



          {/* CTAs */}
          <div
            className="hero-gap-cta flex items-center gap-8 flex-wrap animate-fade-up"
            style={{ animationDelay: "440ms" }}
          >
            <LinkButton to="/work" variant="light">
              View our work
            </LinkButton>

            <button
              onClick={onContact}
              data-cursor="hover"
              className="t-button text-background/70 hover:text-background transition-colors duration-[260ms] ease-[var(--ease-out-soft)]"
            >
              Start a project
            </button>
          </div>
        </div>

        {/* Bottom bar — GPS coordinate + availability. Desktop only. */}
        <div
          className="hidden md:flex items-end justify-between shrink-0 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <span className="t-micro text-background/25 tracking-[0.18em]">
            N&thinsp;51.04°&ensp;W&thinsp;114.07°
          </span>
          <span className="t-micro text-background/25 text-right tracking-[0.08em]">
            Available worldwide
          </span>
        </div>
      </div>

      {/*
        Scroll indicator — a thin vertical line that pulses downward.
        Desktop only. No label — the animation implies the direction.
        Centered at the bottom of the hero.
      */}
      <div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden
      >
        <div className="w-px h-9 bg-background/20 hero-scroll-line" />
      </div>
    </section>
  );
}
