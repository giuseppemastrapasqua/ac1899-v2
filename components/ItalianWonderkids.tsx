import Link from "next/link";
import { italianWonderkids } from "../lib/italian-wonderkids";

export default function ItalianWonderkids({ compact = false }: { compact?: boolean }) {
  const players = compact ? italianWonderkids.slice(0, 3) : italianWonderkids;
  return (
    <section id="wonderkids-italia" aria-labelledby="wonderkids-italia-title">
      <header className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-gray-200 pb-3">
        <div>
          {compact ? <h2 id="wonderkids-italia-title" className="text-3xl">Wonderkids Italia</h2>
            : <h1 id="wonderkids-italia-title" className="text-4xl">Wonderkids Italia</h1>}
          <p className="text-sm text-gray-600">Talenti italiani da seguire · 15 novembre 2026</p>
        </div>
        {compact && <Link href="/wonderkids" className="text-sm font-semibold">Tutti i profili →</Link>}
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {players.map(player => (
          <article key={player.name} className="ac1899-box flex h-full flex-col p-4">
            <h3 className="text-xl">{player.name}</h3>
            <p className="mb-2 text-sm font-semibold">{player.club} · {player.role} · {player.national}</p>
            <p className="mb-2 text-sm">{player.evidence}</p>
            <p className="mb-2 text-sm text-gray-600"><strong>Da osservare:</strong> {player.observe}</p>
            {!compact && <a href={player.source} className="mt-auto pt-1 text-xs font-semibold">Fonte FIGC →</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
