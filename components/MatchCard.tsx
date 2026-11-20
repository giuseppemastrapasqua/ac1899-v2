export type MatchTeam = { name: string; logo?: string; id?: number };

export default function MatchCard({ home, away, date, venue, competition, league, value, status, note }: {
  home: MatchTeam;
  away: MatchTeam;
  date: string;
  venue?: string;
  competition: string;
  league: number;
  value: string;
  status: string;
  note?: string;
}) {
  return (
    <article className="ac1899-box flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start gap-2 text-sm">
          <span className={(status === "CASA" ? "bg-red-700" : "bg-neutral-800") + " px-2 py-1 font-bold"} style={{ color: "white" }}>{status}</span>
          <div className="min-w-0 flex-1">
            <time dateTime={date} className="font-bold">{new Date(date).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Rome" })}</time>
            {venue && <p className="text-xs text-gray-600">{venue}</p>}
          </div>
          <img src={`https://media.api-sports.io/football/leagues/${league}.png`} alt={competition} className="h-8 w-8 object-contain" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="grid min-w-0 gap-2">
            {[home, away].map(team => (
              <div key={team.name} className="flex items-center gap-2">
                {(team.logo || team.id) && <img src={team.logo ?? `https://media.api-sports.io/football/teams/${team.id}.png`} alt="" className="h-8 w-8 shrink-0 object-contain" />}
                <span className="text-base font-black uppercase">{team.name}</span>
              </div>
            ))}
          </div>
          <strong className="shrink-0 border border-gray-200 bg-gray-100 px-2 py-1 text-lg tabular-nums">{value}</strong>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-600">
        {competition}{note && " · " + note}
      </div>
    </article>
  );
}
