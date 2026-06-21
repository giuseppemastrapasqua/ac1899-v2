import { getTopScorers } from "../../lib/api-football";

export default async function MvpPage() {
  const data = await getTopScorers();

  const players = data?.response || [];

  const topPlayer = [...players].sort(
    (a: any, b: any) =>
      (b.statistics?.[0]?.goals?.total || 0) -
      (a.statistics?.[0]?.goals?.total || 0)
  )[0];

  if (!topPlayer) {
    return (
      <main style={{ padding: 40 }}>
        <h1>⭐ Migliore in campo</h1>
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
        fontFamily: "Arial",
        color: "#111827",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg,#111827,#7f1d1d)",
          color: "white",
          padding: 32,
          borderRadius: 20,
          marginBottom: 24,
        }}
      >
        <h1>⭐ MVP Milan Hub</h1>
        <p>Giocatore più decisivo secondo i dati disponibili</p>
      </section>

      <section
        style={{
          background: "white",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {topPlayer.player.photo && (
          <img
            src={topPlayer.player.photo}
            alt={topPlayer.player.name}
            style={{
              width: 180,
              borderRadius: "50%",
              marginBottom: 20,
            }}
          />
        )}

        <h2>{topPlayer.player.name}</h2>

        <p>
          <strong>Squadra:</strong>{" "}
          {topPlayer.statistics?.[0]?.team?.name}
        </p>

        <p>
          <strong>Gol:</strong>{" "}
          {topPlayer.statistics?.[0]?.goals?.total || 0}
        </p>

        <p>
          <strong>Assist:</strong>{" "}
          {topPlayer.statistics?.[0]?.goals?.assists || 0}
        </p>

        <p>
          <strong>Partite:</strong>{" "}
          {topPlayer.statistics?.[0]?.games?.appearences || 0}
        </p>

        <hr />

        <h3>🤖 Analisi Milan Hub</h3>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
          }}
        >
          {topPlayer.player.name} risulta il giocatore con il
          maggiore impatto offensivo nei dati disponibili. Il suo
          contributo in termini di gol e presenza nelle partite lo
          rende il principale riferimento della squadra.
        </p>
      </section>
    </main>
  );
}