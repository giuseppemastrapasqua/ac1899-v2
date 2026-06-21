"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type Pagella = {
  id?: number;
  player_name: string;
  match_name: string;
  vote: number;
  comment: string;
  is_mvp: boolean;
  is_top: boolean;
  is_flop: boolean;
  created_at?: string;
};

export default function AdminPagellePage() {
  const [items, setItems] = useState<Pagella[]>([]);

  const [playerName, setPlayerName] = useState("");
  const [matchName, setMatchName] = useState("");
  const [vote, setVote] = useState("6");
  const [comment, setComment] = useState("");

  const [isMvp, setIsMvp] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [isFlop, setIsFlop] = useState(false);

  const [loading, setLoading] = useState(false);

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
      return;
    }

    setItems(data || []);
  }

  async function savePagella() {
    if (!playerName.trim() || !matchName.trim()) {
      alert("Inserisci giocatore e partita");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("pagelle").insert([
      {
        player_name: playerName,
        match_name: matchName,
        vote: Number(vote),
        comment,
        is_mvp: isMvp,
        is_top: isTop,
        is_flop: isFlop,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Errore nel salvataggio");
      return;
    }

    setPlayerName("");
    setMatchName("");
    setVote("6");
    setComment("");
    setIsMvp(false);
    setIsTop(false);
    setIsFlop(false);

    loadPagelle();

    alert("Pagella salvata!");
  }

  async function deletePagella(id?: number) {
    if (!id) return;

    const { error } = await supabase
      .from("pagelle")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    loadPagelle();
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
            borderRadius: 20,
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 42 }}>
            ⭐ Admin Pagelle
          </h1>

          <p>
            Inserisci voti, MVP, Top e Flop.
          </p>
        </section>

        <section style={card}>
          <h2>Nuova pagella</h2>

          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nome giocatore"
            style={inputStyle}
          />

          <input
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            placeholder="Es. Milan vs Inter"
            style={inputStyle}
          />

          <input
            value={vote}
            onChange={(e) => setVote(e.target.value)}
            placeholder="Voto"
            style={inputStyle}
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Commento"
            rows={5}
            style={inputStyle}
          />

          <label style={checkbox}>
            <input
              type="checkbox"
              checked={isMvp}
              onChange={(e) => setIsMvp(e.target.checked)}
            />
            MVP ⭐
          </label>

          <label style={checkbox}>
            <input
              type="checkbox"
              checked={isTop}
              onChange={(e) => setIsTop(e.target.checked)}
            />
            Top 🔥
          </label>

          <label style={checkbox}>
            <input
              type="checkbox"
              checked={isFlop}
              onChange={(e) => setIsFlop(e.target.checked)}
            />
            Flop ❌
          </label>

          <button
            onClick={savePagella}
            disabled={loading}
            style={button}
          >
            {loading ? "Salvataggio..." : "Salva Pagella"}
          </button>
        </section>

        <section style={card}>
          <h2>Pagelle salvate</h2>

          {items.map((item) => (
            <article
              key={item.id}
              style={{
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: 16,
                marginBottom: 16,
              }}
            >
              <h3>
                {item.player_name} - {item.vote}
              </h3>

              <p>
                <strong>Partita:</strong> {item.match_name}
              </p>

              <p>{item.comment}</p>

              <p>
                {item.is_mvp && "⭐ MVP "}
                {item.is_top && "🔥 TOP "}
                {item.is_flop && "❌ FLOP"}
              </p>

              <button
                onClick={() => deletePagella(item.id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Elimina
              </button>
            </article>
          ))}
        </section>
      </main>
    </AdminGuard>
  );
}

const card = {
  background: "white",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid #d1d5db",
};

const checkbox = {
  display: "block",
  marginBottom: 12,
};

const button = {
  background: "#991b1b",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: "bold",
};