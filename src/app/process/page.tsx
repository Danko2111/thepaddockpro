import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { processSteps, materials, materialFaqs, aftercare } from "@/config/process";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/process" },
];

export const metadata = buildMetadata({
  title: "Our Process & The Materials We Use",
  description:
    "Stage by stage: how a vehicle goes from consultation to handover, and why we install 3M, Avery Dennison and Inozetek film rather than whatever is cheapest.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        breadcrumbs={trail}
        title="Seven stages, no shortcuts"
        lede="Most of what decides whether a wrap lasts happens before any film comes off the roll. Here is the whole sequence, including the parts customers never see."
        image={{ src: "/gallery/ceramic-coating/01-acura-nsx-gloss-black-ceramic-coating.jpg" }}
        imagePosition="center 60%"
      />

      {/* Wall, sticky rail. These steps are a genuine sequence, so they are numbered. */}
      <section className="concrete py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-20">
            <p className="text-lede text-slate lg:sticky lg:top-28 lg:self-start">
              Seven stages, in order. The long one is the fourth, and it is the one nobody
              photographs.
            </p>

            <ol className="space-y-px bg-hairline-light">
              {processSteps.map((step, i) => (
                <li key={step.index} id={`step-${i + 1}`} data-reveal className="scroll-mt-28 bg-wall">
                  <article className="grid gap-6 py-10 lg:grid-cols-[3rem_minmax(0,1fr)_13rem] lg:gap-8">
                    <span className="text-2xl font-extrabold tabular text-cyan-deep">{step.index}</span>

                    <div>
                      <h2 className="text-2xl tracking-[-0.02em]">{step.title}</h2>
                      <p className="mt-4 max-w-[56ch] leading-relaxed text-slate">{step.body}</p>
                    </div>

                    <ul className="space-y-2 text-sm leading-relaxed text-slate-dim">
                      <li className="pb-1 font-medium text-slate">{step.duration}</li>
                      {step.detail.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Navy, typographic */}
      <section id="materials" className="bay scroll-mt-24 py-24 sm:py-32">
        <Container>
          <div data-reveal>
            <h2 className="max-w-[18ch] text-section">Why 3M, Avery and Inozetek</h2>
            <p className="mt-6 max-w-[62ch] text-lede text-haze">
              Film is a minority of what a wrap costs — labour is the rest. Saving a few hundred dollars
              on material buys a job that has to be redone in two years, at full labour price. We only
              install cast film from houses that stand behind it.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog">
              {site.credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </div>

          <dl className="mt-16 divide-y divide-hairline border-y border-hairline">
            {materials.map((material) => (
              <div
                key={material.brand}
                data-reveal
                className="grid gap-6 py-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16"
              >
                <dt>
                  <span className="block text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">{material.brand}</span>
                  <span className="mt-3 block text-sm font-semibold text-cyan-hot">{material.line}</span>
                  <span className="mt-4 block text-sm text-fog-dim">{material.positioning}</span>
                </dt>
                <dd>
                  <p className="max-w-[62ch] leading-relaxed text-fog">{material.body}</p>
                  <ul className="mt-6 grid max-w-[62ch] gap-2 text-sm text-fog-dim sm:grid-cols-2">
                    {material.strengths.map((strength) => (
                      <li key={strength}>{strength}</li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fog-dim">
                    <span className="text-fog">Best for</span> {material.bestFor}{" "}
                    <span className="text-fog">Warranty</span> {material.warranty}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Floor: aftercare, as plates */}
      <section id="aftercare" className="floor scroll-mt-24 py-24 sm:py-32">
        <Container>
          <div data-reveal>
            <h2 className="text-section">Keeping it tight</h2>
            <p className="mt-6 max-w-[58ch] text-lede text-slate">
              A wrap is a finish, not a force field. Look after it the way you would look after paint and
              you get the full life out of it.
            </p>
          </div>

          <ul className="mt-14 grid gap-3 md:grid-cols-2 md:gap-x-4">
            {aftercare.map((item, i) => (
              <li
                key={item.title}
                data-reveal="lay"
                style={{ "--n": i } as React.CSSProperties}
                className="plate h-full"
              >
                <h3 className="text-xl tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FaqList faqs={materialFaqs} title="On film and finish" tone="dark" />

      <CtaBand
        title="Book a consultation"
        body={`Bring the car by, see physical film samples in daylight against your own paint, and leave with a written number. ${site.address.city} and the surrounding area.`}
      />

      <JsonLd data={[howToSchema(processSteps), faqSchema(materialFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}
