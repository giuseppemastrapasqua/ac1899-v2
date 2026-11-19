"use client";
import { adminFetch } from "../../../lib/admin-fetch";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

export default function AdminAnalisiPage() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const matchData = {
    partita: "AC Milan vs Monza",
    risultato: "2-0",
    competizione: "Serie A",
    possessoMilan: "58%",
    tiriMilan: 16,
    tiriPortaMilan: 6,
    cornerMilan: 7,
    falliMilan: 11,
    marcatori: ["Pulisic", "Leao"],
    mvp: "Maignan",
    note: "Analisi generata usando dati partita e statistiche disponibili.",
  };

  async function generateAiAnalysis() {
    setLoading(true);
    setAnalysis("");

    try {
      const res = await adminFetch("/api/genera-analisi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      });

      const data = await res.json();

      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        alert("Errore nella generazione dell'analisi");
      }
    } catch {
      alert("Errore durante la chiamata AI");
    } finally {
      setLoading(false);
    }
  }

  async function publishAnalysis() {
    if (!analysis.trim()) {
      alert("Genera o scrivi prima un'analisi");
      return;
    }

    setPublishing(true);

    const { error } = await supabase.from("news").insert([
      {
        title: "Analisi Milan Hub: la lettura della partita",
        subtitle: "Approfondimento generato dall'AI sui dati del match",
        content: analysis,
        category: "Analisi",
        image_url: "",
        featured: false,
      },
    ]);

    setPublishing(false);

    if (error) {
      alert("Errore durante la pubblicazione su Supabase");
      console.error(error);
      return;
    }

    alert("Analisi pubblicata tra gli articoli Milan Hub!");
  }

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
        <section
          style={{
            background: "linear-gradient(135deg,#111827,#7f1d1d)",
            color: "white",
            padding: 32,
            borderRadius: 0,
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 42 }}>
            🤖 Admin Analisi Milan Hub
          </h1>
          <p>Genera, modifica e pubblica analisi post-partita con AI.</p>
        </section>

        <section style={card}>
          <h2>Generatore analisi AI</h2>

          <p>
            Partita esempio: <strong>{matchData.partita}</strong> -{" "}
            <strong>{matchData.risultato}</strong>
          </p>

          <button
            onClick={generateAiAnalysis}
            disabled={loading}
            style={{
              background: loading ? "#6b7280" : "#991b1b",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: 0,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginRight: 12,
            }}
          >
            {loading ? "Generazione in corso..." : "Genera analisi AI"}
          </button>

          <button
            onClick={publishAnalysis}
            disabled={publishing}
            style={{
              background: publishing ? "#6b7280" : "#111827",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: 0,
              fontWeight: "bold",
              cursor: publishing ? "not-allowed" : "pointer",
            }}
          >
            {publishing ? "Pubblicazione..." : "Pubblica tra gli articoli"}
          </button>
        </section>

        <section style={card}>
          <h2>Testo analisi</h2>

          <textarea
            value={analysis}
            onChange={(e) => setAnalysis(e.target.value)}
            placeholder="Qui comparirà l'analisi generata dall'AI..."
            rows={22}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 0,
              border: "1px solid #d1d5db",
              color: "#111827",
              background: "white",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          />
        </section>
      </main>
    </AdminGuard>
  );
}

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 0,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};