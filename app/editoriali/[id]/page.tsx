import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import NewsArticleView from "../../../components/NewsArticleView";
import { articleMetadata, articleJsonLd } from "../../../lib/article-seo";

export const dynamic = "force-dynamic";
const readEditorial = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null;
  const { data, error } = await supabase.from("daily_editorials").select("id,title,subtitle,article,created_at").eq("id", id).eq("status", "published").maybeSingle();
  if (error) throw new Error("Impossibile caricare l’editoriale");
  return data;
});
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const article = await readEditorial(id);
  if (!article) return { robots: { index: false } };
  return articleMetadata({ title: article.title, description: article.subtitle || article.article, path: "/editoriali/" + id, date: article.created_at });
}
export default async function EditorialePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const article = await readEditorial(id);
  if (!article) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd({ title: article.title, description: article.subtitle || article.article.slice(0, 160), path: "/editoriali/" + id, date: article.created_at }) }} /><NewsArticleView article={{ ...article, id: Number(article.id), content: article.article, image_url: "", category: "Editoriale", featured: false }} path={"/editoriali/" + id} discussionId={"editorial-" + id} /></>;
}
