Replace the GPS coordinate in the hero with a subtle client testimonial, same visual weight and slot.

## The change

In `src/components/fly4media/Hero.tsx`, replace the coordinate span (currently `N 51.04° W 114.07°`) with:

> "Looked like a film. Moved like a sales tool." — Joe, Cochrane, AB

## Why this quote works

It dispels the two biggest client fears in one line:
- **"It'll look like generic drone B-roll"** → "Looked like a film."
- **"Pretty footage, no result"** → "Moved like a sales tool."

Editorial, restrained, no agency adjectives. Reads as overheard, not advertised.

## Visual treatment (unchanged from the coordinate)

- Same wrapper: `hidden md:flex items-end justify-between shrink-0 animate-fade-up`
- Same delay: `d(600)`
- Same classes on the quote: `t-micro text-background/25 tracking-[0.18em]`
- Attribution sits on the same line, same styling — em-dash separator, no role/title
- Smart quotes (`"` `"`) and em-dash (`—`), thin spaces around the dash for editorial breathing room

## Markup

```tsx
<span className="t-micro text-background/25 tracking-[0.18em]">
  &ldquo;Looked like a film. Moved like a sales tool.&rdquo;
  &thinsp;&mdash;&thinsp;Joe, Cochrane, AB
</span>
```

No other file changes. No CSS, no new tokens, no layout shift.