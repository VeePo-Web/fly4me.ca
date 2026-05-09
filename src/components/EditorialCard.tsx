import { Eyebrow, StandardText } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import GlassTexture from "@/components/GlassTexture";
import type { LucideIcon } from "lucide-react";

/** Gold filigree corner ornament — mirrors BentoCard's L-bracket */
const CornerOrnament = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
    aria-hidden="true"
  >
    <path
      d="M0,12 L0,3 Q0,0 3,0 L12,0"
      stroke="hsl(var(--gold-warm))"
      strokeWidth="0.5"
      strokeOpacity="0.18"
      fill="none"
    />
    <rect
      x="0"
      y="0"
      width="2"
      height="2"
      rx="0.3"
      transform="rotate(45 1 1)"
      fill="hsl(var(--gold-warm))"
      fillOpacity="0.1"
    />
  </svg>
);

/** Subtle lead mullion pattern — aged, barely visible sacred geometry */
const LeadMullions = () => (
  <div className="absolute inset-0 pointer-events-none z-[7]" aria-hidden="true">
    {/* Vertical lead came */}
    <div
      className="absolute top-0 bottom-0 w-px scale-y-0 group-hover:scale-y-100 origin-top pointer-events-none"
      style={{
        left: "35%",
        background: "linear-gradient(to bottom, transparent 5%, rgba(20,10,5,0.12) 30%, rgba(20,10,5,0.14) 70%, transparent 95%)",
        transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
    {/* Horizontal lead came */}
    <div
      className="absolute left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left pointer-events-none"
      style={{
        top: "45%",
        background: "linear-gradient(to right, transparent 5%, rgba(20,10,5,0.10) 30%, rgba(20,10,5,0.12) 70%, transparent 95%)",
        transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 80ms",
      }}
    />
  </div>
);

/** Text shadow cascade for legibility over stained glass */
const glassTextShadow =
  "0 1px 3px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.15)";

interface EditorialCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  ghost?: string;
  scripture?: string;
  stainedGlassImage?: string;
  className?: string;
}

/**
 * Editorial card — sacred stained glass material transmutation on hover.
 * The card surface itself transforms into luminous glass with sacred imagery.
 */
const EditorialCard = ({ icon: Icon, title, body, ghost, scripture, stainedGlassImage, className }: EditorialCardProps) => {
  const hasGlass = Boolean(stainedGlassImage);

  return (
    <div
      className={cn(
        "relative border border-border/40 bg-card p-5 md:p-6 overflow-hidden group h-full",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5",
        className
      )}
    >
      {/* Ghost number */}
      {ghost && (
        <span
          className={cn(
            "absolute top-3 right-4 font-serif text-5xl leading-none select-none pointer-events-none z-10",
            hasGlass
              ? "text-foreground/[0.03] group-hover:text-white/[0.15] transition-colors duration-700"
              : "text-foreground/[0.03]"
          )}
          aria-hidden="true"
        >
          {ghost}
        </span>
      )}

      {/* Gold left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px] z-10"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))",
        }}
      />

      {/* Top accent line — reveals on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-10"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      />

      {/* Bottom accent line — reveals on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right z-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), hsl(var(--gold-warm) / 0.15))",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      />

      {/* Corner ornament */}
      <CornerOrnament />

      {/* ── Stained Glass Transmutation System ──────────────────────────── */}
      {stainedGlassImage && (
        <>
          {/* Layer 1: Glass image — high opacity, zooms in on hover */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <img
              src={stainedGlassImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-45 scale-100 group-hover:scale-[1.04] will-change-[transform,opacity]"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "1100ms, 1600ms",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            />
          </div>

          {/* Layer 2: Light tint overlay — replaces dark overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-[3]"
            style={{
              background: [
                "linear-gradient(180deg, rgba(10,5,2,0.20) 0%, rgba(5,3,1,0.20) 40%, rgba(8,4,1,0.40) 80%, rgba(5,2,0,0.55) 100%)",
              ].join(", "),
              transitionProperty: "opacity",
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              transitionDelay: "80ms",
            }}
            aria-hidden="true"
          />

          {/* Layer 3: Glass texture — grain + refraction */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <GlassTexture />
          </div>

          {/* Layer 4: Lead mullions — sacred geometry */}
          <LeadMullions />

          {/* Layer 5: Color saturation wash — gentle jewel tone enhancement */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-15 mix-blend-color pointer-events-none z-[4]"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 50%, hsl(var(--gold-warm) / 0.5), transparent 80%)",
              transitionProperty: "opacity",
              transitionDuration: "800ms",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Warm ambient tint at rest — breaks flat white */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 20% 100%, hsl(var(--gold-warm) / 0.025), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Multi-color light wash — simulates sunlight through stained glass on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[6]"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 15% 20%, hsl(var(--gold-warm) / 0.04), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--primary) / 0.03), transparent 65%)",
            "radial-gradient(ellipse 55% 50% at 85% 80%, hsl(var(--gold-haze) / 0.04), transparent 70%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />


      {/* Content — z-[15] with text protection for glass state */}
      <div
        className={cn(
          "relative z-[15] flex flex-col gap-3 pl-3",
          hasGlass && "group-hover:backdrop-blur-[2px] group-hover:rounded-sm"
        )}
        style={hasGlass ? { transition: "backdrop-filter 500ms" } : undefined}
      >
        {/* Icon badge — adapts for glass/default */}
        <div
          className={cn(
            "rounded-sm border p-2 w-fit transition-all",
            hasGlass
              ? "border-border/30 bg-background group-hover:border-white/25 group-hover:bg-white/12 group-hover:scale-[1.06]"
              : "border-border/30 bg-background group-hover:border-primary/20 group-hover:scale-[1.06]"
          )}
          style={{
            transition: "border-color 0.5s, background-color 0.5s, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Icon
            size={17}
            strokeWidth={1.15}
            className={cn(
              "transition-colors duration-500",
              hasGlass
                ? "text-muted-foreground group-hover:text-white"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </div>

        {/* Title */}
        <span style={hasGlass ? { textShadow: "var(--glass-text-shadow, none)" } : undefined}>
          <Eyebrow
            className={cn(
              "transition-colors duration-500",
              hasGlass
                ? "text-foreground group-hover:text-white [transition-delay:180ms]"
                : "text-foreground group-hover:text-primary"
            )}
          >
            {title}
          </Eyebrow>
        </span>

        {/* Body */}
        <span style={hasGlass ? { textShadow: "var(--glass-text-shadow, none)" } : undefined}>
          <StandardText
            className={cn(
              "text-sm leading-relaxed transition-colors duration-500",
              hasGlass && "group-hover:text-white/90 [transition-delay:220ms]"
            )}
          >
            {body}
          </StandardText>
        </span>

        {/* Scripture whisper */}
        {scripture && (
          <p
            className={cn(
              "font-serif italic text-xs tracking-[0.04em] transition-colors duration-700 mt-4 leading-relaxed",
              hasGlass
                ? "text-primary/45 group-hover:text-white/75"
                : "text-primary/45 group-hover:text-primary/60"
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: hasGlass ? "280ms" : "150ms",
              ...(hasGlass ? { textShadow: "var(--glass-text-shadow, none)" } : {}),
            }}
          >
            <span
              className={cn(
                "transition-colors duration-700 mr-1.5",
                hasGlass
                  ? "text-[hsl(var(--gold-warm)/0.3)] group-hover:text-[hsl(var(--gold-warm)/0.7)]"
                  : "text-[hsl(var(--gold-warm)/0.25)] group-hover:text-[hsl(var(--gold-warm)/0.4)]"
              )}
              aria-hidden="true"
            >
              —
            </span>
            {scripture} <span className="not-italic text-[11px] opacity-70">&middot; NIV</span>
          </p>
        )}
      </div>

      {/* CSS custom property for glass text shadow — applied via group-hover in JS style */}
      <style>{`
        .group:hover {
          --glass-text-shadow: 0 1px 3px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default EditorialCard;
