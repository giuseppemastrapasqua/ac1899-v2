import MatchAnalyst from "../../../components/MatchAnalyst";
import CompetitionComparison from "../../../components/CompetitionComparison";

export default function CampionatoAnalisiPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">Match Analyst AI · Serie A</h1>
        <CompetitionComparison title="Prossimo avversario · Frosinone" opponent="Frosinone"
          rows={[
            { label: "Posizione", milan: 4, opponent: 6 }, { label: "Punti", milan: 24, opponent: 20 },
            { label: "Partite", milan: 11, opponent: 11 }, { label: "Vittorie", milan: 7, opponent: 6 },
            { label: "Pareggi", milan: 3, opponent: 2 }, { label: "Sconfitte", milan: 1, opponent: 3 },
            { label: "Gol fatti", milan: 23, opponent: 24 }, { label: "Gol subiti", milan: 13, opponent: 15 },
            { label: "Punti per gara", milan: 24 / 11, opponent: 20 / 11 },
            { label: "Percentuale di vittorie", milan: 7 / 11 * 100, opponent: 6 / 11 * 100, unit: "%" },
            { label: "Gol per gara", milan: 23 / 11, opponent: 24 / 11 },
            { label: "Gol subiti per gara", milan: 13 / 11, opponent: 15 / 11 },
            { label: "Possesso medio", milan: 59, opponent: 47.4, unit: "%" },
            { label: "Precisione dei passaggi", milan: 88.6, opponent: 75.3, unit: "%" },
            { label: "Angoli per partita", milan: 2.7, opponent: 7.1 },
            { label: "xG per partita", milan: 1.5, opponent: 1.7 }, { label: "xG concessi per partita", milan: 1.2, opponent: 2 },
          ]}
          graphs={["Punti per gara", "Gol per gara", "Gol subiti per gara", "xG per partita", "xG concessi per partita", "Angoli per partita", "Possesso medio", "Precisione dei passaggi"]}
          commentary={[
            "Milan–Frosinone si gioca il 22 novembre alle 18:00 a San Siro. Dopo 11 giornate il Frosinone è sesto, ha segnato un gol in più del Milan e ne ha subiti due in più.",
            "Il Frosinone produce circa 1,7 xG a gara, ne concede 2,0 e batte 7,1 angoli di media. Per il Milan, un aspetto da osservare è la capacità di sfruttare gli spazi subito dopo il recupero del pallone, mantenendo copertura quando attacca.",
            "Il Milan ha più possesso e una precisione superiore di 13,3 punti percentuali. Il Frosinone ha comunque segnato 24 reti. Sarà utile osservare quante volte riesce a entrare in area dopo un recupero o a guadagnare un angolo.",
            "Gli xG sono medie stagionali della fonte e descrivono il rendimento osservato. Non sono un pronostico per questa partita.",
          ]} source="AC Milan (calendario e classifica), StatsNext (xG per partita)." />
        <CompetitionComparison title="Ultima partita · Genoa 1–2 Milan" opponent="Genoa"
          rows={[
            { label: "Possesso", milan: 62, opponent: 38, unit: "%" },
            { label: "Tiri totali", milan: 6, opponent: 17 },
            { label: "Tiri nello specchio", milan: 2, opponent: 5 },
            { label: "Tiri in area", milan: 4, opponent: 7 },
            { label: "Tiri da fuori", milan: 2, opponent: 10 },
            { label: "Grandi occasioni", milan: 2, opponent: 2 },
            { label: "xG", milan: 0.63, opponent: 1.15 },
            { label: "xG per tiro", milan: 0.63 / 6, opponent: 1.15 / 17 },
            { label: "xG dei tiri in porta", milan: 1.33, opponent: 0.63 },
            { label: "Gol per tiro", milan: 2 / 6 * 100, opponent: 1 / 17 * 100, unit: "%" },
          ]}
          graphs={["Possesso", "Tiri totali", "Tiri in area", "xG", "xG dei tiri in porta", "Gol per tiro"]}
          commentary={[
            "Al Milan sono bastati sei tiri: ha segnato con un terzo dei tentativi. Il Genoa ha tirato quasi tre volte di più, ma dieci conclusioni sono arrivate da fuori area.",
            "Il Genoa ha generato più xG complessivi. Il Milan ha creato in media occasioni migliori per tiro e, una volta centrato lo specchio, ha prodotto un valore xGOT superiore.",
            "Per valutare la gestione del vantaggio, il dato da incrociare con i 17 tiri del Genoa è quello degli ingressi in area: 25 tocchi nell’area del Milan indicano una pressione che è arrivata anche vicino alla porta.",
          ]} source="Flashscore, Ludistat e resoconto AC Milan. Conversione e xG per tiro calcolati sui totali." />
        <MatchAnalyst />
      </div>
    </main>
  );
}
