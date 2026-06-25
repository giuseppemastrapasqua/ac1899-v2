import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function WonderkidsPage() {
  const { data: players } = await supabase
    .from("wonderkids")
    .select("id, name, surname, age, club, position, nationality, market_value, scout_rating, potential_rating, slug, photo");

  // console.log("FIXTURES", fixtures);
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>⭐ WONDERKIDS U20</span>

        <h1 style={title}>Database Scouting AC1899</h1>

        <p style={subtitle}>
          I migliori talenti Under 20 monitorati dalla redazione AC1899.
        </p>
      </section>

      <section style={grid}>
        {players?.map((player: any) => (
          <article key={player.id} style={card}>
           <div style={photoBox}>
  {player.photo ? (
    <img
      src={player.photo}
      alt={`${player.name} ${player.surname}`}
      style={photoImg}
    />
  ) : (
    <span style={initials}>
      {player.name?.[0]}
      {player.surname?.[0]}
    </span>
  )}
</div>

            <div style={{ padding: 18 }}>
              <h2>
                {player.name} {player.surname}
              </h2>

              <p style={muted}>
                {player.age} anni • {player.club}
              </p>

              <p style={muted}>
                {player.position} • {player.nationality}
              </p>

              <p>
                <strong>Valore:</strong> {player.market_value}
              </p>

              <p>
                <strong>Scout Rating:</strong> {player.scout_rating}/100
              </p>

              <p>
                <strong>Potenziale:</strong> {player.potential_rating}/100
              </p>

              <Link
  href={`/wonderkids/${player.slug || "franco-mastantuono"}`}
  style={button}
>
  Scheda completa →
</Link>
            </div>
          </article>
        ))}
      </section>

      <Link href="/" style={backLink}>
        ← Torna alla Home
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
  margin: "0 auto 30px",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 32,
};

const badge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 13,
};

const title = {
  fontSize: 48,
  margin: "16px 0",
};

const subtitle = {
  color: "#9ca3af",
};

const grid = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: 20,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
};

const photoBox = {
  height: 220,
  display: "grid",
  placeItems: "center",
  fontSize: 50,
  background: "rgba(255,255,255,.06)",
  overflow: "hidden",
};

const photoImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const initials = {
  color: "#e30613",
  fontWeight: 900,
};
const muted = {
  color: "#9ca3af",
};

const button = {
  display: "inline-block",
  marginTop: 12,
  background: "#e30613",
  color: "white",
  padding: "10px 14px",
  textDecoration: "none",
  fontWeight: "bold",
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};