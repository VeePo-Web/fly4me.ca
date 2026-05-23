# ContactModal — Psychology pass v1

Eight upgrades from the audit, all inside `src/components/fly4media/ContactModal.tsx`. No new dependencies. No layout regressions. Brand voice preserved (editorial restraint, never Temu-loud).

---

## 1. Group 9 chips → 3 categories + "Not sure"

Replace the flat `SERVICE_CHIPS` array with three labeled groups:

```text
Film & Story        Aerial Cinematography · FPV Production · Tourism Film
Brand & Campaign    Commercial Campaign · Social Campaign · Creative Direction
Property & Industry Real Estate · Industrial
                    Not sure yet — let's talk
```

- Render each group with a small `t-eyebrow` label above its chip row.
- `flex-wrap` on desktop/tablet. On mobile (`<sm`), each group becomes a `overflow-x-auto snap-x` row with `scroll-snap-align: start` chips — eliminates 4-row wrap chaos on 360px viewports.
- "Not sure yet — let's talk" sits alone, full-width-feeling, slightly muted border.

## 2. Pre-select chips by referrer page

Already wired: `PageShell` passes `initialServices` via the `f4m:contact:open` event. Extend with a route-based fallback inside `ContactModal` using `useLocation`:

```text
/services/cinematography → ["Aerial Cinematography"]
/services/fpv            → ["FPV Production"]
/services/real-estate    → ["Real Estate"]
/work                    → [] (browsing, don't presume)
/                        → [] (top of funnel)
/about                   → []
```

Only seed from route when `initialServices` is empty. Existing event-based seeding wins.

## 3. Ghost prompt in the Project textarea

Replace the current placeholder with copy that dissolves the blank-page freeze *and* dispels the "is this a sales call?" fear:

> *A few sentences is plenty — Toby will ask the rest on a 20-minute call.*

Render as an actual `placeholder` (already supported by `Field`), no behavior change. Brand voice, not Temu-cheerful.

## 4. Response-time promise next to the CTA

Directly above the submit button, a single `t-meta text-muted-foreground` line:

> *Toby replies within 1 business day, every time.*

Same `animate-fade-up` cascade (delay 330ms, slotted between Phone field and the submit row's existing 360ms).

## 5. Email trust micro-copy

Under the Email input (inside the `Field` slot, below the underline), a `t-micro text-muted-foreground/70` line:

> *Never shared. Never spammed.*

Implementation: add an optional `hint?: string` prop to `Field`. Renders a 12px-spaced line below the underline only when provided.

## 6. 3-step success ladder

Replace the current success paragraph with a numbered timeline:

```text
01   Brief received          just now
02   Toby replies            within 1 business day
03   20-min discovery call   booked in the reply
```

Layout: vertical stack, each row = `t-eyebrow` number · `t-body` action · `t-meta text-muted-foreground` timing, separated by 1px hairlines at 15% opacity. Below it, the existing "If it's urgent, call…" fallback survives but condenses to one line.

## 7. Sticky mobile CTA once Name + Email are valid

Below `lg`, add a fixed bottom bar that appears when `name.trim().length > 1 && /\S+@\S+\.\S+/.test(email)`:

- Position: `fixed bottom-0 inset-x-0 z-[110]`
- Backdrop: `bg-background/85 backdrop-blur-md border-t border-border`
- Padding: `px-6 py-3` + `env(safe-area-inset-bottom)`
- Content: same `btn-primary` "Send brief →" plus the 1-business-day promise as a `t-micro` line above it
- Tapping it programmatically submits the form (or scrolls to the inline submit if validation fails on Project field)
- Hidden on `lg:` and when `status === "sent"`
- Slide-up entrance via `translate-y-full → 0` on the validity flip

The inline submit stays — sticky is an *additional* surface, not a replacement, so desktop keyboard users aren't affected.

## 8. CTA copy

Keep "Begin the conversation" on desktop (brand). Sticky mobile bar uses the punchier "Send brief →" — tighter for thumb-zone.

---

## Voice guardrails (so this doesn't drift Temu)

- No exclamation marks. No emoji. No countdowns. No "Hurry."
- Numbers stay editorial (`01 02 03`, never `1. 2. 3.`).
- Trust lines are statements, never reassurances ("Never shared. Never spammed." not "Don't worry, we'll never spam you!").
- All new copy uses existing `.t-*` classes — no raw Tailwind type utilities.

## Files touched

- `src/components/fly4media/ContactModal.tsx` (all eight changes + `Field` gains an optional `hint` prop)

No CSS additions. No schema changes. No new packages.

## Verification

- Cold load on mobile (375px): chips scroll-snap cleanly, sticky CTA hidden until Name+Email valid, then slides up.
- Tablet (820px): grouped chips wrap to 2 rows max per group, no overflow.
- Desktop (1280px): three chip groups read as labeled columns of taste, response-time promise sits inline above CTA.
- Submit flow: success state renders the 3-step ladder, hairlines render at 15% opacity.
- Open the modal from `/services/fpv` → "FPV Production" chip is pre-selected. Open from `/` → no chips selected.
