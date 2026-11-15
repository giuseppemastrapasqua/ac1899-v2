import EuropaMatchAnalyst from "../../../components/EuropaMatchAnalyst";
import CompetitionComparison from "../../../components/CompetitionComparison";

export default function EuropaAnalisiPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">Match Analyst AI · Europa League</h1>
        <EuropaMatchAnalyst />
        <CompetitionComparison title="Prossimo avversario · Olympiacos" opponent="Olympiacos"
          rows={[
            { label: "Partite", milan: 4, opponent: 4 }, { label: "Punti", milan: 3, opponent: 10 },
            { label: "Gol fatti", milan: 4, opponent: 4 }, { label: "Gol subiti", milan: 7, opponent: 1 },
            { label: "Possesso", milan: 54.25, opponent: 54, unit: "%" },
            { label: "Precisione dei passaggi", milan: 87, opponent: 85, unit: "%" },
            { label: "Passaggi completati", milan: 1815, opponent: 1679 },
            { label: "Palloni recuperati", milan: 148, opponent: 172 },
            { label: "Porte inviolate", milan: 1, opponent: 3 },
            { label: "Angoli battuti", milan: 18, opponent: 31 },
          ]}
          graphs={["Gol subiti", "Passaggi completati", "Palloni recuperati", "Angoli battuti"]}
          commentary={[
            "Olympiacos–Milan si gioca il 26 novembre alle 18:45 italiane al Georgios Karaiskákis. Dopo quattro giornate le squadre hanno segnato quattro gol a testa, ma i greci hanno concesso una sola rete contro sette.",
            "I 31 angoli dell’Olympiacos e tre gol di testa su quattro rendono importante il lavoro sulle palle inattive. Il Milan dovrà curare le marcature in area e le seconde palle.",
            "Il possesso medio è simile. L’Olympiacos ha recuperato 24 palloni in più, un dato da leggere insieme alla capacità del Milan di uscire dalla pressione vista contro il Ferencváros.",
          ]} source="UEFA (statistiche dopo quattro giornate), AC Milan (calendario)." />
      </div>
    </main>
  );
}
