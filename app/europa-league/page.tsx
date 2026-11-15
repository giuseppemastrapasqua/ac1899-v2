import { sectionMetadata } from "../../lib/site-seo";

export const metadata = sectionMetadata("/europa-league");

import EuropaOpponent from "../../components/EuropaOpponent";
import Link from "next/link";
import EuropaLeagueBox from "../../components/EuropaLeagueBox";

export default function EuropaLeaguePage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">Europa League 2026/27</h1>
        <div className="grid gap-3 sm:grid-cols-4">
          {[["Gol fatti","4"],["Gol subiti","7"],["Precisione passaggi","87%"],["Recuperi","148"]].map(([label,value]) =>
            <div className="ac1899-box p-4" key={label}><p className="text-sm text-gray-600">{label}</p><strong className="text-2xl">{value}</strong></div>)}
        </div>
        <p className="text-xs text-gray-600">Dati UEFA dopo quattro giornate.</p>
        <EuropaLeagueBox />
        <EuropaOpponent />
        <Link href="/europa-league/analisi" className="font-semibold">Analisi ultima gara e prossimo avversario →</Link>
      </div>
    </main>
  );
}
