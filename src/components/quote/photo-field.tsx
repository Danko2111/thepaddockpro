"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PHOTO_LIMITS } from "@/lib/quote-schema";
import { cn } from "@/lib/cn";

export type Photo = { id: string; file: File; url: string };

/**
 * Resizes a photo in the browser to a JPEG no longer than PHOTO_LIMITS.maxEdge
 * on its long edge. Phone photos arrive at 3-5 MB; this brings them to a few
 * hundred KB so several fit under the upload limit, and strips the location
 * metadata cameras embed. A file the browser can't decode (HEIC on some
 * desktops) is sent as it is if it's an accepted type and small enough.
 */
async function shrink(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, PHOTO_LIMITS.maxEdge / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob) throw new Error("encode failed");
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    const types: readonly string[] = PHOTO_LIMITS.types;
    if (types.includes(file.type) && file.size <= PHOTO_LIMITS.maxBytesEach) return file;
    throw new Error(`${file.name} couldn't be read. Try a JPEG or PNG.`);
  }
}

/**
 * Photo picker for the quote form. Holds no form field of its own: the form
 * appends `photos` to its FormData on submit, so only the resized copies are
 * ever sent. Click to choose, or drag photos onto it.
 */
export function PhotoField({
  photos,
  onChange,
  serverError,
}: {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  serverError?: string;
}) {
  const inputId = useId();
  const hintId = useId();
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free the preview URLs when the form goes away
  const latest = useRef(photos);
  useEffect(() => {
    latest.current = photos;
  });
  useEffect(() => () => latest.current.forEach((photo) => URL.revokeObjectURL(photo.url)), []);

  async function add(files: File[]) {
    const images = files.filter((file) => file.type.startsWith("image/") || /\.hei[cf]$/i.test(file.name));
    if (images.length === 0) {
      setError("Those weren't images. Add JPEG, PNG or phone photos.");
      return;
    }

    const room = PHOTO_LIMITS.maxCount - photos.length;
    const notes: string[] = [];
    if (images.length > room) {
      notes.push(
        `Up to ${PHOTO_LIMITS.maxCount} photos per request; the rest can go in a reply to your confirmation email.`,
      );
    }

    setBusy(true);
    const next = [...photos];
    let total = next.reduce((sum, photo) => sum + photo.file.size, 0);
    for (const file of images.slice(0, Math.max(0, room))) {
      try {
        const small = await shrink(file);
        if (total + small.size > PHOTO_LIMITS.maxBytesTotal) {
          notes.push("That's as much as one request can carry; send any others in a reply.");
          break;
        }
        total += small.size;
        next.push({ id: crypto.randomUUID(), file: small, url: URL.createObjectURL(small) });
      } catch (err) {
        notes.push((err as Error).message);
      }
    }
    setBusy(false);
    setError(notes[0] ?? null);
    onChange(next);
  }

  function remove(id: string) {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.url);
    onChange(photos.filter((p) => p.id !== id));
    setError(null);
  }

  const message = error ?? serverError;
  const full = photos.length >= PHOTO_LIMITS.maxCount;

  return (
    <div>
      <span className="mb-2.5 flex items-baseline gap-2 text-sm font-semibold text-haze">
        Photos <span className="font-normal text-fog-dim">optional</span>
      </span>

      {!full && (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            add(Array.from(e.dataTransfer.files));
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-6 py-9 text-center transition-colors",
            "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-cyan-hot",
            dragging
              ? "border-cyan-hot bg-navy-3"
              : "border-white/25 bg-navy-2 hover:border-white/45 hover:bg-navy-3",
          )}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="mb-1 h-7 w-7 text-cyan-hot" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 7.5h3l1.6-2.2h6.8L17 7.5h3v11H4z" strokeLinejoin="round" />
            <circle cx="12" cy="12.8" r="3.4" />
          </svg>
          <span className="font-semibold text-white">
            {busy ? "Preparing photos…" : dragging ? "Drop to add" : "Add photos of the vehicle"}
          </span>
          <span id={hintId} className="max-w-[44ch] text-sm text-mist">
            A three-quarter front, a straight side, and close-ups of any damage or previous paintwork. Up
            to {PHOTO_LIMITS.maxCount}; large photos are resized on your device first.
          </span>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            aria-describedby={hintId}
            className="sr-only"
            onChange={(e) => {
              add(Array.from(e.currentTarget.files ?? []));
              // Lets the same photo be picked again after removing it
              e.currentTarget.value = "";
            }}
          />
        </label>
      )}

      {photos.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {photos.map((photo, i) => (
            <li key={photo.id} className="relative aspect-square overflow-hidden rounded-lg bg-navy-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview, nothing for next/image to optimize */}
              <img src={photo.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(photo.id)}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-navy/85 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && (
        <p role="status" className="mt-2 text-sm text-cyan-hot">
          {message}
        </p>
      )}
    </div>
  );
}
