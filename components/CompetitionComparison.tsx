type Metric = { label: string; milan: number; opponent: number; unit?: string };
const format = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });

export default function CompetitionComparison({ title, opponent, rows, graphs, commentary, source }: {
  title: string; opponent: string; rows: Metric[]; graphs: string[]; commentary: string[]; source: string;
}) {
  return (
    <section aria-label={title} className="ac1899-box p-4 sm:p-5">
      <h2 className="mb-3 text-3xl">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <table className="w-full self-start text-left text-sm tabular-nums">
          <thead><tr className="bg-gray-100"><th scope="col" className="p-2">Indicatore</th><th scope="col" className="p-2 text-right">Milan</th><th scope="col" className="p-2 text-right">{opponent}</th></tr></thead>
          <tbody>{rows.map(row => (
            <tr key={row.label} className="border-b border-gray-100">
              <th scope="row" className="p-2 font-medium">{row.label}</th>
              <td className="p-2 text-right">{format.format(row.milan)}{row.unit}</td>
              <td className="p-2 text-right">{format.format(row.opponent)}{row.unit}</td>
            </tr>
          ))}</tbody>
        </table>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.filter(row => graphs.includes(row.label)).map(row => {
              const scale = Math.max(row.milan, row.opponent, 1);
              return <figure key={row.label}>
                <figcaption className="text-sm font-bold">{row.label}</figcaption>
                {[[row.milan, "Milan", "bg-red-600"], [row.opponent, opponent, "bg-slate-600"]].map(([value, team, color]) => (
                  <div key={team} className="mt-1">
                    <div className="flex justify-between gap-2 text-xs"><span>{team}</span><span>{format.format(Number(value))}{row.unit}</span></div>
                    <div className="h-2 overflow-hidden rounded bg-gray-100"><div className={color + " h-full rounded"} style={{ width: Number(value) / scale * 100 + "%" }} /></div>
                  </div>
                ))}
              </figure>;
            })}
          </div>
          <div className="space-y-2 text-sm leading-relaxed">{commentary.map(text => <p key={text}>{text}</p>)}</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-600">Fonte: {source}</p>
    </section>
  );
}
