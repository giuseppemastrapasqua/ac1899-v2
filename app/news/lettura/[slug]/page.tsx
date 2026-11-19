import { articleMetadata } from "../../../../lib/article-seo";
import ArticleShare from "../../../../components/ArticleShare";
import ArticleDiscussion from "../../../../components/ArticleDiscussion";
import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { siteUrl } from "../../../../lib/site-seo";
import { notFound } from "next/navigation";
import NewsCover from "../../../../components/NewsCover";
import { getOfficialMilanCover } from "../../../../lib/acmilan-news";
import { getLocalNews, localNewsHref } from "../../../../lib/local-news";

const readNews = cache(getLocalNews);

const findStory = cache(async (slug: string) => {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return undefined;
  return (await readNews()).find(story => story.id === slug);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await findStory(slug);
  if (!story) return { robots: { index: false } };
  const path = "/news/lettura/" + slug;
  const description = story.body[0]?.slice(0, 160);
  const image = story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined;
  return articleMetadata({ title: story.title, description: description || story.title, path, date: story.date, image });
}

export default async function LocalNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await findStory(slug);
  if (!story) notFound();
  const image = story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined;

  const terms = story.title.toLocaleLowerCase("it").match(/[\p{L}]{5,}/gu) ?? [];
  const related = (await readNews()).filter(item => item.id !== story.id).map(item => ({ item, score: terms.filter(term => item.title.toLocaleLowerCase("it").includes(term)).length * 2 + (item.category === story.category ? 1 : 0) })).filter(entry => entry.score > 0).sort((a, b) => b.score - a.score || Date.parse(b.item.date) - Date.parse(a.item.date)).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org", "@type": "NewsArticle",
    headline: story.title, datePublished: story.date, inLanguage: "it",
    mainEntityOfPage: siteUrl + "/news/lettura/" + slug,
    publisher: { "@type": "Organization", name: "AC1899", url: siteUrl },
    ...(image ? { image: [image] } : {}),
  };

  return (
    <main className="ac1899-home min-h-screen px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <article className="ac1899-box mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
        <header>
          <p className="text-sm font-semibold text-gray-600">{story.category}</p>
          <h1 className="my-2 text-3xl sm:text-4xl">{story.title}</h1>
          <time dateTime={story.date} className="text-sm text-gray-600">
            {new Date(story.date).toLocaleDateString("it-IT", { dateStyle: "long", timeZone: "Europe/Rome" })}
          </time>
        </header>
        <NewsCover image={image} title={story.title} category={story.category} />
        <ArticleShare title={story.title} url={siteUrl + localNewsHref(story.id)} />
        <div className="space-y-3 text-base leading-relaxed">
          {story.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <footer className="border-t border-gray-200 pt-3 text-sm text-gray-600">Fonte: {story.source}</footer>
      </article>
      <ArticleDiscussion articleId={story.id} />
      {!!related.length && <section aria-labelledby="related-title" className="mx-auto mt-6 max-w-3xl"><h2 id="related-title" className="mb-4 text-3xl">Continua a leggere</h2><div className="grid gap-3 sm:grid-cols-3">{related.map(({ item }) => <Link key={item.id} href={localNewsHref(item.id)} className="ac1899-box p-4"><p className="mb-2 text-sm text-gray-600">{item.category}</p><h3 className="text-xl">{item.title}</h3><time dateTime={item.date} className="mt-2 block text-sm text-gray-600">{new Date(item.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}</time></Link>)}</div></section>}
    </main>
  );
}
