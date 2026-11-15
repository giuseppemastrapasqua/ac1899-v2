const lines = [
  [
    { name: "Emanuele Rao", short: "Rao", level: "U20", note: "Ha deciso Italia–Portogallo con il gol dell’1–0." },
    { name: "Francesco Camarda", short: "Camarda", level: "U21", note: "Ha sbloccato il 2–1 contro la Francia U21." },
    { name: "Francesco Pio Esposito", short: "Pio Esposito", level: "Italia", note: "Doppietta contro la Francia e MVP secondo Sky Sport." },
    { name: "Alessio Cacciamani", short: "Cacciamani", level: "U21", note: "Ha creato pericoli in fascia e costretto Patouillet a intervenire." },
  ],
  [
    { name: "Matteo Dagasso", short: "Dagasso", level: "U21", note: "Assist per Camarda e contributo al pressing." },
    { name: "Luca Lipani", short: "Lipani", level: "U21", note: "Recupero e tiro da fuori per il gol della vittoria." },
  ],
  [
    { name: "Matteo Cocchi", short: "Cocchi", level: "U20", note: "Equilibrio sulla fascia nella vittoria senza gol subiti." },
    { name: "Luca Reggiani", short: "Reggiani", level: "U20", note: "Un salvataggio decisivo ha protetto l’1–0." },
    { name: "Pietro Comuzzo", short: "Comuzzo", level: "U21", note: "Sicurezza al centro della difesa contro la Francia." },
    { name: "Filippo Mané", short: "Mané", level: "U21", note: "Anticipi e pressione sulla fascia destra." },
  ],
  [{ name: "Lorenzo Palmisani", short: "Palmisani", level: "U21", note: "Decisivo nel finale sulla punizione di Ethan Mbappé." }],
];

export default function ItalianTeamOfWeek() {
  return (
    <section aria-labelledby="italian-weekly-title" className="ac1899-box p-4 sm:p-6">
      <header className="mb-4">
        <h2 id="italian-weekly-title" className="text-3xl">Undici italiano della settimana</h2>
        <p className="text-sm text-gray-600">9–15 novembre 2026 · modulo 4-2-4</p>
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
      <p className="mt-4 text-xs text-gray-600">Selezione editoriale per ruolo basata sulle prestazioni in Italia–Francia, Francia–Italia U21 e Italia–Portogallo U20. Fonti: FIGC, Sky Sport e MondoPrimavera.</p>
    </section>
  );
}
