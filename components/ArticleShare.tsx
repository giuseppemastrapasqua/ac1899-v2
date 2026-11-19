"use client";

import { useState } from "react";

export default function ArticleShare({ title, url }: { title: string; url: string }) {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    setExpanded(true);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setMessage("Link copiato"); }
    catch { setMessage("Copia questo link: " + url); }
  }
  const link = { color: "#991b1b", fontWeight: 700, padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 8, background: "white", fontSize: 16, textDecoration: "none", cursor: "pointer" };
  return <section aria-label="Condividi articolo" style={{ margin: "20px 0" }}>
    <button type="button" onClick={share} style={link}>Condividi</button>
    {expanded && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
      <a style={link} href={"https://wa.me/?text=" + encodeURIComponent(title + " " + url)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a style={link} href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a style={link} href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url)} target="_blank" rel="noopener noreferrer">X</a>
      <button type="button" onClick={copy} style={link}>Copia link</button>
    </div>}
    <p role="status" style={{ color: "#4b5563", overflowWrap: "anywhere" }}>{message}</p>
  </section>;
}
