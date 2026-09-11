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
      <div className="flex flex-wrap gap-2 border-y border-hairline py-4" role="group" aria-label="Filter work by service">
        {categories.map((category) => {
          const isActive = active === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2.5 border px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-cyan bg-cyan text-cyan-ink"
                  : "border-hairline text-fog hover:border-hairline-strong hover:text-chalk",
              )}
            >
              {category.label}
              <span className={cn("tabular text-xs", isActive ? "text-cyan-ink/70" : "text-fog-dim")}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry via CSS columns — no layout JS, no CLS */}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((image, i) => {
          const shown = active === "all" || image.category === active;
          return (
            <figure
              key={image.src}
              className={cn("break-inside-avoid", !shown && "hidden")}
              aria-hidden={!shown}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden bg-steel text-left"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-95"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-lg leading-tight text-chalk">
                    {image.title}
                  </span>
                  {image.caption && (
                    <span className="mt-1 block text-xs leading-snug text-fog">{image.caption}</span>
                  )}
                </figcaption>
              </button>
            </figure>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-fog">No work in this category yet.</p>
      )}

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <p className="text-sm text-fog">
              <span className="text-cyan">{String(visible.findIndex((v) => v.i === lightbox) + 1).padStart(2, "0")}</span>
              {" / "}
              {String(visible.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="border border-hairline px-4 py-2 text-sm text-chalk transition-colors hover:border-cyan hover:text-cyan"
            >
              Close ✕
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
            className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="px-3 py-2 text-sm text-fog transition-colors hover:text-chalk"
            >
              ← Prev
            </button>
            <div className="min-w-0 text-center">
              <p className="truncate text-base text-chalk">{current.title}</p>
              {current.caption && <p className="truncate text-xs text-fog">{current.caption}</p>}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="px-3 py-2 text-sm text-fog transition-colors hover:text-chalk"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
