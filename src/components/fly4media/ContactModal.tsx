import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simple mailto fallback — keeps the experience contact-first, no backend dependency.
    try {
      const subject = encodeURIComponent(`New project enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${project}`);
      window.location.href = `mailto:hello@fly4media.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/95 backdrop-blur-sm"
      />
      <div className="relative h-full w-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-6 md:p-12">
          <div className="relative w-full max-w-2xl bg-background text-foreground p-8 md:p-14 animate-fade-up">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-5" strokeWidth={1.25} />
            </button>

            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Start a project
            </p>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.05] tracking-tight mb-10 text-balance">
              Tell us what you want to capture.
            </h2>

            {status === "sent" ? (
              <p className="text-base text-muted-foreground">
                Your email client is opening. We’ll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <Field label="Name" value={name} onChange={setName} required />
                <Field label="Email" value={email} onChange={setEmail} required type="email" />
                <Field
                  label="Project"
                  value={project}
                  onChange={setProject}
                  required
                  multiline
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                  <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const id = `f-${label.toLowerCase()}`;
  return (
    <div className="border-b border-border pb-3 focus-within:border-foreground transition-colors">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={3}
          className="w-full bg-transparent outline-none text-base resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full bg-transparent outline-none text-base"
        />
      )}
    </div>
  );
}
