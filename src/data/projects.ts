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
  story: string;
  outcome: string;
  // Editorial card image (4:5 portrait)
  cardImage: string;
  // Wide hero (16:9)
  heroImage: string;
  // Gallery (mixed ratios)
  gallery: { src: string; alt: string; ratio: "wide" | "portrait" | "square" }[];
}

export const projects: Project[] = [
  {
    slug: "canmore-heights",
    number: "01",
    title: "Canmore Heights",
    category: "Real Estate",
    client: "Private Residence",
    location: "Canmore, Alberta",
    year: "2025",
    services: ["Aerial Cinematography", "Real Estate Media", "Creative Direction"],
    tagline: "A modern alpine residence, framed at the scale it was built for.",
    story:
      "Architecture this confident asks for restraint. We approached Canmore Heights as a single, composed portrait — patient camera moves, golden-hour light, and the surrounding range allowed to do what it does. The result is a film that feels less like a listing and more like a quiet introduction.",
    outcome: "Listed and sold within nineteen days of release.",
    cardImage: work2,
    heroImage: csCanmoreHero,
    gallery: [
      { src: csCanmore1, alt: "Drone hovering at dusk by mountain home glass facade", ratio: "wide" },
      { src: csCanmore2, alt: "Top-down view of the home with snow-bordered pool", ratio: "portrait" },
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
    story:
      "Travel Alberta wanted a film that didn't oversell. We followed a single vehicle from Lake Louise to Jasper across two pre-dawn shoots, framing the parkway as something closer to a meditation. No music swell, no hard sell — just the road, the range, and the light moving across both.",
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
    story:
      "The brief was simple: tell the truth about a quiet morning. We split the day between top-down stills and a single FPV pass that opened the film. The water did most of the work — we just held the camera still long enough to notice.",
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
    story:
      "Two weeks across three sites, alternating between editorial coverage for the brand campaign and high-resolution inspection passes for the engineering team. The same drone, two completely different mandates, one consistent visual language.",
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
