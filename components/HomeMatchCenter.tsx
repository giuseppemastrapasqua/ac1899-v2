import Link from "next/link";
import { getMilanFixtures, getSerieAStandings } from "../lib/api-football";

type Standing = {
  rank: number;
  points: number;
  team: { id: number; name: string };
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
};

type Fixture = {
  fixture: { date: string; status: { short: string } };
  league: { id: number; season: number };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
};

const calendar = "https://www.acmilan.com/it/stagione/2026/calendario/serie-a";
const officialTable = "https://www.acmilan.com/en/season/2026/standings/serie-a";
const snapshot = [
  { rank: 1, name: "Lazio", points: 29 },
  { rank: 2, name: "Inter", points: 28 },
  { rank: 3, name: "Roma", points: 27 },
  { rank: 4, name: "AC Milan", points: 24 },
  { rank: 5, name: "Como", points: 23 },
  { rank: 6, name: "Frosinone", points: 20 },
];

const officialFixtures: Fixture[] = [
  { fixture: { date: "2026-11-08T15:00:00+01:00", status: { short: "FT" } }, league: { id: 135, season: 2026 }, teams: { home: { name: "Genoa" }, away: { name: "AC Milan" } }, goals: { home: 1, away: 2 } },
  { fixture: { date: "2026-11-22T18:00:00+01:00", status: { short: "NS" } }, league: { id: 135, season: 2026 }, teams: { home: { name: "AC Milan" }, away: { name: "Frosinone" } }, goals: { home: null, away: null } },
  { fixture: { date: "2026-11-30T20:45:00+01:00", status: { short: "NS" } }, league: { id: 135, season: 2026 }, teams: { home: { name: "Cagliari" }, away: { name: "AC Milan" } }, goals: { home: null, away: null } },
];

const scorers = [
  { rank: 1, name: "Adrien Rabiot", goals: 5 },
  { rank: 1, name: "Alphadjo Cissè", goals: 5 },
  { rank: 3, name: "Christian Pulisic", goals: 4 },
  { rank: 3, name: "Diego Moreira", goals: 4 },
  { rank: 5, name: "Gonçalo Ramos", goals: 2 },
];

const panel = "min-w-0 rounded-xl border border-gray-200 border-t-2 border-t-red-600 bg-white p-5 shadow-sm";
const caption = "mt-3 text-xs text-gray-400";

function fixtureDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Rome" }).format(new Date(date));
}

export default async function HomeMatchCenter() {
  const [tableResult, fixturesResult] = await Promise.allSettled([getSerieAStandings(), getMilanFixtures()]);
  const liveTable: Standing[] = tableResult.status === "fulfilled"
    ? tableResult.value?.response?.[0]?.league?.standings?.[0] ?? [] : [];
  const liveMilan = liveTable.find(row => row.team.id === 489 && row.all?.played >= 11 && row.all.goals);
  const rows = liveMilan ? liveTable
    .filter(row => row.rank <= 6 || row.team.id === 489)
    .map(row => ({ rank: row.rank, name: row.team.id === 489 ? "AC Milan" : row.team.name, points: row.points }))
    : snapshot;
  const stats = liveMilan?.all ?? { played: 11, win: 7, draw: 3, lose: 1, goals: { for: 23, against: 13 } };
  const liveFixtures: Fixture[] = fixturesResult.status === "fulfilled" && Array.isArray(fixturesResult.value?.response)
    ? fixturesResult.value.response.filter((match: Fixture) => match.league?.id === 135 && match.league.season === 2026) : [];
  const now = Date.now();
  const sorted = [...liveFixtures].sort((a, b) => Date.parse(a.fixture.date) - Date.parse(b.fixture.date));
  const last = sorted.findLast(match => ["FT", "AET", "PEN"].includes(match.fixture.status.short)
    && match.goals.home !== null && match.goals.away !== null && Date.parse(match.fixture.date) >= Date.parse(officialFixtures[0].fixture.date))
    ?? officialFixtures[0];
  const upcoming = sorted.filter(match => match.fixture.status.short === "NS" && Date.parse(match.fixture.date) > now);
  const next = upcoming.length ? upcoming.slice(0, 2) : officialFixtures.slice(1).filter(match => Date.parse(match.fixture.date) > now);
  const season = tableResult.status === "fulfilled" && liveMilan
    ? tableResult.value?.response?.[0]?.league?.season ?? 2026 : 2026;

  return (
    <section aria-labelledby="match-center-title">
      <h2 id="match-center-title" className="mb-4 border-b border-gray-200 pb-3 text-3xl">Match Center</h2>
      <div className="grid gap-4 lg:grid-cols-3">
      <div className={panel}>
        <h3 className="mb-2 text-xl">Risultati e calendario</h3>
        <p className="text-sm text-gray-400">Serie A {season ? season + "/" + String(season + 1).slice(-2) : ""}</p>
        <h3 className="mt-4 font-semibold">Ultimo risultato</h3>
        <p className="mt-1 text-lg font-bold">{last.teams.home.name} {last.goals.home}–{last.goals.away} {last.teams.away.name}</p>
        <p className="text-sm text-gray-400">{fixtureDate(last.fixture.date)}</p>
        <h3 className="mt-4 font-semibold">Prossime partite</h3>
        {next.length ? <ul className="mt-1 divide-y divide-white/10">
          {next.map(match => <li key={match.fixture.date} className="py-2">
            <strong>{match.teams.home.name} – {match.teams.away.name}</strong>
            <p className="text-sm text-gray-400">{fixtureDate(match.fixture.date)}</p>
          </li>)}
        </ul> : <p className="mt-1 text-sm text-gray-400">Date in attesa di aggiornamento.</p>}
        <a className="mt-3 inline-block" href={calendar}>Calendario ufficiale →</a>
      </div>

      <div className={panel}>
        <h3 className="mb-3 text-xl font-bold">Classifica Serie A</h3>
        <table className="w-full text-left text-sm">
          <thead><tr><th scope="col">Pos.</th><th scope="col">Squadra</th><th scope="col" className="text-right">Pt</th></tr></thead>
          <tbody>{rows.map(row => (
            <tr key={row.name} className={row.name === "AC Milan" ? "bg-red-950 font-bold" : "border-t border-white/10"}>
              <td className="py-2">{row.rank}</td><td>{row.name}</td><td className="text-right">{row.points}</td>
            </tr>
          ))}</tbody>
        </table>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {[["Partite", stats.played], ["Vinte", stats.win], ["Pareggi", stats.draw], ["Perse", stats.lose], ["Gol fatti", stats.goals.for], ["Gol subiti", stats.goals.against]].map(([label, value]) =>
            <div key={label} className="border border-white/10 p-2"><dt className="text-gray-400">{label}</dt><dd className="text-lg font-bold">{value}</dd></div>
          )}
        </dl>
        <p className={caption}>{liveMilan ? "Dati di campionato da API-Football" : "Dati verificati al 15 novembre 2026"}</p>
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
