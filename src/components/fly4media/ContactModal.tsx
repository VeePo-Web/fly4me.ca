import { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import heroImage from "@/assets/cs-canmore-hero.jpg";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
  initialServices?: string[];
}

/* ---------- Service taxonomy ---------- */

interface ServiceGroup {
  label: string;
  items: string[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  { label: "Film & Story", items: ["Aerial Cinematography", "FPV Production", "Tourism Film"] },
  { label: "Brand & Campaign", items: ["Commercial Campaign", "Social Campaign", "Creative Direction"] },
  { label: "Property & Industry", items: ["Real Estate", "Industrial"] },
];

const NOT_SURE = "Not sure yet — let's talk";

/**
 * Route-based pre-selection. When the user opens the modal without an explicit
 * seed (e.g. from a Services CTA), we infer intent from the page they were on.
 * Today's routes are coarse — most map to []. The hook is here so adding
 * /services/fpv etc. later is a one-line change.
 */
function servicesForRoute(pathname: string): string[] {
  if (pathname.startsWith("/work/")) return []; // viewing a case study — don't presume
  return [];
}

/* ---------- Component ---------- */

export default function ContactModal({ open, onClose, initialServices = [] }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const location = useLocation();

  /* Reset scroll to top whenever the modal opens */
  useEffect(() => {
    if (!open) return;
    const resetScroll = () => scrollRef.current?.scrollTo({ top: 0, left: 0 });
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const t = setTimeout(resetScroll, 360);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
  }, [open]);

  /* Focus trap + scroll lock */
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      firstFieldRef.current?.focus({ preventScroll: true });
      scrollRef.current?.scrollTo({ top: 0, left: 0 });
    }, 320);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  /* Seed services when modal opens; reset all state when it closes.
     Explicit initialServices wins; otherwise infer from current route. */
  useEffect(() => {
    if (open) {
      const seeded = initialServices.length > 0 ? initialServices : servicesForRoute(location.pathname);
      setServices(seeded);
      return;
    }
    const t = setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
      setPhone("");
      setProject("");
      setServices([]);
    }, 300);
    return () => clearTimeout(t);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sticky-CTA gate: thumb-zone surface appears only when Name + Email read as real. */
  const readyToSend = useMemo(() => {
    return name.trim().length > 1 && /\S+@\S+\.\S+/.test(email.trim());
  }, [name, email]);

  if (!open) return null;

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: { name, email, phone, project, services },
      });
      if (error || (data && (data as { error?: string }).error)) {
        throw error ?? new Error("Submission failed");
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const triggerSubmit = () => {
    // Use native requestSubmit so HTML validation fires and focuses the
    // first invalid field — better UX than calling submit() directly.
    formRef.current?.requestSubmit();
  };

  /* ---------- Chip renderer ---------- */
  const renderChip = (s: string, opts?: { fullWidth?: boolean }) => {
    const active = services.includes(s);
    return (
      <button
        key={s}
        type="button"
        onClick={() => toggleService(s)}
        className={`
          t-micro shrink-0 snap-start whitespace-nowrap px-2.5 sm:px-3 py-1.5 border transition-all duration-200
          ${opts?.fullWidth ? "w-full text-left" : ""}
          ${active
            ? "border-foreground bg-foreground text-background"
            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          }
        `}
      >
        {s}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-md animate-modal-overlay-in cursor-default"
      />

      {/* Modal panel */}
      <div ref={scrollRef} className="relative h-full w-full overflow-y-auto animate-modal-panel-in">
        <div className="min-h-full grid grid-cols-1 lg:grid-cols-2">

          {/* ── LEFT — Brand panel ───────────────────────────────── */}
          <aside className="relative isolate overflow-hidden bg-foreground text-background h-[22vh] min-h-[140px] max-h-[220px] sm:min-h-[160px] lg:h-auto lg:min-h-screen lg:max-h-none">
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-55 motion-safe:animate-kenburns"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.50) 40%, rgba(10,10,10,0.18) 75%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 lg:p-16 xl:p-20 lg:min-h-screen">
              <div className="hidden lg:flex items-center gap-3">
                <span className="t-eyebrow text-background/50">Fly4MEdia</span>
              </div>

              <div className="max-w-md mt-auto">
                <p className="hidden sm:block t-eyebrow text-background/50 mb-3 lg:mb-8">
                  A private consultation
                </p>
                <h2
                  id="contact-title"
                  className="t-display-2 text-background max-w-[14ch]"
                >
                  Let&rsquo;s create something worth looking up at.
                </h2>
                <p className="hidden lg:block t-lede mt-8 text-background/60 max-w-sm">
                  Fly4MEdia partners with brands, creators, tourism campaigns,
                  and studios to craft visually immersive aerial storytelling.
                </p>
              </div>

              <div className="hidden lg:flex flex-col gap-1.5 t-meta text-background/50 border-t border-background/15 pt-6">
                <a href="mailto:tobyrennick@gmail.com" className="hover:text-background transition-colors duration-200">tobyrennick@gmail.com</a>
                <a href="tel:+14038189686" className="hover:text-background transition-colors duration-200">403&nbsp;818&nbsp;9686</a>
                <span>Alberta, Canada</span>
              </div>
            </div>
          </aside>

          {/* ── RIGHT — Form panel ───────────────────────────────── */}
          <section className="relative bg-background text-foreground flex items-start">

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 lg:top-8 lg:right-8 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>

            <div className="w-full max-w-xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-7 sm:py-10 lg:py-14 pb-32 lg:pb-14">

              <h3
                className="t-headline-2 mb-5 sm:mb-6 lg:mb-10 max-w-[20ch] animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                Tell us what deserves
                <br />a new perspective.
              </h3>

              {status === "sent" ? (
                /* ── Success ladder ──────────────────────────────── */
                <div className="space-y-8 animate-fade-up">
                  <p className="t-headline-2">In motion.</p>

                  <ol className="border-t border-border/60">
                    {[
                      { n: "01", action: "Brief received", timing: "just now" },
                      { n: "02", action: "Toby replies", timing: "within 1 business day" },
                      { n: "03", action: "20-min discovery call", timing: "booked in the reply" },
                    ].map((step) => (
                      <li
                        key={step.n}
                        className="flex items-baseline gap-5 sm:gap-8 py-4 border-b border-border/60"
                      >
                        <span className="t-eyebrow text-muted-foreground/60 shrink-0 w-6">{step.n}</span>
                        <span className="t-body flex-1">{step.action}</span>
                        <span className="t-meta text-muted-foreground shrink-0 text-right">{step.timing}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="t-meta text-muted-foreground">
                    Urgent? Call{" "}
                    <a href="tel:+14038189686" className="text-foreground underline underline-offset-4">
                      403&nbsp;818&nbsp;9686
                    </a>{" "}
                    or email{" "}
                    <a href="mailto:tobyrennick@gmail.com" className="text-foreground underline underline-offset-4">
                      tobyrennick@gmail.com
                    </a>
                    .
                  </p>

                  <button
                    onClick={onClose}
                    className="t-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Close ↗
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} className="space-y-6 sm:space-y-8">

                  <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
                    <Field
                      ref={firstFieldRef}
                      label="Name"
                      value={name}
                      onChange={setName}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
                    <Field
                      label="Email"
                      value={email}
                      onChange={setEmail}
                      required
                      type="email"
                      autoComplete="email"
                      hint="Never shared. Never spammed."
                    />
                  </div>

                  {/* Service interest — grouped, with mobile scroll-snap */}
                  <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
                    <p className="t-micro text-muted-foreground mb-3 sm:mb-4 block">
                      What are you working on?
                    </p>

                    <div className="space-y-4 sm:space-y-5">
                      {SERVICE_GROUPS.map((group) => (
                        <div key={group.label}>
                          <p className="t-eyebrow text-muted-foreground/60 mb-2">{group.label}</p>
                          {/* Mobile: horizontal scroll-snap. sm+: wrap. */}
                          <div className="sm:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-none">
                            <div className="flex gap-1.5">
                              {group.items.map((s) => renderChip(s))}
                            </div>
                          </div>
                          <div className="hidden sm:flex flex-wrap gap-2">
                            {group.items.map((s) => renderChip(s))}
                          </div>
                        </div>
                      ))}

                      {/* Not-sure escape hatch — stands alone */}
                      <div className="pt-1">
                        {renderChip(NOT_SURE)}
                      </div>
                    </div>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
                    <Field
                      label="Project"
                      placeholder="A few sentences is plenty — Toby will ask the rest on a 20-minute call."
                      value={project}
                      onChange={setProject}
                      required
                      multiline
                    />
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
                    <Field
                      label="Phone"
                      labelSuffix="optional"
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {status === "error" && (
                    <p className="t-meta text-destructive">
                      Something went wrong. Please try again, or email{" "}
                      <a
                        href="mailto:tobyrennick@gmail.com"
                        className="underline underline-offset-4"
                      >
                        tobyrennick@gmail.com
                      </a>{" "}
                      directly.
                    </p>
                  )}

                  {/* Response-time promise — sits right above the CTA */}
                  <div
                    className="pt-2 animate-fade-up"
                    style={{ animationDelay: "330ms" }}
                  >
                    <p className="t-meta text-muted-foreground mb-4">
                      Toby replies within 1 business day, every time.
                    </p>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="hover"
                      data-magnetic
                      className="btn-primary group w-full sm:w-auto disabled:opacity-60"
                    >
                      <span>
                        {status === "sending" ? "Sending" : "Begin the conversation"}
                      </span>
                      {status === "sending" ? (
                        <span className="inline-flex gap-1">
                          <Dot delay="0ms" />
                          <Dot delay="150ms" />
                          <Dot delay="300ms" />
                        </span>
                      ) : (
                        <span className="link-arrow">↗</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Mobile contact fallback */}
              <div className="lg:hidden mt-7 sm:mt-10 pt-5 sm:pt-6 border-t border-border t-meta text-muted-foreground space-y-1">
                <a href="mailto:tobyrennick@gmail.com" className="block hover:text-foreground transition-colors duration-200">tobyrennick@gmail.com</a>
                <a href="tel:+14038189686" className="block hover:text-foreground transition-colors duration-200">403&nbsp;818&nbsp;9686</a>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Sticky mobile CTA — appears once Name + Email read as real ───── */}
      {status !== "sent" && (
        <div
          aria-hidden={!readyToSend}
          className={`
            lg:hidden fixed bottom-0 inset-x-0 z-[110]
            bg-background/90 backdrop-blur-md border-t border-border
            px-6 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${readyToSend ? "translate-y-0" : "translate-y-full pointer-events-none"}
          `}
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
        >
          <p className="t-micro text-muted-foreground mb-2 text-center">
            Toby replies within 1 business day, every time.
          </p>
          <button
            type="button"
            onClick={triggerSubmit}
            disabled={status === "sending"}
            className="btn-primary group w-full disabled:opacity-60"
          >
            <span>{status === "sending" ? "Sending" : "Send brief"}</span>
            {status === "sending" ? (
              <span className="inline-flex gap-1">
                <Dot delay="0ms" />
                <Dot delay="150ms" />
                <Dot delay="300ms" />
              </span>
            ) : (
              <span className="link-arrow">↗</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="size-1 rounded-full bg-background/80 animate-pulse"
      style={{ animationDelay: delay, animationDuration: "1.2s" }}
    />
  );
}

interface FieldProps {
  label: string;
  labelSuffix?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, labelSuffix, value, onChange, type = "text", required, multiline, placeholder, autoComplete, hint },
  ref,
) {
  const id = `f-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="field group relative">
      <label
        htmlFor={id}
        className="field-label flex items-baseline gap-1.5 t-micro text-muted-foreground mb-2 lg:mb-3"
      >
        {label}
        {labelSuffix && (
          <span className="text-muted-foreground/50 normal-case">{labelSuffix}</span>
        )}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            rows={4}
            placeholder={placeholder}
            className="t-lede w-full bg-transparent outline-none pb-3 border-b border-border resize-none placeholder:text-muted-foreground/40"
          />
        ) : (
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="t-lede w-full bg-transparent outline-none pb-3 border-b border-border placeholder:text-muted-foreground/40"
          />
        )}
        <span className="field-underline" aria-hidden="true" />
      </div>
      {hint && (
        <p className="t-micro text-muted-foreground/60 mt-2">{hint}</p>
      )}
    </div>
  );
});
