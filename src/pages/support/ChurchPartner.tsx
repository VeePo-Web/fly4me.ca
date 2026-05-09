import { useState, useEffect, useCallback, FormEvent } from "react";
import { sendEmail } from "@/lib/send-email";
import { toast } from "@/hooks/use-toast";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import SupportNav from "@/components/SupportNav";
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { Mail, ArrowRight, Music, Users, Heart, HandHeart, ArrowUpRight, MapPin, Globe, Cross } from "lucide-react";
import { Link } from "react-router-dom";
import bentoSupport from "@/assets/bento-support.jpg";
import BackLink from "@/components/BackLink";
import churchesCandles from "@/assets/churches-candles.jpg";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";
import glassDivineIntercession from "@/assets/stained-glass-divine-intercession.png";
import glassSacredHarvest from "@/assets/stained-glass-sacred-harvest.png";
import { churchProfiles } from "@/data/church-profiles";
import type { ChurchProfile } from "@/data/church-profiles";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ─── Participation Ways ───────────────────────────────── */

const participationWays = [
  {
    icon: Music,
    title: "Worship Team",
    desc: "Contribute a worship team to lead one of the day's sets — a single set of worship leading.",
    ghost: "01",
    scripture: "Sing to the Lord, all the earth — 1 Chronicles 16:23",
    stainedGlassImage: glassJoyfulCelebration,
  },
  {
    icon: Users,
    title: "Volunteers",
    desc: "Send members to serve in setup, parking, hospitality, the Get Connected Tent, or prayer support.",
    ghost: "02",
    stainedGlassImage: glassFaithfulGuidance,
  },
  {
    icon: Heart,
    title: "Prayer Covering",
    desc: "Commit to praying for the event in advance — individually, in small groups, or as a congregation.",
    ghost: "03",
    stainedGlassImage: glassDivineIntercession,
  },
  {
    icon: HandHeart,
    title: "Financial Support",
    desc: "Contribute toward sound, staging, tents, Bibles, or general event costs as a church body.",
    ghost: "04",
    stainedGlassImage: glassSacredHarvest,
  },
];

/* ─── Cross Bullet ─────────────────────────────────────── */

const CrossBullet = ({ active = false }: { active?: boolean }) => (
  <span className="inline-block relative w-2.5 h-2.5 flex-shrink-0" aria-hidden="true">
    <span className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 transition-colors duration-300 ${active ? "bg-primary/60" : "bg-primary/25"}`} />
    <span className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 transition-colors duration-300 ${active ? "bg-primary/60" : "bg-primary/25"}`} style={{ top: "35%" }} />
  </span>
);

/* ─── Church Card (matches Vision/Partners) ────────────── */

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

/* ─── Partnership Form ──────────────────────────────────── */

const PartnershipForm = () => {
  const [churchName, setChurchName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendEmail({
        type: "church-partner-page",
        churchName,
        contactName,
        name: contactName,
        email,
        message,
      });
      setSent(true);
      toast({
        title: "Inquiry sent",
        description: "We've received your partnership inquiry and will be in touch soon.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border border-border/40 p-8 md:p-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--card) / 0.6), hsl(var(--muted) / 0.3))" }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))" }}
      />

      <div className="flex flex-col gap-5 pl-3">
        <div className="flex items-center gap-3 mb-2">
          <Mail size={18} strokeWidth={1.2} className="text-muted-foreground" />
          <h3 className="font-serif text-lg font-medium text-foreground" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
            Partner with us
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="church-name" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
              Church Name
            </label>
            <input
              id="church-name"
              type="text"
              required
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              className="h-10 px-3 border border-border/50 bg-background/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
              placeholder="Your church"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
              Contact Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="h-10 px-3 border border-border/50 bg-background/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-email" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            id="partner-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 px-3 border border-border/50 bg-background/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
            placeholder="you@church.ca"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-message" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
            Message
          </label>
          <textarea
            id="partner-message"
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-3 py-2.5 border border-border/50 bg-background/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors resize-none leading-relaxed"
            placeholder="Tell us about your church and how you'd like to be involved..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-start inline-flex items-center gap-2 h-10 px-6 font-sans text-xs uppercase tracking-wider border border-border hover:border-primary/40 bg-card hover:bg-primary/5 text-foreground transition-all duration-300 mt-1 disabled:opacity-50"
        >
          <Mail size={14} strokeWidth={1.2} />
          {submitting ? "Sending…" : sent ? "Sent ✓" : "Send Inquiry"}
          {!submitting && !sent && <ArrowRight size={12} strokeWidth={1.5} />}
        </button>
      </div>
    </form>
  );
};

/* ─── Page ─────────────────────────────────────────────── */

const ChurchPartner = () => {
  const { openPanel } = useContactPanel();
  const [activeChurchId, setActiveChurchId] = useState<string | null>(null);
  const [selectedChurch, setSelectedChurch] = useState<ChurchProfile | null>(null);
  const lenis = useSmoothScroll();

  const scrollToAnchor = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -96 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lenis]);

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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
  <PageShell>
    <SubPageHeader
      title="Church Partner"
      subtitle="The event is stronger when more of the body is involved — and it matters that the city sees churches standing together."
      eyebrow="Support"
      image={bentoSupport}
    />

    {/* Two-column layout: sticky sidebar + scrolling content */}
    <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 items-start">

        {/* ── Sticky Sidebar ──────────────────────────── */}
        <aside className="lg:sticky lg:top-32 flex flex-col gap-6">
          <BackLink to="/support" label="Back to Support" />

          {/* Churches list */}
          <div>
            <div className="flex items-center gap-2 mb-4" aria-hidden="true">
              <div className="w-px h-4 bg-primary/20" />
              <div className="w-3 h-px bg-primary/15" style={{ marginTop: "35%" }} />
            </div>
            <Eyebrow className="text-muted-foreground/70 mb-4">Churches Involved</Eyebrow>
            <nav className="flex flex-col gap-2" aria-label="Churches involved">
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

          {/* Link to full profiles */}
          <Link
            to="/vision/partners"
            className="group inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.14em] text-primary/70 hover:text-primary transition-colors duration-300 mt-2"
            style={{ fontFeatureSettings: '"cv02"' }}
          >
            View full profiles
            <ArrowUpRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>

          {/* Decorative cross — visible only on desktop */}
          <div className="hidden lg:block mt-4" aria-hidden="true">
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-primary">
              <line x1="10" y1="0" x2="10" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
              <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
              <circle cx="10" cy="8" r="1" fill="hsl(var(--primary))" fillOpacity="0.06" />
            </svg>
          </div>
        </aside>

        {/* ── Main Content ────────────────────────────── */}
        <div className="flex flex-col gap-16 md:gap-24 text-left">

          {/* Intro */}
          <ScrollReveal>
            <section>
              <SectionHeading className="mb-4">Church Participation</SectionHeading>
              <StandardText className="text-lg">
                Worship in the Park is built on shared church participation. This is not one church's platform. It is a shared altar. Participating churches contribute worship teams, volunteers, prayer support, and relational presence — and the event reflects that shared ownership visibly.
              </StandardText>
            </section>
          </ScrollReveal>

          <PullQuote>
            This is not one church's platform. It is a shared altar.
          </PullQuote>

          <ScriptureWhisper
            verse="From him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work."
            reference="Ephesians 4:16"
            variant="anchor"
          />

          {/* ── Church Profile Cards ───────────────────── */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <Eyebrow className="text-muted-foreground/70">Partner Churches</Eyebrow>
              </div>
            </ScrollReveal>

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
          </div>

          <SectionDivider variant="cross" />

          {/* ── Ways to Participate ─────────────────────── */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                  <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
                </div>
                <Eyebrow className="text-foreground">Ways to Participate</Eyebrow>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {participationWays.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <EditorialCard
                    icon={item.icon}
                    title={item.title}
                    body={item.desc}
                    ghost={item.ghost}
                    scripture={item.scripture}
                    stainedGlassImage={item.stainedGlassImage}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <ImageInterstitial src={churchesCandles} alt="Candles in a church — churches standing together" verse="How good and pleasant it is when God's people live together in unity!" reference="Psalm 133:1" bgFrom="hsl(var(--muted))" />

    {/* Get in Touch + Nav */}
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col gap-16 md:gap-24 text-left">
        <ScrollReveal>
         <section>
             <SectionHeading className="mb-4">Get in Touch</SectionHeading>
             <StandardText className="mb-8">
               We welcome churches of all sizes and expressions who share the vision of public worship, unity, and prayer for Cochrane.
             </StandardText>

             <PartnershipForm />

             <p className="mt-6 text-sm text-muted-foreground text-center">
               Or email us directly at{" "}
               <a
                  href="mailto:mitfordworship@gmail.com"
                  className="underline underline-offset-4 decoration-1 text-primary/70 hover:text-primary transition-colors"
                >
                  mitfordworship@gmail.com
               </a>
             </p>
           </section>
        </ScrollReveal>

        <div className="border-t border-border/30 pt-12">
          <SupportNav />
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

export default ChurchPartner;
