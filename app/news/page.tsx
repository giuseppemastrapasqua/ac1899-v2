import PressNews from "../../components/PressNews";
import NewsList from "../../components/NewsList";
import OfficialMilanNews from "../../components/OfficialMilanNews";

export default function NewsPage() {
  const analysisArticles = [
    {
      title: "Analisi Milan Hub",
      text: "Analisi su partite, prestazioni dei giocatori e dati statistici, senza trattare notizie di mercato.",
    },
    {
      title: "Focus giocatore",
      text: "Approfondimenti sui protagonisti rossoneri basati su gol, assist, minuti giocati, rendimento e impatto sulla squadra.",
    },
  ];

  const card = {
    background: "white",
    color: "#111827",
    padding: 24,
    borderRadius: 18,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginBottom: 20,
  };

  return (
    <main
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: 24,
        fontFamily: "Arial",
        color: "#111827",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg,#111827,#7f1d1d)",
          color: "white",
          padding: 32,
          borderRadius: 20,
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 42 }}>📰 News Milan Hub</h1>
        <p>
          Notizie ufficiali, articoli della redazione, rassegna stampa e analisi
          rossonere.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <div>
          <h2>Ultime notizie ufficiali</h2>
          <OfficialMilanNews limit={20} />
        </div>

        <div>
          <h2>📝 Milan Hub Articles</h2>
          <NewsList />
        </div>
      </section>

      <PressNews />

      <section style={card}>
        <h2>📈 Analisi Milan Hub</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 280px), 1fr))",
            gap: 16,
          }}
        >
          {analysisArticles.map((item, index) => (
            <article
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 16,
                background: "#fafafa",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}