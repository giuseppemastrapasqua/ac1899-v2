"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Pagella = {
  id: number;
  player_name: string;
  match_name: string;
  vote: number;
  comment: string;
  is_mvp: boolean;
  is_top: boolean;
  is_flop: boolean;
  created_at: string;
};

export default function PagellePage() {
  const [pagelle, setPagelle] = useState<Pagella[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPagelle();
  }, []);

  async function loadPagelle() {
    const { data, error } = await supabase
      .from("pagelle")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPagelle(data || []);
    setLoading(false);
  }

  const latestMatch = pagelle[0]?.match_name || "";
  const latestPagelle = latestMatch
    ? pagelle.filter((item) => item.match_name === latestMatch)
    : [];

  const mvp = latestPagelle.find((item) => item.is_mvp);
  const tops = latestPagelle.filter((item) => item.is_top);
  const flops = latestPagelle.filter((item) => item.is_flop);

  if (loading) {
    return (
      <main style={page}>
        <section style={card}>
          <h1>Caricamento pagelle...</h1>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={hero}>
        <h1 style={{ margin: 0, fontSize: 42 }}>⭐ Pagelle Milan Hub</h1>
        <p>Voti, commenti, MVP, Top e Flop della redazione.</p>

        {latestMatch && <h2 style={{ marginBottom: 0 }}>{latestMatch}</h2>}
      </section>

      {latestPagelle.length === 0 ? (
        <section style={card}>
          <p>Nessuna pagella pubblicata.</p>
        </section>
      ) : (
        <>
          <section style={summaryGrid}>
            <HighlightBox
              title="⭐ MVP"
              value={mvp?.player_name || "Non assegnato"}
              detail={mvp ? `Voto ${mvp.vote}` : "-"}
            />

            <HighlightBox
              title="🔥 Top"
              value={tops.length ? tops.map((p) => p.player_name).join(", ") : "Nessuno"}
              detail={`${tops.length} giocatori`}
            />

            <HighlightBox
              title="❌ Flop"
              value={flops.length ? flops.map((p) => p.player_name).join(", ") : "Nessuno"}
              detail={`${flops.length} giocatori`}
            />

            <HighlightBox
              title="Media voto"
              value={getAverage(latestPagelle).toFixed(2)}
              detail={`${latestPagelle.length} pagelle`}
            />
          </section>

          <section style={grid}>
            {latestPagelle.map((item) => (
              <article key={item.id} style={card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h2 style={{ marginTop: 0 }}>{item.player_name}</h2>

                    <p style={{ marginTop: 0, color: "#6b7280" }}>
                      {item.match_name}
                    </p>
                  </div>

                  <div style={voteBox}>{Number(item.vote).toFixed(1)}</div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  {item.is_mvp && <Badge text="⭐ MVP" background="#fef3c7" color="#92400e" />}
                  {item.is_top && <Badge text="🔥 TOP" background="#dcfce7" color="#166534" />}
                  {item.is_flop && <Badge text="❌ FLOP" background="#fee2e2" color="#991b1b" />}
                </div>

                <p style={{ lineHeight: 1.7 }}>
                  {item.comment || "Commento non disponibile."}
                </p>

                <small style={{ color: "#6b7280" }}>
                  {item.created_at
                 ? new Date(item.created_at).toLocaleDateString("it-IT")
                 : ""}
                </small>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

function getAverage(items: Pagella[]) {
  if (items.length === 0) return 0;

  const total = items.reduce((sum, item) => sum + Number(item.vote || 0), 0);
  return total / items.length;
}

function HighlightBox({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div style={card}>
      <p style={{ margin: 0, color: "#991b1b", fontWeight: "bold" }}>
        {title}
      </p>
      <h2>{value}</h2>
      <p style={{ margin: 0, color: "#6b7280" }}>{detail}</p>
    </div>
  );
}

function Badge({
  text,
  background,
  color,
}: {
  text: string;
  background: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        background,
        color,
        padding: "6px 10px",
        borderRadius: 999,
        fontWeight: "bold",
        fontSize: 13,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {text}
    </span>
  );
}

const page = {
  background: "#f3f4f6",
  minHeight: "100vh",
  padding: 24,
  fontFamily: "Arial",
  color: "#111827",
};

const hero = {
  background: "linear-gradient(135deg,#111827,#7f1d1d)",
  color: "white",
  padding: 32,
  borderRadius: 20,
  marginBottom: 24,
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 220px), 1fr))",
  gap: 16,
  marginBottom: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 280px), 1fr))",
  gap: 20,
};

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const voteBox = {
  minWidth: 72,
  height: 72,
  borderRadius: 18,
  background: "#991b1b",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  fontWeight: "bold",
};