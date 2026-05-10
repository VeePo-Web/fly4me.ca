import csCanmoreHero from "@/assets/cs-canmore-hero.jpg";
import csCanmore1 from "@/assets/cs-canmore-1.jpg";
import csCanmore2 from "@/assets/cs-canmore-2.jpg";
import work2 from "@/assets/work-02-architecture.jpg";

import csNorthernHero from "@/assets/cs-northern-roads-hero.jpg";
import csNorthern1 from "@/assets/cs-northern-1.jpg";
import csNorthern2 from "@/assets/cs-northern-2.jpg";
import work1 from "@/assets/work-01-mountain-road.jpg";

import csLakeHero from "@/assets/cs-above-lake-hero.jpg";
import csLake1 from "@/assets/cs-lake-1.jpg";
import csLake2 from "@/assets/cs-lake-2.jpg";
import work3 from "@/assets/work-03-lake-boat.jpg";

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
  gallery: GalleryItem[];
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
    gallery: [
      { src: csNorthern1, alt: "Aerial shot of a single vehicle on a snow-covered road", ratio: "wide" },
      { src: csNorthern2, alt: "Aerial of turquoise glacial lake with ice floes", ratio: "portrait" },
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
    client: "TransAlta Renewables",
    location: "Southern Alberta",
    year: "2024",
    services: ["Aerial Documentation", "Industrial Inspections", "Commercial Campaigns"],
    tagline: "A renewable-energy estate, documented at the scale it deserves.",
    challenge:
      "Renewable infrastructure was being communicated as engineering — accurate, technical, and emotionally invisible to the public it served.",
    perspectiveShift:
      "We framed the estate as landscape architecture. The same turbines, photographed from above, became something closer to a sculpture garden — purposeful, patient, beautiful.",
    story:
      "Two weeks across three sites, alternating between editorial coverage for the brand campaign and high-resolution inspection passes for the engineering team. The same drone, two completely different mandates, one consistent visual language.",
    impact:
      "The brand stopped defending its presence in the landscape and started being celebrated as part of it.",
    outcome: "Adopted as the visual standard for the brand's 2025 reporting.",
    cardImage: work4,
    heroImage: csFieldHero,
    gallery: [
      { src: csField1, alt: "Top-down of a solar farm geometric pattern", ratio: "wide" },
      { src: csField2, alt: "Single white wind turbine against deep blue sky", ratio: "portrait" },
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
