## Redesign: Fullscreen Cinematic Contact Modal

Rebuild `src/components/fly4media/ContactModal.tsx` as a true fullscreen, split-panel "private creative consultation portal" — replacing today's centered card.

### Layout

**Desktop (≥ md)** — fullscreen split:
```text
┌─────────────────────────────┬──────────────────────────────┐
│  LEFT — Brand panel         │  RIGHT — Form panel          │
│  (cinematic Alberta image,  │  (off-white background,      │
│   subtle slow Ken-Burns      │   massive whitespace)        │
│   zoom, grain overlay)      │                              │
│                             │  · Start a Project (label)   │
│  · Fly4MEdia mark (small)   │  · "Tell us about            │
│  · "Let's create something    │     your vision."          │
│     cinematic."             │                              │
│  · 1-line supporting copy   │  Name ──────────────         │
│  · hello@fly4media.com      │  Email ─────────────         │
│    Alberta, Canada (foot)   │  Project ───────────         │
│                             │                              │
│                             │  [ Start the Conversation ↗ ]│
└─────────────────────────────┴──────────────────────────────┘
```
50/50 split. Left panel: foreground (near-black) background with `cs-canmore-hero.jpg` at low opacity + slow `transform: scale(1) → scale(1.06)` over 20s + film grain. Right panel: `bg-background`.

**Mobile** — vertical stack: brand panel collapses to a short (40vh) cinematic header with mark + headline only, form panel scrolls below. Same typographic scale and rhythm.

### Animation

- Overlay: `opacity 0 → 1`, `backdrop-filter: blur(0) → blur(12px)` over 500ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Modal content: `opacity 0 → 1`, `translateY(16px) → 0` over 600ms with 80ms delay.
- Close: reverse, 320ms.
- Page-behind blur via overlay only (no DOM mutation on body).
- All animations gated behind `prefers-reduced-motion`.
- No animation libraries — pure CSS keyframes added to `tailwind.config.ts` (`modal-in`, `panel-in`).

### Form UX

- Three fields only: Name, Email, Project Description (textarea, auto-grow up to 6 rows).
- Floating label pattern: label sits as placeholder, lifts to small caps tracking on focus/filled.
- Bottom 1px hairline border, animates from `border-border` to `border-foreground` with a left-to-right underline draw on focus.
- Generous `py-5` padding, `text-lg` input, Inter.
- Submit button: full-width on mobile, auto on desktop, `bg-foreground text-background`, subtle `translateY(-1px)` on hover, refined easing.
- Loading: text swaps to "Sending…" with three dots animating opacity in sequence (no spinner).
- Success: form fades out, replaced by minimal confirmation block ("Message in motion. We'll respond within one business day.") + link to close.

### Background imagery

Reuse `src/assets/cs-canmore-hero.jpg` as the left panel atmosphere — already monochrome-friendly, lazy-loaded. No new image generation needed.

### Accessibility

- `role="dialog" aria-modal="true" aria-labelledby="contact-title"`.
- Focus trap: focus first field on open, restore previous focus on close.
- Esc closes; click on overlay (outside both panels) closes.
- Close button: top-right of right panel, hairline icon button.
- Skip-to-form link not needed — fields are the first focusable elements.
- All text hits ≥ 7:1 contrast on its panel.

### Performance

- Single component, no new deps.
- Background image uses `loading="eager"` only when modal opens (mounted conditionally), `decoding="async"`, `fetchPriority="high"`.
- Grain overlay: pure CSS `radial-gradient` + `mix-blend-mode: overlay` at 4% opacity (no PNG).
- Body scroll lock retained.

### Files

- **Edit**: `src/components/fly4media/ContactModal.tsx` — full rewrite (~180 lines).
- **Edit**: `tailwind.config.ts` — add `modal-overlay-in`, `modal-panel-in` keyframes/animations.
- **Edit**: `src/index.css` — add `.contact-grain` utility (radial-gradient grain) and floating-label transition class if needed.

No changes to `PageShell`, header, or any page — the existing `openContact` wiring stays intact.

### Out of scope

- Real backend submission (mailto fallback retained as today).
- Video background on left panel (image-only this pass; component structured so a `<video>` swap is a one-line change later).
- New imagery generation.

### Acceptance

- Modal fills viewport on all breakpoints; no centered-card look remains.
- Left panel reads as cinematic editorial, right as Apple-clean form.
- Open/close animations smooth at 60fps on mid-range mobile.
- Esc, overlay click, and X button all close; focus returns to trigger.
- Lighthouse Accessibility stays 100.
