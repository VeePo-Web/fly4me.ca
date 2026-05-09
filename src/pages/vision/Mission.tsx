import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import VisionNav from "@/components/VisionNav";
import EditorialImage from "@/components/EditorialImage";
import ImageInterstitial from "@/components/ImageInterstitial";
import EditorialCard from "@/components/EditorialCard";
import SectionNumber from "@/components/SectionNumber";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, Users, Heart, Clock, Layers, DoorOpen } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import BackLink from "@/components/BackLink";
import bentoVision from "@/assets/bento-vision.jpg";
import crossField from "@/assets/cross-field.jpg";
import glassHolyFire from "@/assets/stained-glass-holy-fire.png";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassEternalHope from "@/assets/stained-glass-eternal-hope.png";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassLivingWater from "@/assets/stained-glass-living-water.png";
import glassHeavenlyWisdom from "@/assets/stained-glass-heavenly-wisdom.png";

const distinctives = [
  { title: "Category Ownership", desc: "Cochrane's public day of worship and prayer — not a concert, not a festival, not a church program moved outdoors. A day wholly set apart.", icon: Crown, image: glassHolyFire },
  { title: "Visible Unity Across Church Lines", desc: "Churches across Cochrane and many worship teams create a shared platform where unity is demonstrated, not merely talked about. Not uniformity — harmony.", icon: Users, image: glassCommunityTable },
  { title: "Spiritually Serious, Broadly Welcoming", desc: "Jesus, prayer, repentance, and shared devotion remain central — while the event stays free, open, all-ages, and easy to step into.", icon: Heart, image: glassEternalHope },
  { title: "Sustained Atmosphere", desc: "A full uninterrupted day with many worship teams creates depth, continuity, and flexibility that shorter events cannot offer.", icon: Clock, image: glassJoyfulCelebration },
  { title: "More Than a Stage Program", desc: "Prayer Tent, Get Connected Tent, free Bibles, baptism in the Bow River, and volunteer pathways make this a full ministry ecosystem.", icon: Layers, image: glassLivingWater },
  { title: "Low-Friction Access", desc: "Free entry, no ticket, no registration, and come-for-part-or-all flexibility lower resistance without softening the mission.", icon: DoorOpen, image: glassHeavenlyWisdom },
];

const Mission = () => {
  const lenis = useSmoothScroll();
  const scrollToAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) { lenis.scrollTo(`#${id}`, { offset: -96 }); }
    else { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  return (
  <PageShell>
    <SubPageHeader 
      title="Vision & Mission" 
      subtitle="The conviction that sparked this day — and the promise from God's Word that sustains it."
      eyebrow="Vision"
      image={bentoVision}
    />
    
    <EditorialContainer layout="sidebar">
      {/* Sidebar Navigation / Context */}
      <aside className="sticky top-32 hidden lg:flex flex-col gap-6">
        <Link 
          to="/vision" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Vision
        </Link>
        <div className="pt-6 border-t border-border/40">
          <Eyebrow className="mb-3 text-muted-foreground">In This Section</Eyebrow>
          <nav className="flex flex-col gap-3">
            <a href="#vision" onClick={(e) => scrollToAnchor(e, "vision")} className="text-sm font-medium link-reveal pb-0.5 self-start">The Vision</a>
            <a href="#mission" onClick={(e) => scrollToAnchor(e, "mission")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">The Mission</a>
            <a href="#distinctives" onClick={(e) => scrollToAnchor(e, "distinctives")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">What Makes It Different</a>
          </nav>
        </div>
      </aside>

      {/* Main Editorial Content */}
      <div className="flex flex-col gap-16 md:gap-24">
        
        {/* Mobile Back Link */}
        <div className="lg:hidden mb-8">
          <BackLink to="/vision" label="Back to Vision" />
        </div>

        <ScrollReveal>
          <section id="vision" className="scroll-mt-32 relative">
            <SectionNumber number="01" />
            <SectionHeading className="mb-6">The Vision</SectionHeading>
            <StandardText className="text-lg md:text-xl">
              To see Cochrane gathered in visible unity before God — through public worship, prayer, and repentance — with churches standing together, Jesus openly honored in the city, and families and individuals encountering the reality of His presence in a way that restores devotion, confronts false loyalties, and turns hearts back toward Him with sincerity.
            </StandardText>
            <div className="mt-8">
              <ScriptureWhisper
                verse="If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land."
                reference="2 Chronicles 7:14"
                variant="anchor"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Inline editorial image between Vision and Mission */}
        <EditorialImage
          src={crossField}
          alt="Cross standing in an open field"
          caption="Set apart for His glory"
          variant="inset"
        />

        <ScrollReveal>
          <section id="mission" className="scroll-mt-32 relative">
            <SectionNumber number="02" />
            <SectionHeading className="mb-6">The Mission</SectionHeading>
            <StandardText>
              This event has been prayed for for years. Worship in the Park exists to gather the people of Cochrane and the surrounding region for a free, ecumenical, Christ-centered day of worship and prayer — sparked by prayer, sustained in faith, and designed for real response. Through shared worship leadership, prayer ministry, free Bibles, baptism presence, church connection, and practical next-step pathways, its mission is to create an intentional, welcoming, city-facing environment where Jesus is openly honored, the Church stands together, and people are invited to encounter God and respond in a meaningful way.
            </StandardText>
          </section>
        </ScrollReveal>
        <PullQuote attribution="The Vision">
          To see Cochrane gathered in visible unity before God — churches standing together, Jesus openly honored in the city.
        </PullQuote>

        <SectionDivider variant="cross" />
      </div>
    </EditorialContainer>

    {/* Distinctives — muted section with card grid */}
    <Section variant="muted" padding="lg">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div id="distinctives" className="scroll-mt-32 mb-10">
            {/* Gold diamond separator */}
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <SectionHeading className="mb-2">What Makes This Day Different</SectionHeading>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {distinctives.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <EditorialCard
                icon={item.icon}
                title={item.title}
                body={item.desc}
                ghost={String(i + 1).padStart(2, "0")}
                stainedGlassImage={item.image}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={crossField} alt="Cross in a field — hope and a future" verse="For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." reference="Jeremiah 29:11" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24">
        {/* Benediction border before nav */}
        <div className="border-t border-border/30 pt-12">
          <VisionNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
  );
};

export default Mission;
