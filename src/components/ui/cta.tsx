import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "line" | "quiet";
type Tone = "dark" | "light";

const base =
  "inline-flex items-center justify-center px-7 py-4 text-[0.9rem] font-semibold leading-none " +
  "transition-[background-color,border-color,color] duration-200";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: {
    solid: "bg-cyan text-cyan-ink hover:bg-cyan-hot",
    line: "border border-hairline text-chalk hover:border-cyan hover:text-cyan",
    quiet: "px-0 text-fog hover:text-chalk",
  },
  light: {
    solid: "bg-graphite text-paper hover:bg-cyan-deep",
    line: "border border-hairline-light text-graphite hover:border-cyan-deep hover:text-cyan-deep",
    quiet: "px-0 text-slate hover:text-graphite",
  },
};

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
  const classes = cn(base, styles[tone][variant], className);
  const external = /^(https?:|tel:|mailto:)/.test(href);

  if (external) {
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
