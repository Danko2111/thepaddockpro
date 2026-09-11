import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  wide = false,
}: {
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", wide ? "max-w-[110rem]" : "max-w-7xl", className)}>
      {children}
    </div>
  );
}
