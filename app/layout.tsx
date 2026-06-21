import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Milan Hub",
    template: "%s | Milan Hub",
  },
  description:
    "Milan Hub: news, mercato, rosa, statistiche, pagelle e approfondimenti sul mondo rossonero.",
  keywords: [
    "Milan",
    "AC Milan",
    "Milan Hub",
    "news Milan",
    "mercato Milan",
    "pagelle Milan",
    "statistiche Milan",
    "rosa Milan",
  ],
  openGraph: {
    title: "Milan Hub",
    description:
      "News, mercato, rosa, statistiche, pagelle e approfondimenti sul mondo rossonero.",
    type: "website",
    locale: "it_IT",
    siteName: "Ac1899com",
  },
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
          fontFamily: "Arial, sans-serif",
          background: "#030712",
          color: "#f9fafb",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div style={{ flex: 1 }}>{children}</div>

        <footer
          style={{
            background: "#111827",
            borderTop: "3px solid #991b1b",
            padding: "32px 24px",
            marginTop: 40,
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <h2
                style={{
                  marginTop: 0,
                  color: "#ffffff",
                }}
              >
                🔴⚫ Milan Hub
              </h2>

              <p
                style={{
                  color: "#9ca3af",
                  maxWidth: 400,
                }}
              >
                News, mercato, statistiche, pagelle e approfondimenti sul mondo
                rossonero.
              </p>
            </div>

            <div>
              <h3>Sezioni</h3>

              <p>📰 News</p>
              <p>💰 Mercato</p>
              <p>👥 Rosa</p>
              <p>📊 Statistiche</p>
              <p>⭐ Pagelle</p>
            </div>

            <div>
              <h3>Informazioni</h3>

              <p>© 2025 Milan Hub</p>
              <p>Tutti i diritti riservati</p>
              <p>Progetto indipendente non affiliato ad AC Milan.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}