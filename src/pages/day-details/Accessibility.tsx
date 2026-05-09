import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import DayDetailsNav from "@/components/DayDetailsNav";
import BackLink from "@/components/BackLink";
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { ArrowRight, Mail, Footprints, Armchair, Car, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import glassGentleRefugeInterstitial from "@/assets/stained-glass-gentle-refuge.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassEternalHope from "@/assets/stained-glass-eternal-hope.png";
import glassHeavenlyWisdom from "@/assets/stained-glass-heavenly-wisdom.png";

const accessFeatures = [
  {
    icon: Footprints,
    title: "Paths & Terrain",
    body: "Mitford Park includes paved and gravel paths. We're evaluating every route to identify and address barriers before the event.",
    scripture: "Make level paths for your feet — Hebrews 12:13",
    stainedGlassImage: glassFaithfulGuidance,
  },
  {
    icon: Armchair,
    title: "Seating & Rest Areas",
    body: "Accessible seating zones near the stage and tent areas are being planned so everyone has a comfortable spot.",
    scripture: "Come to me, all who are weary — Matthew 11:28",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Car,
    title: "Drop-Off & Parking",
    body: "Designated accessible parking and drop-off zones will be clearly marked with volunteer guides on site.",
    stainedGlassImage: glassEternalHope,
  },
  {
    icon: Eye,
    title: "Signage & Wayfinding",
    body: "Clear, high-contrast signage will guide attendees across the site. Volunteers will be stationed to assist.",
    stainedGlassImage: glassHeavenlyWisdom,
  },
];

const AccessibilityPage = () => {
  const { openPanel } = useContactPanel();
  return (
  <PageShell>
    <SubPageHeader 
      title="Accessibility Information" 
      subtitle="We are committed to making Worship in the Park accessible for everyone."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />
    
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Overview</SectionHeading>
            <StandardText className="text-lg">
              We are committed to making Worship in the Park as accessible as possible. Accessibility details are currently being finalized as part of our site planning process, but ensuring everyone can participate is a primary goal.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote attribution="Our Planning Team">
          Every person who comes to Worship in the Park should feel welcomed, comfortable, and able to participate fully — regardless of ability or need.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Accessibility feature cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">What We're Planning</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accessFeatures.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <EditorialCard
                icon={item.icon}
                title={item.title}
                body={item.body}
                ghost={String(i + 1).padStart(2, "0")}
                scripture={item.scripture}
                stainedGlassImage={item.stainedGlassImage}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={glassGentleRefugeInterstitial} alt="Stained glass gentle refuge — every person welcomed" verse="The King will reply, 'Whatever you did for one of the least of these brothers and sisters of mine, you did for me.'" reference="Matthew 25:40" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="cross" />

        {/* Prominent contact card */}
        <ScrollReveal>
          <div className="relative border border-border/40 bg-muted/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden group pl-3">
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
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Have specific accessibility needs?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                We'd love to hear from you so we can plan ahead and serve you well.
              </p>
            </div>
            <Button
              variant="editorial"
              size="sm"
              className="group flex-shrink-0"
              onClick={() => openPanel("general")}
            >
              Get in Touch
              <ArrowRight size={12} strokeWidth={1.5} className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </div>
        </ScrollReveal>

        <ScriptureWhisper
          verse="Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."
          reference="Matthew 25:40"
          variant="interstitial"
        />

        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

};

export default AccessibilityPage;
