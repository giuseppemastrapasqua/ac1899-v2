const announcement = "https://www.acmilan.com/it/news/articoli/awards/2026-11-04/emirates-mvp-di-ottobre-diego-moreira";
const photo = "https://assets-eu-01.kc-usercontent.com/006f7528-416b-01e4-8ef2-ab6ab3f4e177/f2869531-c467-4ee6-8a54-a9ea5e198999/2026.11.04-MVP-Ottobre-square.png";

export default function MonthlyMvp() {
  return (
    <section aria-labelledby="monthly-mvp" className="ac1899-box md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <img src={photo} alt="Diego Moreira nella grafica ufficiale dell’MVP di ottobre" loading="lazy"
        className="aspect-square h-full max-h-72 w-full object-cover object-center md:max-h-none" />
      <div className="self-center p-6 sm:p-8">
        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-red-800">MVP del mese · Ottobre 2026</p>
        <h2 id="monthly-mvp" className="mb-3 text-4xl sm:text-5xl">Diego Moreira</h2>
        <p className="max-w-[55ch] text-gray-700">
          I tifosi rossoneri lo hanno premiato per il secondo mese consecutivo.
          Nel derby vinto 3–1 contro l’Inter ha servito gli assist per Pulisic e
          Rabiot, poi ha segnato su punizione.
        </p>
        <dl className="mt-5 grid max-w-md grid-cols-3 gap-2">
          {[["Gol nel derby", "1"], ["Assist nel derby", "2"], ["Risultato", "3–1"]].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-red-100 bg-white px-3 py-2">
              <dt className="text-xs text-gray-600">{label}</dt>
              <dd className="text-xl font-bold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        <a href={announcement} className="mt-5 inline-block font-bold">Leggi l’annuncio ufficiale →</a>
      </div>
    </section>
  );
}
