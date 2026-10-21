"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/cn";

type Category = { key: string; label: string; count: number };

export function GalleryGrid({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories: Category[];
}) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  /**
   * Every image stays mounted regardless of the active filter — filtering only
   * toggles visibility. Keeps the whole gallery crawlable by Google Images
   * instead of hiding most of it behind client state.
   */
  const visible = images
    .map((image, i) => ({ image, i }))
    .filter(({ image }) => active === "all" || image.category === active);

  const step = useCallback(
    (direction: 1 | -1) => {
      setLightbox((current) => {
        if (current === null) return current;
        const order = visible.map((v) => v.i);
        const at = order.indexOf(current);
        if (at === -1) return current;
        return order[(at + direction + order.length) % order.length];
      });
    },
    [visible],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  const current = lightbox === null ? null : images[lightbox];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by service">
        {categories.map((category) => {
          const isActive = active === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-navy",
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-navy/25 bg-plate/60 text-navy hover:border-navy/60 hover:bg-plate",
              )}
            >
              {category.label}
              <span className={cn("tabular text-xs", isActive ? "text-mist" : "text-slate")}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry via CSS columns — no layout JS, no CLS. Hovering one frame
          dims the rest, as on the homepage. */}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [@media(hover:hover)]:[&:has(figure:hover)>figure:not(:hover)]:opacity-45 [@media(hover:hover)]:[&:has(figure:hover)>figure:not(:hover)]:grayscale-[0.7]">
        {images.map((image, i) => {
          const shown = active === "all" || image.category === active;
          return (
            <figure
              key={image.src}
              className={cn("break-inside-avoid transition-[opacity,filter] duration-400", !shown && "hidden")}
              aria-hidden={!shown}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden bg-navy text-left focus-visible:outline-navy"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full scale-[1.04] transition-transform duration-1000 ease-out-expo group-hover:scale-100 group-focus-visible:scale-100"
                />
                {/* A navy plate cut on a slant rises over the foot of the photo */}
                <figcaption className="absolute inset-x-0 bottom-0 grid translate-y-[101%] gap-0.5 bg-navy/94 px-5 pb-5 pt-9 transition-transform duration-600 ease-out-expo [clip-path:polygon(0_1.4rem,100%_0,100%_100%,0_100%)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">
                    {image.title}
                  </span>
                  {image.caption && (
                    <span className="text-sm leading-snug text-haze">{image.caption}</span>
                  )}
                </figcaption>
              </button>
            </figure>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-slate">No work in this category yet.</p>
      )}

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex flex-col bg-navy/97 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <p className="text-sm text-mist">
              <span className="font-semibold text-white">{String(visible.findIndex((v) => v.i === lightbox) + 1).padStart(2, "0")}</span>
              {" / "}
              {String(visible.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="pill-ring rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              placeholder="blur"
              blurDataURL={current.blurDataURL}
              sizes="90vw"
              className="max-h-full w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div
            className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="pill-ring rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              ← Prev
            </button>
            <div className="min-w-0 text-center">
              <p className="truncate text-base font-bold text-white">{current.title}</p>
              {current.caption && <p className="truncate text-sm text-mist">{current.caption}</p>}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="pill-ring rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
