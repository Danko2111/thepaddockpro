import { Container } from "./ui/container";
import { SectionHead } from "./ui/section-head";

/**
 * Native <details> — no JS, fully accessible, and the answers are in the
 * initial HTML where Google can read them for FAQ rich results.
 */
export function FaqList({
  faqs,
  index,
  eyebrow = "Common questions",
  title = "Straight answers",
  lede,
}: {
  faqs: { q: string; a: string }[];
  index?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHead index={index} eyebrow={eyebrow} title={title} lede={lede} />

        <div className="mt-14 border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl font-bold uppercase leading-tight text-chalk transition-colors group-hover:text-accent sm:text-2xl">
                  {faq.q}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-8 leading-relaxed text-fog">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
