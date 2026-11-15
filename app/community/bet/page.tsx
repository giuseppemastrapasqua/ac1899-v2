import Link from "next/link";
import { serieA } from "../../../lib/home-standings";

export default function CommunityBetPage() {
  const milan = serieA.find(row => row[1] === "AC Milan");
  const frosinone = serieA.find(row => row[1] === "Frosinone");
  const kickoff = new Date("2026-11-22T18:00:00+01:00");

  return <main className="ac1899-home min-h-screen">
    <div className="home-section-inner">
      <Link href="/community">← Curva 1899</Link>
      <h1 className="text-4xl">Bet · Pronostici della redazione</h1>
      <section className="ac1899-box space-y-3 p-4">
        <h2 className="text-2xl">Milan–Frosinone</h2>
        <p className="text-sm">22 novembre 2026 · 18:00 · San Siro</p>
        <p className="text-xl font-bold">{new Date() < kickoff ? "Risultato suggerito · 2–1 Milan" : "Pronostico d’archivio · 2–1 Milan"}</p>
        {milan && frosinone && <p>Dopo 11 giornate il Milan ha segnato {milan[7]} gol e ne ha subiti {milan[8]}. Il Frosinone ne ha segnati {frosinone[7]} e subiti {frosinone[8]}. Il fattore campo e la migliore tenuta difensiva danno un leggero vantaggio al Milan. La produzione offensiva del Frosinone rende plausibile un gol ospite.</p>}
        <p className="text-sm text-gray-600">Pronostico editoriale basato sui dati disponibili. Nessuna quota o puntata.</p>
      </section>
    </div>
  </main>;
}
