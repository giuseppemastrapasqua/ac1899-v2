"use client";

import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Milan", href: "/milan" },
    { label: "Femminile", href: "/milan-femminile" },
    { label: "News", href: "/news" },
    { label: "Campionato", href: "/campionato" },
    { label: "Match Analyst AI", href: "/campionato/analisi" },
    { label: "MVP", href: "/mvp-del-mese" },
    { label: "Europa League", href: "/europa-league" },
    { label: "Wonderkids", href: "/wonderkids" },
    { label: "Creator", href: "/creator-video" },
    { label: "Community", href: "/community" },
  ];

  return (
    <header
      className="site-navbar"
      style={{
        background: "#111827",
        borderBottom: "2px solid #991b1b",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav
        aria-label="Navigazione principale"
        className="site-nav-inner"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px 24px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" aria-label="AC1899 · Home" className="ac1899-brand-link">
          <BrandMark />
        </Link>

        <div className="site-nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: "#f9fafb",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
              transition: "0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
        </div>

        <Link
          href="/admin"
          className="site-nav-admin"
          style={{
            marginLeft: "auto",
            color: "#fca5a5",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}