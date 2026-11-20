import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/login", "/api/", "/test", "/test-supabase"] },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
