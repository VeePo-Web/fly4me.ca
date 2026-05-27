# Remove all "licensed / insured / certified" operator claims

The site currently advertises pilot licensing, insurance, and RPAS / Transport Canada Advanced certification in several places. None of these are accurate right now. I'll strip every operator-credential claim from the site. Music licensing wording (e.g. "licensed music", "sync licence") is a different thing and stays — that's about the soundtrack, not the pilot.

## What gets removed / rewritten

**src/pages/Pricing.tsx**
- Guarantee item (line 25–26): replace "Licensed, insured, RPAS Advanced-certified." + body with a non-credential trust line focused on care/reshoot policy (e.g. heading: "Weather-safe and reshoot-backed." body: "If conditions on the day won't produce footage worth delivering, we reschedule at no cost. If the final cut misses the brief, we reshoot.").
- SEO description (line 339): drop "Transport Canada RPAS Advanced certified operator." sentence.

**src/components/fly4media/PricingPackages.tsx**
- Line 60: remove the "Transport Canada RPAS Advanced operator — fully insured, legal in all airspace" row entirely.
- Line 192: remove the "RPAS Advanced licensed — legal over rural and populated airspace" row.
- Line 257: remove the "RPAS Advanced certified — legal over urban, restricted, and controlled airspace" row.
- Line 702 footer line: change "All packages include a licensed, RPAS Advanced-certified operator." to something like "Every package is delivered by Toby personally — one operator, end to end."
- Keep all "licensed music" / "music licensed" / "sync licence" rows untouched (lines 57, 71, 91, 123, 156, 203, 218, 317, 332, 351, 413).
- Keep the "insurance documentation" wording (lines 175, 177, 205, 222, 254) — that's about the client's own insurance use case for the footage, not an operator credential.

**src/components/fly4media/PricingFAQ.tsx**
- FAQ #2 answer (line 11): rewrite the "RPAS Advanced certification allows shooting over populated areas…" sentences out. Keep the music-licensing point and the finished-asset point. New closing: focus on the gap between raw files and a delivered, platform-ready edit.
- FAQ #6 answer (line 27): unchanged (only mentions licensed music).
- FAQ #10 (lines 42–43): remove the entire "What does RPAS Advanced certification mean for my project?" Q&A from the FAQS array.

**src/components/fly4media/ProcessList.tsx**
- Line 6: change "Licensed, insured, cinema-grade. And patient…" to "Cinema-grade and patient. I'd rather lose a day to weather than hand you a shot we both know is just fine."

**src/components/fly4media/Capabilities.tsx**
- Remove "Transport Canada — Advanced RPAS" and "Insured commercial operations" from the ITEMS array. Replace with two perception-first capability lines that match the existing voice, e.g. "Weather-judged shoots — patience over volume" and "End-to-end delivery — graded, scored, platform-ready." (so the grid still has 6 items and stays balanced).

## What is NOT touched

- Any wording about music being licensed / sync licences / cleared for platforms.
- Any wording about the client using footage for their own insurance documentation.
- Layout, components, styling, routing — copy-only edits.

## Files changed

- src/pages/Pricing.tsx
- src/components/fly4media/PricingPackages.tsx
- src/components/fly4media/PricingFAQ.tsx
- src/components/fly4media/ProcessList.tsx
- src/components/fly4media/Capabilities.tsx
