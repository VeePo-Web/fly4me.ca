import { Link, useLocation } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const verticalTop = [
  { to: "/", label: "Home" },
  { to: "/day-details", label: "Day Details" },
];
const verticalBottom = [
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];
const horizontalBar = [
  { to: "/vision", label: "Vision" },
  { to: "/support", label: "Support" },
  { to: "/faith", label: "Exploring Faith?" },
];

const CrossLink = ({
  to,
  label,
  isActive,
  delay,
}: {
  to: string;
  label: string;
  isActive: boolean;
  delay: number;
}) => (
  <ScrollReveal weight="light" delay={delay} direction="up">
    <Link
      to={to}
      className={`group relative flex items-center justify-center text-xs sm:text-sm font-serif font-light tracking-[0.03em] transition-colors duration-300 py-2 px-2 sm:px-4 min-h-[44px] ${
        isActive ? "text-background" : "text-background/80 hover:text-background"
      }`}
    >
      <span className="relative">
        {label}
        <span
          className="absolute -bottom-[3px] left-0 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{
            height: "1.5px",
            background:
              "linear-gradient(90deg, hsl(var(--gold-warm) / 0.4) 0%, hsl(var(--gold-warm) / 0.15) 60%, hsl(var(--gold-warm) / 0.03) 100%)",
            borderRadius: "1px",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-hidden="true"
        />
      </span>
    </Link>
  </ScrollReveal>
);

const FooterBrand = () => {
  const { pathname } = useLocation();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <div className="relative z-10 flex flex-col items-center">
      {/* Cross-shaped navigation only */}
      <nav
        className="relative flex flex-col items-center overflow-visible"
        aria-label="Footer navigation"
      >
        {/* Vertical beam */}
        <div
          className="absolute left-1/2 -top-4 -bottom-6 w-[2px] -translate-x-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(var(--gold-warm) / 0.45) 12%, hsl(var(--gold-warm) / 0.45) 88%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top arm */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          {verticalTop.map((link, i) => (
            <CrossLink
              key={link.to}
              to={link.to}
              label={link.label}
              isActive={isActive(link.to)}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* Crossbar */}
        <div className="relative my-7 md:my-8 w-full max-w-[420px] md:max-w-[520px]">
          <div
            className="absolute top-1/2 -translate-y-1/2 -left-12 -right-12 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--gold-warm) / 0.45) 8%, hsl(var(--gold-warm) / 0.45) 92%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Intersection marker */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 pointer-events-none"
            style={{ background: "hsl(var(--gold-warm) / 0.45)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-3 w-full">
            {horizontalBar.map((link, i) => (
              <div key={link.to} className="flex justify-center">
                <CrossLink
                  to={link.to}
                  label={link.label}
                  isActive={isActive(link.to)}
                  delay={(i + 2) * 0.06}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom arm */}
        <div className="relative z-10 flex flex-col items-center gap-2 pt-4">
          {verticalBottom.map((link, i) => (
            <CrossLink
              key={link.to}
              to={link.to}
              label={link.label}
              isActive={isActive(link.to)}
              delay={(i + 5) * 0.06}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FooterBrand;