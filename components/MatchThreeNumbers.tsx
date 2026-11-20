import Link from "next/link";

const metrics = [
  { label: "Possesso", values: [38, 62], scale: 100, unit: "%", note: "Il Milan ha tenuto il pallone per il 62% del tempo rilevato." },
  { label: "Tiri", values: [17, 6], scale: 17, unit: "", note: "Il Genoa ha tirato quasi tre volte più del Milan." },
  { label: "Gol attesi (xG)", values: [1.15, 0.63], scale: 1.15, unit: "", note: "Il Genoa ha prodotto più xG. Il Milan ha segnato con entrambi i tiri nello specchio." },
];

export default function MatchThreeNumbers() {
  return <section className="ac1899-box ac1899-signature space-y-4 p-4 sm:p-6" aria-labelledby="tre-numeri">
    <header>
      <h2 id="tre-numeri" className="text-3xl sm:text-4xl">La Partita in 3 Numeri</h2>
      <p className="text-sm font-semibold">Genoa 1–2 Milan · Serie A · 8 novembre 2026</p>
    </header>
    <div className="grid gap-3 md:grid-cols-3">
      {metrics.map(({ label, values, scale, unit, note }) => <figure key={label} className="min-w-0 rounded-lg bg-gray-50 p-3">
        <figcaption className="mb-2 font-bold">{label}</figcaption>
        {["Genoa", "Milan"].map((team, index) => <div key={team} className="mb-2">
          <div className="flex justify-between text-sm"><span>{team}</span><strong>{values[index].toLocaleString("it-IT")}{unit}</strong></div>
          <div aria-hidden="true" className="h-2 rounded bg-gray-200">
            <div className={index ? "h-full rounded bg-red-700" : "h-full rounded bg-gray-700"} style={{ width: values[index] / scale * 100 + "%" }} />
          </div>
        </div>)}
        <p className="mt-3 text-sm">{note}</p>
      </figure>)}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-xs text-gray-600">Fonte: Flashscore.</p>
      <Link className="font-semibold" href="/campionato/analisi#match-analyst">Leggi l’analisi completa →</Link>
    </div>
  </section>;
}
