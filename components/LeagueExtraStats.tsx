const rankings = [
  { title: "Cartellini gialli", columns: ["Gialli", "Espulsioni"], rows: [
    ["Gabriele Bracaglia", 5, 0], ["Alessandro Deiola", 4, 0], ["Jesper Karlström", 4, 0], ["Leo Østigard", 4, 0],
    ["Kialonda Gaspar", 3, 1], ["Lorenzo Lucchesi", 3, 1], ["Koni De Winter", 3, 0], ["Strahinja Pavlović", 3, 0],
  ] },
  { title: "Espulsioni", columns: ["Espulsioni", "Gialli"], rows: [
    ["Kialonda Gaspar", 1, 3], ["Lorenzo Lucchesi", 1, 3], ["Johan Vásquez", 1, 2], ["Donyell Malen", 1, 1],
    ["Eljif Elmas", 1, 1], ["Kristian Thorstvedt", 1, 1], ["Abdoulaye Ndiaye", 1, 0], ["Adam Obert", 1, 0],
    ["Gianluca Gaetano", 1, 0], ["Luca Marianucci", 1, 0],
  ] },
  { title: "Passaggi completati", columns: ["Ogni 90′", "Precisione"], rows: [
    ["Diogo Leite", 83.9, "93,2%"], ["Máximo Perrone", 82.4, "94,4%"], ["Luka Modrić", 79.4, "92,2%"],
    ["Ardon Jashari", 79.1, "92,1%"], ["Samuele Ricci", 77.7, "95,1%"], ["Alessandro Bastoni", 76.8, "91,6%"],
    ["Hakan Çalhanoğlu", 76.5, "91,4%"], ["Pape Sarr", 75.6, "94,2%"], ["Luis Milla", 75.4, "93,0%"], ["Billy Gilmour", 72.2, "87,9%"],
  ] },
  { title: "Tiri nello specchio", columns: ["Ogni 90′", "Precisione"], rows: [
    ["Daniel Bîrligea", 3, "42,9%"], ["Edon Zhegrova", 2.9, "50,0%"], ["Ange-Yoan Bonny", 2.6, "50,0%"],
    ["Donyell Malen", 2.5, "43,9%"], ["Zakaria Aboukhlal", 2.5, "37,5%"], ["David Romero", 2, "62,5%"],
    ["Nikola Krstović", 1.9, "45,5%"], ["Samuel Mbangula", 1.9, "44,4%"], ["Cristian Volpato", 1.7, "80,0%"], ["Dany Mota", 1.7, "53,8%"],
  ] },
] as const;

const matchDistances = [
  {
    title: "Serie A · Confronto tra squadre",
    match: "Torino–Lecce · 7 novembre 2026 · 11ª giornata 2026/27 · 2 squadre su 20",
    rows: [
      ["Oumar Ngom", "Lecce", 12.676], ["Daniel Bragança", "Torino", 11.701],
      ["Rafik Belghali", "Torino", 11.454], ["Amar Fatah", "Lecce", 11.276],
      ["Pietro Comuzzo", "Torino", 11.222], ["Giovanni Simeone", "Torino", 11.151],
      ["Danilo Veiga", "Lecce", 11.134], ["Youssef Maleh", "Lecce", 11.064],
      ["Saúl Coco", "Torino", 10.789], ["Antonino Gallo", "Lecce", 10.703],
    ],
  },
] as const;

export default function LeagueExtraStats() {
  return <section className="space-y-3" aria-labelledby="league-extra-stats">
    <h2 id="league-extra-stats" className="text-3xl">Disciplina, passaggi e tiri</h2>
    <div className="grid gap-3 md:grid-cols-2">
      {rankings.map(({ title, columns, rows }) => <div key={title} className="ac1899-box p-3 sm:p-4">
        <table className="w-full text-left text-sm tabular-nums">
          <caption className="mb-2 text-left text-xl font-bold">{title}</caption>
          <thead className="bg-gray-100"><tr><th scope="col" className="p-2">Giocatore</th>{columns.map(column =>
            <th key={column} scope="col" className="p-2 text-right">{column}</th>
          )}</tr></thead>
          <tbody>{rows.map(([name, primary, secondary]) => <tr key={name} className="border-b border-gray-100">
            <th scope="row" className="p-2 font-medium">{name}</th>
            <td className="p-2 text-right">{primary.toLocaleString("it-IT")}</td>
            <td className="p-2 text-right">{secondary.toLocaleString("it-IT")}</td>
          </tr>)}</tbody>
        </table>
        <p className="mt-2 text-xs text-gray-600">FotMob · Serie A 2026/27 · rilevazione del 15 novembre 2026.</p>
      </div>)}
    </div>
    <div className="ac1899-box p-4">
      <h3 className="text-xl">Distanza percorsa · AC Milan</h3>
      <dl className="mt-2 flex flex-wrap gap-6">
        <div><dt>Media di squadra per partita</dt><dd className="text-2xl font-bold">118 km</dd></div>
        <div><dt>Totale in 11 giornate</dt><dd className="text-2xl font-bold">1.300 km</dd></div>
      </dl>
      <p className="mt-2 text-xs text-gray-600">Lega Serie A · dati di squadra.</p>
      <p className="mt-2 text-sm text-gray-700">I report ufficiali della Lega Serie A pubblicano i chilometri percorsi <strong>nella singola gara</strong> per i cinque giocatori che hanno corso di più per squadra. Per calcolare la media stagionale di ogni calciatore servono anche le distanze delle partite in cui è sceso in campo fuori da quella top 5. Quei dati non risultano disponibili nelle fonti che ho trovato, né per l’intera rosa del Milan né per tutta la Serie A.</p>
    </div>
    <div id="km-singola-gara">
      {matchDistances.map(({ title, match, rows }) => <div key={title} className="ac1899-box p-4">
        <table className="w-full text-left text-sm tabular-nums">
          <caption className="mb-2 text-left"><strong className="text-xl">{title}</strong><span className="block text-xs text-gray-600">{match}</span></caption>
          <thead className="bg-gray-100"><tr><th scope="col" className="p-2">Giocatore</th><th scope="col" className="p-2">Squadra</th><th scope="col" className="p-2 text-right">Km in gara</th></tr></thead>
          <tbody>{rows.map(([name, team, km]) => <tr key={name} className="border-b border-gray-100">
            <th scope="row" className="p-2 font-medium">{name}</th><td className="p-2">{team}</td>
            <td className="p-2 text-right">{km.toLocaleString("it-IT", { minimumFractionDigits: 3 })}</td>
          </tr>)}</tbody>
        </table>
        <p className="mt-2 text-xs text-gray-600">Fonte: report gara della Lega Serie A.</p>
      </div>)}
    </div>
  </section>;
}
