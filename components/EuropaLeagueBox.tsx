import MatchCard from "./MatchCard";
import StandingsTable from "./StandingsTable";
import { europaLeague } from "../lib/home-standings";

const milan = { name: "Milan", id: 489 };

export default function EuropaLeagueBox() {
  return (
    <section id="europa" aria-labelledby="europa-title">
      <h2 id="europa-title" className="mb-4 border-b border-gray-200 pb-3 text-3xl">Europa League</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <MatchCard home={milan} away={{ name: "Ferencváros", id: 651 }} date="2026-11-05"
          venue="Stadio San Siro" competition="Europa League" league={3} value="0–2" status="FINITA"
          note="Giornata 4 · Joseph 52′, 66′" />
        <MatchCard home={{ name: "Olympiacos", id: 553 }} away={milan} date="2026-11-26"
          venue="Stadio Georgios Karaiskákis" competition="Europa League" league={3} value="18:45" status="TRASFERTA" note="Giornata 5 · Orario italiano" />
        <MatchCard home={milan} away={{ name: "Sunderland", id: 746 }} date="2026-12-10"
          venue="Stadio San Siro" competition="Europa League" league={3} value="21:00" status="CASA" note="Giornata 6 · Orario italiano" />
      </div>
      <div className="ac1899-box mt-4 p-5">
        <h3 className="mb-2 text-xl">Classifica completa · 36 squadre</h3>
        <p className="mb-3 text-sm text-gray-600">Fase campionato · dopo 4 giornate</p>
        <StandingsTable rows={europaLeague} title="Classifica completa Europa League" expanded compact />
        <p className="mt-3 text-xs text-gray-600">Classifica ufficiale AC Milan.</p>
      </div>
    </section>
  );
}
