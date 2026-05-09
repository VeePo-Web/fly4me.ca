import { useState, useEffect, useCallback } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import SectionDivider from "@/components/SectionDivider";
import SectionNumber from "@/components/SectionNumber";
import VisionNav from "@/components/VisionNav";
import { Link } from "react-router-dom";
import { Mail, MapPin, Globe, ArrowUpRight, Cross } from "lucide-react";
import BackLink from "@/components/BackLink";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import bentoVision from "@/assets/bento-vision.jpg";
import ImageInterstitial from "@/components/ImageInterstitial";
import churchesCandles from "@/assets/churches-candles.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { churchProfiles, additionalChurches } from "@/data/church-profiles";
import type { ChurchProfile } from "@/data/church-profiles";

/* ─── Small Heading Cross ─────────────────────────────── */

const HeadingCross = () => (
  <div className="flex items-center justify-start mb-4" aria-hidden="true">
    <div className="relative w-6 h-6">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-blood/30" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-blood/30" />
    </div>
  </div>
);

/* ─── Cross Bullet (sidebar + roster) ──────────────────── */

const CrossBullet = ({ active = false }: { active?: boolean }) => (
  <span className="inline-block relative w-2.5 h-2.5 flex-shrink-0" aria-hidden="true">
    <span className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 transition-colors duration-300 ${active ? "bg-primary/60" : "bg-primary/25"}`} />
    <span className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 transition-colors duration-300 ${active ? "bg-primary/60" : "bg-primary/25"}`} style={{ top: "35%" }} />
  </span>
);

/* ─── Church Card ──────────────────────────────────────── */

const ChurchCard = ({
  church,
  onContact,
}: {
  church: ChurchProfile;
  onContact: () => void;
}) => (
  <article className="group/card relative bg-card rounded-sm p-6 md:p-10 lg:p-12 overflow-hidden transition-all duration-300 hover:shadow-lg">
    {/* Gold gradient left accent bar */}
    <div
      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 group-hover/card:w-[3px]"
      style={{ background: 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--gold-warm)))' }}
    />

    {/* Hover-reveal top accent line */}
    <div
      className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/60 via-gold-warm/40 to-transparent origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    />

    {/* Single subtle cross watermark — top right only */}
    <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none opacity-40">
      <div className="relative w-16 h-16">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-foreground/[0.04]" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-foreground/[0.04]" />
      </div>
    </div>

    {/* Church Image */}
    <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden rounded-sm ring-1 ring-border/50 shadow-sm transition-shadow duration-300 group-hover/card:shadow-md">
      <img
        src={church.churchImage}
        alt={`${church.name} building`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/10 to-transparent" />
    </div>

    {/* Church contact photo with halo ring effect */}
    <div className="-mt-10 md:-mt-12 ml-4 md:ml-6 relative z-10 mb-6">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted overflow-hidden ring-2 ring-background ring-offset-4 ring-offset-blood/[0.06] shadow-lg transition-all duration-300 group-hover/card:ring-offset-primary/10 group-hover/card:shadow-xl">
        <img
          src={church.churchContactImage}
          alt={`${church.name} contact`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-4">
      <div>
        <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-wider font-sans mb-3 transition-colors duration-300 group-hover/card:bg-primary/10 group-hover/card:text-primary">
          <Cross size={10} strokeWidth={1.5} className="text-blood/50 transition-colors duration-300 group-hover/card:text-primary" />
          {church.denomination}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-card-foreground transition-colors duration-300 group-hover/card:text-primary">
          {church.name}
        </h3>
      </div>

      <StandardText>{church.mission}</StandardText>

      <blockquote className="relative pl-5 py-2 my-2 border-l border-blood/15 transition-colors duration-300 group-hover/card:border-primary/30">
        <span
          className="absolute -top-4 -left-1 font-serif text-6xl text-foreground/[0.08] leading-none select-none transition-colors duration-300 group-hover/card:text-primary/10"
          aria-hidden="true"
        >
          "
        </span>
        <p className="font-serif text-base md:text-lg italic text-foreground/80 leading-relaxed">
          {church.churchQuote}
        </p>
        <cite className="block mt-3 text-xs uppercase tracking-wider text-muted-foreground not-italic font-sans">
          — {church.name}
        </cite>
      </blockquote>

      <button
        onClick={onContact}
        className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors self-start mt-2 pb-0.5 border-b border-border hover:border-primary"
      >
        <Mail size={14} />
        Message {church.name}
      </button>
    </div>
  </article>
);

/* ─── Main Page ────────────────────────────────────────── */

const Partners = () => {
  const [selectedChurch, setSelectedChurch] = useState<ChurchProfile | null>(null);
  const [activeChurchId, setActiveChurchId] = useState<string | null>(null);
  const lenis = useSmoothScroll();
  const { openPanel } = useContactPanel();

  const scrollToAnchor = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -96 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lenis]);

  // Scroll-spy for church cards
  useEffect(() => {
    const ids = churchProfiles.map((c) => `church-${c.id}`);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveChurchId(entry.target.id.replace("church-", ""));
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageShell>
      <SubPageHeader
        title="Partnered Churches"
        subtitle="One day. Many congregations. No platform belongs to any single church — it belongs to the King, and He has called His people to build it together."
        eyebrow="Vision"
        image={bentoVision}
      />

      {/* Two-column layout: sticky sidebar + scrolling content */}
      <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16 items-start">

          {/* ── Sticky Sidebar ──────────────────────────── */}
          <aside className="lg:sticky lg:top-32 flex flex-col gap-6">
            <BackLink to="/vision" label="Back to Vision" />

            {/* Churches list — desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                <div className="w-px h-4 bg-primary/20" />
                <div className="w-3 h-px bg-primary/15" style={{ marginTop: "35%" }} />
              </div>
              <Eyebrow className="text-muted-foreground/70 mb-4">Churches</Eyebrow>
              <nav className="flex flex-col gap-2" aria-label="Partnered churches">
                {churchProfiles.map((church) => {
                  const isActive = activeChurchId === church.id;
                  return (
                    <a
                      key={church.id}
                      href={`#church-${church.id}`}
                      onClick={(e) => scrollToAnchor(e, `church-${church.id}`)}
                      className={`group inline-flex items-center gap-2.5 py-1.5 text-sm font-serif transition-all duration-300 ${isActive ? "text-foreground translate-x-0.5" : "text-muted-foreground/70 hover:text-foreground"}`}
                      style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
                    >
                      <CrossBullet active={isActive} />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                        {church.name}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Decorative cross — visible only on desktop */}
            <div className="hidden lg:block mt-4" aria-hidden="true">
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-primary">
                <line x1="10" y1="0" x2="10" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
                <circle cx="10" cy="8" r="1" fill="hsl(var(--primary))" fillOpacity="0.06" />
              </svg>
            </div>
          </aside>

          {/* ── Main Content Column ────────────────────── */}
          <div className="flex flex-col gap-16 md:gap-24 text-left">

            {/* 01 — Standing Together */}
            <ScrollReveal>
              <section className="relative">
                <SectionNumber number="01" />
                <HeadingCross />
                <SectionHeading className="mb-6">Standing Together</SectionHeading>
                <StandardText className="text-lg max-w-2xl">
                  These churches have answered the call — not to promote themselves, but to lay down their names for the sake of one Name. Each brings its own gifts: worship teams, volunteers, prayer, presence. Together, they form a shared altar for the city.
                </StandardText>
              </section>
            </ScrollReveal>

            {/* Scripture */}
            <ScriptureWhisper
              verse="There is one body and one Spirit… one Lord, one faith, one baptism."
              reference="Ephesians 4:4–5"
              variant="interstitial"
            />

            <PullQuote attribution="Irenaeus of Lyon, Against Heresies">
              The glory of God is man fully alive.
            </PullQuote>

            {/* Mobile pill strip */}
            <div className="lg:hidden -mt-8">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {churchProfiles.map((church) => {
                  const isActive = activeChurchId === church.id;
                  return (
                    <a
                      key={church.id}
                      href={`#church-${church.id}`}
                      onClick={(e) => scrollToAnchor(e, `church-${church.id}`)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 border whitespace-nowrap ${
                        isActive
                          ? "bg-primary/10 text-foreground border-primary/30"
                          : "bg-muted/50 text-muted-foreground border-border/50 hover:text-foreground"
                      }`}
                    >
                      {church.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 02 — Church Profile Cards */}
            <section className="relative">
              <SectionNumber number="02" />

              <div className="flex flex-col gap-8 md:gap-10">
                {churchProfiles.map((church, index) => (
                  <div key={church.id} id={`church-${church.id}`} style={{ scrollMarginTop: "6rem" }}>
                    <ScrollReveal delay={index * 0.1}>
                      <ChurchCard
                        church={church}
                        onContact={() => setSelectedChurch(church)}
                      />
                    </ScrollReveal>
                    {index < churchProfiles.length - 1 && (
                      <div className="mt-8 md:mt-10">
                        <SectionDivider variant="thorns" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <ImageInterstitial src={churchesCandles} alt="Candles in a church — many congregations, one light" verse="How good and pleasant it is when God's people live together in unity!" reference="Psalm 133:1" />

      {/* Lower sections — full width editorial */}
      <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col gap-16 md:gap-24 text-left max-w-4xl">

          {/* 03 — The Roster Grows */}
          <ScrollReveal>
            <section className="relative pt-8">
              <SectionNumber number="03" />
              <SectionDivider variant="dot" className="mb-12" />
              <HeadingCross />
              <SectionHeading className="mb-6">The Roster Grows</SectionHeading>
              <StandardText className="mb-8">
                More congregations are joining as the day approaches. This list will grow — because this day does not belong to any one of them. It belongs to God.
              </StandardText>
              <div className="flex flex-wrap gap-3">
                {additionalChurches.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center font-serif italic text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-sm border border-border/50"
                  >
                    <CrossBullet />
                    {name}
                  </span>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* 04 — Your Church Is Welcome */}
          <ScrollReveal>
            <section className="relative pt-4">
              <SectionNumber number="04" />
              <SectionDivider variant="thorns" className="mb-12" />
              <HeadingCross />
              <SectionHeading className="mb-6">Your Church Is Welcome</SectionHeading>
              <StandardText className="mb-8">
                We welcome churches of all sizes and expressions who share one conviction: that Jesus should be publicly honoured in Cochrane. If your congregation would like to stand at the altar alongside these brothers and sisters, reach out or visit the{" "}
                <Link
                  to="/support/church-partner"
                  className="text-foreground underline decoration-1 underline-offset-4"
                >
                  Church Partner
                </Link>{" "}
                page.
              </StandardText>
              <button
                onClick={() => openPanel("church-partner")}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-wider font-sans hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                <Mail size={14} />
                Get In Touch
              </button>
            </section>
          </ScrollReveal>

          {/* Closing scripture */}
          <ScriptureWhisper
            verse="For where two or three gather in my name, there am I with them."
            reference="Matthew 18:20"
            variant="interstitial"
          />

          {/* Benediction border before nav */}
          <div className="border-t border-border/30 pt-12">
            <VisionNav />
          </div>
        </div>
      </div>

      {/* Pastor Contact Dialog */}
      <Dialog
        open={!!selectedChurch}
        onOpenChange={(open) => !open && setSelectedChurch(null)}
      >
        <DialogContent className="sm:max-w-md border-border bg-cream p-8 sm:p-12 shadow-2xl overflow-hidden">
          {selectedChurch && (
            <>
              {/* Header glow */}
              <div
                className="absolute top-0 inset-x-0 h-28 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center top, hsl(var(--blood) / 0.04), transparent 80%)",
                }}
              />

              {/* Decorative cross */}
              <div className="flex items-center justify-center mb-6 relative z-10">
                <div className="relative w-12 h-12">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-blood/20" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-blood/20" />
                </div>
              </div>

              {/* Church contact photo */}
              <div className="relative w-20 h-20 mx-auto z-10">
                <div className="w-20 h-20 rounded-full bg-muted overflow-hidden ring-2 ring-border ring-offset-4 ring-offset-blood/[0.06] relative z-10">
                  <img
                    src={selectedChurch.churchContactImage}
                    alt={`${selectedChurch.name} contact`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <DialogHeader className="text-center space-y-1 mt-4">
                <DialogTitle className="font-serif text-2xl md:text-3xl font-light tracking-tight">
                  {selectedChurch.name}
                </DialogTitle>
                <DialogDescription className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                  {selectedChurch.denomination}
                </DialogDescription>
              </DialogHeader>

              <p className="text-center font-serif italic text-sm text-muted-foreground mt-2 line-clamp-2">
                "{selectedChurch.churchQuote}"
              </p>

              <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedChurch(null);
                    openPanel("pastor");
                  }}
                  className="inline-flex items-center justify-between gap-3 text-foreground hover:text-foreground/70 transition-colors group text-left"
                >
                  <span className="inline-flex items-center gap-3">
                    <Mail size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm underline decoration-1 underline-offset-4">Message {selectedChurch.name}</span>
                  </span>
                  <ArrowUpRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {selectedChurch.address && (
                  <div className="inline-flex items-center gap-3 text-muted-foreground">
                    <MapPin size={16} />
                    <span className="text-sm">{selectedChurch.address}</span>
                  </div>
                )}

                {selectedChurch.website && (
                  <a
                    href={selectedChurch.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Globe size={16} />
                      <span className="text-sm underline decoration-1 underline-offset-4">
                        {selectedChurch.website.replace(/^https?:\/\//, "")}
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                <p className="text-sm text-muted-foreground italic mt-2 pt-4 border-t border-border text-center">
                  We would love to hear from you.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageShell>
  );
};

export default Partners;
