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
import { ArrowRight, BookOpen, Heart, MessageCircle, Clock, Users, Music } from "lucide-react";
import bentoFaith from "@/assets/bento-faith.jpg";
import stainedGlassPrayer from "@/assets/stained-glass-prayer.jpg";
import glassEternalHope from "@/assets/stained-glass-eternal-hope.png";
import glassGentleRefuge from "@/assets/stained-glass-gentle-refuge.png";
import glassJoyfulCelebration from "@/assets/stained-glass-joyful-celebration.png";

const eventFacts = [
  {
    icon: Clock,
    title: "Come & Go Freely",
    body: "Arrive when you like and leave when you're ready. No set start time you need to catch.",
    ghost: "01",
    stainedGlassImage: glassEternalHope,
  },
  {
    icon: Users,
    title: "No Pressure",
    body: "No one will single you out, call you forward, or ask you to do anything. You're free to observe.",
    ghost: "02",
    scripture: "Come now, let us reason together — Isaiah 1:18",
    stainedGlassImage: glassGentleRefuge,
  },
  {
    icon: Music,
    title: "Live Worship All Day",
    body: "Worship teams from churches across Cochrane play continuously. There will also be food trucks, a Prayer Tent, and space for families.",
    ghost: "03",
    stainedGlassImage: glassJoyfulCelebration,
  },
];

const nextSteps = [
  {
    to: "/faith/get-connected",
    icon: BookOpen,
    title: "Visit the Get Connected Tent",
    description: "Browse local churches, pick up a free Bible, and explore next steps at your own pace.",
  },
  {
    to: "/faith/contact-pastor",
    icon: MessageCircle,
    title: "Talk to a Church",
    description: "Send a message and a local church will respond personally — no pressure, no agenda.",
  },
  {
    to: "/support/prayer",
    icon: Heart,
    title: "Receive Prayer",
    description: "The Prayer Tent is open all day for healing, encouragement, or anything on your heart.",
  },
];

const FaithQuestions = () => (
  <PageShell>
    <SubPageHeader
      title="Faith Questions"
      subtitle="You don't need answers before you arrive. Questions are not only welcome — they're honoured."
      eyebrow="Exploring Faith?"
      image={bentoFaith}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/faith" label="Back to Exploring Faith" />

        <ScriptureWhisper
          verse="Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
          reference="Matthew 7:7"
          variant="anchor"
        />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Questions About Christianity</SectionHeading>
            <StandardText className="text-lg">
              "What do Christians actually believe?" or "Why does any of this matter?" — these are not only welcome, they're honoured. People at every stage of faith will be at this event. Jesus Himself extended an open invitation: "Come to me, all you who are weary and burdened, and I will give you rest." That invitation still stands, and it includes you.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote attribution="C.S. Lewis">
          I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* Event facts — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
            </div>
            <Eyebrow className="text-foreground">Questions About the Event?</Eyebrow>
            <StandardText className="mt-2 text-sm">
              This is not a church service you accidentally walked into. Here's what to expect.
            </StandardText>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {eventFacts.map((item, i) => (
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

    <ImageInterstitial src={stainedGlassPrayer} alt="Stained glass prayer — seek and you will find" verse="For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." reference="John 3:16" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Next Steps in Faith</SectionHeading>
            <StandardText>
              If something stirs in you — during the event or even now as you read — there are four simple pathways available to you. Pick up a free Bible, receive prayer, have a quiet conversation with a local church, or connect with a community. Every pathway is offered freely. No strings, no pressure — just people who care.
            </StandardText>
          </section>
        </ScrollReveal>

        {/* Next-step journey cards */}
        <ScrollReveal>
          <section className="border-t border-border/40 pt-12">
            <SectionHeading className="mb-6">Your Next Step</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

export default FaithQuestions;
