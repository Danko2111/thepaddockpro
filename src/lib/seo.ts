import type { Metadata } from "next";
import { site } from "@/config/site";

/** Title shown for the homepage, which bypasses the root template. */
const HOME_TITLE = `Vehicle Wraps, PPF & Tint in ${site.address.city}, ${site.address.region} | ${site.name}`;

type BuildMetadataArgs = {
  /** Page title WITHOUT the brand suffix — it is appended automatically. */
  title: string;
  description: string;
  /** Route path beginning with "/" — becomes the canonical URL. */
  path: string;
  /** Absolute or root-relative image path for og:image. */
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const isHome = path === "/";

  /**
   * The root layout owns the `%s | Paddock Pro` template, so pages pass a bare
   * title and let it append the brand exactly once. The homepage opts out with
   * `absolute` rather than reading "Paddock Pro | Paddock Pro".
   */
  const fullTitle = isHome ? HOME_TITLE : `${title} | ${site.name}`;

  return {
    title: isHome ? { absolute: HOME_TITLE } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Logs loudly in development if config/site.ts still holds placeholder data.
 * Cheap insurance against shipping "Your City" to production.
 */
export function warnOnPlaceholders() {
  if (process.env.NODE_ENV === "production") return;
  const problems: string[] = [];
  const geo: { latitude: number; longitude: number } = site.geo;
  if (geo.latitude === 0 && geo.longitude === 0)
    problems.push("geo coordinates (right-click the shop in Google Maps to copy them)");
  if (!site.mapEmbedUrl) problems.push("mapEmbedUrl (Google Maps → Share → Embed a map)");
  if (site.email.startsWith("info@") && !process.env.NEXT_PUBLIC_EMAIL_CONFIRMED)
    problems.push("email / quoteInbox (confirm the address the shop reads)");
  if (problems.length) {
    console.warn(
      `\n\x1b[33m⚠  src/config/site.ts still has placeholder values:\x1b[0m ${problems.join(", ")}` +
        `\n   These feed structured data and canonical URLs. Fix before launch.\n`,
    );
  }
}
