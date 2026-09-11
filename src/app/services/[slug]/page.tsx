import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
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
        image={images[0] ?? null}
      >
        <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {service.spec.map((row) => (
            <div key={row.label}>
              <dt className="text-sm text-fog-dim">{row.label}</dt>
              <dd className="mt-1.5 text-lg tabular text-chalk">{row.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Light: the reading section */}
      <section className="concrete py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
            <div className="max-w-[64ch] space-y-6">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lede text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="border-t border-hairline-light pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="text-sm font-semibold text-graphite">Film we use</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate">
                {service.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
              <Link
                href="/process#materials"
                className="mt-6 inline-block text-sm font-semibold text-cyan-deep underline-offset-4 hover:underline"
              >
                Why these films
              </Link>
            </aside>
          </div>

          <div className="mt-20 border-t border-hairline-light pt-16">
            <h2 className="text-section text-graphite">Choose the scope</h2>
            <p className="mt-5 max-w-[58ch] text-lede text-slate">
              What differs between these is coverage and material. The preparation underneath does not
              change.
            </p>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.options.map((option) => (
                <li
                  key={option.name}
                  className="rounded border border-hairline-light bg-paper-raised p-7"
                >
                  <h3 className="text-lg text-graphite">{option.name}</h3>
                  <p className="mt-3 leading-relaxed text-slate">{option.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Dark, full-bleed: the work */}
      {images.length > 0 && (
        <section className="bay">
          <Container wide className="py-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-section text-chalk">{service.shortName} work</h2>
              <Link href="/gallery" className="text-sm font-semibold text-cyan underline-offset-4 hover:underline">
                Full gallery
              </Link>
            </div>
          </Container>
          <ul className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {images.slice(0, 3).map((image) => (
              <li key={image.src}>
                <Link href="/gallery" className="relative block aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="drift-slow object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <FaqList faqs={service.faqs} title="Worth knowing first" />

      {/* Cross-links keep crawl depth shallow between services */}
      <section className="bay border-t border-hairline py-16">
        <Container>
          <h2 className="text-sm font-semibold text-chalk">Other services</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/services/${other.slug}`} className="group block">
                  <h3 className="text-lg text-chalk transition-colors group-hover:text-cyan">
                    {other.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-fog">{other.tagline}</p>
                </Link>
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
