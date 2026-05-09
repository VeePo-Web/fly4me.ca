import { Clock, MapPin, CloudSun, Accessibility, UtensilsCrossed, ShieldCheck, Backpack } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import BentoCard from "@/components/BentoCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import glassSchedule from "@/assets/stained-glass-hub-day-schedule.png";
import glassParking from "@/assets/stained-glass-hub-day-parking.png";
import glassWeather from "@/assets/stained-glass-hub-day-weather.png";
import glassAccess from "@/assets/stained-glass-hub-day-access.png";
import glassFood from "@/assets/stained-glass-hub-day-food.png";
import glassGuidelines from "@/assets/stained-glass-hub-day-guidelines.png";
import glassBring from "@/assets/stained-glass-hub-day-bring.png";

const links = [
  { to: "/day-details/schedule", title: "Day Schedule", description: "A full day. Worship teams from churches across Cochrane. One altar. See the full lineup, exact set times, and find your window.", icon: Clock, image: glassSchedule },
  { to: "/day-details/parking-map", title: "Parking & Map", description: "Free parking at Mitford Park. See where to park, walking paths, and the event site layout.", icon: MapPin, image: glassParking },
  { to: "/day-details/weather", title: "Weather Plan", description: "This is a fully outdoor event. Here's what we're planning for sun, wind, and rain.", icon: CloudSun, image: glassWeather },
  { to: "/day-details/accessibility", title: "Accessibility", description: "We're working to make the day accessible to everyone. Current status and how to reach us with questions.", icon: Accessibility, image: glassAccess },
  { to: "/day-details/food-trucks", title: "Food Trucks", description: "Food trucks will be on site for purchase throughout the day. Bring your own snacks too.", icon: UtensilsCrossed, image: glassFood },
  { to: "/day-details/guidelines", title: "Event Guidelines", description: "Leashed pets, family conduct, safety expectations, and how we're caring for the space.", icon: ShieldCheck, image: glassGuidelines },
  { to: "/day-details/what-to-bring", title: "What to Bring", description: "Chairs, sunscreen, water, layers — practical suggestions for a full day outdoors.", icon: Backpack, image: glassBring },
];

const DayDetails = () => (
  <PageShell>
    <SubPageHeader 
      title="Day Details" 
      subtitle="Everything you need to plan your visit — schedule, parking, food, weather, and site information."
      eyebrow="Plan Your Visit"
      image={bentoDayDetails}
    />
    <ScriptureWhisper
      verse="This is the day the Lord has made; let us rejoice and be glad in it."
      reference="Psalm 118:24"
      variant="interstitial"
    />
    <EditorialContainer layout="center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {links.map((link, index) => (
          <ScrollReveal key={link.to} delay={index * 0.05} weight="light" variant="scale">
            <BentoCard {...link} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </EditorialContainer>
    <SectionDivider variant="cross" className="py-10" />
  </PageShell>
);

export default DayDetails;
