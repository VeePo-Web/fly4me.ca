import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronRight, MessageSquare, Church, Heart, BookOpen, HandHeart, DollarSign } from "lucide-react";
import { useContactPanel, ContactPathway } from "@/contexts/ContactPanelContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import veepoLogo from "@/assets/veepo-logo.png";
import VolunteerForm from "@/components/VolunteerForm";
import { churchProfiles, type ChurchProfile } from "@/data/church-profiles";
import LogoMark from "@/components/LogoMark";
import { sendEmail } from "@/lib/send-email";

const EMAIL = "mitfordworship@gmail.com";

const PATHWAYS = [
  { id: "general" as const, label: "General Question", icon: MessageSquare },
  { id: "church-partner" as const, label: "Church Partnership", icon: Church },
  { id: "pastor" as const, label: "Message a Church", icon: Heart },
  { id: "donate" as const, label: "Donation & Sponsorship", icon: DollarSign },
  { id: "volunteer" as const, label: "Volunteer Sign-Up", icon: HandHeart },
  { id: "prayer" as const, label: "Prayer Request", icon: BookOpen },
] as const;

type FormPathway = "general" | "church-partner" | "donate" | "prayer";

const SUBJECTS: Record<FormPathway, string> = {
  general: "General Inquiry",
  "church-partner": "Church Partnership Inquiry",
  donate: "Donation / Sponsorship Inquiry",
  prayer: "Prayer Request",
};

const HEADINGS: Record<FormPathway, string> = {
  general: "General Question",
  "church-partner": "Church Partnership",
  donate: "Donation & Sponsorship",
  prayer: "Prayer Request",
};

const MESSAGE_PLACEHOLDERS: Record<FormPathway, string> = {
  general: "How can we help?",
  "church-partner": "Tell us about your church and how you'd like to be involved...",
  donate: "Let us know you're interested in giving or sponsorship — a team member will follow up with you directly.",
  prayer: "Share what's on your heart — even 'please pray for me' is enough.",
};

const baseSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
  phone: z.string().trim().max(20).optional(),
  churchName: z.string().trim().max(100).optional(),
});

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { x: "100%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

/* ─── Ghost Cross Watermark ─── */
const GhostCross = () => (
  <svg
    className="pointer-events-none absolute bottom-8 right-6 h-32 w-32 text-foreground/[0.015]"
    viewBox="0 0 100 100"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="42" y="10" width="16" height="80" rx="1" />
    <rect x="20" y="30" width="60" height="16" rx="1" />
  </svg>
);

/* ─── Brand Identity Stack (floating on backdrop, md+ only) ─── */
const BrandIdentityStack = () => {
  const eventDate = useMemo(() => new Date("2026-08-08T11:00:00-06:00"), []);

  const calcRemaining = useCallback(() => {
    const diff = eventDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [eventDate]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(calcRemaining()), 1000);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  const segments = [
    { value: remaining.days, label: "days", pad: false },
    { value: remaining.hours, label: "hrs", pad: true },
    { value: remaining.minutes, label: "min", pad: true },
    { value: remaining.seconds, label: "sec", pad: true },
  ];

  const dividerStyle = {
    background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex fixed inset-0 z-[100] items-center pointer-events-none"
      style={{ paddingRight: "28rem" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-[400px] mx-auto relative">
        {/* Ghost cross watermark */}
        <svg
          className="pointer-events-none absolute bottom-[-2rem] left-1/2 -translate-x-1/2 h-72 w-72 text-white/[0.02]"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="42" y="10" width="16" height="80" rx="1" />
          <rect x="20" y="30" width="60" height="16" rx="1" />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with atmospheric glow */}
          <div className="relative mb-5">
            <div
              className="absolute inset-0 -m-8 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(0 45% 45% / 0.12) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <span className="relative z-10 [&_svg]:!text-blood">
              <LogoMark size={52} variant="white" />
            </span>
          </div>

          {/* Event title */}
          <div className="flex flex-col items-center gap-1 mb-7">
            <span className="font-serif text-3xl tracking-[0.02em] text-white/90 leading-none">
              <span className="font-semibold">Worship</span>
              <span className="font-light"> in the Park</span>
            </span>
            <span
              className="text-[11px] font-sans uppercase tracking-[0.3em] text-white/60 mt-2"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              One King, Glorified
            </span>
            <span
              className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/35 mt-1"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              Cochrane, Alberta
            </span>
          </div>

          {/* Divider with diamond ornament */}
          <div className="flex items-center gap-1.5 mb-6" aria-hidden="true">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
              <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.15" />
            </svg>
            <div className="w-10 h-px" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--primary) / 0.25))" }} />
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-2.5 mb-6">
            <p
              className="text-[7px] font-sans uppercase tracking-[0.3em] text-white/30"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              every second draws us closer
            </p>
            <div className="flex items-baseline gap-2">
              {segments.map((seg, i) => {
                const display = seg.pad ? String(seg.value).padStart(2, "0") : String(seg.value);
                return (
                  <div key={seg.label} className="flex items-baseline gap-0.5">
                    <span className="font-serif text-2xl font-light text-white/80 tabular-nums select-none" style={{ minWidth: seg.pad ? "2ch" : "auto", textAlign: "center" }}>
                      {display}
                    </span>
                    <span
                      className="text-[7px] font-sans uppercase tracking-[0.15em] text-white/45"
                      style={{ fontFeatureSettings: '"cv02"' }}
                    >
                      {seg.label}
                    </span>
                    {i < segments.length - 1 && (
                      <span className="text-white/20 text-sm mx-0.5 select-none" aria-hidden="true">:</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider with diamond ornament */}
          <div className="flex items-center gap-1.5 mb-7" aria-hidden="true">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25))" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
              <rect x="2.5" y="0.2" width="3" height="3" rx="0.3" transform="rotate(45 2.5 0.2)" stroke="hsl(var(--gold-warm))" strokeWidth="0.5" fill="hsl(var(--gold-warm))" fillOpacity="0.15" />
            </svg>
            <div className="w-10 h-px" style={{ background: "linear-gradient(270deg, transparent, hsl(var(--primary) / 0.25))" }} />
          </div>

          {/* Scripture */}
          <blockquote className="flex flex-col items-center gap-2.5 max-w-[320px]">
            <p
              className="font-serif italic text-base font-normal leading-relaxed text-white/75 text-center"
              style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
            >
              "For I decided to know nothing among you except Jesus Christ and him crucified."
            </p>
            <div className="flex items-center gap-1.5">
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" aria-hidden="true">
                <rect x="2" y="0.15" width="2.4" height="2.4" rx="0.2" transform="rotate(45 2 0.15)" fill="hsl(var(--gold-warm))" fillOpacity="0.25" />
              </svg>
              <cite
                className="not-italic text-[10px] font-sans uppercase tracking-[0.15em] text-white/45"
                style={{ fontFeatureSettings: '"cv02"' }}
              >
                1 Corinthians 2:2, ESV
              </cite>
            </div>
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
};


const PathwayBadge = ({ pathwayId }: { pathwayId: string }) => {
  const config = PATHWAYS.find(p => p.id === pathwayId);
  if (!config) return null;
  const Icon = config.icon;
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-sm border border-border/40 bg-muted/30 px-2.5 py-1">
        <Icon className="h-3 w-3 text-muted-foreground" />
        <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-muted-foreground">{config.label}</span>
      </div>
    </div>
  );
};

/* ─── Inline Form (general, church-partner, donate, prayer) ─── */
const InlineForm = ({ pathway, onBack }: { pathway: FormPathway; onBack: () => void }) => {
  const { closePanel } = useContactPanel();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [churchName, setChurchName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(100);
  const [submitting, setSubmitting] = useState(false);

  const showPhone = pathway === "general";
  const heading = HEADINGS[pathway];

  const validate = useCallback(() => {
    const data: Record<string, string | undefined> = { name, email, message };
    if (pathway === "church-partner") data.churchName = churchName;
    if (showPhone && phone) data.phone = phone;

    const schema = pathway === "church-partner"
      ? baseSchema.extend({ churchName: z.string().trim().min(1, "Church name is required").max(100) })
      : baseSchema;

    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [name, email, message, churchName, phone, pathway, showPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await sendEmail({
        type: pathway,
        name,
        email,
        message,
        phone: showPhone && phone ? phone : undefined,
        churchName: pathway === "church-partner" ? churchName : undefined,
      });
      setSent(true);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sent) return;
    const duration = 4000;
    const interval = 40;
    const step = (100 / duration) * interval;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          closePanel();
          return 0;
        }
        return prev - step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [sent, closePanel]);

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1 text-[11px] font-sans tracking-wide text-destructive/80">{errors[field]}</p>
    ) : null;

  if (sent) {
    return (
      <motion.div variants={stepVariants} initial="enter" animate="center" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <p className="font-serif text-xl text-foreground">Thank you</p>
        <p className="text-sm text-muted-foreground">Your message has been sent. We'll be in touch soon.</p>
        <div className="w-32 mt-2">
          <Progress value={countdown} className="h-1" />
        </div>
        <button
          onClick={closePanel}
          className="mt-2 text-[11px] font-sans uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors" aria-label="Back">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <PathwayBadge pathwayId={pathway} />
      <h3 className="font-serif text-2xl font-light text-foreground mb-6">{heading}</h3>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4" noValidate>
        {pathway === "church-partner" && (
          <div className="space-y-1.5">
            <Label variant="editorial">Church Name</Label>
            <Input value={churchName} onChange={e => setChurchName(e.target.value)} placeholder="e.g. KingsGate Church" className={errors.churchName ? "border-destructive/50" : ""} />
            <FieldError field="churchName" />
          </div>
        )}
        <div className="space-y-1.5">
          <Label variant="editorial">Your Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className={errors.name ? "border-destructive/50" : ""} />
          <FieldError field="name" />
        </div>
        <div className="space-y-1.5">
          <Label variant="editorial">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={errors.email ? "border-destructive/50" : ""} />
          <FieldError field="email" />
        </div>
        {showPhone && (
          <div className="space-y-1.5">
            <Label variant="editorial">Phone <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span></Label>
            <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="403-555-0123" />
          </div>
        )}
        <div className="space-y-1.5">
          <Label variant="editorial">{pathway === "prayer" ? "Your Prayer Request" : "Message"}</Label>
          <Textarea value={message} onChange={e => setMessage(e.target.value)} rows={pathway === "prayer" ? 5 : 3} placeholder={MESSAGE_PLACEHOLDERS[pathway]} className={errors.message ? "border-destructive/50" : ""} />
          <FieldError field="message" />
        </div>
        <div className="mt-auto pt-4">
          <Button
            type="submit"
            variant="editorial"
            size="lg"
            className={`w-full transition-transform duration-200 ${submitting ? "scale-[0.97]" : ""}`}
            disabled={submitting}
          >
            {pathway === "prayer" ? "Submit Prayer Request" : "Send Message"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

/* ─── Church Selector (bento cards for each church) ─── */
const ChurchSelector = ({ onBack, onSelect }: { onBack: () => void; onSelect: (p: ChurchProfile) => void }) => {
  return (
    <motion.div variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors" aria-label="Back">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <PathwayBadge pathwayId="pastor" />
      <h3 className="font-serif text-2xl font-light text-foreground mb-1">Which church would you like to reach?</h3>
      <p className="text-sm text-muted-foreground mb-6">Select a church below to send them a message.</p>

      <div className="flex flex-col gap-2.5">
        {churchProfiles.map(profile => (
          <button
            key={profile.id}
            onClick={() => onSelect(profile)}
            className="group flex items-center gap-3.5 rounded-sm border border-border/50 px-4 py-3 text-left transition-all duration-200 hover:border-border hover:bg-accent/50"
          >
            <img
              src={profile.churchContactImage}
              alt={profile.name}
              className="h-10 w-10 flex-shrink-0 rounded-full border border-border/30 bg-muted object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-medium text-foreground/90 truncate">{profile.name}</p>
              <span className="mt-0.5 inline-block text-[10px] font-sans uppercase tracking-[0.1em] text-muted-foreground/60">{profile.denomination}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Church Message Form (with selected church context) ─── */
const ChurchForm = ({ church, onBack }: { church: ChurchProfile; onBack: () => void }) => {
  const { closePanel } = useContactPanel();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(100);
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback(() => {
    const data: Record<string, string | undefined> = { name, email, message };
    if (phone) data.phone = phone;

    const result = baseSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [name, email, message, phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await sendEmail({
        type: "pastor",
        name,
        email,
        message,
        phone: phone || undefined,
        pastorName: church.name,
        churchName: church.name,
      });
      setSent(true);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sent) return;
    const duration = 4000;
    const interval = 40;
    const step = (100 / duration) * interval;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          closePanel();
          return 0;
        }
        return prev - step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [sent, closePanel]);

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1 text-[11px] font-sans tracking-wide text-destructive/80">{errors[field]}</p>
    ) : null;

  if (sent) {
    return (
      <motion.div variants={stepVariants} initial="enter" animate="center" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <p className="font-serif text-xl text-foreground">Thank you</p>
        <p className="text-sm text-muted-foreground">Your message to {church.name} has been sent.</p>
        <div className="w-32 mt-2">
          <Progress value={countdown} className="h-1" />
        </div>
        <button
          onClick={closePanel}
          className="mt-2 text-[11px] font-sans uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors" aria-label="Back to church list">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <PathwayBadge pathwayId="pastor" />

      {/* Church context header */}
      <div className="mb-6 flex items-center gap-3">
        <img
          src={church.churchContactImage}
          alt={church.name}
          className="h-8 w-8 rounded-full border border-border/30 bg-muted object-cover"
        />
        <div>
          <h3 className="font-serif text-xl font-light text-foreground leading-tight">Message {church.name}</h3>
          <p className="text-xs text-muted-foreground">{church.denomination}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4" noValidate>
        <div className="space-y-1.5">
          <Label variant="editorial">Your Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className={errors.name ? "border-destructive/50" : ""} />
          <FieldError field="name" />
        </div>
        <div className="space-y-1.5">
          <Label variant="editorial">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={errors.email ? "border-destructive/50" : ""} />
          <FieldError field="email" />
        </div>
        <div className="space-y-1.5">
          <Label variant="editorial">Phone <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span></Label>
          <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="403-555-0123" />
        </div>
        <div className="space-y-1.5">
          <Label variant="editorial">Message</Label>
          <Textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="What's on your heart?" className={errors.message ? "border-destructive/50" : ""} />
          <FieldError field="message" />
        </div>
        <div className="mt-auto pt-4">
          <Button
            type="submit"
            variant="editorial"
            size="lg"
            className={`w-full transition-transform duration-200 ${submitting ? "scale-[0.97]" : ""}`}
            disabled={submitting}
          >
            Send Message
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

/* ─── Volunteer Wrapper (renders VolunteerForm inside panel) ─── */
const InlineVolunteerForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-1 flex-col">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors" aria-label="Back">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <PathwayBadge pathwayId="volunteer" />
      <h3 className="font-serif text-2xl font-light text-foreground mb-6">Volunteer Sign-Up</h3>
      <VolunteerForm compact />
    </motion.div>
  );
};

/* ─── Main Panel ─── */
const ContactPanel = () => {
  const { isOpen, activePathway, closePanel, setPathway } = useContactPanel();
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedChurch, setSelectedChurch] = useState<ChurchProfile | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedChurch(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activePathway !== "pastor") {
      setSelectedChurch(null);
    }
  }, [activePathway]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closePanel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen, activePathway]);

  const handlePathwayClick = useCallback((p: typeof PATHWAYS[number]) => {
    setPathway(p.id);
  }, [setPathway]);

  const isInlineForm = activePathway === "general" || activePathway === "church-partner" || activePathway === "donate" || activePathway === "prayer";
  const isPastor = activePathway === "pastor";
  const isVolunteer = activePathway === "volunteer";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closePanel}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Brand identity stack — floats on backdrop, md+ only */}
          <BrandIdentityStack />

          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Contact panel"
            tabIndex={-1}
            className="fixed right-0 top-0 z-[101] flex h-full w-full sm:max-w-md bg-card shadow-2xl outline-none will-change-transform"
          >

            {/* Right column — form content */}
            <div className="relative flex flex-1 flex-col h-full min-w-0">
              <div
                className="absolute left-0 top-0 h-full w-[3px] md:hidden"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))" }}
                aria-hidden="true"
              />
              <GhostCross />

              {/* Powered by Veepo badge */}
              <a
                href="https://veepo.ca/services/web-development"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit VeePo.ca - website developer"
                className="group absolute top-3 left-4 sm:top-4 sm:left-5 z-10 inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap max-w-[calc(100%-3rem)] overflow-hidden"
              >
                <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors duration-300">
                  This website is
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.12em] text-muted-foreground/50 group-hover:text-[hsl(28_87%_58%)] transition-colors duration-300">
                  powered
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors duration-300">
                  by
                </span>
                <img
                  src={veepoLogo}
                  alt="VeePo"
                  className="h-[36px] w-auto opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                />
              </a>

              <div className="flex items-center justify-end px-6 pt-6">
                <button
                  onClick={closePanel}
                  className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 min-h-0">
                <AnimatePresence mode="wait">
                  {isVolunteer ? (
                    <InlineVolunteerForm key="volunteer" onBack={() => setPathway(null)} />
                  ) : isPastor && selectedChurch ? (
                    <ChurchForm key={`church-form-${selectedChurch.id}`} church={selectedChurch} onBack={() => setSelectedChurch(null)} />
                  ) : isPastor ? (
                    <ChurchSelector key="church-selector" onBack={() => setPathway(null)} onSelect={setSelectedChurch} />
                  ) : isInlineForm ? (
                    <InlineForm key={activePathway} pathway={activePathway!} onBack={() => setPathway(null)} />
                  ) : (
                    <motion.div key="selector" variants={stepVariants} initial="enter" animate="center" exit="exit" className="flex flex-1 flex-col">
                      <h2 className="font-serif text-3xl font-light text-foreground mb-2">How can we help?</h2>
                      <p className="text-sm text-muted-foreground mb-8">Choose what you're looking for.</p>

                      <div className="flex flex-col gap-2">
                        {PATHWAYS.map(p => {
                          const Icon = p.icon;
                          return (
                            <button
                              key={p.id}
                              onClick={() => handlePathwayClick(p)}
                              className="group flex items-center gap-4 rounded-sm border border-border/50 px-4 py-3.5 text-left transition-all duration-200 hover:border-border hover:bg-accent/50"
                            >
                              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                              <span className="flex-1 text-sm font-medium text-foreground/90">{p.label}</span>
                              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-auto pt-8 text-center text-xs text-muted-foreground">
                        Or email us directly at{" "}
                        <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-foreground transition-colors">{EMAIL}</a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactPanel;
