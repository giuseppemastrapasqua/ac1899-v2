import type { MetadataRoute } from "next";
import { getLocalNews, localNewsHref } from "../lib/local-news";
import { publicSections, siteUrl } from "../lib/site-seo";
import { supabase } from "../lib/supabase";
import { isTestArticle } from "../lib/article-seo";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getLocalNews();
  const urls: MetadataRoute.Sitemap = Object.keys(publicSections).map(path => ({ url: siteUrl + path }));
  for (const story of articles) if (Number.isFinite(Date.parse(story.date)) && Date.parse(story.date) <= Date.now()) urls.push({ url: siteUrl + localNewsHref(story.id), lastModified: new Date(story.date) });
  for (const table of ["news", "daily_editorials"] as const) {
    for (let offset = 0; ; offset += 500) {
      let query = supabase.from(table).select("id,title,created_at").not("created_at", "is", null).lte("created_at", new Date().toISOString()).order("id").range(offset, offset + 499);
      if (table === "daily_editorials") query = query.eq("status", "published");
      const { data, error } = await query;
      if (error) throw new Error("Sitemap: lettura articoli non riuscita");
      for (const item of data || []) if (!isTestArticle(item.title)) urls.push({ url: siteUrl + (table === "news" ? "/news/" : "/editoriali/") + item.id, lastModified: new Date(item.created_at) });
      if (!data || data.length < 500) break;
    }
  }
  return [...new Map(urls.map(entry => [entry.url, entry])).values()];
}
