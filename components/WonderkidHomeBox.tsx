import Link from "next/link";
import { supabase } from "../lib/supabase";

const labels: Record<string, string> = {
  best_goalkeeper: "Miglior portiere",
  best_defender: "Miglior difensore",
  best_midfielder: "Miglior centrocampista",
  best_forward: "Miglior attaccante",
};

const icons: Record<string, string> = {
  best_goalkeeper: "🧤",
  best_defender: "🛡️",
  best_midfielder: "🎯",
  best_forward: "⚡",
};

const order: Record<string, number> = {
  best_forward: 1,
  best_midfielder: 2,
  best_defender: 3,
  best_goalkeeper: 4,
};

export default async function WonderkidHomeBox() {
  const { data } = await supabase
    .from("wonderkids_weekly_awards")
    .select("*")
    .order("rating", { ascending: false });

  const awards = (data || []).sort(
    (a: any, b: any) => (order[a.award_type] || 99) - (order[b.award_type] || 99)
  );

  return (
    <section style={box}>
      <span style={badge}>⭐ WONDERKIDS U20</span>

      <div style={grid}>
        {awards.length === 0 ? (
          <p style={muted}>Premi settimanali in aggiornamento.</p>
        ) : (
          awards.map((p: any) => (
            <Link key={p.id} href={`/wonderkids/${p.slug}`} style={card}>
              <div style={icon}>{icons[p.award_type] || "⭐"}</div>

              <h3 style={title}>{labels[p.award_type] || "Wonderkid"}</h3>

              <div style={content}>
                <strong style={name}>
                  {p.player_name} {p.player_surname}
                </strong>

                <p style={muted}>
                  {p.club} · {p.nationality}
                </p>
              </div>

              <span style={rating}>{p.rating}/100</span>
            </Link>
          ))
        )}
      </div>

      <Link href="/wonderkids/team-of-the-week" style={button}>
        TEAM OF THE WEEK →
      </Link>
    </section>
  );
}

const box = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  borderTop: "2px solid #e30613",
  padding: 28,
  marginTop: 28,
};

const badge = {
  color: "#e30613",
  fontWeight: 900,
  fontSize: 13,
  letterSpacing: 1,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 14,
  marginTop: 24,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 16,
  color: "white",
  textDecoration: "none",
  minHeight: 230,
  display: "flex",
  flexDirection: "column" as const,
};

const icon = {
  fontSize: 24,
  marginBottom: 12,
};

const title = {
  fontSize: 15,
  color: "#e30613",
  fontWeight: 900,
  letterSpacing: 0.5,
  textTransform: "uppercase" as const,
  margin: "0 0 14px",
};

const content = {
  flex: 1,
};

const name = {
  display: "block",
  fontSize: 18,
  lineHeight: 1.15,
  marginBottom: 8,
  minHeight: 42,
};

const muted = {
  color: "#9ca3af",
  fontSize: 15,
  lineHeight: 1.4,
};

const rating = {
  display: "inline-block",
  marginTop: "auto",
  background: "#e30613",
  color: "white",
  padding: "6px 9px",
  fontWeight: 900,
  fontSize: 13,
  alignSelf: "flex-start",
};

const button = {
  display: "inline-block",
  marginTop: 22,
  background: "#e30613",
  color: "white",
  padding: "12px 18px",
  fontWeight: 900,
  fontSize: 14,
  letterSpacing: 0.5,
  textDecoration: "none",
};