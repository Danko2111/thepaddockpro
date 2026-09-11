import { Hero } from "@/components/home/hero";
import { MaterialsMarquee } from "@/components/home/materials-marquee";
import { ServicesGrid } from "@/components/home/services-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vehicle Wraps, PPF & Fleet Graphics",
  description: `${site.name} installs colour change vinyl wraps, paint protection film, fleet graphics, window tint and ceramic coating in ${site.address.city}, ${site.address.region}. 3M, Avery Dennison and Inozetek film, fitted with the panels stripped.`,
  path: "/",
});

/*
 * Lean homepage: the photograph, what we do, proof, ask.
 *   dark full-bleed → marquee → LIGHT carded → dark full-bleed → dark CTA
 *
 * No FAQPage structured data here any more. Google requires FAQ markup to
 * match questions that are actually visible on the page, and the FAQ section
 * is gone — emitting it anyway risks a structured-data manual action. The
 * questions still carry FAQPage markup on the service pages, /process and
 * /cost-guide, where they are on screen.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MaterialsMarquee />
      <ServicesGrid />
      <FeaturedWork />
      <CtaBand />
    </>
  );
}
