import type { ReactNode } from "react";

type Lineup = {
  team: string; formation: string; coach: string;
  starters: string[]; changes: string[]; bench: string[];
};

export default function MatchAnalysisLayout({
  id, subtitle, teams, stats, phases, lineups, sources, children,
}: {
  id: string;
  subtitle: string;
  teams: [{ name: string; xg: number }, { name: string; xg: number }];
  stats: { group: string; rows: string[][] }[];
  phases: string[][];
  lineups: Lineup[];
  sources: string;
  children: ReactNode;
}) {
  const scale = Math.max(1.5, Math.ceil(Math.max(...teams.map(team => team.xg)) * 2) / 2);
  return (
    <section id={id} aria-labelledby={id + "-analyst-title"} className="ac1899-box ac1899-signature p-4 sm:p-5">
      <div className="mb-4 border-b border-gray-200 pb-3">
        <h2 id={id + "-analyst-title"} className="text-3xl">Match Analyst AI</h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>

      <section className="ac1899-box p-4" aria-labelledby={id + "-analyst-xg"}>
            <h3 id={id + "-analyst-xg"} className="mb-2 text-xl">xG Flow</h3>
            <p className="mb-3 text-sm text-gray-600">Totale xG a fine partita · scala comune da 0 a {scale.toLocaleString("it-IT")}</p>
            <div className="grid gap-2">
              {teams.map(({ name, xg }) => [name, xg, name === "Milan" ? "bg-red-700" : "bg-blue-900"] as const).map(([team, value, color]) => (
                <div key={team} className="grid grid-cols-[minmax(5rem,auto)_1fr_2.5rem] items-center gap-2 text-sm">
                  <span className="font-semibold">{team}</span>
                  <span aria-hidden="true" className="h-2 overflow-hidden rounded bg-gray-100">
                    <span className={color + " block h-full rounded"} style={{ width: value / scale * 100 + "%" }} />
                  </span>
                  <strong className="text-right tabular-nums">{value.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</strong>
                </div>
              ))}
            </div>
            <h4 className="mt-4 text-sm font-bold">Cronologia del punteggio</h4>
            <ol className="mt-2 grid grid-cols-2 gap-1 text-center text-xs sm:grid-cols-5">
              {phases.map(([minute, label, score]) => (
                <li key={minute} className="rounded border border-gray-200 bg-gray-50 p-2">
                  <strong className="block">{minute} · {score}</strong>{label}
                </li>
              ))}
            </ol>
            <p className="mt-1 text-xs text-gray-600">Fonte xG: Flashscore.</p>
      </section>

      <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">
          <section aria-labelledby={id + "-analyst-stats"} className="ac1899-box min-w-0 p-4">
            <h3 id={id + "-analyst-stats"} className="mb-4 min-h-7 border-b border-gray-200 pb-2 text-xl leading-7">Statistiche della partita</h3>
            <table className="w-full text-left text-sm tabular-nums">
              <thead><tr className="bg-gray-50"><th scope="col" className="p-2">Statistica</th><th scope="col" className="p-2 text-right">{teams[0].name}</th><th scope="col" className="p-2 text-right">{teams[1].name}</th></tr></thead>
              {stats.map(({ group, rows }) => (
                <tbody key={group}>
                  <tr><th scope="rowgroup" colSpan={3} className="bg-red-50 px-2 py-1 text-xs font-bold uppercase text-red-800">{group}</th></tr>
                  {rows.map(([label, genoa, milan]) => (
                    <tr key={label} className="border-t border-gray-100">
                      <th scope="row" className="px-2 py-1 font-medium">{label}</th>
                      <td className="px-2 py-1 text-right">{genoa}</td>
                      <td className="px-2 py-1 text-right">{milan}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
            <p className="mt-3 text-xs text-gray-600">{sources}</p>
          </section>

        <article className="ac1899-box space-y-4 p-4 text-sm leading-relaxed" aria-labelledby={id + "-analyst-report"}>
          <h3 id={id + "-analyst-report"} className="min-h-7 border-b border-gray-200 pb-2 text-xl leading-7">Analisi AI completa</h3>
          {children}
        </article>
      </div>

      <section aria-labelledby={id + "-analyst-lineups"} className="mt-5 border-t border-gray-200 pt-4">
        <h3 id={id + "-analyst-lineups"} className="mb-3 text-xl">Lineup · Formazioni ufficiali</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {lineups.map(({ team, formation, coach, starters, changes, bench }) => (
            <div key={team} className="ac1899-box p-4 text-sm">
              <h4 className="font-bold">{team} · {formation}</h4>
              <p className="mb-2 text-gray-600">Allenatore: {coach}</p>
              <p><strong>Titolari:</strong> {starters.join(", ")}.</p>
              <p className="mt-2"><strong>Cambi:</strong> {changes.join("; ")}.</p>
              <p className="mt-2"><strong>Riserve non utilizzate:</strong> {bench.join(", ")}.</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
