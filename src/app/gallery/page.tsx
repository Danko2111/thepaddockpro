import { PageHero } from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { galleryImages, populatedCategories, galleryCount } from "@/lib/gallery";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, imageGallerySchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/gallery" },
];

export const metadata = buildMetadata({
  title: "Vehicle Wrap Gallery — Langley, BC",
  description: `Completed colour change wraps, paint protection film, fleet graphics and chrome delete work by ${site.name} in ${site.address.city}, ${site.address.region}.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={`${galleryCount} projects`}
        breadcrumbs={trail}
        title="Work that left the bay"
        lede="Every car here was stripped, prepped and wrapped in our bay. No stock photography, no borrowed portfolios — if it is on this page, we did it."
        image={{ src: "/gallery/fleet/02-rh-mechanical-ford-transit-wrap.jpg" }}
        imagePosition="center 60%"
      />

      <section className="floor py-16 sm:py-24">
        <Container>
          {galleryCount === 0 ? (
            <p className="py-24 text-center text-lede text-slate">
              Photography is being added. In the meantime, ask us for recent examples of the work you have
              in mind.
            </p>
          ) : (
            <GalleryGrid images={galleryImages} categories={populatedCategories} />
          )}
        </Container>
      </section>

      <CtaBand
        title="Want yours on this page?"
        body="Send the vehicle and the finish you are after. We will tell you what is realistic, what it costs and how long we would need the car."
      />

      <JsonLd data={[imageGallerySchema(galleryImages), breadcrumbSchema(trail)]} />
    </>
  );
}
