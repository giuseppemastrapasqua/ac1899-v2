import NewsCover from "./NewsCover";
import { getOfficialMilanCover } from "../lib/acmilan-news";
import { getLocalNews, localNewsHref } from "../lib/local-news";

export default async function PressNews({ limit = 25 }: { limit?: number }) {
  const press = await getLocalNews();
  const groups = await Promise.all((["Italia", "Estero"] as const).map(async title => ({
    title,
    stories: await Promise.all(press.filter(story => story.edition === title).slice(0, limit).map(async story => ({
      ...story, image: story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined,
    }))),
  })));
  return (
    <section id="rassegna-stampa" aria-labelledby="press-title" className="my-6">
      <h2 id="press-title" className="mb-4 text-2xl font-bold">Rassegna stampa</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        {groups.map(({ title, stories }) => (
          <section key={title} className="ac1899-box ac1899-box-dark p-4">
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <ul className="divide-y divide-white/10">
              {stories.map(story => (
                <li key={story.id} className="py-3">
                  <NewsCover image={story.image} title={story.title} category={story.category} />
                  <p className="mt-2 text-xs text-gray-400">
                    {story.source} · <time dateTime={story.date}>
                      {new Date(story.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}
                    </time>
                  </p>
                  <a href={localNewsHref(story.id)} className="font-semibold text-white hover:underline">{story.title}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
