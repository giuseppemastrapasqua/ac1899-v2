import type { Metadata } from "next";
import { cache } from "react";
import { siteUrl } from "../../../../lib/site-seo";
import { notFound } from "next/navigation";
import NewsCover from "../../../../components/NewsCover";
import { getOfficialMilanCover } from "../../../../lib/acmilan-news";
import { getLocalNews } from "../../../../lib/local-news";

const findStory = cache(async (slug: string) => {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return undefined;
  return (await getLocalNews()).find(item => item.id === slug);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await findStory(slug);
  if (!story) return { robots: { index: false } };
  const path = "/news/lettura/" + slug;
  const description = story.body[0]?.slice(0, 160);
  return {
    title: story.title, description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: story.title, description, url: path, publishedTime: story.date, siteName: "AC1899", locale: "it_IT" },
  };
}

export default async function LocalNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await findStory(slug);
  if (!story) notFound();
  const image = story.coverSource ? await getOfficialMilanCover(story.coverSource) : undefined;

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
        <div className="space-y-3 text-base leading-relaxed">
          {story.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <footer className="border-t border-gray-200 pt-3 text-sm text-gray-600">Fonte: {story.source}</footer>
      </article>
    </main>
  );
}
