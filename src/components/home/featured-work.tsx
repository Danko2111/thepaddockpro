import Image from "next/image";
import Link from "next/link";
import { featuredImages, galleryCount } from "@/lib/gallery";
import { Container } from "../ui/container";

/**
 * Full-bleed and edge to edge — no container, no card, no gap. After the light
 * carded section above, the work should arrive as one uninterrupted dark band.
 * Each frame drifts against the scroll at a different depth.
 */
export function FeaturedWork() {
  const images = featuredImages(4);
  if (images.length === 0) return null;

  const [lead, ...rest] = images;

  return (
    <section className="bay relative overflow-hidden">
      <Container wide className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[16ch] text-section text-chalk">Cars that left the bay</h2>
          <Link
            href="/gallery"
            className="text-sm font-semibold text-cyan underline-offset-4 hover:underline"
          >
            All {galleryCount} projects
          </Link>
        </div>
      </Container>

      <div className="grid gap-px bg-hairline lg:grid-cols-2">
        <Link
          href="/gallery"
          className="group relative block aspect-[4/5] overflow-hidden bg-ink lg:aspect-auto lg:min-h-[38rem]"
        >
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={lead.blurDataURL}
            className="drift object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent to-55%" />
          <span className="absolute inset-x-0 bottom-0 p-8">
            <span className="block text-xl text-chalk">{lead.title}</span>
            {lead.caption && <span className="mt-1.5 block text-sm text-fog">{lead.caption}</span>}
          </span>
        </Link>

        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {rest.slice(0, 2).map((image) => (
            <Link
              key={image.src}
              href="/gallery"
              className="group relative block aspect-[4/3] overflow-hidden bg-ink lg:aspect-auto"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                className="drift-slow object-cover"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent to-60%" />
              <span className="absolute inset-x-0 bottom-0 p-6">
                <span className="block text-base text-chalk">{image.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
