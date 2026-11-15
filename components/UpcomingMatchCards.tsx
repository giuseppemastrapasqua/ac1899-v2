"use client";

import { useRef } from "react";
import MatchCard from "./MatchCard";

const milan = { name: "Milan", id: 489 };
const matches = [
  { date: "2026-11-22", time: "18:00", venue: "Stadio San Siro", opponent: { name: "Frosinone", id: 512 }, home: true, competition: "Serie A", league: 135, note: "Partita sponsorizzata da Fondazione Milan" },
  { date: "2026-11-26", time: "18:45", venue: "Stadio Georgios Karaiskákis", opponent: { name: "Olympiacos", id: 553 }, home: false, competition: "Europa League", league: 3 },
  { date: "2026-11-30", time: "20:45", venue: "Unipol Domus", opponent: { name: "Cagliari", id: 490 }, home: false, competition: "Serie A", league: 135 },
  { date: "2026-12-06", time: "20:45", venue: "Stadio San Siro", opponent: { name: "Parma", id: 523 }, home: true, competition: "Serie A", league: 135 },
  { date: "2026-12-10", time: "21:00", venue: "Stadio San Siro", opponent: { name: "Sunderland", id: 746 }, home: true, competition: "Europa League", league: 3 },
  { date: "2026-12-13", time: "20:45", venue: "Stadio Diego Armando Maradona", opponent: { name: "Napoli", id: 492 }, home: false, competition: "Serie A", league: 135 },
  { date: "2026-12-19", time: "18:00", venue: "Stadio San Siro", opponent: { name: "Como", id: 895 }, home: true, competition: "Serie A", league: 135 },
];

export default function UpcomingMatchCards({ today }: { today: string }) {
  const row = useRef<HTMLUListElement>(null);
  const upcoming = matches.filter(match => match.date >= today);
  const calendar = "https://www.acmilan.com/it/stagione/attiva/calendario/completo";

  function scroll(direction: number) {
    const list = row.current;
    if (!list) return;
    list.scrollBy({ left: direction * (list.firstElementChild?.clientWidth ?? list.clientWidth) + direction * 16, behavior: "auto" });
  }

  return (
    <section aria-labelledby="upcoming-matches">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <h2 id="upcoming-matches" className="text-3xl">Prossime partite</h2>
        <div className="flex items-center gap-3">
          <a href={calendar} className="text-sm font-semibold">Calendario ufficiale →</a>
          {upcoming.length > 1 && (
            <div className="flex gap-1">
              <button type="button" aria-label="Scorri alle partite precedenti" onClick={() => scroll(-1)} className="rounded border border-gray-300 px-3 py-1">‹</button>
              <button type="button" aria-label="Scorri alle partite successive" onClick={() => scroll(1)} className="rounded bg-red-700 px-3 py-1 text-white" style={{ color: "white" }}>›</button>
            </div>
          )}
        </div>
      </div>
      {upcoming.length ? (
        <ul ref={row} className="grid auto-cols-[min(88%,21rem)] grid-flow-col gap-4 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] md:auto-cols-[calc((100%-2rem)/3)] xl:auto-cols-[calc((100%-3rem)/4)]">
          {upcoming.map(match => (
            <li key={match.date} className="h-full [scroll-snap-align:start]">
              <MatchCard
                home={match.home ? milan : match.opponent}
                away={match.home ? match.opponent : milan}
                date={match.date}
                venue={match.venue}
                competition={match.competition}
                league={match.league}
                value={match.time}
                status={match.home ? "CASA" : "TRASFERTA"}
                note={match.note}
              />
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-gray-600">Consulta il calendario ufficiale per le prossime date.</p>}
    </section>
  );
}
