/**
 * PERSONA REGISTRY — Master index, task routing, and quality filter pipeline.
 *
 * This file is the unified control plane for every persona defined across
 * the project. It does NOT redefine or modify any persona — it imports them
 * and layers a registry, task map, filter pipeline, conflict hierarchy,
 * and decision audit template on top.
 *
 * Cross-references:
 *   - src/data/ux-personas.ts   → 13 UX/design personas
 *   - src/data/persona.ts       → 6 copy/narrative exports
 *   - src/data/questionnaire.ts  → theological filters, event details
 *   - src/data/wireframe.ts      → page structure, section order
 *
 * CONSTRAINT: This file is READ-ONLY reference data. It governs how
 * decisions are filtered and audited. It does not render UI or change
 * any visual output.
 */

// ─────────────────────────────────────────────
// IMPORTS — every persona, unmodified
// ─────────────────────────────────────────────

import {
  NAVIGATION_ARCHITECT,
  FOOTER_ARCHITECT,
  HUB_PAGE_DIRECTOR,
  BENTO_CARD_DESIGNER,
  SUBPAGE_EDITOR,
  HERO_EXPERIENCE_LEAD,
  VISUAL_IDENTITY_GUARDIAN,
  MOBILE_EXPERIENCE_LEAD,
  PERFORMANCE_ENGINEER,
  MASTER_CRAFTSPERSON,
  BRAND_IDENTITY_ARCHITECT,
  FRONTEND_DESIGN_SYSTEMS_ENGINEER,
  MICRO_INTERACTION_CHOREOGRAPHER,
} from "./ux-personas";

import {
  ROLE,
  VOICE,
  NARRATIVE_FRAMEWORK,
  TECHNIQUES,
  APPROACH,
  MEASUREMENT,
} from "./persona";

import {
  CHRISTIAN_DESIGN_PHILOSOPHY,
  TASK_PHILOSOPHY_MAP,
} from "./christian-design-philosophy";

// ═══════════════════════════════════════════════════════════════
// A. PERSONA REGISTRY
// ═══════════════════════════════════════════════════════════════
// Complete enumeration of every persona with domain, scope, and
// governed files. This is the single source of truth for "who
// owns what" across the entire site.

export const PERSONA_REGISTRY = {
  // ── UX / Design Personas ──────────────────────────────────

  MASTER_CRAFTSPERSON: {
    ref: MASTER_CRAFTSPERSON,
    domain: "Site-wide philosophy, overarching UX vision",
    scope: "ALL decisions — every persona inherits from this one",
    governedFiles: ["ALL"],
    tier: 1 as const,
    description:
      "The apex persona. 50+ years across Fantasy, Igloo, Pentagram, IDEO, " +
      "AKQA, Huge, Wolff Olins, B-Reel, MetaDesign, Work & Co. Every design " +
      "and UX decision is filtered through this persona's philosophy first.",
  },

  BRAND_IDENTITY_ARCHITECT: {
    ref: BRAND_IDENTITY_ARCHITECT,
    domain: "Brand truth, verbal identity, visual consistency",
    scope: "ALL files — tone, language, imagery, multi-church unity",
    governedFiles: ["ALL"],
    tier: 2 as const,
    description:
      "Guards the Worship in the Park brand identity. 5-question decision " +
      "filter, forbidden/preferred word lists, documentary-over-staged " +
      "imagery, multi-church unity voice.",
  },

  NAVIGATION_ARCHITECT: {
    ref: NAVIGATION_ARCHITECT,
    domain: "Header, navigation, mobile nav, nav hierarchy",
    scope: "Header.tsx and all navigation patterns",
    governedFiles: ["src/components/Header.tsx", "src/components/NavLink.tsx"],
    tier: 3 as const,
    description:
      "Owns the top nav, mobile hamburger, active states, link hierarchy, " +
      "transparent/solid modes, and all navigation interaction patterns.",
  },

  FOOTER_ARCHITECT: {
    ref: FOOTER_ARCHITECT,
    domain: "Footer layout, link grouping, closing impression",
    scope: "Footer.tsx and footer-related patterns",
    governedFiles: ["src/components/Footer.tsx"],
    tier: 3 as const,
    description:
      "Owns footer structure, link grouping strategy, closing copy, " +
      "email display, event date repetition, and nav-footer integration.",
  },

  HERO_EXPERIENCE_LEAD: {
    ref: HERO_EXPERIENCE_LEAD,
    domain: "Hero sections, full-viewport introductions",
    scope: "Homepage hero and any full-bleed hero section",
    governedFiles: ["src/pages/Index.tsx"],
    tier: 3 as const,
    description:
      "Owns hero composition — image layering, text positioning, CTA " +
      "placement, overlay opacity, scroll cues, and cinematic pacing.",
  },

  VISUAL_IDENTITY_GUARDIAN: {
    ref: VISUAL_IDENTITY_GUARDIAN,
    domain: "Color, typography, spacing, imagery rules",
    scope: "Design tokens and visual consistency across all files",
    governedFiles: ["src/index.css", "tailwind.config.ts"],
    tier: 3 as const,
    description:
      "Owns the design system's visual foundation — HSL color tokens, " +
      "font stacks, spacing scale, border radii, shadow definitions, " +
      "and imagery treatment rules.",
  },

  HUB_PAGE_DIRECTOR: {
    ref: HUB_PAGE_DIRECTOR,
    domain: "Hub page structure, intro copy, bento grid flow",
    scope: "HubPage.tsx and hub-level page patterns",
    governedFiles: ["src/components/HubPage.tsx"],
    tier: 3 as const,
    description:
      "Owns hub page layout — section intro pacing, grid configuration, " +
      "card ordering strategy, and the transition from intro to grid.",
  },

  BENTO_CARD_DESIGNER: {
    ref: BENTO_CARD_DESIGNER,
    domain: "Card hierarchy, description density, icon meaning",
    scope: "BentoCard.tsx and card-based UI patterns",
    governedFiles: ["src/components/BentoCard.tsx"],
    tier: 3 as const,
    description:
      "Owns card design — icon selection rationale, title/description " +
      "density, hover states, chevron reveal, and border-top accent.",
  },

  SUBPAGE_EDITOR: {
    ref: SUBPAGE_EDITOR,
    domain: "Breadcrumb flow, section pacing, content depth",
    scope: "SubPage.tsx and all leaf-level content pages",
    governedFiles: ["src/components/SubPage.tsx"],
    tier: 3 as const,
    description:
      "Owns subpage structure — breadcrumb navigation, heading hierarchy, " +
      "section spacing rhythm, and content density management.",
  },

  MOBILE_EXPERIENCE_LEAD: {
    ref: MOBILE_EXPERIENCE_LEAD,
    domain: "Mobile breakpoints, touch targets, responsive adaptation",
    scope: "All components at < 768px breakpoint",
    governedFiles: ["ALL (mobile breakpoints)"],
    tier: 4 as const,
    description:
      "Ensures every component is thumb-friendly, readable, and " +
      "performant on mobile. No hover-only interactions. Touch targets " +
      "≥ 44px. Simplified motion on small screens.",
  },

  PERFORMANCE_ENGINEER: {
    ref: PERFORMANCE_ENGINEER,
    domain: "Speed, rendering, build config, asset pipeline",
    scope: "All files — Core Web Vitals, bundle size, frame budgets",
    governedFiles: ["ALL"],
    tier: 4 as const,
    description:
      "Guards performance — 60fps animation targets, < 16.7ms frame " +
      "budgets, lazy loading, code splitting, image optimization, " +
      "and dependency weight vigilance.",
  },

  FRONTEND_DESIGN_SYSTEMS_ENGINEER: {
    ref: FRONTEND_DESIGN_SYSTEMS_ENGINEER,
    domain: "Architecture, design tokens, dependency policy, stack lock",
    scope: "All files — structural integrity and engineering standards",
    governedFiles: ["ALL"],
    tier: 4 as const,
    description:
      "Enforces the technology stack lock (React + Vite + Tailwind + " +
      "shadcn/ui + Framer Motion), dependency addition policy, design " +
      "token usage (no raw color values), and component architecture.",
  },

  MICRO_INTERACTION_CHOREOGRAPHER: {
    ref: MICRO_INTERACTION_CHOREOGRAPHER,
    domain: "Animation, motion, scroll choreography, transitions",
    scope: "ScrollReveal, PageTransition, hover states, page transitions",
    governedFiles: [
      "src/components/ScrollReveal.tsx",
      "src/components/PageTransition.tsx",
      "src/components/BentoCard.tsx",
    ],
    tier: 3 as const,
    description:
      "The scroll choreography bible. Owns all motion — scroll reveals, " +
      "page transitions, hover animations, stagger sequences, easing " +
      "curves, and the complete research archive (NNG, Lenis, Igloo Inc).",
  },

  // ── Copy / Narrative Personas ─────────────────────────────

  COPY_ROLE: {
    ref: ROLE,
    domain: "Storytelling identity, method, constraints",
    scope: "All text content — the narrative steward's identity",
    governedFiles: ["ALL (copy only)"],
    tier: 2 as const,
    description:
      "Master storyteller identity. Defines the method (page by page, " +
      "section by section) and the constraint (every word filtered " +
      "through questionnaire, wireframe, and brand identity).",
  },

  COPY_VOICE: {
    ref: VOICE,
    domain: "Voice personality, tone-by-context, forbidden/preferred words",
    scope: "All text content — tone and word-level governance",
    governedFiles: ["ALL (copy only)"],
    tier: 2 as const,
    description:
      "Warm, sincere, unhurried, scripture-anchored, bold without " +
      "spectacle, plainspoken. Forbidden words list. Preferred words " +
      "list. Tone rules per context (hero, logistics, spiritual, CTA, FAQ).",
  },

  COPY_NARRATIVE_FRAMEWORK: {
    ref: NARRATIVE_FRAMEWORK,
    domain: "5-step narrative arc, page-by-page application",
    scope: "All text content — structural narrative flow",
    governedFiles: ["ALL (copy only)"],
    tier: 2 as const,
    description:
      "Problem → Empathy → Insight → Transformation → Proof. Each " +
      "page has a prescribed emphasis (home = Problem + Transformation, " +
      "vision = Insight-led, faith = Problem + Empathy, etc.).",
  },

  COPY_TECHNIQUES: {
    ref: TECHNIQUES,
    domain: "Emotional resonance, sensory language, story archetypes",
    scope: "All text content — craft-level writing techniques",
    governedFiles: ["ALL (copy only)"],
    tier: 3 as const,
    description:
      "Sensory language (grass, voices, sun, mountains), contrasts " +
      "and tension, Caregiver + Community archetypes, rhythm and " +
      "pacing, reflective questions, and radical specificity.",
  },

  COPY_APPROACH: {
    ref: APPROACH,
    domain: "Page-by-page process, hard constraints",
    scope: "All text content — operational methodology",
    governedFiles: ["ALL (copy only)"],
    tier: 3 as const,
    description:
      "8-step process for upgrading copy. Hard constraints: no design " +
      "changes, no layout changes, no new sections, no forbidden words, " +
      "permission language always, invitation not proclamation.",
  },

  COPY_MEASUREMENT: {
    ref: MEASUREMENT,
    domain: "Quality tests for all copy",
    scope: "All text content — pass/fail quality gates",
    governedFiles: ["ALL (copy only)"],
    tier: 2 as const,
    description:
      "5 tests every piece of copy must pass: Core test (clearer, " +
      "easier, more unified, more trustworthy), 5-second test, " +
      "read-aloud test, seeker-safe test, believer-depth test.",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// B. TASK → PERSONA MAP
// ═══════════════════════════════════════════════════════════════
// For every type of change that can be made to the site, this map
// defines WHICH personas MUST be consulted. No exceptions.
// Order matters — earlier personas in the array are consulted first.

export type TaskType =
  | "navigation_change"
  | "footer_change"
  | "hero_change"
  | "hub_page_change"
  | "subpage_change"
  | "copy_change"
  | "styling_change"
  | "animation_change"
  | "new_component"
  | "new_page"
  | "performance_change"
  | "accessibility_change"
  | "design_system_change"
  | "image_change"
  | "layout_change";

type PersonaId = keyof typeof PERSONA_REGISTRY;

export const TASK_PERSONA_MAP: Record<TaskType, PersonaId[]> = {
  navigation_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "NAVIGATION_ARCHITECT",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],

  footer_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "FOOTER_ARCHITECT",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],

  hero_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "HERO_EXPERIENCE_LEAD",
    "VISUAL_IDENTITY_GUARDIAN",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],

  hub_page_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "HUB_PAGE_DIRECTOR",
    "BENTO_CARD_DESIGNER",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],

  subpage_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "SUBPAGE_EDITOR",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
  ],

  copy_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "COPY_ROLE",
    "COPY_VOICE",
    "COPY_NARRATIVE_FRAMEWORK",
    "COPY_TECHNIQUES",
    "COPY_APPROACH",
    "COPY_MEASUREMENT",
  ],

  styling_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "VISUAL_IDENTITY_GUARDIAN",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
  ],

  animation_change: [
    "MASTER_CRAFTSPERSON",
    "MICRO_INTERACTION_CHOREOGRAPHER",
    "PERFORMANCE_ENGINEER",
    "MOBILE_EXPERIENCE_LEAD",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
  ],

  new_component: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "VISUAL_IDENTITY_GUARDIAN",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],

  new_page: [
    // ALL personas consulted for new pages
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "NAVIGATION_ARCHITECT",
    "FOOTER_ARCHITECT",
    "HERO_EXPERIENCE_LEAD",
    "VISUAL_IDENTITY_GUARDIAN",
    "HUB_PAGE_DIRECTOR",
    "BENTO_CARD_DESIGNER",
    "SUBPAGE_EDITOR",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
    "COPY_ROLE",
    "COPY_VOICE",
    "COPY_NARRATIVE_FRAMEWORK",
    "COPY_TECHNIQUES",
    "COPY_APPROACH",
    "COPY_MEASUREMENT",
  ],

  performance_change: [
    "MASTER_CRAFTSPERSON",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
  ],

  accessibility_change: [
    "MASTER_CRAFTSPERSON",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "NAVIGATION_ARCHITECT",
    "FOOTER_ARCHITECT",
  ],

  design_system_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "VISUAL_IDENTITY_GUARDIAN",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
  ],

  image_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "VISUAL_IDENTITY_GUARDIAN",
    "HERO_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "MOBILE_EXPERIENCE_LEAD",
  ],

  layout_change: [
    "MASTER_CRAFTSPERSON",
    "BRAND_IDENTITY_ARCHITECT",
    "VISUAL_IDENTITY_GUARDIAN",
    "MOBILE_EXPERIENCE_LEAD",
    "PERFORMANCE_ENGINEER",
    "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
    "MICRO_INTERACTION_CHOREOGRAPHER",
  ],
} as const;

// ═══════════════════════════════════════════════════════════════
// C. QUALITY FILTER PIPELINE
// ═══════════════════════════════════════════════════════════════
// A mandatory 7-stage gate that EVERY plan, decision, or change
// must pass through. Stages are sequential — failure at any stage
// halts progression until resolved.
//
// This pipeline is the core mechanism that ensures consistency
// and world-class quality across every pixel, word, and interaction.

export const QUALITY_FILTER_PIPELINE = {
  description:
    "Every decision — from a single word change to a full page build — " +
    "passes through all 7 stages in order. A decision cannot proceed " +
    "past a stage until it satisfies that stage's criteria. This is " +
    "not optional. This is the quality standard.",

  stages: [
    // ── STAGE 0: Christian Design Philosophy Gate ─────────────
    // This is the FOUNDATIONAL layer. Every decision passes through
    // the Colours & Shapes Christian design theology BEFORE reaching
    // any task-specific persona logic.
    {
      stage: 0,
      name: "CHRISTIAN_DESIGN_PHILOSOPHY Gate",
      persona: "CHRISTIAN_DESIGN_PHILOSOPHY (Stage 0 — foundational layer)",
      source: "Colours & Shapes methodology + liturgical theology + Mission Lab UX",
      purpose:
        "Does this decision honor the Christian design theology that " +
        "underpins every pixel, word, and interaction on the site?",
      criteria: [
        "Does this pass the CHRISTIAN_DESIGN_FOUNDATION mission pillars (Elevate Human Experience, Brand Truth, Innovate Responsibly)?",
        "Does the color usage respect liturgical theological vocabulary (see theologicalColorVocabulary)?",
        "Does the first impression satisfy the 17–50ms science (simple, familiar, warm)?",
        "Are CHRISTIAN_BOUNDARIES respected — all 15 'never do' rules intact?",
        "Has the TASK_PHILOSOPHY_MAP been consulted to apply the correct principle set(s) for this task type?",
        "Does symbolism (cross, thorns, dove) honor the gravity of what it represents — not decoration?",
        "Would Colours & Shapes recognize this as Christian-centered design excellence?",
      ],
      philosophyRef: CHRISTIAN_DESIGN_PHILOSOPHY,
      taskPhilosophyMap: TASK_PHILOSOPHY_MAP,
      failAction:
        "STOP. This decision violates the foundational Christian design " +
        "theology. Consult the specific principle set from TASK_PHILOSOPHY_MAP " +
        "for this task type and resolve the violation before proceeding.",
    },

    // ── STAGE 1: Philosophy Gate ──────────────────────────────
    {
      stage: 1,
      name: "MASTER_CRAFTSPERSON Gate",
      persona: "MASTER_CRAFTSPERSON",
      purpose: "Does this decision embody world-class craft?",
      criteria: [
        "Does this elevate the human experience of the person visiting?",
        "Does it embody brand truth with excellence — not decoration?",
        "Does it innovate responsibly, serving impact over novelty?",
        "Would this decision survive scrutiny at Fantasy, Pentagram, or IDEO?",
        "Does it demonstrate the 'deep before wide' principle — substance over breadth?",
        "Is this the simplest, most elegant solution to the problem?",
      ],
      failAction:
        "STOP. Rethink the approach from first principles. The Master " +
        "Craftsperson's philosophy is non-negotiable.",
    },

    // ── STAGE 2: Brand Truth Gate ─────────────────────────────
    {
      stage: 2,
      name: "BRAND_IDENTITY_ARCHITECT Gate",
      persona: "BRAND_IDENTITY_ARCHITECT",
      purpose: "Does this honor the Worship in the Park brand?",
      criteria: [
        "Does this pass the 5-question brand decision filter?",
        "Does the copy pass verbal identity checks (no forbidden words, correct tone-by-page)?",
        "Does imagery follow documentary-over-staged principles?",
        "Does it honor multi-church unity without favoring any single church?",
        "Is the brand expression 'invitation not proclamation' (2-3 on 1-10 scale)?",
        "Would a first-time visitor feel welcomed, not marketed to?",
      ],
      failAction:
        "REVISE copy/imagery through the brand identity filters. Re-check " +
        "forbidden word list and tone-by-context rules.",
    },

    // ── STAGE 3: Domain Expertise Gate ────────────────────────
    {
      stage: 3,
      name: "Domain Persona(s) Gate",
      persona: "TASK_PERSONA_MAP lookup",
      purpose: "Does this satisfy the specific domain expert(s)?",
      criteria: [
        "Look up the task type in TASK_PERSONA_MAP to identify relevant domain personas",
        "Apply every constraint, pattern, and anti-pattern from each relevant persona",
        "Check that governed files match — don't let a nav change leak into footer territory",
        "Verify no persona's HARD constraints are violated (e.g., stack lock, forbidden words)",
        "Confirm the change follows the persona's prescribed patterns, not just avoids anti-patterns",
        "Cross-reference with the persona's QA plan if one exists",
      ],
      failAction:
        "IDENTIFY which domain persona's constraint was violated. Fix the " +
        "specific violation before proceeding.",
    },

    // ── STAGE 4: Performance Gate ─────────────────────────────
    {
      stage: 4,
      name: "PERFORMANCE_ENGINEER Gate",
      persona: "PERFORMANCE_ENGINEER",
      purpose: "Does this maintain or improve site performance?",
      criteria: [
        "Core Web Vitals impact: will LCP, FID, CLS be affected?",
        "Bundle size impact: does this add dependencies or increase JS payload?",
        "Animation frame budget: do animations stay within 16.7ms per frame?",
        "Are images optimized and lazy-loaded where appropriate?",
        "Is code-splitting maintained for route-based loading?",
        "Would this change degrade performance on a mid-range Android device?",
      ],
      failAction:
        "OPTIMIZE. Reduce bundle impact, defer loading, compress assets, " +
        "or simplify animations until performance criteria are met.",
    },

    // ── STAGE 5: Mobile Gate ──────────────────────────────────
    {
      stage: 5,
      name: "MOBILE_EXPERIENCE_LEAD Gate",
      persona: "MOBILE_EXPERIENCE_LEAD",
      purpose: "Does this work beautifully on mobile?",
      criteria: [
        "Touch targets ≥ 44px on all interactive elements?",
        "Text readable without zooming (≥ 14px body, ≥ 18px headings)?",
        "No hover-only interactions — everything accessible via tap?",
        "Thumb-friendly placement of primary actions (lower 60% of screen)?",
        "Animations simplified or disabled for mobile (prefers-reduced-motion)?",
        "Layout adapts gracefully — no horizontal scroll, no cramped spacing?",
      ],
      failAction:
        "ADAPT for mobile. Add responsive breakpoints, increase touch " +
        "targets, or provide tap alternatives for hover interactions.",
    },

    // ── STAGE 6: Architecture Gate ────────────────────────────
    {
      stage: 6,
      name: "FRONTEND_DESIGN_SYSTEMS_ENGINEER Gate",
      persona: "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
      purpose: "Does this respect the architecture and design system?",
      criteria: [
        "Stack lock respected: React + Vite + Tailwind + shadcn/ui + Framer Motion?",
        "Dependency policy followed: no new deps without explicit justification?",
        "Design tokens used — no raw color values (hex/rgb) in components?",
        "Component architecture maintained: small, focused, single-responsibility?",
        "TypeScript types properly defined — no 'any' types?",
        "File organization follows established patterns (pages/, components/, data/)?",
      ],
      failAction:
        "REFACTOR to align with architecture rules. Replace raw values " +
        "with design tokens. Remove unauthorized dependencies.",
    },

    // ── STAGE 7: Copy Gate ────────────────────────────────────
    {
      stage: 7,
      name: "Copy Filter Gate",
      persona: "COPY_ROLE + COPY_VOICE + COPY_NARRATIVE_FRAMEWORK + COPY_MEASUREMENT",
      purpose: "Does the text meet narrative and voice standards?",
      appliesWhen: "Any text content is added or modified",
      criteria: [
        "VOICE rules applied: warm, sincere, unhurried, scripture-anchored?",
        "No forbidden words used (biggest, epic, life-changing, festival, concert, etc.)?",
        "Preferred words favored (together, churches, Jesus, presence, Cochrane, etc.)?",
        "Narrative framework applied: correct step emphasis for the page type?",
        "Read-aloud test: does it sound like a trusted friend, not a brochure?",
        "Seeker-safe test: would someone with no church background feel welcomed?",
        "Believer-depth test: would a mature believer find substance here?",
        "Core test: clearer, easier to attend, more visibly unified, more trustworthy?",
      ],
      failAction:
        "REWRITE copy through the persona.ts filters. Check forbidden " +
        "word list. Re-apply narrative framework for the specific page type.",
    },
  ],
} as const;

// ═══════════════════════════════════════════════════════════════
// D. CONFLICT RESOLUTION HIERARCHY
// ═══════════════════════════════════════════════════════════════
// When two personas produce contradictory guidance, this hierarchy
// determines which persona's recommendation takes precedence.
// Lower tier number = higher authority.

export const CONFLICT_RESOLUTION_HIERARCHY = {
  description:
    "Personas occasionally produce competing recommendations. For example, " +
    "MICRO_INTERACTION_CHOREOGRAPHER may want a complex parallax effect " +
    "that PERFORMANCE_ENGINEER flags as too expensive, or VISUAL_IDENTITY_GUARDIAN " +
    "may prefer a color that BRAND_IDENTITY_ARCHITECT considers off-brand. " +
    "This hierarchy resolves those conflicts decisively.",

  tiers: [
    {
      tier: 1,
      personas: ["MASTER_CRAFTSPERSON"],
      authority: "ABSOLUTE — overarching philosophy always wins",
      rationale:
        "The Master Craftsperson embodies the foundational values that every " +
        "other persona is built upon. If a decision conflicts with the core " +
        "philosophy (elevate human experience, brand truth, responsible innovation), " +
        "the philosophy prevails.",
    },
    {
      tier: 2,
      personas: [
        "BRAND_IDENTITY_ARCHITECT",
        "COPY_ROLE",
        "COPY_VOICE",
        "COPY_NARRATIVE_FRAMEWORK",
        "COPY_MEASUREMENT",
      ],
      authority: "BRAND TRUTH — brand identity > aesthetic preference",
      rationale:
        "The brand is the soul of the event. A visually stunning decision that " +
        "violates brand truth (wrong tone, forbidden language, church favoritism) " +
        "is worse than a simpler decision that honors the brand.",
    },
    {
      tier: 3,
      personas: [
        "NAVIGATION_ARCHITECT",
        "FOOTER_ARCHITECT",
        "HERO_EXPERIENCE_LEAD",
        "VISUAL_IDENTITY_GUARDIAN",
        "HUB_PAGE_DIRECTOR",
        "BENTO_CARD_DESIGNER",
        "SUBPAGE_EDITOR",
        "MICRO_INTERACTION_CHOREOGRAPHER",
        "COPY_TECHNIQUES",
        "COPY_APPROACH",
      ],
      authority: "DOMAIN — the domain expert wins within their governed files",
      rationale:
        "Within their specific domain (e.g., Header.tsx for NAV_ARCHITECT), " +
        "the domain persona's patterns and constraints take precedence over " +
        "general guidance from tier 4 personas. Outside their domain, they " +
        "are advisory only.",
    },
    {
      tier: 4,
      personas: [
        "MOBILE_EXPERIENCE_LEAD",
        "PERFORMANCE_ENGINEER",
        "FRONTEND_DESIGN_SYSTEMS_ENGINEER",
      ],
      authority: "ENGINEERING — serves design, but never degrades UX",
      rationale:
        "Performance and architecture are enablers, not overrides. A performant " +
        "but ugly solution is not acceptable. However, if a design decision " +
        "would cause measurable harm (> 100ms frame drops, > 50KB bundle increase, " +
        "WCAG violation), the engineering persona can veto and request alternatives.",
      escalationRight:
        "Tier 4 personas have VETO POWER when measurable thresholds are " +
        "exceeded. The veto escalates the decision to Tier 1 for final ruling.",
    },
  ],

  resolutionProcess: [
    "1. Identify the conflicting recommendations and which personas produced them",
    "2. Look up each persona's tier in the hierarchy",
    "3. The lower-tier (higher-authority) persona's recommendation wins",
    "4. If both personas are in the same tier, the one with file governance wins",
    "5. If same tier and same governance scope, escalate to Tier 1 for ruling",
    "6. Document the conflict and resolution in the DECISION_AUDIT_TEMPLATE",
  ],
} as const;

// ═══════════════════════════════════════════════════════════════
// E. DECISION AUDIT TEMPLATE
// ═══════════════════════════════════════════════════════════════
// Every plan generates an audit trail showing which personas were
// consulted, what each one approved or flagged, and how conflicts
// (if any) were resolved. This is the "receipt" for quality.

export const DECISION_AUDIT_TEMPLATE = {
  description:
    "A structured checklist that accompanies every plan. It ensures " +
    "transparency and traceability — every stakeholder (persona) is " +
    "heard, every concern is addressed, and every conflict is documented.",

  template: {
    planId: "string — unique identifier for the plan or change",
    taskType: "TaskType — from TASK_PERSONA_MAP",
    filesAffected: "string[] — list of files being modified",

    pipelineResults: {
      stage0_christianDesignPhilosophy: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — which principle sets were consulted (from TASK_PHILOSOPHY_MAP) and the outcome",
      },
      stage1_masterCraftsperson: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — what was checked and the outcome",
      },
      stage2_brandIdentity: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — brand filter results",
      },
      stage3_domainPersonas: {
        personasConsulted: "PersonaId[] — which domain personas were involved",
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — domain-specific findings",
      },
      stage4_performance: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — performance impact assessment",
      },
      stage5_mobile: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — mobile readiness assessment",
      },
      stage6_architecture: {
        status: "'PASS' | 'FAIL' | 'N/A'",
        notes: "string — architecture compliance",
      },
      stage7_copy: {
        status: "'PASS' | 'FAIL' | 'SKIPPED'",
        notes: "string — copy quality results (SKIPPED if no text changes)",
      },
    },

    conflictsResolved: [
      {
        personaA: "PersonaId",
        personaB: "PersonaId",
        conflict: "string — what they disagreed on",
        winner: "PersonaId — which persona's recommendation was adopted",
        rationale: "string — why, citing the CONFLICT_RESOLUTION_HIERARCHY",
      },
    ],

    finalVerdict: "'APPROVED' | 'REVISE' | 'BLOCKED'",
    summary: "string — one-paragraph summary of the decision and its quality gate results",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// F. HELPER: Get personas for a task
// ═══════════════════════════════════════════════════════════════

export function getPersonasForTask(taskType: TaskType): PersonaId[] {
  return TASK_PERSONA_MAP[taskType];
}

export function getPersonaDetail(personaId: PersonaId) {
  return PERSONA_REGISTRY[personaId];
}

export function getAllPersonaIds(): PersonaId[] {
  return Object.keys(PERSONA_REGISTRY) as PersonaId[];
}
