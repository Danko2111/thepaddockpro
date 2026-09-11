import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata = buildMetadata({
  title: "Wrap, PPF, Tint & Coating Services",
  description: `Colour change wraps, paint protection film, commercial fleet graphics and custom decals from ${site.name} in ${site.address.city}, ${site.address.region}.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        breadcrumbs={trail}
        title={
          <>
            Everything we
            <br />
            put on a car
          </>
        }
        lede="Four services, one preparation standard. Every job starts the same way — trim off, paint decontaminated, film chosen for the bodywork in front of us rather than whatever is on the shelf."
      />

      <section className="border-b border-line">
        <Container className="py-0">
          <ul>
            {services.map((service) => (
              <li key={service.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-8 py-14 transition-colors lg:grid-cols-[7rem_1fr_20rem] lg:items-start"
                >
                  <span className="font-mono text-[0.7rem] tabular text-accent">{service.index}</span>

                  <div>
                    <h2 className="font-display text-3xl font-extrabold uppercase text-chalk transition-colors group-hover:text-accent sm:text-5xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-fog">{service.tagline}</p>
                    <p className="mt-5 max-w-2xl leading-relaxed text-fog-dim">{service.intro[0]}</p>

                    <span className="mt-8 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chalk">
                      Explore {service.shortName.toLowerCase()}
                      <span aria-hidden className="text-accent transition-transform duration-200 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>

                  <dl className="space-y-3 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    {service.spec.map((row) => (
                      <div key={row.label} className="flex justify-between gap-4 text-sm">
                        <dt className="text-fog-dim">{row.label}</dt>
                        <dd className="text-right tabular text-chalk">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
