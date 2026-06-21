import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Video = {
  id: number;
  creator: string;
  title: string;
  youtube_url: string;
  thumbnail: string;
  category: string;
  published_at: string;
};

export default async function CreatorVideoPage() {
  const { data: videos } = await supabase
    .from("creator_videos")
    .select("*")
    .order("published_at", { ascending: false });

  const groupedVideos = (videos || []).reduce((groups: any, video: Video) => {
    if (!groups[video.creator]) {
      groups[video.creator] = [];
    }

    groups[video.creator].push(video);
    return groups;
  }, {});

  return (
    <main style={page}>
      <section style={hero}>
        <span style={badge}>🎥 CREATOR VIDEO</span>
        <h1 style={title}>AC1899 Creator Room</h1>
        <p style={subtitle}>
          Video, reaction, analisi e contenuti dei creator rossoneri selezionati
          dalla redazione AC1899.
        </p>
      </section>

      {Object.keys(groupedVideos).length === 0 ? (
        <section style={emptyBox}>
          <p>Nessun video inserito.</p>
        </section>
      ) : (
        Object.keys(groupedVideos).map((creator) => (
          <section key={creator} style={creatorSection}>
            <h2 style={creatorTitle}>{creator}</h2>

            <div style={grid}>
              {groupedVideos[creator].map((video: Video) => (
                <article key={video.id} style={card}>
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={thumbnail}
                    />
                  ) : (
                    <div style={placeholder}>🎥</div>
                  )}

                  <div style={{ padding: 18 }}>
                    <span style={cardBadge}>{video.category || "Video"}</span>
                    <h3>{video.title}</h3>

                    <a
                      href={video.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={button}
                    >
                      Guarda video →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}

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
  margin: "0 auto 28px",
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

const creatorSection = {
  maxWidth: 1200,
  margin: "0 auto 34px",
};

const creatorTitle = {
  fontSize: 30,
  borderLeft: "5px solid #e30613",
  paddingLeft: 14,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 18,
};

const card = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
};

const thumbnail = {
  width: "100%",
  height: 170,
  objectFit: "cover" as const,
};

const placeholder = {
  height: 170,
  display: "grid",
  placeItems: "center",
  fontSize: 44,
  background: "rgba(255,255,255,.06)",
};

const cardBadge = {
  color: "#e30613",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1,
};

const button = {
  display: "inline-block",
  marginTop: 14,
  background: "#e30613",
  color: "white",
  padding: "10px 14px",
  textDecoration: "none",
  fontWeight: "bold",
};

const emptyBox = {
  maxWidth: 1200,
  margin: "0 auto",
  background: "#111827",
  padding: 24,
};

const backLink = {
  display: "block",
  maxWidth: 1200,
  margin: "32px auto 0",
  color: "#e30613",
  fontWeight: 800,
  textDecoration: "none",
};