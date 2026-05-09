import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import SectionDivider from "@/components/SectionDivider";
import DayDetailsNav from "@/components/DayDetailsNav";
import BackLink from "@/components/BackLink";
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { ExternalLink, MapPin, Car, Footprints, Map } from "lucide-react";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import heroAerial from "@/assets/hero-aerial.jpg";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";
import glassEternalHope from "@/assets/stained-glass-eternal-hope.png";
import glassHeavenlyWisdom from "@/assets/stained-glass-heavenly-wisdom.png";

const siteFeatures = [
  {
    icon: Car,
    title: "Parking Areas",
    body: "Free parking is available in the main Mitford Park lot off West Rock Road. Additional overflow parking is available along the access road. Volunteer parking guides will be on site to help direct traffic.",
    stainedGlassImage: glassFaithfulGuidance,
  },
  {
    icon: Footprints,
    title: "Walking Paths",
    body: "The park includes paved and gravel walking paths connecting parking areas to the main event site. We'll provide clear wayfinding so you can find your way easily.",
    stainedGlassImage: glassEternalHope,
  },
  {
    icon: Map,
    title: "Event Site Map",
    body: "A bird's-eye site map showing the stage, Prayer Tent, Get Connected Tent, food trucks, washrooms, and seating areas will be available here once the layout is finalized.",
    stainedGlassImage: glassHeavenlyWisdom,
  },
];

const ParkingMap = () => (
  <PageShell>
    <SubPageHeader 
      title="Parking & Map" 
      subtitle="Free parking at Mitford Park. See where to park, walking paths, and the event site layout."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />
    
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Mitford Park Overview</SectionHeading>
            <StandardText className="text-lg">
              Mitford Park is a 34-hectare regional park in Cochrane with open green space, walking paths, a covered outdoor stage, and seasonal facilities. It is the natural home for a public gathering of this kind.
            </StandardText>
          </section>
        </ScrollReveal>

        {/* Google Maps CTA Card */}
        <ScrollReveal>
          <a
            href="https://maps.google.com/?q=207A+West+Rock+Rd+Cochrane+AB"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 border border-border/40 bg-muted/20 hover:bg-muted/40 p-5 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Gold left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
            />
            {/* Top accent line — reveals on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
              style={{
                background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
              <MapPin size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Mitford Park — 207A West Rock Rd, Cochrane, Alberta</p>
              <p className="text-xs text-muted-foreground mt-0.5">Open in Google Maps for directions</p>
            </div>
            <ExternalLink size={14} strokeWidth={1.5} className="text-muted-foreground/50 group-hover:text-foreground/60 transition-colors duration-300 flex-shrink-0" />
          </a>
        </ScrollReveal>
      </div>
    </EditorialContainer>

    {/* Site features — muted section with icon cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-8">Site Information</Eyebrow>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {siteFeatures.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <EditorialCard
                icon={item.icon}
                title={item.title}
                body={item.body}
                stainedGlassImage={item.stainedGlassImage}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={heroAerial} alt="Aerial view of Mitford Park — the gathering place" verse="The earth is the Lord's, and everything in it." reference="Psalm 24:1" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <PullQuote>
          The journey begins before you arrive. We want the drive in, the walk up, and the first moment to feel welcoming.
        </PullQuote>

        <SectionDivider variant="line" />

        <ScriptureWhisper
          verse="He makes me lie down in green pastures, he leads me beside quiet waters."
          reference="Psalm 23:2"
          variant="interstitial"
        />

        <DayDetailsNav />
      </div>
    </EditorialContainer>
  </PageShell>
);

export default ParkingMap;
