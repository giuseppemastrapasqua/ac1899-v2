import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default async function WonderkidsHistoryPage() {
  const { data } = await supabase
    .from("wonderkids_best_xi")
    .select("week_id, week_label, created_at")
    .order("created_at", { ascending: false });

  const weeks = Array.from(
    new Map((data || []).map((w: any) => [w.week_id, w])).values()
  );

  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>📚 ARCHIVIO WONDERKIDS</span>
        <h1 style={title}>Storico Team of the Week</h1>
        <p style={subtitle}>
          Tutte le selezioni settimanali dei migliori talenti U20 AC1899.
        </p>
      </section>

      <section style={grid}>
        {weeks.length === 0 ? (
          <div style={card}>Nessuna settimana disponibile.</div>
        ) : (
          weeks.map((week: any) => (
            <Link
              key={week.week_id}
              href={`/wonderkids/team-of-the-week?week=${week.week_id}`}
              style={card}
            >
              <span style={badge}>TEAM OF THE WEEK</span>
              <h2>{week.week_label || week.week_id}</h2>
              <p style={muted}>{week.week_id}</p>
            </Link>
          ))
        )}
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
  fontWeight: 900,
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

const grid = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 18,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 24,
  color: "white",
  textDecoration: "none",
};

const muted = {
  color: "#9ca3af",
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 900,
  textDecoration: "none",
};