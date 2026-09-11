import { cn } from "@/lib/cn";

/**
 * A section opener is a headline and, when it genuinely helps, a lede. The
 * numbered marker and tracked-out label that used to sit above every heading
 * were decoration — none of these sections are sequences, and the labels
 * repeated what the headline already said.
 */
export function SectionHead({
  title,
  lede,
  tone = "dark",
  align = "left",
  className,
  as: Heading = "h2",
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Heading
        className={cn(
          Heading === "h1" ? "text-hero" : "text-section",
          tone === "dark" ? "text-chalk" : "text-graphite",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-6 max-w-[62ch] text-lede",
            tone === "dark" ? "text-fog" : "text-slate",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
