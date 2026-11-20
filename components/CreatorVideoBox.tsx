import Link from "next/link";

export default function CreatorVideoBox() {
  const cards = [
    {
      icon: "🎬",
      title: "Ultimo video",
      text: "L’ultimo contenuto pubblicato dai creator rossoneri AC1899.",
    },
    {
      icon: "🎙️",
      title: "Analisi creator",
      text: "Approfondimenti, reaction e commenti tecnici sul mondo Milan.",
    },
    {
      icon: "⚡",
      title: "Shorts & Clip",
      text: "Momenti brevi, verticali e contenuti rapidi per social e community.",
    },
  ];

  return (
    <section style={box}>
      <span style={badge}>🎥 CREATOR VIDEO</span>

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

      <Link href="/creator-video" style={button}>
        Video →
      </Link>
    </section>
  );
}

const box = {
  background: "var(--home-surface, #111827)",
  color: "var(--home-text, #f9fafb)",
  padding: 28,
  border: "1px solid var(--home-border, rgba(255,255,255,.08))",
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
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 16,
  marginTop: 28,
};

const card = {
  background: "var(--home-surface, #111827)",
  border: "1px solid var(--home-border, rgba(255,255,255,.08))",
  padding: 20,
  minHeight: 220,
};

const icon = {
  fontSize: 28,
  marginBottom: 10,
};

const cardTitle = {
  color: "var(--home-text, #f9fafb)",
  fontSize: 20,
  fontWeight: 800,
  margin: "0 0 10px",
  lineHeight: 1.2,
};

const text = {
  color: "var(--home-muted, #9ca3af)",
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