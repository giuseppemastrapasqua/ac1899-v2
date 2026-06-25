import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function WonderkidDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: bestXiPlayer } = await supabase
    .from("wonderkids_best_xi")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  const { data: candidate } = await supabase
    .from("wonderkid_candidates")
    .select("*")
    .eq("name", bestXiPlayer?.player_name || "")
    .eq("surname", bestXiPlayer?.player_surname || "")
    .maybeSingle();

  const player = {
    name: bestXiPlayer?.player_name || candidate?.name,
    surname: bestXiPlayer?.player_surname || candidate?.surname,
    club: bestXiPlayer?.club || candidate?.club,
    nationality: bestXiPlayer?.nationality || candidate?.nationality,
    position: bestXiPlayer?.position || candidate?.position,
    rating: bestXiPlayer?.rating || candidate?.ai_score,
    report: bestXiPlayer?.ai_report || candidate?.ai_report,
    formation_slot: bestXiPlayer?.formation_slot || candidate?.best_xi_position,
    age: candidate?.age,
    appearances: candidate?.appearances,
    goals: candidate?.goals,
    assists: candidate?.assists,
    minutes_played: candidate?.minutes_played,
    average_rating: candidate?.average_rating,
    image: bestXiPlayer?.player_image || candidate?.player_image,
  };

  if (!player.name) {
    return (
      <main style={page}>
        <section style={box}>
          <h1>Giocatore non trovato</h1>
          <Link href="/wonderkids/team-of-the-week" style={backLink}>
            ← Torna al Team of the Week
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={hero}>
        <div style={photoBox}>
          {player.image ? (
            <img src={player.image} alt={player.name} style={photo} />
          ) : (
            <span style={initials}>
              {player.name?.[0]}
              {player.surname?.[0]}
            </span>
          )}
        </div>

        <div>
          <span style={badge}>🏆 TEAM OF THE WEEK</span>

          <h1 style={title}>
            {player.name} {player.surname}
          </h1>

          <p style={subtitle}>
            {player.club} · {player.position} · {player.nationality}
            {player.age ? ` · ${player.age} anni` : ""}
          </p>

          <div style={ratingBox}>
            <span>Rating AC1899</span>
            <strong>{player.rating || "-"}/100</strong>
          </div>

          <p style={slot}>
            Posizione Best XI: <strong>{player.formation_slot || "-"}</strong>
          </p>
        </div>
      </section>

      <section style={grid}>
        <Stat label="Presenze" value={player.appearances ?? "-"} />
        <Stat label="Gol" value={player.goals ?? "-"} />
        <Stat label="Assist" value={player.assists ?? "-"} />
        <Stat label="Minuti" value={player.minutes_played ?? "-"} />
        <Stat label="Media voto" value={player.average_rating ?? "-"} />
      </section>

      <section style={box}>
        <span style={badge}>🧠 REPORT AI AC1899</span>
        <p style={text}>{player.report || "Report AI da generare."}</p>
      </section>

      <Link href="/wonderkids/team-of-the-week" style={backLink}>
        ← Torna al Team of the Week
      </Link>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div style={statBox}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page = {
  background: "#020617",
  color: "#f9fafb",
  minHeight: "100vh",
  padding: "48px 24px",
};

const hero = {
  maxWidth: 1200,
  margin: "0 auto 28px",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  borderTop: "2px solid #e30613",
  padding: 32,
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  gap: 28,
  alignItems: "center",
};

const photoBox = {
  width: 180,
  height: 180,
  background: "#020617",
  border: "2px solid #e30613",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
};

const photo = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const initials = {
  color: "#e30613",
  fontSize: 58,
  fontWeight: 900,
};

const badge = {
  color: "#e30613",
  fontWeight: 900,
  fontSize: 13,
  letterSpacing: 1,
};

const title = {
  fontSize: 52,
  margin: "14px 0 10px",
};

const subtitle = {
  color: "#cbd5e1",
  fontSize: 18,
};

const ratingBox = {
  display: "inline-grid",
  gap: 4,
  background: "#e30613",
  padding: "12px 16px",
  marginTop: 18,
  fontWeight: 900,
};

const slot = {
  color: "#d1d5db",
  marginTop: 16,
};

const grid = {
  maxWidth: 1200,
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: 14,
};

const statBox = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 18,
  display: "grid",
  gap: 8,
};

const box = {
  maxWidth: 1200,
  margin: "0 auto 28px",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 28,
};

const text = {
  color: "#d1d5db",
  fontSize: 18,
  lineHeight: 1.7,
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 900,
  textDecoration: "none",
};