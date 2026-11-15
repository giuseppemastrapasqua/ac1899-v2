export default function EuropaLeagueBox() {
  return (
    <section id="europa" aria-labelledby="europa-title" className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h2 id="europa-title" className="mb-3 text-2xl font-bold">Europa League</h2>
      <dl className="grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-gray-400">Ultimo risultato verificato</dt>
          <dd className="font-bold">Milan 0–2 Ferencváros</dd>
          <dd className="text-sm text-gray-400">5 novembre 2026</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Giornata 5</dt>
          <dd className="font-bold">Olympiacos – Milan</dd>
          <dd className="text-sm text-gray-400">26 novembre 2026</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Classifica dopo 4 giornate</dt>
          <dd className="font-bold">28º posto · 3 punti</dd>
          <dd className="text-sm text-gray-400">4 gol fatti · 7 subiti</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-4">
        <a href="https://it.uefa.com/uefaeuropaleague/clubs/50058/matches/">Calendario UEFA →</a>
        <a href="https://www.acmilan.com/it/stagione/2026/classifiche/uefa-europa-league">Classifica ufficiale →</a>
      </div>
    </section>
  );
}
