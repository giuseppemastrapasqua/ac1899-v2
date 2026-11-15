import MatchAnalyst from "../../../components/MatchAnalyst";
import CompetitionComparison from "../../../components/CompetitionComparison";

export default function CampionatoAnalisiPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">Match Analyst AI · Serie A</h1>
        <MatchAnalyst />
        <CompetitionComparison title="Prossimo avversario · Frosinone" opponent="Frosinone"
          rows={[
            { label: "Posizione", milan: 4, opponent: 6 }, { label: "Punti", milan: 24, opponent: 20 },
            { label: "Partite", milan: 11, opponent: 11 }, { label: "Vittorie", milan: 7, opponent: 6 },
            { label: "Pareggi", milan: 3, opponent: 2 }, { label: "Sconfitte", milan: 1, opponent: 3 },
            { label: "Gol fatti", milan: 23, opponent: 24 }, { label: "Gol subiti", milan: 13, opponent: 15 },
            { label: "Possesso medio", milan: 59, opponent: 47.4, unit: "%" },
            { label: "Precisione dei passaggi", milan: 88.6, opponent: 75.3, unit: "%" },
            { label: "Angoli per partita", milan: 2.7, opponent: 7.1 },
            { label: "xG per partita", milan: 1.5, opponent: 1.7 }, { label: "xG concessi per partita", milan: 1.2, opponent: 2 },
          ]}
          graphs={["Gol fatti", "Gol subiti", "xG per partita", "xG concessi per partita"]}
          commentary={[
            "Milan–Frosinone si gioca il 22 novembre alle 18:00 a San Siro. Dopo 11 giornate il Frosinone è sesto, ha segnato un gol in più del Milan e ne ha subiti due in più.",
            "Il Frosinone produce circa 1,7 xG a gara, ne concede 2,0 e batte 7,1 angoli di media. Per il Milan, un aspetto da osservare è la capacità di sfruttare gli spazi subito dopo il recupero del pallone, mantenendo copertura quando attacca.",
            "Gli xG sono medie stagionali della fonte e descrivono il rendimento osservato. Non sono un pronostico per questa partita.",
          ]} source="AC Milan (calendario e classifica), StatsNext (xG per partita)." />
      </div>
    </main>
  );
}
