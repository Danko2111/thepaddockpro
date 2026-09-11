import { site } from "@/config/site";
import type { Service } from "@/config/services";

const id = (hash: string) => `${site.url}/#${hash}`;

/** Only emit geo if real coordinates have been filled in. */
const geo =
  site.geo.latitude !== 0 || site.geo.longitude !== 0
    ? {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      }
    : undefined;

const sameAs = Object.values(site.social).filter(Boolean);

const openingHoursSpecification = [
  ...site.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...h.days],
    opens: h.opens,
    closes: h.closes,
  })),
  ...site.closedDays.map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d,
    opens: "00:00",
    closes: "00:00",
  })),
];

/**
 * AutoBodyShop is the most specific schema.org type for a wrap shop and
 * inherits every LocalBusiness property Google reads for the local pack.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": id("business"),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/brand/logo.png`,
    priceRange: "$$–$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: [site.address.street, site.address.unit].filter(Boolean).join(", "),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    ...(geo ? { geo } : {}),
    ...(site.mapsLink ? { hasMap: site.mapsLink } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    openingHoursSpecification,
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    knowsAbout: [
      "vehicle wrapping",
      "vinyl wrap installation",
      "paint protection film",
      "commercial fleet graphics",
      "chrome delete",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": id("website"),
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": id("business") },
    inLanguage: "en-US",
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    url: `${site.url}/services/${service.slug}`,
    serviceType: service.name,
    provider: { "@id": id("business") },
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} options`,
      itemListElement: service.options.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name, description: o.detail },
      })),
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function imageGallerySchema(images: { src: string; alt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${site.name} — completed work`,
    description: `Vehicle wraps, paint protection film and fleet graphics completed by ${site.name} in ${site.address.city}.`,
    url: `${site.url}/gallery`,
    image: images.slice(0, 40).map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${site.url}${img.src}`,
      description: img.alt,
      creditText: site.name,
      creator: { "@id": id("business") },
    })),
  };
}

export function howToSchema(steps: { title: string; body: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${site.name} installs a vehicle wrap`,
    description: `The stage-by-stage process ${site.name} follows on every vehicle, from consultation through post-heat and handover.`,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
      url: `${site.url}/process#step-${i + 1}`,
    })),
  };
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${site.url}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${path}` },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": id("business") },
    publisher: { "@id": id("business") },
    image: `${site.url}/opengraph-image`,
    inLanguage: "en-US",
  };
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
