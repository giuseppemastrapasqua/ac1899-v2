import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function TeamOfTheWeekPage() {
  const { data: awardsData } = await supabase
  .from("wonderkids_weekly_awards")
  .select("*")
  .order("rating", { ascending: false });

const { data: bestXiData } = await supabase
  .from("wonderkids_best_xi")
  .select("*")
  .order("id", { ascending: true });

const awards = awardsData || [];
const bestXi = bestXiData || [];

console.log("AWARDS", awards.length);
console.log("BEST XI", bestXi.length);
console.log(bestXi);

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
        <div style={pitchHeader}>
          <div>
            <span style={badge}>⚽ FORMAZIONE DELLA SETTIMANA</span>
            <h2 style={sectionTitle}>Campo virtuale AC1899</h2>
          </div>

          <div style={formationBadge}>4 giocatori selezionati</div>
        </div>

        <div style={pitch}>
          <div style={pitchOverlay} />
          <div style={centerCircle} />
          <div style={halfLine} />
          <div style={boxTop} />
          <div style={boxBottom} />

        {bestXi.map((player: any) => (
  <Link
    key={player.id}
    href={`/wonderkids/${player.slug}`}
    style={{
      ...playerMarker,
      left: `${player.x_position || 50}%`,
      top: `${player.y_position || 50}%`,
      textDecoration: "none",
      color: "inherit",
    }}
  >
  <div style={playerAvatar}>
  {player.player_image ? (
    <img
      src={player.player_image}
      alt={player.player_name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    player.formation_slot
  )}
</div>

    <div style={playerTop}>
  <span style={playerRole}>{player.position}</span>
  <span style={rating}>{player.rating}</span>
</div>

    <strong style={playerName}>
      {player.player_name} {player.player_surname}
    </strong>

    <small style={playerClub}>{player.club}</small>
  </Link>
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
      <span style={cardBadge}>
        {icon} {title}
      </span>

      {player ? (
        <>
          <h2 style={awardName}>
            {player.player_name} {player.player_surname}
          </h2>
          <p style={muted}>{player.club} · {player.nationality}</p>
          <strong style={score}>{player.rating}/100</strong>
          <p style={awardNotes}>{player.notes}</p>
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
  borderTop: "2px solid #e30613",
  padding: 32,
};

const badge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
};

const title = {
  fontSize: 48,
  margin: "16px 0 10px",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: 18,
  maxWidth: 760,
  lineHeight: 1.5,
};

const awardsGrid = {
  maxWidth: 1200,
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 16,
};

const awardCard = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 20,
  minHeight: 230,
};

const cardBadge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: 1,
};

const awardName = {
  fontSize: 22,
  margin: "14px 0 8px",
  lineHeight: 1.15,
};

const muted = {
  color: "#9ca3af",
  lineHeight: 1.5,
};

const score = {
  display: "inline-block",
  background: "#e30613",
  color: "white",
  padding: "7px 10px",
  marginTop: 6,
  fontSize: 13,
};

const awardNotes = {
  color: "#9ca3af",
  lineHeight: 1.45,
  fontSize: 14,
};

const pitchSection = {
  maxWidth: 1200,
  margin: "0 auto",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 24,
};

const pitchHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
};

const sectionTitle = {
  fontSize: 30,
  margin: "10px 0 0",
};

const formationBadge = {
  border: "1px solid rgba(255,255,255,.14)",
  padding: "8px 12px",
  color: "#f9fafb",
  fontWeight: 800,
  fontSize: 13,
};

const pitch = {
  position: "relative" as const,
  height: 680,
  marginTop: 24,
  overflow: "hidden",
  background:
    "linear-gradient(180deg, #052e25 0%, #064e3b 50%, #052e25 100%)",
  border: "2px solid rgba(255,255,255,.32)",
};

const pitchOverlay = {
  position: "absolute" as const,
  inset: 0,
  background:
    "repeating-linear-gradient(90deg, rgba(255,255,255,.045) 0 80px, rgba(255,255,255,.02) 80px 160px)",
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

const boxTop = {
  position: "absolute" as const,
  left: "25%",
  top: 0,
  width: "50%",
  height: 110,
  border: "2px solid rgba(255,255,255,.28)",
  borderTop: 0,
};

const boxBottom = {
  position: "absolute" as const,
  left: "25%",
  bottom: 0,
  width: "50%",
  height: 110,
  border: "2px solid rgba(255,255,255,.28)",
  borderBottom: 0,
};

const playerMarker = {
  position: "absolute" as const,
  transform: "translate(-50%, -50%)",
  width: 112,
  background: "rgba(2,6,23,.96)",
  border: "1px solid rgba(227,6,19,.9)",
  padding: 6,
  textAlign: "center" as const,
  boxShadow: "0 10px 22px rgba(0,0,0,.45)",
};

const playerTop = {
  display: "grid",
  gap: 4,
  justifyItems: "center",
  marginBottom: 6,
};

const playerRole = {
  color: "#cbd5e1",
  fontSize: 10,
  fontWeight: 800,
  textTransform: "uppercase" as const,
  lineHeight: 1.15,
  maxWidth: "100%",
  whiteSpace: "normal" as const,
  overflowWrap: "break-word" as const,
  textAlign: "center" as const,
  display: "block",
};

const rating = {
  background: "#e30613",
  color: "white",
  fontWeight: 900,
  padding: "3px 7px",
  fontSize: 11,
  display: "inline-block",
  marginTop: 2,
};

const playerName = {
  display: "block",
  fontSize: 11,
  lineHeight: 1.2,
};

const playerClub = {
  display: "block",
  color: "#9ca3af",
  marginTop: 4,
  fontSize: 11,
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};

const playerAvatar = {
  width: 44,
  height: 44,
  margin: "0 auto 8px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "2px solid #e30613",
  background: "#020617",
};