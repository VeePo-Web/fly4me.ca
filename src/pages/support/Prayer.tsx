import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import SupportNav from "@/components/SupportNav";
import BackLink from "@/components/BackLink";
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Church, Music, Users, Shield, Flame } from "lucide-react";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import bentoSupport from "@/assets/bento-support.jpg";
import stainedGlassPrayer from "@/assets/stained-glass-prayer.jpg";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassDivineIntercession from "@/assets/stained-glass-divine-intercession.png";
import glassEternalHope from "@/assets/stained-glass-eternal-hope.png";

const prayerFocuses = [
  {
    icon: Church,
    title: "Unity among the churches",
    body: "That secondary differences fall away as we gather around Christ.",
    ghost: "01",
    stainedGlassImage: glassCommunityTable,
  },
  {
    icon: Music,
    title: "The worship teams",
    body: "For anointing, preparation, and hearts surrendered to the Spirit.",
    ghost: "02",
    stainedGlassImage: glassJoyfulCelebration,
  },
  {
    icon: Users,
    title: "Volunteers and organizers",
    body: "For energy, wisdom, and servant hearts.",
    ghost: "03",
    stainedGlassImage: glassFaithfulGuidance,
  },
  {
    icon: Shield,
    title: "Safety and weather",
    body: "For protection over every person and favourable skies.",
    ghost: "04",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Flame,
    title: "Every person who attends",
    body: "That they would encounter the living God.",
    ghost: "05",
    scripture: "The Spirit of the Lord is upon me — Luke 4:18",
    stainedGlassImage: glassDivineIntercession,
  },
  {
    icon: Heart,
    title: "The city of Cochrane",
    body: "For spiritual hunger, healing, and the church to be bold and humble.",
    ghost: "06",
    stainedGlassImage: glassEternalHope,
  },
];

const Prayer = () => {
  const { openPanel } = useContactPanel();
  return (
  <PageShell>
    <SubPageHeader
      title="Prayer"
      subtitle="This event was sparked by prayer and is sustained in it. Before anything is built, booked, or announced — prayer comes first."
      eyebrow="Support"
      image={bentoSupport}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/support" label="Back to Support" />

        <ScriptureWhisper
          verse="The prayer of a righteous person is powerful and effective."
          reference="James 5:16b"
          variant="anchor"
        />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Invitation to Pray</SectionHeading>
            <StandardText className="text-lg">
              We invite you to join us in praying for the day and for Cochrane. Prayer is the foundation of everything — before the stage is set, before the sound is tested, before anyone arrives.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          Before anything is built, booked, or announced — prayer comes first.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Prayer focuses — muted section with editorial cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">Prayer Focuses</Eyebrow>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prayerFocuses.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <EditorialCard
                icon={item.icon}
                title={item.title}
                body={item.body}
                ghost={item.ghost}
                scripture={item.scripture}
                stainedGlassImage={item.stainedGlassImage}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={stainedGlassPrayer} alt="Stained glass prayer — the foundation of everything" verse="Devote yourselves to prayer, being watchful and thankful." reference="Colossians 4:2" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Prayer for Cochrane</SectionHeading>
            <StandardText>
              Pray for the city — for families, for spiritual hunger, for the church to be bold and humble, and for God to move in ways that only He can. This day belongs to Him.
            </StandardText>
          </section>
        </ScrollReveal>

        <SectionDivider variant="line" />

        {/* Share a prayer request */}
        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Share a Prayer Request</SectionHeading>
            <StandardText className="mb-6">
              If you have something on your heart — a need, a burden, a hope — we would be honoured to pray for you. Your request is held with care and confidentiality.
            </StandardText>
            <button
              type="button"
              onClick={() => openPanel("prayer")}
              className="group relative block w-full text-left border border-border/40 p-8 md:p-10 transition-all duration-500 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold-warm) / 0.02), hsl(var(--muted) / 0.3))" }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px] group-focus-visible:w-[3px]"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-700 origin-left"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4 pl-3">
                <div className="rounded-sm border border-border/30 bg-card p-2.5 group-hover:border-primary/15 transition-colors duration-500">
                  <Heart size={20} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-medium text-foreground mb-1.5" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                    Send a prayer request
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Share your prayer request through our private form and our team will lift it up. You don't need to share details — even "please pray for me" is enough.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 group-hover:text-primary transition-colors duration-300" style={{ fontFeatureSettings: '"cv02"' }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse mr-1.5" />
                    Open prayer request form
                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                  <p className="mt-3 text-[11px] text-muted-foreground/70">
                    Or email us directly at <span className="text-foreground/80">mitfordworship@gmail.com</span>
                  </p>
                </div>
              </div>
            </button>
          </section>
        </ScrollReveal>

        {/* Cross-link to volunteer prayer team */}
        <ScrollReveal>
          <div
            className="relative border border-border/40 bg-muted/30 p-5 overflow-hidden group transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.1))" }}
            />
            <div className="flex items-start gap-3 pl-3">
              <Heart size={18} strokeWidth={1.2} className="text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-colors duration-500" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">Serve on the Prayer Team</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  If you have prayer ministry experience and would like to serve in the Prayer Tent on the day, apply as a volunteer.
                </p>
                <Link
                  to="/support/volunteer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  Apply to volunteer
                  <ArrowRight size={12} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>


        {/* Benediction border before nav */}
        <div className="border-t border-border/30 pt-12">
          <SupportNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
  );
};

export default Prayer;
