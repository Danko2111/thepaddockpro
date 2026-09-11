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
        title={
          <>
            Work that
            <br />
            left the shop
          </>
        }
        lede="Every car here was stripped, prepped and wrapped in our bay. No stock photography, no borrowed portfolios — if it is on this page, we did it."
      />

      <section className="py-16 sm:py-20">
        <Container>
          {galleryCount === 0 ? (
            <p className="py-24 text-center text-lg text-fog">
              Photography is being added. In the meantime, ask us for recent examples of the work you have
              in mind.
            </p>
          ) : (
            <GalleryGrid images={galleryImages} categories={populatedCategories} />
          )}
        </Container>
      </section>

      <CtaBand
        eyebrow="Your car next"
        title="Want yours on this page?"
        body="Send the vehicle and the finish you are after. We will tell you what is realistic, what it costs and how long we would need the car."
      />

      <JsonLd data={[imageGallerySchema(galleryImages), breadcrumbSchema(trail)]} />
    </>
  );
}
