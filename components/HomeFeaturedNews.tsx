"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type News = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  category: string;
  featured: boolean;
  created_at: string;
};

export default function HomeFeaturedNews() {
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    setNews(data || null);
  }

  if (!news) return null;

  return (
    <section style={wrapper}>
      <div style={heroBox}>
        {news.image_url && (
          <img src={news.image_url} alt={news.title} style={heroImage} />
        )}

        <div style={overlay} />

        <div style={content}>
          <div style={badge}>🔥 NEWS IN EVIDENZA</div>

          <h1 style={title}>{news.title}</h1>

          {news.subtitle && <p style={subtitle}>{news.subtitle}</p>}

          <div style={meta}>
            <span>{news.category || "News"}</span>
            <span>
              {news.created_at
                ? new Date(news.created_at).toLocaleDateString("it-IT")
                : ""}
            </span>
          </div>

          <Link href={`/news/${news.id}`} style={button}>
            LEGGI ARTICOLO →
          </Link>
        </div>
      </div>
    </section>
  );
}

const wrapper = {
  maxWidth: 1400,
  margin: "24px auto 28px",
  padding: "0 24px",
};

const heroBox = {
  height: 500,
  position: "relative" as const,
  overflow: "hidden",
  background: "#030712",
  boxShadow: "0 28px 70px rgba(0,0,0,.45)",
};

const heroImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  objectPosition: "center top",
  display: "block",
};

const overlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(90deg,rgba(3,7,18,.88),rgba(3,7,18,.42),rgba(3,7,18,.08))",
};

const content = {
  position: "absolute" as const,
  left: 48,
  bottom: 46,
  maxWidth: 760,
  color: "white",
};

const badge = {
  display: "inline-block",
  background: "#e30613",
  color: "white",
  padding: "9px 16px",
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 1,
  marginBottom: 16,
  textTransform: "uppercase" as const,
};

const title = {
  fontSize: 58,
  lineHeight: 0.95,
  fontWeight: 900,
  textTransform: "uppercase" as const,
  letterSpacing: "-1px",
  margin: "0 0 18px",
  color: "white",
  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
};

const subtitle = {
  fontSize: 20,
  lineHeight: 1.5,
  color: "#e5e7eb",
  margin: "0 0 18px",
  maxWidth: 720,
};

const meta = {
  display: "flex",
  gap: 14,
  flexWrap: "wrap" as const,
  color: "#d1d5db",
  fontSize: 14,
  marginBottom: 22,
  fontWeight: "bold",
  textTransform: "uppercase" as const,
};

const button = {
  display: "inline-block",
  background: "#e30613",
  color: "white",
  padding: "15px 34px",
  textDecoration: "none",
  fontWeight: "bold",
  letterSpacing: 1,
  marginTop: 18,
  textTransform: "uppercase" as const,
};