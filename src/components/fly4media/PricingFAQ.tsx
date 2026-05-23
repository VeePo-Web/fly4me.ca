import { useState } from "react";
import { useReveal } from "./useReveal";

const FAQS = [
  {
    q: "Do you travel outside Calgary / Alberta?",
    a: "Yes. Travel within Alberta is included for most projects — no surprise fuel surcharges. For projects outside the province (BC, Saskatchewan, or further), travel costs are quoted upfront as a flat line item before any booking is confirmed. No hidden costs after the fact.",
  },
  {
    q: "What happens if weather cancels the shoot?",
    a: "We reschedule, not refund. Your booking deposit holds your spot on the calendar, not a specific date. If conditions on the day won't produce footage worth delivering, we call it and reschedule at no cost. You're never charged for a shoot that didn't happen.",
  },
  {
    q: "How do I know the quality will match what I see in the portfolio?",
    a: "Every project on the site was shot by the same operator — Toby — using the same camera system. The brief process before each shoot exists to capture exactly what you've seen and want. If the result doesn't match the brief, the reshoot guarantee covers you.",
  },
  {
    q: "Do you handle editing, or is this raw footage only?",
    a: "All packages include a fully edited, colour-graded deliverable — not raw files. Raw selects are included with Elevated and Signature packages so you have the source material for future use. You receive a finished asset, not a hard drive.",
  },
  {
    q: "Can I book a specific time of day — sunset, golden hour?",
    a: "Yes. Signature packages include a golden-hour shoot window by default. For Essential and Elevated packages, preferred timing can be requested and we'll schedule around it where conditions allow. Premium light conditions are included in Signature tiers because that's when the footage earns its place.",
  },
  {
    q: "What's included in the brief process?",
    a: "A 20-minute call or written brief — your choice. We cover: the property or location, the feeling you want the footage to produce, where it will be used, and any specific shots you have in mind. This is how we make sure the delivered footage is exactly what you needed. It takes 20 minutes and prevents everything from going wrong.",
  },
  {
    q: "How many shoot days do you take on per month?",
    a: "Intentionally limited. Toby operates alone — there's no crew of operators under a brand name. Keeping shoot volume controlled is how the quality stays consistent. Current availability is posted at the top of the page. When spots fill, they fill.",
  },
  {
    q: "Can I get a custom quote for something not listed?",
    a: "Yes. If your project doesn't map to a listed package — multi-day campaigns, international shoots, broadcast commissions — the best starting point is a conversation. Use the contact form and describe the brief. A scoped quote comes back within 24 hours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor="hover"
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="t-body font-medium group-hover:text-foreground transition-colors duration-200">
          {q}
        </span>
        {/*
          Grid-template-rows accordion — protocol-compliant.
          The +/− indicator uses transform not layout change.
        */}
        <span
          className={`shrink-0 mt-0.5 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out-soft)] ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      {/* grid-template-rows: 0fr → 1fr — no max-height jank */}
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-soft)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="t-body text-muted-foreground leading-relaxed pb-6 max-w-[62ch]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PricingFAQ() {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section className="py-section border-t border-border">
      <div className="container-x">

        <div ref={headRef} className="reveal mb-14 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5">
              <p className="t-eyebrow text-muted-foreground mb-5">
                Before you book
              </p>
              <h2 className="t-display-2 wrap-editorial wrap-editorial-mobile-off max-w-[14ch]">
                The questions
                <br />
                worth asking.
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 t-lede text-muted-foreground max-w-[44ch]">
              Real answers to the concerns that come up before every booking —
              not a list of reasons to hire us.
            </p>
          </div>
        </div>

        <div ref={listRef} className="reveal md:grid md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
