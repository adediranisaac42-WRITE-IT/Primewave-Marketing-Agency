import { ImageResponse } from "next/og";

export const alt = "Primewave Marketing Agency — Turning Digital Potential Into Business Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80,
        background: "radial-gradient(circle at 15% 10%, #2F86FF 0%, #101827 55%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>Primewave</div>
          <div style={{ fontSize: 16, letterSpacing: 6, color: "#2F86FF" }}>MARKETING AGENCY</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>Turning Digital Potential Into Business Growth.</div>
        <div style={{ fontSize: 26, color: "#9CC4FF", letterSpacing: 4 }}>STRATEGY. INNOVATION. GROWTH.</div>
      </div>
    ),
    size
  );
}
