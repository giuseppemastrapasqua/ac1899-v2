import { getOfficialMilanCover } from "../lib/acmilan-news";
import { getLocalNews, localNewsHref } from "../lib/local-news";
import { supabase } from "../lib/supabase";
import NewsRotation, { type RotationStory } from "./NewsRotation";

export default async function HomeFeaturedNews() {
  const [articles, editorial] = await Promise.all([
    getLocalNews(),
    supabase.from("news")
      .select("id,title,category,image_url,created_at")
      .order("created_at", { ascending: false })
      .limit(8)
      .abortSignal(AbortSignal.timeout(5000)),
  ]);

  const latest: (RotationStory & { coverSource?: string })[] = [
    ...articles.map(({ id, title, source, date, category, coverSource }) => ({
      title, source, date, category, coverSource, url: localNewsHref(id),
    })),
    ...(editorial.data ?? []).map(story => ({
      title: story.title, source: "Redazione AC1899", category: story.category,
      date: story.created_at, url: "/news/" + story.id, image: story.image_url,
    })),
  ];

  const titles = new Set<string>();
  const selected = latest
    .filter(story => Number.isFinite(Date.parse(story.date)))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.url.localeCompare(b.url))
    .filter(story => {
      const key = story.title.toLocaleLowerCase("it").replace(/[^\p{L}\p{N}]/gu, "");
      if (titles.has(key)) return false;
      titles.add(key);
      return true;
    })
    .slice(0, 4);

  const withCovers = await Promise.all(selected.map(async ({ coverSource, ...story }) => ({
    ...story,
    image: story.image || (coverSource ? await getOfficialMilanCover(coverSource) : undefined),
  })));

  const usedPhotos = new Set<string>();
  const stories = withCovers.map(story => {
    const key = story.image?.split(/[?#]/, 1)[0];
    if (!key || usedPhotos.has(key)) return { ...story, image: undefined };
    usedPhotos.add(key);
    return story;
  });

  return <NewsRotation stories={stories} />;
}
