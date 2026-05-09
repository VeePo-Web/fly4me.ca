import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "cream" | "warm" | "blood" | "dark";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
  /** Add soft gradient transitions at top and/or bottom edges */
  bleed?: "top" | "bottom" | "both" | "none";
}

const variantStyles = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  cream: "bg-cream text-foreground",
  warm: "bg-[hsl(33,20%,88%)] text-foreground",
  blood: "bg-primary text-primary-foreground",
  dark: "bg-foreground text-background",
};

const paddingStyles = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-48",
};

/** Maps variant to the CSS color used for gradient bleed edges */
const bleedColorMap: Record<string, string> = {
  default: "hsl(var(--background))",
  muted: "hsl(var(--muted))",
  cream: "hsl(var(--cream))",
  warm: "hsl(33,20%,88%)",
  blood: "hsl(var(--primary))",
  dark: "hsl(var(--foreground))",
};

export const Section = ({
  children,
  className,
  variant = "default",
  padding = "md",
  id,
  bleed = variant !== "default" ? "both" : "none",
}: SectionProps) => {
  const showTop = bleed === "top" || bleed === "both";
  const showBottom = bleed === "bottom" || bleed === "both";
  const sectionColor = bleedColorMap[variant];

  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-6 flex flex-col items-center",
        variantStyles[variant],
        paddingStyles[padding],
        id && "scroll-mt-20",
        className
      )}
      
    >
      {/* Warm atmospheric radial glow for muted/cream variants */}
      {(variant === "muted" || variant === "cream" || variant === "warm") && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 60% at 20% 70%, hsl(var(--primary) / 0.02), transparent 70%), radial-gradient(ellipse 40% 50% at 80% 30%, hsl(var(--gold-warm) / 0.015), transparent 70%)",
            }}
            aria-hidden="true"
          />
          {/* Paper-grain noise texture — tactile editorial depth */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.012] mix-blend-overlay"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          {/* Editorial top-edge filigree — gold hairline with centred cross motif */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none z-[2]" aria-hidden="true">
            <div className="flex-1 h-px max-w-[40%]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.12))" }} />
            <div className="relative w-[6px] h-[9px] mx-2 flex-shrink-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full" style={{ background: "hsl(var(--gold-warm) / 0.15)" }} />
              <div className="absolute top-[3px] left-0 w-full h-px" style={{ background: "hsl(var(--gold-warm) / 0.12)" }} />
            </div>
            <div className="flex-1 h-px max-w-[40%]" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--gold-warm) / 0.12))" }} />
          </div>
        </>
      )}

      {/* Top gradient bleed — smooth transition from previous section */}
      {showTop && (
        <div
          className="absolute top-0 left-0 right-0 h-10 md:h-16 pointer-events-none -translate-y-full"
          style={{
            background: `linear-gradient(to bottom, transparent, ${sectionColor})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Bottom gradient bleed — smooth transition to next section */}
      {showBottom && (
        <div
          className="absolute bottom-0 left-0 right-0 h-10 md:h-16 pointer-events-none translate-y-full"
          style={{
            background: `linear-gradient(to top, transparent, ${sectionColor})`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-[1]">
        {children}
      </div>
    </section>
  );
};
