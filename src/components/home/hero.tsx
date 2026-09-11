import Image from "next/image";
import { site } from "@/config/site";
import { Container } from "../ui/container";
import { Cta } from "../ui/cta";
import { GoogleRating } from "../google-rating";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-[4.5rem]">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/brand/hero-shop-lineup.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={84}
          className="drift object-cover object-[center_56%]"
        />
      </div>

      {/* Bottom-weighted so the photograph survives. It is a night shot; a
          full-frame wash erases it. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-[6%] via-ink/62 via-[34%] to-transparent to-[72%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent lg:via-[42%]"
      />
      <div aria-hidden className="grain-layer -z-10" />

      <Container wide className="relative pb-16 pt-28 sm:pb-20">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="max-w-[13ch] text-hero uppercase text-chalk">
              Vehicle wraps
              <br />
              Langley&nbsp;BC
            </h1>

            <p className="mt-8 max-w-[54ch] text-lede text-fog">
              Colour change vinyl, paint protection film, fleet graphics, window tint and ceramic
              coating — installed with the badges, handles and trim taken off, not cut around.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Cta href="/contact">Request a quote</Cta>
              <Cta href="/gallery" variant="line">
                See the work
              </Cta>
            </div>
          </div>

          {/* Quiet column: the two things a ready-to-buy visitor wants */}
          <div className="flex flex-col gap-6 border-t border-hairline pt-8 lg:w-64 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <GoogleRating compact />
            <div>
              <a
                href={site.phoneHref}
                className="block text-2xl font-semibold tabular text-chalk transition-colors hover:text-cyan"
              >
                {site.phone}
              </a>
              <p className="mt-2 text-sm text-fog">
                {site.address.street}, {site.address.city}
                <br />
                Open Monday to Saturday, 8–5
              </p>
            </div>
          </div>
        </div>
        {/* The hero now fills the viewport, so say that there is more below */}
        <div aria-hidden className="mt-14 hidden items-center gap-4 sm:flex">
          <span className="scroll-cue h-10 w-px bg-hairline-strong" />
          <span className="text-sm text-fog-dim">Scroll</span>
        </div>
      </Container>
    </section>
  );
}
