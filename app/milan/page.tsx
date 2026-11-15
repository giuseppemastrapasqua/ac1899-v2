import { milanSquad } from "../../lib/milan-squad";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("it-IT");
const columns = ["N.", "Giocatore", "Ruolo", "Età", "Nazionalità", "Partite", "Da titolare", "Minuti", "Passaggi Serie A", "Gol", "Assist", "Scadenza contratto", "Lordo annuo stimato"];

export default function MilanPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <header>
          <h1 className="text-4xl">Rosa Milan 2026/27</h1>
          <p className="mt-2 text-sm text-gray-600">Rosa ufficiale della prima squadra · dati consultati il 15 novembre 2026</p>
        </header>
        <div className="ac1899-box p-4">
          <div className="overflow-x-auto" role="region" aria-label="Statistiche rosa Milan" tabIndex={0}>
            <table className="w-full min-w-max text-left text-sm tabular-nums">
              <thead className="bg-gray-100"><tr>{columns.map(label => <th key={label} scope="col" className="px-2 py-2">{label}</th>)}</tr></thead>
              {milanSquad.map(({ role, players }) => (
                <tbody key={role}>
                  <tr className="bg-red-50"><th colSpan={columns.length} scope="rowgroup" className="px-2 py-2 text-red-800">{role}</th></tr>
                  {players.map(([shirt, player, nation, age, apps, starts, minutes, passes, goals, assists, contract, wage]) => (
                    <tr key={shirt} className="border-b border-gray-100">
                      <td className="px-2 py-2">{shirt}</td><th scope="row" className="px-2 py-2">{player}</th>
                      {[role, age, nation, apps, starts, minutes, passes, goals, assists, contract, wage === null ? null : money.format(wage * 1_000_000)].map((value, i) =>
                        <td key={i} className="px-2 py-2">{value === null ? "n.d." : typeof value === "number" ? number.format(value) : value}</td>)}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">Presenze, titolarità, minuti, gol e assist si riferiscono alle competizioni coperte da PlayersMinutes. I passaggi tentati riguardano la Serie A. n.d. indica un dato non disponibile o non conciliato tra le fonti.</p>
          <p className="mt-2 text-sm text-gray-600">Gli stipendi sono stime lorde annue, bonus esclusi. Le scadenze riportano la data pubblicata dal club dove disponibile, oppure l’anno indicato dalle fonti specializzate.</p>
          <p className="mt-2 text-xs text-gray-600">Fonti: AC Milan, PlayersMinutes, Tattico, FBref (Diawara), Calcio e Finanza e SalaryLeaks.</p>
        </div>
      </div>
    </main>
  );
}
