import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function StatistichePage() {
  const { data: players, error } = await supabase
    .from("players")
    .select("*")
    .order("goals", { ascending: false });

  if (error) {
    return (
      <main style={page}>
        <h1>📊 Statistiche Milan</h1>
        <p>Errore nel caricamento delle statistiche.</p>
      </main>
    );
  }

  const list = players || [];

  const topGoals = [...list].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 8);
  const topAssists = [...list].sort((a, b) => (b.assists || 0) - (a.assists || 0)).slice(0, 8);
  const topAppearances = [...list].sort((a, b) => (b.appearances || 0) - (a.appearances || 0)).slice(0, 8);
  const topMinutes = [...list].sort((a, b) => (b.minutes_played || 0) - (a.minutes_played || 0)).slice(0, 8);
  const topYellow = [...list].sort((a, b) => (b.yellow_cards || 0) - (a.yellow_cards || 0)).slice(0, 8);
  const topRed = [...list].sort((a, b) => (b.red_cards || 0) - (a.red_cards || 0)).slice(0, 8);

  const totalGoals = list.reduce((sum, p) => sum + Number(p.goals || 0), 0);
  const totalAssists = list.reduce((sum, p) => sum + Number(p.assists || 0), 0);
  const totalAppearances = list.reduce((sum, p) => sum + Number(p.appearances || 0), 0);
  const totalMinutes = list.reduce((sum, p) => sum + Number(p.minutes_played || 0), 0);

  return (
    <main style={page}>
      <section style={hero}>
        <h1 style={{ margin: 0, fontSize: 42 }}>📊 Statistiche Milan Hub</h1>
        <p>Statistiche calcolate automaticamente dalla rosa inserita in Supabase.</p>
      </section>

      <section style={summaryGrid}>
        <Box title="Calciatori" value={list.length} />
        <Box title="Gol totali" value={totalGoals} />
        <Box title="Assist totali" value={totalAssists} />
        <Box title="Presenze totali" value={totalAppearances} />
        <Box title="Minuti totali" value={totalMinutes} />
      </section>

      <section style={grid}>
        <PlayerList title="⚽ Top Marcatori" players={topGoals} field="goals" suffix="gol" />
        <PlayerList title="🎯 Top Assist" players={topAssists} field="assists" suffix="assist" />
        <PlayerList title="👕 Più Presenze" players={topAppearances} field="appearances" suffix="presenze" />
        <PlayerList title="⏱️ Più Minuti" players={topMinutes} field="minutes_played" suffix="minuti" />
        <PlayerList title="🟨 Ammonizioni" players={topYellow} field="yellow_cards" suffix="gialli" />
        <PlayerList title="🟥 Espulsioni" players={topRed} field="red_cards" suffix="rossi" />
      </section>
    </main>
  );
}

function Box({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 34, fontWeight: "bold", color: "#991b1b", margin: 0 }}>
        {value}
      </p>
    </div>
  );
}

function PlayerList({
  title,
  players,
  field,
  suffix,
}: {
  title: string;
  players: any[];
  field: string;
  suffix: string;
}) {
  return (
    <section style={card}>
      <h2>{title}</h2>

      {players.length === 0 ? (
        <p>Nessun dato disponibile.</p>
      ) : (
        <ol style={{ paddingLeft: 20 }}>
          {bestXi.map((player: any) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <Link
                href={`/giocatore/${p.id}`}
                style={{
                  color: "#111827",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {p.name} {p.surname}
              </Link>{" "}
              - <strong style={{ color: "#991b1b" }}>{p[field] || 0}</strong> {suffix}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

const page = {
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: 24,
  fontFamily: "Arial",
  color: "#111827",
};

const hero = {
  background: "linear-gradient(135deg,#111827,#7f1d1d)",
  color: "white",
  padding: 32,
  borderRadius: 0,
  marginBottom: 24,
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: 20,
  marginBottom: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: 20,
};

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 0,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};