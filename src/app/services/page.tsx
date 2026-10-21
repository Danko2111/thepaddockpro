import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { imagesByCategory } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata = buildMetadata({
  title: "Wrap, PPF, Tint & Coating Services",
  description: `Colour change wraps, paint protection film, fleet graphics, decals, window tint and ceramic coating from ${site.name} in ${site.address.city}, ${site.address.region}.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={trail}
        title={<>Everything we put on a <span className="accent">car</span></>}
        lede="Six services, one preparation standard. Every job starts the same way — trim off, paint decontaminated, film chosen for the bodywork in front of us rather than whatever is on the shelf."
        image={{ src: "/gallery/colour-change/01-vw-golf-gti-satin-slate-blue.jpg" }}
        imagePosition="center 70%"
      />

      {/* Alternating rows, the slanted frame swapping sides down the page */}
      <section className="concrete py-20 sm:py-28">
        <Container>
          <ul className="space-y-20 sm:space-y-28">
            {services.map((service, i) => {
              const image = imagesByCategory(service.galleryCategory)[0] ?? null;
              const flip = i % 2 === 1;

              return (
                <li key={service.slug} data-reveal>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={flip ? "lg:order-2" : undefined}>
                      {image ? (
                        <div className="slant relative aspect-[4/3] overflow-hidden bg-navy">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            placeholder="blur"
                            blurDataURL={image.blurDataURL}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="floor slant flex aspect-[4/3] items-end px-[calc(var(--slant)+1.5rem)] py-8">
                          <p className="max-w-[36ch] text-lede text-slate">
                            Photography for this service is on the way. Ask and we will send recent
                            examples of the work you have in mind.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={flip ? "lg:order-1" : undefined}>
                      <h2 className="text-section">{service.name}</h2>
                      <p className="mt-4 text-lede text-slate">{service.tagline}</p>
                      <p className="mt-6 max-w-[58ch] leading-relaxed text-slate">{service.intro[0]}</p>

                      <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-hairline-light pt-6 text-sm sm:grid-cols-2">
                        {service.spec.map((row) => (
                          <div key={row.label} className="flex justify-between gap-4">
                            <dt className="text-slate-dim">{row.label}</dt>
                            <dd className="text-right tabular text-graphite">{row.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <Link
                        href={`/services/${service.slug}`}
                        className="btn btn-navy mt-8"
                      >
                        Everything about {service.shortName.toLowerCase()}
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
