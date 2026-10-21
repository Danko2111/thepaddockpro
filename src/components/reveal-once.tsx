"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Plays each section's entrance once, the first time it scrolls into view.
 *
 * Renders nothing. Every element carrying `data-reveal` is watched, and the
 * first time it enters the viewport it gets `data-revealed`; CSS in
 * globals.css does the animating. It is unobserved straight after, so
 * scrolling back up never replays it. Mounted once in the root layout and
 * re-run on every route change so client-side navigations are picked up.
 *
 * Why this is a client component: CSS alone can tie animation to scroll
 * position, but not "fire once on first sight". Pages stay Server Components.
 */
export function RevealOnce() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Fire once a little of the element is clearly on screen, not the
      // instant its top pixel crosses the bottom edge
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
