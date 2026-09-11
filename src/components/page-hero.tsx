import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/container";

/**
 * Interior pages open dark and quiet, so the light sections below them land.
 * An optional photograph drifts behind on scroll where the page has one.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  image,
  children,
}: {
  /** Only pass this when it carries information the headline does not. */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  image?: { src: string; blurDataURL: string } | null;
  children?: React.ReactNode;
}) {
  return (
    <section className="bay relative isolate overflow-hidden border-b border-hairline pt-[4.5rem]">
      {image && (
        <>
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={80}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="drift-slow object-cover"
            />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/78" />
        </>
      )}
      <div aria-hidden className="grain-layer -z-10" />

      <Container className="relative py-20 sm:py-28">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-fog-dim">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-hairline-strong">/</span>}
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

        {eyebrow && <p className="mb-5 text-sm text-cyan">{eyebrow}</p>}

        <h1 className="max-w-[17ch] text-hero text-chalk">{title}</h1>

        {lede && <p className="mt-7 max-w-[60ch] text-lede text-fog">{lede}</p>}

        {children}
      </Container>
    </section>
  );
}
