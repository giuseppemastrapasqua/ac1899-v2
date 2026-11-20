import NewsAutoRefresh from "../../components/NewsAutoRefresh";
import { sectionMetadata } from "../../lib/site-seo";

export const metadata = sectionMetadata("/news");

import NewsArchive, { type ArchiveEntry } from "../../components/NewsArchive";
import { getOfficialMilanCover } from "../../lib/acmilan-news";
import { getLocalNews, localNewsHref } from "../../lib/local-news";
import { supabase } from "../../lib/supabase";

async function getEditorialArchive() {
  type EditorialRow = { id: number; title: string; created_at: string | null; category?: string; image_url?: string };
  const entries: ArchiveEntry[] = [];
  const size = 200;
  for (const table of ["news", "daily_editorials"] as const) {
    const isNews = table === "news";
    for (let offset = 0; ; offset += size) {
      const result = await supabase.from(table)
        .select(isNews ? "id,title,created_at,category,image_url" : "id,title,created_at")
        .order("created_at", { ascending: false }).order("id")
        .range(offset, offset + size - 1).abortSignal(AbortSignal.timeout(5000))
        .overrideTypes<EditorialRow[], { merge: false }>();
      if (result.error || !result.data) break;
      for (const entry of result.data) {
        if (!entry.created_at) continue;
        entries.push({ title: entry.title, date: entry.created_at, source: "Redazione AC1899",
          href: (isNews ? "/news/" : "/editoriali/") + entry.id,
          category: "category" in entry && typeof entry.category === "string" ? entry.category : "Editoriale",
          image: "image_url" in entry && typeof entry.image_url === "string" ? entry.image_url : undefined });
      }
      if (result.data.length < size) break;
    }
  }
  return entries;
}

export default async function NewsPage() {
  const [local, editorial] = await Promise.all([getLocalNews(), getEditorialArchive()]);
  const translated = await Promise.all(local.map(async ({ id, title, date, source, category, coverSource }) => ({
    title, date, source, category, href: localNewsHref(id),
    image: coverSource ? await getOfficialMilanCover(coverSource) : undefined,
  })));
  const entries = [...translated, ...editorial].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return (
    <main className="ac1899-home min-h-screen">
      <NewsAutoRefresh />
      <div className="home-section-inner">
        <header>
          <h1 className="text-4xl">Archivio notizie</h1>
          <p className="mt-2 text-sm text-gray-600">Notizie ufficiali, rassegna stampa e articoli AC1899. I contributi in inglese sono rielaborati in italiano.</p>
        </header>
        <NewsArchive entries={entries} />
      </div>
    </main>
  );
}
