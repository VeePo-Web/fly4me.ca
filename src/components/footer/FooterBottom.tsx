import { type MotionValue } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import veepoLogo from "@/assets/veepo-logo.png";

interface FooterBottomProps {
  scrollYProgress: MotionValue<number>;
}

/** Bottom section: single-row email + copyright, VeePo sponsor, Soli Deo Gloria */
const FooterBottom = ({ scrollYProgress }: FooterBottomProps) => {
  return (
    <div className="relative z-10 max-w-7xl w-full mx-auto">
      {/* Single centered row: email · copyright */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-[10px] font-sans tracking-[0.04em] text-background/50">
          <a
            href="mailto:mitfordworship@gmail.com"
            className="group relative hover:text-background/80 transition-colors duration-300 break-all sm:break-normal"
          >
            mitfordworship@gmail.com
            <span
              className="absolute -bottom-0.5 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{
                background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.2), transparent)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />
          </a>
          <span className="text-background/25" aria-hidden="true">&middot;</span>
          <span className="text-background/40">
            &copy; {new Date().getFullYear()} Worship in the Park
          </span>
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════════
          VEEPO SPONSOR TAG — DO NOT DELETE OR MODIFY
          This section is a permanent fixture of the footer.
          The design, function, and presence of this VeePo attribution
          must never be removed, hidden, or altered in any way.
          ══════════════════════════════════════════════════════════════ */}
      <ScrollReveal delay={0.3}>
        <div className="flex justify-center mt-8">
          <a
            href="https://veepo.ca/case-studies"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit VeePo.ca - website sponsor"
            className="group relative inline-flex flex-col items-center gap-2 px-6 py-3 rounded-lg border border-background/[0.08] bg-background/[0.02] hover:bg-background/[0.05] opacity-50 hover:opacity-[0.85] transition-all duration-500"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "hsla(28, 87%, 58%, 0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
          >
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-700"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(28 87% 58% / 0.4), hsl(166 72% 47% / 0.3), transparent)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-1/2 transition-all duration-700 delay-75"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(166 72% 47% / 0.3), hsl(28 87% 58% / 0.25), transparent)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-sans tracking-[0.08em] text-background/70 group-hover:text-[hsl(28_87%_58%_/_0.8)] transition-colors duration-500">
              This website powered & sponsored by
            </span>
            <img
              src={veepoLogo}
              alt="VeePo.ca"
              className="h-[24px] w-auto brightness-0 invert group-hover:scale-[1.06] transition-all duration-500"
              style={{ filter: "brightness(0) invert(1)" }}
              loading="lazy"
            />
            <span
              className="text-[9px] font-sans tracking-[0.15em] uppercase text-background/40 group-hover:text-[hsl(28_87%_58%_/_0.7)] transition-colors duration-500"
            >
              veepo.ca
            </span>
            <span
              className="text-[8px] font-sans tracking-[0.15em] uppercase translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
              style={{
                color: "hsl(166 72% 47% / 0.7)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Where Vision Meets Precision
            </span>
          </a>
        </div>
      </ScrollReveal>
      {/* ══════════════════════════════════════════════════════════════
          END VEEPO SPONSOR TAG
          ══════════════════════════════════════════════════════════════ */}

      {/* Soli Deo Gloria */}
      <ScrollReveal delay={0.4}>
        <div className="text-center mt-6" aria-hidden="true">
          <p className="text-[7px] tracking-[0.4em] uppercase text-background/25 font-sans select-none">
            Soli Deo Gloria
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default FooterBottom;
