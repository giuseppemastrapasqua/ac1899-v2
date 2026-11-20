import { sectionMetadata } from "../../lib/site-seo";

export const metadata = sectionMetadata("/campionato");

import LeagueExtraStats from "../../components/LeagueExtraStats";
import LeaguePlayerStats from "../../components/LeaguePlayerStats";
import LeagueCharts from "../../components/LeagueCharts";
import Link from "next/link";
import HomeMatchCenter from "../../components/HomeMatchCenter";
import UpcomingMatchCards from "../../components/UpcomingMatchCards";
import { serieATeamStats } from "../../lib/serie-a-team-stats";
import { serieA } from "../../lib/home-standings";

const totals = serieA.reduce((sum, row) => sum + row[7], 0);
export default async function CampionatoPage({ searchParams }: { searchParams: Promise<{ calciatori?: string }> }) {
  const requestedPage = Number((await searchParams).calciatori ?? 1);
  const playerPage = Number.isSafeInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 100 ? requestedPage : 1;
  return (
    <main className="ac1899-home min-h-screen home-section-league">
      <div className="home-section-inner">
        <header><h1 className="text-4xl">Campionato · Serie A 2026/27</h1><p className="mt-2 text-sm text-gray-600">Dati della classifica verificata dopo 11 giornate.</p></header>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Partite disputate", "110"], ["Gol totali", String(totals)], ["Gol per partita", (totals / 110).toLocaleString("it-IT", { maximumFractionDigits: 2 })]].map(([label, value]) =>
            <div key={label} className="ac1899-box p-4"><p className="text-sm text-gray-600">{label}</p><strong className="text-2xl">{value}</strong></div>)}
        </div>
        <UpcomingMatchCards league={135} today={new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" }).format(new Date())} />
        <HomeMatchCenter />
        <LeagueCharts />
        <section className="ac1899-box p-4" aria-labelledby="league-metrics">
          <h2 id="league-metrics" className="mb-3 text-2xl">Statistiche delle 20 squadre</h2>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Possesso, passaggi e duelli di Serie A">
            <table className="w-full min-w-max text-left text-sm tabular-nums">
              <thead className="bg-gray-100"><tr>{["Squadra", "Possesso %", "Passaggi", "Prec. passaggi %", "Duelli a terra vinti %", "Duelli aerei vinti %", "Angoli", "Punti/gara", "Gol/gara", "Subiti/gara", "Vittorie %"].map(label => <th scope="col" key={label} className="p-2">{label}</th>)}</tr></thead>
              <tbody>{serieATeamStats.map(([team, ...values]) => {
                const row = serieA.find(entry => entry[1] === (team === "Milan" ? "AC Milan" : team));
                const rates = row ? [row[2] / row[3], row[7] / row[3], row[8] / row[3], row[4] / row[3] * 100] : [];
                return <tr key={team} className={team === "Milan" ? "bg-red-50 font-bold" : "border-b border-gray-100"}>
                <th scope="row" className="p-2">{team}</th>{[...values, ...Array.from({ length: 4 }, (_, i) => rates[i])].map((value, index) => <td key={index} className="p-2">{value?.toLocaleString("it-IT", { maximumFractionDigits: 2 }) ?? "—"}</td>)}
              </tr>; })}</tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-600">Medie per partita · Fonte: StatsNext, dopo 11 giornate.</p>
        </section>
        <LeaguePlayerStats page={playerPage} />
        <LeagueExtraStats />
        <Link href="/campionato/analisi" className="font-semibold">Analisi ultima partita e prossimo avversario →</Link>
      </div>
    </main>
  );
}
