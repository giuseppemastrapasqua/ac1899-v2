const report = "https://www.acmilan.com/it/news/articoli/serie-a/2026-11-08/reazione-milan-2-1-a-genova";

const lineups = [
  {
    team: "Genoa", formation: "3-4-2-1", coach: "Daniele De Rossi",
    starters: ["Bijlow", "Marcandalli", "Østigård", "Vásquez", "Ehizibue", "Traorè", "Wiafe", "Ellertsson", "Messias", "Vitinha", "Osmajić"],
    bench: ["Sommariva", "Stolz", "Drameh", "Mitaj", "Otoa", "Puczka", "Sabelli", "A. Amorim", "Havel", "Venturino"],
    changes: ["62′ El Shaarawy per Marcandalli", "62′ Baldanzi per Messias", "74′ Colombo per Vitinha", "84′ Sow per Traorè", "84′ Meichtry per Wiafe"],
  },
  {
    team: "Milan", formation: "4-4-1-1", coach: "Rúben Amorim",
    starters: ["Maignan", "Gila", "De Winter", "Diawara", "Musah", "Moreira", "Modrić", "Rabiot", "Cissè", "Pulisic", "Ramos"],
    bench: ["Bouyer", "Torriani", "Bartesaghi", "Vladimirov", "Comotto", "Camarda"],
    changes: ["61′ Hutchinson per Cissè", "62′ F. Terracciano per Diawara", "79′ Jashari per Pulisic", "87′ Estupiñán per Musah"],
  },
];

export default function GenoaMilanReport() {
  return (
    <section className="ac1899-box min-w-0 p-3" aria-labelledby="last-match-report">
      <h3 id="last-match-report" className="mb-1 text-xl">Tabellino completo</h3>
      <p className="mb-3 text-xs text-gray-600">11ª giornata · Arbitro Davide Massa</p>
      <dl className="divide-y divide-gray-200 text-xs">
        <div className="py-1">
          <dt className="font-bold">Marcatori</dt>
          <dd>13′ Cissè (M), 19′ Pulisic (M), 88′ Ellertsson (G)</dd>
        </div>
        <div className="py-1">
          <dt className="font-bold">Ammoniti</dt>
          <dd>28′ Musah, 31′ Diawara, 50′ Rabiot e Marcandalli, 76′ Pulisic, 87′ Gila, 90′+4 Ehizibue.</dd>
        </div>
      </dl>
      {lineups.map(({ team, formation, coach, starters, bench, changes }) => (
        <details key={team} className="border-t border-gray-200 py-1 text-xs">
          <summary className="cursor-pointer font-bold">{team} · {formation}</summary>
          <p className="mt-2"><strong>Allenatore:</strong> {coach}</p>
          <p className="mt-1"><strong>Titolari:</strong> {starters.join(", ")}.</p>
          <p className="mt-1"><strong>Subentrati:</strong> {changes.join("; ")}.</p>
          <p className="mt-1"><strong>Riserve non utilizzate:</strong> {bench.join(", ")}.</p>
        </details>
      ))}
      <a href={report} className="mt-2 inline-block text-xs">Resoconto ufficiale →</a>
    </section>
  );
}
