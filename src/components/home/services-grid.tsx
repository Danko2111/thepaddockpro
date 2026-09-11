import Link from "next/link";
import { services } from "@/config/services";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";
import { Reveal } from "../ui/reveal";

export function ServicesGrid() {
  return (
    <section className="border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHead
          index="01"
          eyebrow="What we do"
          title={
            <>
              Four services.
              <br />
              One standard.
            </>
          }
          lede="Whether it is a full colour change on a weekend car or fifteen vans that need to look identical, the preparation is the same and the film is the same."
        />

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70} className="bg-ink">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-surface sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.7rem] tabular text-accent">{service.index}</span>
                  <span className="h-px flex-1 bg-line transition-colors duration-300 group-hover:bg-accent" />
                </div>

                <h3 className="mt-7 font-display text-2xl font-bold uppercase text-chalk sm:text-3xl">
                  {service.name}
                </h3>
                <p className="mt-3 text-base text-fog">{service.tagline}</p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-fog-dim">{service.intro[0]}</p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {service.materials.map((m) => (
                    <span
                      key={m}
                      className="border border-line px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fog-dim"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <span className="mt-8 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chalk">
                  Read more
                  <span aria-hidden className="text-accent transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
