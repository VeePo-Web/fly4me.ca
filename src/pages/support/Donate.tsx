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
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { ArrowRight, DollarSign, Music, Tent, BookOpen, Bath, FileCheck, Users } from "lucide-react";
import bentoSupport from "@/assets/bento-support.jpg";
import BackLink from "@/components/BackLink";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import crossField from "@/assets/cross-field.jpg";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassHeavenlyWisdom from "@/assets/stained-glass-heavenly-wisdom.png";
import glassLivingWater from "@/assets/stained-glass-living-water.png";
import glassDivineProtection from "@/assets/stained-glass-divine-protection.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";

const costItems = [
  {
    icon: Music,
    label: "Sound & staging",
    detail: "PA system, monitors, mics, mixing — professional audio for a full day of continuous worship.",
    scripture: "Sing to the Lord a new song — Psalm 96:1",
    stainedGlassImage: glassJoyfulCelebration,
  },
  {
    icon: Tent,
    label: "Tents & site infrastructure",
    detail: "Prayer Tent, Get Connected Tent, shade structures, signage, and weather protection.",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: BookOpen,
    label: "Bibles & printed materials",
    detail: "Free Bibles for anyone who wants one, plus printed guides and devotional cards.",
    stainedGlassImage: glassHeavenlyWisdom,
  },
  {
    icon: Bath,
    label: "Portable washrooms",
    detail: "Additional sanitation beyond the park's existing facilities for a full-day event.",
    stainedGlassImage: glassLivingWater,
  },
  {
    icon: FileCheck,
    label: "Permits & insurance",
    detail: "Municipal permits, event insurance, and site booking fees for Mitford Park.",
    stainedGlassImage: glassDivineProtection,
  },
  {
    icon: Users,
    label: "Volunteer support",
    detail: "T-shirts, meals, water, and supplies for the people who make the day run.",
    stainedGlassImage: glassFaithfulGuidance,
  },
];

const Donate = () => {
  const { openPanel } = useContactPanel();
  return (
  <PageShell>
    <SubPageHeader
      title="Donate"
      subtitle="Worship in the Park is completely free — which means it depends on the generosity of churches, businesses, and individuals."
      eyebrow="Support"
      image={bentoSupport}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/support" label="Back to Support" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Why Donations Matter</SectionHeading>
            <StandardText className="text-lg">
              Every dollar given supports the event directly — sound, staging, tents, Bibles, washrooms, and site preparation. We are committed to stewarding financial support with integrity and transparency, and we're glad to answer questions about how funds are used.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote attribution="2 Corinthians 9:7">
          Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Cost breakdown — muted section with editorial cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">What Your Gift Covers</Eyebrow>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {costItems.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.06}>
              <EditorialCard
                icon={item.icon}
                title={item.label}
                body={item.detail}
                ghost={String(i + 1).padStart(2, "0")}
                scripture={item.scripture}
                stainedGlassImage={item.stainedGlassImage}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={crossField} alt="Cross in a field — every gift removes a barrier" verse="And my God will meet all your needs according to the riches of his glory in Christ Jesus." reference="Philippians 4:19" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">

        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">How to Give</SectionHeading>
            <StandardText className="mb-8">
              Donations are handled personally by the organizing team — not through the website. If you'd like to give financially or discuss sponsorship, reach out below and a team member will follow up with you directly.
            </StandardText>

            <button
              onClick={() => openPanel("donate")}
              className="group relative block w-full text-left border border-border/40 p-8 md:p-10 transition-all duration-500 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
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
                  <DollarSign size={20} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-medium text-foreground mb-1.5" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                    Connect with the team about giving
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Send us a message and we'll follow up personally to discuss how you'd like to contribute.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 group-hover:text-primary transition-colors duration-300" style={{ fontFeatureSettings: '"cv02"' }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse mr-1.5" />
                    Get in touch
                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </div>
            </button>
          </section>
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

export default Donate;
