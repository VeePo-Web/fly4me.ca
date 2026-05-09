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
import { Sun, CloudRain, Wind, Thermometer, Tent, AlertTriangle } from "lucide-react";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import thornsWood from "@/assets/thorns-wood.jpg";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassLivingWater from "@/assets/stained-glass-living-water.png";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassSacredPreparation from "@/assets/stained-glass-sacred-preparation.png";
import glassDivineProtection from "@/assets/stained-glass-divine-protection.png";

const weatherCards = [
  {
    icon: Sun,
    title: "Sun & Heat",
    body: "Bring sunscreen, a hat, and plenty of water. Shaded tent areas will be available across the site.",
    ghost: "01",
    stainedGlassImage: glassJoyfulCelebration,
  },
  {
    icon: CloudRain,
    title: "Rain",
    body: "Pack a rain jacket or umbrella. Covered areas are being planned to provide shelter if weather shifts.",
    ghost: "02",
    stainedGlassImage: glassLivingWater,
  },
  {
    icon: Wind,
    title: "Wind & Cool Evenings",
    body: "August evenings in Cochrane can be cool. Bring layers so you can stay comfortably through the final set.",
    ghost: "03",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Thermometer,
    title: "Temperature Swings",
    body: "Cochrane weather can shift 15°C in a single afternoon. Dress in layers and you'll be prepared for anything.",
    ghost: "04",
    scripture: "He sends his word and melts them — Psalm 147:18",
    stainedGlassImage: glassSacredPreparation,
  },
];

const Weather = () => (
  <PageShell>
    <SubPageHeader
      title="Weather Plan"
      subtitle="This is a fully outdoor event. Here's what we're planning for sun, wind, and rain."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Outdoor Event Guidance</SectionHeading>
            <StandardText className="text-lg">
              August weather in Cochrane can range from warm sun to cool winds and occasional rain. We encourage you to dress in layers and come prepared for changing conditions to easily stay through the afternoon and evening.
            </StandardText>
          </section>
        </ScrollReveal>
      </div>
    </EditorialContainer>

    {/* Weather condition cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">Prepare For</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weatherCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.06}>
              <EditorialCard
                icon={card.icon}
                title={card.title}
                body={card.body}
                ghost={card.ghost}
                scripture={card.scripture}
                stainedGlassImage={card.stainedGlassImage}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={thornsWood} alt="Weathered wood and thorns — trusting God in every condition" verse="He calms the storm to a whisper; the waves of the sea are hushed." reference="Psalm 107:29" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <PullQuote>
          Whether the sun blazes or the rain falls, we gather. The weather is in God's hands — and so are we.
        </PullQuote>

        <SectionDivider variant="line" />

        <ScrollReveal>
          <div className="border-t border-border/40 pt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditorialCard
              icon={Tent}
              title="Tent Coverage"
              body="Tents and covered areas are being planned to provide shade and shelter across the event site. Details on tent placement will be included in the site map once finalized."
              ghost="01"
              stainedGlassImage={glassGentleRefuge}
            />
            <EditorialCard
              icon={AlertTriangle}
              title="Weather Contingency"
              body="In the case of severe weather, a contingency plan will be communicated through the website and social channels in advance. The safety of attendees is a priority."
              ghost="02"
              stainedGlassImage={glassDivineProtection}
            />
          </div>
        </ScrollReveal>


        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

export default Weather;
