import { Container } from "./ui/container";
import { AnimatedDetails } from "./animated-details";
import { cn } from "@/lib/cn";

/**
 * Native <details>, animated by <AnimatedDetails>: keyboard-operable for free,
 * and the answers sit in the initial HTML where Google can read them.
 */
export function FaqList({
  faqs,
  title = "Straight answers",
  lede,
  tone = "light",
}: {
  faqs: { q: string; a: string }[];
  title?: React.ReactNode;
  lede?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <section
      className={cn(
        "py-24 sm:py-32",
        light ? "concrete" : "bay",
      )}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className={cn("text-section", light ? "text-graphite" : "text-chalk")}>{title}</h2>
            {lede && (
              <p className={cn("mt-5 text-lede", light ? "text-slate" : "text-fog")}>{lede}</p>
            )}
          </div>

          <div data-reveal className={cn("border-t", light ? "border-hairline-light" : "border-hairline")}>
            {faqs.map((faq) => (
              <AnimatedDetails
                key={faq.q}
                className={cn("group border-b", light ? "border-hairline-light" : "border-hairline")}
                summaryClassName={cn(
                  "flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden",
                  light ? "text-graphite" : "text-chalk",
                )}
                summary={
                  <>
                    <h3 className="text-lg font-bold leading-snug tracking-[-0.01em]">{faq.q}</h3>
                    {/* Follows data-state, which flips on click, not when the animation ends */}
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 shrink-0 text-xl leading-none transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-45",
                        light ? "text-cyan-deep" : "text-cyan-hot",
                      )}
                    >
                      +
                    </span>
                  </>
                }
              >
                <p
                  className={cn(
                    "max-w-[68ch] pb-7 leading-relaxed",
                    light ? "text-slate" : "text-fog",
                  )}
                >
                  {faq.a}
                </p>
              </AnimatedDetails>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
