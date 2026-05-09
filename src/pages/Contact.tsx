import { ArrowRight, Mail, CalendarDays, HelpCircle, BookOpen, MessageSquare, Church, Heart, DollarSign, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import ScrollReveal from "@/components/ScrollReveal";
import bentoContact from "@/assets/bento-contact.jpg";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import { useContactPanel, type ContactPathway } from "@/contexts/ContactPanelContext";

const CONTACT_PATHWAYS = [
  { id: "general" as ContactPathway, label: "General Question", icon: MessageSquare, description: "Event details, logistics, or anything on your mind." },
  { id: "church-partner" as ContactPathway, label: "Church Partnership", icon: Church, description: "Interested in your church joining the day? Let's talk." },
  { id: "pastor" as ContactPathway, label: "Message a Church", icon: Heart, description: "Reach out to a local church for faith questions, prayer, or conversation." },
  { id: "donate" as ContactPathway, label: "Donation & Sponsorship", icon: DollarSign, description: "Interested in giving? Reach out and our team will connect with you personally." },
  { id: "volunteer" as ContactPathway, label: "Volunteer Sign-Up", icon: HandHeart, description: "Serve on the day — from setup to prayer ministry." },
  { id: "prayer" as ContactPathway, label: "Prayer Request", icon: BookOpen, description: "Share what's on your heart. We will pray." },
] as const;

const nextSteps = [
  { to: "/faq", label: "FAQ", icon: HelpCircle, desc: "Common questions answered" },
  { to: "/day-details/schedule", label: "Event Schedule", icon: CalendarDays },
  { to: "/testimony", label: "Share Your Story", icon: BookOpen },
];

const Contact = () => {
  const { openPanel } = useContactPanel();

  return (
    <PageShell>
      <SubPageHeader
        title="Contact"
        subtitle="Questions about the event, church partnership, volunteering, or anything else — we'd love to hear from you."
        eyebrow="Get in Touch"
        image={bentoContact}
      />

      <EditorialContainer layout="center">
        <div className="w-full max-w-2xl flex flex-col gap-10 text-left">
          <ScrollReveal weight="light">
            <div className="relative flex items-center gap-3 p-4 border border-border/40 bg-muted/30 overflow-hidden group">
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
              />
              <Mail size={16} strokeWidth={1.2} className="text-muted-foreground flex-shrink-0 ml-1" />
              <p className="text-sm text-muted-foreground">
                You can also email us directly at{" "}
                <a
                  href="mailto:mitfordworship@gmail.com"
                  className="text-foreground link-reveal pb-0.5 break-all sm:break-normal"
                >
                  mitfordworship@gmail.com
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScriptureWhisper
            verse="How beautiful are the feet of those who bring good news."
            reference="Romans 10:15"
            delay={0.1}
          />

          <PullQuote>
            We'd love to hear from you — whether it's a question, an idea, or just a hello.
          </PullQuote>

          {/* Pathway bento grid */}
          <ScrollReveal delay={0.1} weight="normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_PATHWAYS.map((pathway, i) => (
                <button
                  key={pathway.id}
                  onClick={() => openPanel(pathway.id)}
                  className="group relative text-left border border-border/40 bg-card/50 p-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-card/80 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Gold left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 group-hover:w-[2.5px]"
                    style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--gold-warm) / 0.2))" }}
                    aria-hidden="true"
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{ background: "linear-gradient(90deg, hsl(var(--gold-warm) / 0.3), hsl(var(--primary) / 0.2), transparent)" }}
                    aria-hidden="true"
                  />
                  {/* Warm glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.03), transparent 70%)" }}
                    aria-hidden="true"
                  />
                  {/* Ghost index */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-3 font-serif text-[2.5rem] leading-none text-foreground/[0.04] group-hover:text-foreground/[0.06] transition-colors duration-700 select-none pointer-events-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="rounded-sm border border-border/30 bg-muted/40 p-2 group-hover:bg-accent/60 group-hover:border-primary/15 transition-all duration-500 backdrop-blur-sm">
                        <pathway.icon className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" size={18} strokeWidth={1.2} />
                      </div>
                      <ArrowRight size={12} strokeWidth={1.5} className="text-muted-foreground/0 group-hover:text-primary/50 group-hover:translate-x-1 transition-all duration-500 mt-2" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-foreground tracking-[-0.01em]">
                      {pathway.label}
                    </h3>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                      {pathway.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Journey next-steps */}
          <ScrollReveal delay={0.2}>
            <nav aria-label="Explore more" className="border-t border-border/40 pt-10 mt-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative" aria-hidden="true">
                  <div className="w-px h-3 bg-primary/15 mx-auto" />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-px bg-primary/15" />
                </div>
                <p
                  className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  You might also be looking for
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {nextSteps.map((link, i) => (
                  <div
                    key={link.to}
                    className="animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <Link
                      to={link.to}
                      className="group relative inline-flex items-center gap-2 border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/15 px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-300 overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[1.5px] transition-all duration-500 group-hover:w-[2px]"
                        style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.1))" }}
                      />
                      <link.icon size={13} strokeWidth={1.3} className="flex-shrink-0 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                      {link.label}
                      <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          </ScrollReveal>

          <ScriptureWhisper
            verse="Bear one another's burdens, and so fulfill the law of Christ."
            reference="Galatians 6:2"
            variant="interstitial"
          />
        </div>
      </EditorialContainer>
    </PageShell>
  );
};

export default Contact;
