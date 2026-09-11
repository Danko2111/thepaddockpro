/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR THE BUSINESS.
 *
 *  Feeds the header, footer, contact page, quote emails, sitemap, canonical
 *  URLs and the LocalBusiness structured data. Do not hard-code a phone number
 *  or address anywhere else.
 *
 *  Remaining ⛔ TODOs are the only placeholders left.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /**
   * Matches the Google Business Profile exactly, without "The".
   * NAP consistency between this site and the GBP is the single most load-
   * bearing detail in local SEO — if the GBP name ever changes, change it here
   * the same day.
   */
  name: "Paddock Pro",
  legalName: "Paddock Pro", // ⛔ TODO registered entity name if it differs (e.g. "… Ltd.")
  tagline: "Vehicle wraps, PPF, tint & ceramic coating in Langley",
  description:
    "Paddock Pro is a Langley, BC vehicle wrap shop installing full colour change vinyl, paint protection film, commercial fleet graphics, window tint and ceramic coating using 3M, Avery Dennison and Inozetek materials.",

  /**
   * Canonical host. Apex chosen over www — set the www → apex redirect in
   * Vercel → Settings → Domains so only one version is ever indexed.
   */
  url: "https://paddockpro.ca",

  // ── Contact ────────────────────────────────────────────────────────────────
  phone: "(778) 366-2258",
  phoneHref: "tel:+17783662258",
  email: "info@paddockpro.ca", // ⛔ TODO confirm the address the shop actually reads
  quoteInbox: "info@paddockpro.ca", // ⛔ TODO where quote requests should land
  fromEmail: "Paddock Pro <quotes@paddockpro.ca>", // ⛔ TODO must be on the Resend-verified domain

  // ── Location ───────────────────────────────────────────────────────────────
  address: {
    street: "20630 Mufford Cres",
    unit: "Unit 300",
    city: "Langley",
    region: "BC",
    postalCode: "V2Y 2V9",
    country: "CA",
  },
  /** Shop door, from Google Maps. 6dp is ~0.1 m — more is noise. */
  geo: {
    latitude: 49.116328,
    longitude: -122.650829,
  },
  /** ⛔ TODO Google Maps → the listing → Share → Embed a map → copy the src. */
  mapEmbedUrl: "",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Paddock+Pro+20630+Mufford+Cres+Langley+BC",

  /** Real catchment only. Fraser Valley and South of Fraser. */
  serviceArea: [
    "Langley",
    "Surrey",
    "Cloverdale",
    "Abbotsford",
    "Aldergrove",
    "Maple Ridge",
    "Fort Langley",
    "White Rock",
  ],

  // ── Hours (24h — drives both the displayed table and openingHoursSpecification) ──
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ] as const,
  closedDays: ["Sunday"],

  // ── Social (feeds sameAs in structured data) ───────────────────────────────
  social: {
    instagram: "https://www.instagram.com/thepaddockpro/",
    google: "https://www.google.com/maps/search/?api=1&query=Paddock+Pro+20630+Mufford+Cres+Langley+BC",
    facebook: "", // ⛔ TODO if one exists
    youtube: "",
    tiktok: "",
  },

  /**
   * Google rating, shown as a trust signal and linked to the profile.
   *
   * Deliberately NOT emitted as AggregateRating structured data. Google treats
   * a business marking up its own rating on its own site as self-serving; it
   * earns no rich result and risks a structured-data manual action. Displaying
   * it and linking out to the real reviews is both safer and more persuasive.
   *
   * ⛔ TODO refresh the count as reviews come in (or delete the block to hide it).
   */
  reviews: {
    rating: 5.0,
    count: 9,
    source: "Google",
  },

  /** ⛔ TODO only claim certifications the shop actually holds. */
  credentials: [
    "3M and Avery Dennison cast films",
    "Inozetek Super Gloss",
    "Ceramic and carbon window film",
  ],
} as const;

export type SiteConfig = typeof site;

export const fullAddress = [
  site.address.street,
  site.address.unit,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
]
  .filter(Boolean)
  .join(", ");

export const cityRegion = `${site.address.city}, ${site.address.region}`;
