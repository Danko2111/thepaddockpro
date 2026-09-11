import { materials } from "@/config/process";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";

/**
 * Dark again, and typographic rather than carded — the brand names are the
 * visual. Nothing here needs a box drawn around it.
 */
export function MaterialsStrip() {
  return (
    <section className="bay border-t border-hairline py-24 sm:py-32">
      <Container>
        <SectionHead
          title="Three film houses, chosen per car"
          lede="We are not tied to one supplier. The right film depends on the finish you want and how sculpted the bodywork is — and you will see physical samples on your own paint, in daylight, before committing."
        />

        <dl className="mt-16 divide-y divide-hairline border-y border-hairline">
          {materials.map((material) => (
            <div key={material.brand} className="grid gap-6 py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <dt>
                <span className="block text-4xl text-chalk sm:text-5xl">{material.brand}</span>
                <span className="mt-3 block text-sm text-cyan">{material.line}</span>
              </dt>
              <dd>
                <p className="max-w-[62ch] leading-relaxed text-fog">{material.body}</p>
                <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-fog-dim">
                  <span className="text-fog">Best for</span> {material.bestFor}{" "}
                  <span className="text-fog">Warranty</span> {material.warranty}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
