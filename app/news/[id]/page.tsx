"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

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

export default function NewsDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [article, setArticle] = useState<News | null>(null);
  const [related, setRelated] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  async function loadArticle() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(error);
      setArticle(null);
      setLoading(false);
      return;
    }

    setArticle(data);

    const { data: relatedNews } = await supabase
      .from("news")
      .select("*")
      .neq("id", id)
      .eq("category", data.category)
      .order("created_at", { ascending: false })
      .limit(3);

    setRelated(relatedNews || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main style={pageStyle}>
        <section style={articleStyle}>
          <h1>Caricamento articolo...</h1>
        </section>
      </main>
    );
  }

  if (!article) {
    return (
      <main style={pageStyle}>
        <section style={articleStyle}>
          <h1>Articolo non trovato</h1>
          <Link href="/news" style={linkStyle}>
            ← Torna alle news
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <article style={articleStyle}>
        <p style={categoryStyle}>{article.category}</p>

        <h1 style={titleStyle}>{article.title}</h1>

        {article.subtitle && <p style={subtitleStyle}>{article.subtitle}</p>}

        <div style={metaStyle}>
          <span>
            📅 {new Date(article.created_at).toLocaleDateString("it-IT")}
          </span>

          {article.featured && <span>🔥 In evidenza</span>}
        </div>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            style={{
              width: "100%",
              maxHeight: 560,
              objectFit: "cover",
              borderRadius: 18,
              marginTop: 24,
              marginBottom: 30,
              background: "#f3f4f6",
            }}
          />
        )}

        <div style={contentBox}>
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index} style={contentStyle}>
              {paragraph}
            </p>
          ))}
        </div>

        <Link href="/news" style={linkStyle}>
          ← Torna alle news
        </Link>
      </article>

      {related.length > 0 && (
        <section style={relatedSection}>
          <h2>📰 Altre news {article.category}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 18,
            }}
          >
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                style={{
                  ...relatedCard,
                  textDecoration: "none",
                  color: "#111827",
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginBottom: 12,
                    }}
                  />
                )}

                <p
                  style={{
                    color: "#991b1b",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {item.category}
                </p>

                <h3>{item.title}</h3>

                {item.subtitle && (
                  <p style={{ color: "#4b5563" }}>{item.subtitle}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

const pageStyle = {
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: 24,
  fontFamily: "Arial",
  color: "#111827",
};

const articleStyle = {
  maxWidth: 980,
  margin: "0 auto 24px auto",
  background: "white",
  color: "#111827",
  padding: 34,
  borderRadius: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const categoryStyle = {
  color: "#991b1b",
  fontWeight: "bold",
  fontSize: 18,
  margin: "0 0 10px 0",
  textTransform: "uppercase" as const,
  letterSpacing: 0.8,
};

const titleStyle = {
  color: "#111827",
  fontSize: 46,
  lineHeight: 1.1,
  margin: "8px 0 14px 0",
};

const subtitleStyle = {
  color: "#4b5563",
  fontSize: 23,
  lineHeight: 1.5,
  marginBottom: 18,
};

const metaStyle = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap" as const,
  color: "#6b7280",
  fontSize: 15,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 18,
};

const contentBox = {
  marginTop: 12,
};

const contentStyle = {
  color: "#111827",
  fontSize: 20,
  lineHeight: 1.85,
  marginBottom: 18,
};

const relatedSection = {
  maxWidth: 980,
  margin: "0 auto",
  background: "white",
  color: "#111827",
  padding: 28,
  borderRadius: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const relatedCard = {
  background: "#fafafa",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
};

const linkStyle = {
  display: "inline-block",
  marginTop: 24,
  color: "#991b1b",
  fontWeight: "bold",
  textDecoration: "none",
};