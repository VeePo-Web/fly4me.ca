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
import { Heart, Dog, ShieldCheck, Users, Volume2, Trash2 } from "lucide-react";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import thornsWood from "@/assets/thorns-wood.jpg";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";
import glassDivineProtection from "@/assets/stained-glass-divine-protection.png";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassSacredHarvest from "@/assets/stained-glass-sacred-harvest.png";

const guidelines = [
  {
    icon: Users,
    title: "Family-Friendly",
    body: "Children are welcome and encouraged. The outdoor setting gives families room to move freely in a safe, Christ-honoring atmosphere.",
    ghost: "01",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Dog,
    title: "Leashed Pets Only",
    body: "Dogs must be under control and on a leash at all times, in keeping with Cochrane's park rules.",
    ghost: "02",
    stainedGlassImage: glassFaithfulGuidance,
  },
  {
    icon: ShieldCheck,
    title: "Safety Planning",
    body: "First aid access and emergency procedures will be in place. Volunteers and signage will help you navigate the site confidently.",
    ghost: "03",
    stainedGlassImage: glassDivineProtection,
  },
  {
    icon: Volume2,
    title: "Respect the Worship",
    body: "This is a Christ-centered gathering. We ask attendees to honour the purpose of the day and the people around them with kindness and care.",
    ghost: "04",
    scripture: "Worship the Lord in the splendor of holiness — Psalm 96:9",
    stainedGlassImage: glassJoyfulCelebration,
  },
  {
    icon: Heart,
    title: "Hospitality Over Rules",
    body: "Guidelines exist to protect the experience for everyone. If you have a question, any volunteer or team member will be glad to help.",
    ghost: "05",
    stainedGlassImage: glassCommunityTable,
  },
  {
    icon: Trash2,
    title: "Leave No Trace",
    body: "Help us honour the space. Bins will be provided — please pack out what you bring in and leave Mitford Park better than you found it.",
    ghost: "06",
    scripture: "The earth is the Lord's, and everything in it — Psalm 24:1",
    stainedGlassImage: glassSacredHarvest,
  },
];

const Guidelines = () => (
  <PageShell>
    <SubPageHeader
      title="Event Guidelines"
      subtitle="How we're caring for the space and each other."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Event Conduct</SectionHeading>
            <StandardText className="text-lg">
              Worship in the Park is a family-friendly, Christ-centered public gathering. We ask all attendees to treat the space, the people, and the purpose of the day with respect, hospitality, and care.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          These aren't rules for the sake of rules — they're how we love our neighbours well in a shared space.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Guideline cards — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">What We Ask</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guidelines.map((item, i) => (
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

    <ImageInterstitial src={thornsWood} alt="Thorns and wood — honouring the space with care" verse="Whatever you do, work at it with all your heart, as working for the Lord." reference="Colossians 3:23" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="cross" className="py-10" />

        <ScriptureWhisper
          verse="But everything should be done in a fitting and orderly way."
          reference="1 Corinthians 14:40"
          variant="interstitial"
        />

        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

export default Guidelines;
