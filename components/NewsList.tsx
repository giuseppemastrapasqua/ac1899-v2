"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { CSSProperties } from "react";

type FeedItem = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  image_url?: string | null;
  created_at: string | null;
  type: "news" | "editorial";
};

export default function NewsList() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    const { data: newsData, error: newsError } = await supabase
      .from("news")
      .select("id, title, subtitle, category, image_url, created_at")
      .order("created_at", { ascending: false });

    const { data: editorialData, error: editorialError } = await supabase
      .from("daily_editorials")
      .select("id, title, subtitle, created_at")
      .order("created_at", { ascending: false });

    if (newsError || editorialError) {
      console.error(newsError || editorialError);
      setLoading(false);
      return;
    }

    const formattedNews: FeedItem[] = (newsData || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      category: item.category || "News",
      image_url: item.image_url,
      created_at: item.created_at,
      type: "news",
    }));

    const formattedEditorials: FeedItem[] = (editorialData || []).map(
      (item: any) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        category: "Editoriale AC1899",
        image_url: null,
        created_at: item.created_at,
        type: "editorial",
      })
    );

    const feed = [...formattedNews, ...formattedEditorials]
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      )
      .slice(0, 7);

    setItems(feed);
    setLoading(false);
  }

  if (loading) {
    return (
      <article style={emptyCard}>
        <h2>Caricamento news...</h2>
      </article>
    );
  }

  if (items.length === 0) {
    return (
      <article style={emptyCard}>
        <h2>📰 Nessuna news pubblicata</h2>
        <p>Vai su Admin e pubblica una news.</p>
      </article>
    );
  }

  const featured = items[0];
  const otherItems = items.slice(1, 7);

  return (
    <>
      {featured && (
        <Link
          href={
            featured.type === "editorial"
              ? `/editoriali/${featured.id}`
              : `/news/${featured.id}`
          }
          style={
            featured.type === "editorial"
              ? editorialFeaturedCard
              : featuredCard
          }
        >
          {featured.image_url && (
            <img
              src={featured.image_url}
              alt={featured.title}
              style={featuredImage}
            />
          )}

          <div style={featuredContent}>
            <p
              style={
                featured.type === "editorial"
                  ? editorialCategory
                  : smallCategory
              }
            >
              {featured.type === "editorial"
                ? "📰 Editoriale AC1899"
                : "News in evidenza"}
            </p>

            <h2 style={featuredTitle}>{featured.title}</h2>

            {featured.subtitle && (
              <p style={featuredSubtitle}>{featured.subtitle}</p>
            )}

            <p style={compactReadMore}>
              {featured.type === "editorial"
                ? "Leggi editoriale →"
                : "Leggi articolo →"}
            </p>
          </div>
        </Link>
      )}

      <section style={secondaryGrid}>
        {otherItems.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={
              item.type === "editorial"
                ? `/editoriali/${item.id}`
                : `/news/${item.id}`
            }
            style={item.type === "editorial" ? editorialCard : smallCard}
          >
            {item.image_url && (
              <img src={item.image_url} alt={item.title} style={smallImage} />
            )}

            <div style={compactContent}>
              <p
                style={
                  item.type === "editorial"
                    ? editorialCategory
                    : smallCategory
                }
              >
                {item.type === "editorial"
                  ? "📰 Editoriale AC1899"
                  : item.category}
              </p>

              <h2 style={smallTitle}>{item.title}</h2>

              {item.subtitle && <p style={smallSubtitle}>{item.subtitle}</p>}

              <p style={compactReadMore}>
                {item.type === "editorial"
                  ? "Leggi editoriale →"
                  : "Leggi articolo →"}
              </p>

              <small style={dateText}>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("it-IT")
                  : ""}
              </small>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

const emptyCard = {
  background: "rgba(17,24,39,.94)",
  color: "#f9fafb",
  padding: 24,
  border: "1px solid rgba(255,255,255,.08)",
  marginBottom: 14,
};

const featuredCard: CSSProperties = {
  background: "#111827",
  color: "#f9fafb",
  overflow: "hidden",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.10)",
  borderTop: "3px solid #e30613",
  minHeight: 210,
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  marginBottom: 16,
};

const editorialFeaturedCard: CSSProperties = {
  ...featuredCard,
  border: "1px solid rgba(227,6,19,.65)",
  borderTop: "3px solid #e30613",
  background:
    "linear-gradient(180deg, rgba(127,29,29,.24), rgba(17,24,39,.96))",
  display: "flex",
  flexDirection: "column",
};

const featuredImage = {
  width: "100%",
  height: "100%",
  minHeight: 210,
  objectFit: "cover" as const,
  display: "block",
};

const featuredContent: CSSProperties = {
  padding: 18,
  display: "flex",
  flexDirection: "column",
};

const featuredTitle = {
  fontSize: 28,
  lineHeight: 1.12,
  margin: "0 0 10px",
  color: "#ffffff",
  fontWeight: 900,
};

const featuredSubtitle = {
  color: "#9ca3af",
  fontSize: 15,
  lineHeight: 1.45,
  marginBottom: 12,
};

const secondaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
};

const smallCard: CSSProperties = {
  background: "#111827",
  color: "#f9fafb",
  overflow: "hidden",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.10)",
  minHeight: 150,
  display: "flex",
  flexDirection: "column",
};

const editorialCard: CSSProperties = {
  ...smallCard,
  border: "1px solid rgba(227,6,19,.65)",
  borderTop: "3px solid #e30613",
  background:
    "linear-gradient(180deg, rgba(127,29,29,.24), rgba(17,24,39,.96))",
};

const smallImage = {
  width: "100%",
  height: 105,
  objectFit: "cover" as const,
  display: "block",
};

const compactContent: CSSProperties = {
  padding: 14,
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const smallCategory = {
  color: "#ef4444",
  fontWeight: "bold",
  fontSize: 11,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
};

const editorialCategory = {
  ...smallCategory,
  color: "#e30613",
};

const smallTitle = {
  fontSize: 17,
  lineHeight: 1.15,
  margin: "0 0 8px",
  color: "#ffffff",
  fontWeight: 800,
};

const smallSubtitle = {
  color: "#9ca3af",
  fontSize: 13,
  lineHeight: 1.35,
  marginBottom: 10,
};

const compactReadMore = {
  color: "#ef4444",
  fontWeight: "bold",
  marginTop: "auto",
  fontSize: 12,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
};

const dateText = {
  color: "#9ca3af",
  marginTop: 8,
  fontSize: 12,
};