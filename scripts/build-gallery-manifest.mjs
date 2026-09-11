/**
 * Builds src/data/gallery.generated.json from the images in public/gallery.
 *
 * ── How to add work to the site ──────────────────────────────────────────────
 *   Drop the photo into the folder for its service:
 *
 *     public/gallery/color-change/porsche-992-satin-black.jpg
 *     public/gallery/ppf/bmw-m4-full-front-ppf.jpg
 *     public/gallery/fleet/acme-plumbing-transit-van.jpg
 *     public/gallery/decals/civic-type-r-chrome-delete.jpg
 *
 *   The FOLDER becomes the gallery filter. The FILENAME becomes the caption and
 *   the image alt text, so name files the way a customer would describe the car
 *   — that text is what Google Images actually reads.
 *
 *   Prefix with a number to pin ordering: `01-porsche-992-satin-black.jpg`.
 *   Everything else sorts newest-first by file date.
 *
 *   Runs automatically before `npm run dev` and `npm run build`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, "public", "gallery");
const OUT_FILE = path.join(ROOT, "src", "data", "gallery.generated.json");
const OVERRIDES_FILE = path.join(ROOT, "src", "data", "gallery-overrides.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Tokens that should never be title-cased into "Bmw" or "Ppf". */
const UPPERCASE_TOKENS = new Set([
  "bmw", "vw", "gmc", "amg", "ppf", "gt", "gtr", "gt3", "gt4", "rs", "rs3", "rs5", "rs6", "rs7",
  "m2", "m3", "m4", "m5", "m8", "sq5", "s3", "s4", "s5", "gti", "sti", "wrx", "svt", "srt",
  "tt", "z4", "q5", "q7", "q8", "x3", "x5", "x6", "x7", "id4", "ev6", "mx5", "brz", "gr86",
  "c8", "c7", "zl1", "z06", "f150", "f250", "f350", "cx5", "rav4", "crv", "hrv", "nsx",
  "usa", "dot", "3m", "uv", "led", "suv", "atv", "utv", "rv", "4x4", "awd", "rwd",
]);

const LOWERCASE_TOKENS = new Set(["and", "the", "of", "on", "in", "with", "for", "to", "a", "an", "by"]);

function titleFromFilename(name) {
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_]/, "") // strip an ordering prefix
    .replace(/[-_]+/g, " ")
    .trim();

  return base
    .split(" ")
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (UPPERCASE_TOKENS.has(lower)) return lower.toUpperCase();
      if (i > 0 && LOWERCASE_TOKENS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function orderPrefix(name) {
  const match = name.match(/^(\d+)[-_]/);
  return match ? Number(match[1]) : null;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function collectImages(dir, category = null, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectImages(full, category ?? entry.name, out);
      continue;
    }
    if (!IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) continue;

    const info = await stat(full);
    out.push({
      absPath: full,
      src: "/" + path.relative(path.join(ROOT, "public"), full).split(path.sep).join("/"),
      category: category ?? "uncategorised",
      filename: entry.name,
      order: orderPrefix(entry.name),
      mtimeMs: info.mtimeMs,
      size: info.size,
    });
  }
  return out;
}

async function main() {
  const overrides = await readJson(OVERRIDES_FILE, {});
  const previous = await readJson(OUT_FILE, []);
  const cache = new Map(previous.map((item) => [item.src, item]));

  const files = await collectImages(GALLERY_DIR);

  if (files.length === 0) {
    await mkdir(path.dirname(OUT_FILE), { recursive: true });
    await writeFile(OUT_FILE, "[]\n");
    console.log(
      "\x1b[33m⚠  gallery: no images found in public/gallery.\x1b[0m\n" +
        "   Drop photos into public/gallery/<service>/ and rerun.",
    );
    return;
  }

  files.sort((a, b) => {
    if (a.order !== null && b.order !== null) return a.order - b.order;
    if (a.order !== null) return -1;
    if (b.order !== null) return 1;
    return b.mtimeMs - a.mtimeMs; // newest work first
  });

  let reused = 0;
  const manifest = [];

  for (const file of files) {
    const cached = cache.get(file.src);
    const unchanged = cached && cached._mtimeMs === file.mtimeMs && cached._size === file.size;

    let width, height, blurDataURL;
    if (unchanged) {
      ({ width, height, blurDataURL } = cached);
      reused++;
    } else {
      const image = sharp(file.absPath);
      const meta = await image.metadata();
      // Respect EXIF orientation so portrait photos don't report as landscape
      const rotated = meta.orientation && meta.orientation >= 5;
      width = rotated ? meta.height : meta.width;
      height = rotated ? meta.width : meta.height;

      const blur = await sharp(file.absPath)
        .rotate()
        .resize(16, null, { fit: "inside" })
        .webp({ quality: 45 })
        .toBuffer();
      blurDataURL = `data:image/webp;base64,${blur.toString("base64")}`;
    }

    const override = overrides[file.src] ?? {};

    manifest.push({
      src: file.src,
      category: override.category ?? file.category,
      title: override.title ?? titleFromFilename(file.filename),
      caption: override.caption ?? null,
      alt: override.alt ?? null, // composed at render time when null
      featured: override.featured ?? false,
      width,
      height,
      blurDataURL,
      _mtimeMs: file.mtimeMs,
      _size: file.size,
    });
  }

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n");

  const byCategory = manifest.reduce((acc, i) => ({ ...acc, [i.category]: (acc[i.category] ?? 0) + 1 }), {});
  console.log(
    `\x1b[32m✓\x1b[0m gallery: ${manifest.length} image${manifest.length === 1 ? "" : "s"} ` +
      `(${reused} cached) — ` +
      Object.entries(byCategory)
        .map(([k, v]) => `${k}:${v}`)
        .join("  "),
  );
}

main().catch((err) => {
  console.error("\x1b[31m✗ gallery manifest failed:\x1b[0m", err);
  process.exit(1);
});
