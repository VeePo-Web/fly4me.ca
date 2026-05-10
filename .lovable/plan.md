## Case Study 4 — *Field & Frequency* — full editorial upgrade

CS4 has three real drone clips (field-1/2/3). Hero already uses field-1. Gallery has field-2 + field-3. No duplication in the originals — but the new `perspectiveImage` slot lets us place each clip in its strongest narrative role and dedupe naturally.

### 1. Three Nano Banana supporting images → `src/assets/cs/field/`

All hyper-realistic, no people, no faces, no readable signage/text. Southern Alberta industrial estate in winter, restrained palette consistent with the existing field-1/2/3 aerials.

1. `seam-in-snow.jpg` (wide, 1920×1080) — *"Hyper-realistic editorial top-down photograph of a long straight tire-track seam pressed into fresh snow over hard prairie ground at first light, faint blue-grey shadow, restrained monochromatic palette, no people, no vehicles, no signage, no text, photographic 35mm look, low contrast."*
2. `weathered-steel.jpg` (portrait, 1024×1280) — *"Cinematic editorial detail of weathered galvanised steel cladding on a southern Alberta industrial outbuilding under flat winter overcast light, faint dusting of snow, no people, no signage, no text, no logos, restrained palette, photographic 50mm look, shallow depth of field."*
3. `prairie-horizon.jpg` (wide, 1920×1080) — *"Hyper-realistic editorial photograph of a vast empty southern Alberta prairie horizon in winter at first light, distant Rocky Mountain foothills silhouette, snow-dusted stubble field, no people, no buildings, no signage, no text, restrained cool palette, photographic 35mm look."*

### 2. `src/data/projects.ts` — extend `field-and-frequency`

Originals untouched. Add `perspectiveImage` + `perspectiveVideoSources` pointing to **field-2** (the wider mid-altitude pass — the cleanest "perspective shift" beat), so the gallery auto-dedupes to **field-3** (the low traverse) as the closing visual proof.

- **Opportunity** — *"A Working Landscape."* — A southern Alberta industrial estate that mattered to the people who built it but read as infrastructure to everyone else. The brief: show the site at the scale it actually operates at.
- **Problem** — *"Compliance Looks Like Compliance."* — Industrial sites get documented for regulators — flat, top-down, evidentiary. The land disappears. The decisions disappear. The pride disappears with them.
- **Perspective Shift** *(signature)* — *"Terrain, Not Inventory."* — We stopped framing the site as assets on a parcel and started framing it as terrain shaped by intent. Geometry from above. Texture from below. The rhythm between the two becomes the argument.
- **Execution** — *"One Morning. Three Passes."* — A single winter morning. One high and slow for the pattern of the work against the prairie. Two lower traverses for surface — seams in the snow, lines in the dirt, the quiet repetition of something built to last decades.
- **Outcome** — *"From Infrastructure To Place."* — The same site that read as infrastructure on a survey began reading as place on a screen. Carried into the brand's 2026 internal and partner-facing reporting — and changed how the team itself describes the work.
- **Takeaway** — *"Compliance documents a site. Cinema gives it standing. The difference shows up in how people talk about the work afterward."*

Supporting image placement:
- `weathered-steel.jpg` → `after-opportunity` *(intimate detail study — the human-scale texture before we go aerial)*
- `seam-in-snow.jpg` → `after-problem` *(top-down silence — what compliance frames look like, stripped of context)*
- `prairie-horizon.jpg` → `after-execution` *(the country the site sits in — proof of "terrain, not inventory")*

### 3. No component changes

`Project.perspectiveImage` + `CaseStudyGallery` dedupe already shipped. Once the data is added, `/work/field-and-frequency` automatically renders Hero (field-1) → Meta → Opportunity (steel) → Perception Gap (seam in snow, flipped) → Perspective Shift (full-bleed field-2 video) → Execution (prairie horizon) → Outcome statement → Takeaway → Gallery (field-3 only) → Next Project.

### Out of scope

CS5 (Hauling the Foothills) untouched in this pass.

### Verification

- `/work/field-and-frequency` renders the full enhanced flow.
- Each of the three real clips (field-1, field-2, field-3) appears exactly once, in its strongest narrative slot.
- Three new lazy-loaded supporting JPGs with explicit dimensions; no CLS, LCP unchanged.
- CS1, CS2, CS3 unaffected.
