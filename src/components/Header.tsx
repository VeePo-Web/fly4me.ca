import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconMenuBrand, IconCloseBrand } from "@/components/icons/BrandIcons";
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import veepoLogo from "@/assets/veepo-logo.png";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [veilDelay, setVeilDelay] = useState(0.6);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastYRef = useRef(0);
  const hasEnteredRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();

  /* Scroll progress — thin gold line at top of viewport */
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 0.4, 0.4, 0]);

  // Track scroll position + direction for auto-hide
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    const delta = latest - lastYRef.current;
    if (delta > 8 && latest > 100) {
      setScrollDirection("down");
    } else if (delta < -5) {
      setScrollDirection("up");
    }
    lastYRef.current = latest;
  });

  // Delay header entrance when veil is active on transparent (hero) pages
  useEffect(() => {
    if (!transparent) return;
    const veilEl = document.querySelector("[data-veil-intro]");
    if (veilEl) {
      const onComplete = () => {
        setVeilDelay(0);
        window.removeEventListener("veil-complete", onComplete);
      };
      setVeilDelay(99);
      window.addEventListener("veil-complete", onComplete);

      return () => window.removeEventListener("veil-complete", onComplete);
    }
  }, [transparent]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const headerDelay = veilDelay === 99 ? 99 : veilDelay === 0 ? 1.5 : 0.6;

  // Flip hasEntered after initial entrance so scroll show/hide has zero delay
  useEffect(() => {
    if (headerDelay < 90) {
      const t = setTimeout(() => { hasEnteredRef.current = true; }, (headerDelay + 0.5) * 1000);
      return () => clearTimeout(t);
    }
  }, [headerDelay]);

  const links = [
    { to: "/day-details", label: "Day Details" },
    { to: "/vision", label: "Vision" },
    { to: "/support", label: "Support" },
    { to: "/faith", label: "Exploring Faith?", seeker: true },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogoClick = () => {
    sessionStorage.removeItem("veil-played");
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  // Dynamic background for transparent header after scroll
  const showSolidBg = transparent && (scrolled || mobileOpen);
  const shouldHide = scrollDirection === "down" && scrolled && !mobileOpen;

  return (
    <>
      {/* Scroll progress indicator — gold thread at very top of viewport */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[60] origin-left pointer-events-none will-change-transform"
        style={{
          scaleX: progressScaleX,
          opacity: progressOpacity,
          background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.5), hsl(var(--primary) / 0.3))",
        }}
        aria-hidden="true"
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-500 ${
          transparent
            ? showSolidBg
              ? "bg-card/95 backdrop-blur-md border-b border-border/50 shadow-[0_1px_12px_-4px_rgba(0,0,0,0.08)]"
              : "bg-transparent"
            : "bg-card/95 backdrop-blur-md border-b border-border/50 shadow-[0_1px_12px_-4px_rgba(0,0,0,0.08)]"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={
          headerDelay < 90
            ? { opacity: shouldHide ? 0 : 1, y: shouldHide ? -80 : 0 }
            : { opacity: 0, y: -20 }
        }
        transition={{ duration: shouldHide ? 0.3 : 0.4, ease: easeHeavy, delay: hasEnteredRef.current ? 0 : (headerDelay < 90 ? headerDelay : 0) }}
      >
        {/* Gold accent line — appears below header on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSolidBg ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(90deg, transparent 5%, hsl(var(--gold-warm) / 0.08) 30%, hsl(var(--gold-warm) / 0.12) 50%, hsl(var(--gold-warm) / 0.08) 70%, transparent 95%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
              <motion.button
                onClick={handleLogoClick}
                whileHover={{ rotate: 6, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: easeHeavy }}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                aria-label="Replay intro animation"
              >
                <LogoMark size={40} variant={transparent && !showSolidBg ? "white" : "default"} hoverRed />
              </motion.button>
              <Link to="/" className="group">
                <span
                  className={`relative font-serif text-lg md:text-xl tracking-[0.02em] transition-colors duration-500 ${
                    transparent && !showSolidBg ? "text-white" : "text-foreground"
                  }`}
                >
                  <span className="font-semibold">Worship</span>
                  <span className="font-light"> in the Park</span>
                  <span
                    className="absolute -bottom-1 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{
                      background: transparent && !showSolidBg
                        ? "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))"
                        : "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--gold-warm) / 0.08))",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={headerDelay < 90 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: easeHeavy, delay: (headerDelay < 90 ? headerDelay : 0) + 0.1 + i * 0.05 }}
              >
                <Link
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className={`relative text-[13px] tracking-[0.04em] font-sans transition-all duration-300 pb-1 link-reveal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
                    link.seeker ? "font-medium" : ""
                  } ${
                    transparent && !showSolidBg
                      ? `${isActive(link.to) ? "text-white" : "text-white/70"} hover:text-white`
                      : `${isActive(link.to) ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`
                  }`}
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  {link.label}
                  {/* Active indicator — dot with layoutId spring animation */}
                  {isActive(link.to) && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
                      layoutId="nav-active-dot"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <span className="size-1 rounded-full bg-primary" />
                      {/* Subtle glow beneath active dot */}
                      <span
                        className="size-3 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[3px]"
                        style={{ background: "hsl(var(--primary) / 0.15)" }}
                        aria-hidden="true"
                      />
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <button
            className={`md:hidden transition-colors duration-500 ${
              transparent && !showSolidBg ? "text-white" : "text-foreground"
            } p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {mobileOpen ? <IconCloseBrand size={24} /> : <IconMenuBrand size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile navigation"
              className="md:hidden bg-card/98 backdrop-blur-sm border-t border-border/50 px-6 py-4 overflow-y-auto max-h-[calc(100dvh-64px)]"
              style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.35, ease: easeHeavy, delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(link.to) ? "page" : undefined}
                    className={`group/mlink relative flex py-3.5 text-[13px] tracking-[0.04em] font-sans border-t border-border/30 first:border-t-0 transition-all duration-300 min-h-[48px] items-center -mx-2 px-2 rounded-sm hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                      link.seeker ? "font-medium text-foreground" : ""
                    } ${
                      isActive(link.to)
                        ? "text-foreground bg-accent/20"
                        : "text-muted-foreground"
                    } hover:text-foreground`}
                    style={{ fontFeatureSettings: '"cv02"' }}
                  >
                    {/* Active accent — gold dot */}
                    {isActive(link.to) && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 size-1 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    {/* Index numeral — editorial detail */}
                    <span
                      className="text-[9px] font-serif text-muted-foreground/30 tabular-nums w-5 text-right mr-3 flex-shrink-0"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                    {/* Hover arrow */}
                    <svg
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className="ml-auto opacity-0 group-hover/mlink:opacity-40 transition-opacity duration-200 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="pt-4 mt-2 border-t border-border/20"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <Link
                  to="/day-details"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-primary/[0.08] hover:bg-primary/[0.12] border border-primary/15 text-foreground text-[13px] font-sans uppercase tracking-[0.12em] transition-colors duration-300"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  Plan Your Visit
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

              {/* Mobile menu footer — branded cross ornament + event info */}
              <motion.div
                className="pt-3 mt-3 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="opacity-[0.08]" aria-hidden="true">
                  <line x1="5" y1="0" x2="5" y2="16" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
                  <line x1="1" y1="5" x2="9" y2="5" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
                  <circle cx="5" cy="5" r="0.6" fill="hsl(var(--gold-warm))" fillOpacity="0.15" />
                </svg>
                <p
                  className="text-[11px] font-sans uppercase tracking-[0.25em] text-muted-foreground/40 text-center max-w-none"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  August 8, 2026 · Mitford Park · Cochrane
                </p>
              </motion.div>

              {/* Powered by VeePo badge — mobile nav */}
              <motion.div
                className="pt-3 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <a
                  href="https://veepo.ca/services/web-development"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit VeePo.ca - website developer"
                  className="inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span
                    className="text-[10px] font-sans tracking-[0.08em] text-muted-foreground/40"
                    style={{ fontFeatureSettings: '"cv02"' }}
                  >
                    this website{" "}
                    <span className="text-[hsl(28_87%_58%)]">powered</span>
                    {" "}by
                  </span>
                  <img
                    src={veepoLogo}
                    alt="VeePo"
                    className="h-[32px] w-auto opacity-40"
                  />
                </a>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
