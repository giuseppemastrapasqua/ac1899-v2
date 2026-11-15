import { getOfficialMilanCover, getOfficialMilanNews } from "../lib/acmilan-news";
import { getPressNews, getVerifiedPressNews } from "../lib/press-news";
import { supabase } from "../lib/supabase";
import NewsRotation, { type RotationStory } from "./NewsRotation";

export default async function HomeFeaturedNews() {
  const [official, editorial, foreign, italian] = await Promise.all([
    getOfficialMilanNews(),
    supabase.from("news")
      .select("id,title,category,image_url,created_at")
      .order("created_at", { ascending: false })
      .limit(8)
      .abortSignal(AbortSignal.timeout(5000)),
    getPressNews("estero"),
    getPressNews("italia"),
  ]);

  const press = [...getVerifiedPressNews(), ...foreign, ...italian];
  const uniquePress = new Map(press.map(story => [story.url, story]));
  const latest: RotationStory[] = [
    ...official.map(story => ({ ...story, source: "AC Milan" })),
    ...(editorial.data ?? []).map(story => ({
      title: story.title, source: "Redazione AC1899", category: story.category,
      date: story.created_at, url: "/news/" + story.id, image: story.image_url,
    })),
    ...[...uniquePress.values()].map(story => ({ ...story, category: "Rassegna stampa" })),
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

  const withCovers = await Promise.all(selected.map(async story => ({
    ...story,
    image: story.image || (story.url.startsWith("https://") && !story.url.startsWith("https://news.google.com/")
      ? await getOfficialMilanCover(story.url) : undefined),
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
