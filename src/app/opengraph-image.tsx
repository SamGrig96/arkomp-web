import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Auto-wired by Next into og:image / twitter:image for every route that does
// not define its own. Replace with a real 1200x630 PNG once brand art exists.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#a3a3a3" }}>
          {site.url.replace(/^https?:\/\//, "").toUpperCase()}
        </div>
        <div>{site.name}</div>
      </div>
    ),
    size,
  );
}
