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
          ? "border-b border-white/10 bg-navy/92 backdrop-blur-md"
          : // Over a photo hero the nav has nothing to sit on, so give it a scrim
            "border-b border-transparent bg-gradient-to-b from-navy/80 via-navy/40 to-transparent bg-origin-border",
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
            <span className="text-[0.95rem] font-bold uppercase leading-none tracking-[0.04em] text-chalk">
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
                      active ? "text-cyan" : "text-chalk/85 hover:text-chalk",
                    )}
                  >
                    {item.label}
                  </Link>

                  {hasChildren && (
                    <div
                      className="invisible absolute left-0 top-full w-80 translate-y-1 overflow-hidden rounded-xl border border-white/10 bg-navy-2 opacity-0 shadow-2xl shadow-black/60 transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block border-b border-white/10 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/5"
                        >
                          <span className="block text-sm font-medium text-chalk">{child.label}</span>
                          <span className="mt-1 block text-xs leading-snug text-mist">{child.detail}</span>
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
              className="hidden text-sm font-medium text-chalk/85 transition-colors hover:text-chalk xl:block"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="pill-ring hidden rounded-full bg-wall px-5 py-3 text-sm font-semibold leading-none text-navy transition-colors hover:bg-white sm:block"
            >
              Get a quote
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-chalk lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {/* Three bars stacked on the centre line and pushed apart with
                  translate; open, the outer two rotate about that same centre
                  into a true X and the middle one fades */}
              <span aria-hidden className="relative block h-3.5 w-5">
                {[-1, 0, 1].map((offset) => (
                  <span
                    key={offset}
                    className={cn(
                      "absolute inset-x-0 top-1/2 -mt-px h-0.5 rounded-full bg-current",
                      "transition-[translate,rotate,opacity] duration-300 ease-out-expo",
                      offset === 0
                        ? open && "opacity-0"
                        : open
                          ? offset < 0
                            ? "rotate-45"
                            : "-rotate-45"
                          : offset < 0
                            ? "-translate-y-1.5"
                            : "translate-y-1.5",
                    )}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu. Always rendered so it can animate: the grid row grows
          from 0fr to 1fr (a height transition that needs no measuring), and
          the links slide in one after another. Closed, it is inert, so it
          can't be tabbed into or read out. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out-expo lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t bg-navy transition-[border-color,opacity] duration-300",
              open ? "border-white/10 opacity-100" : "border-transparent opacity-0",
            )}
          >
            <Container>
              <nav aria-label="Mobile" className="py-4">
                {mainNav.map((item, i) => (
                  <div
                    key={item.href}
                    className={cn(
                      "border-b border-white/10 py-1 transition-[opacity,translate] duration-500 ease-out-expo",
                      open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                  >
                    <Link href={item.href} className="block py-3 text-2xl font-bold tracking-[-0.02em] text-chalk">
                      {item.label}
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="pb-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block py-2 text-sm text-mist">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>

              <div
                className={cn(
                  "flex flex-col gap-3 pb-8 transition-[opacity,translate] duration-500 ease-out-expo",
                  open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + mainNav.length * 50}ms` : "0ms" }}
              >
                <Link
                  href="/contact"
                  className="pill-ring rounded-full bg-wall px-6 py-4 text-center text-sm font-semibold text-navy"
                >
                  Request a quote
                </Link>
                <a
                  href={site.phoneHref}
                  className="pill-ring rounded-full border border-white/40 px-6 py-4 text-center text-sm font-semibold text-chalk"
                >
                  Call {site.phone}
                </a>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </header>
  );
}
