import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import FaithNav from "@/components/FaithNav";
import BackLink from "@/components/BackLink";
import EditorialCard from "@/components/EditorialCard";
import ImageInterstitial from "@/components/ImageInterstitial";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, HelpCircle, BookOpen, Church, Droplets } from "lucide-react";
import bentoFaith from "@/assets/bento-faith.jpg";
import stainedGlassConnect from "@/assets/stained-glass-connect.jpg";
import glassHeavenlyWisdom from "@/assets/stained-glass-heavenly-wisdom.png";
import glassCommunityTable from "@/assets/stained-glass-community-table.png";
import glassLivingWater from "@/assets/stained-glass-living-water.png";

const tentFeatures = [
  {
    icon: BookOpen,
    title: "Free Bibles",
    body: "Pick up a Bible in English or another language — it's yours to keep. Someone will be there to help you begin reading if you'd like.",
    ghost: "01",
    scripture: "Your word is a lamp to my feet — Psalm 119:105",
    stainedGlassImage: glassHeavenlyWisdom,
  },
  {
    icon: Church,
    title: "Local Church Info",
    body: "Browse information about partnering churches — service times, locations, programs, and the heart behind each community.",
    ghost: "02",
    stainedGlassImage: glassCommunityTable,
  },
  {
    icon: Droplets,
    title: "Baptism & Next Steps",
    body: "If you've made a decision of faith or are curious about baptism, serving, or growing deeper — this is the place to start.",
    ghost: "03",
    stainedGlassImage: glassLivingWater,
  },
];

const nextSteps = [
  {
    to: "/faith/contact-pastor",
    icon: MessageCircle,
    title: "Talk to a Church",
    description: "A real person who has chosen to be available. No pressure, no agenda — just an honest conversation.",
  },
  {
    to: "/faith/questions",
    icon: HelpCircle,
    title: "Explore Faith Questions",
    description: "Common questions about Christianity, the event, and next steps — answered honestly.",
  },
];

const GetConnected = () => (
  <PageShell>
    <SubPageHeader
      title="Get Connected"
      subtitle="A welcoming, unhurried space where you can ask questions, browse local churches, or simply sit and talk with someone."
      eyebrow="Exploring Faith?"
      image={bentoFaith}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/faith" label="Back to Exploring Faith" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">The Get Connected Tent</SectionHeading>
            <StandardText className="text-lg">
              Look for it near the main gathering area — free Bibles will be available, and there will be someone there to help you begin reading. Whether you've attended church your whole life or never stepped into one, this tent is for you. Come for two minutes or stay for an hour. There's no sign-up sheet and no follow-up unless you ask for it.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          Come for two minutes or stay for an hour. There's no sign-up sheet and no follow-up unless you ask for it.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Tent features — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">What You'll Find</Eyebrow>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tentFeatures.map((item, i) => (
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

    <ImageInterstitial src={stainedGlassConnect} alt="Stained glass — connection and community" verse="And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together." reference="Hebrews 10:24–25" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Finding a Local Church</SectionHeading>
            <StandardText>
              The churches partnering in this event come from different denominations and traditions — but they share a common faith. Each one is unique in style and emphasis, and each would be glad to welcome you. At the tent, you'll find information about Sunday service times, locations, programs, and the heart behind each community.
            </StandardText>
          </section>
        </ScrollReveal>

        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Beyond Sunday Morning</SectionHeading>
            <StandardText>
              Church life in Cochrane extends well beyond weekend services. Small groups meet in homes throughout the week. Prayer teams are available for follow-up after the event. If you made a decision of faith — or are simply curious about baptism, serving, or growing deeper — the Get Connected Tent can point you toward real next steps with real people.
            </StandardText>
          </section>
        </ScrollReveal>


        {/* Next-step journey cards */}
        <ScrollReveal>
          <section className="border-t border-border/40 pt-12">
            <SectionHeading className="mb-6">Continue the Journey</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nextSteps.map((step, i) => (
                <div
                  key={step.to}
                  className="animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
                  style={{ animationDelay: `${100 + i * 80}ms` }}
                >
                  <Link
                    to={step.to}
                    className="group relative block border border-border/30 bg-muted/20 hover:bg-muted/40 p-5 h-full transition-all duration-500 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
                      style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.15), transparent)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-3 relative z-10 pl-3">
                      <div className="rounded-sm border border-border/30 bg-card p-2 w-fit group-hover:border-primary/15 transition-colors duration-500">
                        <step.icon size={18} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                      </div>
                      <h3 className="font-serif text-sm font-medium text-foreground" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.12em] text-primary/60 group-hover:text-primary transition-colors duration-300 mt-auto" style={{ fontFeatureSettings: '"cv02"' }}>
                        Learn more
                        <ArrowRight size={10} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Benediction border before nav */}
        <div className="border-t border-border/30 pt-12">
          <FaithNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
);

export default GetConnected;
