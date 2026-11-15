import Link from "next/link";
import { supabase } from "../../lib/supabase";
import type { CSSProperties } from "react";

type Video = {
  id: number;
  creator: string;
  title: string;
  youtube_url: string;
  thumbnail: string;
  category: string;
  published_at: string;
  creator_channel?: string;
  creator_tiktok?: string;
  creator_instagram?: string;
  creator_x?: string;
};

export default async function CreatorVideoPage() {
  const { data: videos, error } = await supabase
    .from("creator_videos")
    .select("id, creator, title, youtube_url, category, published_at");

  const groupedVideos = (videos || []).reduce(
    (groups: Record<string, any[]>, video: any) => {
      const creator = video.creator || "Altro";

      if (!groups[creator]) {
        groups[creator] = [];
      }

      groups[creator].push(video);
      return groups;
    },
    {}
  );

  return (
    <main className="ac1899-home min-h-screen"><div className="home-section-inner">
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
        Object.keys(groupedVideos).map((creator) => {
          const creatorVideos = groupedVideos[creator];
          const firstVideo = creatorVideos[0];

          return (
            <section key={creator} style={creatorSection}>
              <div style={creatorHeader}>
                <div>
                  <span style={badge}>CREATOR</span>
                  <h2 style={creatorTitle}>{creator}</h2>
                </div>

                <div style={socials}>
                  {firstVideo.creator_channel && (
                    <a href={firstVideo.creator_channel} target="_blank" style={socialLink}>
                      YouTube
                    </a>
                  )}

                  {firstVideo.creator_tiktok && (
                    <a href={firstVideo.creator_tiktok} target="_blank" style={socialLink}>
                      TikTok
                    </a>
                  )}

                  {firstVideo.creator_instagram && (
                    <a href={firstVideo.creator_instagram} target="_blank" style={socialLink}>
                      Instagram
                    </a>
                  )}

                  {firstVideo.creator_x && (
                    <a href={firstVideo.creator_x} target="_blank" style={socialLink}>
                      X
                    </a>
                  )}
                </div>
              </div>

              <div style={grid}>
                {creatorVideos.map((video: Video) => (
                  <article key={video.id} style={card}>
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.title} style={thumbnail} />
                    ) : (
                      <div style={placeholder}>🎥</div>
                    )}

                    <div style={{ padding: 18 }}>
                      <span style={cardBadge}>{video.category || "Video"}</span>

                      <h3 style={cardTitle}>{video.title}</h3>

                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={button}
                      >
                        Guarda →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}

      <Link href="/" style={backLink}>
        ← Torna alla Home
      </Link>
    </div></main>
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
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: 1,
};

const title = {
  fontSize: 42,
  margin: "14px 0 10px",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: 18,
  maxWidth: 760,
  lineHeight: 1.5,
};

const creatorSection = {
  maxWidth: 1200,
  margin: "0 auto 34px",
  background: "#111827",
  border: "1px solid rgba(255,255,255,.08)",
  padding: 24,
};

const creatorHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 20,
};

const creatorTitle = {
  fontSize: 30,
  margin: "8px 0 0",
};

const socials = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
};

const socialLink = {
  color: "#f9fafb",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.12)",
  padding: "8px 10px",
  fontSize: 13,
  fontWeight: 800,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 260px), 1fr))",
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

const cardTitle = {
  fontSize: 20,
  lineHeight: 1.25,
  margin: "10px 0 0",
};

const button = {
  display: "inline-block",
  marginTop: 16,
  background: "#e30613",
  color: "white",
  padding: "8px 12px",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
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