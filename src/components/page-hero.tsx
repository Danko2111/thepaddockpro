import Link from "next/link";
import { Container } from "./ui/container";

export function PageHero({
  index,
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-[4.5rem]">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-surface/70 via-ink to-ink"
      />

      <Container className="py-20 sm:py-28">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-fog-dim">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-line-bright">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-fog">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-chalk">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {index && <span className="font-mono text-[0.7rem] tabular text-accent">{index}</span>}
          <span className="hatch h-3 w-12" aria-hidden />
          <p className="eyebrow">{eyebrow}</p>
        </div>

        <h1 className="mt-8 max-w-[16ch] font-display text-hero font-extrabold uppercase text-chalk">
          {title}
        </h1>

        {lede && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fog sm:text-xl">{lede}</p>}

        {children}
      </Container>
    </section>
  );
}
