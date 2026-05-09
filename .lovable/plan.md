## ContactModal — mobile stacked layout

Current mobile state: brand panel takes 42vh of cinematic space before the form starts, pushing the title and fields below the fold. The desktop split is excellent; mobile needs a compact cinematic header that establishes brand in one glance, then hands the screen to a tactile form.

### Mobile (<768px) changes

**Compact cinematic header (replaces 42vh aside):**
- Height: `h-[34vh]` min `220px`, max `280px`. Stays cinematic but never dominates.
- Same image + tonal wash + grain layers (kept for atmosphere).
- Inside, a single editorial stack at the bottom-left:
  - Eyebrow: `Fly4MEdia · A private consultation` (one line, tracking 0.28em).
  - Title shrinks to `text-[28px] leading-[1.05]` — "Let's create something cinematic." (kept; balances).
- Removes the long descriptive paragraph and the `hello@…` / Alberta block on mobile (those move to a subtle footer line under the form's submit button).
- Close button (X) repositions to top-right of the **header** on mobile so it's always reachable from the thumb zone without competing with the form's first field.

**Form panel polish on mobile:**
- Drops `min-h-screen` (it stacks now, would create dead space).
- Reduces vertical padding: `py-10` instead of `py-16`.
- `px-6` instead of `px-8` for more field width on small screens.
- Section eyebrow "Start a project" + h3 "Tell us about your vision." stay, with `mb-8` instead of `mb-12`.
- Field label spacing: `mb-2` on mobile (was `mb-3`).
- Field font: keep `text-base` (16px — prevents iOS zoom on focus), bumps to `text-lg` ≥ md.
- Submit button stays full-width on mobile (already is via `w-full sm:w-auto`).
- New mobile-only footer line under the submit: `hello@fly4media.com · Alberta, Canada` in `text-[11px]` muted, replacing the info that was removed from the header.

**Scrolling:**
- Outer scroll container already handles overflow. With the compact header (~260px) + form, the title + first two fields land above the fold on a 390×844 viewport.

**Accessibility:**
- `aria-labelledby` still points to the header h2 (unchanged id).
- Close button gets a duplicate at top-right of the header on mobile (md:hidden). The existing close in the form panel becomes `hidden md:block`. One visible X at a time, always thumb-reachable.
- Focus order: X → Name → Email → Project → Submit. Initial focus stays on Name (after 320ms autofocus) so the keyboard opens predictably.

**Desktop (≥768px):** zero visual change. All edits are gated by `md:` breakpoints.

### Files

- `src/components/fly4media/ContactModal.tsx` — single file, only Tailwind class adjustments + restructuring of the mobile X button and footer line. No new dependencies, no new components.

### Out of scope

- Reduced-motion (already covered globally).
- Form validation polish, real email backend, success animation changes.
- Any change to the desktop split.
