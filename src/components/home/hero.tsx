import Image from "next/image";
import { site, cityRegion } from "@/config/site";
import { Container } from "../ui/container";
import { Cta } from "../ui/cta";
import { GoogleRating } from "../google-rating";

const STATS = [
  { value: "6", label: "Services under one roof" },
  { value: "5–7", label: "Year film life" },
  { value: "100%", label: "Panels off, not cut around" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-[4.5rem]">
      {/* Backdrop */}
      <Image
        src="/brand/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={82}
        // ⛔ TEMPORARY hero. Two problems before this can ship:
        //   1. Source is 596x335 — upscaled 2x here, still soft full-bleed.
        //      Needs the original file.
        //   2. The building signage in it reads "THE PADDOCK", not "Paddock
        //      Pro", which contradicts the name in the header two inches above.
        // Fallback available at /brand/hero-bronco.jpg.
        className="-z-20 object-cover object-[center_56%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/40"
      />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-[0.35]" />
      <div aria-hidden className="grain-layer -z-10" />

      <Container wide className="relative pb-14 pt-24 sm:pb-20">
        <div className="flex items-center gap-4">
          <span className="hatch h-3 w-14" aria-hidden />
          <p className="eyebrow">
            Wrap &amp; film specialists · {cityRegion}
          </p>
        </div>

        <h1 className="mt-8 max-w-[18ch] font-display text-display font-extrabold uppercase text-chalk">
          Vehicle wraps
          <br />
          built to <span className="text-accent">paddock</span>
          <br />
          standard
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
          Colour change vinyl, paint protection film, fleet graphics, window tint and ceramic coating in{" "}
          <span className="text-chalk">{site.address.city}, BC</span>. 3M, Avery Dennison and Inozetek film —
          installed with the badges, handles and trim taken off, not cut around.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Cta href="/contact">Get a quote</Cta>
          <Cta href="/gallery" variant="outline">
            See the work
          </Cta>
          <a
            href={site.phoneHref}
            className="px-4 py-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fog transition-colors hover:text-chalk"
          >
            or call {site.phone}
          </a>
        </div>

        <GoogleRating className="mt-8" compact />

        <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-px border-t border-line sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-b border-line py-5 pr-6 sm:border-b-0">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold tabular text-chalk">
                  {stat.value}
                </span>
                <span className="mt-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fog-dim">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
