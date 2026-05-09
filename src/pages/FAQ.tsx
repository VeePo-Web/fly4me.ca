import { useState, useEffect, useCallback, useRef } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { Link } from "react-router-dom";
import { useContactPanel } from "@/contexts/ContactPanelContext";

import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";

import { Search, Mail, ArrowRight } from "lucide-react";
import bentoFaq from "@/assets/bento-faq.jpg";
import { faqCategories } from "@/data/faq-data";

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ── Sidebar cross bullet ── */
const CrossBullet = ({ active }: { active?: boolean }) => (
  <span className="relative flex-shrink-0 w-2.5 h-2.5" aria-hidden="true">
    <span
      className={`absolute left-1/2 top-0 w-px h-full -translate-x-1/2 transition-colors duration-300 ${
        active ? "bg-primary/60" : "bg-primary/25"
      }`}
    />
    <span
      className={`absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transition-colors duration-300 ${
        active ? "bg-primary/60" : "bg-primary/25"
      }`}
    />
  </span>
);

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pillStripRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const { openPanel } = useContactPanel();

  const filtered = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  /* ── IntersectionObserver scroll-spy ── */
  useEffect(() => {
    const ids = faqCategories.map((cat) => `faq-${slugify(cat.name)}`);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Auto-scroll mobile pill strip to active pill ── */
  useEffect(() => {
    if (!activeCategory || !pillStripRef.current) return;
    const activePill = pillStripRef.current.querySelector(`[data-slug="${activeCategory}"]`);
    if (activePill) {
      activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  const handleCategoryClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${slug}`, { offset: -96 });
    } else {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lenis]);

  return (
    <PageShell>
      <SubPageHeader
        title="Frequently Asked Questions"
        subtitle="Straightforward answers. If you don't find what you need, reach us at mitfordworship@gmail.com."
        eyebrow="FAQ"
        image={bentoFaq}
      />

      <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* ── Mobile pill strip ── */}
        <div
          className="lg:hidden -mx-1 px-1 mb-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            ref={pillStripRef}
            className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide snap-x snap-mandatory"
            role="navigation"
            aria-label="FAQ categories"
          >
            {faqCategories.map((cat) => {
              const slug = `faq-${slugify(cat.name)}`;
              const isActive = activeCategory === slug;
              return (
                <a
                  key={cat.name}
                  href={`#${slug}`}
                  data-slug={slug}
                  onClick={(e) => handleCategoryClick(e, slug)}
                  className={`flex-shrink-0 snap-start text-xs font-sans px-3 py-1.5 border transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center ${
                    isActive
                      ? "bg-primary/10 text-foreground border-primary/20"
                      : "bg-muted/20 text-muted-foreground/70 border-border/30 hover:text-foreground hover:border-border/50"
                  }`}
                >
                  {cat.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
          {/* ── Sticky sidebar (desktop) ── */}
          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start" role="navigation" aria-label="FAQ categories">
            <p
              className="text-[10px] font-sans uppercase tracking-[0.25em] text-muted-foreground/50 mb-4"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              Categories
            </p>
            <ul className="flex flex-col gap-0.5">
              {faqCategories.map((cat) => {
                const slug = `faq-${slugify(cat.name)}`;
                const isActive = activeCategory === slug;
                const filteredCat = filtered.find((f) => f.name === cat.name);
                const count = filteredCat ? filteredCat.questions.length : 0;
                const isHidden = search && count === 0;

                return (
                  <li key={cat.name}>
                    <a
                      href={`#${slug}`}
                      onClick={(e) => handleCategoryClick(e, slug)}
                      className={`group relative flex items-center gap-2.5 py-1.5 pl-3 text-sm font-sans transition-all duration-300 ${
                        isHidden
                          ? "opacity-30 pointer-events-none"
                          : isActive
                          ? "text-foreground translate-x-0.5"
                          : "text-muted-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {/* Active accent bar */}
                      <div
                        className={`absolute left-0 top-1 bottom-1 w-[2px] transition-all duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.15))" }}
                        aria-hidden="true"
                      />
                      <CrossBullet active={isActive} />
                      <span className="flex-1">{cat.name}</span>
                      <span
                        className={`text-[11px] tabular-nums transition-colors duration-300 ${
                          isActive ? "text-muted-foreground/60" : "text-muted-foreground/40"
                        }`}
                      >
                        {count}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Bottom divider + contact */}
            <div className="mt-6 pt-5 border-t border-border/30">
              <p className="text-xs text-muted-foreground/60 leading-relaxed mb-1.5">
                Can't find your answer?
              </p>
              <button
                onClick={() => openPanel("general")}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-primary/70 hover:text-primary transition-colors duration-300"
              >
                <Mail size={12} strokeWidth={1.5} />
                Message us
              </button>
            </div>
          </aside>

          {/* ── Main content column ── */}
          <div className="flex flex-col gap-12 text-left">
            <ScrollReveal>
              <div className="relative group border border-border/40 bg-card/30 overflow-hidden transition-all duration-500 focus-within:border-primary/20 focus-within:bg-card/50">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] opacity-30 group-focus-within:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--gold-warm) / 0.2))" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, hsl(var(--primary) / 0.03), transparent 70%)" }}
                  aria-hidden="true"
                />
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/55 group-focus-within:text-primary/60 transition-colors duration-300"
                  size={16}
                  strokeWidth={1.5}
                />
                <input
                  type="search"
                  placeholder="Search questions or keywords…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-5 py-4 text-base font-sans focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/55"
                  style={{ fontFeatureSettings: '"cv02"' }}
                  aria-label="Search frequently asked questions"
                />
              </div>
            </ScrollReveal>

            <PullQuote>
              Straightforward answers to honest questions — no jargon, no pressure.
            </PullQuote>

            {filtered.length === 0 && (
              <p className="text-base text-center text-muted-foreground py-12">
                No matching questions found for &ldquo;{search}&rdquo;.
              </p>
            )}

            <div className="flex flex-col gap-16">
              {filtered.map((cat, catIndex) => (
                <ScrollReveal key={cat.name} delay={catIndex * 0.04}>
                  <div id={`faq-${slugify(cat.name)}`} className="mb-2 scroll-mt-32">
                    <div className="flex items-baseline gap-3 mb-6">
                      <h2
                        className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium"
                        style={{ fontFeatureSettings: '"cv02"' }}
                      >
                        {cat.name}
                      </h2>
                      <span
                        className="text-[11px] font-sans text-muted-foreground/65 tabular-nums"
                        aria-label={`${cat.questions.length} questions`}
                      >
                        {cat.questions.length}
                      </span>
                      <div className="flex-1 h-px bg-border/30" aria-hidden="true" />
                    </div>
                    <Accordion type="multiple" className="w-full">
                      {cat.questions.map((item, i) => (
                        <AccordionItem
                          key={i}
                          value={`${cat.name}-${i}`}
                          className="border-b-border/30 pl-4 overflow-hidden"
                        >
                          <AccordionTrigger className="text-base font-medium text-left hover:no-underline hover:text-foreground/80 py-5 transition-colors duration-300">
                            <span className="flex items-baseline gap-3">
                              <span
                                className="text-[11px] font-serif text-muted-foreground/70 tabular-nums flex-shrink-0 w-4 text-right"
                                aria-hidden="true"
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span>{item.q}</span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 pr-6 pl-7">
                            {item.a}
                            {item.link && (
                              <div className="flex justify-end mt-4">
                                <Link
                                  to={item.link.to}
                                  className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 hover:text-primary transition-colors duration-300"
                                  style={{ fontFeatureSettings: '"cv02"' }}
                                >
                                  {item.link.label}
                                  <ArrowRight size={11} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Still have questions — CTA card */}
            <ScrollReveal delay={0.2}>
              <button
                onClick={() => openPanel("general")}
                className="group relative block w-full text-left border border-border/40 bg-muted/20 hover:bg-muted/40 p-6 md:p-8 transition-all duration-500 mt-4 overflow-hidden"
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
                <div className="flex items-start gap-4 pl-3">
                  <div className="rounded-sm border border-border/30 bg-card p-2.5 group-hover:border-primary/15 transition-colors duration-500">
                    <Mail size={20} strokeWidth={1.2} className="text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-base font-medium text-foreground mb-1.5" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                      Still have a question?
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-3">
                      We're happy to help. Send us a message and we'll get back to you personally.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.12em] text-primary/70 group-hover:text-primary transition-colors duration-300" style={{ fontFeatureSettings: '"cv02"' }}>
                      Send a message
                      <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </button>
            </ScrollReveal>

            {/* Cross-navigation */}
            <ScrollReveal delay={0.25}>
              <nav aria-label="Related pages" className="border-t border-border/40 pt-10 mt-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative" aria-hidden="true">
                    <div className="w-px h-3 bg-primary/15 mx-auto" />
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-px bg-primary/15" />
                  </div>
                  <p
                    className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground"
                    style={{ fontFeatureSettings: '"cv02"' }}
                  >
                    Continue exploring
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { to: "/day-details", label: "Day Details" },
                    { to: "/day-details/schedule", label: "Schedule" },
                    { to: "/vision", label: "Vision" },
                    { to: "/faith", label: "Exploring Faith" },
                    { to: "/support", label: "Support" },
                  ].map((link, i) => (
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
                        {link.label}
                        <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
                      </Link>
                    </div>
                  ))}
                </div>
              </nav>
            </ScrollReveal>

            <ScriptureWhisper
              verse="Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
              reference="Matthew 7:7"
              variant="interstitial"
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default FAQ;
