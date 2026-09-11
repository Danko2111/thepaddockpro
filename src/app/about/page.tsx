import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { site, cityRegion } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = buildMetadata({
  title: "About The Shop — Langley, BC",
  description: `${site.name} is a vehicle wrap and paint protection film shop in ${site.address.city}, ${site.address.region}, working on private cars and commercial fleets.`,
  path: "/about",
});

/* ⛔ TODO — replace with the shop's real story: founding year, background,
   what the owner did before, why they started, anything specific and true.
   Generic "passion for excellence" copy is worth less than nothing. */
const STORY = [
  "Paddock Pro was started by people who cared more about the last two percent of a job than about how many cars went through the bay in a week. That is still the whole idea.",
  "We work on private cars and commercial fleets in equal measure, which sounds like two businesses but is really one. A weekend car and a plumber's van both come down to the same thing: how carefully the surface was prepared, whether the trim came off, and whether someone took the time to post-heat every edge before it went out the door.",
  "We are not the fastest shop and we do not try to be the cheapest. What we will do is tell you honestly what your car needs, what it does not, and what we would do if it were ours.",
];

const STANDARDS = [
  {
    title: "Trim comes off",
    body: "Badges, handles, mirrors, lights and trim are removed rather than cut around, on every job that allows it. It is the single biggest difference between a wrap that lasts and one that does not.",
  },
  {
    title: "Cast film only",
    body: "Every film we put on a vehicle body is cast — 3M, Avery Dennison or Inozetek. Calendered vinyl belongs on flat signage, not on a car that has to live outdoors for five years.",
  },
  {
    title: "Documented on arrival",
    body: "Your car is photographed panel by panel before work starts and anything we consider a risk is flagged in writing. No surprises in either direction.",
  },
  {
    title: "Post-heat, every time",
    body: "Every stretched area and tucked edge is brought to the film manufacturer's specified temperature and verified. It is invisible, it takes hours, and skipping it is why edges lift.",
  },
  {
    title: "Batch records kept",
    body: "Film brand, series, colour and batch are recorded for every vehicle, so a panel repair three years from now matches instead of nearly matching.",
  },
  {
    title: "Two warranties",
    body: "The manufacturer covers the film. We separately cover our workmanship. Both are explained in writing at handover rather than mentioned once and forgotten.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Wrap shop · ${cityRegion}`}
        breadcrumbs={trail}
        title={
          <>
            A shop that
            <br />
            sweats the edges
          </>
        }
        lede={`${site.name} installs colour change vinyl, paint protection film and commercial graphics for customers across ${site.serviceArea.join(", ")} and the surrounding area.`}
      />

      <section className="border-b border-line py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_18rem]">
            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-fog">
              {STORY.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <aside className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="eyebrow">Materials</h2>
              <ul className="mt-5 space-y-3">
                {site.credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-3 text-sm text-chalk">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                    {credential}
                  </li>
                ))}
              </ul>
              <Link
                href="/process#materials"
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fog transition-colors hover:text-accent"
              >
                Why these films <span aria-hidden>→</span>
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-24 sm:py-32">
        <Container>
          <SectionHead
            eyebrow="Standards"
            title={
              <>
                Six things we
                <br />
                do not skip
              </>
            }
            lede="Not a mission statement. These are the specific decisions that cost us time and that you would never know about if we quietly stopped making them."
          />

          <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {STANDARDS.map((standard, i) => (
              <Reveal as="li" key={standard.title} delay={i * 50} className="bg-ink-soft p-8">
                <span className="font-mono text-[0.65rem] tabular text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase text-chalk">{standard.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{standard.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
