# CTA background — Springbank luxury estate concept

The "Let's talk about what you're trying to be seen as" closing CTA (and the homepage "Some stories deserve to be seen from above" close) currently loads `src/assets/cta-background.jpg` at 7% opacity as a faint texture. We'll replace it with a purpose-shot **aerial concept image of a Springbank-area luxury estate** that *earns* being shown prominently — and switch the CTA to feature-background mode so it actually reads.

## The concept

**"Last Light over Springbank Ridge"** — a high-altitude, slightly oblique aerial frame of a modern Alberta luxury home, golden-hour, Rockies on the horizon. The home isn't centered; it sits on the left third with land breathing to the right, so the headline ("Let's talk about what you're trying to be seen as") can occupy the dark left gradient without fighting the architecture.

**Composition specifics**
- Camera: ~120m altitude, ~25° downward tilt, framed 21:9-ish but exported 1920×1080.
- Subject: contemporary mountain-modern estate — board-formed concrete + cedar + floor-to-ceiling glass, low-pitched roof, infinity edge of a black-bottom pool catching the last sun. ~6000 sq ft footprint feel, not McMansion.
- Setting: 4–6 acre Springbank parcel — manicured native grass, a curved aggregate driveway, a single mature spruce stand, no neighbours visible.
- Land: rolling foothills falling west toward a silhouetted Canadian Rockies skyline (Moose Mountain profile recognizable to locals, not labeled).
- Light: 8 minutes before sunset, low warm rake from camera-right. Long architectural shadows. Pool glass-still, reflecting alpenglow on the peaks. One window glows warm interior amber.
- Sky: clean gradient — pale gold low, deep cobalt top, one wisp of cirrus catching pink.
- Mood: stillness, ownership, arrival. Editorial real-estate, not MLS.
- Treatment: cinematic color grade — slight teal-orange split, deep but not crushed shadows, fine 35mm grain. No people, no cars, no logos, no text.

## Implementation

1. **Generate** the image with `imagegen--generate_image` (model: `standard`, 1920×1080, no transparency) using the prompt above. Save to `src/assets/cta-springbank-estate.jpg`.
2. **QA pass**: view the file. If the home is centered, faces wrong, has visible signage, or the Rockies are missing, regenerate with a tightened prompt. Repeat until clean.
3. **Wire it in** by updating both CTA call sites to pass the new background prominently (not as 7% texture):
   - `src/pages/About.tsx` — pass `backgroundImage={ctaSpringbank}` and `backgroundAlt="Aerial view of a modern luxury estate on a Springbank acreage at last light, Canadian Rockies on the horizon"` to `<CTA />`.
   - `src/pages/Index.tsx` (or wherever the homepage closing CTA lives — confirm during build) — same treatment, so the same image carries the close site-wide.
   - The existing `isFeatureBg` branch in `CTA.tsx` already handles the dark L→R gradient + bottom vignette for legibility. No changes to `CTA.tsx` needed.
4. Leave the old `cta-background.jpg` in place as a fallback for any caller that omits `backgroundImage`.

## Files

- `src/assets/cta-springbank-estate.jpg` *(new, generated)*
- `src/pages/About.tsx` *(wire backgroundImage)*
- `src/pages/Index.tsx` *(wire backgroundImage on the homepage CTA — confirm path during build)*

## Notes

- 1920×1080 keeps file size sane and matches CTA.tsx's declared width/height; lazy-loading + decoding=async already set.
- If you'd prefer a *different* property type (lakeside cabin in Bragg Creek, glass-and-stone in Aspen Estates, equestrian acreage with stables) say the word before I generate and I'll swap the prompt — otherwise I'll proceed with the Springbank estate concept above.
