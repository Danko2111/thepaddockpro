import { Hero } from "@/components/home/hero";
import { MaterialsBand } from "@/components/home/materials-band";
import { ServicesGrid } from "@/components/home/services-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { ProcessTeaser } from "@/components/home/process-teaser";
import { MaterialsStrip } from "@/components/home/materials-strip";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Vehicle Wraps, PPF & Fleet Graphics",
  description: `${site.name} installs colour change vinyl wraps, paint protection film, fleet graphics, window tint and ceramic coating in ${site.address.city}, ${site.address.region}. 3M, Avery Dennison and Inozetek film, fitted with the panels stripped.`,
  path: "/",
});

/** One question per service; each service page carries the full set. */
const homeFaqs = services.map((service) => service.faqs[0]);

/*
 * Section rhythm alternates dark/full-bleed with light/contained. Read down the
 * list and you should see the page breathe:
 *   dark full-bleed → dark band → LIGHT carded → dark full-bleed →
 *   LIGHT rail → dark typographic → LIGHT → dark full-bleed
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MaterialsBand />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessTeaser />
      <MaterialsStrip />
      <FaqList
        faqs={homeFaqs}
        title="The questions everyone asks"
        lede="One answer per service. Each service page goes further."
      />
      <CtaBand />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
