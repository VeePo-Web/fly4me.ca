import { useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import FooterAtmosphere from "@/components/footer/FooterAtmosphere";
import FooterCenterpiece from "@/components/footer/FooterCenterpiece";
import FooterCountdown from "@/components/footer/FooterCountdown";
import FooterBrand from "@/components/footer/FooterBrand";
import FooterBottom from "@/components/footer/FooterBottom";
import FooterThreshold from "@/components/footer/FooterThreshold";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import LogoMark from "@/components/LogoMark";

const easeHeavy: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Footer = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const veilOpacity = useTransform(scrollYProgress, [0, 0.15], [0.85, 0]);

  const rafRef = useRef<number>(0);
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        el.style.setProperty("--mouse-x", String(x));
        el.style.setProperty("--mouse-y", String(y));
      });
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const lenis = useSmoothScroll();
  const handleScrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [lenis]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Theatrical veil */}
      <motion.div
        className="footer-veil"
        style={{ opacity: veilOpacity }}
        aria-hidden="true"
      />

      <FooterThreshold scrollYProgress={scrollYProgress} />

      <footer
        ref={footerRef}
        className="relative bg-foreground text-background overflow-hidden"
        style={{ ["--mouse-x" as string]: "0", ["--mouse-y" as string]: "0" }}
      >
        {/* Layer 0 — Atmosphere */}
        <FooterAtmosphere scrollYProgress={scrollYProgress} />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center w-full px-6 md:px-12">
          {/* Brand identity — full width above grid */}
          <div className="w-full pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 font-serif text-xl md:text-2xl tracking-[0.02em] text-background hover:text-background/80 transition-colors duration-300 group"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.5, ease: easeHeavy }}
                className="relative"
              >
                <LogoMark size={36} variant="white" />
              </motion.div>
              <span className="relative">
                <span className="font-semibold">Worship</span>
                <span className="font-light"> in the Park</span>
              </span>
            </Link>

            <p
              className="text-[11px] font-sans uppercase tracking-[0.2em] text-background/70"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              Cochrane, Alberta
            </p>

            <p
              className="text-[11px] font-sans uppercase tracking-[0.2em] text-background/60 flex flex-wrap justify-center items-center"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              <span className="whitespace-nowrap">One day</span>
              <span className="inline-block text-background/30 select-none mx-[0.15em] animate-pulse" aria-hidden="true">&middot;</span>
              <span className="whitespace-nowrap">One church</span>
              <span className="inline-block text-background/30 select-none mx-[0.15em] animate-pulse" style={{ animationDelay: "1.3s" }} aria-hidden="true">&middot;</span>
              <span className="whitespace-nowrap">One King</span>
              <span className="inline-block text-background/30 select-none mx-[0.15em]" aria-hidden="true">&middot;</span>
              <span className="whitespace-nowrap normal-case tracking-[0.12em] text-background/75">August 8, 2026</span>
            </p>
          </div>

          {/* Three-column layout: Countdown | Cross Nav | Verse */}
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 items-center py-8 md:py-12">
            {/* Left — Countdown */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <FooterCountdown />
            </div>

            {/* Center — Cross nav */}
            <div className="flex justify-center order-1 md:order-2">
              <FooterBrand />
            </div>

            {/* Right — Verse */}
            <div className="flex justify-center md:justify-end order-3">
              <FooterCenterpiece />
            </div>
          </div>

          {/* Ground line */}
          <div className="w-full max-w-2xl mx-auto" aria-hidden="true">
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, hsl(var(--gold-warm) / 0.15) 30%, hsl(30 30% 35% / 0.2) 50%, hsl(var(--gold-warm) / 0.15) 70%, transparent 95%)",
              }}
            />
          </div>

          {/* Bottom: closing line, copyright, Soli Deo Gloria */}
          <div className="w-full pt-8 pb-6">
            <FooterBottom scrollYProgress={scrollYProgress} />
          </div>

          {/* Scroll to top */}
          <div className="w-full flex justify-center pb-10">
            <button
              onClick={handleScrollToTop}
              className="group relative flex flex-col items-center gap-3 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground rounded-sm min-w-[44px] min-h-[44px] p-3"
              aria-label="Scroll to top"
            >
              <svg
                width="16"
                height="32"
                viewBox="0 0 16 32"
                fill="none"
                className="text-background/30 group-hover:text-background/45 transition-colors duration-700 animate-[ascend-bob_4s_ease-in-out_infinite]"
              >
                <path d="M4 10 L8 4 L12 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <line x1="8" y1="4" x2="8" y2="30" stroke="currentColor" strokeWidth="0.5" />
                <line x1="3" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="0.5" />
                <line x1="5" y1="30" x2="11" y2="30" stroke="currentColor" strokeWidth="0.4" />
              </svg>

              <span
                className="text-[8px] font-sans uppercase tracking-[0.3em] sm:tracking-[0.5em] text-background/30 group-hover:text-background/40 transition-all duration-700 sm:group-hover:tracking-[0.6em]"
                style={{ fontFeatureSettings: '"cv02"', transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                ascend
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
