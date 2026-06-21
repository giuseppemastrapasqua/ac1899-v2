import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function GiocatorePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !player) {
    return (
      <main style={page}>
        <section style={card}>
          <h1>Giocatore non trovato</h1>
          <Link href="/rosa" style={linkStyle}>
            ← Torna alla rosa
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={hero}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: 18 }}>
            👕 #{player.shirt_number || "-"} · {player.position}
          </p>

          <h1 style={{ margin: "12px 0", fontSize: 52 }}>
            {player.name} {player.surname}
          </h1>

          <p style={{ fontSize: 20, marginBottom: 0 }}>
            🌍 {player.nationality || "Nazionalità non disponibile"}
          </p>

          {player.captain && (
            <p style={{ fontWeight: "bold", marginTop: 14 }}>
              🧢 Capitano
            </p>
          )}
        </div>

        {player.photo_url && (
          <img
            src={player.photo_url}
            alt={`${player.name} ${player.surname}`}
            style={{
              width: 260,
              height: 260,
              objectFit: "cover",
              borderRadius: 24,
              background: "#e5e7eb",
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            }}
          />
        )}
      </section>

      <section style={statsGrid}>
        <Box title="Presenze" value={player.appearances || 0} />
        <Box title="Gol" value={player.goals || 0} />
        <Box title="Assist" value={player.assists || 0} />
        <Box title="Minuti" value={player.minutes_played || 0} />
        <Box title="Gialli" value={player.yellow_cards || 0} />
        <Box title="Rossi" value={player.red_cards || 0} />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.2fr) minmax(300px,0.8fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        <section style={card}>
          <h2>📋 Scheda giocatore</h2>

          <Info label="Ruolo principale" value={player.position} />
          <Info label="Ruolo secondario" value={player.secondary_position} />

          <Info
            label="Data di nascita"
            value={
              player.birth_date
                ? new Date(player.birth_date).toLocaleDateString("it-IT")
                : "-"
            }
          />

          <Info label="Luogo di nascita" value={player.birth_place} />
          <Info
            label="Altezza"
            value={player.height ? `${player.height} cm` : "-"}
          />
          <Info
            label="Peso"
            value={player.weight ? `${player.weight} kg` : "-"}
          />
          <Info label="Piede preferito" value={player.preferred_foot} />

          <Info
            label="Contratto fino al"
            value={
              player.contract_until
                ? new Date(player.contract_until).toLocaleDateString("it-IT")
                : "-"
            }
          />

          <Info label="Valore mercato" value={player.market_value} />
          <Info label="Status" value={player.status} />
        </section>

        <section style={card}>
          <h2>💰 Profilo</h2>

          <div style={marketBox}>
            <p style={{ margin: 0, color: "#6b7280" }}>Valore mercato</p>
            <strong style={{ fontSize: 34, color: "#991b1b" }}>
              {player.market_value || "-"}
            </strong>
          </div>

          <div style={{ marginTop: 20 }}>
            <h3>📱 Social</h3>

            {player.instagram ? (
              <p>
                Instagram:{" "}
                <a href={player.instagram} target="_blank" style={linkStyle}>
                  apri profilo →
                </a>
              </p>
            ) : (
              <p>Instagram: -</p>
            )}

            {player.x_profile ? (
              <p>
                X/Twitter:{" "}
                <a href={player.x_profile} target="_blank" style={linkStyle}>
                  apri profilo →
                </a>
              </p>
            ) : (
              <p>X/Twitter: -</p>
            )}
          </div>
        </section>
      </section>

      <section style={card}>
        <h2>📊 Statistiche stagione</h2>

        <div style={statsGrid}>
          <MiniStat label="Presenze" value={player.appearances || 0} />
          <MiniStat label="Gol" value={player.goals || 0} />
          <MiniStat label="Assist" value={player.assists || 0} />
          <MiniStat label="Minuti giocati" value={player.minutes_played || 0} />
          <MiniStat label="Cartellini gialli" value={player.yellow_cards || 0} />
          <MiniStat label="Cartellini rossi" value={player.red_cards || 0} />
        </div>
      </section>

      <section style={card}>
        <h2>📝 Biografia</h2>

        <p style={{ lineHeight: 1.8, fontSize: 18, whiteSpace: "pre-line" }}>
          {player.bio || "Biografia non disponibile."}
        </p>
      </section>

      <Link href="/rosa" style={linkStyle}>
        ← Torna alla rosa
      </Link>
    </main>
  );
}

function Box({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={card}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p
        style={{
          fontSize: 34,
          fontWeight: "bold",
          color: "#991b1b",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <p
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: 10,
      }}
    >
      <strong>{label}:</strong>
      <span>{value || "-"}</span>
    </p>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <p style={{ margin: 0, color: "#6b7280" }}>{label}</p>
      <strong style={{ fontSize: 28, color: "#111827" }}>{value}</strong>
    </div>
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
  padding: 36,
  borderRadius: 24,
  marginBottom: 24,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap" as const,
};

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: 16,
};

const marketBox = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 20,
};

const linkStyle = {
  display: "inline-block",
  color: "#991b1b",
  fontWeight: "bold",
  textDecoration: "none",
};