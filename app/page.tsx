import Link from "next/link";
import NewsList from "../components/NewsList";
import OfficialMilanNews from "../components/OfficialMilanNews";
import NextMatchCountdown from "../components/NextMatchCountdown";
import MilanHubAI from "../components/MilanHubAI";
import { supabase } from "../lib/supabase";
import NewsletterBox from "../components/NewsletterBox";
import EuropaLeagueBox from "../components/EuropaLeagueBox";
import CreatorVideoBox from "../components/CreatorVideoBox";
import WonderkidsHomeBox from "../components/WonderkidsHomeBox";
import type { CSSProperties } from "react";
import {
  getSerieAStandings,
  getMilanFixtures,
  getNextMilanFixture,
} from "../lib/api-football";
import HomeFeaturedNews from "../components/HomeFeaturedNews";

export default async function Home() {
  const standingsData = await getSerieAStandings();
  const fixturesData = await getMilanFixtures();
  const nextFixtureData = await getNextMilanFixture();
  

  const { data: players } = await supabase
    .from("players")
    .select("*")
    .order("goals", { ascending: false });

  const { data: transfers } = await supabase
    .from("transfers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const standings =
    standingsData?.response?.[0]?.league?.standings?.[0] || [];

  const fixtures = fixturesData?.response || [];

  const nextMatch =
  nextFixtureData?.response?.[0] || {
    teams: {
      home: {
        name: "Torino",
        logo: "https://media.api-sports.io/football/teams/503.png",
      },
      away: {
        name: "AC Milan",
        logo: "https://media.api-sports.io/football/teams/489.png",
      },
    },
    league: {
      name: "Serie A",
    },
    fixture: {
      date: "2026-08-23T20:45:00",
    },
  };

  const finishedFixtures = fixtures.filter(
    (item: any) => item.fixture?.status?.short === "FT"
  );

  const lastMatch =
    finishedFixtures.length > 0
      ? [...finishedFixtures].sort(
          (a: any, b: any) =>
            new Date(b.fixture.date).getTime() -
            new Date(a.fixture.date).getTime()
        )[0]
      : null;

  const milan = standings.find((team: any) => team.team.name === "AC Milan");

  const topScorer = players?.[0];

  const topAssistman = [...(players || [])].sort(
    (a, b) => (b.assists || 0) - (a.assists || 0)
  )[0];

    return (
    <main style={page}>
      <HomeFeaturedNews />
      
      <section style={featuredLayout}>
        <div style={mainColumn}>
          <div style={sectionHeader}>
            <span
  style={{
    ...sectionBadge,
    color: "#e30613",
  }}
>
  📰 REDAZIONE
</span>
            <h2 style={sectionTitle}></h2>
          </div>

          <NewsList />

          <div style={premiumCard}>
  <div>
   <span
  style={{
    ...sectionBadge,
    color: "#e30613",
  }}
>
  🤖 AI ROOM
</span>
    <h2
  style={{
    marginTop: 10,
    fontSize: 32,
    marginBottom: 10,
  }}
>

</h2>

  <p
  style={{
    ...mutedText,
    fontSize: 20,
    lineHeight: 1.5,
    maxWidth: 700,
  }}
>
    </p>
  </div>

  <MilanHubAI />
</div>

          <div style={premiumCard}>
  <span
  style={{
    ...sectionBadge,
    color: "#e30613",
  }}
>
  🗞️ FONTI
</span>
  <h2 style={{ marginTop: 10 }}>News ufficiali e rassegna</h2>
  <OfficialMilanNews />
</div>
<section style={quickGrid}>
  <QuickBox
    icon="⚽"
    title="Top marcatore"
    value={
      topScorer
        ? `${topScorer.name} ${topScorer.surname}`
        : "In Aggiornamento"
    }
    detail={topScorer ? `${topScorer.goals || 0} gol` : "-"}
    href={topScorer ? `/giocatore/${topScorer.id}` : "/rosa"}
  />

  <QuickBox
    icon="🎯"
    title="Top assistman"
    value={
      topAssistman
        ? `${topAssistman.name} ${topAssistman.surname}`
        : "In Aggiornamento"
    }
    detail={topAssistman ? `${topAssistman.assists || 0} assist` : "-"}
    href={topAssistman ? `/giocatore/${topAssistman.id}` : "/rosa"}
  />

  <QuickBox
    icon="🏆"
    title="Posizione Milan"
    value={milan?.rank ? `${milan.rank}° posto` : "-"}
    detail={`${milan?.points || 0} punti`}
    href="/statistiche"
  />
  </section>
<EuropaLeagueBox />
<CreatorVideoBox />

<WonderkidsHomeBox />
                 </div>

        <aside style={sideColumn}>
  <div style={matchCard}>
    <span style={sectionBadge}>🏟️ ULTIMA PARTITA</span>

    {lastMatch ? (
      <>
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "110px auto 110px",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={lastMatch.teams.home.logo} alt={lastMatch.teams.home.name} style={teamLogo} />
            <strong style={teamName}>{lastMatch.teams.home.name}</strong>
          </div>

          <div style={scoreBox}>
            {lastMatch.goals.home} - {lastMatch.goals.away}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={lastMatch.teams.away.logo} alt={lastMatch.teams.away.name} style={teamLogo} />
            <strong style={teamName}>{lastMatch.teams.away.name}</strong>
          </div>
        </div>

        <p style={matchInfo}>
          {lastMatch.league.name} ·{" "}
          {new Date(lastMatch.fixture.date).toLocaleDateString("it-IT")}
        </p>
      </>
    ) : (
      <p style={mutedText}>Nessuna partita trovata.</p>
    )}
  </div>

  <div style={sideCard}>
    <span style={sectionBadge}>⌛ MATCH CENTER</span>
    <h2 style={sideTitle}>Prossima partita</h2>

    {nextMatch ? (
  <NextMatchCountdown
    homeTeam={nextMatch.teams.home.name}
    awayTeam={nextMatch.teams.away.name}
    homeLogo={nextMatch.teams.home.logo}
    awayLogo={nextMatch.teams.away.logo}
    competition={nextMatch.league.name}
    matchDate={nextMatch.fixture.date}
  />
) : (
  <p style={mutedText}>Nessuna prossima partita trovata.</p>
)}
  </div>

  <div style={sideCard}>
    <span style={sectionBadge}>🏆 SERIE A</span>
    <h2 style={sideTitle}>Classifica</h2>

    <ol style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
      {standings.map((team: any) => {
        const isMilan = team.team.name === "AC Milan";

        return (
          <li
            key={team.team.id}
            style={{
              ...standingRow,
              background: isMilan
                ? "linear-gradient(90deg,#7f1d1d,#111827)"
                : "rgba(255,255,255,0.04)",
              color: isMilan ? "white" : "#e5e7eb",
            }}
          >
            <span>{team.rank}</span>
            <span>{team.team.name}</span>
            <strong>{team.points}</strong>
          </li>
        );
      })}
    </ol>

    <Link href="/statistiche" style={redLink}>
      Tutte le statistiche →
    </Link>
   <div style={sideCard}>
  <span
    style={{
      ...sectionBadge,
      color: "#e30613",
    }}
  >
    ⭐ PLAYER OF THE MONTH
  </span>

  <h2 style={sideTitle}>Giocatore del mese</h2>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 12,
    }}
  >
    <img
      src="/players/tomori.jpg"
      alt="Tomori"
      style={{
        width: 70,
        height: 70,
        objectFit: "cover",
        borderRadius: 0,
      }}
    />

    <div>
      <strong
        style={{
          display: "block",
          fontSize: 20,
          marginBottom: 4,
        }}
      >
        Fikayo Tomori
      </strong>

      <p
        style={{
          margin: 0,
          color: "#9ca3af",
          fontSize: 14,
        }}
      >
        Leadership, continuità e solidità difensiva.
      </p>
    </div>
  </div>

  <Link href="/rosa" style={redLink}>
    Scopri la rosa →
  </Link>
</div>
  </div>
  <NewsletterBox />
  </aside>

  </section>     

   
    </main>
  );
}

function QuickBox({
  icon,
  title,
  value,
  detail,
  href,
}: {
  icon: string;
  title: string;
  value: string;
  detail: string;
  href: string;
}) {
  return (
    <Link href={href} style={quickCard}>
      <div style={quickIcon}>{icon}</div>
      <p style={quickTitle}>{title}</p>
      <h2 style={quickValue}>{value}</h2>
      <p style={quickDetail}>{detail}</p>
    </Link>
  );
}

const page = {
  background:
    "radial-gradient(circle at top left,#7f1d1d 0,#030712 32%,#030712 100%)",
  minHeight: "100vh",
  color: "#f9fafb",
  fontFamily: "Arial",
};

const hero = {
  padding: "20px 24px 8Spx",
};

const heroOverlay = {
  maxWidth: 1400,
  margin: "0 auto",
  minHeight: 140,
  borderRadius: 0,
  padding: "22px 32px",
  background:
    "linear-gradient(135deg,rgba(17,24,39,.94),rgba(127,29,29,.82)), radial-gradient(circle at top right,rgba(248,113,113,.35),transparent 35%)",
  border: "1px solid rgba(255,255,255,.12)",
  boxShadow: "0 30px 80px rgba(0,0,0,.45)",
};

const eyebrow = {
  color: "#fca5a5",
  fontWeight: "bold",
  letterSpacing: 2,
  fontSize: 12,
  marginBottom: 10,
};

const heroTitle = {
  maxWidth: 760,
  fontSize: 30,
  lineHeight: 1.15,
  margin: "0 0 10px",
};

const heroText = {
  maxWidth: 760,
  fontSize: 20,
  lineHeight: 1.6,
  color: "#e5e7eb",
};

const heroActions = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  alignItems: "center",
};

const primaryButton = {
  background: "#ef4444",
  color: "white",
  padding: "10px 18px",
  borderRadius: 0,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 16,
};

const secondaryButton = {
  background: "rgba(255,255,255,0.10)",
  color: "white",
  padding: "10px 18px",
  borderRadius: 0,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 16,
  border: "1px solid rgba(255,255,255,0.15)",
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 18,
  marginTop: 24,
  marginBottom: 24,
};

const quickCard: CSSProperties = {
  background: "rgba(17,24,39,.9)",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 20,
  textDecoration: "none",
  color: "white",
};

const quickIcon = {
  fontSize: 28,
  marginBottom: 10,
};

const quickTitle = {
  margin: "0 0 10px",
  color: "#f9fafb",
  fontWeight: 800,
  fontSize: 20,
  lineHeight: 1.2,
};

const quickValue = {
  margin: 0,
  color: "#9ca3af",
  fontSize: 15,
  lineHeight: 1.55,
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

const sectionHeader = {
  marginBottom: 16,
};

const sectionBadge = {
  color: "#e30613",
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 1,
};

const exploreLink = {
  display: "block",
  background: "rgba(255,255,255,0.06)",
  color: "#f9fafb",
  padding: "12px 14px",
  textDecoration: "none",
  fontWeight: "bold",
  borderLeft: "4px solid #dc2626",
  borderRadius: 0,
  transition: "all .2s ease",
};

const sectionBadgeLight = {
  color: "#fecaca",
  fontWeight: "bold",
  fontSize: 13,
  letterSpacing: 1,
};

const sectionTitle = {
  fontSize: 34,
  margin: "8px 0 0",
};

const premiumCard = {
  background: "#111827",
  padding: 28,
  borderRadius: 0,
  marginTop: 32,
};

const sideCard = {
  background: "#111827",
  color: "#f9fafb",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 18,
  borderRadius: 0,
  boxShadow: "0 16px 38px rgba(0,0,0,.3)",
};

const matchCard = {
  background: "linear-gradient(135deg,#991b1b,#111827)",
  color: "#f9fafb",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 18,
  borderRadius: 0,
  boxShadow: "0 20px 50px rgba(0,0,0,.35)",
};

const scoreBox = {
  background: "#e30613",
  color: "white",
  padding: "8px 12px",
  fontSize: 24,
  fontWeight: 900,
  minWidth: 86,
  textAlign: "center" as const,
};

const transferRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  borderBottom: "1px solid rgba(255,255,255,.08)",
  paddingBottom: 12,
  marginBottom: 12,
};

const standingRow = {
  display: "grid",
  gridTemplateColumns: "26px 1fr auto",
  alignItems: "center",
  gap: 6,
  padding: "5px 8px",
  marginBottom: 4,
  fontSize: 13,
};

const mutedText = {
  color: "#9ca3af",
  marginTop: 0,
};

const redLink = {
  display: "inline-block",
  marginTop: 12,
  color: "#f87171",
  fontWeight: "bold",
  textDecoration: "none",
};

const teamLogo = {
  width: 44,
  height: 44,
  objectFit: "contain" as const,
  marginBottom: 6,
};

const teamName = {
  fontSize: 13,
  lineHeight: 1.2,
  textAlign: "center" as const,
};

const matchInfo = {
  marginTop: 16,
  color: "#d1d5db",
  textAlign: "center" as const,
  fontWeight: "bold",
  fontSize: 13,
};

const sideTitle = {
  marginTop: 8,
  marginBottom: 12,
  fontSize: 22,
};
const quickDetail = {
  marginTop: 14,
  color: "#e30613",
  fontSize: 13,
  fontWeight: 800,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
};