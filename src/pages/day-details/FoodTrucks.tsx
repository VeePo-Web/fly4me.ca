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
import { UtensilsCrossed, CreditCard, Droplets, Sandwich } from "lucide-react";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import glassCommunityTableInterstitial from "@/assets/stained-glass-community-table.png";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassSacredHarvest from "@/assets/stained-glass-sacred-harvest.png";
import glassLivingWater from "@/assets/stained-glass-living-water.png";

const infoCards = [
  {
    icon: UtensilsCrossed,
    title: "Food Availability",
    body: "Specific food truck vendors and menus will be announced closer to the event. Expect a variety of options to suit different tastes and dietary needs.",
    ghost: "01",
    stainedGlassImage: glassCommunityTable,
  },
  {
    icon: CreditCard,
    title: "Payment",
    body: "Food trucks typically accept cash and card/tap. We recommend bringing both just in case. The worship event itself is completely free.",
    ghost: "02",
    stainedGlassImage: glassSacredHarvest,
  },
  {
    icon: Droplets,
    title: "Hydration",
    body: "Bring refillable water bottles. August in Cochrane can be warm, and staying hydrated across a full day outdoors is essential.",
    ghost: "03",
    scripture: "Whoever drinks the water I give will never thirst — John 4:14",
    stainedGlassImage: glassLivingWater,
  },
  {
    icon: Sandwich,
    title: "Eating Areas",
    body: "Open grassy areas and covered tent zones will be available for sitting and eating. Bring a blanket or lawn chairs and find a comfortable spot.",
    ghost: "04",
    stainedGlassImage: glassCommunityTable,
  },
];

const bringYourOwn = [
  "Water bottles (refillable — stay hydrated)",
  "Packed lunch or family snacks",
  "Coffee in a thermos for the morning",
  "Treats for kids between sets",
];

const FoodTrucks = () => (
  <PageShell>
    <SubPageHeader 
      title="Food Trucks" 
      subtitle="Food trucks will be on site for purchase throughout the day."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />
    
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Food Truck Overview</SectionHeading>
            <StandardText className="text-lg">
              Food trucks will be on site at Mitford Park throughout the day with meals and snacks available for purchase. This helps families and attendees stay longer without needing to leave the park.
            </StandardText>
          </section>
        </ScrollReveal>
      </div>
    </EditorialContainer>

    {/* Info cards — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">What to Know</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((item, i) => (
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

    <ImageInterstitial src={glassCommunityTableInterstitial} alt="Stained glass community table — fellowship and food" verse="So whether you eat or drink or whatever you do, do it all for the glory of God." reference="1 Corinthians 10:31" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <PullQuote>
          Food is fellowship. Whether you buy from a truck or bring a picnic, the table is set for community.
        </PullQuote>

        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <Eyebrow className="mb-6 text-foreground">Bring Your Own</Eyebrow>
            <StandardText className="mb-6">
              You're welcome to bring your own food, snacks, and drinks. Here are a few suggestions for a full day outdoors:
            </StandardText>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bringYourOwn.map((item, i) => (
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

        <ScriptureWhisper
          verse="He provides food for those who fear him; he remembers his covenant forever."
          reference="Psalm 111:5"
          variant="interstitial"
        />

        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

export default FoodTrucks;
