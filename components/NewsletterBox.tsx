"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    if (!email.includes("@")) {
      alert("Inserisci un indirizzo email valido");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    setLoading(false);

    if (error) {
      if (error.message.includes("duplicate")) {
        alert("Email già registrata");
      } else {
        alert("Errore durante l'iscrizione");
        console.error(error);
      }
      return;
    }

    setEmail("");
    alert("Iscrizione completata! 🔴⚫");
  }

  return (
    <section
      style={{
        background: "#111827",
        border: "1px solid rgba(255,255,255,.08)",
        borderTop: "2px solid #e30613",
        padding: 20,
        marginTop: 24,
      }}
    >
      <span
        style={{
          color: "#e30613",
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        📬 Newsletter
      </span>

      <h3
        style={{
          margin: "10px 0 8px",
          color: "#ffffff",
          fontSize: 24,
          lineHeight: 1.2,
        }}
      >
        Diventa un Insider
      </h3>

      <p
        style={{
          margin: 0,
          color: "#9ca3af",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        Ricevi news, mercato, pagelle e analisi esclusive del mondo rossonero.
      </p>

      <div
        style={{
          display: "grid",
          gap: 10,
          marginTop: 18,
        }}
      >
        <input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: "#020617",
            color: "white",
            border: "1px solid rgba(255,255,255,.08)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={subscribe}
          disabled={loading}
          style={{
            width: "100%",
            background: "#e30613",
            color: "white",
            border: "none",
            padding: "12px",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {loading ? "Iscrizione..." : "Iscriviti →"}
        </button>
      </div>
    </section>
  );
}