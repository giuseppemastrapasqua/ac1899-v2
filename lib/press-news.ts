type PressStory = { title: string; source: string; date: string; url: string };
type Edition = "italia" | "estero";

const editions = {
  italia: {
    hl: "it", gl: "IT", ceid: "IT:it",
    domains: ["gazzetta.it", "corrieredellosport.it", "tuttosport.com", "sport.sky.it", "sportmediaset.mediaset.it", "repubblica.it", "corriere.it", "milannews.it"],
    seed: [{
      title: "Tournée estiva del Milan, Cardinale affida la scelta ad Amorim",
      source: "Pianeta Milan", date: "2026-11-14T08:27:00Z",
      url: "https://www.pianetamilan.it/news-milan/interviste/milan-cardinale-tournee-estiva-decide-amorim-squadra-al-primo-posto/",
    }, {
      title: "RedBird presenta Milan Sports & Entertainment",
      source: "Sky Sport", date: "2026-11-13T12:33:00Z",
      url: "https://sport.sky.it/calcio/serie-a/2026/11/13/redbird-milan-sport-entertainment-yormark-ad",
    }],
  },
  estero: {
    hl: "en-GB", gl: "GB", ceid: "GB:en",
    domains: ["reuters.com", "ft.com", "bbc.com", "skysports.com", "theguardian.com", "espn.com", "nytimes.com", "lequipe.fr", "marca.com", "as.com", "kicker.de"],
    seed: [{
      title: "RedBird sceglie Brett Yormark per guidare la nuova holding del Milan",
      source: "Reuters", date: "2026-11-13T14:36:05Z",
      url: "https://www.reuters.com/sports/soccer/redbird-launches-milan-sports-holding-company-names-brett-yormark-ceo-2026-11-13/",
    }, {
      title: "Financial Times, RedBird valuta la quotazione della holding del Milan",
      source: "Financial Times", date: "2026-11-13T11:10:00Z",
      url: "https://www.ft.com/content/3d0d58ba-600f-427c-ab22-553cd8a1dcc8",
    }],
  },
};

function field(item: string, name: string) {
  return (item.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">", "i"))?.[1] ?? "")
    .trim()
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&(?:amp|quot|apos|lt|gt|#39);/g, (entity) => ({
      "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&#39;": "'",
    })[entity] ?? entity);
}

function isAboutMilan(title: string) {
  const club = /\b(?:a\.?\s?c\.?[ -]milan|milan ac|rossoner[ioe])\b/i;
  const footballContext = /\b(?:club|serie a|inter|derby|san siro|calciomercato|redbird|cardinale|mercato|coach|transfer|stadio|allenatore|squadra|holding|women)\b/i;
  return club.test(title) || (/\bMilan\b/i.test(title) && footballContext.test(title));
}

export async function getPressNews(edition: Edition): Promise<PressStory[]> {
  const { hl, gl, ceid, domains, seed } = editions[edition];
  const q = '"AC Milan" when:7d (' + domains.map(domain => "site:" + domain).join(" OR ") + ")";
  const stories = [...seed];
  try {
    const response = await fetch("https://news.google.com/rss/search?" + new URLSearchParams({ q, hl, gl, ceid }), {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const xml = await response.text();

    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
      const source = field(item, "source");
      const url = field(item, "link");
      const rawTitle = field(item, "title");
      const title = rawTitle.endsWith(" - " + source) ? rawTitle.slice(0, -source.length - 3) : rawTitle;
      const timestamp = Date.parse(field(item, "pubDate"));
      if (!isAboutMilan(title) || !source || !url.startsWith("https://news.google.com/") || !Number.isFinite(timestamp)) continue;
      stories.push({ title, source, url, date: new Date(timestamp).toISOString() });
    }
  } catch (error) {
    console.error("Rassegna stampa " + edition + ":", error);
  }

  const unique = new Map<string, PressStory>();
  for (const story of stories) {
    const key = (story.source + "|" + story.title).toLocaleLowerCase("it");
    if (!unique.has(key)) unique.set(key, story);
  }
  return [...unique.values()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 25);
}

export function getVerifiedPressNews() {
  return [...editions.estero.seed, ...editions.italia.seed].sort((a, b) => b.date.localeCompare(a.date));
}
