import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#111111", color: "#ffffff", borderRadius: 12, fontSize: 23, fontWeight: 900,
      letterSpacing: -1.6, borderBottom: "6px solid #e30613",
    }}>
      <span>189</span><span style={{ color: "#ff4a55" }}>9</span>
    </div>,
    size,
  );
}
