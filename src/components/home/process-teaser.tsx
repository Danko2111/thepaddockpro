import { processSteps } from "@/config/process";
import { Container } from "../ui/container";
import { Cta } from "../ui/cta";

/**
 * Light, contained, and the one place numbering earns its keep: these steps
 * genuinely are a sequence. The left rail sticks so the argument stays in view
 * while the stages scroll past it.
 */
export function ProcessTeaser() {
  return (
    <section className="concrete border-t border-hairline-light py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-section text-graphite">The wrap is the easy part</h2>
            <p className="mt-6 text-lede text-slate">
              Anyone can lay film on a flat panel. What separates a wrap still tight in year five from
              one lifting by summer is everything that happens before the vinyl comes off the roll.
            </p>
            <div className="mt-9">
              <Cta href="/process" variant="line" tone="light">
                Full process and materials
              </Cta>
            </div>
          </div>

          <ol className="space-y-px bg-hairline-light">
            {processSteps.map((step) => (
              <li key={step.index} className="bg-paper">
                <div className="flex gap-6 py-7 sm:gap-8">
                  <span className="w-8 shrink-0 pt-1 text-sm tabular text-slate-dim">{step.index}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-lg text-graphite">{step.title}</h3>
                      <span className="text-sm text-slate-dim">{step.duration}</span>
                    </div>
                    <p className="mt-2.5 max-w-[58ch] leading-relaxed text-slate">{step.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
