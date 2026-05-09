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
import { Armchair, Droplets, Sun, CloudRain, Baby } from "lucide-react";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import ctaBackground from "@/assets/cta-background.jpg";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassSacredPreparation from "@/assets/stained-glass-sacred-preparation.png";

const essentials = [
  { icon: Armchair, item: "Lawn chairs or blankets" },
  { icon: Droplets, item: "Water bottles (refillable)" },
  { icon: Sun, item: "Sunscreen & hat" },
  { icon: CloudRain, item: "Layers for changing weather" },
  { icon: CloudRain, item: "Rain jacket or umbrella" },
];

const optional = [
  "Snacks & packed lunch",
  "Bug spray",
  "Bible or journal",
  "Cash for food trucks",
  "Towel (if considering baptism)",
  "Stroller & kid supplies",
];

const tipCards = [
  {
    icon: Sun,
    title: "Outdoor Comfort",
    body: "Rain jackets, umbrellas, bug spray, and warm layers are worth having on hand. August weather in Cochrane can shift rapidly from extreme heat to cool rain.",
    ghost: "01",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Baby,
    title: "Family Preparation",
    body: "If you're bringing children, consider packing snacks, a stroller, and items to keep them comfortable. The park has massive open spaces for kids to move and play between sets.",
    ghost: "02",
    scripture: "Let the little children come to me — Mark 10:14",
    stainedGlassImage: glassSacredPreparation,
  },
];

const WhatToBring = () => (
  <PageShell>
    <SubPageHeader 
      title="What to Bring" 
      subtitle="Practical suggestions for a full day outdoors."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />
    
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Pack for a Full Day</SectionHeading>
            <StandardText className="text-lg">
              Worship in the Park runs from 11 AM to 7 PM at Mitford Park. August weather in Cochrane can shift from warm sun to cool rain quickly — come prepared and you'll be comfortable all day.
            </StandardText>
          </section>
        </ScrollReveal>
      </div>
    </EditorialContainer>

    {/* Essentials — muted section with icon items */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">Essentials</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {essentials.map((item, i) => (
            <ScrollReveal key={item.item} delay={i * 0.05}>
              <div
                className="relative flex items-center gap-3 border border-border/40 bg-card px-4 py-3.5 group overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
                  style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
                />
                <div className="pl-2 rounded-sm border border-border/30 bg-background p-1.5 flex-shrink-0 group-hover:border-primary/20 transition-colors duration-500">
                  <item.icon size={14} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                </div>
                <span className="text-sm text-foreground">{item.item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={ctaBackground} alt="Cochrane valley — come prepared for a full day" verse="Therefore, prepare your minds for action; be sober-minded." reference="1 Peter 1:13" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <PullQuote>
          Come as you are — but come prepared to stay. The best moments often happen in the final hour.
        </PullQuote>

        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <Eyebrow className="mb-6 text-foreground">Optional but Recommended</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {optional.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-border/20 bg-muted/10 px-4 py-3 group hover:bg-muted/20 transition-colors duration-300 animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
                  style={{ animationDelay: `${80 + i * 50}ms` }}
                >
                  <div className="w-4 h-4 border border-border/30 rounded-sm flex-shrink-0 flex items-center justify-center group-hover:border-primary/20 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/25 group-hover:bg-primary/40 transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="cross" />

        {/* Tip cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tipCards.map((card) => (
              <EditorialCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                body={card.body}
                ghost={card.ghost}
                scripture={card.scripture}
                stainedGlassImage={card.stainedGlassImage}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScriptureWhisper
          verse="The Lord is my shepherd, I lack nothing."
          reference="Psalm 23:1"
          variant="interstitial"
        />

        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

export default WhatToBring;
