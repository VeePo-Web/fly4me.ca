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
      className="relative w-full overflow-hidden bg-secondary h-[100svh] md:h-[100dvh] max-h-[100dvh]"
    >
      <HeroMedia
        image={hero}
        alt="Aerial drone in flight over the Canadian Rockies"
        priority
        sources={[
          { src: "/hero/hero-drone-mobile.mp4", type: "video/mp4", media: "(max-width: 768px)" },
          { src: "/hero/hero-drone.webm", type: "video/webm" },
          { src: "/hero/hero-drone.mp4", type: "video/mp4" },
        ]}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent"
        aria-hidden
      />

      <div className="relative container-x h-full hero-pt hero-pb flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-3xl animate-fade-up">
          <p className="hero-eyebrow t-eyebrow text-foreground/60 mb-4 md:mb-6">
            A cinematic perspective studio
          </p>
          <h1 className="hero-display wrap-editorial text-foreground t-reveal-track">
            We make brands,
            <br />
            places, and stories
            <br />
            worth looking up at.
          </h1>

          <p className="hero-lede hero-gap-lede max-w-md text-foreground/70 measure">
            Aerial cinematography for the brands and destinations that
            understand presentation is positioning.
          </p>

          <div className="hero-gap-cta flex items-center gap-6 flex-wrap">
            <LinkButton to="/work">View our work</LinkButton>
            <Button onClick={onContact} variant="ghost">
              Start a project
            </Button>
          </div>
        </div>

        <div className="hidden md:flex items-end justify-between t-micro text-foreground/60 shrink-0">
          <span>Fly4MEdia / 2026</span>
          <span className="text-right">
            Based in Alberta, Canada
            <br />
            Available worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
