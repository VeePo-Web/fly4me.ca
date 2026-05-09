import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const DisplayHeading = ({ children, className, as: Component = "h1" }: { children: ReactNode; className?: string; as?: React.ElementType }) => (
  <Component
    className={cn("font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]", className)}
    style={{ fontFeatureSettings: '"liga" 1, "dlig" 1', textWrap: "balance" as any }}
  >
    {children}
  </Component>
);

export const SectionHeading = ({ children, className, as: Component = "h2" }: { children: ReactNode; className?: string; as?: React.ElementType }) => (
  <Component
    className={cn("font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight", className)}
    style={{ fontFeatureSettings: '"liga" 1, "dlig" 1', textWrap: "balance" as any }}
  >
    {children}
  </Component>
);

export const SubHeading = ({ children, className, as: Component = "h3" }: { children: ReactNode; className?: string; as?: React.ElementType }) => (
  <Component
    className={cn("font-serif text-2xl md:text-3xl font-normal", className)}
    style={{ fontFeatureSettings: '"liga" 1, "dlig" 1', textWrap: "balance" as any }}
  >
    {children}
  </Component>
);

export const LeadText = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed text-center", className)}>
    {children}
  </p>
);

export const StandardText = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("text-base md:text-lg text-foreground/80 leading-relaxed", className)} style={{ textWrap: "pretty" as any }}>
    {children}
  </p>
);

export const Eyebrow = ({ children, className, as: Component = "p" }: { children: ReactNode; className?: string; as?: React.ElementType }) => (
  <Component
    className={cn("font-sans text-[13px] uppercase tracking-[0.2em] font-medium", className)}
    style={{ fontFeatureSettings: '"cv02"' }}
  >
    {children}
  </Component>
);

export const Caption = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p
    className={cn("font-sans text-xs text-muted-foreground tracking-[0.02em] leading-relaxed", className)}
    style={{ fontFeatureSettings: '"cv02"' }}
  >
    {children}
  </p>
);

export const PullQuote = ({ children, cite, className }: { children: ReactNode; cite?: string; className?: string }) => (
  <blockquote
    className={cn("border-l-2 pl-6 md:pl-8 py-2", className)}
    style={{ borderImage: "linear-gradient(to bottom, hsl(var(--primary) / 0.35), hsl(var(--gold-warm) / 0.15)) 1" }}
  >
    <p
      className="font-serif italic text-xl md:text-2xl font-light leading-snug text-foreground/80"
      style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
    >
      {children}
    </p>
    {cite && (
      <cite className="block font-sans not-italic text-xs text-muted-foreground mt-3 uppercase tracking-[0.12em]">
        — {cite}
      </cite>
    )}
  </blockquote>
);
