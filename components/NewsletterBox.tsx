"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; message: string }>();

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const address = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) || address.length > 254) {
      setFeedback({ kind: "error", message: "Inserisci un indirizzo email valido." });
      return;
    }
    setLoading(true);
    setFeedback(undefined);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email: address }]).abortSignal(AbortSignal.timeout(12000));
      if (error) {
        if (error.code === "23505") {
          setFeedback({ kind: "success", message: "Questo indirizzo è già iscritto alla newsletter." });
        } else {
          setFeedback({ kind: "error", message: "Non siamo riusciti a completare l’iscrizione. Riprova tra poco." });
          console.error("[newsletter] Iscrizione fallita", { code: error.code });
        }
        return;
      }
      setEmail("");
      setFeedback({ kind: "success", message: "Iscrizione completata! Sei nella newsletter di AC1899." });
    } catch {
      setFeedback({ kind: "error", message: "Connessione non disponibile. Controlla la rete e riprova." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ac1899-box"
      id="newsletter"
      aria-labelledby="newsletter-title"
      style={{
        background: "var(--home-surface, #111827)",
        border: "1px solid var(--home-border, rgba(255,255,255,.08))",
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
        id="newsletter-title"
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
          color: "var(--home-muted, #9ca3af)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        Ricevi news, mercato, pagelle e analisi esclusive del mondo rossonero.
      </p>

      <form onSubmit={subscribe} aria-busy={loading}
        style={{
          display: "grid",
          gap: 10,
          marginTop: 18,
        }}
      >
        <input
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          name="email"
          aria-describedby={feedback ? "newsletter-feedback" : undefined}
          aria-label="Indirizzo email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: "var(--home-surface, #020617)",
            color: "var(--home-text, white)",
            border: "1px solid var(--home-border, rgba(255,255,255,.08))",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
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
          {loading ? "Iscrizione..." : "Iscriviti"}
        </button>
        {feedback && <p id="newsletter-feedback" role={feedback.kind === "error" ? "alert" : "status"} style={{ margin: 0, padding: "12px 14px", borderRadius: 6, fontSize: 15, background: feedback.kind === "error" ? "#fff1f2" : "#ecfdf5", color: feedback.kind === "error" ? "#9f1239" : "#166534" }}>{feedback.message}</p>}
      </form>
    </section>
  );
}