import PageShell from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { WhatThisIsNot } from "@/components/sections/WhatThisIsNot";
import { VisionTease } from "@/components/sections/VisionTease";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { ChurchesTogether } from "@/components/sections/ChurchesTogether";
import { CrossInterstitial } from "@/components/sections/CrossInterstitial";
import { SchedulePreview } from "@/components/sections/SchedulePreview";
import { BeforeYouCome } from "@/components/sections/BeforeYouCome";
import { NavGrid } from "@/components/sections/NavGrid";
import { YouAreInvited } from "@/components/sections/YouAreInvited";
import SectionDivider from "@/components/SectionDivider";
import SectionBleed from "@/components/SectionBleed";
import ScriptureWhisper from "@/components/ScriptureWhisper";

const Index = () => (
  <PageShell transparentHeader>
    <Hero />
    <SectionDivider variant="line" />
    <WhatThisIsNot />
    <SectionBleed from="default" to="muted" />
    <VisionTease />
    <SectionDivider variant="thorns" />
    <WhatToExpect />
    <SectionBleed from="muted" to="default" />
    <ChurchesTogether />
    <CrossInterstitial />
    <SchedulePreview />
    <SectionBleed from="muted" to="default" />
    <BeforeYouCome />
    <SectionBleed from="default" to="muted" />
    <NavGrid />

    <div className="w-full bg-muted">
      <ScriptureWhisper
        verse="How good and pleasant it is when God's people live together in unity."
        reference="Psalm 133:1"
        variant="interstitial"
      />
    </div>

    <YouAreInvited />

  </PageShell>
);

export default Index;
