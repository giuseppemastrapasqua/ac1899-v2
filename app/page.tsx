import NewsAutoRefresh from "../components/NewsAutoRefresh";
import MatchThreeNumbers from "../components/MatchThreeNumbers";
import Link from "next/link";
import EuropaMatchAnalyst from "../components/EuropaMatchAnalyst";
import EuropaLeagueBox from "../components/EuropaLeagueBox";
import HomeFeaturedNews from "../components/HomeFeaturedNews";
import HomeMatchCenter from "../components/HomeMatchCenter";
import MatchAnalyst from "../components/MatchAnalyst";
import MonthlyMvp from "../components/MonthlyMvp";
import UpcomingMatchCards from "../components/UpcomingMatchCards";
import ItalianTeamOfWeek from "../components/ItalianTeamOfWeek";
import ItalianWonderkids from "../components/ItalianWonderkids";
import NewsletterBox from "../components/NewsletterBox";

const sections = [
  { title: "AI Room", description: "Analisi delle partite e approfondimenti.", href: "/campionato/analisi", id: "ai-room" },
  { title: "Creator Room", description: "Video e contenuti della redazione.", href: "/creator-video" },
];

export default function Home() {
  return (
    <main className="ac1899-home min-h-screen">
      <NewsAutoRefresh />
      <div className="home-section home-section-news"><HomeFeaturedNews /></div>

      <div className="home-section home-section-league">
        <div className="home-section-inner">
        <UpcomingMatchCards today={new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" }).format(new Date())} />
        <HomeMatchCenter />
        <MatchThreeNumbers />
        <MatchAnalyst />
        <MonthlyMvp />
        </div>
      </div>

      <div className="home-section home-section-europa">
        <div className="home-section-inner">
          <EuropaLeagueBox />
          <EuropaMatchAnalyst />
        </div>
      </div>

      <div className="home-section home-section-community">
        <div className="home-section-inner">

        <ItalianTeamOfWeek />
        <ItalianWonderkids compact />

        <section aria-labelledby="explore-title">
          <h2 id="explore-title" className="mb-4 border-b border-gray-200 pb-3 text-3xl">Approfondimenti</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {sections.map(section => (
              <Link key={section.href} id={section.id} href={section.href}
                className="ac1899-box group px-5 py-4 transition-colors hover:border-red-300 hover:bg-red-50">
                <h3 className="mb-1 text-xl">{section.title} <span aria-hidden="true">→</span></h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <NewsletterBox />
        </div>
      </div>
    </main>
  );
}
