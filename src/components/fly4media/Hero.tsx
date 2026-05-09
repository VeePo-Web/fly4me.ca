import { Link } from "react-router-dom";
import HeroMedia from "./HeroMedia";
import hero from "@/assets/hero-drone.jpg";

interface Props {
  onContact: () => void;
}

export default function Hero({ onContact }: Props) {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-secondary"
    >
      <HeroMedia
        image={hero}
        alt="Aerial drone in flight over the Canadian Rockies"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent"
        aria-hidden
      />

      <div className="relative container-x pt-32 md:pt-40 pb-20 min-h-[100dvh] flex flex-col justify-between">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.04em] text-foreground text-balance">
            We capture
            <br />
            perspectives
            <br />
            that move you.
          </h1>

          <p className="mt-8 max-w-md text-base md:text-lg text-foreground/70 leading-relaxed text-pretty">
            Aerial cinematography and photography for brands, real estate, and
            stories that deserve to be seen.
          </p>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View our work
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </Link>
            <button
              onClick={onContact}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-end justify-between text-xs uppercase tracking-[0.22em] text-foreground/60">
          <span>Fly4MEdia / 2026</span>
          <span className="text-right leading-relaxed">
            Based in Alberta, Canada
            <br />
            Available worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
