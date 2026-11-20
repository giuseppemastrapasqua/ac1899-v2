import MatchAnalysisLayout from "./MatchAnalysisLayout";
import { lineups } from "./GenoaMilanReport";

const stats = [
  {
    group: "Possesso e costruzione",
    rows: [
      ["Possesso", "38%", "62%"],
      ["Passaggi tentati", "335", "576"],
      ["Passaggi riusciti", "263", "488"],
      ["Precisione dei passaggi", "79%", "85%"],
      ["Tocchi in area avversaria", "25", "14"],
    ],
  },
  {
    group: "Conclusioni e occasioni",
    rows: [
      ["Gol", "1", "2"],
      ["Tiri totali", "17", "6"],
      ["Tiri nello specchio", "5", "2"],
      ["Tiri fuori", "6", "3"],
      ["Tiri respinti", "6", "1"],
      ["Tiri in area / da fuori", "7 / 10", "4 / 2"],
      ["Precisione al tiro", "29%", "33%"],
      ["Gol attesi (xG)", "1,15", "0,63"],
      ["xG per tiro", "0,07", "0,11"],
      ["xG dei tiri in porta (xGOT)", "0,63", "1,33"],
      ["Grandi occasioni", "2", "2"],
    ],
  },
  {
    group: "Palle inattive e disciplina",
    rows: [
      ["Calci d’angolo", "3", "0"],
      ["Fuorigioco", "3", "1"],
      ["Falli commessi", "14", "13"],
      ["Ammonizioni", "2", "5"],
      ["Espulsioni", "0", "0"],
    ],
  },
];

const phases = [
  ["13′", "Cissè", "0–1"],
  ["19′", "Pulisic", "0–2"],
  ["45′", "Intervallo", "0–2"],
  ["88′", "Ellertsson", "1–2"],
  ["90′+", "Finale", "1–2"],
];

export default function MatchAnalyst() {
  return (
    <MatchAnalysisLayout id="match-analyst"
      subtitle="Genoa–Milan 1–2 · Serie A, 11ª giornata · Luigi Ferraris · 8 novembre 2026"
      teams={[{ name: "Genoa", xg: 1.15 }, { name: "Milan", xg: 0.63 }]}
      stats={stats} phases={phases} lineups={lineups}
      sources="Fonti: Flashscore (tiri e xG), Ludistat (passaggi, falli ed espulsioni), AC Milan (ammonizioni).">
          <div>
            <h4 className="font-bold">Primo tempo · Due recuperi cambiano la partita</h4>
            <p>Osmajić sfiora il palo nel primo minuto, poi il Milan risponde con Ramos. Il vantaggio nasce dal recupero di Rabiot e dal suo passaggio per Cissè al 13′. Sei minuti dopo, un altro pallone riconquistato in avanti porta al raddoppio: Ramos serve Pulisic, che firma lo 0–2. Prima dell’intervallo Maignan interviene su Wiafe al 40′ e sul colpo di testa di Østigård al 44′.</p>
          </div>
          <div>
            <h4 className="font-bold">Ripresa · Il Genoa accorcia nel finale</h4>
            <p>De Rossi cambia con Baldanzi ed El Shaarawy, mentre Amorim inserisce Hutchinson e Terracciano. De Winter chiude su Osmajić al 69′, Maignan ferma Vitinha al 73′ e Gila devia il tentativo di El Shaarawy al 79′. All’88′ Ellertsson accorcia con un tiro dalla distanza. Il Milan conserva il vantaggio nei sette minuti di recupero.</p>
          </div>
          <div>
            <h4 className="font-bold">Lettura tattica · Possesso e volume offensivo</h4>
            <p>Nel 4-4-1-1 del Milan, Pulisic parte dietro Ramos. I due gol nascono da recuperi seguiti da una giocata rapida verso la porta. Il Milan tiene il 62% del pallone e segna con entrambi i tiri nello specchio. Il Genoa, schierato 3-4-2-1, calcia 17 volte contro 6 e totalizza più xG (1,15–0,63). Dieci conclusioni genoane arrivano da fuori area, ma i 25 tocchi nell’area rossonera mostrano che la pressione ha prodotto anche incursioni ravvicinate.</p>
          </div>
          <div>
            <h4 className="font-bold">Qualità delle occasioni</h4>
            <p>Il Genoa ha generato più pericoli nel complesso, ma il Milan ha prodotto più xG per tiro (0,11 contro 0,07, valori arrotondati). Le grandi occasioni sono state due per parte. Le sei conclusioni respinte del Genoa spiegano parte del divario tra tiri totali e tiri arrivati in porta.</p>
          </div>
          <div>
            <h4 className="font-bold">Protagonisti e punto da migliorare</h4>
            <p>Pulisic, votato MVP dai tifosi, realizza il gol decisivo. Rabiot e Ramos firmano gli assist, mentre Maignan protegge il vantaggio in più fasi. La priorità emersa dal finale è limitare gli ingressi in area e le seconde conclusioni quando il Milan difende un vantaggio.</p>
          </div>
    </MatchAnalysisLayout>
  );
}
