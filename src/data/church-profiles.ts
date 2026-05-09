/* ─── Shared Church Profile Data ────────────────────────── */

export interface ChurchProfile {
  name: string;
  id: string;
  denomination: string;
  contactName: string;
  churchQuote: string;
  mission: string;
  churchImage: string;
  churchContactImage: string;
  address?: string;
  website?: string;
}

export const churchProfiles: ChurchProfile[] = [
  {
    id: "kingsgate-church",
    name: "KingsGate Church",
    denomination: "Non-Denominational",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "Rooted in the Word and relentless in love. KingsGate exists to equip believers and reach the lost across Cochrane and beyond.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
    website: "https://kingsgatechurch.ca",
  },
  {
    id: "saint-peters-lutheran",
    name: "Saint Peters Lutheran",
    denomination: "Lutheran",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "A parish rooted in ancient liturgy and present mercy. Saint Peters has served Cochrane for generations — through prayer, sacrament, and quiet faithfulness.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
    website: "https://saintpeters.ca",
  },
  {
    id: "impact-church",
    name: "Impact Church",
    denomination: "Pentecostal",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "Bold worship, authentic community, and a heart to see the Spirit move in Cochrane. Impact Church plants seeds of faith in the next generation.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
  },
  {
    id: "bow-valley-baptist",
    name: "Bow Valley Baptist Church",
    denomination: "Baptist",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "Faithful to the Word, devoted to prayer, and committed to serving Cochrane with the love of Christ across every generation.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
  },
  {
    id: "cochrane-alliance",
    name: "Cochrane Alliance Church",
    denomination: "Christian & Missionary Alliance",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "A Christ-centred community passionate about worship, discipleship, and carrying the Gospel to every corner of Cochrane and beyond.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
  },
  {
    id: "cochrane-baptist",
    name: "Cochrane Baptist Church",
    denomination: "Baptist",
    contactName: "Church Contact",
    churchQuote: "Church Quote",
    mission:
      "Grounded in Scripture and committed to community — Cochrane Baptist Church exists to make disciples and serve the town with the love of Christ.",
    churchImage: "/placeholder.svg",
    churchContactImage: "/placeholder.svg",
    address: "Cochrane, AB",
  },
];

export const additionalChurches: string[] = [];
