"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RosaPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("shirt_number", { ascending: true });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPlayers(data || []);
    setLoading(false);
  }

  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.name || ""} ${player.surname || ""}`;
    const text = `${fullName} ${player.position || ""} ${
      player.nationality || ""
    }`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <main style={page}>
        <h1>Caricamento rosa...</h1>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={hero}>
        <h1 style={{ margin: 0, fontSize: 42 }}>👥 Rosa Milan</h1>
        <p>Giocatori, statistiche e schede della squadra.</p>
      </section>

      <section style={searchBox}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Cerca giocatore, ruolo o nazionalità..."
          style={input}
        />

        <p style={{ margin: 0, color: "#4b5563" }}>
          Giocatori trovati: <strong>{filteredPlayers.length}</strong>
        </p>
      </section>

      {filteredPlayers.length === 0 ? (
        <section style={card}>
          <p style={{ color: "#111827" }}>Nessun calciatore trovato.</p>
        </section>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
          }}
        >
          {filteredPlayers.map((player: any) => (
            <Link
              key={player.id}
              href={`/giocatore/${player.id}`}
              style={{
                ...card,
                textDecoration: "none",
                display: "block",
                color: "#111827",
              }}
            >
              {player.photo_url && (
                <img
                  src={player.photo_url}
                  alt={`${player.name} ${player.surname}`}
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 14,
                    marginBottom: 14,
                    background: "#e5e7eb",
                  }}
                />
              )}

              <p
                style={{
                  color: "#991b1b",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                #{player.shirt_number || "-"} · {player.position}
              </p>

              <h2
                style={{
                  color: "#111827",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {player.name} {player.surname}
              </h2>

              <p style={{ color: "#111827", marginBottom: 10 }}>
                {player.nationality || "Nazionalità non disponibile"}
              </p>

              <p style={{ color: "#111827" }}>
                ⚽ Gol: <strong>{player.goals || 0}</strong>
                <br />
                🎯 Assist: <strong>{player.assists || 0}</strong>
              </p>

              <p
                style={{
                  color: "#991b1b",
                  fontWeight: "bold",
                  marginTop: 16,
                }}
              >
                Scheda giocatore →
              </p>
            </Link>
          ))}
        </section>
      )}
    </main>
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

const searchBox = {
  background: "white",
  padding: 20,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "1px solid #d1d5db",
  marginBottom: 12,
  fontSize: 16,
  color: "#111827",
  background: "white",
};

const card = {
  background: "white",
  color: "#111827",
  padding: 20,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};