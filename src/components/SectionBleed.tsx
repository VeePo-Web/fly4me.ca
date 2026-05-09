import { cn } from "@/lib/utils";

type Variant = "default" | "muted" | "cream";

const variantColors: Record<Variant, string> = {
  default: "hsl(var(--background))",
  muted: "hsl(var(--muted))",
  cream: "hsl(var(--cream))",
};

interface SectionBleedProps {
  from: Variant;
  to: Variant;
  className?: string;
  height?: number;
}

const SectionBleed = ({ from, to, className, height = 64 }: SectionBleedProps) => (
  <div
    className={cn("w-full pointer-events-none relative", className)}
    style={{
      height: `${height}px`,
      background: `linear-gradient(to bottom, ${variantColors[from]}, ${variantColors[to]})`,
    }}
    aria-hidden="true"
  >
    {/* Subtle noise overlay for smoother perceptual blending */}
    <div
      className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
    {/* Center ornament — gold diamond flanked by gradient hairlines */}
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-1">
      <div
        className="w-5 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.025))" }}
      />
      <svg
        width="5" height="5" viewBox="0 0 5 5" fill="none"
        className="animate-[ornament-pulse_5s_ease-in-out_infinite]"
      >
        <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.10" />
      </svg>
      <div
        className="w-5 h-px"
        style={{ background: "linear-gradient(270deg, transparent, hsl(var(--foreground) / 0.025))" }}
      />
    </div>
  </div>
);

export default SectionBleed;
