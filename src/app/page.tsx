import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { processSteps } from "@/config/process";
import { galleryCount, imageBySrc } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import { MaterialsMarquee } from "@/components/home/materials-marquee";
import { SwatchFan } from "@/components/home/swatch-fan";
import { ServicePlate } from "@/components/service-plate";
import { CtaBand } from "@/components/cta-band";
import { Cta } from "@/components/ui/cta";
import s from "./home.module.css";

export const metadata = buildMetadata({
  title: "Vehicle Wraps, PPF & Fleet Graphics",
  description: `${site.name} installs colour change vinyl wraps, paint protection film, fleet graphics, window tint and ceramic coating in ${site.address.city}, ${site.address.region}. 3M, Avery Dennison and Inozetek film, fitted with the panels stripped.`,
  path: "/",
});

/*
 * FAN AND FLOOR
 *   photo hero → marquee → FLOOR services → photo band ask → FLOOR work → navy fan
 *
 * The photo band sits between the two floor sections so they never touch.
 *
 * No FAQPage structured data here: Google requires FAQ markup to match
 * questions visible on the page. The questions carry FAQPage markup on the
 * service pages and /process, where they are on screen.
 */

/** The three frames under "Out of the bay", picked by the client */
const WORK = [
  "/gallery/colour-change/01-vw-golf-gti-satin-slate-blue.jpg",
  "/gallery/ceramic-coating/01-acura-nsx-gloss-black-ceramic-coating.jpg",
  "/gallery/fleet/02-rh-mechanical-ford-transit-wrap.jpg",
];

export default function HomePage() {
  const work = WORK.map(imageBySrc).filter((i) => i !== null);
  const { rating, count, source } = site.reviews;
  const samples = processSteps.find((step) => /material/i.test(step.title));

  return (
    <>
      {/* ── Hero: one big photograph ───────────────────────────────────── */}
      <section className={s.hero}>
        <Image
          src="/brand/hero-bronco.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={s.heroImage}
        />
        <div className={s.heroShade} aria-hidden />
        <div className={s.heroInner}>
          <h1 className={`${s.h1} load`} style={{ "--n": 0 } as React.CSSProperties}>
            {/* One idea per line: the two cyan words each get a line to themselves */}
            Change the
            <br />
            <span className="accent">colour</span>.
            <br />
            Keep the
            <br />
            <span className="accent">paint</span>.
          </h1>
          <p className={`${s.heroLede} load`} style={{ "--n": 1 } as React.CSSProperties}>
            Colour change wraps, paint protection film, fleet graphics, tint and ceramic coating
            in {site.address.city}, installed with the badges, handles and trim taken off rather
            than cut around.
          </p>
          <div className={`${s.actions} load`} style={{ "--n": 2 } as React.CSSProperties}>
            <Cta href="/contact">Request a quote</Cta>
            <Cta href="/gallery" variant="line">
              See the work
            </Cta>
          </div>
          <a
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.rating} load`}
            style={{ "--n": 3 } as React.CSSProperties}
          >
            {rating.toFixed(1)} from {count} {source} reviews
          </a>
        </div>
      </section>

      {/* ── Film we install, scrolling ─────────────────────────────────── */}
      <MaterialsMarquee />

      {/* ── Services, on the shop floor ────────────────────────────────── */}
      <section className="floor">
        <div className={s.inner}>
          <h2 className="max-w-[17ch] text-section" data-reveal>
            Six services, one way of prepping a car
          </h2>
          <ul className={s.services}>
            {services.map((service, i) => (
              <li key={service.slug} data-reveal="lay" style={{ "--n": i } as React.CSSProperties}>
                <ServicePlate service={service} sizes="(max-width: 820px) 100vw, 45vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Ask, as a full-width photo band between the two floors ─────── */}
      <CtaBand />

      {/* ── Work ───────────────────────────────────────────────────────── */}
      <section className="floor">
        <div className={s.inner}>
          <div className={s.head} data-reveal>
            <h2 className="max-w-[17ch] text-section">Out of the bay</h2>
            <Link href="/gallery" className="text-link">
              All {galleryCount} projects
            </Link>
          </div>
          <ul className={s.work}>
            {work.map((image, i) => {
              const service = services.find((sv) => sv.galleryCategory === image.category);
              return (
                <li key={image.src} data-reveal style={{ "--n": i } as React.CSSProperties}>
                  <Link href="/gallery" className={s.workItem}>
                    <span className={`slant ${s.workPhoto}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                        className={s.cover}
                      />
                      <span className={s.plate} aria-hidden>
                        {service && <span className={s.plateService}>{service.name}</span>}
                        <span className={s.plateTitle}>{image.title}</span>
                        {image.caption && <span className={s.plateCaption}>{image.caption}</span>}
                      </span>
                    </span>
                    <span className={s.workTitle}>{image.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── The fan: finishes, seen in person ──────────────────────────── */}
      <section className={s.samples}>
        <div className={`${s.inner} ${s.samplesGrid}`}>
          <div>
            <h2 className="max-w-[17ch] text-section" data-reveal>
              See every finish in <span className="accent">daylight</span> first
            </h2>
            {samples && (
              <p className={s.samplesBody} data-reveal>
                {samples.body}
              </p>
            )}
            <div className={s.actions} data-reveal style={{ "--n": 2 } as React.CSSProperties}>
              <Cta href="/contact">Ask to see samples</Cta>
              <Cta href="/process#materials" variant="line">
                How we choose film
              </Cta>
            </div>
          </div>
          <SwatchFan openOnView />
        </div>
      </section>
    </>
  );
}
