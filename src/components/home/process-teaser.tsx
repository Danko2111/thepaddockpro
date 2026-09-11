import { processSteps } from "@/config/process";
import { Container } from "../ui/container";
import { SectionHead } from "../ui/section-head";
import { Cta } from "../ui/cta";
import { Reveal } from "../ui/reveal";

export function ProcessTeaser() {
  return (
    <section className="relative border-b border-line py-24 sm:py-32">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-25" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div>
            <SectionHead
              index="03"
              eyebrow="How it runs"
              title={
                <>
                  The wrap is
                  <br />
                  the easy part
                </>
              }
              lede="Anyone can lay film on a flat panel. What separates a wrap still tight in year five from one lifting by summer is everything that happens before the vinyl comes off the roll."
            />
            <div className="mt-10">
              <Cta href="/process" variant="outline">
                Full process &amp; materials
              </Cta>
            </div>
          </div>

          <ol className="border-t border-line">
            {processSteps.slice(0, 5).map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 60}>
                <div className="grid gap-4 border-b border-line py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="font-mono text-[0.7rem] tabular text-accent">{step.index}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-chalk">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{step.body}</p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog-dim">
                    {step.duration}
                  </span>
                </div>
              </Reveal>
            ))}
            <li className="py-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fog-dim">
                + 2 more stages — post-heat, reassembly and handover
              </p>
            </li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
