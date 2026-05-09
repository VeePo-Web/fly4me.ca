/**
 * CHRISTIAN DESIGN PHILOSOPHY — Bespoke persona layer derived from
 * Colours & Shapes methodology, academic UX research, liturgical
 * color theology, and church digital experience best practices.
 *
 * This file is the FOUNDATIONAL FILTER (Stage 0) in the quality
 * pipeline. Every persona inherits from these principles. Every
 * decision — nav, hero, footer, copy, motion, color — passes
 * through the relevant principle set BEFORE reaching task-specific
 * persona logic.
 *
 * Cross-references:
 *   - src/data/persona-registry.ts  → wired as Stage 0 in QUALITY_FILTER_PIPELINE
 *   - src/data/ux-personas.ts       → 13 UX personas that inherit these principles
 *   - src/data/persona.ts           → copy persona that inherits CONTENT_PRINCIPLES
 *   - src/data/questionnaire.ts     → theological filters, event details
 *   - src/data/wireframe.ts         → page structure, section order
 *
 * CONSTRAINT: This file is READ-ONLY reference data. It governs
 * philosophy and decision-making criteria. It does not render UI.
 *
 * SOURCE: "Designing Christian-Centered Experiences: UI/UX and Visual
 * Design Principles Inspired by Colours & Shapes" — synthesised from
 * C+S case studies, Mission Lab UX study, liturgical color guides,
 * Ekklesia 360, Lifeway Research, Epic Life Creative, Restore Graphics,
 * DesignMantic, and Google visual complexity research.
 */

// ─────────────────────────────────────────────
// 1. CHRISTIAN DESIGN FOUNDATION
// ─────────────────────────────────────────────
// The bedrock layer. Every persona, every decision, every pixel
// is filtered through these three mission pillars and the
// theological color vocabulary.

export const CHRISTIAN_DESIGN_FOUNDATION = {
  identity:
    "We design as an act of stewardship — not self-expression. Every " +
    "visual, interactive, and typographic decision serves the mission " +
    "of inviting people into encounter with Christ and community. " +
    "World-class craft is the offering; the audience is the altar.",

  missionPillars: [
    {
      name: "Elevate Human Experience",
      description:
        "Every design decision asks: does this make a person feel more " +
        "welcomed, more understood, more drawn in? We design for the " +
        "person arriving with questions, doubts, or past wounds — not " +
        "just the engaged believer.",
    },
    {
      name: "Brand Truth With Excellence",
      description:
        "The visual identity is an extension of ministry, not decoration. " +
        "Colors, typography, imagery, and motion carry theological weight. " +
        "A cross is not clip-art — it is an instrument of death and " +
        "resurrection. Design must honor that gravity.",
    },
    {
      name: "Innovate Responsibly",
      description:
        "Use modern techniques (smooth scroll, parallax, motion design) " +
        "in service of the narrative, never for novelty. Innovation earns " +
        "its place by deepening engagement or clarifying the message. " +
        "If it distracts from the sacred, it goes.",
    },
  ],

  theologicalColorVocabulary: {
    description:
      "Colors are not neutral. In Christian tradition, each carries " +
      "centuries of liturgical meaning. These associations inform our " +
      "palette choices and ensure visual language resonates with the " +
      "spiritual reality of what we're communicating.",
    colors: {
      blue: {
        meaning: "Royalty, heaven, truth, the Holy Spirit",
        liturgical: "Advent — welcoming the coming King",
        usage: "Trust-building sections, navigation, links",
      },
      blueViolet: {
        meaning: "Royalty combined with penitence",
        liturgical: "Advent and Lent transitional",
        usage: "Transitional moments, reflective sections",
      },
      white: {
        meaning: "Purity, holiness, celebration, resurrection",
        liturgical: "Christmas, Easter, baptisms",
        usage: "Primary background, clean space, hero overlays",
      },
      gold: {
        meaning: "Majesty, joy, the presence of God",
        liturgical: "High holy days, royal celebrations",
        usage: "Accent details, emphasis, sacred moments",
      },
      red: {
        meaning: "The blood of Christ, the Holy Spirit, the church itself",
        liturgical: "Pentecost, ordination, martyrs' days",
        usage: "Calls to action, the YouAreInvited section, passion moments",
      },
      green: {
        meaning: "Renewal, growth, new life",
        liturgical: "Ordinary Time — the season of growing",
        usage: "Community sections, connection, growth-oriented content",
      },
      purple: {
        meaning: "Pain, suffering, penitence — but also royalty",
        liturgical: "Advent and Lent — longing and preparation",
        usage: "Sparingly — reflective or solemn contexts only",
      },
      black: {
        meaning: "Death, mourning, the weight of sin",
        liturgical: "Good Friday",
        usage: "Minimal — text color, solemn moments, never dominant",
      },
    },
  },

  firstImpressionScience: {
    description:
      "Google research confirms users form aesthetic judgments in 17–50 " +
      "milliseconds. Simpler, more familiar layouts are perceived as more " +
      "beautiful. For a church site, this means the first viewport must " +
      "communicate warmth, clarity, and sacred purpose instantly.",
    rules: [
      "Homepage hero communicates core identity in under 5 seconds",
      "Visual complexity kept low — generous whitespace, clear hierarchy",
      "Familiar patterns (centered text, full-bleed imagery) preferred over novel layouts",
      "Emotional tone established through color and imagery before text is read",
    ],
  },
} as const;

// ─────────────────────────────────────────────
// 2. CHRISTIAN NAV PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: NAVIGATION_ARCHITECT persona
// Source: Mission Lab UX Study, C+S empathy-first approach

export const CHRISTIAN_NAV_PRINCIPLES = {
  philosophy:
    "Navigation is a hosted walk, not a menu board. Every link is an " +
    "invitation to go deeper. The nav guides people the way a greeter " +
    "at the church door would — warmly, clearly, without overwhelm.",

  rules: [
    {
      rule: "3–5 top-level items maximum (6 absolute ceiling)",
      rationale:
        "Mission Lab UX study: more than 6 nav items increases cognitive " +
        "load and reduces task completion. Users don't read menus — they scan.",
    },
    {
      rule: "Include one seeker-friendly entry point",
      rationale:
        "Every site needs a 'Plan a Visit' or 'I'm New' equivalent. For " +
        "Worship in the Park, 'Exploring Faith?' serves this role — a low-" +
        "barrier entry for the spiritually curious.",
    },
    {
      rule: "All content reachable within 1–3 clicks",
      rationale:
        "Depth kills discovery. If a user can't find what they need in " +
        "three taps, they leave. Flat hierarchies with clear labels win.",
    },
    {
      rule: "Mobile-first, always",
      rationale:
        "Most church site visits are mobile. Start with the hamburger " +
        "menu and work outward. Touch targets ≥ 44px. No hover-only states.",
    },
    {
      rule: "No dropdowns or mega-menus",
      rationale:
        "Simplicity and familiarity per Google research. Dropdowns add " +
        "visual complexity and are hostile to touch devices. Use dedicated " +
        "hub pages instead.",
    },
    {
      rule: "Transparent header on hero pages, solid on content pages",
      rationale:
        "The hero is an arrival moment — the header should not compete. " +
        "On scroll or on content-first pages, the solid header provides " +
        "orientation and trust.",
    },
  ],

  antiPatterns: [
    "Dropdown menus with more than 5 items per group",
    "Navigation labels that use internal church jargon",
    "Hiding essential info (service times, location) behind multiple clicks",
    "Using icons without labels in the main nav",
    "Sticky headers that consume more than 60px of mobile viewport",
  ],
} as const;

// ─────────────────────────────────────────────
// 3. CHRISTIAN HERO PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: HERO_EXPERIENCE_LEAD persona
// Source: C+S case studies, Lifeway Research, Epic Life Creative

export const CHRISTIAN_HERO_PRINCIPLES = {
  philosophy:
    "The hero is the arrival moment — the digital equivalent of walking " +
    "through the church doors. It carries theological weight. The first " +
    "viewport should feel like an invitation into sacred space, not a " +
    "billboard. Less text, more atmosphere. Let the image preach.",

  rules: [
    {
      rule: "Imagery must be authentic — community or creation, never stock",
      rationale:
        "Lifeway Research: authentic photos of real community build trust. " +
        "For outdoor events, nature imagery (mountains, fields, sky) reflects " +
        "God's creation and the gathering's setting. Stock photos signal " +
        "inauthenticity.",
    },
    {
      rule: "Scripture integration as micro-copy, not decoration",
      rationale:
        "A verse in the hero should feel like a whisper from the Spirit, " +
        "not a bumper sticker. Small, italic, low-opacity — woven into the " +
        "design as sacred texture, not headline copy.",
    },
    {
      rule: "Cross/sacred geometry as subliminal watermarks",
      rationale:
        "The thin-line cross watermark (5–8% opacity) creates subliminal " +
        "sacred geometry without competing with the hero content. It's felt " +
        "more than seen — like the faint outline of a cross in stained glass " +
        "catching morning light.",
    },
    {
      rule: "Text positioned in upper or lower third, never dead center",
      rationale:
        "Cinematic composition. Placing text away from center gives the " +
        "background image breathing room and creates a more editorial, " +
        "intentional feel. The rule of thirds applies to hero design.",
    },
    {
      rule: "Single clear CTA — invitation language only",
      rationale:
        "'Plan Your Day' not 'Register Now.' 'Explore' not 'Sign Up.' " +
        "The hero CTA is a gentle hand extended, not a sales funnel entry.",
    },
  ],

  antiPatterns: [
    "Multiple competing CTAs in the hero",
    "Generic stock photography (smiling diverse group, coffee cups)",
    "Text overlays that obscure the hero image's emotional power",
    "Auto-playing video heroes that delay page load",
    "Carousel/slider heroes — one powerful image beats five mediocre ones",
  ],
} as const;

// ─────────────────────────────────────────────
// 4. CHRISTIAN FOOTER PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: FOOTER_ARCHITECT persona
// Source: C+S closing-impression philosophy

export const CHRISTIAN_FOOTER_PRINCIPLES = {
  philosophy:
    "The footer is a benediction — 'go in peace.' It is the last thing " +
    "a visitor sees, and it should leave them with warmth, clarity, and " +
    "orientation. No marketing pressure. No conversion tactics. Just: " +
    "here's where we are, here's when it happens, here's how to reach us.",

  rules: [
    {
      rule: "Essential info repeated: date, place, contact",
      rationale:
        "Users scroll to the footer when they need practical info. The " +
        "event date, location, and email should be immediately visible " +
        "without scanning through link lists.",
    },
    {
      rule: "No marketing CTAs or conversion pressure",
      rationale:
        "The footer is closure, not a sales pitch. 'Give Now' buttons " +
        "or 'Don't Miss Out' language violates the benediction metaphor. " +
        "If giving is linked, it should be a quiet text link, not a button.",
    },
    {
      rule: "Three-column structure mirrors three movements of gathering",
      rationale:
        "Column 1: Who we are (identity). Column 2: What's happening " +
        "(logistics/links). Column 3: How to connect (contact/social). " +
        "This mirrors the liturgical flow of gathering → word → sending.",
    },
    {
      rule: "Subtle, reverent typography — smaller, lighter, quieter",
      rationale:
        "Footer text should feel like a gentle whisper after the content's " +
        "conversation. Reduced weight, muted colors, generous spacing.",
    },
  ],

  antiPatterns: [
    "Loud CTAs or bright buttons in the footer",
    "Newsletter signup popups triggered from the footer",
    "Social media icons larger than the event info",
    "Cluttered link lists without clear grouping",
    "Missing contact information (email, phone, address)",
  ],
} as const;

// ─────────────────────────────────────────────
// 5. CHRISTIAN VISUAL IDENTITY PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: VISUAL_IDENTITY_GUARDIAN persona
// Source: Ekklesia 360, Restore Graphics, DesignMantic,
//         liturgical color guides

export const CHRISTIAN_VISUAL_IDENTITY_PRINCIPLES = {
  philosophy:
    "Visual identity is theology made visible. Every color, typeface, " +
    "symbol, and image carries the weight of what it represents. A cross " +
    "is not a design element — it is an instrument of death and resurrection. " +
    "A crown of thorns is not an ornament — it is suffering made beautiful. " +
    "Design with the gravity these symbols deserve.",

  colorPrinciples: [
    {
      principle: "2–3 core colors applied consistently",
      detail:
        "Ekklesia 360: consistency builds recognition. Choose colors that " +
        "carry liturgical weight and apply them across all touchpoints. " +
        "For Worship in the Park: warm earth tones + blood red accent + " +
        "generous white space.",
    },
    {
      principle: "Liturgical color theology informs palette decisions",
      detail:
        "See CHRISTIAN_DESIGN_FOUNDATION.theologicalColorVocabulary. Colors " +
        "are not arbitrary — they are vocabulary. Red speaks of sacrifice, " +
        "gold of God's presence, green of growth.",
    },
    {
      principle: "Contrast and accessibility are non-negotiable",
      detail:
        "WCAG AA minimum on all text. Do not rely solely on color to convey " +
        "meaning. Test with colorblind simulation tools. Accessibility is " +
        "a ministry obligation, not a technical checkbox.",
    },
  ],

  symbolismGuidelines: [
    {
      symbol: "Cross",
      usage:
        "The central symbol. Used sparingly and with unique expression — " +
        "never clip-art. Rendered as photorealistic imagery (cross-field.jpg), " +
        "subliminal CSS watermarks (thin lines at 5–8% opacity), or " +
        "editorial typography. Each use should stop the scroll.",
    },
    {
      symbol: "Crown of Thorns",
      usage:
        "Suffering made beautiful. Used as a delicate SVG wreath in section " +
        "dividers — thin, hand-drawn linework, not cartoonish. The thorns " +
        "should be visible and sharp, rendered with the respect the symbol " +
        "deserves.",
    },
    {
      symbol: "Dove",
      usage:
        "Reserved for Holy Spirit contexts. If used, abstract and minimal — " +
        "a suggestion of flight, not a literal bird. Consider using only " +
        "in motion (animated entrance) to suggest the Spirit's movement.",
    },
    {
      symbol: "Fish (Ichthys)",
      usage:
        "Reserved for contexts referencing the early church or discipleship. " +
        "If used, integrate into negative space or as a subtle watermark. " +
        "Avoid the bumper-sticker cliché.",
    },
  ],

  typographyTheology: {
    serif:
      "Heritage, reverence, scripture, timelessness. Used for headings, " +
      "scripture quotes, and moments that need gravitas. The serif font " +
      "connects the reader to 2,000 years of written tradition.",
    sans:
      "Contemporary accessibility, warmth, approachability. Used for body " +
      "copy, navigation, and UI elements. The sans-serif signals 'this is " +
      "for today' while the serif signals 'this is rooted in history.'",
    contrast:
      "The pairing of serif headings with sans-serif body creates a tension " +
      "between ancient and modern — which IS the tension of the gospel: " +
      "an ancient story told in every generation.",
  },

  imageryHierarchy: [
    "1. Authentic documentary photography of the community > everything else",
    "2. Nature/creation imagery reflecting the gathering's setting (mountains, fields, sky)",
    "3. Symbolic fine-art imagery (cross in field, thorns on wood, light through trees)",
    "4. Christian stock photography from curated libraries — LAST resort only",
    "NEVER: Generic stock (handshakes, coffee cups, diverse-group-laughing)",
  ],
} as const;

// ─────────────────────────────────────────────
// 6. CHRISTIAN CONTENT PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: persona.ts (ROLE, VOICE, NARRATIVE_FRAMEWORK)
// Source: Mission Lab, Lifeway Research, C+S narrative approach

export const CHRISTIAN_CONTENT_PRINCIPLES = {
  philosophy:
    "Words are ministry. Every heading, paragraph, caption, and micro-copy " +
    "moment is an opportunity to welcome, to clarify, to invite reflection. " +
    "We write as stewards of the story, not marketers of an event.",

  toneRules: [
    {
      rule: "Warm, humble, inviting, spiritually grounded",
      detail:
        "C+S: human-centered storytelling that invites people into the story. " +
        "The tone is a trusted friend at a kitchen table, not a preacher at " +
        "a podium. Sincere without performance.",
    },
    {
      rule: "Seventh-grade reading level, short sentences",
      detail:
        "Mission Lab: write for accessibility. Break information into small " +
        "chunks. Use headings, bullet points, and short paragraphs. The " +
        "most profound truths can be spoken simply.",
    },
    {
      rule: "Headings inspire reflection, not just label",
      detail:
        "'Where are you in your journey?' over 'About Us.' 'Why this day ' +\n" +
        "'matters' over 'Event Details.' Headings should make the reader " +
        "pause and think, not just navigate.",
    },
    {
      rule: "Scripture as invitation, not obligation",
      detail:
        "Weave scripture naturally into copy — as micro-copy whispers, " +
        "watermark textures, or reflective interludes. Never weaponized, " +
        "never preachy. The Word speaks for itself when given space.",
    },
  ],

  antiPatterns: [
    "Church jargon that excludes seekers ('fellowship,' 'sanctification,' 'outreach')",
    "Marketing language that cheapens the sacred ('Don't miss,' 'Register now,' 'Limited spots')",
    "Vague platitudes without specificity ('Something for everyone')",
    "Passive voice that distances the reader ('It is hoped that...')",
    "Exclamation marks that perform enthusiasm ('Join us!!!!')",
  ],
} as const;

// ─────────────────────────────────────────────
// 7. CHRISTIAN INTERACTION PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: MICRO_INTERACTION_CHOREOGRAPHER persona
// Source: C+S interactive work, Lenis research, liturgical pacing

export const CHRISTIAN_INTERACTION_PRINCIPLES = {
  philosophy:
    "Motion in a Christian digital experience serves contemplation, not " +
    "entertainment. Every animation should feel like breathing — natural, " +
    "unhurried, rhythmic. The scroll is a pilgrimage; each section is a " +
    "station. Motion guides the visitor through the narrative the way " +
    "candlelight guides the eye through a cathedral.",

  rules: [
    {
      rule: "Slow, deliberate motion — never jarring",
      rationale:
        "C+S: animated fibers connecting elements, subtle parallax suggesting " +
        "journey. Fast animations create anxiety; slow ones create space " +
        "for reflection. Default easing: ease-out, 400–800ms duration.",
    },
    {
      rule: "Smooth scroll creates immersive narrative",
      rationale:
        "Lenis normalizes scroll input across devices, creating a premium " +
        "feel. The smoothed scroll transforms content consumption into a " +
        "continuous journey rather than discrete page jumps.",
    },
    {
      rule: "Parallax suggests journey and growth",
      rationale:
        "Subtle depth layers (background moving slower than foreground) " +
        "create a sense of traveling through the story. Use sparingly — " +
        "one or two parallax moments per page, not wall-to-wall.",
    },
    {
      rule: "Reduced motion respected — accessibility is non-negotiable",
      rationale:
        "Some users experience motion sickness or vestibular disorders. " +
        "All animations must respect prefers-reduced-motion. Provide " +
        "equivalent static experiences that preserve meaning without motion.",
    },
    {
      rule: "Scroll reveals as liturgical pacing",
      rationale:
        "Content appearing on scroll mirrors the liturgical rhythm of " +
        "revelation — each section unveiled as the visitor is ready. " +
        "Stagger children to create a processional feel.",
    },
  ],

  antiPatterns: [
    "Bouncy or elastic animations that feel playful rather than reverent",
    "Auto-scrolling or hijacked scroll that removes user control",
    "Loading spinners that break the contemplative mood — use skeleton screens",
    "Confetti, particle effects, or celebration animations (this is worship, not a game)",
    "Scroll-triggered sound effects without user consent",
  ],
} as const;

// ─────────────────────────────────────────────
// 8. CHRISTIAN ACCESSIBILITY PRINCIPLES
// ─────────────────────────────────────────────
// Feeds: ALL personas (cross-cutting concern)
// Source: WCAG, C+S empathy philosophy, Mission Lab

export const CHRISTIAN_ACCESSIBILITY_PRINCIPLES = {
  philosophy:
    "Accessibility is not a technical requirement — it is a ministry " +
    "obligation. 'Whatever you did for one of the least of these, you " +
    "did for me' (Matthew 25:40). If our site excludes anyone — by " +
    "vision, hearing, motor ability, cognitive load, or technological " +
    "access — we have failed our calling before we've typed a word.",

  mandates: [
    {
      area: "Color and Contrast",
      requirement: "WCAG AA minimum (4.5:1 for text, 3:1 for large text)",
      spiritualRationale:
        "The gospel is for everyone. If someone can't read our message " +
        "because of low contrast, we've hidden the light under a bushel.",
    },
    {
      area: "Keyboard Navigation",
      requirement: "All interactive elements reachable and operable via keyboard",
      spiritualRationale:
        "The church door should be wide enough for everyone. Keyboard " +
        "navigation ensures those using assistive technology can enter.",
    },
    {
      area: "Image Alt Text",
      requirement: "Descriptive alt text on all meaningful images; decorative images marked aria-hidden",
      spiritualRationale:
        "If our cross image doesn't have alt text, a screen reader user " +
        "never encounters the symbol. The gospel loses a channel.",
    },
    {
      area: "ARIA Labels",
      requirement: "Proper landmark roles, labels, and live regions",
      spiritualRationale:
        "Structure is hospitality. ARIA landmarks are the digital equivalent " +
        "of clear signage in the church building.",
    },
    {
      area: "Reduced Motion",
      requirement: "Respect prefers-reduced-motion media query on all animations",
      spiritualRationale:
        "Anthony Diehl (C+S cofounder) writes about championing those " +
        "'marginalized by technology.' Motion sickness is real; our design " +
        "must never make someone physically uncomfortable.",
    },
    {
      area: "Reading Level",
      requirement: "Seventh-grade reading level for all primary content",
      spiritualRationale:
        "Jesus spoke in parables — simple stories carrying infinite depth. " +
        "If our copy requires a theology degree to parse, we've failed " +
        "the seekers He came to reach.",
    },
  ],

  antiPatterns: [
    "Text over busy backgrounds without sufficient overlay contrast",
    "Form inputs without visible labels (placeholder-only is not accessible)",
    "Links that say 'click here' without context",
    "Infinite scroll without a way to reach the footer",
    "Time-limited interactions (auto-closing modals, disappearing toasts)",
  ],
} as const;

// ─────────────────────────────────────────────
// 9. CHRISTIAN BOUNDARIES
// ─────────────────────────────────────────────
// Hard constraints for ALL personas. These are non-negotiable.
// Violation of any boundary is a pipeline FAIL at Stage 0.

export const CHRISTIAN_BOUNDARIES = {
  description:
    "Absolute constraints that no persona, no design decision, and no " +
    "business pressure can override. These are the ethical and spiritual " +
    "guardrails of the entire design system.",

  neverDo: [
    {
      boundary: "No dark patterns",
      definition:
        "No deceptive UI that tricks users into actions they didn't intend. " +
        "No hidden costs, no forced continuity, no misdirection. The church " +
        "is a sanctuary of trust — the website must be too.",
    },
    {
      boundary: "No forced continuity or subscription traps",
      definition:
        "If a recurring donation is set up, cancellation must be equally " +
        "easy. No burying unsubscribe links. No guilt-driven retention.",
    },
    {
      boundary: "No misleading copy",
      definition:
        "Every claim must be verifiable. Don't overstate attendance numbers, " +
        "don't fabricate testimonials, don't imply endorsements that don't exist.",
    },
    {
      boundary: "No trend-driven design that sacrifices timelessness",
      definition:
        "Trends fade. The gospel doesn't. Choose typefaces, layouts, and " +
        "patterns that will age gracefully. If a design choice would look " +
        "dated in 2 years, find the timeless alternative.",
    },
    {
      boundary: "No generic stock photography",
      definition:
        "Every image should be authentic to the community or symbolic of " +
        "the sacred narrative. Generic diverse-group-laughing stock photos " +
        "signal inauthenticity and erode trust.",
    },
    {
      boundary: "No inconsistent branding across touchpoints",
      definition:
        "The website, social media, print materials, and physical signage " +
        "must speak the same visual language. Inconsistency confuses and " +
        "undermines credibility.",
    },
    {
      boundary: "No isolation of design from technology",
      definition:
        "Design and development are one discipline. A beautiful mockup " +
        "that can't be built performantly is a failed design. Designers " +
        "must understand the medium; developers must understand the intent.",
    },
    {
      boundary: "No neglect of maintenance and scalability",
      definition:
        "A launched site without a maintenance plan is a site in decay. " +
        "Design for content updates, seasonal changes, and ministry growth. " +
        "Build with components, not one-off layouts.",
    },
    {
      boundary: "No church favoritism in multi-church contexts",
      definition:
        "Worship in the Park represents multiple churches. No single church's " +
        "branding, color scheme, or theological emphasis may dominate. Unity " +
        "is the visual and verbal mandate.",
    },
    {
      boundary: "No pressure language",
      definition:
        "'Don't miss,' 'Register before it's too late,' 'Limited spots' — " +
        "these are manipulation, not invitation. The event is an open field. " +
        "The language must be too.",
    },
    {
      boundary: "No spectacle-driven design",
      definition:
        "No confetti, no fireworks animations, no 'epic' reveal sequences. " +
        "This is worship, not entertainment. The design should create space " +
        "for the sacred, not compete with it.",
    },
    {
      boundary: "No exclusionary language or imagery",
      definition:
        "Every word and image must pass the seeker-safe test: would someone " +
        "with no church background feel welcomed and respected? Would someone " +
        "wounded by the church feel safe here?",
    },
    {
      boundary: "No accessibility shortcuts",
      definition:
        "WCAG compliance is not optional. Every image needs alt text, every " +
        "interactive element needs keyboard access, every animation needs " +
        "reduced-motion support. Full stop.",
    },
    {
      boundary: "No data collection without transparency",
      definition:
        "If we collect emails, analytics, or form data, the user must know " +
        "what we collect and why. Privacy is a trust issue — and trust is " +
        "the foundation of ministry.",
    },
    {
      boundary: "No decoration without meaning",
      definition:
        "Every visual element must serve the narrative or the user experience. " +
        "If a design element can't answer 'why is this here?' it doesn't belong. " +
        "Ornament for ornament's sake is clutter.",
    },
  ],
} as const;

// ─────────────────────────────────────────────
// UNIFIED EXPORT — for pipeline integration
// ─────────────────────────────────────────────

export const CHRISTIAN_DESIGN_PHILOSOPHY = {
  foundation: CHRISTIAN_DESIGN_FOUNDATION,
  navigation: CHRISTIAN_NAV_PRINCIPLES,
  hero: CHRISTIAN_HERO_PRINCIPLES,
  footer: CHRISTIAN_FOOTER_PRINCIPLES,
  visualIdentity: CHRISTIAN_VISUAL_IDENTITY_PRINCIPLES,
  content: CHRISTIAN_CONTENT_PRINCIPLES,
  interaction: CHRISTIAN_INTERACTION_PRINCIPLES,
  accessibility: CHRISTIAN_ACCESSIBILITY_PRINCIPLES,
  boundaries: CHRISTIAN_BOUNDARIES,
} as const;

/**
 * TASK-TO-PHILOSOPHY MAP
 * Maps each task type to the specific philosophy principle set(s)
 * that must be consulted at Stage 0, BEFORE the persona pipeline.
 */
export const TASK_PHILOSOPHY_MAP = {
  navigation_change: ["foundation", "navigation", "accessibility", "boundaries"] as const,
  footer_change: ["foundation", "footer", "accessibility", "boundaries"] as const,
  hero_change: ["foundation", "hero", "visualIdentity", "accessibility", "boundaries"] as const,
  hub_page_change: ["foundation", "visualIdentity", "content", "accessibility", "boundaries"] as const,
  subpage_change: ["foundation", "content", "accessibility", "boundaries"] as const,
  copy_change: ["foundation", "content", "boundaries"] as const,
  styling_change: ["foundation", "visualIdentity", "accessibility", "boundaries"] as const,
  animation_change: ["foundation", "interaction", "accessibility", "boundaries"] as const,
  new_component: ["foundation", "visualIdentity", "interaction", "accessibility", "boundaries"] as const,
  new_page: ["foundation", "navigation", "hero", "footer", "visualIdentity", "content", "interaction", "accessibility", "boundaries"] as const,
  performance_change: ["foundation", "boundaries"] as const,
  accessibility_change: ["foundation", "accessibility", "boundaries"] as const,
  design_system_change: ["foundation", "visualIdentity", "accessibility", "boundaries"] as const,
  image_change: ["foundation", "visualIdentity", "boundaries"] as const,
  layout_change: ["foundation", "visualIdentity", "interaction", "accessibility", "boundaries"] as const,
} as const;
