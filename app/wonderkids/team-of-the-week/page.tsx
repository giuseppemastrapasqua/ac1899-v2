import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function TeamOfTheWeekPage() {
  const { data: players } = await supabase
    .from("wonderkids_weekly_awards")
    .select("*")
    .order("rating", { ascending: false });

  const awards = players || [];

  const bestGoalkeeper = awards.find((p: any) => p.award_type === "best_goalkeeper");
  const bestDefender = awards.find((p: any) => p.award_type === "best_defender");
  const bestMidfielder = awards.find((p: any) => p.award_type === "best_midfielder");
  const bestForward = awards.find((p: any) => p.award_type === "best_forward");

  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🏆 WONDERKIDS U20</span>
        <h1 style={title}>Team of the Week</h1>
        <p style={subtitle}>
          I migliori talenti Under 20 della settimana selezionati da AC1899.
        </p>
      </section>

      <section style={awardsGrid}>
        <AwardCard title="Miglior Portiere" icon="🧤" player={bestGoalkeeper} />
        <AwardCard title="Miglior Difensore" icon="🛡️" player={bestDefender} />
        <AwardCard title="Miglior Centrocampista" icon="🎯" player={bestMidfielder} />
        <AwardCard title="Miglior Attaccante" icon="⚡" player={bestForward} />
      </section>

      <section style={pitchSection}>
        <span style={badge}>⚽ FORMAZIONE DELLA SETTIMANA</span>
        <h2 style={sectionTitle}>Campo virtuale AC1899</h2>

        <div style={pitch}>
          <div style={centerCircle} />
          <div style={halfLine} />

          {awards.map((player: any) => (
            <div
              key={player.id}
              style={{
                ...playerMarker,
                left: `${player.x_position || 50}%`,
                top: `${player.y_position || 50}%`,
              }}
            >
              <div style={rating}>{player.rating}</div>
              <strong>
                {player.player_name} {player.player_surname}
              </strong>
              <small>{player.position}</small>
              <small>{player.club}</small>
            </div>
          ))}
        </div>
      </section>

      <Link href="/wonderkids" style={backLink}>
        ← Torna ai Wonderkids
      </Link>
    </main>
  );
}

function AwardCard({
  title,
  icon,
  player,
}: {
  title: string;
  icon: string;
  player: any;
}) {
  return (
    <article style={awardCard}>
      <span style={cardBadge}>{icon} {title}</span>

      {player ? (
        <>
          <h2>
            {player.player_name} {player.player_surname}
          </h2>
          <p style={muted}>{player.club} · {player.nationality}</p>
          <strong style={score}>{player.rating}/100</strong>
          <p style={muted}>{player.notes}</p>
        </>
      ) : (
        <p style={muted}>Da aggiornare.</p>
      )}
    </article>
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
  padding: 32,
};

const badge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
};

const title = {
  fontSize: 52,
  margin: "16px 0 12px",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: 20,
  maxWidth: 760,
  lineHeight: 1.5,
};

const awardsGrid = {
  maxWidth: 1200,
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 16,
};

const awardCard = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 22,
};

const cardBadge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: 1,
};

const muted = {
  color: "#9ca3af",
  lineHeight: 1.5,
};

const score = {
  display: "inline-block",
  background: "#e30613",
  color: "white",
  padding: "8px 12px",
  marginTop: 8,
};

const pitchSection = {
  maxWidth: 1200,
  margin: "0 auto",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 24,
};

const sectionTitle = {
  fontSize: 32,
  marginTop: 10,
};

const pitch = {
  position: "relative" as const,
  height: 720,
  marginTop: 24,
  overflow: "hidden",
  background:
    "linear-gradient(180deg, #064e3b, #022c22), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 80px, rgba(255,255,255,.02) 80px 160px)",
  border: "3px solid rgba(255,255,255,.35)",
};

const centerCircle = {
  position: "absolute" as const,
  left: "50%",
  top: "50%",
  width: 180,
  height: 180,
  border: "2px solid rgba(255,255,255,.35)",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
};

const halfLine = {
  position: "absolute" as const,
  left: 0,
  top: "50%",
  width: "100%",
  height: 2,
  background: "rgba(255,255,255,.35)",
};

const playerMarker = {
  position: "absolute" as const,
  transform: "translate(-50%, -50%)",
  minWidth: 150,
  background: "rgba(2,6,23,.92)",
  border: "1px solid rgba(255,255,255,.18)",
  padding: 12,
  textAlign: "center" as const,
  boxShadow: "0 12px 30px rgba(0,0,0,.35)",
};

const rating = {
  display: "inline-block",
  background: "#e30613",
  color: "white",
  fontWeight: 900,
  padding: "4px 8px",
  marginBottom: 6,
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};