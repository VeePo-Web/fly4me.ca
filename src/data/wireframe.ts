/**
 * WIREFRAME — Canonical navigation architecture reference.
 * This file documents the full sitemap so future changes stay aligned.
 *
 * Top Nav (6 links): Home · Day Details · Vision · Support · Exploring Faith? · FAQ
 * Footer/Utility:    Contact · Post-Event Testimony / Photo Upload
 *
 * All deeper content lives inside hub pages with bento-box navigation cards.
 */

export const SITEMAP = {
  home: {
    path: "/",
    sections: [
      "Hero",
      "What This Is",
      "Why This Day Matters",
      "What to Expect",
      "Churches Together",
      "Day at a Glance",
      "Before You Come",
      "Plan Your Visit (Nav Grid)",
      "Invitation to Attend",
    ],
  },

  dayDetails: {
    path: "/day-details",
    label: "Day Details",
    subpages: [
      { path: "/day-details/schedule", label: "Day Schedule" },
      { path: "/day-details/parking-map", label: "Parking & Map" },
      { path: "/day-details/weather", label: "Weather Plan" },
      { path: "/day-details/accessibility", label: "Accessibility Information" },
      { path: "/day-details/food-trucks", label: "Food Trucks" },
      { path: "/day-details/guidelines", label: "Event Guidelines" },
      { path: "/day-details/what-to-bring", label: "What to Bring" },
    ],
  },

  vision: {
    path: "/vision",
    label: "Vision",
    subpages: [
      { path: "/vision/mission", label: "Vision & Mission" },
      { path: "/vision/unity", label: "Unity Across Churches" },
      { path: "/vision/church-history", label: "Church History in Cochrane AB" },
      { path: "/vision/partners", label: "Partnered Churches" },
    ],
  },

  support: {
    path: "/support",
    label: "Support",
    subpages: [
      { path: "/support/volunteer", label: "Volunteer" },
      { path: "/support/church-partner", label: "Church Partner" },
      { path: "/support/donate", label: "Donate" },
      { path: "/support/prayer", label: "Prayer" },
    ],
  },

  faith: {
    path: "/faith",
    label: "Exploring Faith?",
    subpages: [
      { path: "/faith/get-connected", label: "Get Connected" },
      { path: "/faith/questions", label: "Faith Questions" },
      { path: "/faith/contact-pastor", label: "Contact a Pastor" },
    ],
  },

  faq: {
    path: "/faq",
    label: "FAQ",
    categories: [
      "Event Basics",
      "Attendance",
      "Families",
      "Logistics",
      "Weather",
      "Parking",
      "Food",
      "Pets",
      "Accessibility",
      "Ministry Questions",
    ],
  },

  utility: [
    { path: "/contact", label: "Contact" },
    { path: "/testimony", label: "Post-Event Testimony / Photo Upload" },
  ],
} as const;
