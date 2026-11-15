import type { StandingRow } from "../lib/home-standings";

export default function StandingsTable({ rows, title, expanded = false, compact = false }: { rows: StandingRow[]; title: string; expanded?: boolean; compact?: boolean }) {
  return (
    <div className={expanded ? "overflow-x-auto" : "max-h-80 overflow-auto"} tabIndex={0} role="region" aria-label={title}>
      <table className={"w-full min-w-max text-left tabular-nums " + (compact ? "text-[13px] leading-[17px]" : "text-sm")}>
        <thead className="sticky top-0 bg-gray-50">
          <tr>{["Pos.", "Squadra", "Pt", "G", "V", "N", "P", "GF", "GS", "DR"].map(label =>
            <th key={label} scope="col" className={compact ? "px-1.5 py-0.5" : "px-2 py-2"}>{label}</th>
          )}</tr>
        </thead>
        <tbody>{rows.map(([rank, name, points, played, won, drawn, lost, goalsFor, goalsAgainst]) => (
          <tr key={rank} className={name === "AC Milan" ? "bg-red-50 font-bold" : "border-t border-gray-100"}>
            {[rank, name, points, played, won, drawn, lost, goalsFor, goalsAgainst, goalsFor - goalsAgainst].map((value, index) =>
              <td key={index} className={(compact ? "px-1.5 py-0.5" : "px-2 py-2") + (index === 2 ? " font-bold" : "")}>{value}</td>
            )}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
