import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import SupportNav from "@/components/SupportNav";
import VolunteerForm from "@/components/VolunteerForm";
import BackLink from "@/components/BackLink";
import EditorialImage from "@/components/EditorialImage";
import ImageInterstitial from "@/components/ImageInterstitial";
import bentoSupport from "@/assets/bento-support.jpg";
import sacredHarvest from "@/assets/stained-glass-sacred-harvest.png";

const ROLES = [
  "Setup & Takedown",
  "Parking",
  "Prayer Team Support",
  "Get Connected Tent",
  "Free Bible Table",
  "Security",
  "Greeting & Welcome",
  "Stage Hand (Tech / Worship)",
  "Hospitality",
  "Floater",
];

const Volunteer = () => (
  <PageShell>
    <SubPageHeader
      title="Volunteer"
      subtitle="Serving is not separate from the worship. It is part of it."
      eyebrow="Support"
      image={bentoSupport}
    />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <BackLink to="/support" label="Back to Support" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Serving Is Part of the Day</SectionHeading>
            <StandardText className="text-lg">
              Worship in the Park is carried by volunteers. Not hired staff — people from local churches who give their time because they believe this day matters. When you park a car, hand someone a Bible, or quietly pray beside a stranger, you are participating in the ministry of the day.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          When you park a car, hand someone a Bible, or quietly pray beside a stranger — you are participating in the ministry of the day.
        </PullQuote>

        <ScriptureWhisper
          verse="Whatever you do, work at it with all your heart, as working for the Lord."
          reference="Colossians 3:23"
          variant="anchor"
        />
      </div>
    </EditorialContainer>

    {/* Volunteer roles — muted section */}
    <Section variant="muted" padding="lg">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <ScrollReveal>
          <Eyebrow className="text-foreground mb-2">Volunteer Roles</Eyebrow>
          <StandardText className="mb-6 text-sm">
            There are many ways to serve — each one essential.
          </StandardText>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ROLES.map((role, i) => (
            <div
              key={role}
              className="relative flex items-center gap-3 border border-border/30 bg-card px-4 py-3 group overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{ animationDelay: `${60 + i * 40}ms` }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.35), hsl(var(--gold-warm) / 0.12))" }}
              />
              <div className="w-4 h-4 border border-border/50 rounded-sm flex-shrink-0 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300 ml-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300" />
              </div>
              <span className="text-sm text-foreground">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <ImageInterstitial src={sacredHarvest} alt="Stained glass sacred harvest — serving is worship" verse="For even the Son of Man did not come to be served, but to serve." reference="Mark 10:45" bgFrom="hsl(var(--muted))" />

    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-16 md:gap-24 text-left">
        <SectionDivider variant="cross" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Who Can Serve</SectionHeading>
            <StandardText>
              Volunteers must be 18 years or older and connected to a local church. This isn't a barrier for its own sake — it ensures pastoral covering, accountability, and alignment with the heart of the event.
            </StandardText>
          </section>
        </ScrollReveal>

        <SectionDivider variant="line" />

        <ScrollReveal>
          <section>
            <SectionHeading className="mb-4">Shifts</SectionHeading>
            <StandardText>
              The day is organized into six shifts so you can serve and still be present for the parts of the day that feed your own soul. Morning setup begins at 9:00 AM and the final takedown wraps around 8:30 PM. You'll choose your availability during the application below.
            </StandardText>
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="border-t border-border/40 pt-12">
            <SectionHeading className="mb-6">Volunteer Application</SectionHeading>
            <StandardText className="mb-6">
              This is an application, not a sign-up — because placing volunteers well is an act of stewardship. We review each submission to match people to roles where they'll thrive.
            </StandardText>
            <VolunteerForm />
          </section>
        </ScrollReveal>

        <div className="border-t border-border/30 pt-12">
          <SupportNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
);

export default Volunteer;
