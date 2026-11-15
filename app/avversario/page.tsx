import Link from "next/link";

export default function AvversarioPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🎯 PROSSIMO AVVERSARIO</span>

        <h1 style={title}>Torino vs AC Milan</h1>

        <p style={subtitle}>
          Analisi tattica, punti forti, punti deboli e chiavi della prossima
          partita rossonera.
        </p>
      </section>

      <section style={grid}>
        <article style={card}>
          <span style={cardBadge}>💪 PUNTI FORTI</span>
          <h2>Intensità e duelli</h2>
          <p style={text}>
            Squadra fisica, aggressiva sulle seconde palle e pericolosa nelle
            transizioni offensive.
          </p>
        </article>

        <article style={card}>
          <span style={cardBadge}>⚠️ PUNTI DEBOLI</span>
          <h2>Spazi alle spalle</h2>
          <p style={text}>
            Può concedere campo se viene attirata alta. Il Milan dovrà muovere
            velocemente il pallone.
          </p>
        </article>

        <article style={card}>
          <span style={cardBadge}>⭐ GIOCATORE CHIAVE</span>
          <h2>Da monitorare</h2>
          <p style={text}>
            Focus sul giocatore più influente dell’avversario in base a forma,
            ruolo e impatto offensivo.
          </p>
        </article>

        <article style={card}>
          <span style={cardBadge}>🧠 CHIAVE TATTICA</span>
          <h2>Come può vincere il Milan</h2>
          <p style={text}>
            Pressione ordinata, ampiezza sugli esterni e qualità tra le linee
            possono indirizzare la partita.
          </p>
        </article>
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
  maxWidth: 1100,
  margin: "0 auto 32px",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
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
  margin: "16px 0 12px",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: 20,
  maxWidth: 760,
  lineHeight: 1.5,
};

const grid = {
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 240px), 1fr))",
  gap: 18,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 24,
};

const cardBadge = {
  color: "#e30613",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1,
};

const text = {
  color: "#9ca3af",
  lineHeight: 1.6,
};

const backLink = {
  display: "block",
  maxWidth: 1100,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};