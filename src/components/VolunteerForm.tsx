import { useEffect, useRef, useState } from "react";
import { sendEmail } from "@/lib/send-email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronDown, ArrowRight, CalendarPlus, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Helpers ─── */
const DRAFT_KEY = "volunteer-draft-v1";

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const downloadIcs = () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mitford Worship//Volunteer//EN",
    "BEGIN:VEVENT",
    "UID:volunteer-2026@mitfordworship.com",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260808T150000Z",
    "DTEND:20260809T030000Z",
    "SUMMARY:Worship in the Park — Volunteer",
    "LOCATION:Mitford Park, Cochrane, AB",
    "DESCRIPTION:Thanks for volunteering. We'll be in touch with shift details.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "worship-in-the-park.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import ChurchPartnerInline from "@/components/ChurchPartnerInline";

const ROLES = [
  "Setup",
  "Takedown",
  "Parking",
  "Prayer Team Support",
  "Get Connected Tent",
  "Free Bible Table",
  "Security",
  "Greeting",
  "Stage Hand (Tech / Worship)",
  "Floater",
  "Other",
] as const;

const SHIFTS = [
  { id: "setup", label: "Morning Setup — 9:00–11:00 AM", short: "Setup 9–11 AM" },
  { id: "morning", label: "Morning — 11:00 AM–1:00 PM", short: "Morning 11–1 PM" },
  { id: "afternoon", label: "Afternoon — 1:00–3:00 PM", short: "Afternoon 1–3 PM" },
  { id: "mid-afternoon", label: "Mid-Afternoon — 3:00–5:00 PM", short: "Mid-Aft 3–5 PM" },
  { id: "evening", label: "Evening — 5:00–7:00 PM", short: "Evening 5–7 PM" },
  { id: "takedown", label: "Takedown — 7:00–8:30 PM", short: "Takedown 7–8:30 PM" },
] as const;

const volunteerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  ageConfirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm you are 18 or older" }),
  }),
  church: z.string().trim().min(2, "Please enter your church name").max(150),
  experience: z.string().max(500).optional(),
  prayerExperience: z.string().max(500).optional(),
  preferredRole: z.string().min(1, "Please select a preferred role"),
  secondRole: z.string().optional(),
  shifts: z.array(z.string()).min(1, "Please select at least one shift"),
  whyVolunteer: z
    .string()
    .trim()
    .min(10, "Please share a brief sentence")
    .max(1000),
  concerns: z.string().max(1000).optional(),
  emergencyName: z
    .string()
    .trim()
    .min(2, "Please enter an emergency contact name")
    .max(100),
  emergencyPhone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "You must agree to serve with this spirit" }),
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

const STEP_TITLES = [
  "About You",
  "Your Church & Experience",
  "Role & Availability",
  "Heart & Safety",
];

const STEP_FIELDS: (keyof VolunteerFormValues)[][] = [
  ["fullName", "email", "phone", "ageConfirmed"],
  ["church", "experience", "prayerExperience"],
  ["preferredRole", "secondRole", "shifts"],
  ["whyVolunteer", "concerns", "emergencyName", "emergencyPhone", "agreement"],
];

/* Compact wizard uses 5 steps to fit each within a single viewport */
const COMPACT_STEP_TITLES = [
  "About You",
  "Church & Experience",
  "Role & Availability",
  "Heart",
  "Safety & Agreement",
];

const COMPACT_STEP_FIELDS: (keyof VolunteerFormValues)[][] = [
  ["fullName", "email", "phone", "ageConfirmed"],
  ["church", "experience", "prayerExperience"],
  ["preferredRole", "secondRole", "shifts"],
  ["whyVolunteer", "concerns"],
  ["emergencyName", "emergencyPhone", "agreement"],
];



const VolunteerForm = ({ compact = false, inlinePartner = false }: { compact?: boolean; inlinePartner?: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [shareSupported, setShareSupported] = useState(false);
  const hasSubmittedRef = useRef(false);
  const formTopRef = useRef<HTMLDivElement | null>(null);

  // Restore draft from sessionStorage
  const draftDefaults = (() => {
    const empty = {
      fullName: "",
      email: "",
      phone: "",
      ageConfirmed: undefined as unknown as true,
      church: "",
      experience: "",
      prayerExperience: "",
      preferredRole: "",
      secondRole: "",
      shifts: [] as string[],
      whyVolunteer: "",
      concerns: "",
      emergencyName: "",
      emergencyPhone: "",
      agreement: undefined as unknown as true,
    };
    if (typeof window === "undefined") return empty;
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return empty;
      const parsed = JSON.parse(raw);
      return { ...empty, ...parsed };
    } catch {
      return empty;
    }
  })();

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: draftDefaults,
    mode: "onTouched",
  });

  // Persist draft (debounced via rAF)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let frame = 0;
    const sub = form.watch((values) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        try {
          const { agreement, ageConfirmed, ...safe } = values;
          sessionStorage.setItem(DRAFT_KEY, JSON.stringify(safe));
        } catch { /* quota */ }
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      sub.unsubscribe();
    };
  }, [form]);

  // Detect share support once
  useEffect(() => {
    setShareSupported(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const stepFields = compact ? COMPACT_STEP_FIELDS : STEP_FIELDS;
  const stepTitles = compact ? COMPACT_STEP_TITLES : STEP_TITLES;
  const totalSteps = stepTitles.length;

  const scrollToFormTop = () => {
    if (typeof window === "undefined") return;
    const el = formTopRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const fields = stepFields[stepIndex];
    const result = await form.trigger(fields);
    return result;
  };

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex === activeStep) return;
    if (stepIndex > activeStep) {
      setIsValidating(true);
      const valid = await validateStep(activeStep);
      setIsValidating(false);
      if (valid) {
        setCompletedSteps((prev) => new Set([...prev, activeStep]));
      } else {
        return;
      }
    }
    setActiveStep(stepIndex);
    if (compact) scrollToFormTop();
  };

  const handleContinue = async () => {
    if (isValidating) return;
    setIsValidating(true);
    const valid = await validateStep(activeStep);
    setIsValidating(false);
    if (valid) {
      setCompletedSteps((prev) => new Set([...prev, activeStep]));
      if (activeStep < totalSteps - 1) {
        setActiveStep(activeStep + 1);
        if (compact) scrollToFormTop();
      }
    }
  };

  const onSubmit = async (data: VolunteerFormValues) => {
    // Double-submit guard: in-flight or already submitted
    if (isSubmitting || hasSubmittedRef.current) return;

    setIsSubmitting(true);

    const shiftLabels = data.shifts
      .map((id) => SHIFTS.find((s) => s.id === id)?.label ?? id)
      .join(", ");

    try {
      await sendEmail({
        type: "volunteer",
        fullName: data.fullName,
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        church: data.church,
        experience: data.experience || "",
        prayerExperience: data.prayerExperience || "",
        preferredRole: data.preferredRole,
        secondRole: data.secondRole || "",
        shifts: shiftLabels,
        whyVolunteer: data.whyVolunteer,
        concerns: data.concerns || "",
        emergencyName: data.emergencyName,
        emergencyPhone: data.emergencyPhone,
      });

      hasSubmittedRef.current = true;
      setSubmittedEmail(data.email);
      setSubmitted(true);
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* noop */ }
      toast({
        title: "Application submitted",
        description: "We've received your volunteer application and will be in touch soon.",
      });
    } catch (err) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnother = () => {
    hasSubmittedRef.current = false;
    setIsSubmitting(false);
    setSubmitted(false);
    setSubmittedEmail("");
    setActiveStep(0);
    setCompletedSteps(new Set());
    try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* noop */ }
    form.reset();
  };

  const handleShare = async () => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") return;
    try {
      await navigator.share({
        title: "Worship in the Park",
        text: "Join us — Aug 8, 2026 at Mitford Park, Cochrane.",
        url: typeof window !== "undefined" ? window.location.origin : "",
      });
    } catch { /* user cancelled */ }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-5 animate-[fade-in_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
        <svg width="24" height="34" viewBox="0 0 24 34" fill="none" className="mx-auto opacity-20" aria-hidden="true">
          <line x1="12" y1="0" x2="12" y2="34" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="2" y1="10" x2="22" y2="10" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <circle cx="12" cy="10" r="1.2" fill="hsl(var(--gold-warm))" fillOpacity="0.2" />
        </svg>
        <h3 className="font-serif text-xl font-light" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
          Thanks — check your inbox
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We've received your application and sent a confirmation to{" "}
          <span className="text-foreground font-medium break-all">{submittedEmail}</span>. If you don't see it within a few minutes, please check your spam folder. We'll be in touch within a week.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={downloadIcs}
            className="min-h-[40px]"
          >
            <CalendarPlus size={14} strokeWidth={1.5} className="mr-1.5" />
            Add to calendar
          </Button>
          {shareSupported && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="min-h-[40px]"
            >
              <Share2 size={14} strokeWidth={1.5} className="mr-1.5" />
              Share with a friend
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground/80 max-w-sm mx-auto pt-2">
          Questions? Email{" "}
          <a
            href="mailto:mitfordworship@gmail.com"
            className="text-foreground underline-offset-4 hover:underline"
          >
            mitfordworship@gmail.com
          </a>
        </p>
        <button
          type="button"
          onClick={handleSubmitAnother}
          className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.12em] text-primary/70 hover:text-primary transition-colors duration-300 mt-2"
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          Submit another application
          <ArrowRight size={12} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div ref={formTopRef} className={cn(
      "relative overflow-hidden",
      compact ? "h-full flex flex-col scroll-mt-20" : "border border-border/40 bg-card/50 p-6 md:p-8"
    )}>
      {/* Gold left accent bar */}
      {!compact && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
          aria-hidden="true"
        />
      )}
      {/* Ghost cross watermark */}
      {!compact && (
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-[0.02]" aria-hidden="true">
          <div className="relative w-[20px] h-[30px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-foreground rounded-full" />
            <div className="absolute top-[8px] left-0 w-full h-[2px] bg-foreground rounded-full" />
          </div>
        </div>
      )}
      {/* Warm radial glow */}
      {!compact && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--primary) / 0.02), transparent 70%)" }}
          aria-hidden="true"
        />
      )}

      {!compact && (
        <p className="text-sm text-muted-foreground max-w-none leading-relaxed relative z-10 mb-8">
          Take your time with this. We ask these questions not as gatekeeping but
          as stewardship — to place you well, to care for you, and to ensure that
          everyone serving shares the heart behind this day.
        </p>
      )}

      {/* Progress indicator */}
      <div className={cn("flex items-center gap-1.5 relative z-10", compact ? "mb-4" : "mb-8")} aria-hidden="true">
        {stepTitles.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] flex-1 rounded-full transition-all duration-500",
              completedSteps.has(i)
                ? ""
                : i === activeStep
                ? "bg-primary/30"
                : "bg-border/60"
            )}
            style={
              completedSteps.has(i)
                ? { background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold-warm)))" }
                : undefined
            }
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("relative z-10", compact ? "flex flex-col h-full" : "space-y-0")}>
          {compact ? (
            /* ─── Compact Wizard: single-viewport, 5 steps ─── */
            <>
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-xs text-muted-foreground tabular-nums">
                  Step {activeStep + 1} of {totalSteps}
                </p>
                {activeStep === 0 && (
                  <p className="text-[10px] font-sans uppercase tracking-[0.18em] text-muted-foreground/70">
                    ~3 min
                  </p>
                )}
              </div>
              <h4
                className="font-serif text-lg font-light mb-4"
                style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
              >
                {stepTitles[activeStep]}
              </h4>

              <div className="space-y-3 flex-1">
                {activeStep === 0 && <StepAboutYou form={form} compact />}
                {activeStep === 0 && inlinePartner && <ChurchPartnerInline />}
                {activeStep === 1 && <StepChurchExperience form={form} compact />}
                {activeStep === 2 && <StepRoleAvailability form={form} compact />}
                {activeStep === 3 && <StepHeart form={form} compact />}
                {activeStep === 4 && <StepSafety form={form} compact />}
              </div>

              {activeStep === totalSteps - 1 && (
                <p className="text-xs text-muted-foreground leading-relaxed pt-3">
                  Your information will only be used to coordinate volunteering for Worship in the Park and will not be shared. You'll receive an email confirmation once you submit.
                </p>
              )}

              <div className="flex gap-3 pt-4 mt-auto border-t border-border/30">
                {activeStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveStep(activeStep - 1);
                      if (compact) scrollToFormTop();
                    }}
                    className="flex-1 min-h-[44px]"
                  >
                    Back
                  </Button>
                )}
                {activeStep < totalSteps - 1 ? (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={isValidating}
                    variant="editorial"
                    className="flex-1 group min-h-[44px]"
                  >
                    {isValidating ? (
                      <span className="animate-pulse">Checking…</span>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={14} strokeWidth={1.5} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 min-h-[44px] group"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending…</span>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={14} strokeWidth={1.5} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* ─── Full-page Accordion (unchanged) ─── */
            STEP_TITLES.map((title, index) => {
              const isActive = activeStep === index;
              const isComplete = completedSteps.has(index);

              return (
                <div
                  key={index}
                  className={cn(
                    "border-l-2 transition-colors duration-300",
                    isActive
                      ? "border-primary"
                      : isComplete
                      ? "border-primary/40"
                      : "border-border"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className="w-full flex items-center gap-3 text-left transition-colors min-h-[48px] px-5 py-4 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center w-7 h-7 rounded-full text-xs font-sans shrink-0 transition-all duration-300",
                        isComplete
                          ? "bg-primary text-primary-foreground"
                          : isActive
                          ? "border-2 border-primary text-primary"
                          : "border border-border text-muted-foreground"
                      )}
                    >
                      {isComplete ? <Check size={14} strokeWidth={2} /> : index + 1}
                    </span>
                    <span
                      id={`step-title-${index}`}
                      className={cn(
                        "font-serif text-lg font-light transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                      style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
                    >
                      {title}
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={cn(
                        "ml-auto text-muted-foreground/60 transition-transform duration-300",
                        isActive && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    role="region"
                    aria-labelledby={`step-title-${index}`}
                    className={cn(
                      "overflow-hidden transition-all duration-500 ease-[var(--ease-heavy)]",
                      isActive
                        ? "max-h-[1200px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pt-2 space-y-5 px-5 pb-6">
                      {index === 0 && <StepAboutYou form={form} />}
                      {index === 1 && <StepChurchExperience form={form} />}
                      {index === 2 && <StepRoleAvailability form={form} />}
                      {index === 3 && <StepHeartSafety form={form} />}

                      {index < 3 ? (
                        <Button
                          type="button"
                          onClick={handleContinue}
                          variant="editorial"
                          className="mt-4 group"
                        >
                          Continue
                          <ArrowRight size={14} strokeWidth={1.5} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Button>
                      ) : (
                        <div className="pt-6 mt-2 border-t border-border/30 space-y-4">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Your information will only be used to coordinate volunteering for Worship in the Park and will not be shared. You'll receive an email confirmation once you submit.
                          </p>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto min-h-[48px] px-8 group"
                          >
                            {isSubmitting ? (
                              <span className="animate-pulse">Sending…</span>
                            ) : (
                              <>
                                Submit Application
                                <ArrowRight size={14} strokeWidth={1.5} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </form>
      </Form>
    </div>
  );
};

/* ─── Step Components ─── */

function StepAboutYou({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your full name"
                autoComplete="name"
                autoCapitalize="words"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="next"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className={cn("grid gap-5", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  placeholder="(403) 555-0123"
                  autoComplete="tel"
                  enterKeyHint="next"
                  {...field}
                  onBlur={(e) => {
                    const formatted = formatPhone(e.target.value);
                    if (formatted !== field.value) field.onChange(formatted);
                    field.onBlur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="ageConfirmed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-2 min-h-[44px]">
            <FormControl>
              <Checkbox
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal">
                I confirm I am 18 years of age or older
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}

function StepChurchExperience({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <FormField
        control={form.control}
        name="church"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Church you are connected to</FormLabel>
            {!compact && (
              <FormDescription>
                Volunteers serve under the pastoral covering of their local
                church. This helps us ensure accountability and alignment.
              </FormDescription>
            )}
            <FormControl>
              <Input
                placeholder="Church name and city"
                autoComplete="organization"
                autoCapitalize="words"
                enterKeyHint="next"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relevant experience or skills</FormLabel>
            {!compact && (
              <FormDescription>
                Any experience that might help us place you — event coordination,
                first aid, hospitality, technical skills, etc. Optional.
              </FormDescription>
            )}
            <FormControl>
              <Textarea
                placeholder="Share anything relevant…"
                className={cn(compact ? "min-h-[48px] resize-none" : "min-h-[80px] resize-y")}
                rows={compact ? 2 : undefined}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="prayerExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prayer ministry experience</FormLabel>
            {!compact && (
              <FormDescription>
                Do you have any experience in prayer ministry? If so, describe
                briefly. This helps us staff the Prayer Tent with care. Optional.
              </FormDescription>
            )}
            <FormControl>
              <Textarea
                placeholder="Describe your experience…"
                className={cn(compact ? "min-h-[48px] resize-none" : "min-h-[80px] resize-y")}
                rows={compact ? 2 : undefined}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function StepRoleAvailability({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <div className={cn("grid gap-5", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        <FormField
          control={form.control}
          name="preferredRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second choice (optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a backup role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="shifts"
        render={() => (
          <FormItem>
            <FormLabel>Shift availability</FormLabel>
            {!compact && (
              <FormDescription>
                Select all shifts you're available for. We'll do our best to
                honour your preferences so you can serve and still enjoy parts of
                the day.
              </FormDescription>
            )}
            <div className={cn("grid pt-1 gap-2", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
              {SHIFTS.map((shift) => (
                <FormField
                  key={shift.id}
                  control={form.control}
                  name="shifts"
                  render={({ field }) => {
                    const isChecked = field.value?.includes(shift.id) ?? false;
                    return (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <label
                            className={cn(
                              "flex flex-row items-center gap-3 min-h-[48px] px-3 rounded-sm border cursor-pointer transition-all duration-200 select-none",
                              isChecked
                                ? "border-primary/40 bg-primary/[0.04]"
                                : "border-border/50 hover:border-border hover:bg-accent/30",
                            )}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                field.onChange(
                                  checked
                                    ? [...current, shift.id]
                                    : current.filter((v: string) => v !== shift.id),
                                );
                              }}
                            />
                            <span className="font-sans text-sm leading-tight text-foreground/90 tabular-nums">
                              {compact ? shift.label : shift.label}
                            </span>
                          </label>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function StepHeartSafety({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <FormField
        control={form.control}
        name="whyVolunteer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Why do you want to volunteer?</FormLabel>
            {!compact && (
              <FormDescription>
                A sentence or two is enough. We simply want to know what draws you
                to serve.
              </FormDescription>
            )}
            <FormControl>
              <Textarea
                placeholder="Share what's on your heart…"
                className={cn(compact ? "min-h-[48px] resize-none" : "min-h-[100px] resize-y")}
                rows={compact ? 2 : undefined}
                autoCapitalize="sentences"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="concerns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Is there anything the coordination team should be aware of?
            </FormLabel>
            {!compact && (
              <FormDescription>
                Allergies, physical limitations, scheduling conflicts, or anything
                else we should know. Optional — but helpful.
              </FormDescription>
            )}
            <FormControl>
              <Textarea
                placeholder="Anything we should know…"
                className={cn(compact ? "min-h-[48px] resize-none" : "min-h-[80px] resize-y")}
                rows={compact ? 2 : undefined}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="border-t border-border/50 pt-5 space-y-5">
        <p
          className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground"
          style={{ fontFeatureSettings: '"cv02"' }}
        >
          Emergency Contact
        </p>
        <div className={cn("grid gap-5", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
          <FormField
            control={form.control}
            name="emergencyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full name"
                    autoComplete="name"
                    autoCapitalize="words"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="(403) 555-0123"
                    autoComplete="tel"
                    {...field}
                    onBlur={(e) => {
                      const formatted = formatPhone(e.target.value);
                      if (formatted !== field.value) field.onChange(formatted);
                      field.onBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="agreement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-4 min-h-[44px] border-t border-border/50">
            <FormControl>
              <Checkbox
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal leading-snug">
                I agree to serve with a spirit of unity, humility, and care —
                understanding that this day is set apart for worship and that my
                role is to serve, not to promote any single church or agenda.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}

/* ─── Compact-only split steps ─── */

function StepHeart({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <FormField
        control={form.control}
        name="whyVolunteer"
        render={({ field }) => {
          const len = (field.value ?? "").trim().length;
          const min = 10;
          return (
            <FormItem>
              <div className="flex items-baseline justify-between">
                <FormLabel>Why do you want to volunteer?</FormLabel>
                <span
                  className={cn(
                    "text-[10px] font-sans tabular-nums transition-colors",
                    len === 0
                      ? "text-muted-foreground/50"
                      : len < min
                      ? "text-muted-foreground/70"
                      : "text-primary/70",
                  )}
                  aria-live="polite"
                >
                  {len < min ? `${len}/${min}` : "✓"}
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="A brief sentence is enough…"
                  className="min-h-[72px] resize-none"
                  rows={3}
                  autoCapitalize="sentences"
                  enterKeyHint="enter"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="concerns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Anything we should know?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Allergies, limitations, conflicts…"
                className="min-h-[56px] resize-none"
                rows={2}
                autoCapitalize="sentences"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function StepSafety({ form, compact = false }: { form: ReturnType<typeof useForm<VolunteerFormValues>>; compact?: boolean }) {
  return (
    <>
      <p
        className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground"
        style={{ fontFeatureSettings: '"cv02"' }}
      >
        Emergency Contact
      </p>
      <div className="grid grid-cols-1 gap-3">
        <FormField
          control={form.control}
          name="emergencyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full name"
                  autoComplete="name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergencyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  placeholder="(403) 555-0123"
                  autoComplete="tel"
                  enterKeyHint="done"
                  {...field}
                  onBlur={(e) => {
                    const formatted = formatPhone(e.target.value);
                    if (formatted !== field.value) field.onChange(formatted);
                    field.onBlur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="agreement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-2 min-h-[44px]">
            <FormControl>
              <Checkbox
                checked={field.value === true}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal leading-snug text-xs">
                I agree to serve with unity, humility, and care — understanding this day is set apart for worship.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}

export default VolunteerForm;
