import { lineups } from "./GenoaMilanReport";

const stats = [
  {
    group: "Possesso e costruzione",
    rows: [
      ["Possesso", "38%", "62%"],
      ["Passaggi tentati", "335", "576"],
      ["Passaggi riusciti", "263", "488"],
      ["Precisione dei passaggi", "79%", "85%"],
      ["Tocchi in area avversaria", "25", "14"],
    ],
  },
  {
    group: "Conclusioni e occasioni",
    rows: [
      ["Gol", "1", "2"],
      ["Tiri totali", "17", "6"],
      ["Tiri nello specchio", "5", "2"],
      ["Tiri fuori", "6", "3"],
      ["Tiri respinti", "6", "1"],
      ["Tiri in area / da fuori", "7 / 10", "4 / 2"],
      ["Precisione al tiro", "29%", "33%"],
      ["Gol attesi (xG)", "1,15", "0,63"],
      ["xG per tiro", "0,07", "0,11"],
      ["xG dei tiri in porta (xGOT)", "0,63", "1,33"],
      ["Grandi occasioni", "2", "2"],
    ],
  },
  {
    group: "Palle inattive e disciplina",
    rows: [
      ["Calci d’angolo", "3", "0"],
      ["Fuorigioco", "3", "1"],
      ["Falli commessi", "14", "13"],
      ["Ammonizioni", "2", "5"],
      ["Espulsioni", "0", "0"],
    ],
  },
];

const phases = [
  ["13′", "Cissè", "0–1"],
  ["19′", "Pulisic", "0–2"],
  ["45′", "Intervallo", "0–2"],
  ["88′", "Ellertsson", "1–2"],
  ["90′+", "Finale", "1–2"],
];

export default function MatchAnalyst() {
  return (
    <section id="match-analyst" aria-labelledby="match-analyst-title" className="ac1899-box p-4 sm:p-5">
      <div className="mb-4 border-b border-gray-200 pb-3">
        <h2 id="match-analyst-title" className="text-3xl">Match Analyst AI</h2>
        <p className="mt-1 text-sm text-gray-600">Genoa–Milan 1–2 · Serie A, 11ª giornata · Luigi Ferraris · 8 novembre 2026</p>
      </div>

      <section className="ac1899-box p-4" aria-labelledby="analyst-xg">
            <h3 id="analyst-xg" className="mb-2 text-xl">xG Flow</h3>
            <p className="mb-3 text-sm text-gray-600">Totale xG a fine partita · scala comune da 0 a 1,5</p>
            <div className="grid gap-2">
              {[["Genoa", 1.15, "bg-blue-900"], ["Milan", 0.63, "bg-red-700"]].map(([team, value, color]) => (
                <div key={team} className="grid grid-cols-[3.5rem_1fr_2.5rem] items-center gap-2 text-sm">
                  <span className="font-semibold">{team}</span>
                  <span aria-hidden="true" className="h-2 overflow-hidden rounded bg-gray-100">
                    <span className={color + " block h-full rounded"} style={{ width: Number(value) / 1.5 * 100 + "%" }} />
                  </span>
                  <strong className="text-right tabular-nums">{Number(value).toLocaleString("it-IT", { minimumFractionDigits: 2 })}</strong>
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
            <p className="mt-1 text-xs text-gray-600">Fonte xG e statistiche: Flashscore.</p>
      </section>

      <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">
          <section aria-labelledby="analyst-stats" className="ac1899-box min-w-0 p-4">
            <h3 id="analyst-stats" className="mb-4 text-xl">Statistiche della partita</h3>
            <table className="w-full text-left text-sm tabular-nums">
              <thead><tr className="bg-gray-50"><th scope="col" className="p-2">Statistica</th><th scope="col" className="p-2 text-right">Genoa</th><th scope="col" className="p-2 text-right">Milan</th></tr></thead>
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
            <p className="mt-3 text-xs text-gray-600">Fonti: Flashscore (tiri e xG), Ludistat (passaggi, falli ed espulsioni), AC Milan (ammonizioni).</p>
          </section>

        <article className="ac1899-box space-y-4 p-4 text-sm leading-relaxed" aria-labelledby="analyst-report">
          <h3 id="analyst-report" className="text-xl">Analisi AI completa</h3>
          <div>
            <h4 className="font-bold">Primo tempo · Due recuperi cambiano la partita</h4>
            <p>Osmajić sfiora il palo nel primo minuto, poi il Milan risponde con Ramos. Il vantaggio nasce dal recupero di Rabiot e dal suo passaggio per Cissè al 13′. Sei minuti dopo, un altro pallone riconquistato in avanti porta al raddoppio: Ramos serve Pulisic, che firma lo 0–2. Prima dell’intervallo Maignan interviene su Wiafe al 40′ e sul colpo di testa di Østigård al 44′.</p>
          </div>
          <div>
            <h4 className="font-bold">Ripresa · Il Genoa accorcia nel finale</h4>
            <p>De Rossi cambia con Baldanzi ed El Shaarawy, mentre Amorim inserisce Hutchinson e Terracciano. De Winter chiude su Osmajić al 69′, Maignan ferma Vitinha al 73′ e Gila devia il tentativo di El Shaarawy al 79′. All’88′ Ellertsson accorcia con un tiro dalla distanza. Il Milan conserva il vantaggio nei sette minuti di recupero.</p>
          </div>
          <div>
            <h4 className="font-bold">Lettura tattica · Possesso e volume offensivo</h4>
            <p>Nel 4-4-1-1 del Milan, Pulisic parte dietro Ramos. I due gol nascono da recuperi seguiti da una giocata rapida verso la porta. Il Milan tiene il 62% del pallone e segna con entrambi i tiri nello specchio. Il Genoa, schierato 3-4-2-1, calcia 17 volte contro 6 e totalizza più xG (1,15–0,63). Dieci conclusioni genoane arrivano da fuori area, ma i 25 tocchi nell’area rossonera mostrano che la pressione ha prodotto anche incursioni ravvicinate.</p>
          </div>
          <div>
            <h4 className="font-bold">Qualità delle occasioni</h4>
            <p>Il Genoa ha generato più pericoli nel complesso, ma il Milan ha prodotto più xG per tiro (0,11 contro 0,07, valori arrotondati). Le grandi occasioni sono state due per parte. Le sei conclusioni respinte del Genoa spiegano parte del divario tra tiri totali e tiri arrivati in porta.</p>
          </div>
          <div>
            <h4 className="font-bold">Protagonisti e punto da migliorare</h4>
            <p>Pulisic, votato MVP dai tifosi, realizza il gol decisivo. Rabiot e Ramos firmano gli assist, mentre Maignan protegge il vantaggio in più fasi. La priorità emersa dal finale è limitare gli ingressi in area e le seconde conclusioni quando il Milan difende un vantaggio.</p>
          </div>
        </article>
      </div>

      <section aria-labelledby="analyst-lineups" className="mt-5 border-t border-gray-200 pt-4">
        <h3 id="analyst-lineups" className="mb-3 text-xl">Lineup · Formazioni ufficiali</h3>
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
