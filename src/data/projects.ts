import csCanmoreHero from "@/assets/cs-canmore-hero.jpg";
import csCanmore1 from "@/assets/cs-canmore-1.jpg";
import csCanmore2 from "@/assets/cs-canmore-2.jpg";
import work2 from "@/assets/work-02-architecture.jpg";

import canmoreBarkMacro from "@/assets/cs/canmore/bark-macro.jpg";
import canmoreListingFrame from "@/assets/cs/canmore/typical-listing-frame.jpg";
import canmoreDuskTrack from "@/assets/cs/canmore/dusk-access-track.jpg";

import csNorthernHero from "@/assets/cs-northern-roads-hero.jpg";
import csNorthern1 from "@/assets/cs-northern-1.jpg";
import csNorthern2 from "@/assets/cs-northern-2.jpg";
import work1 from "@/assets/work-01-mountain-road.jpg";

import northernMileMarker from "@/assets/cs/northern/mile-marker.jpg";
import northernEmptyShoulder from "@/assets/cs/northern/empty-shoulder.jpg";
import northernGlacialReflection from "@/assets/cs/northern/glacial-reflection.jpg";

import csLakeHero from "@/assets/cs-above-lake-hero.jpg";
import csLake1 from "@/assets/cs-lake-1.jpg";
import csLake2 from "@/assets/cs-lake-2.jpg";
import work3 from "@/assets/work-03-lake-boat.jpg";

import lakeWaterSurface from "@/assets/cs/lake/water-surface.jpg";
import lakeDockDetail from "@/assets/cs/lake/dock-detail.jpg";
import lakeShorelinePines from "@/assets/cs/lake/shoreline-pines.jpg";

import csFieldHero from "@/assets/cs-field-frequency-hero.jpg";
import csField1 from "@/assets/cs-field-1.jpg";
import csField2 from "@/assets/cs-field-2.jpg";
import work4 from "@/assets/work-04-industrial.jpg";

export interface VideoSource {
  src: string;
  type: string;
  media?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  ratio: "wide" | "portrait" | "square";
  videoSources?: VideoSource[];
  objectPosition?: string;
}

export type SupportingPlacement =
  | "after-opportunity"
  | "after-problem"
  | "after-shift"
  | "after-execution"
  | "after-outcome";

export interface SupportingImage {
  src: string;
  alt: string;
  caption?: string;
  ratio: "wide" | "portrait" | "square";
  placement: SupportingPlacement;
}

export interface Narrative {
  opportunity: { headline: string; body: string };
  problem: { headline: string; body: string };
  perspectiveShift: { headline: string; body: string };
  execution: { headline: string; body: string };
  outcome: { headline: string; body: string };
  takeaway: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  services: string[];
  tagline: string;
  challenge: string;
  perspectiveShift: string;
  story: string;
  impact: string;
  outcome: string;
  cardImage: string;
  cardVideoSources?: VideoSource[];
  cardObjectPosition?: string;
  heroImage: string;
  heroVideoSources?: VideoSource[];
  /** Optional bespoke asset for the Perspective Shift section (avoids reusing the hero) */
  perspectiveImage?: string;
  perspectiveVideoSources?: VideoSource[];
  perspectiveObjectPosition?: string;
  gallery: GalleryItem[];
  /** Optional editorial narrative — when present, CaseStudy renders the upgraded layout */
  narrative?: Narrative;
  supportingImages?: SupportingImage[];
}

const canmore1Mp4 = "/work/canmore/canmore-1.mp4";
const canmore2Mp4 = "/work/canmore/canmore-2.mp4";
const canmore1Poster = "/work/canmore/canmore-1-poster.jpg";
const canmore2Poster = "/work/canmore/canmore-2-poster.jpg";

export const projects: Project[] = [
  {
    slug: "canmore-heights",
    number: "01",
    title: "Among the Pines",
    category: "Real Estate",
    client: "Private Acreage",
    location: "Canmore, Alberta",
    year: "2026",
    services: ["Aerial Cinematography", "Land & Estate Films", "Creative Direction"],
    tagline:
      "An Alberta acreage shown the way it actually feels — from above the canopy, and from inside the trees.",
    challenge:
      "Land doesn't photograph the way it stands. Surveys show shape; listing photos show weather. Neither tells a buyer what it feels like to walk in under the pines.",
    perspectiveShift:
      "We stopped framing acreage as a parcel and started framing it as a place. One vantage from above the canopy to register scale and snowline, one low pass through the trunks to register quiet — and the property became something you could already imagine standing in.",
    story:
      "Two passes, one early-spring evening. Top-down through the larch and pine to read the land's relationship to the snowline and the surrounding range — then a slow, low traverse through the trunks at human height. The first frame says where you are. The second says what it feels like.",
    impact:
      "Buyers stopped asking about lot lines and started asking about the trees.",
    outcome: "Generated qualified showings within the first week of release.",
    cardImage: canmore1Poster,
    cardVideoSources: [{ src: canmore1Mp4, type: "video/mp4" }],
    cardObjectPosition: "center",
    heroImage: canmore1Poster,
    heroVideoSources: [{ src: canmore1Mp4, type: "video/mp4" }],
    perspectiveImage: canmore2Poster,
    perspectiveVideoSources: [{ src: canmore2Mp4, type: "video/mp4" }],
    gallery: [
      {
        src: canmore1Poster,
        alt: "Top-down aerial of Alberta pine and larch canopy meeting an early-spring snowline",
        ratio: "wide",
        videoSources: [{ src: canmore1Mp4, type: "video/mp4" }],
      },
      {
        src: canmore2Poster,
        alt: "Low-altitude pass through a stand of pines on a private Canmore acreage at dusk",
        ratio: "portrait",
        videoSources: [{ src: canmore2Mp4, type: "video/mp4" }],
      },
    ],
    narrative: {
      opportunity: {
        headline: "A Place, Not A Parcel.",
        body: "A private acreage outside Canmore — pine, larch, snowline, and a long view across the Bow Valley. The brief wasn't to sell square footage. It was to make a buyer feel they'd already arrived.",
      },
      problem: {
        headline: "What Listings Leave Out.",
        body: "Surveys show shape. Listing photos show weather. Neither shows what it feels like to stand under the trees as the light drops. The property kept reading as a polygon — and the people who would actually fall in love with it were scrolling past.",
      },
      perspectiveShift: {
        headline: "Two Frames. One Property.",
        body: "We stopped framing acreage as inventory. One vantage from above the canopy, registering scale and snowline. One low pass through the trunks at human height, registering quiet. Together they give a buyer the feeling of the land before they ever drive in.",
      },
      execution: {
        headline: "Held Long Enough To Notice.",
        body: "A single early-spring evening. Two passes. No music swell, no quick cuts, no listing-video tricks. The camera holds long enough for the place to do the work — and the work, on a property like this, is mostly atmosphere.",
      },
      outcome: {
        headline: "Buyers Stopped Asking About Lot Lines.",
        body: "Qualified showings booked inside the first week. The conversation moved from acreage to atmosphere — from how big it is to what it feels like to be there.",
      },
      takeaway:
        "A property is sold by the polygon. A place is sold by the feeling. We built the second.",
    },
    supportingImages: [
      {
        src: canmoreBarkMacro,
        alt: "Editorial macro of weathered lodgepole pine bark with a single resin bead, soft natural light",
        caption: "Detail study — pine bark, resin, light.",
        ratio: "portrait",
        placement: "after-opportunity",
      },
      {
        src: canmoreListingFrame,
        alt: "Generic ground-level real-estate frame of an Alberta acreage driveway under flat overcast light",
        caption: "What every other frame of this property looked like.",
        ratio: "wide",
        placement: "after-problem",
      },
      {
        src: canmoreDuskTrack,
        alt: "Narrow gravel access track curving into pine and larch, blue-hour light, distant Bow Valley ridge",
        caption: "Access track, blue hour — the property at the pace it actually lives at.",
        ratio: "wide",
        placement: "after-execution",
      },
    ],
  },
  {
    slug: "northern-roads",
    number: "02",
    title: "Northern Roads",
    category: "Tourism",
    client: "Travel Alberta",
    location: "Icefields Parkway",
    year: "2025",
    services: ["Aerial Cinematography", "Tourism & Destination Films"],
    tagline: "A campaign about the road as much as the destination.",
    challenge:
      "Tourism films had become loud — quick cuts, hero music, postcards in motion. The parkway deserved something quieter, and the audience was tired of being sold to.",
    perspectiveShift:
      "We treated the road itself as the protagonist. Instead of selling a destination, we framed a meditation — a single vehicle, a single line of light moving through a vast country.",
    story:
      "Travel Alberta wanted a film that didn't oversell. We followed a single vehicle from Lake Louise to Jasper across two pre-dawn shoots, framing the parkway as something closer to a meditation. No music swell, no hard sell — just the road, the range, and the light moving across both.",
    impact:
      "The campaign changed the conversation around the parkway from a place to visit to a feeling people wanted to chase.",
    outcome: "Featured across the 2025 destination campaign and short-film circuit.",
    cardImage: work1,
    heroImage: csNorthernHero,
    perspectiveImage: csNorthern1,
    gallery: [
      { src: csNorthern1, alt: "Aerial shot of a single vehicle on a snow-covered road", ratio: "wide" },
      { src: csNorthern2, alt: "Aerial of turquoise glacial lake with ice floes", ratio: "portrait" },
    ],
    narrative: {
      opportunity: {
        headline: "A Road, Not A Postcard.",
        body: "Travel Alberta wanted a tourism film that didn't oversell. The Icefields Parkway already sells itself — granite, glaciers, glacial water, two hundred and thirty kilometres of country between Lake Louise and Jasper. The work was simply to honour it.",
      },
      problem: {
        headline: "Tourism Films Got Loud.",
        body: "Quick cuts. Hero music. Postcards in motion. The genre had been so over-sold that audiences had stopped trusting it — and the parkway, of all places, deserved quieter. The risk was making something true and being mistaken for something ordinary.",
      },
      perspectiveShift: {
        headline: "The Road As The Protagonist.",
        body: "We stopped framing the destinations and started framing the country between them. One vehicle. One line of light moving through a vast, indifferent range. The destination becomes the road itself — and the viewer becomes the traveller.",
      },
      execution: {
        headline: "No Music Swell. No Hard Sell.",
        body: "Two pre-dawn shoots, Lake Louise to Jasper, a single vehicle holding a single line. Held altitude. Held pace. Held silence. The film became a meditation rather than a brochure — and the parkway did the work it was always going to do.",
      },
      outcome: {
        headline: "From Place To Feeling.",
        body: "The conversation moved from a place to visit to a feeling people wanted to chase. Featured across the 2025 destination campaign and short-film circuit — and quietly resharing across audiences who don't normally reshare tourism work.",
      },
      takeaway:
        "Tourism is sold by spectacle. Travel is sold by atmosphere. We chose the second — and so did the audience.",
    },
    supportingImages: [
      {
        src: northernMileMarker,
        alt: "Frosted unbranded green metal road sign post on the Icefields Parkway at first light, distant pine and snowline",
        caption: "Detail study — frost, quiet, scale.",
        ratio: "portrait",
        placement: "after-opportunity",
      },
      {
        src: northernEmptyShoulder,
        alt: "Empty Icefields Parkway shoulder before sunrise, fresh tire tracks in light snow curving toward the Canadian Rockies",
        caption: "What every other tourism film leaves out — the road, without a campaign on top of it.",
        ratio: "wide",
        placement: "after-problem",
      },
      {
        src: northernGlacialReflection,
        alt: "Still turquoise glacial lake at dawn in the Canadian Rockies with thin ice floes and mountain reflection",
        caption: "The country between destinations — atmosphere, not spectacle.",
        ratio: "wide",
        placement: "after-execution",
      },
    ],
  },
  {
    slug: "above-the-lake",
    number: "03",
    title: "Above the Lake",
    category: "Lifestyle",
    client: "Mountain Co.",
    location: "Lake Minnewanka",
    year: "2024",
    services: ["Aerial Photography", "FPV Drone Filming", "Creative Direction"],
    tagline: "A morning on the water, captured at the pace of the morning itself.",
    challenge:
      "The brand had compelling product but uninspired visuals — outdoor lifestyle images that looked like every other outdoor lifestyle brand.",
    perspectiveShift:
      "We removed the action and kept the atmosphere. The camera held still long enough for stillness itself to become the subject.",
    story:
      "The brief was simple: tell the truth about a quiet morning. We split the day between top-down stills and a single FPV pass that opened the film. The water did most of the work — we just held the camera still long enough to notice.",
    impact:
      "The work re-anchored the brand around restraint. Customers started describing the company as the one that 'feels different' — without being able to say why.",
    outcome: "Anthology series picked up by three regional outfitters.",
    cardImage: work3,
    heroImage: csLakeHero,
    gallery: [
      { src: csLake1, alt: "Aerial of a single kayaker on emerald water", ratio: "wide" },
      { src: csLake2, alt: "Person standing on a wooden dock at a still alpine lake", ratio: "portrait" },
    ],
  },
  {
    slug: "field-and-frequency",
    number: "04",
    title: "Field & Frequency",
    category: "Industrial",
    client: "Private commission",
    location: "Southern Alberta",
    year: "2026",
    services: ["Aerial Cinematography", "Industrial Documentation", "Brand Films"],
    tagline:
      "A working landscape, framed at the scale it actually operates at.",
    challenge:
      "Industrial sites are usually documented for compliance — flat, top-down, evidentiary. The land they sit in disappears, and so does any sense of the human decisions that shaped them.",
    perspectiveShift:
      "We treated the site as terrain instead of inventory. Held altitude long enough for the geometry to register, dropped low enough for the surface to read as ground, and let the rhythm between the two do the talking.",
    story:
      "A single winter morning, three passes. One high and slow to register the pattern of the work against the prairie. Two lower traverses to register texture — the seams in the snow, the lines in the dirt, the quiet repetition of something built to last decades.",
    impact:
      "The same site that read as infrastructure on a survey began reading as place on a screen.",
    outcome:
      "Carried into the brand's 2026 internal and partner-facing reporting.",
    cardImage: "/work/field/field-1-poster.jpg",
    cardVideoSources: [{ src: "/work/field/field-1.mp4", type: "video/mp4" }],
    cardObjectPosition: "center",
    heroImage: "/work/field/field-1-poster.jpg",
    heroVideoSources: [{ src: "/work/field/field-1.mp4", type: "video/mp4" }],
    gallery: [
      {
        src: "/work/field/field-2-poster.jpg",
        alt: "Aerial pass over a working southern Alberta site at winter light",
        ratio: "wide",
        videoSources: [{ src: "/work/field/field-2.mp4", type: "video/mp4" }],
      },
      {
        src: "/work/field/field-3-poster.jpg",
        alt: "Low-altitude traverse across the surface of a southern Alberta industrial estate",
        ratio: "portrait",
        videoSources: [{ src: "/work/field/field-3.mp4", type: "video/mp4" }],
      },
    ],
  },
  {
    slug: "hauling-the-foothills",
    number: "05",
    title: "Hauling the Foothills",
    category: "Commercial",
    client: "Private commission",
    location: "Foothills, Alberta",
    year: "2026",
    services: ["Aerial Cinematography", "Brand Films", "Operations Storytelling"],
    tagline:
      "A working day, framed at the scale of the country it moves through.",
    challenge:
      "Operations footage usually lives on a phone — a quick clip from the cab, the load arriving, the load leaving. The work gets documented; the country between job sites disappears.",
    perspectiveShift:
      "We held altitude long enough for the road to register as terrain and the load to register as intent. The truck stops being a vehicle and becomes a small, deliberate thing moving through a very large place.",
    story:
      "A single summer morning along a foothills two-lane. One slow aerial follow at the pace of the load — pickup, flatbed, skid steer — threading aspen and pine. No cuts, no music swell. Just the line of the road, the weight on the deck, and the country opening on either side.",
    impact:
      "What read as logistics on a schedule began reading as craft on a road.",
    outcome:
      "Folded into the operator's 2026 brand and recruitment storytelling.",
    cardImage: "/work/hauling/hauling-1-poster.jpg",
    cardVideoSources: [{ src: "/work/hauling/hauling-1.mp4", type: "video/mp4" }],
    cardObjectPosition: "center",
    heroImage: "/work/hauling/hauling-1-poster.jpg",
    heroVideoSources: [{ src: "/work/hauling/hauling-1.mp4", type: "video/mp4" }],
    gallery: [
      {
        src: "/work/hauling/hauling-1-poster.jpg",
        alt: "Aerial follow of a pickup hauling a flatbed-loaded skid steer down a foothills two-lane",
        ratio: "wide",
        videoSources: [{ src: "/work/hauling/hauling-1.mp4", type: "video/mp4" }],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
};

// Suppress unused import warnings — kept for future use
void csCanmoreHero;
void csCanmore1;
void csCanmore2;
void work2;
void csFieldHero;
void csField1;
void csField2;
void work4;
