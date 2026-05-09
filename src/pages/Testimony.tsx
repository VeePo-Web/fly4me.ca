import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, HelpCircle, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContactPanel } from "@/contexts/ContactPanelContext";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import PullQuote from "@/components/PullQuote";
import crossField from "@/assets/cross-field.jpg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/lib/send-email";
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

const testimonySchema = z.object({
  name: z.string().max(100).optional(),
  testimony: z.string().trim().min(20, "Please share a bit more — at least a sentence or two").max(5000),
});

type TestimonyFormValues = z.infer<typeof testimonySchema>;

const nextSteps = [
  { to: "/faith/questions", label: "Faith Questions", icon: HelpCircle, desc: "Exploring what you believe?" },
  { to: "/support/prayer", label: "Request Prayer", icon: Heart, desc: "Let us pray with you" },
  { to: "#contact-panel", label: "Get in Touch", icon: Mail, desc: "Questions or feedback" },
];

const Testimony = () => {
  const [submitted, setSubmitted] = useState(false);
  const { openPanel } = useContactPanel();

  const form = useForm<TestimonyFormValues>({
    resolver: zodResolver(testimonySchema),
    defaultValues: {
      name: "",
      testimony: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: TestimonyFormValues) => {
    try {
      await sendEmail({
        type: "testimony",
        name: data.name?.trim() || "Anonymous",
        testimony: data.testimony,
      });
      setSubmitted(true);
      toast({
        title: "Testimony received",
        description: "Thank you for sharing your story with us.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageShell>
      <SubPageHeader
        title="Share Your Story"
        subtitle="If God met you at Worship in the Park — through worship, prayer, a conversation, or a quiet moment — we'd love to hear about it."
        eyebrow="Testimony"
        image={crossField}
      />

      <EditorialContainer layout="center">
        <div className="w-full max-w-xl flex flex-col gap-16 md:gap-24 text-left">
          <ScriptureWhisper
            verse="They triumphed over him by the blood of the Lamb and by the word of their testimony."
            reference="Revelation 12:11"
            variant="anchor"
          />

          <PullQuote attribution="Revelation 12:11">
            They triumphed over him by the blood of the Lamb and by the word of their testimony.
          </PullQuote>

          {/* Editorial form card */}
          <div className="relative border border-border/40 bg-card/50 p-6 md:p-10 overflow-hidden">
            {/* Gold left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--gold-warm) / 0.15))" }}
              aria-hidden="true"
            />
            {/* Ghost cross watermark */}
            <div className="absolute bottom-6 right-6 pointer-events-none opacity-[0.02]" aria-hidden="true">
              <div className="relative w-[20px] h-[30px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-foreground rounded-full" />
                <div className="absolute top-[8px] left-0 w-full h-[2px] bg-foreground rounded-full" />
              </div>
            </div>
            {/* Warm radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--primary) / 0.02), transparent 70%)" }}
              aria-hidden="true"
            />

            {submitted ? (
              <ScrollReveal weight="normal">
                <div className="text-center py-12 space-y-4 relative z-10 animate-[fade-in_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
                  <svg width="24" height="34" viewBox="0 0 24 34" fill="none" className="mx-auto opacity-20" aria-hidden="true">
                    <line x1="12" y1="0" x2="12" y2="34" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
                    <line x1="2" y1="10" x2="22" y2="10" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
                    <circle cx="12" cy="10" r="1.2" fill="hsl(var(--gold-warm))" fillOpacity="0.2" />
                  </svg>
                  <h3 className="font-serif text-xl font-light" style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}>
                    Thank you for sharing
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Your testimony has been received. Thank you for sharing what God has done.
                  </p>
                  <Button
                    variant="editorial"
                    className="mt-4"
                    onClick={() => { setSubmitted(false); form.reset(); }}
                  >
                    Share another story
                  </Button>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={0.1} weight="normal">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormDescription>Optional — you can share anonymously.</FormDescription>
                          <FormControl>
                            <Input placeholder="Your name (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="testimony"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Testimony</FormLabel>
                          <FormDescription>
                            What happened? How did God move in your life that day?
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="Share your story…"
                              className="min-h-[160px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                      <Button
                        type="submit"
                        className="min-h-[48px] px-8 group"
                      >
                        Share Your Story
                        <ArrowRight size={14} strokeWidth={1.5} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </Button>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your testimony will be sent directly to the organizing team.
                      </p>
                    </div>
                  </form>
                </Form>
              </ScrollReveal>
            )}
          </div>

          {/* Journey next-steps */}
          <ScrollReveal delay={0.2}>
            <nav aria-label="Continue your journey" className="border-t border-border/40 pt-10 mt-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative" aria-hidden="true">
                  <div className="w-px h-3 bg-primary/15 mx-auto" />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-px bg-primary/15" />
                </div>
                <p
                  className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground"
                  style={{ fontFeatureSettings: '"cv02"' }}
                >
                  Continue your journey
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {nextSteps.map((link, i) => (
                  <div
                    key={link.to}
                    className="animate-[fade-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {link.to === "#contact-panel" ? (
                      <button
                        onClick={() => openPanel("general")}
                        className="group relative inline-flex items-center gap-2 border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/15 px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[1.5px] transition-all duration-500 group-hover:w-[2px]"
                          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--gold-warm) / 0.1))" }}
                        />
                        <link.icon size={13} strokeWidth={1.3} className="flex-shrink-0 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                        {link.label}
                        <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
                      </button>
                    ) : (
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
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </ScrollReveal>

          <div className="border-t border-border/30 pt-12">
            <ScriptureWhisper
              verse="Come and hear, all you who fear God; let me tell you what he has done for me."
              reference="Psalm 66:16"
              variant="interstitial"
            />
          </div>
        </div>
      </EditorialContainer>
    </PageShell>
  );
};

export default Testimony;
