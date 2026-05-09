import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  to: string;
  label: string;
}

/**
 * Branded back-link — CSS-only entrance animation, no framer-motion.
 * Features a gold left accent bar, uppercase tracking, and subtle hover lift.
 */
const BackLink = ({ to, label }: BackLinkProps) => (
  <div className="self-start animate-[back-link-in_0.5s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
    <Link
      to={to}
      className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 border border-transparent hover:border-border/30 hover:bg-muted/20 transition-all duration-300 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Gold left accent bar — appears on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500"
        style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--gold-warm) / 0.2))" }}
        aria-hidden="true"
      />

      <span className="inline-flex overflow-hidden flex-shrink-0">
        <ArrowLeft
          size={12}
          strokeWidth={1.5}
          className="text-muted-foreground/70 group-hover:text-foreground/80 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:animate-[arrow-nudge_0.6s_ease-in-out]"
        />
      </span>
      <span
        className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted-foreground group-hover:text-foreground transition-colors duration-300"
        style={{ fontFeatureSettings: '"cv02"' }}
      >
        {label}
      </span>

      {/* Gold dot accent */}
      <span className="block size-1 rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300 flex-shrink-0" />
    </Link>
  </div>
);

export default BackLink;
