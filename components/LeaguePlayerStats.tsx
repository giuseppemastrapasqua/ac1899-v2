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
        </ol> : <p className="text-sm">Classifica momentaneamente non disponibile.</p>}
      </section>)}
    </div>
    <div className="ac1899-box p-4">
      <h3 className="mb-2 text-xl">Tutti i giocatori del campionato</h3>
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
      </> : <p className="text-sm">Dati individuali momentaneamente non disponibili.</p>}
      <p className="mt-3 text-xs text-gray-600">Fonte: API-Football. Il trattino indica un dato assente.</p>
    </div>
  </section>;
}
