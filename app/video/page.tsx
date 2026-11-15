import { getMilanVideos } from "../../lib/youtube";

export default async function VideoPage() {
  const videos = await getMilanVideos();
  const featured = videos[0];

  return (
    <main
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "Arial",
        color: "#111827",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg, #111827, #7f1d1d)",
          color: "white",
          padding: "40px 32px",
        }}
      >
        <h1 style={{ fontSize: 42, margin: 0 }}>🎥 Milan Video</h1>
        <p style={{ fontSize: 18 }}>
          Ultimi video automatici da YouTube per categorie Milan.
        </p>
      </section>

      <section style={{ padding: 24 }}>
        {featured?.youtubeId && (
          <>
            <h2>🔥 Video in evidenza</h2>

            <div
              style={{
                background: "white",
                padding: 24,
                borderRadius: 18,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                marginBottom: 32,
              }}
            >
              <iframe
                width="100%"
                height="420"
                src={`https://www.youtube.com/embed/${featured.youtubeId}`}
                title={featured.title}
                allowFullScreen
                style={{
                  border: "none",
                  borderRadius: 14,
                }}
              />

              <p
                style={{
                  color: "#991b1b",
                  fontWeight: "bold",
                }}
              >
                {featured.category}
              </p>

              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
            </div>
          </>
        )}

        <h2>📺 Tutti i video</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 24,
          }}
        >
          {videos.map((video, index) => (
            <article
              key={index}
              style={{
                background: "white",
                padding: 20,
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              {video.youtubeId ? (
                <iframe
                  width="100%"
                  height="220"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allowFullScreen
                  style={{
                    border: "none",
                    borderRadius: 12,
                  }}
                />
              ) : (
                <p>Video non disponibile</p>
              )}

              <p
                style={{
                  color: "#991b1b",
                  fontWeight: "bold",
                  marginTop: 16,
                }}
              >
                {video.category}
              </p>

              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}