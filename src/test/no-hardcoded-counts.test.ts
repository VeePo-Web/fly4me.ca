/**
 * Guardrail: prevents reintroducing hardcoded counts of churches, worship
 * teams, or event hours in user-facing copy.
 *
 * Why: the number of participating churches/teams may grow or shrink. We use
 * open-ended phrases like "Churches across Cochrane", "many teams", and
 * "a full day" so copy stays evergreen.
 *
 * If you genuinely need to mention a count (rare), add the file path to
 * ALLOWED_FILES or the exact line to ALLOWED_LINES below — and document why.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = join(__dirname, "..");

// Folders/files to scan for user-facing copy.
const SCAN_DIRS = [
  join(ROOT, "pages"),
  join(ROOT, "components"),
  join(ROOT, "data"),
];

const SCAN_EXTS = new Set([".ts", ".tsx"]);

// Files we don't scan (tests, types, generated, internal-only data, this file).
const SKIP_PATTERNS = [
  /\.test\.tsx?$/,
  /\.spec\.tsx?$/,
  /\/test\//,
  /integrations\/supabase\//,
  // Internal planning/reference data — not rendered to users.
  /\/data\/(?:questionnaire|ux-personas|ux-conversion-map|persona|persona-registry|wireframe|christian-design-philosophy)\.ts$/,
];

// Files explicitly allowed to mention counts (must be justified in a comment
// in the file itself).
const ALLOWED_FILES = new Set<string>([
  // e.g. "src/pages/some-page.tsx",
]);

// Exact substring escape hatches for individual lines that are NOT counts of
// churches/teams/hours (e.g. scripture references, dates, times).
// Keep this list tight.
const ALLOWED_LINE_SUBSTRINGS: string[] = [];

// Patterns we forbid. Each entry: { pattern, label }.
// Patterns are intentionally narrow — they target copy phrasing, not arbitrary
// numerals (so JSX sizes, durations like "55-minute", years, etc. are safe).
const FORBIDDEN_PATTERNS: { pattern: RegExp; label: string }[] = [
  // Numeric counts of churches/congregations
  {
    pattern: /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:churches|congregations|partner\s+churches)\b/i,
    label: "hardcoded count of churches/congregations",
  },
  // Numeric counts of worship teams / bands
  {
    pattern: /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:worship\s+teams|worship\s+bands|teams\b(?!\s+(?:of|across)))/i,
    label: "hardcoded count of worship teams",
  },
  // "Eight teams." style copy headers
  {
    pattern: /\b(?:Eight|Seven|Six|Five|Four|Three|Two|\d+)\s+teams\b/,
    label: "hardcoded team count in copy header",
  },
  // Hour-count phrasings of the day length
  {
    pattern: /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+hours?\b/i,
    label: "hardcoded event hour count",
  },
  // "8-hour day" / "eight-hour day" hyphenated form
  {
    pattern: /\b(?:eight|seven|six|five|four|three|two|\d+)-hour\s+day\b/i,
    label: "hardcoded event-day hour count",
  },
];

function walk(dir: string): string[] {
  let out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      out = out.concat(walk(full));
    } else if (SCAN_EXTS.has(extname(name))) {
      out.push(full);
    }
  }
  return out;
}

function shouldSkip(file: string): boolean {
  if (SKIP_PATTERNS.some((re) => re.test(file))) return true;
  const rel = relative(join(ROOT, ".."), file);
  if (ALLOWED_FILES.has(rel)) return true;
  return false;
}

function findViolations() {
  const files = SCAN_DIRS.flatMap(walk);
  const violations: { file: string; line: number; text: string; label: string }[] = [];

  for (const file of files) {
    if (shouldSkip(file)) continue;
    const src = readFileSync(file, "utf8");
    const lines = src.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      // Skip pure comment lines so devs can document forbidden phrases.
      const trimmed = raw.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
      if (ALLOWED_LINE_SUBSTRINGS.some((s) => raw.includes(s))) continue;

      for (const { pattern, label } of FORBIDDEN_PATTERNS) {
        if (pattern.test(raw)) {
          violations.push({
            file: relative(join(ROOT, ".."), file),
            line: i + 1,
            text: raw.trim(),
            label,
          });
        }
      }
    }
  }
  return violations;
}

describe("user-facing copy guardrails", () => {
  it("does not contain hardcoded church/team/hour counts", () => {
    const violations = findViolations();
    if (violations.length > 0) {
      const message = [
        "Hardcoded counts found in user-facing copy.",
        "Use open-ended phrasing instead (e.g. 'Churches across Cochrane',",
        "'worship teams from churches across Cochrane', 'a full day').",
        "",
        ...violations.map(
          (v) => `  ${v.file}:${v.line}  [${v.label}]\n    ${v.text}`,
        ),
      ].join("\n");
      throw new Error(message);
    }
    expect(violations).toEqual([]);
  });
});
