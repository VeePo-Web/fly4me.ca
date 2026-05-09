import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import { SectionHeading, StandardText, Eyebrow } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import PullQuote from "@/components/PullQuote";
import BackLink from "@/components/BackLink";
import DayDetailsNav from "@/components/DayDetailsNav";
import ImageInterstitial from "@/components/ImageInterstitial";
import bentoDayDetails from "@/assets/bento-day-details.jpg";
import stainedGlassWorship from "@/assets/stained-glass-worship.jpg";

const teams = [
  { name: "TBD", start: "11:00 AM", end: "11:55 AM", note: "Worship team to be announced." },
  { name: "TBD", start: "12:00 PM", end: "12:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "1:00 PM", end: "1:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "2:00 PM", end: "2:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "3:00 PM", end: "3:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "4:00 PM", end: "4:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "5:00 PM", end: "5:55 PM", note: "Worship team to be announced." },
  { name: "TBD", start: "6:00 PM", end: "6:55 PM", note: "Worship team to be announced." },
];

const ThornsSvg = ({ className }: { className?: string }) => (
  <svg
    width="240"
    height="240"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" />
    <path d="M40 12 L38 18 L42 18Z" fill="currentColor" opacity="0.6" />
    <path d="M40 68 L38 62 L42 62Z" fill="currentColor" opacity="0.6" />
    <path d="M12 40 L18 38 L18 42Z" fill="currentColor" opacity="0.6" />
    <path d="M68 40 L62 38 L62 42Z" fill="currentColor" opacity="0.6" />
    <path d="M19.5 19.5 L24 22 L22 24Z" fill="currentColor" opacity="0.5" />
    <path d="M60.5 19.5 L56 22 L58 24Z" fill="currentColor" opacity="0.5" />
    <path d="M19.5 60.5 L24 58 L22 56Z" fill="currentColor" opacity="0.5" />
    <path d="M60.5 60.5 L56 58 L58 56Z" fill="currentColor" opacity="0.5" />
    <ellipse cx="40" cy="40" rx="20" ry="20" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const SmallCross = ({ className }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className}>
    <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="0.8" />
    <line x1="12" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

const HeadingCross = () => (
  <div className="flex items-center justify-center mb-4">
    <div className="w-px h-6 bg-blood/20" />
    <div className="w-3 h-px bg-blood/20 -mt-2 -ml-[5px]" />
  </div>
);

const Schedule = () => (
  <PageShell>
    <SubPageHeader
      title="Day Schedule"
      subtitle="Many teams. A full day. One altar."
      eyebrow="Day Details"
      image={bentoDayDetails}
    />

    {/* === SECTION 01 — INTRO === */}
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-12 md:gap-20 text-left">
        <BackLink to="/day-details" label="Back to Day Details" />

        <ScrollReveal>
          <section className="relative">
            <span className="absolute -top-4 -left-4 font-serif text-8xl text-foreground/[0.03] leading-none select-none pointer-events-none hidden md:block">01</span>
            <SectionHeading className="mb-4">11:00 AM — 7:00 PM</SectionHeading>
            <StandardText className="text-lg">
              Worship in the Park runs continuously from late morning into the evening. Worship teams from churches across Cochrane will lead one after another — each carrying a 55-minute set with five-minute transitions between them. You can arrive at any point and step into something already in motion. There is no required arrival or departure time — stay for an hour, or stay all day.
            </StandardText>
          </section>
        </ScrollReveal>

        <PullQuote>
          Many teams. One altar. No headliner — just Jesus, lifted up from morning to evening.
        </PullQuote>
      </div>
    </EditorialContainer>

    {/* === SCRIPTURE INTERSTITIAL === */}
    <Section variant="muted" padding="lg" className="relative overflow-hidden">
      <div className="group cursor-default relative">
        {/* Warm glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ThornsSvg className="text-foreground opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 text-center relative z-10">
            <div className="w-16 group-hover:w-24 h-px bg-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light italic text-foreground/80 group-hover:text-foreground max-w-2xl leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              "From the rising of the sun to the place where it sets, the name of the Lord is to be praised."
            </p>
            <Eyebrow className="text-muted-foreground group-hover:text-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">Psalm 113:3 <span className="text-muted-foreground/65 group-hover:text-muted-foreground transition-all duration-500">&middot; NIV</span></Eyebrow>
            <div className="w-16 group-hover:w-24 h-px bg-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
        </ScrollReveal>
      </div>
    </Section>

    {/* === SECTION 02 — THE LINEUP === */}
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl flex flex-col gap-0 text-left">
        <ScrollReveal>
          <div className="relative pt-12 mb-12">
            <span className="absolute -top-4 -left-4 font-serif text-8xl text-foreground/[0.03] leading-none select-none pointer-events-none hidden md:block">02</span>
            <Eyebrow className="text-foreground">The Lineup</Eyebrow>
          </div>
        </ScrollReveal>

        {/* Vertical cross line — desktop only */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 hidden md:flex flex-col items-center -ml-8">
            <div className="w-px flex-1 bg-foreground/[0.06]" />
            <div className="w-4 h-px bg-foreground/[0.06] -ml-[7px]" style={{ position: 'absolute', top: '33%' }} />
          </div>

          <div className="flex flex-col gap-6">
            {teams.map((team, i) => (
              <div key={team.name}>
                <ScrollReveal delay={i * 0.08}>
                  <div
                    className="relative bg-card border border-border/50 p-6 md:p-8 overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:ring-2 focus-within:ring-primary/30"
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

                    {/* Ghost number */}
                    <span className="absolute top-4 right-4 font-serif text-6xl md:text-7xl text-foreground/[0.06] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Cross watermark */}
                    <SmallCross className="absolute bottom-3 right-3 text-foreground/[0.06]" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-1.5 pl-3">
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        {team.start} – {team.end}
                      </p>
                      <p className="font-serif text-xl md:text-2xl font-light text-foreground">
                        {team.name}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {team.note}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {i < teams.length - 1 && (
                  <div className="py-3 flex items-center justify-center">
                    <SectionDivider variant="dot" className="py-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditorialContainer>

    <ImageInterstitial src={stainedGlassWorship} alt="Stained glass worship scene — many teams, one altar" verse="Shout for joy to the Lord, all the earth, burst into jubilant song with music." reference="Psalm 98:4" />

    {/* === SECTION 03 — THE FLOW === */}
    <Section variant="muted" padding="lg">
      <ScrollReveal>
        <div className="w-full max-w-3xl mx-auto relative">
          <span className="absolute -top-4 -left-4 font-serif text-8xl text-foreground/[0.03] leading-none select-none pointer-events-none hidden md:block">03</span>

          {/* Gold diamond separator */}
          <div className="flex items-center gap-1 mb-4">
            <div className="w-5 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.06))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" aria-hidden="true">
              <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.4" fill="hsl(var(--gold-warm))" fillOpacity="0.08" />
            </svg>
            <div className="w-5 h-px" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--foreground) / 0.06))" }} />
          </div>
          <Eyebrow className="mb-10 text-foreground text-center md:text-left">The Flow</Eyebrow>

          <div className="border-l-2 border-primary/15 pl-6">
            <StandardText>
              MCs will guide the day relationally and spiritually — not merely logistically. During each five-minute transition, they will hold the space with prayer, scripture, or a moment of shared stillness. Their role is to preserve an atmosphere of expectancy, hospitality, and intentionality across every set. Expect a rhythm of worship, prayer, and moments of united response woven throughout the day.
            </StandardText>
          </div>
        </div>
      </ScrollReveal>
    </Section>

    {/* === CLOSING ALTAR MOTIF === */}
    <Section variant="default" padding="lg" className="relative overflow-hidden">
      <div className="group cursor-default relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--blood)/0.03),transparent_70%)] pointer-events-none" />
        {/* Warm glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold-warm) / 0.03), transparent 70%)" }}
          aria-hidden="true"
        />
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 text-center relative z-10">
            <ThornsSvg className="text-foreground opacity-[0.05] group-hover:opacity-[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <p className="font-serif text-lg md:text-xl font-light italic text-foreground/70 group-hover:text-foreground max-w-xl leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              "Let everything that has breath praise the Lord."
            </p>
            <Eyebrow className="text-muted-foreground group-hover:text-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">Psalm 150:6 <span className="text-muted-foreground/65 group-hover:text-muted-foreground transition-all duration-500">&middot; NIV</span></Eyebrow>
          </div>
        </ScrollReveal>
      </div>
    </Section>

    {/* === CROSS-NAV === */}
    <EditorialContainer layout="center">
      <div className="w-full max-w-3xl">
        <div className="border-t border-border/30 pt-12">
          <DayDetailsNav />
        </div>
      </div>
    </EditorialContainer>
  </PageShell>
);

export default Schedule;
