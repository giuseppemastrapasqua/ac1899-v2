import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import NewsArticleView from "../../../components/NewsArticleView";
import { supabase } from "../../../lib/supabase";
import { articleMetadata, articleJsonLd, isTestArticle } from "../../../lib/article-seo";

export const dynamic = "force-dynamic";
const readArticle = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null;
  const { data, error } = await supabase.from("news").select("*").eq("id", Number(id)).maybeSingle();
  if (error) throw new Error("Impossibile caricare l’articolo");
  return data;
});
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await readArticle(id);
  if (!article) return { robots: { index: false } };
  return articleMetadata({ title: article.title, description: article.subtitle || article.content, path: "/news/" + id, date: article.created_at, image: article.image_url, author: /Il punto di Rabdo/i.test(article.subtitle || "") ? "Rabdo" : "Redazione AC1899" });
}
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await readArticle(id);
  if (!article) notFound();
  const { data } = await supabase.from("news").select("*").neq("id", article.id).eq("category", article.category).order("created_at", { ascending: false }).limit(30);
  const related = (data || []).filter(item => !isTestArticle(item.title)).slice(0, 3);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd({ title: article.title, description: article.subtitle || article.content.slice(0, 160), path: "/news/" + id, date: article.created_at, image: article.image_url, author: /Il punto di Rabdo/i.test(article.subtitle || "") ? "Rabdo" : "Redazione AC1899" }) }} /><NewsArticleView article={article} related={related} /></>;
}
