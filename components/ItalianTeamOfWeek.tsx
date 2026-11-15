const lines = [
  [
    { name: "Gabriele Borsa", short: "Borsa", level: "Milan", note: "Doppietta al Lussemburgo e un gol contro l’Armenia." },
    { name: "Fortune Erhunmwun Egharevba", short: "Egharevba", level: "Fiorentina", note: "Ha segnato il terzo gol contro l’Armenia." },
  ],
  [{ name: "Michele Elena", short: "Elena", level: "Lazio", note: "Un gol in ciascuna gara e rigore procurato contro il Lussemburgo." }],
  [
    { name: "Roberto Scaglione", short: "Scaglione", level: "Parma", note: "Ha segnato il 2–0 contro il Lussemburgo." },
    { name: "Noham Blandina", short: "Blandina", level: "Genoa", note: "Titolare in mediana nel 4–0 contro l’Armenia." },
    { name: "Cristian Sorrentino", short: "Sorrentino", level: "Milan", note: "In gol contro il Lussemburgo e titolare contro l’Armenia." },
  ],
  [
    { name: "Lorenzo Dattilo", short: "Dattilo", level: "Roma", note: "Titolare sull’out sinistro nel 4–0 di Erevan." },
    { name: "Alessandro Ghiotto", short: "Ghiotto", level: "Juventus", note: "Capitano della difesa azzurra contro l’Armenia." },
    { name: "Diego Lucarelli", short: "Lucarelli", level: "Inter", note: "Centrale titolare nella gara chiusa senza reti subite." },
    { name: "Sebastian Mattei", short: "Mattei", level: "Roma", note: "Titolare a destra contro l’Armenia." },
  ],
  [{ name: "Umberto Costante", short: "Costante", level: "Inter", note: "Porta inviolata nel 4–0 contro l’Armenia." }],
];

export default function ItalianTeamOfWeek() {
  return (
    <section aria-labelledby="italian-weekly-title" className="ac1899-box p-4 sm:p-6">
      <header className="mb-4">
        <h2 id="italian-weekly-title" className="text-3xl">Undici italiano Under 18 della settimana</h2>
        <p className="text-sm text-gray-600">9–15 novembre 2026 · modulo 4-3-1-2</p>
      </header>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <figure className="relative isolate flex min-h-80 flex-col justify-between gap-5 overflow-hidden rounded-xl bg-emerald-950 p-3 sm:p-5">
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 rounded border border-white/70 bg-[repeating-linear-gradient(0deg,#0f553d_0%,#0f553d_12.5%,#146449_12.5%,#146449_25%)]">
            <span className="absolute inset-x-0 top-1/2 border-t border-white/70" />
            <span className="absolute left-1/2 top-1/2 aspect-square w-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70" />
            <span className="absolute inset-x-1/4 top-0 h-[16%] border-x border-b border-white/70" />
            <span className="absolute inset-x-1/4 bottom-0 h-[16%] border-x border-t border-white/70" />
          </div>
          <figcaption className="sr-only">Grafica della formazione, dall’attacco al portiere</figcaption>
          {lines.map((line, index) => (
            <ul key={index} className="flex justify-around gap-1">
              {line.map(player => (
                <li key={player.name} className="min-w-0 flex-1 text-center" aria-label={player.name}>
                  <span aria-hidden="true" className="mx-auto mb-1 grid size-8 place-items-center rounded-full border border-white/60 bg-blue-800 text-xs font-bold text-white sm:size-10">
                    {player.name.split(" ").map(word => word[0]).slice(0, 2).join("")}
                  </span>
                  <span className="inline-block max-w-full rounded bg-neutral-950 px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-sm" style={{ color: "white" }}>{player.short}</span>
                </li>
              ))}
            </ul>
          ))}
        </figure>
        <div>
          <h3 className="mb-2 text-xl">Perché sono stati scelti</h3>
          <ul className="divide-y divide-gray-100 text-sm">
            {lines.slice().reverse().flat().map(player => (
              <li key={player.name} className="py-1.5"><strong>{player.name}</strong> <span className="text-xs text-gray-600">· {player.level}</span> <span className="text-gray-700">— {player.note}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-600">Selezione editoriale per ruolo basata sulle gare dell’Italia U17 contro Lussemburgo e Armenia. Per i profili di vivaio, il club indica la società di appartenenza. Fonte: FIGC.</p>
    </section>
  );
}
