# Page 2 — About: targeted copy lifts

Services is shipped. Now About. The page is already strong; this is a precision pass, not a rewrite. Three small surgical lifts, no layout changes.

---

## Page-level theme

About already has the strongest line on the site (*"We believe perspective changes everything."*). Everything below it should earn that promise — by **moving the camera off us and onto the moment the customer's brief lands differently than they expected.**

Right now the page is 90% about *our* discipline (we wait, we restrain, we listen). That's good — but we can make 30% of it about *their* relief, *their* stakeholder meeting, *their* fear that the cut won't land. That's the shift.

---

## Sections

### 1. Hero (`src/pages/About.tsx` lines 33–40)
- **Eyebrow** "Studio — About" → keep, it's clean.
- **H1** "We believe perspective changes everything." → **leave verbatim.** This is the sanctioned slogan placement and it's perfect.

No edits.

### 2. Philosophy block (`src/pages/About.tsx` lines 65–94)
Three paragraphs today. The structure stays. The middle paragraph gets reworked to put the customer in frame.

- **¶1 (headline statement)** — keep the bones; tighten the second sentence so the rhythm punches harder.
- **¶2 (restraint)** — currently all about *our* discipline. Rewrite so it's about what restraint *gives the client* — the shot that survives the boardroom, the frame the CMO actually remembers.
- **¶3 (Alberta / patience)** — keep almost as-is; this is the founder-origin paragraph and its quietness is the point. Light polish only.

### 3. Process list (`src/components/fly4media/ProcessList.tsx` lines 3–8)
Today each step explains what *we do*. Rewrite each `desc` so it names the **anxiety it removes** — the unspoken fear in the client's head at that stage.

- **01 Discovery** — currently "we listen first" → reframe as the moment they realise we actually got the brief, not just heard it.
- **02 Creative Direction** — currently "every frame composed before the drone leaves the ground" → reframe as the certainty they can show the storyboard to a stakeholder without flinching.
- **03 Production** — currently "patience to wait for the right light" → reframe as the absence of compromise on shoot day, even when weather goes sideways.
- **04 Delivery** — currently "colour-graded master files… full archival" → reframe as the moment the cut lands and the room exhales.

Headers (Discovery / Creative Direction / Production / Delivery) stay — they're scannable nouns and the layout depends on them.

The section header "Four steps. Nothing wasted." also stays — it's already perfect.

### 4. Capabilities block (`src/components/fly4media/Capabilities.tsx` lines 3–10)
6 list items today, all factual checkboxes. The block's job is **trust**, so most of it should stay factual. But all six reading like a spec sheet flattens the page. Lift two so the panel has a heartbeat.

- Keep factual: "Transport Canada — Advanced RPAS", "Insured commercial operations", "Cinema-grade aerial drone systems", "Stabilised ground & gimbal workflows"
- Lift with voice: "FPV cinematic platforms" → name what FPV unlocks for the brief, not what the gear is. "Alberta-based, available worldwide" → keep the geography but make it a stance, not a shipping note.
- Section header "Built for productions that can't miss the shot." → keep, it's load-bearing.

### 5. Final CTA (`src/pages/About.tsx` lines 48–58)
- Eyebrow "Let's work together" → fine, but generic. Sharpen toward perception/positioning.
- Heading "Built for brands that understand presentation is positioning." → already razor-sharp. **Leave verbatim.**

---

## Out of scope

- Page meta title (already strong)
- Hero image, layout, spacing, any visual element
- Adding new sections (no team bios, no timeline — the page's restraint is the point)
- The slogan itself — used once, on the hero, exactly as planned

---

## After this lands

Recommended next page: **Home** (`/`). It's the front door and currently does the heaviest lift in fewest words — the biggest opportunity is sharpening Hero + the BrandStatement section so the perception thesis lands in 5 seconds.
