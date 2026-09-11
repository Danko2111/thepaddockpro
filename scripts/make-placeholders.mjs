/**
 * One-off generator for placeholder gallery images so the site looks real
 * before the shop's photography arrives.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Delete public/gallery/**\/*.jpg and this file once real photos are in.
 * Every generated file is stamped PLACEHOLDER so none of them ship by accident.
 */
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const SETS = {
  "colour-change": [
    ["01-porsche-992-satin-black", 3, 2],
    ["audi-rs6-nardo-grey-gloss", 3, 2],
    ["tesla-model-3-colour-shift-purple", 4, 5],
    ["range-rover-matte-military-green", 3, 2],
  ],
  ppf: [
    ["bmw-m4-full-front-ppf", 3, 2],
    ["corvette-c8-track-pack-ppf", 4, 5],
    ["porsche-cayman-full-body-ppf", 3, 2],
  ],
  fleet: [
    ["acme-plumbing-transit-van", 3, 2],
    ["northline-electrical-box-truck", 3, 2],
    ["summit-landscaping-trailer-graphics", 4, 5],
  ],
  "window-tint": [
    ["bmw-x5-ceramic-tint-rear", 3, 2],
    ["audi-q5-ceramic-window-tint", 4, 5],
  ],
  "ceramic-coating": [
    ["porsche-cayenne-ceramic-coating", 3, 2],
    ["tesla-model-y-paint-correction-coating", 4, 5],
  ],
  decals: [
    ["civic-type-r-chrome-delete", 3, 2],
    ["mustang-gt-over-the-top-stripes", 3, 2],
    ["golf-gti-gloss-black-roof", 4, 5],
  ],
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const label = (slug) =>
  slug
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .toUpperCase();

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

let made = 0;
for (const [category, items] of Object.entries(SETS)) {
  const dir = path.join(process.cwd(), "public", "gallery", category);
  await mkdir(dir, { recursive: true });

  for (const [slug, arW, arH] of items) {
    const file = path.join(dir, `${slug}.jpg`);
    if (await exists(file)) continue;

    const w = arW >= arH ? 1600 : 1200;
    const h = Math.round((w * arH) / arW);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#191921"/>
      <stop offset="55%" stop-color="#0e0e13"/>
      <stop offset="100%" stop-color="#101c26"/>
    </linearGradient>
    <pattern id="h" width="26" height="26" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
      <rect width="6" height="26" fill="#22b4e8" opacity="0.12"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#h)"/>
  <rect x="0" y="0" width="100%" height="6" fill="#22b4e8"/>
  <text x="56" y="${h - 108}" font-family="sans-serif" font-size="26" letter-spacing="6"
        fill="#22b4e8" font-weight="700">${esc(category.toUpperCase())}</text>
  <text x="56" y="${h - 56}" font-family="sans-serif" font-size="${w > 1400 ? 52 : 42}"
        fill="#f5f5f7" font-weight="800" letter-spacing="-1">${esc(label(slug))}</text>
  <text x="56" y="86" font-family="monospace" font-size="22" letter-spacing="5"
        fill="#5e5e6c">PLACEHOLDER — REPLACE WITH REAL PHOTOGRAPHY</text>
</svg>`;

    const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await writeFile(file, buf);
    made++;
  }
}

// Hero backdrop
const heroPath = path.join(process.cwd(), "public", "brand", "hero.jpg");
if (!(await exists(heroPath))) {
  await mkdir(path.dirname(heroPath), { recursive: true });
  const W = 2400, H = 1350;
  const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="r" cx="62%" cy="38%" r="78%">
      <stop offset="0%" stop-color="#2a2a36"/>
      <stop offset="48%" stop-color="#131319"/>
      <stop offset="100%" stop-color="#08080a"/>
    </radialGradient>
    <linearGradient id="s" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#22b4e8" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#22b4e8" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect width="100%" height="100%" fill="url(#s)"/>
  <g opacity="0.12" stroke="#8b8b9a" stroke-width="1.5" fill="none">
    <path d="M-100 980 C 520 700, 1180 660, 1700 830 S 2500 1080, 2600 1010"/>
    <path d="M-100 1040 C 520 760, 1180 720, 1700 890 S 2500 1140, 2600 1070"/>
    <ellipse cx="760" cy="1010" rx="150" ry="150"/>
    <ellipse cx="1760" cy="1010" rx="150" ry="150"/>
  </g>
  <text x="120" y="180" font-family="monospace" font-size="30" letter-spacing="8"
        fill="#5e5e6c">PLACEHOLDER HERO — REPLACE public/brand/hero.jpg</text>
</svg>`;
  await writeFile(heroPath, await sharp(Buffer.from(hero)).jpeg({ quality: 84, mozjpeg: true }).toBuffer());
  made++;
}

console.log(made ? `\u2713 generated ${made} placeholder images` : "\u00b7 placeholders already present");
