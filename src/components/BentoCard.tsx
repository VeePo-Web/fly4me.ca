import { Link } from "react-router-dom";
import { IconArrowMicro } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>;

/** Contextual scripture whispers — matched to card topic */
const scriptureWhispers: Record<string, string> = {
  /* Vision hub */
  "vision/mission": "For I know the plans I have for you — Jer. 29:11 NIV",
  "vision/unity": "Make every effort to keep the unity of the Spirit — Eph. 4:3 NIV",
  "vision/church-history": "Remember the days of old; consider the generations long past — Deut. 32:7 NIV",
  "vision/partners": "How good and pleasant it is when God's people live together in unity — Ps. 133:1 NIV",
  /* Day Details hub */
  "day-details/schedule": "There is a time for everything under the heavens — Ecc. 3:1 NIV",
  "day-details/parking-map": "The earth is the Lord's, and everything in it — Ps. 24:1 NIV",
  "day-details/weather": "He sends his sun and rain on the righteous and unrighteous — Matt. 5:45 NIV",
  "day-details/accessibility": "There is neither Jew nor Gentile… for you are all one in Christ Jesus — Gal. 3:28 NIV",
  "day-details/food-trucks": "Whether you eat or drink, do it all for the glory of God — 1 Cor. 10:31 NIV",
  "day-details/guidelines": "Let all things be done decently and in order — 1 Cor. 14:40 KJV",
  "day-details/what-to-bring": "Prepare your minds for action; be sober-minded — 1 Pet. 1:13 NIV",
  /* Support hub */
  "support/volunteer": "Serve one another humbly in love — Gal. 5:13 NIV",
  "support/church-partner": "Now you are the body of Christ, and each one of you is a part of it — 1 Cor. 12:27 NIV",
  "support/donate": "God loves a cheerful giver — 2 Cor. 9:7 NIV",
  "support/prayer": "The prayer of a righteous person is powerful and effective — James 5:16 NIV",
  /* Faith hub */
  "faith/get-connected": "Where two or three gather in my name, there am I — Matt. 18:20 NIV",
  "faith/questions": "Ask and it will be given to you; seek and you will find — Matt. 7:7 NIV",
  "faith/contact-pastor": "I will give you shepherds after my own heart — Jer. 3:15 NIV",
  /* Top-level fallbacks (homepage NavGrid) */
  "faq": "Ask and it will be given to you — Matt. 7:7 NIV",
  "contact": "How beautiful are the feet of those who bring good news — Rom. 10:15 NIV",
  "day-details": "This is the day the Lord has made — Ps. 118:24 NIV",
  "vision": "Where there is no vision, the people perish — Prov. 29:18 KJV",
  "support": "Each of you should give what you have decided in your heart — 2 Cor. 9:7 NIV",
  "faith": "Come now, let us reason together — Isa. 1:18 NIV",
};

/** Match scripture whisper — full path first, then first segment fallback */
const getScriptureWhisper = (path: string) => {
  const clean = path.replace(/^\//, "");
  if (scriptureWhispers[clean]) return scriptureWhispers[clean];
  const segment = clean.split("/")[0];
  return segment ? scriptureWhispers[segment] : undefined;
};

interface BentoCardProps {
  to: string;
  title: string;
  description: string;
  icon: AnyIcon;
  index?: number;
  image?: string;
}

/** Gold filigree corner ornament — top-left L-bracket with a tiny diamond */
const CornerOrnament = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute top-3 left-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
    aria-hidden="true"
  >
    <path
      d="M0,16 L0,4 Q0,0 4,0 L16,0"
      stroke="hsl(var(--gold-warm))"
      strokeWidth="0.5"
      strokeOpacity="0.2"
      fill="none"
    />
    <rect
      x="0"
      y="0"
      width="2.5"
      height="2.5"
      rx="0.3"
      transform="rotate(45 1.25 1.25)"
      fill="hsl(var(--gold-warm))"
      fillOpacity="0.12"
    />
  </svg>
);

const BentoCard = ({ to, title, description, icon: Icon, index = 0, image }: BentoCardProps) => (
  <Link
    to={to}
    style={{ perspective: "800px" }}
    className="group relative block border border-border/40 bg-card shadow-[0_1px_0_0_hsl(var(--border)/0.5)] hover:bg-card/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.08)] hover:[transform:rotateX(-1.5deg)_rotateY(0.5deg)_translateY(-2px)] active:scale-[0.98] active:shadow-inner">
    {/* Gold left accent bar — brand signature */}
    <div
      className="absolute left-0 top-0 bottom-0 w-[2.5px] transition-all duration-500 group-hover:w-[3px] z-20"
      style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--gold-warm) / 0.25))" }}
      aria-hidden="true"
    />
    {/* Background image — subtle, desaturated, reveals on hover */}
    {image && (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30 md:opacity-0 md:group-hover:opacity-30 mix-blend-multiply transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-[1.03] md:scale-100 md:group-hover:scale-[1.03] will-change-[transform,opacity]"
          loading="lazy"
        />
        {/* Light tint overlay — protects text at rest */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, hsl(var(--card) / 0.92) 0%, hsl(var(--card) / 0.78) 50%, hsl(var(--card) / 0.72) 100%)",
          }}
        />
        {/* Dark scrim overlay — reveals on hover for text readability */}
        <div
          className="absolute inset-0 z-[5] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.40) 60%, rgba(0,0,0,0.55) 100%)",
            backdropFilter: "blur(1px)",
          }}
        />
      </div>
    )}

    {/* Ghost index number */}
    {typeof index === "number" && (
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-serif text-[3.5rem] leading-none text-foreground/[0.04] group-hover:text-foreground/[0.06] transition-colors duration-700 select-none pointer-events-none z-10"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    )}

    {/* Top accent — thin gold-to-primary gradient, reveals on hover */}
    <div
      className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-700 origin-left z-20"
      style={{
        background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.35), hsl(var(--primary) / 0.25), transparent)",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden="true"
    />

    {/* Corner ornament */}
    <CornerOrnament />

    {/* Always-visible warm tint — breaks flat white */}
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: "radial-gradient(ellipse 100% 80% at 30% 100%, hsl(var(--gold-warm) / 0.03), transparent 60%)",
      }}
      aria-hidden="true"
    />

    {/* Hover glow — subtle warm radial at top */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.03), transparent 70%)",
      }}
      aria-hidden="true"
    />


    {/* Bottom accent line — reveals on hover */}
    <div
      className="absolute bottom-0 left-0 right-0 h-px scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-700 origin-right z-20"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), hsl(var(--gold-warm) / 0.15))",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 p-6 sm:p-7 md:p-8 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:backdrop-blur-[6px]">
      <div className="flex items-start justify-between mb-5">
        <div className="relative rounded-sm border border-white/25 bg-white/10 md:border-border/30 md:bg-muted/40 p-2.5 md:group-hover:bg-accent/60 md:group-hover:border-primary/15 transition-all duration-500 backdrop-blur-sm">
          {/* Corner notch — editorial detail */}
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-white/20 md:border-border/20 md:group-hover:border-primary/15 transition-colors duration-500" aria-hidden="true" />
          <Icon className="text-white/90 md:text-muted-foreground md:group-hover:text-foreground transition-colors duration-500" size={22} strokeWidth={1.2} />
        </div>
        <div className="text-white/50 md:text-muted-foreground/0 md:group-hover:text-primary/50 md:group-hover:translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2">
          <IconArrowMicro size={10} />
        </div>
      </div>
      <h3 className={cn("font-serif text-lg font-semibold mb-2.5 tracking-[-0.01em]", image ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.7),0_2px_12px_rgba(0,0,0,0.45),0_4px_24px_rgba(0,0,0,0.2)] md:text-foreground md:[text-shadow:none] md:group-hover:text-white md:group-hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.7),0_2px_12px_rgba(0,0,0,0.45),0_4px_24px_rgba(0,0,0,0.2)] transition-colors duration-500" : "text-foreground")}>{title}</h3>

      {/* Gold diamond separator — scales in on hover */}
      <div className="flex items-center gap-2 mb-2.5" aria-hidden="true">
        <div className="h-px flex-1 max-w-[24px] bg-border/40 group-hover:bg-primary/15 group-hover:max-w-[28px] transition-all duration-700" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />
        <div className="w-[5px] h-[5px] rotate-45 bg-border/30 group-hover:bg-primary/25 scale-75 group-hover:scale-100 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "100ms" }} />
        <div className="h-px flex-1 max-w-[24px] bg-border/40 group-hover:bg-primary/15 group-hover:max-w-[28px] transition-all duration-700" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>

      <p className={cn("font-sans text-[15px] sm:text-sm leading-[1.65] max-w-none", image ? "text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.7),0_2px_10px_rgba(0,0,0,0.4)] md:text-foreground/70 md:[text-shadow:none] md:group-hover:text-white/90 md:group-hover:[text-shadow:0_1px_4px_rgba(0,0,0,0.7),0_2px_10px_rgba(0,0,0,0.4)] transition-colors duration-500" : "text-foreground/70")}>{description}</p>

      {/* Scripture whisper — fades in on hover */}
      {getScriptureWhisper(to) && (
        <p
          className={cn("font-serif italic text-sm tracking-[0.04em] transition-colors duration-700 mt-4 leading-relaxed", image ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.3)] md:text-primary/70 md:[text-shadow:none] md:group-hover:text-white/90 md:group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.3)]" : "text-primary/70 group-hover:text-primary/90")}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "150ms" }}
        >
          <span className={cn("transition-colors duration-700 mr-1.5", image ? "text-white/50 md:text-[hsl(var(--gold-warm)/0.7)] md:group-hover:text-white/50" : "text-[hsl(var(--gold-warm)/0.7)] group-hover:text-[hsl(var(--gold-warm)/0.9)]")} aria-hidden="true">—</span>
          {getScriptureWhisper(to)}
        </p>
      )}
    </div>
  </Link>
);

export default BentoCard;
