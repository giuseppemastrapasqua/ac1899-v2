import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function WonderkidKingBox() {
  const { data } = await supabase
    .from("wonderkids_best_xi")
    .select("player_name, player_surname, club, nationality, rating, slug");

  const players = data || [];

  const ranking = Object.values(
    players.reduce((acc: any, p: any) => {
      const key = `${p.player_name}-${p.player_surname}`;

      if (!acc[key]) {
        acc[key] = {
          player_name: p.player_name,
          player_surname: p.player_surname,
          club: p.club,
          nationality: p.nationality,
          slug: p.slug,
          total_rating: 0,
          appearances: 0,
          best_rating: 0,
        };
      }

      acc[key].total_rating += Number(p.rating || 0);
      acc[key].appearances += 1;
      acc[key].best_rating = Math.max(acc[key].best_rating, Number(p.rating || 0));

      return acc;
    }, {})
  ).map((p: any) => ({
    ...p,
    avg_rating: Math.round(p.total_rating / p.appearances),
  }));

  const king = ranking.sort(
    (a: any, b: any) =>
      b.avg_rating - a.avg_rating ||
      b.appearances - a.appearances ||
      b.best_rating - a.best_rating
  )[0];

  if (!king) return null;

  return (
    <section style={box}>
      <span style={badge}>👑 WONDERKID KING</span>

      <h2 style={name}>
        {king.player_name} {king.player_surname}
      </h2>

      <p style={muted}>
        {king.club} · {king.nationality}
      </p>

      <div style={stats}>
        <div>
          <span style={label}>Rating medio</span>
          <strong>{king.avg_rating}/100</strong>
        </div>

        <div>
          <span style={label}>Presenze TOTW</span>
          <strong>{king.appearances}</strong>
        </div>
      </div>

      <Link href={`/wonderkids/${king.slug}`} style={link}>
        Apri scheda →
      </Link>
    </section>
  );
}

const box = {
  background: "var(--home-surface, #111827)",
  border: "1px solid var(--home-border, rgba(255,255,255,.08))",
  borderTop: "2px solid #e30613",
  padding: 22,
  marginTop: 18,
  minHeight: 348,
  display: "flex",
  flexDirection: "column" as const,
};

const badge = {
  color: "#e30613",
  fontWeight: 900,
  fontSize: 12,
  letterSpacing: 1,
};

const name = {
  fontSize: 26,
  margin: "14px 0 8px",
};

const muted = {
  color: "var(--home-muted, #9ca3af)",
  lineHeight: 1.5,
};

const stats = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginTop: 18,
};

const label = {
  display: "block",
  color: "var(--home-muted, #9ca3af)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase" as const,
  marginBottom: 6,
  };

const link = {
  display: "inline-block",
  marginTop: "auto",
  color: "#e30613",
  fontWeight: 900,
  textDecoration: "none",
};