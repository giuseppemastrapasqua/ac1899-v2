import { serieA } from "../lib/home-standings";

export default function LeagueCharts() {
  const metrics = [
    { title: "Migliori attacchi", value: (row: typeof serieA[number]) => row[7], unit: "gol", order: -1 },
    { title: "Migliori difese", value: (row: typeof serieA[number]) => row[8], unit: "gol subiti", order: 1 },
    { title: "Punti per partita", value: (row: typeof serieA[number]) => row[2] / row[3], unit: "punti", order: -1 },
    { title: "Percentuale di vittorie", value: (row: typeof serieA[number]) => row[4] / row[3] * 100, unit: "%", order: -1 },
  ];
  return <section aria-label="Grafici della Serie A" className="grid gap-3 md:grid-cols-2">
    {metrics.map(({ title, value, unit, order }) => {
      const leaders = [...serieA].sort((a,b) => order * (value(a) - value(b))).slice(0, 5);
      const milan = serieA.find(row => row[1] === "AC Milan");
      const rows = milan && !leaders.includes(milan) ? [...leaders, milan] : leaders;
      const max = Math.max(...rows.map(value));
      return <figure key={title} className="ac1899-box p-4">
        <figcaption className="text-xl font-bold">{title}</figcaption>
        {rows.map(row => <div key={row[1]} className="mt-2">
          <div className="flex justify-between gap-2 text-sm"><span>{row[1]}</span><span>{value(row).toLocaleString("it-IT", { maximumFractionDigits: 2 })} {unit}</span></div>
          <div aria-hidden="true" className="h-2 rounded bg-gray-100"><div className={row[1] === "AC Milan" ? "h-full rounded bg-red-600" : "h-full rounded bg-slate-500"} style={{ width: value(row) / max * 100 + "%" }} /></div>
        </div>)}
      </figure>;
    })}
  </section>;
}
