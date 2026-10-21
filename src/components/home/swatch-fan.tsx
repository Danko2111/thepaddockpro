import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import s from "./swatch-fan.module.css";

/**
 * Each finish draws itself in CSS until there is a photo of the real chip.
 * Drop one at public/swatches/<key>.jpg (or .png / .webp), ideally a tall
 * crop shot square-on in daylight, and that card switches to it on the next
 * render. Photograph the shop's own sample books: manufacturer and other
 * shops' images are copyrighted.
 */
const FINISHES = [
  { key: "gloss", name: "Gloss", line: "Closest to factory paint", face: s.gloss },
  { key: "satin", name: "Satin", line: "Low sheen, shows bodylines", face: s.satin },
  { key: "matte", name: "Matte", line: "Flattens reflections", face: s.matte },
  { key: "metallic", name: "Metallic", line: "Flake moves in direct light", face: s.metallic },
  { key: "colour-shift", name: "Colour-shift", line: "Changes with the viewing angle", face: s.shift },
];

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/** Runs on the server at render, so it costs the browser nothing */
function swatchPhoto(key: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "swatches", `${key}.${ext}`);
    if (fs.existsSync(file)) return `/swatches/${key}.${ext}`;
  }
  return null;
}

/**
 * Decorative: the finishes are named in the copy, so this is hidden from
 * assistive tech. The fan opens on page load by default; `openOnView` holds
 * it closed until it is first scrolled into view (needs <RevealOnce /> on the
 * page), for a fan further down a page.
 */
export function SwatchFan({ className, openOnView = false }: { className?: string; openOnView?: boolean }) {
  return (
    <div
      className={`${s.fanWrap} ${openOnView ? s.onView : ""} ${className ?? ""}`}
      aria-hidden
      data-reveal={openOnView ? "fan" : undefined}
    >
      <div className={s.fan}>
        {FINISHES.map((f, i) => {
          const photo = swatchPhoto(f.key);
          return (
            <div key={f.key} className={s.chip} style={{ "--i": i } as React.CSSProperties}>
              <div className={`${s.face} ${photo ? s.photo : f.face}`}>
                {photo && <Image src={photo} alt="" fill sizes="160px" className={s.facePhoto} />}
              </div>
              <div className={s.label}>
                <span className={s.labelName}>{f.name}</span>
                <span className={s.labelLine}>{f.line}</span>
              </div>
              <span className={s.rivet} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
