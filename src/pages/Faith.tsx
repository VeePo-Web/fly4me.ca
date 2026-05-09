import { Link2, MessageCircleQuestion, UserCheck } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import PageShell from "@/components/PageShell";
import { SubPageHeader } from "@/components/ui/subpage-header";
import { EditorialContainer } from "@/components/ui/editorial-container";
import BentoCard from "@/components/BentoCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScriptureWhisper from "@/components/ScriptureWhisper";
import bentoFaith from "@/assets/bento-faith.jpg";
import glassConnect from "@/assets/stained-glass-hub-faith-connect.png";
import glassQuestions from "@/assets/stained-glass-hub-faith-questions.png";
import glassPastor from "@/assets/stained-glass-hub-faith-pastor.png";

const links = [
  { to: "/faith/get-connected", title: "Get Connected", description: "Visit the Get Connected Tent on the day — pick up a free Bible, meet people from local churches, or simply ask a question. No agenda, just an open door.", icon: Link2, image: glassConnect },
  { to: "/faith/questions", title: "Faith Questions", description: "Wondering what Christians actually believe? Unsure what to expect at a worship event? Honest questions are welcome here — and they deserve honest answers.", icon: MessageCircleQuestion, image: glassQuestions },
  { to: "/faith/contact-pastor", title: "Contact a Church", description: "If you'd like a real conversation with someone who cares, churches across Cochrane are available — before, during, or after the event.", icon: UserCheck, image: glassPastor },
];

const Faith = () => (
  <PageShell>
    <SubPageHeader
      title="Exploring Faith?"
      subtitle="No pressure, no agenda — just an open door. You don't need a church background to be here. You don't need to know anyone or understand the songs. This day at Mitford Park is for everyone — and if something stirs in you, there are people ready to talk, pray, and walk with you."
      eyebrow="An Open Door"
      image={bentoFaith}
    />
    <ScriptureWhisper
      verse="Come to me, all you who are weary and burdened, and I will give you rest."
      reference="Matthew 11:28"
      variant="interstitial"
    />
    {/* Pastoral pull-quote — unique to Faith */}
    <EditorialContainer layout="center">
      <ScrollReveal weight="light" delay={0.1}>
        <blockquote className="relative text-center mb-10 max-w-xl mx-auto">
          <span
            className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-4xl text-primary/10 select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>
          <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed italic">
            You don't have to have it all figured out. You don't have to know the right words. You just have to come.
          </p>
          <footer className="mt-3">
            <span
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFeatureSettings: '"cv02"' }}
            >
              — A word from Cochrane's churches
            </span>
          </footer>
        </blockquote>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {links.map((link, index) => (
          <ScrollReveal key={link.to} delay={index * 0.08} weight="light" variant="scale">
            <BentoCard {...link} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </EditorialContainer>
    <SectionDivider variant="cross" className="py-10" />
  </PageShell>
);

export default Faith;
