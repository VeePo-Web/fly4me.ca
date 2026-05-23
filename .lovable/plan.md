
# Section 02 — "Proof, not portfolio." → fantasy.co grade

## Diagnosis (why it reads cheap right now)

1. **Five cards land at once.** The asymmetric grid is editorial in theory but on a 928px viewport it stacks into a busy column of equally-weighted images. There is no lead, no rest, no rhythm — five projects shouting at the same volume.
2. **Meta block is generic.** `01 — Category / Title / tagline / ↗` repeats five times in the same type sizes. Fantasy.co never repeats the same meta pattern five times — they vary scale per card so the eye knows which one is the headline act.
3. **Hover is flat.** Cards do nothing on hover beyond a link-underline and a tiny arrow translate. No image scale, no parallax, no meta reveal, no cursor change in register, no scrim shift. The image is inert.
4. **Section opener is abrupt.** `t-display-2` "Proof, not portfolio." sits alone with no eyebrow, no counter, no transition from the hero — it just appears. Fantasy.co always frames a section: a tiny index, a quiet line, then the statement.
5. **No connective tissue.** Between cards there is dead grid space. Fantasy.co uses index numerals (01/05, 02/05…) as spatial anchors, plus subtle horizontal rules or year tags that thread the cards into one essay rather than five posters.
6. **Reveal animation is uniform.** Every card fades up the same way at the same threshold. Fantasy.co staggers by column, varies easing per card, and lets larger cards arrive slightly later (anticipation).
7. **"View all work" CTA is timid.** Small muted text, right-aligned, easy to miss. Fantasy.co treats the section-end CTA as a moment — large type, generous space, a quiet hairline above it.

## The fix (fantasy.co register)

### A. Section framing — give it a chapter opening

Replace the lone H2 with a three-part editorial header:

```text
Selected work — 05               ← t-eyebrow, top-left, muted
                                   counter not date range
Proof,                           ← t-display-2, unchanged copy
not portfolio.
                                 ← 1px hairline, 40% width, left-aligned
Five projects. Each one shifted  ← t-lede, max-w-[36ch], muted-foreground
how a place was seen.              one quiet supporting line — no more
```

The eyebrow + counter + hairline + supporting line is the fantasy.co opening signature. It tells the eye *"a section is starting, settle in"* before the work arrives.

### B. Hierarchy — one hero, four supporting

Re-rank the 5 cards by intent (not by order):
- **Card 01** = hero card — full-bleed-ish (lg:col-span-10, lg:col-start-2), `aspect-[21/9]` cinema scope. Meta below uses `t-headline-1` (not `-2`) and the tagline gets `t-lede`.
- **Cards 02–05** = supporting — current asymmetric positions but tighter spans (max col-span-6), meta stays at `t-headline-2`, taglines drop to `t-body text-muted-foreground/70`.

The eye now has a clear lead actor. The remaining four feel like a chosen ensemble, not a wall.

### C. Card hover — earn the "cinema" claim

Replace the current near-static hover with a four-layer choreography (all CSS, no Framer):

1. **Image** — `scale(1.04)` over 900ms `var(--ease-out-quart)`. Inner overflow-hidden on `media-frame` so it stays clean.
2. **Scrim** — a `from-black/0` to `from-black/35` bottom gradient fades in over 600ms. Pulls the eye toward the title.
3. **Meta translate** — the title + tagline block translates `translateY(0)` from `translateY(8px)` and the tagline fades from `opacity-0` to `opacity-100`. At rest, only `eyebrow + title` are visible; tagline appears on hover. This is the fantasy.co reveal — the card whispers extra context only when you lean in.
4. **Arrow** — replace the standalone ↗ with a small composed lockup: a 24px circle with a hairline border that fills on hover (border-foreground/15 → bg-foreground, ↗ inverts to background). Position bottom-right of the meta row.

All four layers share the same `var(--ease-out-quart)` and stagger by 60ms so the choreography feels orchestrated, not simultaneous.

### D. Index numerals as spatial anchors

Each card gets a giant ghost numeral `01` `02` `03` `04` `05` rendered behind/beside the meta row in `t-display-1` at `opacity-[0.04] text-foreground`, positioned absolutely. Mirrors the `Services` section technique (which already works in this codebase) — it threads the section into one essay and gives empty grid space a job.

Hidden on mobile (it's spatial texture, not content).

### E. Connective hairlines

Add a 1px `border-foreground/10` horizontal rule between the section header and the grid, and another between the grid and the CTA. Two hairlines, no more — they frame the work without caging it.

### F. CTA — make it a moment

Replace the small muted right-aligned link with:

```text
                                 ← 1px hairline, full container width, foreground/10
   See all five →                ← t-headline-3, foreground (not muted), centered
   2024 — 2026                   ← t-meta, muted, centered below
```

Generous `py-20` around it. The arrow nudges 6px on hover. The year range below grounds it. This is the section's exit moment — it should feel like the end of a chapter.

### G. Stagger — orchestrated reveal

Replace uniform `useReveal` with column-aware stagger:
- Hero card (01): delay 0ms
- Card 02 (right column): delay 120ms
- Card 03 (left column): delay 80ms
- Card 04 (right column): delay 200ms
- Card 05 (center-wide): delay 160ms

The larger/wider cards arrive slightly later — creates anticipation, the eye reads the smaller cards first and the wide ones land as punctuation.

### H. Motion register on scroll

Add a subtle parallax to card images via `--scroll-y` CSS var (already-established pattern if Hero uses it; otherwise a 12-line `useParallax` hook). Each image translates `translateY(-8px → +8px)` across its viewport pass. Very subtle — fantasy.co's parallax is always *barely there*.

If parallax is too much scope, skip it. The hover choreography and stagger alone get us most of the way.

## Files to touch

- `src/components/fly4media/FeaturedWork.tsx` — restructure header, re-rank cards (hero + 4), rewrite ProjectCard meta layout, add ghost numerals, new CTA block, column-aware stagger via `--reveal-delay` inline style.
- `src/index.css` — add `.card-hover-group` utility (scale + scrim + meta translate orchestration), `.cta-moment` utility for the exit block, optional `.card-arrow-circle` for the bottom-right lockup.
- `src/components/fly4media/CinematicMedia.tsx` — verify the inner `<img>` accepts a hover-driven `scale` transform without breaking video swap-in (read first, then minimal patch).

No data changes (`projects.ts` stays as-is). No new dependencies.

## Open questions

1. **Hero card pick** — should the lead card be project[0] (current order) or do you want to manually nominate which project earns the hero slot? Some studios put their most recognizable client first; others put their most cinematic shot.
2. **Tagline on hover only** — okay to hide taglines at rest and reveal on hover, or should they stay visible (current behavior) so the section reads at a glance without interaction?
3. **Ghost numerals** — `01–05` (matches `projects.ts` `.number` field) or roman/larger format `001 / 005`? Fantasy.co tends toward the latter; this site has used `01` so far.
4. **Parallax** — include the subtle image parallax (Section H) or skip it for this pass and keep motion to hover + stagger only?
