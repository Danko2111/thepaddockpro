import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { services } from "@/config/services";
import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bay relative isolate flex min-h-[80svh] items-center pt-[4.5rem]">
      <Container className="py-24">
        <p className="load text-sm font-semibold text-cyan-hot">Error 404</p>

        <h1 className="load mt-5 max-w-[14ch] text-hero" style={{ "--n": 1 } as React.CSSProperties}>
          Wrong pit box
        </h1>
        <p className="load mt-6 max-w-lg text-lede text-haze" style={{ "--n": 2 } as React.CSSProperties}>
          That page does not exist. Here is everything that does.
        </p>

        <div className="load mt-10 flex flex-wrap gap-3" style={{ "--n": 3 } as React.CSSProperties}>
          <Cta href="/">Back to home</Cta>
          <Cta href="/contact" variant="line">
            Get a quote
          </Cta>
        </div>

        <ul className="load mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" style={{ "--n": 4 } as React.CSSProperties}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group block rounded-xl border border-white/10 bg-navy-2 p-6 transition-colors hover:border-white/25 hover:bg-navy-3"
              >
                <span className="block font-semibold text-white">
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
