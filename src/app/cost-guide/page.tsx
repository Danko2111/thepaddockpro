import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

const PUBLISHED = "2026-01-15";
const UPDATED = "2026-09-01";

const trail = [
  { name: "Home", path: "/" },
  { name: "Cost guide", path: "/cost-guide" },
];

export const metadata = buildMetadata({
  title: "What Does a Car Wrap Cost? An Honest Guide",
  description:
    "The five things that actually decide what a vehicle wrap costs — size, coverage, material, paint condition and disassembly — plus how to read a quote and spot one that is too cheap.",
  path: "/cost-guide",
});

const FACTORS = [
  {
    index: "01",
    title: "The vehicle itself",
    body: "Surface area is the obvious part. The part people miss is complexity. A slab-sided van is a lot of square footage but almost all of it is flat, so it goes quickly. A modern sports car is less material and far more hours — deep swages, sharp creases, aggressive bumper geometry and compound curves that need inlays and relief cuts rather than brute stretching. Two cars of the same size can differ by days.",
    examples: ["Panel count and body complexity", "Compound curves and deep recesses", "Bumper and diffuser geometry", "Roof spoilers, vents and scoops"],
  },
  {
    index: "02",
    title: "How much of it you are covering",
    body: "Full colour change, partial wrap, roof and mirrors only, full front PPF versus a full body — coverage scales the price almost linearly on material and roughly linearly on labour. It is also the easiest lever if you have a fixed budget. A roof, mirrors and chrome delete on a factory colour you already like will change the car far more than most people expect, for a fraction of a full change.",
    examples: ["Full change vs partial vs accents", "PPF: partial front, full front, track, full body", "Interior trim and engine bay extras", "Door jambs — a genuine cost step"],
  },
  {
    index: "03",
    title: "The film you choose",
    body: "Standard gloss and satin from 3M or Avery sit at the base. Metallics, textured films and premium gloss lines like Inozetek cost more per roll and, more importantly, take longer to install because they are less forgiving on curves. Color-shift and chrome films are the top end on both counts — material and hours. PPF is its own scale, priced by coverage and film grade.",
    examples: ["Standard gloss, satin and matte", "Metallic, pearl and textured", "Color-shift and chrome", "PPF grade and coverage tier"],
  },
  {
    index: "04",
    title: "The condition of your paint",
    body: "Film conforms to what is underneath it — it does not hide anything. Deep scratches, dents and rough clear coat telegraph through. If the paint needs correction or a panel needs attention before film goes on, that is real work and it belongs in the quote. Previous respray is the big one: it changes both the prep and the removal risk, and any shop that does not ask about it is not looking carefully.",
    examples: ["Correction or decontamination needed", "Dents, chips and deep scratches", "Previous respray or bodywork", "Failing clear coat on older cars"],
  },
  {
    index: "05",
    title: "Disassembly and reassembly",
    body: "This is the invisible line item and the one that separates quotes most. Removing badges, handles, mirrors, lights and trim, then refitting it all with fresh clips where needed, is hours of skilled work. It is also exactly what makes the difference between edges that stay down and edges that lift. A quote that is dramatically cheaper than the others is usually cheaper here.",
    examples: ["Badges, handles and mirror caps", "Lights, grilles and trim pieces", "New clips and fasteners", "Door jambs and shut lines"],
  },
];

const RED_FLAGS = [
  { flag: "No one asks about your paint history", why: "Respray and bodywork change both the prep and the removal risk. A shop that skips the question will find out on your car." },
  { flag: "A price over the phone, sight unseen", why: "A range over the phone is reasonable. A firm number without seeing the car means someone is guessing, and guesses get corrected mid-job." },
  { flag: "The film brand is not named", why: "\"Premium vinyl\" is not a brand. You want the manufacturer, the series and the finish written on the quote." },
  { flag: "Turnaround measured in hours", why: "A full colour change done properly is days, not an afternoon. Speed on this job comes from cutting around trim instead of removing it." },
  { flag: "No written workmanship warranty", why: "Manufacturer film warranties and installation warranties are separate things. You want both, in writing." },
  { flag: "The deposit is the whole conversation", why: "A quote should specify coverage, film, shop time and what happens if something is found under the trim. If the only detail is the deposit, keep looking." },
];

const FAQS = [
  {
    q: "Is a wrap cheaper than a respray?",
    a: "For a comparable quality level, usually yes — and the gap widens once you account for what a proper respray involves. A cheap respray is cheaper than a good wrap, but you are comparing very different outcomes. The bigger difference is reversibility: a wrap comes off and returns the car to factory paint, which protects resale in a way a colour respray does not.",
  },
  {
    q: "Why do quotes vary so much between shops?",
    a: "Almost always disassembly and film grade. A shop that removes badges, handles, lights and trim is booking days of labour a shop that cuts around them is not. Ask every shop the same two questions — which panels come off, and which film series are you quoting — and the spread usually explains itself.",
  },
  {
    q: "Does a wrap add value to the car?",
    a: "Indirectly. It does not raise the sale price, but the paint underneath comes out of several years of daily use in far better condition than it would have otherwise, which does show at resale. PPF makes a stronger case here than colour change, particularly on cars where original paint matters to buyers.",
  },
  {
    q: "Can I wrap a leased vehicle?",
    a: "Usually yes, and it is common on commercial leases — provided the wrap comes off cleanly before return. Check your lease terms first, plan removal ahead of the return date rather than at the last minute, and factor removal into the budget from the start.",
  },
  {
    q: "How do I get an accurate number quickly?",
    a: `Send the year, make and model, the coverage you want, the finish you have in mind, and honest photos — a three-quarter front, a straight side, and close-ups of any damage or previous paintwork. That gets you a realistic range the same day. Bring the car by and it becomes a fixed price. Call ${site.phone} or use the quote form.`,
  },
];

export default function CostGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Guide · Updated September 2026"
        breadcrumbs={trail}
        title={
          <>
            What a wrap
            <br />
            actually costs
          </>
        }
        lede="We do not publish a price list, and you should be skeptical of shops that do. Here is what genuinely moves the number, so you can read any quote — ours or anyone else's — and know what you are looking at."
      />

      {/* Why no price list */}
      <section className="border-b border-line py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-fog">
            <p>
              Every wrap shop gets the same first question, and most answer it with a number that turns out
              to be wrong. The honest answer is that two cars sitting side by side in the same bay, both
              getting a full gloss colour change, can differ by thousands — and the reasons are specific
              enough that guessing helps nobody.
            </p>
            <p>
              A flat price list forces a shop into one of two positions. Either the number is padded to
              cover the worst case, so straightforward jobs subsidise difficult ones, or it is set low and
              the difference gets recovered by cutting corners you will not see until the film starts
              lifting. Neither is a good deal.
            </p>
            <p className="text-chalk">
              So instead, here are the five variables. Understand these and you can read any quote you are
              handed.
            </p>
          </div>
        </Container>
      </section>

      {/* Factors */}
      <section className="border-b border-line bg-ink-soft py-24 sm:py-32">
        <Container>
          <div className="flex items-center gap-4">
            <span className="hatch h-3 w-12" aria-hidden />
            <p className="eyebrow">What moves the price</p>
          </div>

          <ol className="mt-12 border-t border-line">
            {FACTORS.map((factor, i) => (
              <Reveal as="li" key={factor.index} delay={i * 50}>
                <article className="grid gap-8 border-b border-line py-12 lg:grid-cols-[5rem_1fr_18rem] lg:gap-12">
                  <span className="font-display text-4xl font-extrabold tabular leading-none text-accent">
                    {factor.index}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-extrabold uppercase text-chalk sm:text-3xl">
                      {factor.title}
                    </h2>
                    <p className="mt-5 max-w-2xl leading-relaxed text-fog">{factor.body}</p>
                  </div>
                  <ul className="space-y-2.5 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    {factor.examples.map((example) => (
                      <li key={example} className="flex items-start gap-3 text-sm text-fog-dim">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Red flags */}
      <section className="border-b border-line py-24 sm:py-32">
        <Container>
          <div className="flex items-center gap-4">
            <span className="hatch h-3 w-12" aria-hidden />
            <p className="eyebrow">Reading a quote</p>
          </div>
          <h2 className="mt-8 max-w-[18ch] font-display text-section font-extrabold uppercase text-chalk">
            Six reasons a quote is too cheap
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
            Price differences between shops are real and often justified. These are the ones that are not.
          </p>

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {RED_FLAGS.map((item, i) => (
              <Reveal as="li" key={item.flag} delay={i * 45} className="bg-ink p-8">
                <span className="font-mono text-[0.65rem] tabular text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase leading-tight text-chalk">
                  {item.flag}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{item.why}</p>
              </Reveal>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl leading-relaxed text-fog">
            Our own quotes name the film manufacturer and series, list which panels come off, state the shop
            time and say what happens if we find something under the trim.{" "}
            <Link href="/process" className="text-chalk underline decoration-accent underline-offset-4 hover:text-accent">
              The full process is here
            </Link>
            .
          </p>
        </Container>
      </section>

      <FaqList faqs={FAQS} eyebrow="Cost questions" title="What else people ask" />

      <CtaBand
        eyebrow="Get a real number"
        title="Same-day range, no obligation"
        body="Send the vehicle, the coverage and a few photos. You get a realistic range back the same day and a fixed price once we have seen the car."
      />

      <JsonLd
        data={[
          articleSchema({
            headline: "What does a car wrap cost? An honest guide",
            description:
              "The five variables that decide what a vehicle wrap costs, and how to read a quote from any shop.",
            path: "/cost-guide",
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}
