import { sectionMetadata } from "../../../lib/site-seo";

export const metadata = sectionMetadata("/community/bet");

import Link from "next/link";
import { communityMatchday, formatCommunityKickoff } from "../../../lib/community-matchday";

export default function CommunityBetPage() {
  return <main className="ac1899-home min-h-screen">
    <div className="home-section-inner">
      <Link href="/community">← Curva 1899</Link>
      <header>
        <h1 className="text-4xl">Bet · Pronostici della redazione</h1>
        <p>12ª giornata di Serie A 2026/27 · 21–23 novembre</p>
        <p className="text-sm text-gray-600">Risultati esatti suggeriti sulla base della classifica dopo 11 giornate.</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {communityMatchday.map(([kickoff, home, away, score, analysis]) =>
          <article key={home} className="ac1899-box space-y-2 p-4">
            <time dateTime={kickoff} className="text-sm text-gray-600">{formatCommunityKickoff(kickoff)}</time>
            <h2 className="text-2xl">{home}–{away}</h2>
            <p className="font-bold">Risultato suggerito · {score}</p>
            <p className="text-sm">{analysis}</p>
          </article>
        )}
      </div>
    </div>
  </main>;
}
