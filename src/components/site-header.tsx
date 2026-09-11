"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Container } from "./ui/container";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu when the route changes. Adjusting state during
  // render is the documented pattern for this — an effect would fire a
  // second render pass after the new page has already painted.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-hairline bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container wide>
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image
              src="/brand/logo.png"
              alt=""
              width={150}
              height={150}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-[0.95rem] uppercase leading-none tracking-[0.05em] text-chalk">
              Paddock&nbsp;Pro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const hasChildren = "children" in item && item.children;

              return (
                <div key={item.href} className={cn("relative", hasChildren && "group/nav")}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium transition-colors",
                      active ? "text-cyan" : "text-fog hover:text-chalk",
                    )}
                  >
                    {item.label}
                  </Link>

                  {hasChildren && (
                    <div
                      className="invisible absolute left-0 top-full w-80 translate-y-1 border border-hairline bg-steel opacity-0 shadow-2xl shadow-black/60 transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block border-b border-hairline px-5 py-4 transition-colors last:border-b-0 hover:bg-steel-2"
                        >
                          <span className="block text-sm font-medium text-chalk">{child.label}</span>
                          <span className="mt-1 block text-xs leading-snug text-fog-dim">{child.detail}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden text-sm font-medium text-fog transition-colors hover:text-chalk xl:block"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="hidden bg-cyan px-5 py-3 text-sm font-semibold leading-none text-cyan-ink transition-colors hover:bg-cyan-hot sm:block"
            >
              Get a quote
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center border border-hairline text-chalk lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300",
                    open && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 top-1.5 h-0.5 bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 top-3 h-0.5 bg-current transition-transform duration-300",
                    open && "top-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-hairline bg-ink lg:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="py-4">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-hairline py-1">
                <Link
                  href={item.href}
                  className="block py-3 text-2xl text-chalk"
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <ul className="pb-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-fog"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pb-8">
            <Link
              href="/contact"
              className="bg-cyan px-6 py-4 text-center text-sm font-semibold text-cyan-ink"
            >
              Request a quote
            </Link>
            <a
              href={site.phoneHref}
              className="border border-hairline-strong px-6 py-4 text-center text-sm font-semibold text-chalk"
            >
              Call {site.phone}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
