# Mobile Contact Form — Design Brief

A prompt-style direction for the **feel and UX** of `ContactModal.tsx` on mobile (≤768px). Visual/interaction only — no business logic, no copy rewrites, no backend changes. Brand panel, success ladder, and chip taxonomy stay as-is in spirit; this is about *how the form breathes* on a phone.

---

## The one-line brief

> A single, quiet column of questions that answers itself one breath at a time — like writing a letter on a clean sheet of paper, not filling out a form.

Think Apple's "Hello." page, fantasy.co's editorial restraint, Linear's settings screens, Things 3's add-task sheet. **Stillness. Generous air. One thing at a time. No chrome.**

---

## Guiding principles

1. **One question owns the screen.** The active field is the only loud element. Everything else recedes.
2. **No boxes.** No card outlines, no filled inputs, no rounded rectangles around fields. Only a single hairline beneath each input. The form is the page.
3. **Whitespace is the design.** Section gaps measured in `28–40px`, not `12px`. The form should feel under-furnished, not packed.
4. **Type leads, UI follows.** The eye should land on labels and answers, never on borders, shadows, or affordance hints.
5. **Motion is breath, not theater.** Every transition under 400ms, `cubic-bezier(0.22, 1, 0.36, 1)`. No bouncing, no scaling, no springs.
6. **Thumb-first.** Primary CTA is sticky-bottom, full-width, inside safe-area. Submit is never a thing you have to scroll to find.

---

## Composition (top → bottom, mobile)

```text
┌──────────────────────────────────────┐
│  ╳                                   │  ← close, top-right, 44pt tap target
│                                      │
│  [tight brand band — 22vh, already   │
│   in place, keep as-is]              │
│                                      │
├──────────────────────────────────────┤
│                                      │
│  Tell us what deserves               │  ← headline, t-headline-2
│  a new perspective.                  │     left-aligned, 2 lines max
│                                      │
│  ─── 40px air ───                    │
│                                      │
│  Name                                │  ← label, t-micro, muted
│  ___________________________         │  ← single hairline, no fill
│                                      │
│  ─── 32px air ───                    │
│                                      │
│  Email                               │
│  ___________________________         │
│  Never shared. Never spammed.        │  ← t-micro/40, hint sits quiet
│                                      │
│  ─── 40px air ───                    │
│                                      │
│  What are you working on?            │  ← question framed as a question,
│                                      │     not "Services" header
│  Film & Story                        │  ← group eyebrow, t-eyebrow/50
│  ▸ ▸ ▸ ▸ ▸ →                         │  ← horizontal scroll, edge-fade
│                                      │
│  Brand & Campaign                    │
│  ▸ ▸ ▸ ▸ →                           │
│                                      │
│  Property & Industry                 │
│  ▸ ▸ →                               │
│                                      │
│  ─── 32px air ───                    │
│                                      │
│  Project                             │
│  ___________________________         │  ← textarea, hairline only,
│  ___________________________         │     placeholder italic, muted
│  ___________________________         │
│                                      │
│  ─── 32px air ───                    │
│                                      │
│  Phone  optional                     │
│  ___________________________         │
│                                      │
│  ─── 80px air (breathing room) ───   │
│                                      │
│  tobyrennick@gmail.com               │  ← mobile fallback, t-meta/50
│  403 818 9686                        │
│                                      │
│  [200px bottom buffer for sticky]    │
└──────────────────────────────────────┘
   ┌─ sticky thumb-zone CTA ─────────┐
   │ Toby replies within 1 day.      │  ← t-micro, centered, /60
   │ ┌─────────────────────────────┐ │
   │ │  Send brief             ↗   │ │  ← full-width, h=56, black on white
   │ └─────────────────────────────┘ │
   └─ safe-area-inset-bottom ────────┘
```

---

## Field anatomy (the heart of it)

**Default state**
- Label: `t-micro`, `text-muted-foreground`, 12px above the input, **always visible** (no floating-label gimmick — too clever, too 2018).
- Input: `t-lede` (large, readable, ~20px), transparent background, **single hairline** `border-b border-border/60`, padding `pb-3`, no left/right padding, no top border, no fill.
- Caret: native, default color.

**Focus state**
- Hairline crossfades from `border/60` → `foreground` over 280ms.
- A **second hairline** draws beneath, 1px tall, `bg-foreground`, animating `scaleX(0) → scaleX(1)` from left over 320ms with `cubic-bezier(0.22, 1, 0.36, 1)`. Two hairlines briefly co-exist — the old one fades as the new draws.
- Label color shifts `muted-foreground → foreground` over 200ms.
- **No ring. No glow. No box-shadow. No background tint.** Ever.

**Filled state (unfocused, valid)**
- Hairline holds at `border/80`, label stays `muted-foreground`.
- A small dot `•` (3px, `bg-foreground/40`) appears at the far right of the label row — a quiet "noted" mark. Crossfades in over 240ms.

**Error state**
- Hairline shifts to `border-destructive/60`, no shake, no icon.
- Inline message below in `t-micro text-destructive/80`, fade-up 8px over 240ms.

**Hint text**
- `t-micro text-muted-foreground/50`, sits 8px below input, **never bold, never colored**. Reads like a footnote.

---

## Chip group (services)

Keep horizontal scroll on mobile — it's right. Refine:

- Chip: `t-micro`, `px-3 py-2`, **no border by default** — just `text-muted-foreground/70` on transparent.
- A 1px hairline appears under the chip on hover/active via underline, not box border.
- **Selected:** chip text goes `foreground`, a 1px underline draws beneath (320ms, left-to-right). No fill, no pill background. The selection feels like *underlining a word in a letter*, not toggling a button.
- Group eyebrow: `t-eyebrow text-muted-foreground/50`, all-caps, tracking +0.08em, 8px below.
- **Edge fade:** add a 24px gradient mask on the right edge of the scroll container (`mask-image: linear-gradient(to right, black 80%, transparent)`) — a wordless "scroll for more" cue.
- No scroll indicator dots. No arrows. The fade is enough.

---

## Headline

- `t-headline-2`, left-aligned, max 2 lines, `max-w-[16ch]`.
- Stays as-is in copy: "Tell us what deserves / a new perspective."
- Animates in once on mount: 12px fade-up, 480ms, no stagger needed.

---

## Sticky CTA (already exists — refine)

- Surface: `bg-background/85` + `backdrop-blur-xl` (heavier blur than current `md` — more iOS-glassy).
- Top border: replace `border-t border-border` with a **6px gradient fade** from transparent → background, so the CTA bar lifts out of the page rather than sitting on a line. Cleaner.
- Micro-copy ("Toby replies within 1 business day, every time.") stays, centered, `t-micro text-muted-foreground/60`, 8px above button.
- Button: full-width, **56px tall** (not 48), `bg-foreground text-background`, `t-body` weight 500, arrow `↗` in trailing slot with 8px gap. No rounded corners beyond 2px (`rounded-sm`).
- Reveal: appears once Name + Email read as valid (current logic). Translate-up from `translate-y-full` to `0` over 480ms with `cubic-bezier(0.22, 1, 0.36, 1)`. **Add a 120ms delay** — gives the validation moment a beat to register, so the bar feels *earned*, not reactive.
- Pressed state: button opacity to 0.85, no scale.

---

## Brand band (top, 22vh)

Keep as-is structurally, but:
- Add a **2px gold hairline** along the very bottom edge of the brand band (`bg-gold-warm/40` or equivalent token), acting as the seam between brand and form. One quiet flourish, the only ornament on the screen.
- Headline inside brand band: ensure it sits **bottom-left**, not bottom-padded — let it almost-touch the seam. That tension is the design.

---

## Micro-interactions

- **Tap on chip:** opacity 0.7 for 80ms, then settle. No scale.
- **Keyboard open:** form scrolls active field to ~33% from top of remaining viewport (not centered — gives breathing room above). Use `scrollIntoView({ block: "center", behavior: "smooth" })` then offset.
- **Field complete → next:** no auto-advance. Trust the user.
- **Submit press:** sticky CTA shows three pulsing dots (already in place), keep — but make dots `bg-background/60` (slightly softer than current `/80`).

---

## What to remove / forbid

- ❌ No card backgrounds behind the form.
- ❌ No rounded input boxes.
- ❌ No focus rings, ring-offset, or shadow on inputs.
- ❌ No icon decorations inside fields (no email icon, no phone icon).
- ❌ No progress bar, no "step 1 of 3."
- ❌ No floating labels.
- ❌ No accent colors except the gold seam and destructive red.
- ❌ No emoji, no illustrations.

---

## Tokens to lean on

- Typography: `t-headline-2`, `t-lede`, `t-body`, `t-micro`, `t-eyebrow` only.
- Colors: `foreground`, `background`, `muted-foreground`, `border`, `destructive`, `gold-warm` (seam only).
- Spacing rhythm: `28px` (between related fields), `40px` (between sections), `80px` (before footer fallback).
- Motion: `duration-[280ms|320ms|480ms]`, easing `cubic-bezier(0.22, 1, 0.36, 1)` exclusively.

---

## The test

Open the form on a phone, scroll slowly, focus a field, type one word. If at any moment the screen feels **busier than a blank page with one sentence on it** — the design has failed. The form should feel like the absence of a form.

---

## Out of scope

- Desktop layout (no changes ≥768px).
- Copy rewrites.
- Service taxonomy changes.
- Backend, validation logic, edge function.
- Success ladder (already lovely).
- Brand panel content/imagery.

---

## Files this would touch (on build)

- `src/components/fly4media/ContactModal.tsx` — field anatomy, chip styling, sticky CTA refinement, spacing rhythm, brand seam.
- Possibly `src/index.css` — one new utility for the edge-fade mask and the second-hairline focus animation, if not expressible inline.

No new components, no new packages, no schema changes.
