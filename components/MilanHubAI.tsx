import Link from "next/link";

export default function MilanHubAI() {
  const articles = [
    {
      icon: "📊",
      title: "Analisi ultima partita",
      text: "Risultato, andamento, gol, prestazioni e momenti chiave dell’ultimo match rossonero.",
      href: "/analisi",
      button: "Analisi",
    },
    {
      icon: "⭐",
      title: "MVP Milan Hub",
      text: "Il migliore in campo scelto in base a rendimento, impatto statistico e peso nella partita.",
      href: "/mvp",
      button: "MVP",
    },
    {
      icon: "🎯",
      title: "Prossimo avversario",
      text: "Punti forti, punti deboli, giocatore chiave e chiave tattica della prossima squadra che affronterà il Milan.",
      href: "/avversario",
      button: "Preview",
    },
    {
      icon: "📈",
      title: "Focus giocatore",
      text: "Approfondimento sui protagonisti rossoneri usando statistiche reali e rendimento stagionale.",
      href: "/focus",
      button: "Focus",
    },
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
          gap: 16,
        }}
      >
        {articles.map((item, index) => (
          <article
            key={index}
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,.08)",
              padding: 20,
              minHeight: 270,
              display: "flex",
              flexDirection: "column",
              borderRadius: 0,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>
                {item.icon}
              </div>

              <h3
                style={{
                  color: "#f9fafb",
                  fontSize: 22,
                  fontWeight: 800,
                  margin: "0 0 10px",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#9ca3af",
                  lineHeight: 1.55,
                  fontSize: 15,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>

            <Link
              href={item.href}
              style={{
                display: "inline-block",
                marginTop: 18,
                background: "#e30613",
                color: "white",
                padding: "8px 12px",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                alignSelf: "flex-start",
                textTransform: "uppercase",
                letterSpacing: 1,
                borderRadius: 0,
              }}
            >
              {item.button} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}