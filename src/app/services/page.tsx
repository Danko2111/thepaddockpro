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
        title="Everything we put on a car"
        lede="Six services, one preparation standard. Every job starts the same way — trim off, paint decontaminated, film chosen for the bodywork in front of us rather than whatever is on the shelf."
      />

      {/* Light and contained: alternating rows, image side swapping down the page */}
      <section className="concrete py-20 sm:py-28">
        <Container>
          <ul className="space-y-20 sm:space-y-28">
            {services.map((service, i) => {
              const image = imagesByCategory(service.galleryCategory)[0] ?? null;
              const flip = i % 2 === 1;

              return (
                <li key={service.slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={flip ? "lg:order-2" : undefined}>
                      {image ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded bg-paper-raised">
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
                        <div className="flex aspect-[4/3] items-end rounded border border-hairline-light bg-paper-raised p-8">
                          <p className="max-w-[36ch] text-lede text-slate-dim">
                            Photography for this service is on the way. Ask and we will send recent
                            examples of the work you have in mind.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={flip ? "lg:order-1" : undefined}>
                      <h2 className="text-section text-graphite">{service.name}</h2>
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
                        className="mt-8 inline-block text-[0.95rem] font-semibold text-cyan-deep underline-offset-4 hover:underline"
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
