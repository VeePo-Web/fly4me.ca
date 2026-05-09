import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading, StandardText } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import { Link } from "react-router-dom";
import thornsWood from "@/assets/thorns-wood.jpg";

export const YouAreInvited = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <ScrollReveal weight="heavy">
      <section ref={ref} className="relative w-full overflow-hidden">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0 animate-slow-zoom" style={{ y: bgY }}>
          <img
            src={thornsWood}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        {/* Blood-red overlay */}
        <div className="absolute inset-0 bg-primary/85" />

        {/* Film grain */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Decorative border with corner diamonds */}
        <div className="absolute inset-4 md:inset-8 border border-primary-foreground/[0.06] pointer-events-none z-[2]" aria-hidden="true">
          {/* Corner diamond ornaments */}
          {(['top-0 left-0 -translate-x-1/2 -translate-y-1/2', 'top-0 right-0 translate-x-1/2 -translate-y-1/2', 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2', 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'] as const).map((pos, i) => (
            <svg key={i} width="5" height="5" viewBox="0 0 5 5" fill="none" className={`absolute ${pos}`}>
              <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" fill="hsl(var(--gold-warm))" fillOpacity="0.08" stroke="hsl(var(--gold-warm))" strokeWidth="0.3" strokeOpacity="0.12" />
            </svg>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            {/* Small cross above heading */}
            <ScrollReveal weight="light" delay={0.1}>
              <div className="relative mb-8" aria-hidden="true">
                <div className="w-px h-6 bg-primary-foreground/20 mx-auto" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-px bg-primary-foreground/20" />
              </div>
            </ScrollReveal>

            <SectionHeading className="mb-5 text-primary-foreground">
              <TextReveal delay={0.2}>You're Invited</TextReveal>
            </SectionHeading>
            <ScrollReveal weight="normal" delay={0.5}>
              <StandardText className="max-w-lg mx-auto mb-8 text-primary-foreground/80">
                No ticket. No registration. No church background required. No expectations except this: come as you are.
                Bring your family. Bring your friends. Bring your doubts, your questions, your open heart.
                Stay for an hour or stay for the whole day. This gathering belongs to the whole city — and there is a place here for you.
              </StandardText>
            </ScrollReveal>
            <ScrollReveal weight="light" delay={0.7}>
              <Link
                to="/day-details"
                className="font-sans text-xs uppercase tracking-[0.2em] font-medium border border-primary-foreground/50 text-primary-foreground px-8 py-3.5 hover:bg-primary-foreground hover:text-primary hover:border-primary-foreground hover:scale-[1.02] active:scale-[0.98] active:bg-primary-foreground/10 transition-all duration-200 min-h-[48px] inline-flex items-center"
              >
                Plan Your Visit
              </Link>
            </ScrollReveal>
            <ScrollReveal weight="light" delay={0.8}>
              <div
                className="font-sans text-[11px] text-primary-foreground/50 space-y-0.5 mt-8"
                style={{ fontFeatureSettings: '"cv02"' }}
              >
                <p>August 8, 2026 &middot; 11:00 AM – 7:00 PM</p>
                <p>Mitford Park &middot; Cochrane, Alberta</p>
              </div>
            </ScrollReveal>

            {/* Bottom separator */}
            {/* Branded diamond ornament separator */}
            <div className="flex items-center gap-1.5 mt-10 mb-6" aria-hidden="true">
              <div className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.12))" }} />
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="opacity-25">
                <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="currentColor" strokeWidth="0.4" fill="currentColor" fillOpacity="0.08" className="text-primary-foreground" />
              </svg>
              <div className="w-6 h-px" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--primary-foreground) / 0.12))" }} />
            </div>

            <ScrollReveal weight="light" delay={0.9}>
              <blockquote
                className="font-serif italic text-sm text-primary-foreground/40 max-w-md mx-auto leading-relaxed"
                style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
              >
                &ldquo;The Spirit and the bride say, &lsquo;Come!&rsquo; And let the one who hears say, &lsquo;Come!&rsquo; Whoever is thirsty, let them come; and whoever wishes, let them take the free gift of the water of life.&rdquo;
              </blockquote>
              <span
                className="block text-[9px] not-italic tracking-[0.3em] uppercase text-primary-foreground/25 font-sans mt-3"
                style={{ fontFeatureSettings: '"cv02"' }}
              >
                Revelation 22 : 17 <span className="text-primary-foreground/15">&middot; NIV</span>
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};
