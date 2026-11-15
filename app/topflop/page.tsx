import {
  getMilanFixtures,
  getFixturePlayers,
} from "../../lib/api-football";

export default async function TopFlopPage() {
  const fixturesData = await getMilanFixtures();
  const fixtures = fixturesData?.response || [];

  const finishedFixtures = fixtures.filter(
    (item: any) => item.fixture?.status?.short === "FT"
  );

  const lastMatch =
    finishedFixtures.length > 0
      ? [...finishedFixtures].sort(
          (a: any, b: any) =>
            new Date(b.fixture.date).getTime() -
            new Date(a.fixture.date).getTime()
        )[0]
      : null;

  if (!lastMatch) {
    return (
      <main style={{ padding: 40 }}>
        <h1>🏅 Top & Flop</h1>
        <p>Nessuna partita disponibile.</p>
      </main>
    );
  }

  const playersData = await getFixturePlayers(lastMatch.fixture.id);
  const teams = playersData?.response || [];

  const milanBlock = teams.find(
    (item: any) => item.team?.name === "AC Milan"
  );

  const players =
    milanBlock?.players
      ?.map((item: any) => {
        const stats = item.statistics?.[0];

        return {
          name: item.player?.name,
          photo: item.player?.photo,
          rating: Number(stats?.games?.rating || 0),
          minutes: stats?.games?.minutes || 0,
          goals: stats?.goals?.total || 0,
          assists: stats?.goals?.assists || 0,
        };
      })
      .filter((p: any) => p.rating > 0)
      .sort((a: any, b: any) => b.rating - a.rating) || [];

  const topThree = players.slice(0, 3);
  const flop = [...players].reverse()[0];

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
        <h1 style={{ marginTop: 0 }}>🏅 Top & Flop Milan Hub</h1>

        <h2>
          {lastMatch.teams.home.name} vs {lastMatch.teams.away.name}
        </h2>

        <h1>
          {lastMatch.goals.home} - {lastMatch.goals.away}
        </h1>

        <p>{lastMatch.league.name}</p>
      </section>

      {players.length === 0 ? (
        <section style={card}>
          <p>Dati giocatori non disponibili.</p>
        </section>
      ) : (
        <>
          <section style={card}>
            <h2>🏆 I migliori tre</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 240px), 1fr))",
                gap: 20,
              }}
            >
              {topThree.map((player: any, index: number) => (
                <article
                  key={player.name}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 16,
                    padding: 20,
                    background:
                      index === 0 ? "#fff7ed" : "#fafafa",
                  }}
                >
                  <h2>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : "🥉"}{" "}
                    {player.name}
                  </h2>

                  {player.photo && (
                    <img
                      src={player.photo}
                      alt={player.name}
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: "50%",
                        background: "#e5e7eb",
                      }}
                    />
                  )}

                  <p
                    style={{
                      fontSize: 34,
                      color: "#991b1b",
                      fontWeight: "bold",
                    }}
                  >
                    {player.rating.toFixed(1)}
                  </p>

                  <p>
                    Gol: {player.goals} | Assist: {player.assists}
                  </p>

                  <p>
                    {index === 0
                      ? "Il migliore della partita secondo i dati disponibili."
                      : "Prestazione positiva e impatto importante nel match."}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {flop && (
            <section style={card}>
              <h2>📉 Flop statistico</h2>

              <article
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 20,
                  background: "#fef2f2",
                }}
              >
                <h2>{flop.name}</h2>

                {flop.photo && (
                  <img
                    src={flop.photo}
                    alt={flop.name}
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: "50%",
                      background: "#e5e7eb",
                    }}
                  />
                )}

                <p
                  style={{
                    fontSize: 34,
                    color: "#991b1b",
                    fontWeight: "bold",
                  }}
                >
                  {flop.rating.toFixed(1)}
                </p>

                <p>
                  Gara più complicata secondo il rating statistico disponibile.
                  Il dato non è un giudizio definitivo, ma un indicatore utile
                  per leggere la prestazione.
                </p>
              </article>
            </section>
          )}
        </>
      )}
    </main>
  );
}

const card = {
  background: "white",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};