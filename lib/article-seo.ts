import type { Metadata } from "next";
import { siteUrl } from "./site-seo";

export const isTestArticle = (title: string) => /\btest\b/i.test(title);
export function articleMetadata({ title, description, path, date, image, author = "Redazione AC1899" }: { title: string; description: string; path: string; date?: string | null; image?: string | null; author?: string }): Metadata {
  const summary = description.replace(/\s+/g, " ").trim().slice(0, 160);
  return { title, description: summary, alternates: { canonical: path },
    authors: [{ name: author }], robots: { index: !isTestArticle(title), follow: true },
    openGraph: { type: "article", title, description: summary, url: path, siteName: "AC1899", locale: "it_IT", ...(date ? { publishedTime: date } : {}), ...(image ? { images: [{ url: image, alt: title }] } : {}) },
    twitter: { card: image ? "summary_large_image" : "summary", title, description: summary, ...(image ? { images: [image] } : {}) },
  };
}
export function articleJsonLd({ title, description, path, date, image, author = "Redazione AC1899" }: { title: string; description: string; path: string; date?: string | null; image?: string | null; author?: string }) {
  return JSON.stringify({ "@context": "https://schema.org", "@type": "NewsArticle", headline: title, description, inLanguage: "it-IT", mainEntityOfPage: siteUrl + path,
    author: { "@type": author === "Rabdo" ? "Person" : "Organization", name: author }, publisher: { "@type": "Organization", name: "AC1899", url: siteUrl },
    ...(date ? { datePublished: date } : {}), ...(image ? { image: [image] } : {}),
  }).replace(/</g, "\\u003c");
}
