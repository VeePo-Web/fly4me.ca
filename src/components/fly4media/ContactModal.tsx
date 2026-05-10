import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import heroImage from "@/assets/cs-canmore-hero.jpg";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 320);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: { name, email, phone, project },
      });
      if (error || (data && (data as { error?: string }).error)) {
        throw error ?? new Error("Submission failed");
      }
      setStatus("sent");
    } catch (err) {
      console.error("[contact] submit failed", err);
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      {/* Overlay */}
      <button
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-md animate-modal-overlay-in cursor-default"
      />

      {/* Modal — fullscreen split */}
      <div className="relative h-full w-full overflow-y-auto animate-modal-panel-in">
        <div className="min-h-full grid grid-cols-1 md:grid-cols-2">
          {/* LEFT — Brand panel */}
          <aside className="relative isolate overflow-hidden bg-foreground text-background h-[34vh] min-h-[220px] max-h-[280px] md:h-auto md:min-h-screen md:max-h-none">
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-50 motion-safe:animate-kenburns"
            />
            {/* tonal wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/40 to-foreground/80" />
            {/* grain */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Mobile-only close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="md:hidden absolute top-4 right-4 z-10 p-2 text-background/80 hover:text-background transition-colors"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>

            <div className="relative h-full flex flex-col justify-between p-6 md:p-14 lg:p-20 md:min-h-screen">
              <div className="hidden md:flex items-center gap-3">
                <span className="t-eyebrow text-background/70">
                  Fly4MEdia
                </span>
              </div>

              <div className="max-w-md mt-auto">
                <p className="t-eyebrow text-background/70 md:text-background/60 mb-3 md:mb-8">
                  Fly4MEdia · A private consultation
                </p>
                <h2
                  id="contact-title"
                  className="t-headline-1"
                >
                  Let's create something worth looking up at.
                </h2>
                <p className="hidden md:block t-lede mt-8 text-background/70 max-w-sm">
                  Fly4MEdia partners with brands, creators, tourism campaigns, and
                  studios to craft visually immersive aerial storytelling.
                </p>
              </div>

              <div className="hidden md:flex flex-col gap-1 t-meta text-background/60">
                <span>hello@fly4media.com</span>
                <span>Alberta, Canada</span>
              </div>
            </div>
          </aside>

          {/* RIGHT — Form panel */}
          <section className="relative bg-background text-foreground flex items-center md:min-h-screen">
            <button
              onClick={onClose}
              aria-label="Close"
              className="hidden md:block absolute top-5 right-5 md:top-8 md:right-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>

            <div className="w-full max-w-xl mx-auto px-6 md:px-14 lg:px-20 py-10 md:py-20">
              <p className="t-eyebrow text-muted-foreground mb-4 md:mb-5">
                Begin a collaboration
              </p>
              <h3 className="t-headline-2 mb-8 md:mb-14">
                Tell us what deserves a new perspective.
              </h3>

              {status === "sent" ? (
                <div className="space-y-6 animate-fade-in">
                  <p className="t-lede">
                    In motion.
                  </p>
                  <p className="t-meta text-muted-foreground">
                    We'll respond within one business day. Your email client should
                    have opened — if not, write to{" "}
                    <a
                      href="mailto:hello@fly4media.com"
                      className="text-foreground underline underline-offset-4"
                    >
                      hello@fly4media.com
                    </a>
                    .
                  </p>
                  <button
                    onClick={onClose}
                    className="t-eyebrow text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Close ↗
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-9">
                  <Field
                    ref={firstFieldRef}
                    label="Name"
                    value={name}
                    onChange={setName}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    required
                    type="email"
                    autoComplete="email"
                  />
                  <Field
                    label="Project"
                    placeholder="Tell us about your project, vision, or campaign."
                    value={project}
                    onChange={setProject}
                    required
                    multiline
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="hover"
                      data-magnetic
                      className="btn-primary group w-full sm:w-auto disabled:opacity-60"
                    >
                      <span>
                        {status === "sending"
                          ? "Sending"
                          : "Begin the conversation"}
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

              {/* Mobile-only footer info */}
              <div className="md:hidden mt-10 pt-6 border-t border-border t-meta text-muted-foreground">
                hello@fly4media.com · Alberta, Canada
              </div>
            </div>
          </section>
        </div>
      </div>
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

import { forwardRef } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, value, onChange, type = "text", required, multiline, placeholder, autoComplete },
  ref,
) {
  const id = `f-${label.toLowerCase()}`;
  return (
    <div className="field group relative">
      <label
        htmlFor={id}
        className="field-label block t-micro text-muted-foreground mb-2 md:mb-3"
      >
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            rows={3}
            placeholder={placeholder}
            className="t-lede w-full bg-transparent outline-none pb-3 border-b border-border resize-none placeholder:text-muted-foreground/50"
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
            className="t-lede w-full bg-transparent outline-none pb-3 border-b border-border placeholder:text-muted-foreground/50"
          />
        )}
        <span className="field-underline" aria-hidden="true" />
      </div>
    </div>
  );
});
