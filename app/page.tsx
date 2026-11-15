import Link from "next/link";
import NewsList from "../components/NewsList";
import OfficialMilanNews from "../components/OfficialMilanNews";
import MilanHubAI from "../components/MilanHubAI";
import NewsletterBox from "../components/NewsletterBox";
import EuropaLeagueBox from "../components/EuropaLeagueBox";
import CreatorVideoBox from "../components/CreatorVideoBox";
import WonderkidHomeBox from "../components/WonderkidHomeBox";
import WonderkidKingBox from "../components/WonderkidKingBox";
import HomeMatchCenter from "../components/HomeMatchCenter";
import HomeFeaturedNews from "../components/HomeFeaturedNews";

export default function Home() {
  return (
    <main className="ac1899-home" style={page}>
      <HomeFeaturedNews />

      <section className="homepage-layout" style={featuredLayout}>
        <div style={mainColumn}>

          <section style={premiumCard}>
            <h2 style={{ marginTop: 0 }}>Ultime notizie ufficiali</h2>
            <OfficialMilanNews />
            <p className="mt-4"><Link href="/news#rassegna-stampa">Rassegna stampa italiana ed estera →</Link></p>
          </section>

          <NewsList />

          <section id="ai-room" aria-labelledby="ai-room-title" style={premiumCard}>
            <span style={sectionBadge}>Approfondimenti</span>
            <h2 id="ai-room-title" className="my-2 text-3xl font-bold">AI Room</h2>
            <p className="text-gray-400">Analisi, confronti e approfondimenti sul Milan.</p>
            <MilanHubAI />
          </section>

          <EuropaLeagueBox />
          <WonderkidHomeBox />
          <CreatorVideoBox />
        </div>

        <aside style={sideColumn}>
          <HomeMatchCenter />
          <NewsletterBox />
          <WonderkidKingBox />
        </aside>
      </section>
    </main>
  );
}

const page = {
  background:
    "radial-gradient(circle at top left,#7f1d1d 0,#030712 32%,#030712 100%)",
  minHeight: "100vh",
  color: "var(--home-text, #f9fafb)",
  fontFamily: "Arial",
};

const featuredLayout = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 24px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) 420px",
  gap: 32,
  alignItems: "start",
};

const mainColumn = {
  minWidth: 0,
};

const sideColumn = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 20,
};

const sectionBadge = {
  color: "#e30613",
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 1,
};

const premiumCard = {
  background: "var(--home-surface, #111827)",
  padding: 28,
  borderRadius: 0,
  marginTop: 32,
};
