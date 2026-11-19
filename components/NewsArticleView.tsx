import Link from "next/link";
import ArticleDiscussion from "./ArticleDiscussion";
import ArticleShare from "./ArticleShare";
import NewsCover from "./NewsCover";
import { siteUrl } from "../lib/site-seo";

type NewsArticle = { id: number; title: string; subtitle: string; content: string; category: string; image_url: string; featured: boolean; created_at: string };
export default function NewsArticleView({ article, related = [], path = "/news/" + article.id, discussionId = "news-" + article.id }: { article: NewsArticle; related?: NewsArticle[]; path?: string; discussionId?: string }) {
  return <main className="ac1899-home min-h-screen px-4 py-6">
    <article className="ac1899-box mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <header>
        <p className="text-sm font-semibold text-gray-600">{article.category}</p>
        <h1 className="my-2 text-3xl sm:text-4xl">{article.title}</h1>
        {article.subtitle && <p className="text-base leading-relaxed text-gray-600">{article.subtitle}</p>}
        <time dateTime={article.created_at} className="text-sm text-gray-600">{article.created_at ? new Date(article.created_at).toLocaleDateString("it-IT", { dateStyle: "long", timeZone: "Europe/Rome" }) : ""}</time>
      </header>
      <NewsCover image={article.image_url || undefined} title={article.title} category={article.category} />
      <ArticleShare title={article.title} url={siteUrl + path} />
      <div className="space-y-3 text-base leading-relaxed">{article.content.split(/\n\s*\n|\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      <footer className="border-t border-gray-200 pt-3 text-sm text-gray-600">Fonte: Redazione AC1899</footer>
    </article>
    <ArticleDiscussion articleId={discussionId} />
    {!!related.length && <section aria-labelledby="related-title" className="mx-auto mt-6 max-w-3xl"><h2 id="related-title" className="mb-4 text-3xl">Continua a leggere</h2><div className="grid gap-3 sm:grid-cols-3">{related.map(item => <Link key={item.id} href={"/news/" + item.id} className="ac1899-box p-4"><p className="mb-2 text-sm text-gray-600">{item.category}</p><h3 className="text-xl">{item.title}</h3></Link>)}</div></section>}
  </main>;
}
