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
        background:
          "linear-gradient(135deg,#111827,#7f1d1d)",
        color: "white",
        padding: 36,
        borderRadius: 24,
        textAlign: "center",
        marginTop: 30,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          fontSize: 34,
        }}
      >
        📬 Diventa un Insider
      </h2>

      <p
        style={{
          maxWidth: 700,
          margin: "0 auto 24px",
          color: "#e5e7eb",
          lineHeight: 1.6,
        }}
      >
        Ricevi in anteprima news, mercato, pagelle e analisi esclusive del mondo rossonero.
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: 320,
            padding: 14,
            borderRadius: 12,
            border: "none",
            fontSize: 16,
          }}
        />

        <button
          onClick={subscribe}
          disabled={loading}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: 12,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Iscrizione..." : "🚀 Iscriviti Gratis"}
        </button>
      </div>
    </section>
  );
}