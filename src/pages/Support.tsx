import { HandHeart, Church, DollarSign, Heart } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import BentoCard from "@/components/BentoCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import bentoSupport from "@/assets/bento-support.jpg";
import glassVolunteer from "@/assets/stained-glass-hub-support-volunteer.png";
import glassChurch from "@/assets/stained-glass-hub-support-church.png";
import glassDonate from "@/assets/stained-glass-hub-support-donate.png";
import glassPrayer from "@/assets/stained-glass-hub-support-prayer.png";

const links = [
  { to: "/support/volunteer", title: "Volunteer", description: "Setup, welcome, prayer support, parking, and more. Volunteers must be 18+ and connected to a church.", icon: HandHeart, image: glassVolunteer },
  { to: "/support/church-partner", title: "Church Partner", description: "Bring your church alongside. This event is stronger when more of the body participates.", icon: Church, image: glassChurch },
  { to: "/support/donate", title: "Donate", description: "The event is free to attend. Reach out to discuss giving — donations are handled personally by the team.", icon: DollarSign, image: glassDonate },
  { to: "/support/prayer", title: "Prayer", description: "This event was sparked by prayer and sustained in it. Pray with us for Cochrane and for the day.", icon: Heart, image: glassPrayer },
];

const quickActions = [
  { icon: HandHeart, label: "Serve" },
  { icon: Church, label: "Partner" },
  { icon: DollarSign, label: "Give" },
  { icon: Heart, label: "Pray" },
];

const Support = () => (
  <PageShell>
    <SubPageHeader
      title="Support"
      subtitle="Every role is voluntary and every contribution matters. Worship in the Park is carried by volunteers, churches, prayer, and generosity — and every form of support is ministry."
      eyebrow="Give · Serve · Pray"
      image={bentoSupport}
    />
    <ScriptureWhisper
      verse="Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
      reference="2 Corinthians 9:7"
      variant="interstitial"
    />
    {/* Quick-scan icon row — unique to Support */}
    <EditorialContainer layout="center">
      <ScrollReveal weight="light" delay={0.05}>
        <div className="flex justify-center gap-8 md:gap-12 mb-10">
          {quickActions.map((action, i) => (
            <div key={action.label} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-full border border-border/30 bg-card/60">
                <action.icon size={18} className="text-primary/50" />
              </div>
              <span
                className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFeatureSettings: '"cv02"' }}
              >
                {action.label}
              </span>
            </div>
          ))}
        </div>
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

export default Support;
