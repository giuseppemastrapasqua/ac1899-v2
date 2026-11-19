import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

import { siteUrl } from "../lib/site-seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AC1899", template: "%s | AC1899" },
  description: "Notizie, mercato, risultati e analisi sul Milan.",
  openGraph: { type: "website", locale: "it_IT", siteName: "AC1899" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          fontFamily: '"Lato", Arial, sans-serif',
          background: "#030712",
          color: "#f9fafb",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div style={{ flex: 1 }}>{children}</div>

        <footer className="site-footer"
  style={{
    background: "#111827",
    borderTop: "1px solid #e30613",
    padding: "18px 24px",
    marginTop: 48,
  }}
>
  <div
    style={{
      maxWidth: 1400,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        color: "#e30613",
        fontWeight: 900,
        fontSize: 22,
        letterSpacing: "-0.5px",
      }}
    >
      AC1899
    </div>

    <nav
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <a href="/news" style={footerLink}>News</a>
      <a href="/creator-video" style={footerLink}>Creator</a>
      <a href="/wonderkids" style={footerLink}>Wonderkids</a>
      <a href="/#ai-room" style={footerLink}>AI Room</a>
      <a href="/#europa" style={footerLink}>Europa</a>
    </nav>

    <p
      style={{
        margin: 0,
        color: "#9ca3af",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      © 2025 AC1899 · Progetto indipendente
    </p>
  </div>
</footer>
        <Analytics />
      </body>
    </html>
  );
}
const footerLink = {
  color: "#f9fafb",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};