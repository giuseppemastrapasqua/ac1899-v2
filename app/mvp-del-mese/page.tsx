import MonthlyMvp from "../../components/MonthlyMvp";

export default function MonthlyMvpArchive() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">MVP del mese · Stagione 2026/27</h1>
        <MonthlyMvp />
        <section className="ac1899-box p-4 sm:p-6" aria-labelledby="mvp-history">
          <h2 id="mvp-history" className="mb-3 text-2xl">Storico mensile</h2>
          <dl className="divide-y divide-gray-200">
            <div className="py-3"><dt className="font-bold">Novembre 2026</dt><dd>Mese in corso. Vincitore da annunciare.</dd></div>
            <div className="py-3"><dt className="font-bold">Ottobre 2026 · Diego Moreira</dt><dd>Un gol e due assist nel derby vinto 3–1.</dd></div>
            <div className="py-3"><dt className="font-bold">Settembre 2026 · Diego Moreira</dt><dd>Circa il 50% dei voti. Subentrato all’intervallo contro la Lazio, ha completato la rimonta segnando al 65′ e al 67′.</dd></div>
            <div className="py-3"><dt className="font-bold">Agosto 2026</dt><dd>Nessun vincitore mensile verificato.</dd></div>
          </dl>
          <p className="mt-2 text-xs text-gray-600">Fonte: comunicati Emirates MVP di AC Milan.</p>
        </section>
      </div>
    </main>
  );
}
