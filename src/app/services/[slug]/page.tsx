import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { Cta } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";
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

  const images = imagesByCategory(service.galleryCategory).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortName, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero index={service.index} eyebrow="Service" breadcrumbs={trail} title={service.name} lede={service.tagline}>
        <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {service.spec.map((row) => (
            <div key={row.label} className="bg-ink p-6">
              <dt className="eyebrow">{row.label}</dt>
              <dd className="mt-3 font-display text-xl font-bold uppercase tabular text-chalk">{row.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Intro */}
      <section className="border-b border-line py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_18rem]">
            <div className="max-w-3xl space-y-6">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lg leading-relaxed text-fog">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="eyebrow">Film we use</h2>
              <ul className="mt-5 space-y-3">
                {service.materials.map((material) => (
                  <li key={material} className="flex items-start gap-3 text-sm text-chalk">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                    {material}
                  </li>
                ))}
              </ul>
              <Link
                href="/process#materials"
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fog transition-colors hover:text-accent"
              >
                Why these films <span aria-hidden>→</span>
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {/* Options */}
      <section className="border-b border-line bg-ink-soft py-24 sm:py-32">
        <Container>
          <SectionHead
            eyebrow="Coverage &amp; options"
            title="Choose the scope"
            lede="What differs between these is mostly coverage and material. The preparation underneath does not change."
          />

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.options.map((option, i) => (
              <Reveal as="li" key={option.name} delay={i * 50} className="bg-ink-soft p-8">
                <span className="font-mono text-[0.65rem] tabular text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase text-chalk">{option.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{option.detail}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Work */}
      {images.length > 0 && (
        <section className="border-b border-line py-24 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead eyebrow="Recent" title={`${service.shortName} work`} />
              <Cta href="/gallery" variant="outline">
                Full gallery
              </Cta>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {images.map((image) => (
                <li key={image.src}>
                  <Link href="/gallery" className="group block overflow-hidden bg-surface">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FaqList faqs={service.faqs} eyebrow={`${service.shortName} questions`} title="Worth knowing first" />

      {/* Cross-links keep crawl depth shallow and pass authority between services */}
      <section className="border-b border-line py-20">
        <Container>
          <h2 className="eyebrow">Other services</h2>
          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug} className="bg-ink">
                <Link href={`/services/${other.slug}`} className="group block p-7 transition-colors hover:bg-surface">
                  <span className="font-mono text-[0.65rem] tabular text-accent">{other.index}</span>
                  <h3 className="mt-3 font-display text-lg font-bold uppercase text-chalk transition-colors group-hover:text-accent">
                    {other.name}
                  </h3>
                  <p className="mt-2 text-sm text-fog-dim">{other.tagline}</p>
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
