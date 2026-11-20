import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default async function EditorialePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const { data: article, error } = await supabase
    .from("daily_editorials")
    .select("title, subtitle, article")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("Impossibile caricare l’editoriale.");
  if (!article) notFound();

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <Link href="/editoriali">Tutti gli editoriali</Link>
      <article>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: "16px 0" }}>
          {article.title}
        </h1>
        {article.subtitle && <p style={{ color: "#9ca3af" }}>{article.subtitle}</p>}
        <div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", lineHeight: 1.7, marginTop: 24 }}>
          {article.article}
        </div>
      </article>
    </main>
  );
}
