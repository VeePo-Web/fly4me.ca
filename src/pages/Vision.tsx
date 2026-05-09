import { Compass, Users, BookOpen, Church } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import BentoCard from "@/components/BentoCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import bentoVision from "@/assets/bento-vision.jpg";
import glassVisionMission from "@/assets/stained-glass-hub-vision-mission.png";
import glassVisionUnity from "@/assets/stained-glass-hub-vision-unity.png";
import glassVisionHistory from "@/assets/stained-glass-hub-vision-history.png";
import glassVisionPartners from "@/assets/stained-glass-hub-vision-partners.png";

const links = [
  { to: "/vision/mission", title: "Vision & Mission", description: "Why this day exists — and the verse from God's Word that set it in motion. The vision, the mission, and the conviction behind it all.", icon: Compass, image: glassVisionMission },
  { to: "/vision/unity", title: "Unity Across Churches", description: "Not uniformity — harmony. Multiple churches standing together under one King, demonstrating what unity looks like before the city sees it.", icon: Users, image: glassVisionUnity },
  { to: "/vision/church-history", title: "Church History in Cochrane", description: "The faith community in Cochrane has deep roots — generations of prayer, service, and devotion. This day builds on that legacy.", icon: BookOpen, image: glassVisionHistory },
  { to: "/vision/partners", title: "Partnered Churches", description: "See which churches are standing together — and how yours can join the shared altar.", icon: Church, image: glassVisionPartners },
];

const Vision = () => (
  <PageShell>
    <SubPageHeader 
      title="Vision" 
      subtitle="This day was sparked in prayer and carried by churches together. It belongs to no single congregation — it belongs to the city, and it belongs to God."
      eyebrow="The Heart Behind It"
      image={bentoVision}
    />
    <ScriptureWhisper
      verse="Where there is no vision, the people perish."
      reference="Proverbs 29:18a"
      translation="KJV"
      variant="interstitial"
    />
    {/* Manifesto statement — unique to Vision */}
    <EditorialContainer layout="center">
      <ScrollReveal weight="light" delay={0.1}>
        <p
          className="font-serif text-lg md:text-xl text-foreground/70 text-center leading-relaxed max-w-2xl mx-auto mb-10 italic"
          style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
        >
          We believe the church is most beautiful when it stands together — not in uniformity, but in harmony. This day is an altar built by many hands, offered to the One who makes us one.
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {links.map((link, index) => (
          <ScrollReveal key={link.to} delay={index * 0.08} weight="light" variant="scale">
            <BentoCard {...link} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </EditorialContainer>
    <SectionDivider variant="cross" className="py-10" />
  </PageShell>
);

export default Vision;
