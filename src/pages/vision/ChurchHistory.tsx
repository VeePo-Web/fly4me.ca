import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import VisionNav from "@/components/VisionNav";
import BackLink from "@/components/BackLink";
import ImageInterstitial from "@/components/ImageInterstitial";

import SectionNumber from "@/components/SectionNumber";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import churchesCandles from "@/assets/churches-candles.jpg";

const timelineItems = [
  {
    era: "Generations Past",
    heading: "Deep Roots",
    body: "Cochrane's faith community did not appear overnight. Churches have served this city for generations — through seasons of growth and seasons of quiet faithfulness.",
  },
  {
    era: "Present Day",
    heading: "Diverse Expressions",
    body: "The churches of Cochrane are different from one another — in style, in tradition, in the way they gather. That is not a weakness. It is the design. As Paul wrote: there are different kinds of gifts, but the same Spirit distributes them.",
  },
  {
    era: "August 8, 2026",
    heading: "A Shared Altar",
    body: "This event is one expression of the shared commitment to honor Jesus publicly — a moment where the invisible unity of the Spirit becomes visible in the park.",
  },
];

const ChurchHistory = () => {
  const lenis = useSmoothScroll();
  const scrollToAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) { lenis.scrollTo(`#${id}`, { offset: -96 }); }
    else { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  return (
  <PageShell>
    <SubPageHeader
      title="Church History in Cochrane"
      subtitle="There is identity in history. Cochrane's faith runs deep."
      eyebrow="Vision"
      image={churchesCandles}
    />

    <EditorialContainer layout="sidebar">
      {/* Sidebar Navigation */}
      <aside className="sticky top-32 hidden lg:flex flex-col gap-6">
        <Link
          to="/vision"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Vision
        </Link>
        <div className="pt-6 border-t border-border/40">
          <Eyebrow className="mb-3 text-muted-foreground">In This Section</Eyebrow>
          <nav className="flex flex-col gap-3">
            <a href="#faith-presence" onClick={(e) => scrollToAnchor(e, "faith-presence")} className="text-sm font-medium link-reveal pb-0.5 self-start">Faith Presence</a>
            <a href="#continuing-story" onClick={(e) => scrollToAnchor(e, "continuing-story")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">A Continuing Story</a>
            <a href="#why-unity" onClick={(e) => scrollToAnchor(e, "why-unity")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">Why Unity Matters</a>
          </nav>
        </div>
      </aside>

      {/* Main Editorial Content */}
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Mobile Back Link */}
        <div className="lg:hidden">
          <BackLink to="/vision" label="Back to Vision" />
        </div>

        <ScrollReveal>
          <section id="faith-presence" className="scroll-mt-32 relative">
            <SectionNumber number="01" />
            <SectionHeading className="mb-6">Faith Presence in the City</SectionHeading>
            <StandardText className="text-lg">
              Worship in the Park is not an isolated event. It is a continuation of the city's spiritual story — a story that stretches back further than any one of us. The ground we worship on has been prayed over for decades.
            </StandardText>
          </section>
        </ScrollReveal>

        <ScriptureWhisper
          verse="Remember the days of old; consider the generations long past."
          reference="Deuteronomy 32:7"
          variant="anchor"
        />
      </div>
    </EditorialContainer>

    {/* Timeline-style section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full" id="continuing-story">
        <ScrollReveal>
          <div className="mb-10">
            {/* Gold diamond separator */}
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">A Continuing Story</Eyebrow>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical timeline line — desktop */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border/40 hidden md:block" aria-hidden="true" />

          <div className="flex flex-col gap-6">
            {timelineItems.map((item, i) => (
              <ScrollReveal key={item.era} delay={i * 0.1}>
                <div className="relative md:pl-10 group hover:translate-x-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1.5 top-1.5 size-3 rounded-full border-2 border-primary/30 bg-card hidden md:block"
                    aria-hidden="true"
                  />

                  <div className="relative border border-border/40 bg-card p-6 md:p-8 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
                      style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="pl-3">
                      <p
                        className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-2 group-hover:text-foreground/70 transition-colors duration-300"
                        style={{ fontFeatureSettings: '"cv02"' }}
                      >
                        {item.era}
                      </p>
                      <h3
                        className="font-serif text-lg md:text-xl font-light text-foreground mb-3"
                        style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
                      >
                        {item.heading}
                      </h3>
                      <StandardText className="text-sm">{item.body}</StandardText>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>

    <ImageInterstitial src={churchesCandles} alt="Church candles — a city's faith stretching back generations" verse="Remember the days of old; consider the generations long past." reference="Deuteronomy 32:7" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <PullQuote>
          The ground we worship on has been prayed over for decades.
        </PullQuote>

        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section id="why-unity" className="scroll-mt-32 relative">
            <SectionNumber number="02" />
            <SectionHeading className="mb-6">Why Unity Matters</SectionHeading>
            <StandardText>
              Unity is not uniformity. It is the visible willingness of churches to stand together before the city and declare: we worship the same Lord. We are brothers and sisters under one King. And we want Cochrane to see it — not because we have arrived, but because He is worthy of it.
            </StandardText>
          </section>
        </ScrollReveal>

        {/* Cross-link to Partners page */}
        <ScrollReveal>
          <Link
            to="/vision/partners"
            className="group relative flex items-center justify-between border border-border/40 bg-muted/20 hover:bg-muted/40 p-5 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
              style={{
                background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 pl-3">
              <p className="text-sm font-medium text-foreground">See Partnered Churches</p>
              <p className="text-xs text-muted-foreground mt-0.5">Which churches are standing together</p>
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground group-hover:text-foreground/70 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 relative z-10" />
          </Link>
        </ScrollReveal>

        <ScriptureWhisper
          verse="The Lord has done great things for us, and we are filled with joy."
          reference="Psalm 126:3"
          variant="interstitial"
        />

        {/* Benediction border before nav */}
        <div className="border-t border-border/30 pt-12">
          <VisionNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
  );
};

export default ChurchHistory;
