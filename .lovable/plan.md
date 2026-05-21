## Goal
Replace the near-invisible aerial texture behind the Services page CTA ("Some stories deserve a different angle.") with a custom-generated, on-brand hero image: an aerial wedding moment in the Rocky Mountains, weighted toward white/light so the dark CTA still reads as a "dark close."

## The image
- **Subject:** Top-down / high-oblique aerial of an outdoor wedding ceremony in the Canadian Rockies. Bride in flowing white dress at the center of a small circular gathering, long train extending across pale alpine meadow or a white-petal aisle. Pine shadows and a sliver of granite peak at the frame's edge for place.
- **Palette:** Predominantly white / bone / soft daylight — white dress, white florals, pale grass, hazy mountain light. Near-black evergreens as the only deep value. No saturated color.
- **Mood:** Cinematic, restrained, A24/editorial. Not a stock wedding photo. Reads as "perspective changes everything" — the wedding is recognizable only from above.
- **Composition:** Subject off-center (rule of thirds, lower-left or lower-right), generous negative space of meadow/snow/light for the headline and button to breathe over.
- **Format:** 1920×1080, jpg, generated with `imagegen` premium tier (cinematic detail matters here).

## CTA treatment change
Right now the image sits at `opacity-[0.07]` — effectively invisible. For this image to actually *sell*, it needs to be seen.

- Raise the background image opacity to ~`0.55–0.7` so the wedding scene is legible but the section still reads dark.
- Replace the flat `bg-foreground` with a layered treatment:
  - Image at full size, lazy-loaded.
  - Dark gradient overlay on top: `bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/35` (text side stays dark, image side breathes), plus a soft bottom-to-top `from-foreground/70` vignette so the button area has contrast.
- Keep the existing `text-background` (white) heading + button — contrast is preserved by the left-side dark gradient.
- Keep min-height and `py-section-lg`. Add `bg-foreground` as fallback color under the image.

## Files touched
- `src/assets/cta-wedding-aerial.jpg` — new generated image (premium tier, 1920×1080).
- `src/components/fly4media/CTA.tsx` — swap import, raise opacity, add gradient overlay layer. ~10 line diff, no API change.

## Out of scope
- No copy changes ("Some stories deserve a different angle." stays).
- No changes to other pages' CTAs (Index/About/CaseStudy all use the same component and will inherit the new background — confirmed this is desired since the new image is universally on-brand, but flagging so you can veto). If you want the new image *only* on Services, I'll add an optional `backgroundImage` prop instead and pass it from `Services.tsx`.

## Question before I build
Universal swap (all pages get the wedding aerial CTA bg) or Services-only (add prop, leave Index/About/CaseStudy on the current near-black texture)?
