import NewsCover from "./NewsCover";
import { getOfficialMilanCover, getOfficialMilanNews, officialNewsUrl } from "../lib/acmilan-news";

export default async function OfficialMilanNews({ limit = 4 }: { limit?: number }) {
  const stories = (await getOfficialMilanNews()).slice(0, limit);

  const covers = await Promise.all(stories.map(story => getOfficialMilanCover(story.url)));

  return (
    <section aria-label="Ultime notizie ufficiali">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
        {stories.map((story, index) => (
          <article key={story.url} className="ac1899-box ac1899-box-dark p-4">
            <NewsCover image={covers[index]} title={story.title} category={story.category} />
            <p className="m-0 text-xs font-bold uppercase text-red-400">
              AC Milan · {story.category}
            </p>
            <h3 className="my-2 text-base font-bold">
              <a href={story.url} className="text-white hover:underline">{story.title}</a>
            </h3>
            <time dateTime={story.date} className="text-sm text-gray-400">
              {new Date(story.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}
            </time>
          </article>
        ))}
      </div>
      <a href={officialNewsUrl} className="mt-4 inline-block text-sm font-bold">
        Tutte le notizie sul sito ufficiale →
      </a>
    </section>
  );
}
