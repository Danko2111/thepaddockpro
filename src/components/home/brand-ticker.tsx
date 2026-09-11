const ITEMS = [
  "3M 2080 Series",
  "Avery Dennison SW900",
  "Inozetek Super Gloss",
  "3M Scotchgard Pro PPF",
  "Avery Supreme Defense",
  "3M IJ180 Cast Print",
];

/**
 * Timing-board style scrolling strip. CSS-only, duplicated once for a seamless
 * loop, and frozen entirely for prefers-reduced-motion by the global base rule.
 */
export function BrandTicker() {
  return (
    <section
      aria-label="Materials we install"
      className="overflow-hidden border-y border-line bg-ink-soft py-5"
    >
      <div className="flex w-max animate-[ticker_38s_linear_infinite] items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-fog"
              >
                {item}
                <span className="hatch h-2.5 w-6 shrink-0 opacity-60" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>

      <style>{`@keyframes ticker { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
