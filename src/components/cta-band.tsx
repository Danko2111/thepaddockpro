import Image from "next/image";
import { site } from "@/config/site";
import { Container } from "./ui/container";
import { Cta } from "./ui/cta";

export function CtaBand({
  title = "Tell us about the car",
  body = "Send the year, make, model and what you have in mind. Photos help. You get a realistic range back the same day, the film we would use, and how long the car would be with us.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/brand/hero-bronco.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={78}
          className="drift-slow object-cover object-[center_45%]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/82" />
      <div aria-hidden className="grain-layer -z-10" />

      <Container className="py-28 sm:py-36">
        <div className="max-w-2xl">
          <h2 className="text-section text-chalk">{title}</h2>
          <p className="mt-6 max-w-[58ch] text-lede text-fog">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Cta href="/contact">Request a quote</Cta>
            <Cta href={site.phoneHref} variant="line">
              {site.phone}
            </Cta>
          </div>
        </div>
      </Container>
    </section>
  );
}
