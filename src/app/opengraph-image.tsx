import { ImageResponse } from "next/og";
import { site, cityRegion } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Any route can override it by adding its own
 * opengraph-image file in that route folder.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #15202a 0%, #08080a 52%, #0b1c28 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 14, height: 52, background: "#22b4e8" }} />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#f5f5f7",
              fontWeight: 800,
            }}
          >
            Paddock Pro
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: -3,
              textTransform: "uppercase",
              color: "#f5f5f7",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Vehicle wraps</span>
            <span>
              built to <span style={{ color: "#22b4e8" }}>paddock</span>
            </span>
            <span>standard</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#8b8b9a", display: "flex" }}>
            Wraps · PPF · Fleet · Tint · Ceramic · {cityRegion}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #24242e",
            paddingTop: 26,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5e5e6c",
          }}
        >
          <span>3M · Avery Dennison · Inozetek</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
