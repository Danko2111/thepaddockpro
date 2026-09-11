import manifest from "@/data/gallery.generated.json";
import { site } from "@/config/site";
import { services } from "@/config/services";

export type GalleryImage = {
  src: string;
  category: string;
  title: string;
  caption: string | null;
  alt: string;
  featured: boolean;
  width: number;
  height: number;
  blurDataURL: string;
};

type RawImage = Omit<GalleryImage, "alt"> & { alt: string | null };

const CATEGORY_PHRASE: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.galleryCategory, s.name.toLowerCase()]),
);

/**
 * Alt text is composed rather than authored so every image gets a descriptive,
 * location-bearing string without anyone having to write one. Overriding it in
 * gallery-overrides.json always wins.
 */
function composeAlt(image: RawImage): string {
  if (image.alt) return image.alt;
  const phrase = CATEGORY_PHRASE[image.category] ?? "vehicle wrap";
  return `${image.title} — ${phrase} by ${site.name} in ${site.address.city}, ${site.address.region}`;
}

export const galleryImages: GalleryImage[] = (manifest as RawImage[])
  .filter((image) => !image.src.startsWith("/gallery/_"))
  .map((image) => ({ ...image, alt: composeAlt(image) }));

export const galleryCount = galleryImages.length;

export function imagesByCategory(category: string): GalleryImage[] {
  if (category === "all") return galleryImages;
  return galleryImages.filter((image) => image.category === category);
}

/**
 * Homepage strip: anything flagged featured, topped up with the newest work
 * and interleaved across services so one category can't dominate.
 */
export function featuredImages(limit = 8): GalleryImage[] {
  const featured = galleryImages.filter((image) => image.featured);
  if (featured.length >= limit) return featured.slice(0, limit);

  const buckets = new Map<string, GalleryImage[]>();
  for (const image of galleryImages) {
    if (image.featured) continue;
    const bucket = buckets.get(image.category) ?? [];
    bucket.push(image);
    buckets.set(image.category, bucket);
  }

  const out = [...featured];
  let exhausted = false;
  while (out.length < limit && !exhausted) {
    exhausted = true;
    for (const bucket of buckets.values()) {
      const next = bucket.shift();
      if (!next) continue;
      exhausted = false;
      out.push(next);
      if (out.length === limit) return out;
    }
  }
  return out;
}

/** Categories that actually have images, so empty filters never render. */
export const populatedCategories = [
  { key: "all", label: "All work", count: galleryImages.length },
  ...services
    .map((s) => ({
      key: s.galleryCategory,
      label: s.shortName,
      count: galleryImages.filter((i) => i.category === s.galleryCategory).length,
    }))
    .filter((c) => c.count > 0),
];
