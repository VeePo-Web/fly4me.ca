import HeroMedia from "./HeroMedia";
import { Button, LinkButton } from "./Button";
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
          <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 mb-6 md:mb-8">
            A cinematic perspective studio
          </p>
          <h1 className="text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.04em] text-foreground text-balance">
            We make brands,
            <br />
            places, and stories
            <br />
            worth looking up at.
          </h1>

          <p className="mt-8 max-w-md text-base md:text-lg text-foreground/70 leading-relaxed text-pretty">
            Aerial cinematography for the brands and destinations that
            understand presentation is positioning.
          </p>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <LinkButton to="/work">View our work</LinkButton>
            <Button onClick={onContact} variant="ghost">
              Start a project
            </Button>
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
