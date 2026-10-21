import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/container";

/**
 * Interior pages open the way the homepage does, on one photograph under a
 * navy shade weighted to the side the copy sits on, but shorter: the page's
 * content is the point, not the picture. The opening block runs the same
 * staggered load-in.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  image,
  imagePosition = "center",
  children,
}: {
  /** Only pass this when it carries information the headline does not. */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  image?: { src: string; blurDataURL?: string } | null;
  /** CSS object-position for the photograph */
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[min(46rem,85svh)] items-end overflow-hidden bg-navy pt-[4.5rem] text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className="-z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(13,27,46,0.92)_0%,rgba(13,27,46,0.45)_40%,rgba(13,27,46,0.25)_100%),linear-gradient(to_right,rgba(13,27,46,0.85)_0%,rgba(13,27,46,0.5)_45%,transparent_80%)] max-md:bg-[linear-gradient(to_bottom,rgba(13,27,46,0.6),rgba(13,27,46,0.8)_45%,rgba(13,27,46,0.94))]"
          />
        </>
      )}

      <Container className="relative pb-16 pt-24 sm:pb-24 sm:pt-32">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="load mb-8" style={{ "--n": 0 } as React.CSSProperties}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-mist">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-mist/50">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-cyan-hot">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="load mb-4 text-sm font-semibold text-cyan-hot" style={{ "--n": 0 } as React.CSSProperties}>
            {eyebrow}
          </p>
        )}

        <h1 className="load max-w-[16ch] text-hero text-white" style={{ "--n": 1 } as React.CSSProperties}>
          {title}
        </h1>

        {lede && (
          <p className="load mt-6 max-w-[56ch] text-lede text-haze" style={{ "--n": 2 } as React.CSSProperties}>
            {lede}
          </p>
        )}

        {children && (
          <div className="load" style={{ "--n": 3 } as React.CSSProperties}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
