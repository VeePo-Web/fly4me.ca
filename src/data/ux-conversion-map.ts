/**
 * UX CONVERSION MAP — Canonical conversion psychology reference.
 *
 * This file documents the psychological purpose behind every page, section,
 * and structural element on the site. It governs UX decisions the same way
 * wireframe.ts governs structure, persona.ts governs copy, and
 * christian-design-philosophy.ts governs visual design.
 *
 * Cross-references:
 *   - src/data/wireframe.ts                → page structure, navigation hierarchy
 *   - src/data/persona.ts                  → copy voice, narrative framework
 *   - src/data/christian-design-philosophy.ts → design philosophy, visual theology
 *
 * The homepage follows the AIDA model (Attention → Interest → Desire → Action)
 * mapped across a single scroll. Hub pages segment by persona. Subpages
 * resolve specific objections or deepen commitment.
 */

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type AidaStage = "attention" | "interest" | "desire" | "action";

interface ConversionEntry {
  path: string;
  section?: string;
  aidaStage: AidaStage;
  principle: string;
  purpose: string;
  conversionGoal: string;
}

// ─────────────────────────────────────────────
// 1. HOME PAGE FUNNEL (/)
// ─────────────────────────────────────────────

export const HOME_PAGE_FUNNEL: ConversionEntry[] = [
  {
    path: "/",
    section: "VeilIntro",
    aidaStage: "attention",
    principle: "Primacy effect + pattern interrupt",
    purpose:
      "Before the visitor sees anything, a moment of stillness with scripture sets the " +
      "emotional register. This is not a normal website — it is a spiritual experience. " +
      "The first impression anchors everything that follows in reverence rather than consumerism.",
    conversionGoal: "Establish sacred framing that colors the entire visit.",
  },
  {
    path: "/",
    section: "Hero",
    aidaStage: "attention",
    principle: "Emotional capture + zero-friction framing",
    purpose:
      "Full-bleed aerial image establishes place and beauty. Scripture (2 Chronicles 7:14) " +
      "frames the theological 'why' before logistics. Date/time/location are present but " +
      "secondary — emotion leads, information follows. 'No ticket. No registration.' " +
      "micro-copy immediately removes the #1 friction barrier (cost/commitment anxiety).",
    conversionGoal: "Reduce perceived risk to zero within the first 5 seconds.",
  },
  {
    path: "/",
    section: "WhatThisIsNot",
    aidaStage: "interest",
    principle: "Inoculation theory + negative framing",
    purpose:
      "By declaring what the event is not (not a concert, not a church program, not a platform), " +
      "this section pre-empts skepticism. Naming objections first neutralizes them. The 'not' " +
      "statements clear space for the positive declaration: 'a public day of worship and prayer.' " +
      "Builds trust with churched people (wary of spectacle) and unchurched people (wary of manipulation).",
    conversionGoal: "Neutralize the top 3 objections before they form.",
  },
  {
    path: "/",
    section: "VisionTease",
    aidaStage: "interest",
    principle: "Meaning-making + progressive disclosure",
    purpose:
      "After clearing objections, answers 'why should I care?' Moves from logistics to theology — " +
      "connecting the event to years of prayer and a biblical mandate. The 'Read the Full Vision →' " +
      "link lets interested visitors self-select deeper. People don't attend events; they join movements. " +
      "This section makes the event feel like a movement.",
    conversionGoal: "Transform the event from 'something happening' to 'something I want to be part of.'",
  },
  {
    path: "/",
    section: "SectionDivider (Thorns)",
    aidaStage: "interest",
    principle: "Cognitive rest + symbolic texture",
    purpose:
      "Thorns imagery creates a visual breath between sections and carries implicit Christological " +
      "symbolism (crown of thorns). Gives the brain a moment to process before the next content block.",
    conversionGoal: "Prevent scroll fatigue; maintain narrative pacing.",
  },
  {
    path: "/",
    section: "WhatToExpect",
    aidaStage: "desire",
    principle: "Uncertainty reduction + ambiguity aversion",
    purpose:
      "Four concrete cards (Continuous Worship, Prayer Tent, Get Connected Tent, Free Bibles & Baptism) " +
      "answer 'what will I actually experience if I show up?' Each numbered label (01–04) creates a sense " +
      "of structured, organized programming — reducing the fear of chaos.",
    conversionGoal: "Make the unknown predictable so visitors can picture themselves there.",
  },
  {
    path: "/",
    section: "ChurchesTogether",
    aidaStage: "desire",
    principle: "Social proof + consensus (Cialdini)",
    purpose:
      "Scrolling marquee of church names signals this is not one church's agenda — it is a coalition. " +
      "'If seven churches trust this enough to participate, it must be legitimate.' The 'not uniformity " +
      "but harmony' framing addresses denominational anxiety.",
    conversionGoal: "Remove the 'whose church is this?' objection.",
  },
  {
    path: "/",
    section: "CrossInterstitial",
    aidaStage: "desire",
    principle: "Emotional punctuation + operant reinforcement",
    purpose:
      "Full-bleed parallax image of a cross in a field with scroll-triggered scripture overlay. " +
      "Visual rest stop that re-anchors the visitor in the spiritual narrative. Prevents scroll fatigue " +
      "and rewards continued scrolling (operant reinforcement of scroll behavior).",
    conversionGoal: "Re-anchor spiritual narrative; reward scrolling.",
  },
  {
    path: "/",
    section: "SchedulePreview",
    aidaStage: "desire",
    principle: "Implementation intention + commitment scaffolding",
    purpose:
      "Three-slot timeline (Morning/Afternoon/Evening) lets visitors mentally 'place themselves' in the " +
      "day. When people can picture themselves doing something, they are more likely to do it. 'See Full " +
      "Schedule →' is progressive disclosure for planners.",
    conversionGoal: "Move from 'sounds interesting' to 'I'll come for the morning.'",
  },
  {
    path: "/",
    section: "BeforeYouCome",
    aidaStage: "action",
    principle: "Friction reduction at the decision point",
    purpose:
      "Four quick-hit FAQ items (Cost, Parking, Food, Families) address the last practical barriers. " +
      "The visitor has been emotionally convinced; now remove every logistical excuse. The gap between " +
      "'I want to go' and 'I will go' is usually logistical, not emotional.",
    conversionGoal: "Eliminate the final 'but what about…' hesitations.",
  },
  {
    path: "/",
    section: "NavGrid",
    aidaStage: "action",
    principle: "Self-segmentation + agency",
    purpose:
      "Six bento cards let visitors choose their own path based on persona (planner → Day Details, " +
      "curious → Exploring Faith?, supporter → Support). Rather than guessing what the visitor needs, " +
      "let them declare it. Give people agency and they feel ownership.",
    conversionGoal: "Convert passive scrollers into active navigators.",
  },
  {
    path: "/",
    section: "Scripture Whisper (Psalm 133:1)",
    aidaStage: "action",
    principle: "Emotional deceleration + liminal space",
    purpose:
      "Single verse in the quietest typographic treatment on the page. Creates a liminal space between " +
      "the functional NavGrid and the emotional closing CTA. Lowers the heart rate before the final ask. " +
      "Reinforces the unity theme through scripture rather than marketing copy.",
    conversionGoal: "Create breathing room so the final CTA lands with weight, not pressure.",
  },
  {
    path: "/",
    section: "YouAreInvited",
    aidaStage: "action",
    principle: "Conversion moment + friction sweep",
    purpose:
      "Blood-red overlay, direct address ('You're Invited'), single CTA button: 'Plan Your Visit.' " +
      "Everything above has been building trust, reducing friction, creating desire. The warm/urgent color " +
      "triggers action. Repetition of 'No ticket. No registration. No church background required.' is a " +
      "final friction sweep. The best CTAs don't introduce new information — they summarize everything " +
      "the visitor already believes and give them one button to act on it.",
    conversionGoal: "Convert intent into action with a single, frictionless click.",
  },
];

// ─────────────────────────────────────────────
// 2. HUB PAGES
// ─────────────────────────────────────────────

export const HUB_PAGES: ConversionEntry[] = [
  {
    path: "/day-details",
    aidaStage: "desire",
    principle: "Control = commitment (planner persona)",
    purpose:
      "Logistics command center. Seven cards covering Schedule, Parking, Weather, Accessibility, " +
      "Food, Guidelines, What to Bring. Serves the planner persona — the person who won't attend " +
      "unless they can answer every practical question. Each card's description previews the answer " +
      "so visitors can scan without clicking.",
    conversionGoal: "Planners need to feel in control. Give them all the information and they'll commit.",
  },
  {
    path: "/vision",
    aidaStage: "interest",
    principle: "Mission belief → high-commitment action",
    purpose:
      "Depth for the invested. Four cards: Mission, Unity, Church History, Partners. Serves the " +
      "leader/pastor persona and the deeply curious. This is where theological conviction lives. " +
      "People who click here are already interested — they want to understand the 'why' at a deeper level.",
    conversionGoal: "For high-commitment actions (volunteering, partnering), people need to believe in the mission.",
  },
  {
    path: "/support",
    aidaStage: "action",
    principle: "Ladder of commitment",
    purpose:
      "Activation funnel for contributors. Four cards: Volunteer, Church Partner, Donate, Prayer. " +
      "Each represents a different level of commitment (time, organizational, financial, spiritual). " +
      "Ordering matters — Volunteer first (most accessible), Donate third (highest friction).",
    conversionGoal: "Offer a ladder of commitment; people choose their rung.",
  },
  {
    path: "/faith",
    aidaStage: "interest",
    principle: "Fear-of-judgment removal (seeker persona)",
    purpose:
      "Seeker-safe landing zone. Three cards: Get Connected, Faith Questions, Contact a Pastor. " +
      "The question mark in the title ('Exploring Faith?') signals that doubt is welcome. Intro copy " +
      "quotes Matthew 11:28 ('Come to me, all you who are weary'). The #1 barrier for seekers is " +
      "fear of judgment. Every word on this page says 'no pressure, no agenda.'",
    conversionGoal: "The softest possible on-ramp to faith exploration.",
  },
];

// ─────────────────────────────────────────────
// 3. SUBPAGES
// ─────────────────────────────────────────────

export const SUBPAGES: ConversionEntry[] = [
  // Day Details
  {
    path: "/day-details/schedule",
    aidaStage: "desire",
    principle: "Implementation intention",
    purpose: "Exact times let visitors commit to a specific arrival window.",
    conversionGoal: "Move from 'maybe' to 'I'll be there at 10am.'",
  },
  {
    path: "/day-details/parking-map",
    aidaStage: "desire",
    principle: "Friction removal",
    purpose: "'Where do I park?' is the #1 logistical question for any outdoor event.",
    conversionGoal: "Eliminate the top practical barrier to attendance.",
  },
  {
    path: "/day-details/weather",
    aidaStage: "desire",
    principle: "Risk mitigation",
    purpose: "Outdoor event anxiety — show you have a plan for bad weather.",
    conversionGoal: "Neutralize weather as a reason not to come.",
  },
  {
    path: "/day-details/accessibility",
    aidaStage: "desire",
    principle: "Inclusion signaling",
    purpose: "Even listing accessibility information signals care for all visitors.",
    conversionGoal: "Signal that everyone is welcome and considered.",
  },
  {
    path: "/day-details/food-trucks",
    aidaStage: "desire",
    principle: "Basic needs assurance (Maslow)",
    purpose: "'Will I be hungry?' is a basic needs concern that can prevent attendance.",
    conversionGoal: "Remove the 'what will I eat?' question.",
  },
  {
    path: "/day-details/guidelines",
    aidaStage: "desire",
    principle: "Expectation setting",
    purpose: "Reduces social anxiety ('What are the rules?') by making norms explicit.",
    conversionGoal: "Reduce day-of social anxiety.",
  },
  {
    path: "/day-details/what-to-bring",
    aidaStage: "desire",
    principle: "Preparation enablement",
    purpose: "Empowers visitors to feel ready, reducing day-of anxiety.",
    conversionGoal: "Transform anxiety into anticipation through preparation.",
  },

  // Vision
  {
    path: "/vision/mission",
    aidaStage: "interest",
    principle: "Conviction transfer",
    purpose: "Moves the vision from the organizers' hearts into the visitor's understanding.",
    conversionGoal: "Make the visitor believe in the 'why' as deeply as the organizers do.",
  },
  {
    path: "/vision/unity",
    aidaStage: "interest",
    principle: "Denominational bridge",
    purpose: "Addresses the 'can different churches really work together?' objection.",
    conversionGoal: "Neutralize denominational tribalism as a barrier.",
  },
  {
    path: "/vision/church-history",
    aidaStage: "interest",
    principle: "Legacy anchoring",
    purpose: "Roots the event in generational faithfulness, not trend-chasing.",
    conversionGoal: "This isn't new — it's a continuation of something God has been doing.",
  },
  {
    path: "/vision/partners",
    aidaStage: "interest",
    principle: "Social proof amplification",
    purpose: "Named churches = named trust. Specificity builds credibility.",
    conversionGoal: "Seeing my church's name (or a church I respect) removes doubt.",
  },

  // Support
  {
    path: "/support/volunteer",
    aidaStage: "action",
    principle: "Activation with dignity",
    purpose:
      "Framed as 'application, not sign-up' — elevates the act of serving. Role list + shift " +
      "structure reduces ambiguity about what volunteering actually involves.",
    conversionGoal: "Convert willingness to serve into a submitted application.",
  },
  {
    path: "/support/church-partner",
    aidaStage: "action",
    principle: "Organizational onboarding",
    purpose: "Converts church-level interest into formal participation commitment.",
    conversionGoal: "Move from 'our church is interested' to 'our church is in.'",
  },
  {
    path: "/support/donate",
    aidaStage: "action",
    principle: "Generosity without guilt",
    purpose:
      "'No pressure — if this is God's idea, it is His job to sustain it' removes manipulation " +
      "anxiety. Framing donations as partnership, not obligation.",
    conversionGoal: "Enable generosity without triggering manipulation defenses.",
  },
  {
    path: "/support/prayer",
    aidaStage: "action",
    principle: "Lowest-friction support validation",
    purpose:
      "Anyone can pray. This validates spiritual contribution as equal to financial. The lowest " +
      "barrier to meaningful participation.",
    conversionGoal: "Everyone can contribute, even without time or money.",
  },

  // Faith
  {
    path: "/faith/get-connected",
    aidaStage: "interest",
    principle: "Physical touchpoint preview",
    purpose: "Describes the Get Connected Tent so seekers know what to expect on the day.",
    conversionGoal: "Reduce anxiety about approaching the tent by showing what happens there.",
  },
  {
    path: "/faith/questions",
    aidaStage: "interest",
    principle: "Objection normalization",
    purpose: "'Honest questions are welcome' — makes doubt a feature, not a bug.",
    conversionGoal: "Permission to doubt is permission to explore.",
  },
  {
    path: "/faith/contact-pastor",
    aidaStage: "action",
    principle: "Human connection bridge",
    purpose:
      "Moves from digital to relational — the highest-trust conversion in ministry. A form that " +
      "connects seekers to a real human being.",
    conversionGoal: "Bridge the gap from online curiosity to personal conversation.",
  },
];

// ─────────────────────────────────────────────
// 4. UTILITY PAGES
// ─────────────────────────────────────────────

export const UTILITY_PAGES: ConversionEntry[] = [
  {
    path: "/faq",
    aidaStage: "desire",
    principle: "Comprehensive objection clearance",
    purpose:
      "11 categories, searchable. Serves the analytical persona who needs every question answered " +
      "before committing. The search bar respects their time. FAQs convert the 20% of visitors who " +
      "are 80% convinced but need one more answer.",
    conversionGoal: "Convert the almost-convinced by answering their final question.",
  },
  {
    path: "/contact",
    aidaStage: "action",
    principle: "Trust signal + safety net",
    purpose:
      "A visible contact form says 'we are real people and we will respond.' Topic dropdown routes " +
      "intent. The existence of a contact page increases trust even if most visitors never use it.",
    conversionGoal: "Increase overall site trust through accessibility.",
  },
  {
    path: "/testimony",
    aidaStage: "action",
    principle: "Consistency principle + social proof harvest",
    purpose:
      "Post-event: captures stories and photos for social proof in future years. Optional name field " +
      "reduces submission friction. Post-experience testimony deepens the visitor's own commitment " +
      "(consistency principle) and creates content for future marketing.",
    conversionGoal: "Deepen post-event commitment; harvest social proof for next year.",
  },
];

// ─────────────────────────────────────────────
// 5. STRUCTURAL ELEMENTS
// ─────────────────────────────────────────────

export const STRUCTURAL_ELEMENTS: ConversionEntry[] = [
  {
    path: "*",
    section: "Header",
    aidaStage: "attention",
    principle: "Persistent wayfinding + persona targeting",
    purpose:
      "5 nav links map to the 5 primary personas. 'Exploring Faith?' is deliberately styled " +
      "differently (font-medium) to catch seekers' eyes. Transparent on hero, solid on interior — " +
      "adapts to context without breaking immersion.",
    conversionGoal: "Every persona finds their path within 2 seconds of looking at the nav.",
  },
  {
    path: "*",
    section: "Footer",
    aidaStage: "action",
    principle: "Safety net navigation + credibility",
    purpose:
      "Repeats key links for visitors who scroll to the bottom. Email address and logo presence " +
      "signal legitimacy. Catches visitors who missed the nav or want a second pass.",
    conversionGoal: "No visitor leaves because they couldn't find what they needed.",
  },
  {
    path: "/",
    section: "VeilIntro (session-gated)",
    aidaStage: "attention",
    principle: "Peak-end rule + session gating",
    purpose:
      "First-visit-only sacred threshold. Only shows once per session (sessionStorage). Return " +
      "visitors skip it entirely — respecting their time while preserving the first-visit experience. " +
      "Make the first moment extraordinary and it colors the entire experience.",
    conversionGoal: "Create an unforgettable first impression that sets the emotional tone for everything.",
  },
];
