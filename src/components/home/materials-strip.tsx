import { materials } from "@/config/process";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";
import { Reveal } from "../ui/reveal";

export function MaterialsStrip() {
  return (
    <section className="border-b border-line bg-ink-soft py-24 sm:py-32">
      <Container>
        <SectionHead
          index="04"
          eyebrow="Materials"
          title={
            <>
              Three film houses,
              <br />
              chosen per car
            </>
          }
          lede="We are not tied to one supplier. The right film depends on the finish you are after and how sculpted the bodywork is — and we will show you physical samples in daylight before you commit."
        />

        <ul className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-3">
          {materials.map((material, i) => (
            <Reveal as="li" key={material.brand} delay={i * 80} className="flex flex-col bg-ink-soft p-8 sm:p-10">
              <p className="eyebrow">{material.positioning}</p>
              <h3 className="mt-5 font-display text-3xl font-extrabold uppercase text-chalk">
                {material.brand}
              </h3>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                {material.line}
              </p>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-fog">{material.body}</p>
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="eyebrow">Best for</dt>
                  <dd className="mt-1.5 text-fog">{material.bestFor}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Warranty</dt>
                  <dd className="mt-1.5 text-fog">{material.warranty}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
