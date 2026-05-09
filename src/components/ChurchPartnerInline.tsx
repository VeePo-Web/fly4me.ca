import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, Upload, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendEmail } from "@/lib/send-email";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const IMAGE_MIME_RE = /^image\//;

const PARTNER_OPTIONS = [
  { id: "spread-word", label: "Spread the Word to your congregation" },
  { id: "point-volunteer", label: "Point your congregation to the volunteer sign-up" },
  { id: "financial", label: "Email us to set up a meeting about partnering financially" },
  { id: "pray", label: "Pray with us" },
  { id: "feature", label: "Send a quote about the event for our Church Partners page" },
] as const;

const partnerSchema = z.object({
  churchName: z.string().trim().min(2, "Please enter your church name").max(150),
  contactName: z.string().trim().min(2, "Please enter a contact name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  partnerWays: z.array(z.string()).default([]),
  pastorName: z.string().trim().max(100).optional().or(z.literal("")),
  quote: z.string().trim().max(800).optional().or(z.literal("")),
  quoteAttribution: z.enum(["pastor", "church"]).optional(),
  faithOptIn: z.boolean().default(false),
  seekerContactName: z.string().trim().max(100).optional().or(z.literal("")),
  contactBio: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

async function uploadImage(file: File, prefix: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("partnership-uploads")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("partnership-uploads").getPublicUrl(path);
  return data.publicUrl;
}

function validateImage(file: File): string | null {
  if (!IMAGE_MIME_RE.test(file.type)) return "Please upload an image file.";
  if (file.size > MAX_BYTES) return "Image must be 5 MB or smaller.";
  return null;
}

export default function ChurchPartnerInline() {
  const [open, setOpen] = useState(false);
  const [pastorPhoto, setPastorPhoto] = useState<File | null>(null);
  const [contactPhoto, setContactPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const hasSubmittedRef = useRef(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      churchName: "",
      contactName: "",
      email: "",
      phone: "",
      partnerWays: [],
      pastorName: "",
      quote: "",
      quoteAttribution: undefined,
      faithOptIn: false,
      seekerContactName: "",
      contactBio: "",
      message: "",
    },
  });

  const partnerWays = form.watch("partnerWays");
  const wantsFeature = partnerWays.includes("feature");
  const faithOptIn = form.watch("faithOptIn");
  const pastorName = form.watch("pastorName");
  const churchName = form.watch("churchName");
  const quoteAttribution = form.watch("quoteAttribution");

  const onPickPastorPhoto = (file: File | null) => {
    if (!file) return setPastorPhoto(null);
    const err = validateImage(file);
    if (err) {
      toast({ title: "Couldn't add photo", description: err, variant: "destructive" });
      return;
    }
    setPastorPhoto(file);
  };

  const onPickContactPhoto = (file: File | null) => {
    if (!file) return setContactPhoto(null);
    const err = validateImage(file);
    if (err) {
      toast({ title: "Couldn't add photo", description: err, variant: "destructive" });
      return;
    }
    setContactPhoto(file);
  };

  const onSubmit = async (values: PartnerFormValues) => {
    if (isSubmitting || hasSubmittedRef.current) return;
    setIsSubmitting(true);
    try {
      let pastorPhotoUrl: string | undefined;
      let contactPhotoUrl: string | undefined;
      if (pastorPhoto && values.quoteAttribution === "pastor") {
        pastorPhotoUrl = await uploadImage(pastorPhoto, "pastor");
      }
      if (contactPhoto && values.faithOptIn) {
        contactPhotoUrl = await uploadImage(contactPhoto, "contact");
      }

      const partnerWaysLabels = PARTNER_OPTIONS
        .filter((opt) => values.partnerWays.includes(opt.id))
        .map((opt) => opt.label);

      const attributionLabel = values.quoteAttribution === "church"
        ? values.churchName
        : values.quoteAttribution === "pastor"
          ? values.pastorName || values.churchName
          : undefined;

      await sendEmail({
        type: "church-partner-signup",
        churchName: values.churchName,
        contactName: values.contactName,
        name: values.contactName,
        email: values.email,
        phone: values.phone || undefined,
        partnerWays: partnerWaysLabels,
        pastorName: values.quoteAttribution === "pastor" ? (values.pastorName || undefined) : undefined,
        quote: values.quote || undefined,
        quoteAttribution: attributionLabel,
        pastorPhotoUrl,
        faithOptIn: values.faithOptIn,
        seekerContactName: values.seekerContactName || undefined,
        contactBio: values.contactBio || undefined,
        contactPhotoUrl,
        message: values.message || undefined,
      });

      hasSubmittedRef.current = true;
      setSubmittedEmail(values.email);
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again, or email mitfordworship@gmail.com directly.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // ── Success state ───────────────────────────────────
  if (submittedEmail) {
    return (
      <div className="mt-6 border border-border/40 bg-card/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check size={14} strokeWidth={2} className="text-primary" />
          </div>
          <div className="space-y-1.5">
            <p
              className="font-serif text-base font-light text-foreground"
              style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
            >
              Thanks — we've sent a confirmation to {submittedEmail}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We'll be in touch soon about partnering. You can continue with your volunteer application above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Collapsed entry / expanded form ─────────────────
  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-5" aria-hidden="true">
        <div className="h-px flex-1 bg-border/40" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left border border-border/40 bg-card/40 hover:bg-card/60 p-4 sm:p-5 transition-colors group"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="font-serif text-lg font-light text-foreground"
              style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
            >
              Want to Partner As A Church?
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              How to partner with us as a church
            </p>
          </div>
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className={cn(
              "text-muted-foreground shrink-0 transition-transform duration-300 mt-1",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      {open && (
        <div className="mt-4 border border-border/40 bg-background/60 p-5 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ── Five ways to partner ── */}
              <FormField
                control={form.control}
                name="partnerWays"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      How would you like to partner with us? (Choose any that apply)
                    </FormLabel>
                    <div className="space-y-3 pt-2">
                      {PARTNER_OPTIONS.map((opt) => (
                        <FormField
                          key={opt.id}
                          control={form.control}
                          name="partnerWays"
                          render={({ field }) => {
                            const checked = field.value?.includes(opt.id);
                            return (
                              <FormItem className="flex items-start gap-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(c) => {
                                      const next = c
                                        ? [...(field.value || []), opt.id]
                                        : (field.value || []).filter((v: string) => v !== opt.id);
                                      field.onChange(next);
                                    }}
                                    className="mt-0.5"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-sm leading-relaxed cursor-pointer">
                                  {opt.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>

                    {partnerWays.includes("pray") && (
                      <div className="mt-4 border-l-2 border-primary/30 pl-4 py-2">
                        <p
                          className="font-serif text-sm italic text-foreground/80 leading-relaxed"
                          style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
                        >
                          "If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land."
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
                          2 Chronicles 7:14 · NIV
                        </p>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ── Feature on Partners page (conditional) ── */}
              {wantsFeature && (
                <div className="border-t border-border/30 pt-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    A quote about the event
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A short endorsement we can feature alongside your church on{" "}
                    <span className="text-foreground/70">mitfordworship.com/vision/partners</span>.
                  </p>

                  <FormField
                    control={form.control}
                    name="quoteAttribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Who is the quote from?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="space-y-2 pt-1"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="pastor" id="attr-pastor" />
                              <Label htmlFor="attr-pastor" className="font-normal text-sm cursor-pointer">
                                From the pastor
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="church" id="attr-church" />
                              <Label htmlFor="attr-church" className="font-normal text-sm cursor-pointer">
                                From {churchName?.trim() || "the church"}
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {quoteAttribution === "pastor" && (
                    <FormField
                      control={form.control}
                      name="pastorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Pastor name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Pastor John Smith" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {quoteAttribution && (
                    <FormField
                      control={form.control}
                      name="quote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Their quote about the event</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="A short note we can share on the Church Partners page…"
                              className="min-h-[88px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {quoteAttribution === "pastor" && (
                    <PhotoUploader
                      label="Would you also like to include a photo of the pastor? (optional)"
                      file={pastorPhoto}
                      onChange={onPickPastorPhoto}
                    />
                  )}
                </div>
              )}

              {/* ── Faith opt-in ── */}
              <div className="border-t border-border/30 pt-5 space-y-4">
                <FormField
                  control={form.control}
                  name="faithOptIn"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="font-normal text-sm leading-relaxed cursor-pointer">
                          List our church as a contact for people new to faith
                        </FormLabel>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          If someone on mitfordworship.com is new to faith and wants to ask a question, can we publish your church's contact info on the site so they can reach out to you directly?
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {faithOptIn && (
                  <div className="space-y-4 pl-7">
                    <FormField
                      control={form.control}
                      name="seekerContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Who should seekers contact?</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Pastor John, or our welcome team" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <PhotoUploader
                      label="Photo of contact person (optional)"
                      file={contactPhoto}
                      onChange={onPickContactPhoto}
                    />
                    <FormField
                      control={form.control}
                      name="contactBio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">A sentence we can show alongside their contact info (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="A sentence or two we can share with seekers…"
                              className="min-h-[72px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* ── Contact info ── */}
              <div className="border-t border-border/30 pt-5 space-y-4">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Your church
                </p>
                <FormField
                  control={form.control}
                  name="churchName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Church name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Kingsgate Church" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Contact name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@church.org" />
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
                      <FormLabel className="text-sm">Phone (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="403…" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Anything else (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Anything else you'd like us to know…"
                          className="min-h-[72px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                We'll only use this to coordinate church partnership for Worship in the Park. You'll receive an email confirmation.
              </p>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px]"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending…</span>
                ) : (
                  "Send partnership inquiry"
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

function PhotoUploader({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-1.5">
        {file ? (
          <div className="flex items-center justify-between gap-3 border border-border/40 bg-card/40 p-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <Upload size={14} strokeWidth={1.5} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{file.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Remove photo"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-border/50 bg-card/20 hover:bg-card/40 p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload size={14} strokeWidth={1.5} />
            Choose an image (≤ 5 MB)
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}
