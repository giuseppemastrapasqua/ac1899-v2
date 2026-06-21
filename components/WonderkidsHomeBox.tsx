import Link from "next/link";

export default function WonderkidsHomeBox() {
  const cards = [
    {
      icon: "🧤",
      title: "Miglior portiere",
      text: "Il miglior talento U20 tra i pali nella settimana.",
    },
    {
      icon: "🛡️",
      title: "Miglior difensore",
      text: "Solidità, letture difensive e impatto nei duelli.",
    },
    {
      icon: "🎯",
      title: "Miglior centrocampista",
      text: "Qualità, visione, gestione del ritmo e controllo.",
    },
    {
      icon: "⚡",
      title: "Miglior attaccante",
      text: "Gol, dribbling, pericolosità e impatto offensivo.",
    },
  ];

  return (
    <section style={box}>
      <span style={badge}>⭐ WONDERKIDS U20</span>

      <div style={grid}>
        {cards.map((item) => (
          <article key={item.title} style={card}>
            <div>
              <div style={icon}>{item.icon}</div>
              <h3 style={cardTitle}>{item.title}</h3>
              <p style={text}>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <Link href="/wonderkids/team-of-the-week" style={button}>
        Team of the Week →
      </Link>
    </section>
  );
}

const box = {
  background: "#111827",
  color: "#f9fafb",
  padding: 28,
  border: "1px solid rgba(255,255,255,.08)",
  marginTop: 24,
  borderRadius: 0,
};

const badge = {
  color: "#e30613",
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 16,
  marginTop: 28,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 20,
  minHeight: 220,
};

const icon = {
  fontSize: 28,
  marginBottom: 10,
};

const cardTitle = {
  color: "#f9fafb",
  fontSize: 20,
  fontWeight: 800,
  margin: "0 0 10px",
  lineHeight: 1.2,
};

const text = {
  color: "#9ca3af",
  lineHeight: 1.55,
  fontSize: 15,
  margin: 0,
};

const button = {
  display: "inline-block",
  marginTop: 22,
  background: "#e30613",
  color: "white",
  padding: "8px 12px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
  borderRadius: 0,
};