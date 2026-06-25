"use client";

import { useState } from "react";
import AdminGuard from "../../../components/AdminGuard";

export default function DailyEditorialAdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function generateEditorial() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/daily-editorial/generate", {
      method: "POST",
    });

    const data = await res.json();

    setLoading(false);
    setResult(data);

    if (!res.ok) {
      alert(data.error || "Errore generazione editoriale");
      return;
    }

    alert("Editoriale generato!");
  }

  return (
    <AdminGuard>
      <main style={{ padding: 40, color: "white", background: "#020617", minHeight: "100vh" }}>
        <h1>📰 AC1899 Daily Editorial</h1>

        <p>Genera editoriale, script video e post social sulla giornata di Serie A.</p>

        <button
          onClick={generateEditorial}
          disabled={loading}
          style={{
            background: "#e30613",
            color: "white",
            padding: "14px 22px",
            border: "none",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {loading ? "Generazione in corso..." : "Genera Editoriale"}
        </button>

        {result && (
          <pre
            style={{
              marginTop: 24,
              background: "#111827",
              padding: 20,
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </main>
    </AdminGuard>
  );
}