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
import EditorialCard from "@/components/EditorialCard";
import { Mail, ArrowRight, ShieldCheck, Clock, Heart } from "lucide-react";
import bentoFaith from "@/assets/bento-faith.jpg";
import BackLink from "@/components/BackLink";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import ImageInterstitial from "@/components/ImageInterstitial";
import divineIntercession from "@/assets/stained-glass-divine-intercession.png";

const promises = [
  {
    icon: ShieldCheck,
    title: "No Pressure",
    body: "You won't be added to a list, signed up for anything, or followed up with unless you ask.",
    ghost: "01",
  },
  {
    icon: Clock,
    title: "Personal Response",
    body: "Not a form letter, not a mass email — a real person who has chosen to be available will write back.",
    ghost: "02",
  },
  {
    icon: Heart,
    title: "Confidential",
    body: "Whatever you share is held with care. Your story is safe here.",
    ghost: "03",
    scripture: "The Lord is close to the brokenhearted — Psalm 34:18",
  },
];

const ContactPastor = () => {
  const { openPanel } = useContactPanel();
  return (
  <PageShell>
    <SubPageHeader
      title="Contact a Church"
      subtitle="Reaching out takes courage — and we don't take that lightly. A real person who has chosen to be available."
      eyebrow="Exploring Faith?"
      image={bentoFaith}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/faith" label="Back to Exploring Faith" />

        <ScriptureWhisper
          verse="Cast all your anxiety on him because he cares for you."
          reference="1 Peter 5:7"
          variant="anchor"
        />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Ask a Question</SectionHeading>
            <StandardText className="text-lg">
              If you have a question about faith, about Christianity, or about what it means to follow Jesus, you can send it to us and a local church will respond personally. Not a form letter, not a mass email — a real person who has chosen to be available. No pressure, no agenda. Just an honest answer from someone who cares.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          Reaching out takes courage — and we don't take that lightly.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Promises — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">What to Expect</Eyebrow>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {promises.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.06}>
              <EditorialCard icon={item.icon} title={item.title} body={item.body} ghost={item.ghost} scripture={item.scripture} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={divineIntercession} alt="Stained glass divine intercession — a place of warmth and care" verse="The Lord is near to the brokenhearted and saves the crushed in spirit." reference="Psalm 34:18" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Connect with a Local Church</SectionHeading>
            <StandardText className="mb-8">
              Churches across Cochrane — different denominations, different styles, but united in their love for this community — are part of this event. You can meet them at the event or arrange a time that works for you.
            </StandardText>

            <button
              onClick={() => openPanel("pastor")}
              className="group relative block w-full text-left border border-border/40 p-8 md:p-10 transition-all duration-500 overflow-hidden hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              style={{ background: "linear-gradient(135deg, hsl(var(--gold-warm) / 0.02), hsl(var(--muted) / 0.3))" }}
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
              <div className="flex items-start gap-4 relative z-10 pl-3">
                <div className="rounded-sm border border-border/30 bg-card p-2.5 group-hover:border-primary/15 transition-colors duration-500">
                  <Mail size={20} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-medium text-foreground mb-1.5" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                    Reach out to a church
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Send us a message and we'll connect you with a local church who can have a private, no-pressure conversation.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 group-hover:text-primary transition-colors duration-300" style={{ fontFeatureSettings: '"cv02"' }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse mr-1.5" />
                    Send a message
                    <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </div>
            </button>
          </section>
        </ScrollReveal>

        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Follow-Up Support</SectionHeading>
            <StandardText>
              Whether you attend the event or not, ongoing care from local churches is available to you. That might look like prayer follow-up after a meaningful moment, guidance on baptism, help finding a church home, or simply someone to talk to during a difficult season. The churches behind this event believe that care doesn't end when the day is over — it's just beginning.
            </StandardText>
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

};

export default ContactPastor;
