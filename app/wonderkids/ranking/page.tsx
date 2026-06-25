import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function WonderkidsRankingPage() {
  const { data: players } = await supabase
  .from("wonderkids")
  .select("*")
  .order("potential_rating", { ascending: false });

console.log(players);
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🏆 AC1899 RANKING</span>
        <h1 style={title}>Wonderkids Ranking</h1>
        <p style={subtitle}>
          La classifica dei migliori talenti Under 20 secondo il rating AC1899.
        </p>
      </section>

      <section style={rankingBox}>
        {(players || []).map((player: any, index: number) => (
          <Link
            key={player.id}
            href={`/wonderkids/${player.slug}`}
            style={row}
          >
            <strong style={rank}>#{index + 1}</strong>

            <div style={avatar}>
  {player.photo ? (
    <img src={player.photo} alt={player.name} style={img} />
  ) : (
    `${player.name?.[0] || ""}${player.surname?.[0] || ""}`
  )}
</div>

            <div style={{ flex: 1 }}>
              <h2 style={name}>
                {player.name} {player.surname}
              </h2>
              <p style={meta}>
                {player.age} anni · {player.club} · {player.position}
              </p>
            </div>

            <strong style={rating}>{player.potential_rating || 0}</strong>
          </Link>
        ))}
      </section>

      <Link href="/wonderkids" style={backLink}>
        ← Torna ai Wonderkids
      </Link>
    </main>
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
};

const rankingBox = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gap: 12,
};

const row = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 18,
  textDecoration: "none",
  color: "inherit",
};

const rank = {
  color: "#e30613",
  fontSize: 24,
  minWidth: 60,
};

const avatar = {
  width: 58,
  height: 58,
  background: "#020617",
  border: "2px solid #e30613",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const name = {
  margin: 0,
  fontSize: 22,
};

const meta = {
  margin: "6px 0 0",
  color: "#9ca3af",
};

const rating = {
  background: "#e30613",
  color: "white",
  padding: "10px 12px",
  fontSize: 18,
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};