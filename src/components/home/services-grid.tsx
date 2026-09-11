import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/services";
import { imagesByCategory } from "@/lib/gallery";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";
import { Cta } from "../ui/cta";

/**
 * Light section, contained, carded — the counterweight to the full-bleed dark
 * bands either side of it. Services we have photographed become photo cards;
 * the rest are type-led. The grid varies because the content does, not because
 * a layout wanted texture.
 */
export function ServicesGrid() {
  const cards = services.map((service) => ({
    service,
    image: imagesByCategory(service.galleryCategory)[0] ?? null,
  }));

  return (
    <section className="concrete py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            tone="light"
            title="Six things we do, one way of doing them"
            lede="A weekend car and a plumber's van get the same preparation: trim off, paint decontaminated, film chosen for the bodywork in front of us."
          />
          <Cta href="/services" variant="line" tone="light">
            All services
          </Cta>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ service, image }) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded border border-hairline-light bg-paper-raised transition-colors duration-300 hover:border-graphite/35"
              >
                {image ? (
                  <div className="relative aspect-[5/3] overflow-hidden bg-paper">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                ) : (
                  <div className="aspect-[5/3] bg-graphite/[0.04]" aria-hidden />
                )}

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl text-graphite">{service.name}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate">{service.tagline}</p>

                  <dl className="mt-6 flex-1 space-y-1.5 border-t border-hairline-light pt-5 text-sm">
                    {service.spec.slice(0, 2).map((row) => (
                      <div key={row.label} className="flex justify-between gap-4">
                        <dt className="text-slate-dim">{row.label}</dt>
                        <dd className="text-right tabular text-graphite">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-6 text-sm font-semibold text-cyan-deep underline-offset-4 group-hover:underline">
                    {service.shortName} detail
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
