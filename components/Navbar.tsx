"use client";

import Link from "next/link";

export default function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Milan", href: "/news" },
    { label: "AI Room", href: "/#ai-room" },
    { label: "Creator", href: "/creator-video" },
    { label: "Wonderkids", href: "/wonderkids" },
    { label: "Europa", href: "/#europa" },
    { label: "Community", href: "/#newsletter" },
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
        <Link
          href="/"
          style={{
            color: "#e30613",
            textDecoration: "none",
            fontWeight: 900,
            fontSize: 26,
            letterSpacing: "-1px",
            fontFamily: "Arial Black, sans-serif",
            marginRight: 12,
          }}
        >
          AC1899
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