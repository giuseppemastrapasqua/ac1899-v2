const stats = [
  ["Possesso", "38%", "62%"],
  ["Tiri", "17", "6"],
  ["Tiri in porta", "5", "2"],
  ["Gol attesi (xG)", "1,15", "0,63"],
  ["Grandi occasioni", "2", "2"],
  ["Tocchi in area avversaria", "25", "14"],
  ["Calci d’angolo", "3", "0"],
];

function ShotZones({ team, inside, outside }: { team: string; inside: number; outside: number }) {
  const intensity = (shots: number) => 0.12 + shots / 10 * 0.45;

  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 font-bold">{team}</figcaption>
      <div className="relative flex min-h-32 items-center justify-between overflow-hidden rounded-lg border border-emerald-800 bg-emerald-950 px-3 text-sm" style={{ color: "white" }}>
        <div className="relative flex min-h-28 flex-1 items-center justify-center border-y border-l border-white/50 text-center" style={{ backgroundColor: `rgb(250 160 35 / ${intensity(outside)})` }}>
          <span className="px-2"><strong className="block text-2xl">{outside}</strong> Fuori area</span>
        </div>
        <div className="relative flex min-h-20 w-2/5 items-center justify-center border border-white/75 text-center" style={{ backgroundColor: `rgb(250 160 35 / ${intensity(inside)})` }}>
          <span className="px-2"><strong className="block text-2xl">{inside}</strong> In area</span>
        </div>
      </div>
    </figure>
  );
}

export default function MatchAnalyst() {
  return (
    <section id="match-analyst" aria-labelledby="match-analyst-title" className="ac1899-box p-4 sm:p-5">
      <div className="mb-4 border-b border-gray-200 pb-3">
        <h2 id="match-analyst-title" className="text-3xl">Match Analyst AI</h2>
        <p className="mt-1 text-sm text-gray-600">Genoa–Milan 1–2 · Serie A · 8 novembre 2026</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3 text-sm leading-relaxed">
          <h3 className="text-xl">Il Milan colpisce presto, il Genoa tira di più</h3>
          <p>Cissè e Pulisic hanno portato il Milan sullo 0–2 entro il 19′. I rossoneri hanno avuto il 62% di possesso e segnato con entrambi i tiri nello specchio. Il Genoa ha concluso di più, con 17 tiri contro 6, e ha chiuso avanti negli xG: 1,15 contro 0,63.</p>
          <p>Le grandi occasioni sono state due per parte. Dieci dei 17 tiri del Genoa sono arrivati da fuori area, ma i rossoblù hanno anche toccato 25 palloni nell’area avversaria contro 14. Il gol di Ellertsson all’88′ ha riaperto la gara: il margine costruito all’inizio è stato decisivo.</p>
        </div>
        <table className="w-full text-left text-sm tabular-nums">
          <thead><tr className="bg-gray-50"><th scope="col" className="p-2">Statistica</th><th scope="col" className="p-2 text-right">Genoa</th><th scope="col" className="p-2 text-right">Milan</th></tr></thead>
          <tbody>{stats.map(([label, genoa, milan]) => (
            <tr key={label} className="border-t border-gray-100"><th scope="row" className="px-2 py-1 font-medium">{label}</th><td className="px-2 py-1 text-right">{genoa}</td><td className="px-2 py-1 text-right">{milan}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="mt-5 border-t border-gray-200 pt-4">
        <h3 className="mb-1 text-xl">Mappe dei tiri per zona</h3>
        <p className="mb-3 text-xs text-gray-600">I colori indicano il numero di tiri in area e da fuori. I dati disponibili sono aggregati per zona.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <ShotZones team="Genoa" inside={7} outside={10} />
          <ShotZones team="Milan" inside={4} outside={2} />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <a href="https://www.flashscore.com/match/football/ac-milan-8Sa8HInO/genoa-d0PJxeie/summary/stats/">Statistiche Flashscore</a>
          <a href="https://www.shotifystats.com/match/genoa-vs-milan-2026-11-08/shots">Mappa dei singoli tiri su Shotify →</a>
        </div>
      </div>
    </section>
  );
}
