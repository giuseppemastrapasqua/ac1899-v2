import MatchCard, { type MatchTeam } from "./MatchCard";
import StandingsTable from "./StandingsTable";
import { serieA, type StandingRow } from "../lib/home-standings";
import Link from "next/link";
import { getMilanFixtures, getSerieAStandings } from "../lib/api-football";

type Standing = {
  rank: number;
  points: number;
  team: { id: number; name: string };
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
};

type Fixture = {
  fixture: { date: string; venue?: { name?: string }; status: { short: string } };
  league: { id: number; season: number };
  teams: { home: MatchTeam; away: MatchTeam };
  goals: { home: number | null; away: number | null };
};

const calendar = "https://www.acmilan.com/it/stagione/2026/calendario/serie-a";
const officialTable = "https://www.acmilan.com/en/season/2026/standings/serie-a";
const officialFixtures: Fixture[] = [
  { fixture: { date: "2026-11-08T15:00:00+01:00", venue: { name: "Stadio Luigi Ferraris" }, status: { short: "FT" } }, league: { id: 135, season: 2026 }, teams: { home: { name: "Genoa", id: 495 }, away: { name: "AC Milan", id: 489 } }, goals: { home: 1, away: 2 } },
];

const scorers = [
  { rank: 1, name: "Adrien Rabiot", goals: 5 },
  { rank: 1, name: "Alphadjo Cissè", goals: 5 },
  { rank: 3, name: "Christian Pulisic", goals: 4 },
  { rank: 3, name: "Diego Moreira", goals: 4 },
  { rank: 5, name: "Gonçalo Ramos", goals: 2 },
];

const panel = "ac1899-box min-w-0 p-5";
const caption = "mt-3 text-xs text-gray-400";

function fixtureDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Rome" }).format(new Date(date));
}

export default async function HomeMatchCenter() {
  const [tableResult, fixturesResult] = await Promise.allSettled([getSerieAStandings(), getMilanFixtures()]);
  const liveTable: Standing[] = tableResult.status === "fulfilled"
    ? tableResult.value?.response?.[0]?.league?.standings?.[0] ?? [] : [];
  const liveMilan = liveTable.find(row => row.team.id === 489 && row.all?.played >= 11 && row.all.goals);
  const rows: StandingRow[] = liveMilan && liveTable.length === 20 && liveTable.every(row => row.all?.goals)
    ? liveTable.map(row => [row.rank, row.team.id === 489 ? "AC Milan" : row.team.name, row.points,
        row.all.played, row.all.win, row.all.draw, row.all.lose, row.all.goals.for, row.all.goals.against])
    : serieA;
  const stats = (rows !== serieA ? liveMilan?.all : undefined) ?? { played: 11, win: 7, draw: 3, lose: 1, goals: { for: 23, against: 13 } };
  const liveFixtures: Fixture[] = fixturesResult.status === "fulfilled" && Array.isArray(fixturesResult.value?.response)
    ? fixturesResult.value.response.filter((match: Fixture) => match.league?.id === 135 && match.league.season === 2026) : [];
  const sorted = [...liveFixtures].sort((a, b) => Date.parse(a.fixture.date) - Date.parse(b.fixture.date));
  const last = sorted.findLast(match => ["FT", "AET", "PEN"].includes(match.fixture.status.short)
    && match.goals.home !== null && match.goals.away !== null && Date.parse(match.fixture.date) >= Date.parse(officialFixtures[0].fixture.date))
    ?? officialFixtures[0];
  const season = tableResult.status === "fulfilled" && liveMilan
    ? tableResult.value?.response?.[0]?.league?.season ?? 2026 : 2026;

  return (
    <section aria-labelledby="match-center-title">
      <h2 id="match-center-title" className="mb-4 border-b border-gray-200 pb-3 text-3xl">Match Center</h2>
      <div className="grid gap-4 lg:grid-cols-3">
      <div className={panel}>
        <h3 className="mb-2 text-xl">Risultati</h3>
        <p className="text-sm text-gray-400">Serie A {season ? season + "/" + String(season + 1).slice(-2) : ""}</p>
        <h3 className="mt-4 font-semibold">Ultimo risultato</h3>
        <div className="mt-2">
          <MatchCard home={last.teams.home} away={last.teams.away} date={last.fixture.date}
            venue={last.fixture.venue?.name} competition="Serie A" league={135}
            value={last.goals.home + "–" + last.goals.away} status="FINITA" note={fixtureDate(last.fixture.date)} />
        </div>
        <a className="mt-3 inline-block" href={calendar}>Calendario ufficiale →</a>
      </div>

      <div className={panel}>
        <h3 className="mb-3 text-xl font-bold">Classifica Serie A · 20 squadre</h3>
        <StandingsTable rows={rows} title="Classifica completa Serie A" />
        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {[["Partite", stats.played], ["Vinte", stats.win], ["Pareggi", stats.draw], ["Perse", stats.lose], ["Gol fatti", stats.goals.for], ["Gol subiti", stats.goals.against]].map(([label, value]) =>
            <div key={label} className="border border-white/10 p-2"><dt className="text-gray-400">{label}</dt><dd className="text-lg font-bold">{value}</dd></div>
          )}
        </dl>
        <p className={caption}>{rows !== serieA ? "Dati di campionato da API-Football" : "Dati verificati al 15 novembre 2026"}</p>
        <a className="mt-2 inline-block" href={officialTable}>Classifica completa →</a>
      </div>

      <div className={panel}>
        <h3 className="mb-1 text-xl font-bold">Classifica marcatori</h3>
        <p className="mb-3 text-sm text-gray-600">AC Milan · Serie A 2026/27</p>
        <table className="w-full text-left text-sm">
          <thead>
            <tr><th scope="col">Pos.</th><th scope="col">Giocatore</th><th scope="col" className="text-right">Gol</th></tr>
          </thead>
          <tbody>
            {scorers.map(player => (
              <tr key={player.name} className={player.rank === 1 ? "border-t border-gray-200 bg-red-50 font-semibold" : "border-t border-gray-200"}>
                <td className="py-2">{player.rank}</td>
                <td>{player.name}</td>
                <td className="text-right font-bold tabular-nums">{player.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 border-t border-gray-200 pt-3 text-sm"><strong>Più assist:</strong> Adrien Rabiot · 4</p>
        <p className={caption}>Statistiche giocatori verificate al 15 novembre 2026 · <a href="https://www.fotmob.com/it/leagues/55/stats/season/36072/players/goals/team/8564/milan">FotMob</a></p>
        <Link className="mt-2 inline-block" href="/rosa">Scopri la rosa →</Link>
      </div>
      </div>
    </section>
  );
}
