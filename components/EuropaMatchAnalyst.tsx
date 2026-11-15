import MatchAnalysisLayout from "./MatchAnalysisLayout";

const stats = [
  { group: "Possesso e costruzione", rows: [
    ["Possesso", "70%", "30%"], ["Passaggi tentati", "672", "288"],
    ["Passaggi riusciti", "591", "205"], ["Precisione dei passaggi", "88%", "71%"],
    ["Passaggi riusciti nell’ultimo terzo", "155", "66"], ["Cross riusciti / tentati", "8 / 28", "1 / 12"],
    ["Tocchi in area avversaria", "26", "22"],
  ] },
  { group: "Conclusioni e occasioni", rows: [
    ["Gol", "0", "2"], ["Tiri totali", "15", "12"], ["Tiri nello specchio", "2", "8"],
    ["Tiri in area / da fuori", "8 / 7", "12 / 0"], ["Tiri respinti", "5", "1"], ["Tiri fuori", "8", "3"],
    ["Gol attesi (xG)", "1,22", "3,11"], ["xG dei tiri in porta (xGOT)", "0,07", "3,38"],
    ["Grandi occasioni", "2", "5"], ["Parate", "6", "2"],
  ] },
  { group: "Difesa e disciplina", rows: [
    ["Intercetti", "10", "13"], ["Respinte difensive", "24", "41"],
    ["Calci d’angolo", "2", "4"], ["Falli commessi", "9", "13"],
    ["Ammonizioni", "2", "1"], ["Espulsioni", "0", "1"],
  ] },
];

const phases = [["45′", "Intervallo", "0–0"], ["52′", "Joseph", "0–1"], ["66′", "Joseph", "0–2"], ["77′", "Rosso a Yusuf", "0–2"], ["90′+", "Finale", "0–2"]];

const lineups = [
  {
    team: "Milan", formation: "4-4-1-1", coach: "Rúben Amorim",
    starters: ["Torriani", "Terracciano", "De Winter", "Diawara", "Bartesaghi", "Hutchinson", "Jashari", "Musah", "Cissè", "Rabiot", "Ramos"],
    changes: ["46′ Gila per Diawara", "46′ Moreira per Musah", "46′ Pulisic per Cissè", "63′ Modrić per Jashari", "67′ Camarda per Bartesaghi"],
    bench: ["Bouyer", "Pittarella", "Estupiñán", "Vladimirov", "Comotto"],
  },
  {
    team: "Ferencváros", formation: "4-3-3", coach: "Borbély",
    starters: ["Dibusz", "Cadu", "Raemaekers", "Gómez", "Osváth", "Corbu", "Á. Nagy", "Bero", "Birmančević", "Joseph", "Zachariassen"],
    changes: ["67′ Madarász per Bero", "67′ Yusuf per Joseph", "86′ Levi per Birmančević", "86′ Maïga per Zachariassen", "90′+2 Arzani per Corbu"],
    bench: ["Á. Varga", "Bagi", "Keïta", "O. Nagy", "Rommens", "Z. Varga", "Zohoré"],
  },
];

export default function EuropaMatchAnalyst() {
  return (
    <MatchAnalysisLayout id="europa-match-analyst"
      subtitle="Milan–Ferencváros 0–2 · Europa League, 4ª giornata · San Siro · 5 novembre 2026"
      teams={[{ name: "Milan", xg: 1.22 }, { name: "Ferencváros", xg: 3.11 }]}
      stats={stats} phases={phases} lineups={lineups}
      sources="Fonti: Flashscore (statistiche), AC Milan (cronaca, formazioni e cartellini).">
      <div>
        <h4 className="font-bold">Primo tempo · Torriani tiene lo 0–0</h4>
        <p>Il Ferencváros trova spazio con Joseph e Zachariassen. Al 26′ Joseph si presenta davanti a Torriani dopo una palla persa in uscita, ma il portiere chiude lo specchio. Il Milan prova a rispondere con Cissè, che calcia alto dopo una sponda di Ramos.</p>
      </div>
      <div>
        <h4 className="font-bold">Ripresa · Due gol in quattordici minuti</h4>
        <p>Amorim inserisce Gila, Moreira e Pulisic all’intervallo. Al 52′ Zachariassen aggredisce il retropassaggio di De Winter e Joseph segna a porta vuota. Hutchinson reagisce colpendo il palo. Al 66′ Zachariassen serve ancora Joseph in ripartenza per lo 0–2.</p>
      </div>
      <div>
        <h4 className="font-bold">Possesso e pericolosità</h4>
        <p>Il Milan ha il 70% di possesso e completa 591 passaggi, ma inquadra la porta due volte su 15. Il Ferencváros tira 12 volte, sempre dall’area, centra lo specchio otto volte e produce cinque grandi occasioni contro due. Il divario negli xG (1,22–3,11) riflette soprattutto la qualità delle opportunità ospiti.</p>
      </div>
      <div>
        <h4 className="font-bold">Finale e correzioni</h4>
        <p>Il rosso a Yusuf al 77′ lascia gli ospiti in dieci. Il Milan insiste, senza cambiare il risultato, e Torriani chiude con sei parate. Le due priorità emerse sono offrire più appoggi al portiere contro la pressione e proteggere il centro quando si perde palla.</p>
      </div>
    </MatchAnalysisLayout>
  );
}
