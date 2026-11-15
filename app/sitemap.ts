import type { MetadataRoute } from "next";
import { getLocalNews, localNewsHref } from "../lib/local-news";
import { publicSections, siteUrl } from "../lib/site-seo";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getLocalNews();
  return [
    ...Object.keys(publicSections).map(path => ({ url: siteUrl + path })),
    ...articles.filter(story => Number.isFinite(Date.parse(story.date))).map(story => ({
      url: siteUrl + localNewsHref(story.id), lastModified: new Date(story.date),
    })),
  ];
}
