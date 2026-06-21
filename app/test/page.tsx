import {
  getMilanFixtures,
  getFixtureStatistics,
  getFixtureEvents,
  getFixtureLineups,
  getFixturePlayers,
} from "../../lib/api-football";

function getStat(teamStats: any, type: string) {
  return (
    teamStats?.statistics?.find((s: any) => s.type === type)?.value ??
    "Non disponibile"
  );
}

export default async function TestPage() {
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
    return <pre>Nessuna partita trovata.</pre>;
  }

  const fixtureId = lastMatch.fixture.id;

  const statsData = await getFixtureStatistics(fixtureId);
  const eventsData = await getFixtureEvents(fixtureId);
  const lineupsData = await getFixtureLineups(fixtureId);
  const playersData = await getFixturePlayers(fixtureId);

  const stats = statsData?.response || [];
  const events = eventsData?.response || [];
  const lineups = lineupsData?.response || [];
  const players = playersData?.response || [];

  const milanStats = stats.find(
    (item: any) => item.team?.name === "AC Milan"
  );

  const opponentStats = stats.find(
    (item: any) => item.team?.name !== "AC Milan"
  );

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "Arial",
        background: "#f3f4f6",
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      <h1>Test dati partita</h1>

      <section style={card}>
        <h2>
          {lastMatch.teams.home.name} vs {lastMatch.teams.away.name}
        </h2>

        <p>Fixture ID: {fixtureId}</p>
        <p>
          Risultato: {lastMatch.goals.home} - {lastMatch.goals.away}
        </p>
      </section>

      <section style={card}>
        <h2>📊 Statistiche Milan</h2>

        <p>
          <strong>Possesso:</strong>{" "}
          {getStat(milanStats, "Ball Possession")}
        </p>

        <p>
          <strong>Tiri totali:</strong>{" "}
          {getStat(milanStats, "Total Shots")}
        </p>

        <p>
          <strong>Tiri in porta:</strong>{" "}
          {getStat(milanStats, "Shots on Goal")}
        </p>

        <p>
          <strong>Corner:</strong>{" "}
          {getStat(milanStats, "Corner Kicks")}
        </p>

        <p>
          <strong>Falli:</strong> {getStat(milanStats, "Fouls")}
        </p>
      </section>

      <section style={card}>
        <h2>📊 Statistiche Avversario</h2>

        <p>
          <strong>Squadra:</strong>{" "}
          {opponentStats?.team?.name || "Non disponibile"}
        </p>

        <p>
          <strong>Possesso:</strong>{" "}
          {getStat(opponentStats, "Ball Possession")}
        </p>

        <p>
          <strong>Tiri totali:</strong>{" "}
          {getStat(opponentStats, "Total Shots")}
        </p>

        <p>
          <strong>Tiri in porta:</strong>{" "}
          {getStat(opponentStats, "Shots on Goal")}
        </p>

        <p>
          <strong>Corner:</strong>{" "}
          {getStat(opponentStats, "Corner Kicks")}
        </p>

        <p>
          <strong>Falli:</strong>{" "}
          {getStat(opponentStats, "Fouls")}
        </p>
      </section>

      <section style={card}>
        <h2>⚽ Eventi trovati</h2>
        <p>{events.length}</p>
      </section>

      <section style={card}>
        <h2>🧩 Formazioni trovate</h2>
        <p>{lineups.length}</p>
      </section>

      <section style={card}>
        <h2>👥 Dati giocatori trovati</h2>
        <p>{players.length}</p>
      </section>
    </main>
  );
}

const card = {
  background: "white",
  padding: 24,
  borderRadius: 16,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 20,
};