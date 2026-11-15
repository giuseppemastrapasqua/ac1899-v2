import { getOfficialMilanCover, getOfficialMilanNews } from "../lib/acmilan-news";
import { getPressNews, getVerifiedPressNews } from "../lib/press-news";
import { supabase } from "../lib/supabase";
import NewsRotation, { type RotationStory } from "./NewsRotation";

const archive = [
  { file: "4/42/San_Siro_stadio_Milano.jpg", author: "Vasil Evlogiev" },
  { file: "0/0c/San_Siro_Curva_Sud_Milano.jpg", author: "Simov" },
  { file: "6/6e/San_Siro_MilanDerby5.jpg", author: "Milanellopv" },
].map(({ file, author }) => {
  const filename = file.split("/").at(-1);
  return {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/" + file + "/960px-" + filename,
    credit: { author, url: "https://commons.wikimedia.org/wiki/File:" + filename },
  };
});

function photoKey(image: string) {
  return image.split(/[?#]/, 1)[0];
}

export default async function HomeFeaturedNews() {
  const [official, editorial, foreign, italian] = await Promise.all([
    getOfficialMilanNews(),
    supabase.from("news")
      .select("id,title,category,image_url,created_at")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(8)
      .abortSignal(AbortSignal.timeout(5000)),
    getPressNews("estero"),
    getPressNews("italia"),
  ]);

  const press = [...foreign, ...italian];
  const distinctPress = [...new Map(
    [...getVerifiedPressNews(), ...press].map(story => [story.url, story])
  ).values()].sort((a, b) => Number(a.url.startsWith("https://news.google.com/")) - Number(b.url.startsWith("https://news.google.com/")) || b.date.localeCompare(a.date));

  const groups: RotationStory[][] = await Promise.all([
    Promise.all(official.slice(0, 8).map(async story => ({
      ...story, source: "AC Milan", image: await getOfficialMilanCover(story.url),
    }))),
    Promise.resolve((editorial.data ?? []).map(story => ({
      title: story.title, source: "Redazione AC1899", category: story.category,
      date: story.created_at, url: "/news/" + story.id, image: story.image_url,
    }))),
    Promise.all(distinctPress.slice(0, 6).map(async story => ({
      ...story, category: "Rassegna stampa",
      image: story.url.startsWith("https://news.google.com/") ? undefined : await getOfficialMilanCover(story.url),
    }))),
  ]);

  const stories: RotationStory[] = [];
  const usedPhotos = new Set<string>();
  const max = Math.max(...groups.map(group => group.length));
  for (let i = 0; i < max; i++) {
    for (const group of groups) {
      const story = group[i];
      if (!story) continue;
      const key = story.image && photoKey(story.image);
      const cover = key && !usedPhotos.has(key)
        ? { image: story.image }
        : archive.find(photo => !usedPhotos.has(photoKey(photo.image)));
      if (!cover?.image) continue;
      usedPhotos.add(photoKey(cover.image));
      stories.push({ ...story, ...cover });
    }
  }

  return <NewsRotation stories={stories} />;
}
