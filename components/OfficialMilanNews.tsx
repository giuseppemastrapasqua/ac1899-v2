import { getOfficialMilanNews } from "../lib/acmilan-news";

export default async function OfficialMilanNews() {
  const news = await getOfficialMilanNews();
  const homeNews = news.slice(0, 3);

  const card = {
    background: "#111827",
    color: "#f9fafb",
    padding: 0,
    borderRadius: 0,
    boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <section>
      {homeNews.length === 0 ? (
        <article
          style={{
            background: "#111827",
            color: "#f9fafb",
            padding: 18,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p>Notizie ufficiali momentaneamente non disponibili.</p>
        </article>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 14,
          }}
        >
          {homeNews.map((item, index) => (
            <article key={index} style={card}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: 14 }}>
                <p
                  style={{
                    color: "#e30613",
                    fontWeight: "bold",
                    margin: 0,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {item.source}
                </p>

                <h3
                  style={{
                    marginTop: 8,
                    marginBottom: 8,
                    fontSize: 16,
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>

                {item.date && (
                  <small style={{ color: "#9ca3af" }}>{item.date}</small>
                )}

                <br />

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    color: "#e30613",
                    fontWeight: "bold",
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  Leggi →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}