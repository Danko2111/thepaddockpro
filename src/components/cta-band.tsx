import Image from "next/image";
import { hoursLine, site } from "@/config/site";
import { Container } from "./ui/container";
import { Cta } from "./ui/cta";

/**
 * The ask, over a full-width photograph: the phone number set big enough to
 * read from across the room, the address and hours, and two ways in.
 */
export function CtaBand({
  title = "Bring it to the Paddock Pro",
  body,
}: {
  title?: string;
  /** Sits above the address line; leave it out and the address stands alone */
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* Unsplash licence (free commercial use, no attribution required).
          Stock, not the shop's own work: fine as an atmosphere photo here,
          never in the gallery. Photo: Deniz Demirci. */}
      <Image
        src="/brand/cta-ppf-install.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[60%_55%]"
      />
      {/* Weighted to the copy; on phones the copy spans the frame, so shade evenly */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(13,27,46,0.92)_0%,rgba(13,27,46,0.7)_45%,rgba(13,27,46,0.35)_100%)] max-md:bg-none max-md:bg-navy/86"
      />

      <Container className="py-20 sm:py-36">
        <div data-reveal>
          <h2 className="max-w-[17ch] text-section text-white">{title}</h2>
          <a
            href={site.phoneHref}
            className="mt-5 inline-block text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.02em] text-white tabular transition-colors hover:text-haze"
          >
            {site.phone}
          </a>
          {body && <p className="mt-6 max-w-[56ch] text-lede text-haze">{body}</p>}
          <p className="mt-5 max-w-[52ch] text-haze">
            {site.address.street}, {site.address.unit}, {site.address.city}. Open {hoursLine()}.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Cta href="/contact">Request a quote</Cta>
            <Cta href={site.mapsLink} variant="line">
              Get directions
            </Cta>
          </div>
        </div>
      </Container>
    </section>
  );
}
