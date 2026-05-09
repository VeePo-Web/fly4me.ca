import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface ScriptureWhisperProps {
  verse: string;
  reference: string;
  translation?: string;
  variant?: "whisper" | "anchor" | "interstitial";
  className?: string;
  delay?: number;
}

/** Breathing quotation mark — CSS-only pulse, no JS overhead */
const BreathingQuote = ({ char, className }: { char: string; className?: string }) => (
  <span
    className={cn("select-none animate-[quote-breathe_5s_ease-in-out_infinite]", className)}
    aria-hidden="true"
  >
    {char}
  </span>
);

const HOVER_TRANSITION = "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const ScriptureWhisper = ({
  verse,
  reference,
  translation = "NIV",
  variant = "whisper",
  className,
  delay = 0,
}: ScriptureWhisperProps) => {
  if (variant === "interstitial") {
    return (
      <ScrollReveal weight="light" delay={delay}>
        <div className={cn("group cursor-default relative flex flex-col items-center gap-6 px-6 py-20 md:py-32 overflow-hidden", className)}>
          {/* Warm glow — fades in on hover */}
          <div
            className={cn("absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100", HOVER_TRANSITION)}
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Subtle cross watermark — CSS-only breathing rotation */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[cross-sway_12s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            <div className="relative">
              <div className={cn("w-px h-32 bg-foreground/[0.03] group-hover:bg-foreground/[0.06] animate-cross-breathe", HOVER_TRANSITION)} />
              <div className={cn("absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-px bg-foreground/[0.03] group-hover:bg-foreground/[0.06] animate-cross-breathe", HOVER_TRANSITION)} />
              <div
                className="absolute top-[42px] left-1/2 -translate-x-1/2 size-[2px] rounded-full animate-[nail-pulse_4s_ease-in-out_1s_infinite]"
                style={{ background: "hsl(var(--foreground) / 0.025)" }}
              />
            </div>
          </div>

          {/* Decorative top rule */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className={cn("w-8 group-hover:w-12 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border) / 0.4))" }} />
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className={cn("animate-[ornament-pulse_4s_ease-in-out_infinite] opacity-100 group-hover:opacity-100", HOVER_TRANSITION)}>
              <rect x="3.5" y="0.3" width="4.2" height="4.2" rx="0.4" transform="rotate(45 3.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.08" className={cn("group-hover:fill-opacity-[0.2]", HOVER_TRANSITION)} />
            </svg>
            <div className={cn("w-8 group-hover:w-12 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(270deg, transparent, hsl(var(--border) / 0.4))" }} />
          </div>

          <blockquote
            className={cn("font-serif italic text-xl md:text-2xl text-muted-foreground/90 group-hover:text-foreground max-w-lg mx-auto text-center leading-relaxed relative z-10", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
          >
            <BreathingQuote char="&ldquo;" className={cn("text-muted-foreground/60 group-hover:text-primary/70 text-2xl leading-none align-top", HOVER_TRANSITION)} />
            {verse}
            <BreathingQuote char="&rdquo;" className={cn("text-muted-foreground/60 group-hover:text-primary/70 text-2xl leading-none align-bottom", HOVER_TRANSITION)} />
          </blockquote>
          <div
            className="mx-auto h-px w-1/2 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.5), transparent)" }}
            aria-hidden="true"
          />
          <span
            className={cn("text-xs not-italic tracking-[0.2em] uppercase text-muted-foreground/75 group-hover:text-muted-foreground font-sans relative z-10 animate-[fade-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            {reference} <span className={cn("text-muted-foreground/70 group-hover:text-muted-foreground/80", HOVER_TRANSITION)}>&middot; {translation}</span>
          </span>

          {/* Decorative bottom rule */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border) / 0.3))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className={cn("opacity-15 group-hover:opacity-40", HOVER_TRANSITION)}>
              <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.4" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
            </svg>
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(270deg, transparent, hsl(var(--border) / 0.3))" }} />
          </div>
        </div>
      </ScrollReveal>
    );
  }

  if (variant === "anchor") {
    return (
      <ScrollReveal weight="light" delay={delay}>
        <div className={cn("group cursor-default relative flex flex-col items-center gap-4 px-6 py-10 md:py-14", className)}>
          {/* Warm glow */}
          <div
            className={cn("absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100", HOVER_TRANSITION)}
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
            aria-hidden="true"
          />
          <blockquote
            className={cn("font-serif italic text-lg md:text-xl text-muted-foreground/85 group-hover:text-foreground max-w-lg mx-auto text-center leading-relaxed relative z-10", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
          >
            <BreathingQuote char="&ldquo;" className={cn("text-muted-foreground/50 group-hover:text-primary/70 text-xl leading-none align-top mr-0.5", HOVER_TRANSITION)} />
            {verse}
            <BreathingQuote char="&rdquo;" className={cn("text-muted-foreground/50 group-hover:text-primary/70 text-xl leading-none align-bottom ml-0.5", HOVER_TRANSITION)} />
          </blockquote>
          <div
            className="mx-auto h-px w-2/3 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.5), transparent)" }}
            aria-hidden="true"
          />
          <span
            className={cn("text-xs not-italic tracking-[0.2em] uppercase text-muted-foreground/75 group-hover:text-muted-foreground font-sans relative z-10 animate-[fade-in_0.5s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            {reference} <span className={cn("text-muted-foreground/70 group-hover:text-muted-foreground/80", HOVER_TRANSITION)}>&middot; {translation}</span>
          </span>
        </div>
      </ScrollReveal>
    );
  }

  // Default "whisper" variant
  return (
    <ScrollReveal weight="light" delay={delay}>
      <div className={cn("group cursor-default w-full flex justify-center py-8 md:py-12", className)}>
        <div className="relative flex flex-col items-center gap-4 px-6">
          {/* Warm glow */}
          <div
            className={cn("absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 rounded-lg", HOVER_TRANSITION)}
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border) / 0.5))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className={cn("opacity-20 group-hover:opacity-40", HOVER_TRANSITION)}>
              <rect x="2.5" y="0.3" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.4" fill="hsl(var(--gold-warm))" fillOpacity="0.06" />
            </svg>
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(270deg, transparent, hsl(var(--border) / 0.5))" }} />
          </div>
          <p
            className={cn("text-center font-serif italic text-lg md:text-xl text-muted-foreground/80 group-hover:text-foreground max-w-md leading-relaxed relative z-10", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
          >
            <BreathingQuote char="&ldquo;" className={cn("text-muted-foreground/60 group-hover:text-primary/70 text-lg leading-none align-top mr-0.5", HOVER_TRANSITION)} />
            {verse}
            <BreathingQuote char="&rdquo;" className={cn("text-muted-foreground/60 group-hover:text-primary/70 text-lg leading-none align-bottom ml-0.5", HOVER_TRANSITION)} />
          </p>
          <div
            className="mx-auto h-px w-1/2 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.5), transparent)" }}
            aria-hidden="true"
          />
          <span
            className={cn("text-xs not-italic tracking-[0.2em] uppercase text-muted-foreground/75 group-hover:text-muted-foreground font-sans relative z-10 animate-[fade-in_0.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]", HOVER_TRANSITION)}
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            {reference} <span className={cn("text-muted-foreground/70 group-hover:text-muted-foreground/80", HOVER_TRANSITION)}>&middot; {translation}</span>
          </span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border) / 0.4))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className={cn("opacity-15 group-hover:opacity-40", HOVER_TRANSITION)}>
              <rect x="2.5" y="0.3" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.3)" stroke="hsl(var(--gold-warm))" strokeWidth="0.4" fill="hsl(var(--gold-warm))" fillOpacity="0.04" />
            </svg>
            <div className={cn("w-6 group-hover:w-10 h-px", HOVER_TRANSITION)} style={{ background: "linear-gradient(270deg, transparent, hsl(var(--border) / 0.4))" }} />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ScriptureWhisper;
