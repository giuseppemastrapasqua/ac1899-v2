import NewsCover from "./NewsCover";
import { getPressNews } from "../lib/press-news";

export default async function PressNews({ limit = 25 }: { limit?: number }) {
  const [italia, estero] = await Promise.all([getPressNews("italia"), getPressNews("estero")]);
  return (
    <section id="rassegna-stampa" aria-labelledby="press-title" className="my-6">
      <h2 id="press-title" className="mb-4 text-2xl font-bold">Rassegna stampa</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        {[{ title: "Italia", stories: italia }, { title: "Estero", stories: estero }].map(({ title, stories }) => (
          <section key={title} className="ac1899-box ac1899-box-dark p-4">
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <ul className="divide-y divide-white/10">
              {stories.slice(0, limit).map(story => (
                <li key={story.url} className="py-3">
                  <NewsCover />
                  <p className="text-xs text-gray-400">
                    {story.source} · <time dateTime={story.date}>
                      {new Date(story.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}
                    </time>
                  </p>
                  <a href={story.url} className="font-semibold text-white hover:underline">{story.title}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
