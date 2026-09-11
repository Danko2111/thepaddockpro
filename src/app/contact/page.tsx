import { QuoteForm } from "@/components/quote/quote-form";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { GoogleRating } from "@/components/google-rating";
import { site, fullAddress } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = buildMetadata({
  title: "Request a Quote — Langley, BC",
  description: `Get a vehicle wrap, PPF or fleet graphics quote from ${site.name} in ${site.address.city}, ${site.address.region}. Send your vehicle and coverage and we come back within one business day.`,
  path: "/contact",
});

const DAY_ABBR: Record<string, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

const to12h = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Quote request"
        breadcrumbs={trail}
        title={
          <>
            Tell us about
            <br />
            the vehicle
          </>
        }
        lede="The more you give us up front, the closer the first number is to the final one. Every enquiry is read by a person, and we normally reply within one business day."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
            <div>
              <QuoteForm />
            </div>

            <aside className="space-y-10 lg:border-l lg:border-line lg:pl-10">
              <div>
                <h2 className="eyebrow">Rather just call</h2>
                <a
                  href={site.phoneHref}
                  className="mt-4 block font-display text-3xl font-extrabold uppercase tabular text-chalk transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-sm text-fog transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
                <GoogleRating className="mt-5" compact />
              </div>

              <div>
                <h2 className="eyebrow">The shop</h2>
                <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-fog">
                  <div className="text-chalk">
                    {site.address.street}
                    {site.address.unit && `, ${site.address.unit}`}
                  </div>
                  <div>
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </div>
                </address>
                {site.mapsLink && (
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fog transition-colors hover:text-accent"
                  >
                    Directions <span aria-hidden>→</span>
                  </a>
                )}
              </div>

              <div>
                <h2 className="eyebrow">Hours</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {site.hours.map((row) => (
                    <div key={row.days.join()} className="flex justify-between gap-4 border-b border-line pb-2">
                      <dt className="text-fog">
                        {row.days.length > 1
                          ? `${DAY_ABBR[row.days[0]]}–${DAY_ABBR[row.days[row.days.length - 1]]}`
                          : DAY_ABBR[row.days[0]]}
                      </dt>
                      <dd className="tabular text-chalk">
                        {to12h(row.opens)} – {to12h(row.closes)}
                      </dd>
                    </div>
                  ))}
                  {site.closedDays.map((day) => (
                    <div key={day} className="flex justify-between gap-4 border-b border-line pb-2">
                      <dt className="text-fog">{DAY_ABBR[day]}</dt>
                      <dd className="text-fog-dim">Closed</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="eyebrow">Service area</h2>
                <p className="mt-4 text-sm leading-relaxed text-fog">
                  {site.serviceArea.join(" · ")} and the surrounding area. Commercial fleets collected and
                  returned by arrangement.
                </p>
              </div>

              <div className="border border-line bg-surface p-6">
                <h2 className="eyebrow">Photos help</h2>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  Reply to your confirmation email with a three-quarter front, a straight side, and close-ups
                  of any damage or previous paintwork. It is the difference between a range and a firm price.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Map — loaded lazily so it costs nothing on Core Web Vitals */}
      {site.mapEmbedUrl && (
        <section className="border-t border-line">
          <h2 className="sr-only">Shop location map</h2>
          <iframe
            src={site.mapEmbedUrl}
            title={`Map showing ${site.name} at ${fullAddress}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full grayscale-[0.6] contrast-[1.1]"
          />
        </section>
      )}

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
