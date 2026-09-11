import { cn } from "@/lib/cn";

/**
 * Standard section opener: mono index, hairline, condensed headline.
 * Keeps every section on the site rhythmically identical.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", "max-w-3xl", className)}>
      {(index || eyebrow) && (
        <div
          className={cn(
            "mb-6 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          {index && <span className="font-mono text-[0.7rem] tabular text-accent">{index}</span>}
          <span className="hatch h-2.5 w-10 opacity-70" aria-hidden />
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <Heading
        className={cn(
          "font-display font-extrabold uppercase text-chalk",
          Heading === "h1" ? "text-hero" : "text-section",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p className={cn("mt-6 text-lg leading-relaxed text-fog", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </div>
  );
}
