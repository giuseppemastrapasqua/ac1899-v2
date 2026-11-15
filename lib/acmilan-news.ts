const officialOrigin = "https://www.acmilan.com";
export const officialNewsUrl = officialOrigin + "/it/news/articoli/ultime";

export type OfficialMilanNews = {
  title: string;
  url: string;
  date: string;
  category: string;
};

const recentStories = [
  ["femminile/2026-11-14/kanutte-non-basta-3-3-per-le-rossonere", "Pari per 3-3 per il Milan femminile"],
  ["nazionali/2026-11-14/italia-u21-vincente-camarda-in-gol", "Camarda segna nella vittoria dell’Italia Under 21"],
  ["femminile/2026-11-13/serie-a-women-la-preview-di-napoli-women-milan", "Napoli Women–Milan, la presentazione della partita"],
  ["club/2026-11-13/tra-ricordi-e-regali-al-via-il-racconto-delle-festivita-rossonere", "Il Milan presenta le iniziative per le festività"],
  ["nazionali/2026-11-13/moreira-sorride-con-il-belgio", "Moreira, aggiornamenti dal Belgio"],
  ["settore-giovanile/2026-11-12/il-programma-del-weekend-tra-derby-e-scontri-cittadini", "Settore giovanile, il programma del fine settimana"],
  ["ticketing/2026-11-12/milan-como-per-finire-in-bellezza", "Milan–Como, le informazioni sui biglietti"],
  ["community/2026-11-12/il-milan-nel-mondo-la-bandiera-che-sventola-in-tutti-i-continenti", "Il racconto delle comunità rossonere nel mondo"],
];

function articleFromPath(path: string, title?: string): OfficialMilanNews | null {
  const match = /^([a-z0-9-]+)\/(\d{4}-\d{2}-\d{2})\/([a-z0-9-]+)\/?$/i.exec(path);
  if (!match) return null;

  const [, category, date, slug] = match;
  return {
    url: officialOrigin + "/it/news/articoli/" + category + "/" + date + "/" + slug,
    title: title || slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll("-", " "),
    category: category.replaceAll("-", " "),
    date,
  };
}

export async function getOfficialMilanNews(): Promise<OfficialMilanNews[]> {
  const stories = new Map<string, OfficialMilanNews>();

  try {
    const response = await fetch(officialNewsUrl, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);

    const html = await response.text();
    const links = html.matchAll(/href=["'](?:https:\/\/www\.acmilan\.com)?\/it\/news\/articoli\/([^"'?#]+)(?:[?#][^"']*)?["']/gi);
    for (const [, path] of links) {
      const story = articleFromPath(path);
      if (story) stories.set(story.url, story);
    }
  } catch (error) {
    console.error("Feed ufficiale AC Milan:", error);
  }

  for (const [path, title] of recentStories) {
    const story = articleFromPath(path, title);
    if (story) stories.set(story.url, story);
  }

  return [...stories.values()].sort((a, b) => b.date.localeCompare(a.date));
}
