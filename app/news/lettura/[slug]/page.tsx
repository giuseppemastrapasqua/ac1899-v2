import { notFound } from "next/navigation";
import NewsCover from "../../../../components/NewsCover";
import { getOfficialMilanCover } from "../../../../lib/acmilan-news";
import { getLocalNews } from "../../../../lib/local-news";

export default async function LocalNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) notFound();
  const story = (await getLocalNews()).find(item => item.id === slug);
  if (!story) notFound();
  const image = story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined;

  return (
    <main className="ac1899-home min-h-screen px-4 py-6">
      <article className="ac1899-box mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
        <header>
          <p className="text-sm font-semibold text-gray-600">{story.category}</p>
          <h1 className="my-2 text-3xl sm:text-4xl">{story.title}</h1>
          <time dateTime={story.date} className="text-sm text-gray-600">
            {new Date(story.date).toLocaleDateString("it-IT", { dateStyle: "long", timeZone: "Europe/Rome" })}
          </time>
        </header>
        <NewsCover image={image} title={story.title} category={story.category} />
        <div className="space-y-3 text-base leading-relaxed">
          {story.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <footer className="border-t border-gray-200 pt-3 text-sm text-gray-600">Fonte: {story.source}</footer>
      </article>
    </main>
  );
}
