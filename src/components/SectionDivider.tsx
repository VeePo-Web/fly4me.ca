import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "line" | "dot" | "thorns" | "cross";
  className?: string;
}

const ThornsSvg = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary/25 animate-cross-breathe"
    role="img"
    aria-label="Crown of thorns"
  >
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
    <path d="M40 12 L38.5 17 L41.5 17Z" fill="currentColor" opacity="0.55" />
    <path d="M40 68 L38.5 63 L41.5 63Z" fill="currentColor" opacity="0.55" />
    <path d="M12 40 L17 38.5 L17 41.5Z" fill="currentColor" opacity="0.55" />
    <path d="M68 40 L63 38.5 L63 41.5Z" fill="currentColor" opacity="0.55" />
    <path d="M19.5 19.5 L23.5 22 L21.5 24Z" fill="currentColor" opacity="0.4" />
    <path d="M60.5 19.5 L56.5 22 L58.5 24Z" fill="currentColor" opacity="0.4" />
    <path d="M19.5 60.5 L23.5 58 L21.5 56Z" fill="currentColor" opacity="0.4" />
    <path d="M60.5 60.5 L56.5 58 L58.5 56Z" fill="currentColor" opacity="0.4" />
    <ellipse cx="40" cy="40" rx="20" ry="20" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    <line x1="30" y1="13" x2="28.5" y2="15.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="50" y1="13" x2="51.5" y2="15.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="13" y1="30" x2="15.5" y2="28.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="13" y1="50" x2="15.5" y2="51.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="67" y1="30" x2="64.5" y2="28.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="67" y1="50" x2="64.5" y2="51.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="30" y1="67" x2="28.5" y2="64.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="50" y1="67" x2="51.5" y2="64.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="40" y1="35" x2="40" y2="45" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
    <line x1="35" y1="40" x2="45" y2="40" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
  </svg>
);

/** Section divider — pure CSS animations, no JS dependencies. */
const SectionDivider = ({ variant = "line", className }: SectionDividerProps) => (
    <div className={cn("w-full flex items-center justify-center py-6", className)}>
      {variant === "line" ? (
        <div className="relative flex items-center gap-1.5">
          <div
            className="w-10 h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15))" }}
          />
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="opacity-15" aria-hidden="true">
            <rect x="3" y="0.2" width="3.8" height="3.8" rx="0.4" transform="rotate(45 3 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.08" />
          </svg>
          <div
            className="w-10 h-px"
            style={{ background: "linear-gradient(270deg, transparent, hsl(var(--primary) / 0.15))" }}
          />
          <div
            className="absolute inset-0 animate-[shimmer-sweep_3s_ease-in-out_1_0.8s] opacity-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(var(--gold-warm) / 0.2) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            aria-hidden="true"
          />
        </div>
      ) : variant === "thorns" ? (
        <ThornsSvg />
      ) : variant === "cross" ? (
        <div 
          className="relative group cursor-default" 
          aria-hidden="true"
          tabIndex={0}
        >
          {/* Vertical beam with hover glow */}
          <div className="w-px h-6 bg-primary/15 mx-auto
                          group-hover:bg-primary/30 
                          group-focus-visible:bg-primary/30
                          transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
          />
          
          {/* Horizontal beam with hover glow */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-px 
                          bg-primary/15
                          group-hover:bg-primary/30 
                          group-hover:w-5
                          group-focus-visible:bg-primary/30
                          group-focus-visible:w-5
                          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
          />
          
          {/* Center dot with scale + glow on hover */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 
                          size-[2px] rounded-full
                          group-hover:scale-150 
                          group-hover:shadow-[0_0_6px_hsl(var(--gold-warm)/0.4)]
                          group-focus-visible:scale-150
                          group-focus-visible:shadow-[0_0_6px_hsl(var(--gold-warm)/0.4)]
                          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
               style={{ background: "hsl(var(--primary) / 0.08)" }} 
          />
          
          {/* Ambient halo on hover */}
          <div className="absolute inset-0 -m-4 opacity-0
                          group-hover:opacity-100
                          group-focus-visible:opacity-100
                          transition-opacity duration-700 pointer-events-none"
               style={{ 
                 background: "radial-gradient(circle, hsl(var(--gold-warm) / 0.04) 0%, transparent 70%)" 
               }}
          />
        </div>
      ) : (
        <div className="size-1.5 rounded-full bg-border" />
      )}
    </div>
);

export default SectionDivider;
