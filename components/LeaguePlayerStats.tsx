import { assistSnapshot, scoringSnapshot } from "../lib/league-player-snapshot";
import Link from "next/link";
import { getLeaguePlayers } from "../lib/api-football";

const columns = [
  "Giocatore", "Squadra", "Ruolo", "Presenze", "Titolare", "Minuti", "Gol", "Assist",
  "Tiri", "In porta", "Passaggi", "Passaggi chiave", "Dribbling riusciti", "Contrasti",
  "Intercetti", "Duelli vinti", "Parate", "Gialli", "Rossi",
];

export default async function LeaguePlayerStats({ page }: { page: number }) {
  const [players, scorers, assists] = await Promise.all([
    getLeaguePlayers("players", page),
    getLeaguePlayers("players/topscorers"),
    getLeaguePlayers("players/topassists"),
  ]);

  return <section id="statistiche-calciatori" className="space-y-3" aria-labelledby="league-player-title">
    <h2 id="league-player-title" className="text-3xl">Statistiche calciatori · Serie A</h2>
    <div className="grid gap-3 sm:grid-cols-2">
      {([
        ["Classifica marcatori", scorers, "total"],
        ["Classifica assist", assists, "assists"],
      ] as const).map(([title, data, field]) => <section key={title} className="ac1899-box p-4">
        <h3 className="mb-2 text-xl">{title}</h3>
        {data?.response.length ? <ol className="divide-y divide-gray-100">
          {data.response.map(({ player, statistics }) => <li key={player.id} className="flex justify-between gap-2 py-1">
            <span>{player.name} · {statistics[0].team.name}</span><strong>{statistics[0].goals[field] ?? "—"}</strong>
          </li>)}
        </ol> : <>
          <ol className="divide-y divide-gray-100">
            {(field === "total"
              ? scoringSnapshot.map(([name, team, goals]) => ({ name, description: team, value: goals }))
              : assistSnapshot.map(([name, count, xa]) => ({ name, description: `${xa.toLocaleString("it-IT")} xA`, value: count }))
            ).map(({ name, description, value }) => <li key={name} className="flex justify-between gap-2 py-1">
              <span>{name} · {description}</span><strong>{value}</strong>
            </li>)}
          </ol>
          <p className="mt-2 text-xs text-gray-600">{field === "total" ? "Sky Sport · 8 novembre 2026 · giocatori con almeno 4 gol." : "FotMob · rilevazione del 15 novembre 2026 · primi 17 giocatori."}</p>
        </>}
      </section>)}
    </div>
    <div className="ac1899-box p-4">
      <h3 className="mb-2 text-xl">{players?.response.length ? "Tutti i giocatori del campionato" : "Assist attesi dei migliori assistman"}</h3>
      {players?.response.length ? <>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Statistiche individuali per giocatore">
          <table className="w-full min-w-max text-left text-sm tabular-nums">
            <thead className="bg-gray-100"><tr>{columns.map(label => <th key={label} scope="col" className="p-2">{label}</th>)}</tr></thead>
            <tbody>{players.response.map(({ player, statistics: [s] }) => <tr key={player.id + "-" + s.team.name} className="border-b border-gray-100">
              <th scope="row" className="p-2">{player.name}</th>
              {[s.team.name, ({ Goalkeeper: "Portiere", Defender: "Difensore", Midfielder: "Centrocampista", Attacker: "Attaccante" } as Record<string, string>)[s.games.position] ?? s.games.position,
                s.games.appearences, s.games.lineups, s.games.minutes, s.goals.total, s.goals.assists,
                s.shots.total, s.shots.on, s.passes.total, s.passes.key, s.dribbles.success,
                s.tackles.total, s.tackles.interceptions, s.duels.won, s.goals.saves, s.cards.yellow, s.cards.red
              ].map((value, index) => <td key={index} className="p-2">{value ?? "—"}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <nav aria-label="Pagine dei calciatori" className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          {page > 1 && <Link href={`?calciatori=${page - 1}#statistiche-calciatori`}>← Precedente</Link>}
          <span>Pagina {page} di {players.paging.total}</span>
          {page < players.paging.total && <Link href={`?calciatori=${page + 1}#statistiche-calciatori`}>Successiva →</Link>}
        </nav>
      </> : <>
        <table className="w-full text-left text-sm tabular-nums">
          <thead className="bg-gray-100"><tr>{["Giocatore", "Assist", "xA", "Assist sopra gli xA"].map(label => <th key={label} scope="col" className="p-2">{label}</th>)}</tr></thead>
          <tbody>{[...assistSnapshot].sort((a, b) => b[2] - a[2]).map(([name, count, xa]) => <tr key={name} className="border-b border-gray-100">
            <th scope="row" className="p-2">{name}</th><td className="p-2">{count}</td>
            <td className="p-2">{xa.toLocaleString("it-IT")}</td>
            <td className="p-2">{(count - xa).toLocaleString("it-IT", { maximumFractionDigits: 1, signDisplay: "exceptZero" })}</td>
          </tr>)}</tbody>
        </table>
        <p className="mt-2 text-xs text-gray-600">FotMob · rilevazione del 15 novembre 2026. Copertura limitata ai giocatori della classifica assist qui riportata.</p>
      </>}
      {players?.response.length ? <p className="mt-3 text-xs text-gray-600">Fonte: API-Football. Il trattino indica un dato assente.</p> : <p className="mt-3 text-xs text-gray-600">Le statistiche complete di tutti i giocatori dipendono dalla copertura del fornitore.</p>}
    </div>
  </section>;
}
