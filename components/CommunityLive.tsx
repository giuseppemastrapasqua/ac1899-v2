"use client";

import { communityMatchday, formatCommunityKickoff } from "../lib/community-matchday";
import { useEffect, useState } from "react";
import type { getCommunityScoreboard } from "../lib/api-football";

type Fixtures = NonNullable<Awaited<ReturnType<typeof getCommunityScoreboard>>>;

export default function CommunityLive() {
  const [fixtures, setFixtures] = useState<Fixtures>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/community/live", { signal: controller.signal });
        if (!response.ok) throw new Error("Risultati indisponibili");
        const data = await response.json();
        if (controller.signal.aborted) return;
        setFixtures(data.fixtures);
        setState("ready");
      } catch {
        if (!controller.signal.aborted) setState("error");
      }
    }
    void refresh();
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return <section id="live" className="ac1899-box space-y-3 p-4" aria-labelledby="community-live">
    <h2 id="community-live" className="text-2xl">Live · Risultati e azioni del Milan</h2>
    <p className="text-sm text-gray-600">Serie A e partite del Milan anche nelle altre competizioni. Aggiornamento automatico ogni minuto.</p>
    <p role="status" className="text-sm">
      {state === "loading" && "Caricamento risultati…"}
      {state === "error" && (fixtures.length ? "Aggiornamento interrotto. Sono visibili gli ultimi dati ricevuti." : "Feed risultati temporaneamente non disponibile.")}
      {state === "ready" && !fixtures.length && "Nessuna partita in corso."}
    </p>
    {fixtures.map(match => <article key={match.id} className="rounded-lg border border-gray-200 p-3">
      <p className="text-xs text-gray-600">{match.league} · {match.status === "HT" ? "Intervallo" : match.minute === null ? "In diretta" : `${match.minute}′`}</p>
      <h3 className="text-lg">{match.home} {match.goals.home ?? "—"}–{match.goals.away ?? "—"} {match.away}</h3>
      {match.milan && <div className="mt-2">
        <h4 className="font-bold">Azioni principali</h4>
        {match.events.length ? <ol className="divide-y divide-gray-100">{match.events.map((event, index) =>
          <li className="py-1 text-sm" key={index}>
            <strong>{event.minute}{event.extra ? `+${event.extra}` : ""}′ · {event.action}</strong> · {event.player ? `${event.player} (${event.team})` : event.team}
          </li>
        )}</ol> : <p className="text-sm">In attesa degli episodi dal feed.</p>}
      </div>}
    </article>)}
    <section aria-labelledby="community-matchday">
      <h3 id="community-matchday" className="mb-2 text-xl">Calendario · 12ª giornata Serie A 2026/27</h3>
      <ol className="grid gap-2 sm:grid-cols-2">
        {communityMatchday.map(([kickoff, home, away]) => <li key={home} className={`rounded-lg border p-3 ${home === "Milan" ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
          <time className="block text-xs text-gray-600" dateTime={kickoff}>{formatCommunityKickoff(kickoff)}</time>
          <strong>{home}–{away}</strong>
        </li>)}
      </ol>
      <p className="mt-2 text-xs text-gray-600">Fonte: Lega Serie A. Orari italiani.</p>
    </section>
  </section>;
}
