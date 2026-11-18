import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import NewsAutoRefresh from "../../../components/NewsAutoRefresh";
import { getLocalNews, localNewsHref } from "../../../lib/local-news";

const topics: Record<string, { title: string; description: string; matches: RegExp }> = {
  maignan: { title: "Maignan", description: "Nazionali, disponibilità e futuro: gli aggiornamenti sul portiere del Milan, con la data di ogni notizia.", matches: /maignan/i },
  pulisic: { title: "Pulisic", description: "Il percorso di Christian Pulisic tra Milan e Stati Uniti, attraverso gli articoli pubblicati.", matches: /pulisic/i },
  ramos: { title: "Gonçalo Ramos", description: "Le notizie sull’attaccante tra Milan, Portogallo e rendimento in campo.", matches: /ramos/i },
  mercato: { title: "Mercato Milan", description: "Trattative, rinnovi e scenari: la cronologia degli articoli. Le indiscrezioni restano tali finché non arriva una conferma ufficiale.", matches: /mercato|endrick|tresoldi|prestito|trasferiment|rinnovo/i },
};
const readNews = cache(getLocalNews);
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const dossier = topics[topic];
  return dossier ? { title: `Dossier ${dossier.title}`, description: dossier.description, alternates: { canonical: `/dossier/${topic}` } } : { robots: { index: false } };
}
export default async function DossierPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const dossier = topics[topic];
  if (!dossier) notFound();
  const stories = (await readNews()).filter(story => dossier.matches.test(story.title + " " + story.category)).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return <main className="ac1899-home min-h-screen"><NewsAutoRefresh /><div className="home-section-inner max-w-4xl">
    <header className="border-b-4 border-red-700 pb-5"><Link href="/">Home AC1899</Link><p className="mt-6 text-sm font-bold uppercase tracking-wider text-red-700">Dossier · archivio in ordine cronologico</p><h1 className="mt-2 text-5xl">{dossier.title}</h1><p className="mt-3 max-w-2xl text-gray-600">{dossier.description}</p></header>
    <p className="text-sm text-gray-600">{stories.length} articoli pubblicati. L’archivio conserva i passaggi precedenti: per la situazione più recente parti dal primo aggiornamento.</p>
    <ol className="space-y-5 border-l-2 border-red-100 pl-5">{stories.map(story => <li key={story.id} className="ac1899-box p-5"><p className="text-sm text-gray-600"><time dateTime={story.date}>{new Date(story.date).toLocaleString("it-IT", { timeZone: "Europe/Rome", day: "numeric", month: "long", year: "numeric", ...(/T\d{2}:\d{2}/.test(story.date) ? { hour: "2-digit", minute: "2-digit" } : {}) })}</time> · {story.category}</p><h2 className="my-2 text-3xl"><Link href={localNewsHref(story.id)}>{story.title}</Link></h2><p className="text-base text-gray-700">{story.body[0]}</p><p className="mt-3 text-sm text-gray-600">Fonte: {story.source}</p><Link href={localNewsHref(story.id)} className="mt-3 inline-block text-sm font-bold">Leggi l’articolo completo</Link></li>)}</ol>
    {!stories.length && <p>Non sono ancora presenti articoli su questo argomento. <Link href="/news">Consulta tutte le notizie.</Link></p>}
    <nav aria-label="Altri dossier" className="flex flex-wrap gap-3">{Object.entries(topics).filter(([slug]) => slug !== topic).map(([slug, item]) => <Link key={slug} href={`/dossier/${slug}`} className="rounded border border-gray-200 px-4 py-2 font-semibold">{item.title}</Link>)}</nav>
  </div></main>;
}
