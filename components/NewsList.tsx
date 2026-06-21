"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type News = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  image_url: string;
  featured: boolean;
  created_at: string;
};

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setNews(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <article style={card}>
        <h2>Caricamento news...</h2>
      </article>
    );
  }

  if (news.length === 0) {
    return (
      <article style={card}>
        <h2>📰 Nessuna news pubblicata</h2>
        <p>Vai su Admin e pubblica una news.</p>
      </article>
    );
  }

  const normalNews = news.slice(0, 6);

  return (
    <>
            {normalNews.length > 0 && (
        <section style={secondaryGrid}>
          {normalNews.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              style={smallCard}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={smallImage}
                />
              )}

              <div
                 style={{
                padding: 10,
                flex: 1,
                 display: "flex",
                flexDirection: "column",
                  }}
                >
                <p style={smallCategory}>{item.category}</p>

                <h2 style={smallTitle}>{item.title}</h2>

                {item.subtitle && (
                  <p style={smallSubtitle}>{item.subtitle}</p>
                )}
                <p
                 style={{
                   color: "#ef4444",
                  fontWeight: "bold",
                   marginTop: "auto",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                 }}
                >
                 Leggi articolo →
                </p>
                <small style={{ color: "#9ca3af" }}>
                  {item.created_at
                 ? new Date(item.created_at).toLocaleDateString("it-IT")
                  : ""}
                </small>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

const card = {
  background: "rgba(17,24,39,.94)",
  color: "#f9fafb",
  padding: 24,
  borderRadius: 0,
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 0px 45px rgba(0,0,0,.32)",
  marginBottom: 14,
};

const featuredCard = {
  display: "grid",
  gridTemplateColumns: "1.15fr .85fr",
  background: "rgba(17,24,39,.96)",
  color: "#f9fafb",
  borderRadius: 0,
  overflow: "hidden",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.1)",
  boxShadow: "0 24px 65px rgba(0,0,0,.42)",
  marginBottom: 20,
};

const featuredImageWrap = {
  position: "relative" as const,
  minHeight: 360,
  background: "#111827",
};

const featuredImage = {
  width: "100%",
  height: "100%",
  minHeight: 360,
  objectFit: "cover" as const,
  display: "block",
};

const imageOverlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(90deg,rgba(3,7,18,.05),rgba(3,7,18,.55))",
};

const featuredContent = {
  padding: 30,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};

const badge = {
  color: "#f87171",
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 1,
  margin: "0 0 12px",
};

const featuredTitle = {
  fontSize: 56,
  lineHeight: 1.12,
  margin: "0 0 18px",
  color: "#ffffff",
};

const featuredSubtitle = {
  color: "#d1d5db",
  fontSize: 22,
  lineHeight: 1.55,
  marginBottom: 22,
};

const metaRow = {
  display: "flex",
  gap: 14,
  flexWrap: "wrap" as const,
  color: "#9ca3af",
  fontSize: 14,
  marginBottom: 20,
};

const readMore = {
  color: "#f87171",
};

const smallCard = {
  background: "#111827",
  color: "#f9fafb",
  overflow: "hidden",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "0 14px 35px rgba(0,0,0,.32)",
  transition: "transform .2s ease, border-color .2s ease",
  minHeight: 220,
  display: "flex",
  flexDirection: "column",
};

const secondaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 24,
  marginTop: 20,
};

const smallImage = {
  width: "100%",
  height: 200,
  objectFit: "cover" as const,
  display: "block",
};

const smallCategory = {
  color: "#ef4444",
  fontWeight: "bold",
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};

const smallTitle = {
  fontSize: 18,
  lineHeight: 1.18,
  margin: "0 0 10px",
  color: "#ffffff",
  fontWeight: 800,
};

const smallSubtitle = {
  color: "#9ca3af",
  fontSize: 15,
  lineHeight: 1.5,
  marginBottom: 14,
};