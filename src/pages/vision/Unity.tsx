import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import VisionNav from "@/components/VisionNav";
import { Section } from "@/components/ui/section";
import BackLink from "@/components/BackLink";
import EditorialImage from "@/components/EditorialImage";
import EditorialCard from "@/components/EditorialCard";
import SectionNumber from "@/components/SectionNumber";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, Music, Fingerprint } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import bentoVision from "@/assets/bento-vision.jpg";
import churchesCandles from "@/assets/churches-candles.jpg";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";
import glassFaithfulGuidance from "@/assets/stained-glass-faithful-guidance.png";

const unityPillars = [
  {
    num: "01",
    title: "Shared Platform, Not Shared Theology",
    body: "Churches don't need to agree on every secondary issue. They share one Lord, one baptism, one faith. The platform belongs to no single congregation — it belongs to the King.",
    icon: Share2,
    image: glassCommunityTable,
  },
  {
    num: "02",
    title: "Many Teams, One Voice",
    body: "Worship teams from churches across Cochrane will lead across the full day. This is not cooperative scheduling — it is a visible declaration that our devotion to Christ surpasses organizational boundaries.",
    icon: Music,
    image: glassJoyfulCelebration,
  },
  {
    num: "03",
    title: "Unity Within Uniqueness",
    body: "The Apostles' Creed defines what holds us together across denominations: one God, one faith, one baptism. The expression may look different — because each human is different — but the foundation is the same.",
    icon: Fingerprint,
    image: glassFaithfulGuidance,
  },
];

const Unity = () => {
  const lenis = useSmoothScroll();
  const scrollToAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (lenis) { lenis.scrollTo(`#${id}`, { offset: -96 }); }
    else { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  return (
  <PageShell>
    <SubPageHeader
      title="Unity Across Churches"
      subtitle="Unity within uniqueness, not uniformity. Harmony, not homogeneousness."
      eyebrow="Vision"
      image={bentoVision}
    />

    <EditorialContainer layout="sidebar">
      {/* Sidebar Navigation */}
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
            <a href="#churches-together" onClick={(e) => scrollToAnchor(e, "churches-together")} className="text-sm font-medium link-reveal pb-0.5 self-start">Churches Together</a>
            <a href="#shape-of-unity" onClick={(e) => scrollToAnchor(e, "shape-of-unity")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">The Shape of Unity</a>
            <a href="#apostles-creed" onClick={(e) => scrollToAnchor(e, "apostles-creed")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">The Apostles' Creed</a>
            <a href="#what-city-sees" onClick={(e) => scrollToAnchor(e, "what-city-sees")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-reveal pb-0.5 self-start">What the City Sees</a>
          </nav>
        </div>
      </aside>

      {/* Main Editorial Content */}
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Mobile Back Link */}
        <div className="lg:hidden">
          <BackLink to="/vision" label="Back to Vision" />
        </div>

        <ScrollReveal>
          <section id="churches-together" className="scroll-mt-32 relative">
            <SectionNumber number="01" />
            <SectionHeading className="mb-6">Churches Together</SectionHeading>
            <StandardText className="text-lg">
              Multiple churches across Cochrane are standing together for this day — not because they agree on every detail, but because they share one faith, one Lord, and one King. The platform belongs to no single church. What the city sees is part of the message.
            </StandardText>
          </section>
        </ScrollReveal>

        <ScriptureWhisper
          verse="I in them and you in me — so that they may be brought to complete unity. Then the world will know that you sent me."
          reference="John 17:23"
          variant="anchor"
        />
      </div>
    </EditorialContainer>

    {/* Pillars of Unity — editorial numbered cards */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full" id="shape-of-unity">
        <ScrollReveal>
          <div className="mb-10">
            {/* Gold diamond separator */}
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">The Shape of Unity</Eyebrow>
          </div>
        </ScrollReveal>
        <div className="flex flex-col gap-4">
          {unityPillars.map((pillar, i) => (
            <ScrollReveal key={pillar.num} delay={i * 0.08}>
              <EditorialCard
                icon={pillar.icon}
                title={pillar.title}
                body={pillar.body}
                ghost={pillar.num}
                stainedGlassImage={pillar.image}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    {/* Inline editorial image before "What the City Sees" */}
    <EditorialImage
      src={churchesCandles}
      alt="Churches united in candlelight"
      variant="bleed"
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">

        <ScrollReveal>
          <section id="apostles-creed" className="scroll-mt-32 relative">
            <SectionNumber number="03" />
            <SectionHeading className="mb-6">The Apostles' Creed</SectionHeading>
            <StandardText className="mb-8">
              This is the shared confession that unites the churches standing together for this day. It is not the property of any denomination — it belongs to the whole Church across all times and places.
            </StandardText>
            <blockquote className="border-l-2 border-primary/30 pl-6 md:pl-8 font-serif text-lg md:text-xl leading-relaxed text-foreground/90 flex flex-col gap-6">
              <p>I believe in God, the Father almighty, creator of heaven and earth.</p>
              <p>I believe in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; he descended to the dead. On the third day he rose again; he ascended into heaven, he is seated at the right hand of the Father, and he will come to judge the living and the dead.</p>
              <p>I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen.</p>
            </blockquote>
            <p className="mt-6 text-sm text-muted-foreground italic">
              The word "catholic" here means universal — the whole Church across all times and places.
            </p>
          </section>
        </ScrollReveal>

        <PullQuote attribution="Commonly attributed to Augustine">
          In essentials, unity; in non-essentials, liberty; in all things, charity.
        </PullQuote>

        <SectionDivider variant="line" />

        <ScrollReveal>
          <section id="what-city-sees" className="scroll-mt-32 relative">
            <SectionNumber number="04" />
            <SectionHeading className="mb-6">What the City Sees</SectionHeading>
            <StandardText>
              The unity of the church is not a secondary detail — it is one of the primary proofs of the vision. When brothers and sisters from different congregations stand together in worship, the witness to the city is not a program. It is a testimony. The world watches — and what they see matters.
            </StandardText>
          </section>
        </ScrollReveal>

        <ScriptureWhisper
          verse="Make every effort to keep the unity of the Spirit through the bond of peace."
          reference="Ephesians 4:3"
          variant="interstitial"
        />

        {/* Benediction border before nav */}
        <div className="border-t border-border/30 pt-12">
          <VisionNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
  );
};

export default Unity;
