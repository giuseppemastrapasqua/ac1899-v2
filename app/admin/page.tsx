"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import AdminGuard from "../../components/AdminGuard";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  created_at: string;
};

type TransferItem = {
  id: number;
  player: string;
  type: string;
  club: string;
  cost: number;
  created_at: string;
};

type PlayerItem = {
  id: number;
  name: string;
  surname: string;
  goals: number;
  assists: number;
};

export default function AdminPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    news: 0,
    featured: 0,
    transfers: 0,
    players: 0,
  });

  const [latestNews, setLatestNews] = useState<NewsItem | null>(null);
  const [latestTransfer, setLatestTransfer] = useState<TransferItem | null>(
    null
  );
  const [topScorer, setTopScorer] = useState<PlayerItem | null>(null);
  const [topAssistman, setTopAssistman] = useState<PlayerItem | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { count: newsCount } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true });

    const { count: featuredCount } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("featured", true);

    const { count: transfersCount } = await supabase
      .from("transfers")
      .select("*", { count: "exact", head: true });

    const { count: playersCount } = await supabase
      .from("players")
      .select("*", { count: "exact", head: true });

    const { data: lastNewsData } = await supabase
      .from("news")
      .select("id,title,category,created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const { data: lastTransferData } = await supabase
      .from("transfers")
      .select("id,player,type,club,cost,created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const { data: topScorerData } = await supabase
      .from("players")
      .select("id,name,surname,goals,assists")
      .order("goals", { ascending: false })
      .limit(1)
      .single();

    const { data: topAssistData } = await supabase
      .from("players")
      .select("id,name,surname,goals,assists")
      .order("assists", { ascending: false })
      .limit(1)
      .single();

    setStats({
      news: newsCount || 0,
      featured: featuredCount || 0,
      transfers: transfersCount || 0,
      players: playersCount || 0,
    });

    setLatestNews(lastNewsData || null);
    setLatestTransfer(lastTransferData || null);
    setTopScorer(topScorerData || null);
    setTopAssistman(topAssistData || null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const cards = [
    {
      title: "📰 Gestione News",
      text: "Crea, modifica ed elimina articoli con immagini e news in evidenza.",
      href: "/admin/news",
    },
    {
      title: "💰 Gestione Mercato",
      text: "Inserisci e aggiorna acquisti, cessioni, prestiti, costi e fonti.",
      href: "/admin/mercato",
    },
    {
      title: "🤖 Analisi AI",
      text: "Genera e pubblica analisi post-partita.",
      href: "/admin/analisi",
    },
    {
      title: "👥 Calciatori",
      text: "Gestisci rosa, statistiche, foto e schede giocatore.",
      href: "/admin/calciatori",
    },
    {
  title: "📬 Newsletter",
  text: "Visualizza e gestisci gli iscritti alla newsletter Milan Hub.",
  href: "/admin/newsletter",
},
  ];

  const statCards = [
    { title: "News pubblicate", value: stats.news, icon: "📰" },
    { title: "News in evidenza", value: stats.featured, icon: "🔥" },
    { title: "Movimenti mercato", value: stats.transfers, icon: "💰" },
    { title: "Calciatori", value: stats.players, icon: "👥" },
  ];

  return (
    <AdminGuard>
      <main
        style={{
          background: "#f3f4f6",
          minHeight: "100vh",
          padding: 24,
          fontFamily: "Arial",
          color: "#111827",
        }}
      >
        <section style={hero}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 42 }}>🔐 Admin Milan Hub</h1>
              <p>Dashboard operativa del portale rossonero.</p>
            </div>

            <button onClick={handleLogout} style={logoutButton}>
              🚪 Logout
            </button>
          </div>
        </section>

        <section style={statsGrid}>
          {statCards.map((item) => (
            <div key={item.title} style={card}>
              <p style={{ fontSize: 32, margin: 0 }}>{item.icon}</p>
              <h3>{item.title}</h3>
              <p style={bigNumber}>{item.value}</p>
            </div>
          ))}
        </section>

        <section style={insightGrid}>
          <InfoBox
            title="📰 Ultima news"
            value={latestNews?.title || "Nessuna news"}
            detail={latestNews?.category || "-"}
            href={latestNews ? `/news/${latestNews.id}` : "/admin/news"}
          />

          <InfoBox
            title="💰 Ultimo movimento"
            value={latestTransfer?.player || "Nessun movimento"}
            detail={
              latestTransfer
                ? `${latestTransfer.type} · ${latestTransfer.club || "-"} · ${
                    latestTransfer.cost || 0
                  } M€`
                : "-"
            }
            href="/admin/mercato"
          />

          <InfoBox
            title="⚽ Top marcatore"
            value={
              topScorer
                ? `${topScorer.name} ${topScorer.surname}`
                : "Non disponibile"
            }
            detail={topScorer ? `${topScorer.goals || 0} gol` : "-"}
            href={topScorer ? `/giocatore/${topScorer.id}` : "/admin/calciatori"}
          />

          <InfoBox
            title="🎯 Top assistman"
            value={
              topAssistman
                ? `${topAssistman.name} ${topAssistman.surname}`
                : "Non disponibile"
            }
            detail={topAssistman ? `${topAssistman.assists || 0} assist` : "-"}
            href={
              topAssistman
                ? `/giocatore/${topAssistman.id}`
                : "/admin/calciatori"
            }
          />
        </section>

        <section style={cardsGrid}>
          {cards.map((item) => (
            <Link key={item.href} href={item.href} style={adminCard}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <strong style={{ color: "#991b1b" }}>Apri →</strong>
            </Link>
          ))}
        </section>
      </main>
    </AdminGuard>
  );
}

function InfoBox({
  title,
  value,
  detail,
  href,
}: {
  title: string;
  value: string;
  detail: string;
  href: string;
}) {
  return (
    <Link href={href} style={adminCard}>
      <p style={{ color: "#991b1b", fontWeight: "bold", margin: 0 }}>
        {title}
      </p>
      <h3>{value}</h3>
      <p style={{ color: "#6b7280" }}>{detail}</p>
      <strong style={{ color: "#991b1b" }}>Apri →</strong>
    </Link>
  );
}

const hero = {
  background: "linear-gradient(135deg,#111827,#7f1d1d)",
  color: "white",
  padding: 32,
  borderRadius: 0,
  marginBottom: 24,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: 16,
  marginBottom: 24,
};

const insightGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 16,
  marginBottom: 24,
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 20,
};

const card = {
  background: "white",
  color: "#111827",
  padding: 22,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const adminCard = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  textDecoration: "none",
  display: "block",
};

const bigNumber = {
  fontSize: 36,
  fontWeight: "bold",
  color: "#991b1b",
  margin: 0,
};

const logoutButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};