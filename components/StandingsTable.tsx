import type { StandingRow } from "../lib/home-standings";

export default function StandingsTable({ rows, title }: { rows: StandingRow[]; title: string }) {
  return (
    <div className="max-h-80 overflow-auto" tabIndex={0} role="region" aria-label={title}>
      <table className="w-full min-w-max text-left text-sm tabular-nums">
        <thead className="sticky top-0 bg-gray-50">
          <tr>{["Pos.", "Squadra", "Pt", "G", "V", "N", "P", "GF", "GS", "DR"].map(label =>
            <th key={label} scope="col" className="px-2 py-2">{label}</th>
          )}</tr>
        </thead>
        <tbody>{rows.map(([rank, name, points, played, won, drawn, lost, goalsFor, goalsAgainst]) => (
          <tr key={rank} className={name === "AC Milan" ? "bg-red-50 font-bold" : "border-t border-gray-100"}>
            {[rank, name, points, played, won, drawn, lost, goalsFor, goalsAgainst, goalsFor - goalsAgainst].map((value, index) =>
              <td key={index} className={index === 2 ? "px-2 py-2 font-bold" : "px-2 py-2"}>{value}</td>
            )}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
