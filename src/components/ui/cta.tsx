import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "line";
/** The ground the button sits on: navy or a shaded photo, or wall and floor */
type Tone = "dark" | "light";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: { solid: "btn btn-light", line: "btn btn-ghost" },
  light: { solid: "btn btn-navy", line: "btn btn-outline" },
};

/** Pill button with the drawn ring (see .btn in globals.css) */
export function Cta({
  href,
  children,
  variant = "solid",
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
}) {
  const classes = cn(styles[tone][variant], className);

  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  if (/^(tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
