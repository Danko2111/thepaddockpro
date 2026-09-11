import { site } from "@/config/site";
import { Container } from "./ui/container";
import { Cta } from "./ui/cta";

export function CtaBand({
  eyebrow = "Next step",
  title = "Tell us about the car",
  body = "Send the year, make, model and what you have in mind. Photos help. We come back with a realistic range, the film we would use and how long the car would be with us.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div aria-hidden className="hatch absolute inset-x-0 top-0 h-1.5 opacity-70" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-30" />

      <Container className="py-24 sm:py-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-6 max-w-[16ch] font-display text-section font-extrabold uppercase text-chalk">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">{body}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Cta href="/contact" className="justify-between px-7 py-5 text-[0.75rem]">
              Request a quote
            </Cta>
            <Cta href={site.phoneHref} variant="outline" arrow={false} className="justify-between px-7 py-5 text-[0.75rem]">
              {site.phone}
            </Cta>
            <Cta
              href={`mailto:${site.email}`}
              variant="outline"
              arrow={false}
              className="justify-between px-7 py-5 text-[0.75rem]"
            >
              {site.email}
            </Cta>
          </div>
        </div>
      </Container>
    </section>
  );
}
