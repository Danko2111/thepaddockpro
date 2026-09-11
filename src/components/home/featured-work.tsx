import Image from "next/image";
import Link from "next/link";
import { featuredImages, galleryCount } from "@/lib/gallery";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";
import { Cta } from "../ui/cta";

export function FeaturedWork() {
  const images = featuredImages(6);
  if (images.length === 0) return null;

  return (
    <section className="border-b border-line py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="02"
            eyebrow="Recent work"
            title={
              <>
                Cars that left
                <br />
                the shop
              </>
            }
          />
          <Cta href="/gallery" variant="outline">
            All {galleryCount} projects
          </Cta>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <li key={image.src} className={i === 0 ? "sm:col-span-2 sm:row-span-1" : undefined}>
              <Link
                href="/gallery"
                className="group relative block overflow-hidden bg-surface"
                aria-label={`View ${image.title} in the gallery`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-lg font-bold uppercase leading-tight text-chalk">
                    {image.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
