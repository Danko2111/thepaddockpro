import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { services } from "@/config/services";
import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center pt-[4.5rem]">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-30" />

      <Container className="py-24">
        <div className="flex items-center gap-4">
          <span className="hatch h-3 w-12" aria-hidden />
          <p className="eyebrow">Error 404</p>
        </div>

        <h1 className="mt-8 max-w-[14ch] font-display text-hero font-extrabold uppercase text-chalk">
          Wrong pit box
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-fog">
          That page does not exist. Here is everything that does.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href="/">Back to home</Cta>
          <Cta href="/contact" variant="outline">
            Get a quote
          </Cta>
        </div>

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="bg-ink">
              <Link href={`/services/${service.slug}`} className="group block p-6 transition-colors hover:bg-surface">
                <span className="font-mono text-[0.65rem] tabular text-accent">{service.index}</span>
                <span className="mt-3 block font-display text-base font-bold uppercase text-chalk transition-colors group-hover:text-accent">
                  {service.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
