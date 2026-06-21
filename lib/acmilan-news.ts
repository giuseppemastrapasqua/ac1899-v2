export type OfficialMilanNews = {
  title: string;
  url: string;
  source: string;
  image?: string;
  date?: string;
};

const OFFICIAL_NEWS_URL =
  "https://www.acmilan.com/it/news/articoli/ultime";

export async function getOfficialMilanNews(): Promise<OfficialMilanNews[]> {
  try {
    const res = await fetch(OFFICIAL_NEWS_URL, {
      next: { revalidate: 1800 },
    });

    const html = await res.text();

    const links = Array.from(
      html.matchAll(/href="([^"]*\/it\/news\/articoli\/[^"]+)"/g)
    );

    const news = links
      .map((match) => {
        const url = match[1].startsWith("http")
          ? match[1]
          : `https://www.acmilan.com${match[1]}`;

        const slug = url.split("/").pop() || "notizia-milan";

        const title = slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return {
          title,
          url,
          source: "AC Milan",
          image: "",
          date: "",
        };
      })
      .filter(
        (item, index, self) =>
          item.title.toLowerCase() !== "ultime" &&
          index === self.findIndex((n) => n.url === item.url)
      )
      .slice(0, 6);

    return news;
  } catch (error) {
    console.error("Errore news ufficiali AC Milan:", error);
    return [];
  }
}