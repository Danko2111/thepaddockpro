import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Google rating shown as a trust signal and linked out to the real profile.
 *
 * Intentionally not marked up as AggregateRating — see the note in
 * config/site.ts. Self-serving ratings earn no rich result and risk a manual
 * action, and a link to nine verifiable reviews converts better than a
 * star graphic Google will not render anyway.
 */
export function GoogleRating({ className, compact = false }: { className?: string; compact?: boolean }) {
  // `site` is `as const`, so these narrow to literals — widen them or every
  // comparison below reads as a type error.
  const rating: number = site.reviews.rating;
  const count: number = site.reviews.count;
  const source: string = site.reviews.source;
  if (!count) return null;

  const stars = "★★★★★";
  const filled = Math.round((rating / 5) * 100);

  const inner = (
    <>
      <span className="relative inline-block leading-none" aria-hidden>
        <span className="text-line-bright">{stars}</span>
        <span
          className="absolute inset-0 overflow-hidden text-accent"
          style={{ width: `${filled}%` }}
        >
          {stars}
        </span>
      </span>
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fog">
        <span className="tabular text-chalk">{rating.toFixed(1)}</span>
        {" · "}
        {count} {source} review{count === 1 ? "" : "s"}
      </span>
    </>
  );

  const label = `Rated ${rating} out of 5 from ${count} ${source} reviews`;

  if (!site.social.google) {
    return (
      <p className={cn("flex items-center gap-3", className)} aria-label={label}>
        {inner}
      </p>
    );
  }

  return (
    <a
      href={site.social.google}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. Opens Google in a new tab.`}
      className={cn(
        "group inline-flex items-center gap-3 transition-colors hover:text-chalk",
        compact ? "" : "border border-line px-4 py-3 hover:border-line-bright",
        className,
      )}
    >
      {inner}
      <span aria-hidden className="text-fog-dim transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
