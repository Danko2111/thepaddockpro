import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Container } from "@/components/ui/container";
import { site, cityRegion } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = buildMetadata({
  title: "About The Shop — Langley, BC",
  description: `${site.name} is a vehicle wrap, film and coating shop in ${cityRegion}, working on private cars and commercial fleets.`,
  path: "/about",
});

/* ⛔ TODO — replace with the shop's real story: founding year, what the owner
   did before, why they started. Generic "passion for excellence" copy is worth
   less than nothing. */
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
        breadcrumbs={trail}
        title="A shop that sweats the edges"
        lede={`${site.name} installs colour change vinyl, paint protection film, commercial graphics, window tint and ceramic coating for customers across ${site.serviceArea.slice(0, 4).join(", ")} and the surrounding area.`}
      />

      <section className="concrete py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
            <div className="max-w-[64ch] space-y-6">
              {STORY.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lede text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="border-t border-hairline-light pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="text-sm font-semibold text-graphite">What we are certified on</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate">
                {site.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
              <Link
                href="/process#materials"
                className="mt-6 inline-block text-sm font-semibold text-cyan-deep underline-offset-4 hover:underline"
              >
                Why these films
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bay border-t border-hairline py-24 sm:py-32">
        <Container>
          <h2 className="max-w-[16ch] text-section text-chalk">Six things we do not skip</h2>
          <p className="mt-6 max-w-[58ch] text-lede text-fog">
            Not a mission statement. These are the specific decisions that cost us time and that you
            would never know about if we quietly stopped making them.
          </p>

          <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {STANDARDS.map((standard) => (
              <div key={standard.title}>
                <dt className="text-lg text-chalk">{standard.title}</dt>
                <dd className="mt-3 leading-relaxed text-fog">{standard.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
