import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
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
        eyebrow="Process & materials"
        breadcrumbs={trail}
        title={
          <>
            Seven stages,
            <br />
            no shortcuts
          </>
        }
        lede="Most of what decides whether a wrap lasts happens before any film comes off the roll. Here is the whole sequence, including the parts customers never see."
      />

      {/* Process */}
      <section className="border-b border-line py-24 sm:py-32">
        <Container>
          <ol className="border-t border-line">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.index} id={`step-${i + 1}`} className="scroll-mt-28">
                <article className="grid gap-8 border-b border-line py-14 lg:grid-cols-[6rem_1fr_1fr] lg:gap-12">
                  <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
                    <span className="font-display text-4xl font-extrabold tabular leading-none text-accent">
                      {step.index}
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog-dim">
                      {step.duration}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-extrabold uppercase text-chalk sm:text-4xl">
                      {step.title}
                    </h2>
                    <p className="mt-5 max-w-xl leading-relaxed text-fog">{step.body}</p>
                  </div>

                  <ul className="space-y-3 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    {step.detail.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-fog-dim">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Materials */}
      <section id="materials" className="scroll-mt-24 border-b border-line bg-ink-soft py-24 sm:py-32">
        <Container>
          <SectionHead
            eyebrow="Materials"
            title={
              <>
                Why 3M, Avery
                <br />
                and Inozetek
              </>
            }
            lede="Film is a minority of what a wrap costs — labour is the rest. Saving a few hundred dollars on material buys a job that has to be redone in two years, at full labour price. We only install cast film from houses that stand behind it."
          />

          <div className="mt-16 space-y-px border border-line bg-line">
            {materials.map((material, i) => (
              <Reveal key={material.brand} delay={i * 70}>
                <article className="grid gap-8 bg-ink-soft p-8 lg:grid-cols-[16rem_1fr_16rem] sm:p-12">
                  <div>
                    <p className="eyebrow">{material.positioning}</p>
                    <h3 className="mt-4 font-display text-4xl font-extrabold uppercase leading-none text-chalk">
                      {material.brand}
                    </h3>
                    <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-accent">
                      {material.line}
                    </p>
                  </div>

                  <div>
                    <p className="leading-relaxed text-fog">{material.body}</p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {material.strengths.map((strength) => (
                        <li key={strength} className="flex items-start gap-3 text-sm text-fog-dim">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="space-y-5 border-t border-line pt-6 text-sm lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <div>
                      <dt className="eyebrow">Best for</dt>
                      <dd className="mt-2 leading-relaxed text-fog">{material.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Warranty</dt>
                      <dd className="mt-2 leading-relaxed text-fog">{material.warranty}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Aftercare */}
      <section id="aftercare" className="scroll-mt-24 border-b border-line py-24 sm:py-32">
        <Container>
          <SectionHead
            eyebrow="Aftercare"
            title="Keeping it tight"
            lede="A wrap is a finish, not a force field. Look after it the way you would look after paint and you get the full life out of it."
          />

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {aftercare.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 50} className="bg-ink p-8">
                <span className="font-mono text-[0.65rem] tabular text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase text-chalk">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <FaqList faqs={materialFaqs} eyebrow="Materials questions" title="On film and finish" />

      <CtaBand
        eyebrow="Get started"
        title="Book a consultation"
        body={`Bring the car by, see physical film samples in daylight against your own paint, and leave with a written number. ${site.address.city} and surrounding areas.`}
      />

      <JsonLd data={[howToSchema(processSteps), faqSchema(materialFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}
