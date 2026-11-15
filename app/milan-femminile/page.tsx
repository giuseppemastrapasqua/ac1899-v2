import Link from "next/link";
import StandingsTable from "../../components/StandingsTable";
import { getLocalNews, localNewsHref } from "../../lib/local-news";
import { womenPlayerStats, womenResults, womenSquad, womenStandings } from "../../lib/milan-women";

const columns = ["N.", "Giocatrice", "Ruolo", "Età", "Nazionalità", "Partite", "Da titolare", "Minuti", "Passaggi", "Gol", "Assist", "Scadenza contratto", "Lordo annuo"];
const timeline = [[5,"Dompig","1–0"],[16,"Kanutte Fornes","1–1"],[26,"Kanutte Fornes","1–2"],[58,"Kozak","2–2"],[78,"Koivisto","2–3"],[84,"Giordano","3–3"]] as const;

export default async function MilanWomenPage() {
  const news = (await getLocalNews()).filter(story => story.category.toLowerCase() === "femminile");
  return <main className="ac1899-home min-h-screen home-section-league">
    <div className="home-section-inner">
      <header>
        <h1 className="text-4xl">Milan Femminile 2026/27</h1>
        <p className="mt-2 text-sm text-gray-600">Prima squadra · Serie A Women · Allenatrice Suzanne Bakker</p>
      </header>
      <nav aria-label="Sezioni Milan Femminile" className="flex flex-wrap gap-4 text-sm font-semibold">
        <a href="#partite">Partite</a><a href="#classifica">Classifica</a><a href="#rosa">Rosa e statistiche</a><a href="#notizie">Notizie</a>
      </nav>
      <section id="partite" className="grid gap-3 sm:grid-cols-2" aria-label="Ultima partita e prossimo incontro">
        <article className="ac1899-box ac1899-signature p-4">
          <p className="text-sm font-bold uppercase">Ultimo risultato</p>
          <h2 className="my-2 text-3xl">Napoli Women 3–3 Milan</h2>
          <p className="text-sm">14 novembre 2026 · Stadio Giuseppe Piccolo · 7ª giornata</p>
        </article>
        <article className="ac1899-box ac1899-signature p-4">
          <p className="text-sm font-bold uppercase">Prossimo incontro</p>
          <h2 className="my-2 text-3xl">Milan–Sassuolo</h2>
          <p className="text-sm">21 novembre 2026 · 15:00 · Centro Sportivo Peppino Vismara · 8ª giornata</p>
        </article>
      </section>
      <section className="ac1899-box p-4" aria-labelledby="women-analysis">
        <h2 id="women-analysis" className="mb-2 text-2xl">Match Analyst · Napoli–Milan</h2>
        <p className="text-sm">Kanutte Fornes ha ribaltato il vantaggio del Napoli con due reti in dieci minuti. Koivisto ha riportato avanti il Milan al 78′, prima del pareggio di Giordano. La squadra di Bakker ha segnato tre gol in trasferta e ha perso due volte il vantaggio.</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {timeline.map(([minute, player, score]) => <li key={minute} className="rounded border border-gray-200 p-2 text-sm"><strong className="block">{minute}′ · {score}</strong>{player}</li>)}
        </ol>
        <p className="mt-3 text-sm"><strong>Milan (4-3-3)</strong> · Rainey, Koivisto, de Sanders, Nevado, Arrigoni, Brighton, Grimshaw, Kyvåg, Kanutte Fornes, Stokić.</p>
        <p className="mt-2 text-xs text-gray-600">Fonte: report gara AC Milan.</p>
      </section>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <section className="ac1899-box p-4" aria-labelledby="women-results">
          <h2 id="women-results" className="mb-2 text-2xl">Risultati di campionato</h2>
          <p className="mb-2 text-xs text-gray-600">Risultato dal punto di vista del Milan.</p>
          <ol className="divide-y divide-gray-100 text-sm">
            {womenResults.map(([date, opponent, venue, score]) => <li key={date} className="flex justify-between gap-3 py-2"><span>{date} · {opponent} <span className="text-gray-600">({venue})</span></span><strong>{score}</strong></li>)}
          </ol>
        </section>
        <section id="classifica" className="ac1899-box p-4">
          <h2 className="mb-2 text-2xl">Classifica Serie A Women · 12 squadre</h2>
          <StandingsTable expanded rows={womenStandings} title="Classifica Serie A Women 2026/27" />
          <p className="mt-2 text-xs text-gray-600">Fonte: AC Milan. Rilevazione con 7ª giornata in corso.</p>
        </section>
      </div>
      <section id="rosa" aria-labelledby="women-squad" className="ac1899-box p-4">
        <h2 id="women-squad" className="mb-2 text-2xl">Rosa e statistiche individuali</h2>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Statistiche rosa Milan Femminile">
          <table className="w-full min-w-max text-left text-sm tabular-nums">
            <thead className="bg-gray-100"><tr>{columns.map(label => <th key={label} scope="col" className="p-2">{label}</th>)}</tr></thead>
            {womenSquad.map(({ role, players }) => <tbody key={role}>
              <tr className="bg-red-50"><th colSpan={columns.length} scope="rowgroup" className="p-2 text-red-800">{role}</th></tr>
              {players.map(([shirt, name, nation]) => {
                const [age, apps, starts, minutes, goals, assists] = womenPlayerStats[shirt] ?? [];
                return <tr key={shirt} className="border-b border-gray-100"><td className="p-2">{shirt}</td><th scope="row" className="p-2">{name}</th>
                  {[role, age, nation, apps, starts, minutes, null, goals, assists, null, null].map((value, index) => <td className="p-2" key={index}>{value ?? "n.d."}</td>)}
                </tr>;
              })}
            </tbody>)}
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-600">Rosa ufficiale AC Milan. Statistiche individuali FBref fino alla 6ª giornata, dove disponibili. n.d. indica un dato non verificato.</p>
      </section>
      <section id="notizie" className="ac1899-box p-4">
        <h2 className="mb-2 text-2xl">Notizie Milan Femminile</h2>
        <ul className="divide-y divide-gray-100">
          {news.map(story => <li className="py-2" key={story.id}><Link className="font-semibold" href={localNewsHref(story.id)}>{story.title}</Link>
            <p className="text-xs text-gray-600">{story.source} · {new Date(story.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}</p></li>)}
        </ul>
      </section>
    </div>
  </main>;
}
