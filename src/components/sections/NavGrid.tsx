import { Section } from "@/components/ui/section";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import BentoCard from "@/components/BentoCard";
import { IconCalendarSacred, IconVisionEye, IconOffering, IconSeedlingQuestion, IconScrollFaq, IconDoveMessage } from "@/components/icons/BrandIcons";
import { useIsMobile } from "@/hooks/use-mobile";

import bentoDayDetails from "@/assets/bento-day-details.jpg";
import bentoVision from "@/assets/bento-vision.jpg";
import bentoSupport from "@/assets/bento-support.jpg";
import bentoFaith from "@/assets/bento-faith.jpg";
import bentoFaq from "@/assets/bento-faq.jpg";
import bentoContact from "@/assets/bento-contact.jpg";

const navCards = [
  { to: "/day-details", title: "Day Details", description: "Schedule, parking, food, weather, and everything you need to plan your visit to Mitford Park on August 8.", icon: IconCalendarSacred, image: bentoDayDetails },
  { to: "/vision", title: "Vision", description: "The story behind this gathering — why churches across Cochrane are building something together that no one church could build alone.", icon: IconVisionEye, image: bentoVision },
  { to: "/support", title: "Support", description: "Volunteer, give, pray, or bring your church alongside. Every act of generosity is an act of worship.", icon: IconOffering, image: bentoSupport },
  { to: "/faith", title: "Exploring Faith?", description: "No church background needed. No pressure. No agenda but love. If you're curious about Jesus, this is a safe place to start.", icon: IconSeedlingQuestion, image: bentoFaith },
  { to: "/faq", title: "FAQ", description: "Straightforward answers about the event, logistics, accessibility, and what to expect when you arrive.", icon: IconScrollFaq, image: bentoFaq },
  { to: "/contact", title: "Contact", description: "Reach the organizing team with questions, partnership inquiries, prayer requests, or just to say hello.", icon: IconDoveMessage, image: bentoContact },
];

export const NavGrid = () => {
  const isMobile = useIsMobile();
  return (
    <Section variant="muted" padding="md" className="relative">
      {/* Section counter */}
      <span
        aria-hidden="true"
        className="hidden md:block font-serif text-8xl text-foreground/[0.03] select-none pointer-events-none absolute top-8 left-6"
      >
        07
      </span>

      <div className="w-full pt-12 text-center md:pt-16">
        {/* Branded top separator — gradient line with diamond terminal */}
        <div className="flex items-center justify-center gap-1.5 mb-12" aria-hidden="true">
          <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border) / 0.6))" }} />
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="opacity-20">
            <rect x="3" y="0.2" width="3.8" height="3.8" rx="0.4" transform="rotate(45 3 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.08" />
          </svg>
          <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--border) / 0.6))" }} />
        </div>
        <ScrollReveal weight="light" delay={0.05}>
          <Eyebrow className="text-muted-foreground mb-3">Find your next step</Eyebrow>
        </ScrollReveal>
        <ScrollReveal weight="normal">
          <SectionHeading className="mb-6">Explore & Plan</SectionHeading>
        </ScrollReveal>
        <ScrollReveal weight="light" delay={0.12}>
          <p className="font-serif italic text-sm md:text-base text-muted-foreground/70 max-w-md mx-auto mb-12 leading-relaxed">
            "You have made us for yourself, O Lord, and our hearts are restless until they rest in you."
            <span className="block mt-1.5 not-italic font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">— Augustine, Confessions</span>
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {navCards.map((card, index) => (
            <ScrollReveal
              key={card.to}
              delay={index * 0.08}
              weight="light"
              variant={isMobile ? "blur" : "scale"}
              className={index < 2 ? "lg:col-span-2" : ""}
            >
              <BentoCard {...card} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
};
