import { getTopScorers } from "../../lib/api-football";

export default async function FocusPage() {
  const data = await getTopScorers();

  const players = data?.response || [];

  const player = players[0];

  if (!player) {
    return (
      <main style={{ padding: 40 }}>
        <h1>📈 Focus Giocatore</h1>
        <p>Dati non disponibili.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: 24,
        color: "#111827",
        fontFamily: "Arial",
      }}
    >
      <section
        style={{
          background:
            "linear-gradient(135deg,#111827,#7f1d1d)",
          color: "white",
          padding: 32,
          borderRadius: 20,
          marginBottom: 24,
        }}
      >
        <h1>📈 Focus Giocatore</h1>
        <p>Analisi approfondita del rendimento stagionale</p>
      </section>

      <section
        style={{
          background: "white",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {player.player.photo && (
          <img
            src={player.player.photo}
            alt={player.player.name}
            style={{
              width: 180,
              borderRadius: "50%",
              marginBottom: 20,
            }}
          />
        )}

        <h2>{player.player.name}</h2>

        <p>
          <strong>Squadra:</strong>{" "}
          {player.statistics?.[0]?.team?.name}
        </p>

        <p>
          <strong>Presenze:</strong>{" "}
          {player.statistics?.[0]?.games?.appearences || 0}
        </p>

        <p>
          <strong>Gol:</strong>{" "}
          {player.statistics?.[0]?.goals?.total || 0}
        </p>

        <p>
          <strong>Assist:</strong>{" "}
          {player.statistics?.[0]?.goals?.assists || 0}
        </p>

        <hr />

        <h3>🤖 Analisi Milan Hub</h3>

        <p style={{ lineHeight: 1.8, fontSize: 18 }}>
          {player.player.name} sta vivendo una stagione positiva.
          I dati mostrano un contributo importante in termini di
          presenza offensiva, continuità e impatto sulle partite.
          Il suo rendimento rappresenta uno degli elementi più
          interessanti della stagione rossonera.
        </p>

        <h3>📊 Indicatori</h3>

        <ul>
          <li>Coinvolgimento offensivo elevato</li>
          <li>Buona continuità di rendimento</li>
          <li>Impatto diretto su gol e assist</li>
          <li>Presenza costante nelle partite</li>
        </ul>
      </section>
    </main>
  );
}