import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface PullQuoteProps {
  children: string;
  attribution?: string;
  className?: string;
  align?: "left" | "center";
}

const HOVER_TRANSITION = "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const PullQuote = ({ children, attribution, className, align = "left" }: PullQuoteProps) => (
  <ScrollReveal weight="light">
    <figure
      className={cn(
        "group cursor-default relative py-6 md:py-8 my-4",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Gold accent bar — left edge */}
      {align === "left" && (
        <div
          className={cn("absolute left-0 top-0 bottom-0 w-[2px] group-hover:w-[3px] origin-top animate-[accent-grow_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]", HOVER_TRANSITION)}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--gold-warm) / 0.5), hsl(var(--primary) / 0.2), hsl(var(--gold-warm) / 0.1))",
          }}
          aria-hidden="true"
        />
      )}

      {/* Decorative opening mark for center variant */}
      {align === "center" && (
        <span
          className={cn("block font-serif text-4xl text-primary/10 group-hover:text-primary/20 leading-none mb-2 select-none animate-[ornament-pulse_5s_ease-in-out_infinite]", HOVER_TRANSITION)}
          aria-hidden="true"
        >
          &ldquo;
        </span>
      )}

      <blockquote
        className={cn(
          "relative font-serif italic text-lg md:text-xl text-foreground/80 group-hover:text-foreground leading-relaxed max-w-2xl",
          align === "left" && "pl-7 md:pl-8",
          align === "center" && "mx-auto",
          HOVER_TRANSITION
        )}
        style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
      >
        {/* Ghost opening quotation mark — left variant */}
        {align === "left" && (
          <span
            className={cn("absolute -top-3 left-0 md:left-1 font-serif text-3xl md:text-4xl text-primary/[0.07] group-hover:text-primary/15 leading-none select-none pointer-events-none", HOVER_TRANSITION)}
            aria-hidden="true"
          >
            &ldquo;
          </span>
        )}
        {children}
      </blockquote>

      <div
        className={cn(
          "h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-3",
          align === "left" ? "origin-left w-1/3 pl-6 md:pl-8 ml-6 md:ml-8" : "origin-center w-1/2 mx-auto"
        )}
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.5), transparent)" }}
        aria-hidden="true"
      />

      {attribution && (
        <figcaption
          className={cn(
            "mt-3 text-[11px] font-sans uppercase tracking-[0.2em] text-muted-foreground/65 group-hover:text-muted-foreground",
            align === "left" && "pl-6 md:pl-8",
            align === "center" && "text-center",
            HOVER_TRANSITION
          )}
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          — {attribution}
        </figcaption>
      )}
    </figure>
  </ScrollReveal>
);

export default PullQuote;
