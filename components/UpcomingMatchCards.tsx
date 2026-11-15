"use client";

import { useRef } from "react";

const milan = { name: "Milan", id: 489 };
const matches = [
  { date: "2026-11-22", time: "18:00", venue: "Stadio San Siro", opponent: { name: "Frosinone", id: 512 }, home: true, competition: "Serie A", league: 135, tickets: "https://booking.acmilan.com/serie-a/milan-frosinone/", note: "Partita sponsorizzata da Fondazione Milan" },
  { date: "2026-11-26", time: "18:45", venue: "Stadio Georgios Karaiskákis", opponent: { name: "Olympiacos", id: 553 }, home: false, competition: "Europa League", league: 3, tickets: "https://calcio2.vivaticket.it/it/event/europa-league-trasferta-olympiacos-fc-ac-milan/323080" },
  { date: "2026-11-30", time: "20:45", venue: "Unipol Domus", opponent: { name: "Cagliari", id: 490 }, home: false, competition: "Serie A", league: 135 },
  { date: "2026-12-06", time: "20:45", venue: "Stadio San Siro", opponent: { name: "Parma", id: 523 }, home: true, competition: "Serie A", league: 135, tickets: "https://booking.acmilan.com/serie-a/milan-parma/" },
  { date: "2026-12-10", time: "21:00", venue: "Stadio San Siro", opponent: { name: "Sunderland", id: 746 }, home: true, competition: "Europa League", league: 3, tickets: "https://booking.acmilan.com/europa-league/milan-sunderland/" },
  { date: "2026-12-13", time: "20:45", venue: "Stadio Diego Armando Maradona", opponent: { name: "Napoli", id: 492 }, home: false, competition: "Serie A", league: 135 },
  { date: "2026-12-19", time: "18:00", venue: "Stadio San Siro", opponent: { name: "Como", id: 895 }, home: true, competition: "Serie A", league: 135, tickets: "https://booking.acmilan.com/serie-a/milan-como/" },
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
            <li key={match.date} className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white [scroll-snap-align:start]">
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-start gap-2 text-sm">
                  <span className={match.home ? "bg-red-700 px-2 py-1 font-bold" : "bg-neutral-800 px-2 py-1 font-bold"} style={{ color: "white" }}>
                    {match.home ? "CASA" : "TRASFERTA"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <time dateTime={match.date} className="font-bold">{new Date(match.date).toLocaleDateString("it-IT", { day: "numeric", month: "short", timeZone: "Europe/Rome" })}</time>
                    <p className="text-xs text-gray-600">{match.venue}</p>
                  </div>
                  <img src={`https://media.api-sports.io/football/leagues/${match.league}.png`} alt={match.competition} className="h-8 w-8 object-contain" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="grid min-w-0 gap-2">
                    {(match.home ? [milan, match.opponent] : [match.opponent, milan]).map(team => (
                      <div key={team.id} className="flex items-center gap-2">
                        <img src={`https://media.api-sports.io/football/teams/${team.id}.png`} alt="" className="h-8 w-8 shrink-0 object-contain" />
                        <span className="text-base font-black uppercase">{team.name}</span>
                      </div>
                    ))}
                  </div>
                  <time dateTime={match.date + "T" + match.time + ":00+01:00"} className="shrink-0 border border-gray-200 bg-gray-100 px-2 py-1 text-lg font-bold tabular-nums">{match.time}</time>
                </div>
                {match.tickets && <a href={match.tickets} className="mt-auto self-end border border-red-700 px-3 py-2 text-sm font-bold">Acquista biglietti →</a>}
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-600">
                {match.competition}{match.note && " · " + match.note}
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-gray-600">Consulta il calendario ufficiale per le prossime date.</p>}
    </section>
  );
}
