import CompetitionComparison from "./CompetitionComparison";

export default function EuropaOpponent() {
  return (
    <CompetitionComparison title="Prossimo avversario · Olympiacos" opponent="Olympiacos"
          rows={[
            { label: "Partite", milan: 4, opponent: 4 }, { label: "Punti", milan: 3, opponent: 10 },
            { label: "Gol fatti", milan: 4, opponent: 4 }, { label: "Gol subiti", milan: 7, opponent: 1 },
            { label: "Possesso", milan: 54.25, opponent: 54, unit: "%" },
            { label: "Precisione dei passaggi", milan: 87, opponent: 85, unit: "%" },
            { label: "Passaggi completati", milan: 1815, opponent: 1679 },
            { label: "Palloni recuperati", milan: 148, opponent: 172 },
            { label: "Gol subiti per gara", milan: 7 / 4, opponent: 1 / 4 },
            { label: "Recuperi per gara", milan: 148 / 4, opponent: 172 / 4 },
            { label: "Angoli per gara", milan: 18 / 4, opponent: 31 / 4 },
            { label: "Porte inviolate", milan: 1, opponent: 3 },
            { label: "Angoli battuti", milan: 18, opponent: 31 },
          ]}
          graphs={["Gol subiti per gara", "Passaggi completati", "Recuperi per gara", "Angoli per gara", "Porte inviolate", "Precisione dei passaggi"]}
          commentary={[
            "Olympiacos–Milan si gioca il 26 novembre alle 18:45 italiane al Georgios Karaiskákis. Dopo quattro giornate le squadre hanno segnato quattro gol a testa, ma i greci hanno concesso una sola rete contro sette.",
            "I 31 angoli dell’Olympiacos e tre gol di testa su quattro rendono importante il lavoro sulle palle inattive. Il Milan dovrà curare le marcature in area e le seconde palle.",
            "L’Olympiacos ha lasciato la porta inviolata in tre gare su quattro. Per il Milan sarà importante capire se riesce a ricevere tra le linee prima che il blocco greco si ricompatti dopo aver perso palla.",
            "Il possesso medio è simile. L’Olympiacos ha recuperato 24 palloni in più, un dato da leggere insieme alla capacità del Milan di uscire dalla pressione vista contro il Ferencváros.",
          ]} source="UEFA (statistiche dopo quattro giornate), AC Milan (calendario)." />
  );
}
