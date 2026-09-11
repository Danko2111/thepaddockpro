import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { services } from "@/config/services";
import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bay relative isolate flex min-h-[80svh] items-center pt-[4.5rem]">
      

      <Container className="py-24">
        <p className="text-sm text-cyan">Error 404</p>

        <h1 className="mt-5 max-w-[14ch] text-hero text-chalk">
          Wrong pit box
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-fog">
          That page does not exist. Here is everything that does.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href="/">Back to home</Cta>
          <Cta href="/contact" variant="line">
            Get a quote
          </Cta>
        </div>

        <ul className="mt-16 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="bg-ink">
              <Link href={`/services/${service.slug}`} className="group block p-6 transition-colors hover:bg-steel">
                
                <span className="block text-base text-chalk transition-colors group-hover:text-cyan">
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
