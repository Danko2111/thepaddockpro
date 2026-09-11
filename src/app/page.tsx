import { Hero } from "@/components/home/hero";
import { BrandTicker } from "@/components/home/brand-ticker";
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
  description: `${site.name} installs full colour change vinyl wraps, paint protection film and commercial fleet graphics in ${site.address.city}, ${site.address.region}. 3M, Avery Dennison and Inozetek film, fitted with the panels stripped.`,
  path: "/",
});

/** One representative question per service — the whole set lives on each service page. */
const homeFaqs = services.map((service) => service.faqs[0]);

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandTicker />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessTeaser />
      <MaterialsStrip />
      <FaqList
        faqs={homeFaqs}
        index="05"
        title={
          <>
            The questions
            <br />
            everyone asks
          </>
        }
        lede="Four answers up front. Every service page goes deeper."
      />
      <CtaBand />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
