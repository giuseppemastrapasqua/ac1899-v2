import Link from "next/link";
import EuropaLeagueBox from "../components/EuropaLeagueBox";
import HomeFeaturedNews from "../components/HomeFeaturedNews";
import HomeMatchCenter from "../components/HomeMatchCenter";
import MonthlyMvp from "../components/MonthlyMvp";
import UpcomingMatchCards from "../components/UpcomingMatchCards";
import NewsletterBox from "../components/NewsletterBox";

const sections = [
  { title: "AI Room", description: "Analisi delle partite e approfondimenti.", href: "/analisi", id: "ai-room" },
  { title: "Wonderkids", description: "Profili e classifiche dei giovani talenti.", href: "/wonderkids" },
  { title: "Creator Room", description: "Video e contenuti della redazione.", href: "/creator-video" },
];

export default function Home() {
  return (
    <main className="ac1899-home min-h-screen">
      <HomeFeaturedNews />

      <div className="mx-auto max-w-[1448px] space-y-12 px-4 pb-12 sm:px-6">
        <section aria-labelledby="news-destinations" className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <h2 id="news-destinations" className="text-2xl">Notizie AC1899</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link href="/news">Tutte le notizie →</Link>
            <Link href="/news#rassegna-stampa">Rassegna stampa →</Link>
          </div>
        </section>

        <UpcomingMatchCards today={new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" }).format(new Date())} />
        <HomeMatchCenter />
        <MonthlyMvp />
        <EuropaLeagueBox />

        <section aria-labelledby="explore-title">
          <h2 id="explore-title" className="mb-4 border-b border-gray-200 pb-3 text-3xl">Approfondimenti</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {sections.map(section => (
              <Link key={section.href} id={section.id} href={section.href}
                className="group rounded-xl border border-gray-200 px-5 py-4 transition-colors hover:border-red-300 hover:bg-red-50">
                <h3 className="mb-1 text-xl">{section.title} <span aria-hidden="true">→</span></h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <NewsletterBox />
      </div>
    </main>
  );
}
