import { site } from "@/config/site";

/**
 * The film we are certified on and actually stock, scrolling continuously.
 *
 * Brand and product line are typographically separated so the strip reads as
 * information rather than a logo wall. The track is duplicated once and
 * travels exactly -50%, which is what makes the loop seamless.
 */
const FILMS = [
  { brand: "3M", line: "2080 Series" },
  { brand: "Avery Dennison", line: "SW900 Supreme Wrapping" },
  { brand: "Inozetek", line: "Super Gloss" },
  { brand: "3M", line: "Scotchgard Pro PPF" },
  { brand: "ORAFOL", line: "Certified installer" },
  { brand: "Avery Dennison", line: "Supreme Defense PPF" },
  { brand: "3M", line: "IJ180 Cast Print" },
  { brand: "Inozetek", line: "Metallic Gloss" },
  { brand: "Avery Dennison", line: "MPI 1105 Fleet Media" },
  { brand: "3M", line: "Ceramic IR Window Film" },
];

export function MaterialsMarquee() {
  return (
    <section
      aria-label={`Film ${site.name} installs`}
      className="marquee group relative overflow-hidden border-y border-hairline bg-asphalt py-6"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {FILMS.map((film) => (
              <li key={`${film.brand}-${film.line}`} className="flex items-center whitespace-nowrap">
                <span className="px-9">
                  <span className="font-display text-lg text-chalk">{film.brand}</span>
                  <span className="ml-3 text-sm text-fog">{film.line}</span>
                </span>
                <span aria-hidden className="h-5 w-px bg-hairline-strong" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
