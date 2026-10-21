"use client";

import { useRef } from "react";

/**
 * A native <details> that slides open and shut.
 *
 * Still a real <details>: the content is in the server HTML (so FAQ answers
 * stay crawlable and match their FAQPage markup), it works before hydration
 * and without JavaScript, and find-in-page can still open it. Once hydrated,
 * a click on the summary is intercepted and the height is animated with the
 * Web Animations API, which handles closing too (CSS alone can't animate a
 * <details> shut in every browser yet). Reduced motion gets the plain toggle.
 *
 * `data-state` flips the moment the click lands, so anything styled off it
 * (like the + turning to ×) moves with the animation rather than after it.
 */
export function AnimatedDetails({
  summary,
  children,
  className,
  summaryClassName,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const fade = useRef<Animation | null>(null);

  function animateTo(open: boolean) {
    const details = detailsRef.current;
    const summaryEl = summaryRef.current;
    const content = contentRef.current;
    if (!details || !summaryEl || !content) return;

    // Start from wherever it is now, mid-animation included
    const from = details.offsetHeight;
    animation.current?.cancel();
    fade.current?.cancel();

    details.dataset.state = open ? "open" : "closed";
    details.style.overflow = "hidden";
    if (open) details.open = true;

    const border = details.offsetHeight - details.clientHeight;
    const to = border + summaryEl.offsetHeight + (open ? content.offsetHeight : 0);
    const run = details.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: open ? 420 : 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    fade.current = content.animate(
      open
        ? { opacity: [0, 1], transform: ["translateY(-0.5rem)", "none"] }
        : { opacity: [1, 0] },
      { duration: open ? 420 : 200, easing: "ease-out", fill: "both" },
    );

    animation.current = run;
    run.onfinish = () => {
      animation.current = null;
      // Drop the fade's held end state so the content is back to plain CSS
      fade.current?.cancel();
      fade.current = null;
      details.open = open;
      details.style.overflow = "";
    };
  }

  function onSummaryClick(event: React.MouseEvent) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    const details = detailsRef.current;
    if (!details) return;
    animateTo(details.dataset.state !== "open");
  }

  // Keeps data-state honest when something else toggles it (find-in-page,
  // reduced motion's native toggle)
  function onToggle() {
    const details = detailsRef.current;
    if (!details || animation.current) return;
    details.dataset.state = details.open ? "open" : "closed";
  }

  return (
    <details ref={detailsRef} className={className} data-state="closed" onToggle={onToggle}>
      <summary ref={summaryRef} className={summaryClassName} onClick={onSummaryClick}>
        {summary}
      </summary>
      <div ref={contentRef}>{children}</div>
    </details>
  );
}
