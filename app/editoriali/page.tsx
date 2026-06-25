import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function EditorialiPage() {
  const { data } = await supabase
    .from("daily_editorials")
    .select("*")
    .order("created_at", { ascending: false });

  const editorials = data || [];

  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>📰 AC1899 DAILY</span>
        <h1 style={title}>Editoriali</h1>
        <p style={subtitle}>
          Analisi, approfondimenti e panoramiche sul Milan e sulla Serie A.
        </p>
      </section>

      <section style={grid}>
        {editorials.length === 0 ? (
          <div style={empty}>
            Nessun editoriale disponibile.
          </div>
        ) : (
          editorials.map((item: any) => (
            <Link
              key={item.id}
              href={`/editoriali/${item.id}`}
              style={card}
            >
              <span style={cardBadge}>EDITORIALE</span>

              <h2 style={cardTitle}>
                {item.title}
              </h2>

              <p style={cardSubtitle}>
                {item.subtitle}
              </p>

              <p style={cardDate}>
                {new Date(item.created_at).toLocaleDateString("it-IT")}
              </p>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

const page = {
  background: "#020617",
  minHeight: "100vh",
  color: "white",
  padding: "40px 24px",
};

const hero = {
  maxWidth: 1200,
  margin: "0 auto 32px",
};

const badge = {
  color: "#e30613",
  fontWeight: 900,
};

const title = {
  fontSize: 48,
  margin: "12px 0",
};

const subtitle = {
  color: "#9ca3af",
};

const grid = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: 20,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  borderTop: "2px solid #e30613",
  padding: 24,
  textDecoration: "none",
  color: "white",
};

const cardBadge = {
  color: "#e30613",
  fontWeight: 900,
  fontSize: 12,
};

const cardTitle = {
  marginTop: 12,
  marginBottom: 12,
};

const cardSubtitle = {
  color: "#9ca3af",
};

const cardDate = {
  marginTop: 18,
  color: "#6b7280",
};

const empty = {
  background: "#111827",
  padding: 24,
};