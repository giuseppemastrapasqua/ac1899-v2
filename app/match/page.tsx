import { getMilanFixtures } from "../../lib/api-football";

export default async function MatchPage() {
  const data = await getMilanFixtures();
  const fixtures = data?.response || [];
  console.log("FIXTURES", fixtures);

  const finishedFixtures = fixtures.filter(
    (item: any) => item.fixture?.status?.short === "FT"
  );

  const sortedFinishedFixtures = [...finishedFixtures].sort(
    (a: any, b: any) =>
      new Date(b.fixture.date).getTime() -
      new Date(a.fixture.date).getTime()
  );

  const lastMatch = sortedFinishedFixtures[0] || null;
  const recentFixtures = sortedFinishedFixtures.slice(0, 20);

  const card = {
    background: "white",
    color: "#111827",
    padding: 24,
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginBottom: 20,
  };

  function formatDate(date: string) {
    return new Date(date).toLocaleString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function MatchCard({ item }: { item: any }) {
    return (
      <article style={card}>
        <div
          style={{
            display: "grid",
            ggridTemplateColumns: "100px auto 100px",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {item.teams.home.logo && (
              <img
                src={item.teams.home.logo}
                alt={item.teams.home.name}
                width={70}
                height={70}
              />
            )}

            <h3>{item.teams.home.name}</h3>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 42,
                fontWeight: "bold",
                color: "#991b1b",
              }}
            >
              {item.goals.home ?? "-"} - {item.goals.away ?? "-"}
            </div>

            <p
              style={{
                fontWeight: "bold",
                color: "#16a34a",
              }}
            >
              {item.fixture.status.long}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            {item.teams.away.logo && (
              <img
                src={item.teams.away.logo}
                alt={item.teams.away.name}
                width={70}
                height={70}
              />
            )}

            <h3>{item.teams.away.name}</h3>
          </div>
        </div>

        <hr />

        <p>
          <strong>Data:</strong> {formatDate(item.fixture.date)}
        </p>

        <p>
          <strong>Competizione:</strong> {item.league.name}
        </p>

        <p>
          <strong>Stadio:</strong>{" "}
          {item.fixture.venue?.name || "Non disponibile"}
        </p>
      </article>
    );
  }

  return (
    <main
      style={{
        fontFamily: "Arial",
        background: "#f3f4f6",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <header
        style={{
          background: "linear-gradient(135deg, #111827, #7f1d1d)",
          color: "white",
          padding: "40px 32px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 42 }}>⚽ Partite Milan</h1>

        <p style={{ marginTop: 8, fontSize: 18 }}>
          Risultati, calendario e storico partite rossonere
        </p>
      </header>

      <section style={{ padding: 24 }}>
        {lastMatch && (
          <>
            <h2>🏟️ Ultima partita</h2>
            <MatchCard item={lastMatch} />
          </>
        )}

        <h2>📅 Ultime partite Milan</h2>

        {recentFixtures.length === 0 ? (
          <p>Nessuna partita trovata.</p>
        ) : (
          recentFixtures.map((item: any) => (
            <MatchCard key={item.fixture.id} item={item} />
          ))
        )}
      </section>
    </main>
  );
}