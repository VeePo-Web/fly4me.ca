## Audit — Case Study 4 (Field & Frequency)

CS4 already ships the full upgraded structure: `perspectiveImage`/`perspectiveVideoSources` on `field-2`, full 6-beat `narrative` (opportunity → problem → perspective shift → execution → outcome → takeaway), 3 supporting Nano Banana stills (`weathered-steel`, `seam-in-snow`, `prairie-horizon`) placed after opportunity / problem / execution, and the gallery auto-dedupes to `field-3` only. No duplication, all 3 real drone clips appear exactly once in their strongest narrative slot.

**Spot fixes for CS4** (Hormozi-clarity pass, copy-only):
- Tighten the **takeaway** line so the value lands harder: "Compliance documents a site. Cinema gives it standing — and standing is what gets quoted, shared, and remembered."
- Sharpen **outcome** body to lead with the perception shift before the deliverable note (no structural change).

That's it for CS4. No new assets, no component changes.

## Case Study 5 — Hauling the Foothills

Currently the thinnest case study on the site: one hero clip (`hauling-1.mp4`), short copy, no narrative block, no perspective image, no supporting stills. We bring it up to CS1–CS4 parity.

### 1. Three Nano Banana supporting images → `src/assets/cs/hauling/`

All hyper-realistic, no people, no faces, no logos, no readable text, foothills/Rocky Mountain front-range environment, summer morning light to match `hauling-1`.

- **`two-lane-aspen.jpg`** (1920×1080) — empty foothills two-lane asphalt road curving through aspen and lodgepole pine at golden first light, no vehicles, no signage, soft haze, editorial documentary realism.
- **`flatbed-deck-detail.jpg`** (1024×1280, portrait) — tight editorial detail of a weathered steel flatbed deck with chain tie-down, rust patina, gravel dust, shallow depth of field, overcast diffused light, no logos, no people, no text.
- **`foothills-horizon.jpg`** (1920×1080) — wide empty Alberta foothills horizon at summer dawn with rolling grass, distant Rocky Mountain front range, single thread of two-lane road disappearing into terrain, no vehicles, no people, no signage.

### 2. `src/data/projects.ts` — extend `hauling-the-foothills`

Single real clip (`hauling-1`) is the hero. Since there is only one drone asset, we keep `perspectiveImage` pointing at the **`foothills-horizon` Nano Banana still** so the Perspective Shift section gets its own visual moment without re-using the hero video. Gallery stays empty of duplicates — the auto-dedupe already filters the hero out, and the supporting stills carry the visual rhythm.

Narrative beats (Apple restraint + Hormozi clarity + Brunson arc):

- **Opportunity** — *"A Working Day."* The job is real: pickup, flatbed, skid steer, a foothills two-lane between sites. The country it moves through is the brand.
- **Problem** — *"Operations Lives On A Phone."* Quick cab clips. Load arrives, load leaves. The work gets logged; the country, the craft, the standard — they disappear with the dust.
- **Perspective Shift** — *"A Small Deliberate Thing In A Very Large Place."* Hold altitude long enough for the road to register as terrain and the load to register as intent. The truck stops being a vehicle. It becomes a decision moving across country.
- **Execution** — *"One Morning. One Line."* A single summer morning along a foothills two-lane. One slow aerial follow at the pace of the load — pickup, flatbed, skid steer — threading aspen and pine. No cuts. No music swell. The road. The weight. The country opening on either side.
- **Outcome** — *"From Logistics To Craft."* What read as logistics on a schedule began reading as craft on a road. Folded into the operator's 2026 brand and recruitment storytelling — and quietly raised the bar for what their team thinks the work is worth.
- **Takeaway** — *"Anyone can move a load. The footage decides whether moving it looks like work or looks like a standard."*

`supportingImages` placement:
- `flatbed-deck-detail` — `after-opportunity` (portrait, the human-scale detail before we go aerial)
- `two-lane-aspen` — `after-problem` (wide, the country that disappears in a phone clip)
- `foothills-horizon` — wired as `perspectiveImage` (full-bleed, carries the Perspective Shift section)

### 3. No component changes

`Project.perspectiveImage`, `narrative`, `supportingImages`, and `CaseStudyGallery` auto-dedupe already shipped with CS3. Once data lands, `/work/hauling-the-foothills` automatically renders the same Apple-clean editorial rhythm as CS1–CS4: Hero (hauling-1) → Meta → Opportunity (flatbed deck) → Perception Gap (two-lane aspen) → Perspective Shift (foothills-horizon, full-bleed) → Execution → Outcome → Takeaway → Next Project.

### 4. Out of scope

CS1, CS2, CS3 untouched. CS4 gets a 2-line copy polish in the same `src/data/projects.ts` edit. No new components, no new routes, no new dependencies.
