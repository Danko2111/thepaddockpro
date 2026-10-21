import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { ServicePlate } from "@/components/service-plate";
import { ScopeSelector } from "@/components/scope-selector";
import { services, serviceBySlug } from "@/config/services";
import { imagesByCategory } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const images = imagesByCategory(service.galleryCategory);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortName, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={trail}
        title={service.name}
        lede={service.tagline}
        image={images[0] ?? { src: "/brand/hero-shop-lineup.jpg" }}
        imagePosition="center 65%"
      >
        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-white/15 pt-8 grid-cols-2 lg:grid-cols-4">
          {service.spec.map((row) => (
            <div key={row.label}>
              <dt className="text-sm text-mist">{row.label}</dt>
              <dd className="mt-1.5 text-lg font-semibold tabular text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Wall: the reading section */}
      <section className="concrete py-24 sm:py-28">
        <Container>
          <div data-reveal className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
            <div className="max-w-[64ch] space-y-6">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lede text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="border-t border-hairline-light pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="text-sm font-bold tracking-normal">Film we use</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate">
                {service.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
              <Link href="/process#materials" className="text-link mt-6 inline-block text-sm">
                Why these films
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {/* Navy: the scopes, as a chooser */}
      <section className="bay py-24 sm:py-28">
        <Container>
          <div data-reveal>
            <h2 className="text-section">Choose the scope</h2>
            <p className="mt-5 max-w-[58ch] text-lede text-haze">
              What differs between these is coverage and material. The preparation underneath does not
              change.
            </p>
          </div>
          <div data-reveal className="mt-12">
            <ScopeSelector options={service.options} />
          </div>
        </Container>
      </section>

      {/* Floor: the work, in slanted frames that interlock, as on the homepage */}
      {images.length > 0 && (
        <section className="floor py-24 sm:py-28">
          <Container>
            <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-section">{service.shortName} work</h2>
              <Link href="/gallery" className="text-link text-sm">
                Full gallery
              </Link>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-x-[calc(1rem-var(--slant))]">
              {images.slice(0, 3).map((image, i) => (
                <li key={image.src} data-reveal style={{ "--n": i } as React.CSSProperties}>
                  <Link href="/gallery" className="group slant relative block aspect-[3/4] overflow-hidden bg-navy">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      className="scale-[1.04] object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FaqList faqs={service.faqs} title="Worth knowing first" />

      {/* Cross-links keep crawl depth shallow between services */}
      <section className="floor py-20">
        <Container>
          <h2 data-reveal className="text-section">Other services</h2>
          <ul className="mt-10 grid gap-3 md:grid-cols-3 md:gap-x-4">
            {others.map((other, i) => (
              <li key={other.slug} data-reveal="lay" style={{ "--n": i } as React.CSSProperties}>
                <ServicePlate service={other} sizes="(max-width: 768px) 100vw, 33vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={`Ready to talk ${service.shortName.toLowerCase()}?`} />
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs), breadcrumbSchema(trail)]} />
    </>
  );
}
