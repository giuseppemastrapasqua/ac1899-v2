"use client";
import { adminFetch } from "../../../lib/admin-fetch";

import { useState } from "react";
import AdminGuard from "../../../components/AdminGuard";

export default function WeeklySelectionPage() {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function runSelection() {
    setLoading(true);
    setResult(null);

    const res = await adminFetch("/api/wonderkids/weekly-selection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        week_start: "2026-06-01",
        week_end: "2026-06-24",
      }),
    });

    const data = await res.json();

    setLoading(false);
    setResult(data);

    if (!res.ok) {
      alert(data.error || "Errore selezione AI");
      return;
    }

    alert("Selezione AI completata!");
  }

  async function generateImages() {
    setImageLoading(true);
    setResult(null);

    const res = await adminFetch("/api/wonderkids/generate-images", {
      method: "POST",
    });

    const data = await res.json();

    setImageLoading(false);
    setResult(data);

    alert(data.message || "Immagini aggiornate");
  }

  return (
    <AdminGuard>
      <main style={{ padding: 40, fontFamily: "Arial" }}>
        <h1>⭐ Weekly Wonderkids Selection</h1>

        <p>
          Questa pagina avvia la selezione AI settimanale dai candidati nascosti.
        </p>

        <button
          onClick={runSelection}
          disabled={loading}
          style={{
            background: "#991b1b",
            color: "white",
            padding: "14px 22px",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Selezione in corso..." : "Genera selezione settimanale"}
        </button>

        <button
          onClick={generateImages}
          disabled={imageLoading}
          style={{
            marginLeft: 12,
            background: "#111827",
            color: "white",
            padding: "14px 22px",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {imageLoading ? "Generazione immagini..." : "Genera immagini"}
        </button>

        {result && (
          <pre
            style={{
              marginTop: 24,
              background: "#111827",
              color: "white",
              padding: 20,
              borderRadius: 12,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </main>
    </AdminGuard>
  );
}