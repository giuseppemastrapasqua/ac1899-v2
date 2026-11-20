"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type Transfer = {
  id?: number;
  player: string;
  role: string;
  club: string;
  type: "entrata" | "uscita" | "prestito";
  formula: string;
  cost: number;
  contract: string;
  source: string;
  created_at?: string;
};

export default function AdminMercatoPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [player, setPlayer] = useState("");
  const [role, setRole] = useState("");
  const [club, setClub] = useState("");
  const [type, setType] = useState<"entrata" | "uscita" | "prestito">(
    "entrata"
  );
  const [formula, setFormula] = useState("Acquisto");
  const [cost, setCost] = useState("");
  const [contract, setContract] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadTransfers();
  }, []);

  async function loadTransfers() {
    const { data, error } = await supabase
      .from("transfers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Errore nel caricamento mercato da Supabase");
      console.error(error);
      return;
    }

    setTransfers(data || []);
  }

  function resetForm() {
    setPlayer("");
    setRole("");
    setClub("");
    setType("entrata");
    setFormula("Acquisto");
    setCost("");
    setContract("");
    setSource("");
    setEditingId(null);
  }

  function editTransfer(item: Transfer) {
    setEditingId(item.id || null);
    setPlayer(item.player || "");
    setRole(item.role || "");
    setClub(item.club || "");
    setType(item.type || "entrata");
    setFormula(item.formula || "Acquisto");
    setCost(String(item.cost || ""));
    setContract(item.contract || "");
    setSource(item.source || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveTransfer() {
    if (!player.trim()) {
      alert("Inserisci il nome del calciatore");
      return;
    }

    setLoading(true);

    const payload = {
      player,
      role,
      club,
      type,
      formula,
      cost: Number(cost) || 0,
      contract,
      source,
    };

    const { error } = editingId
      ? await supabase.from("transfers").update(payload).eq("id", editingId)
      : await supabase.from("transfers").insert([payload]);

    setLoading(false);

    if (error) {
      alert("Errore durante il salvataggio su Supabase");
      console.error(error);
      return;
    }

    await loadTransfers();
    resetForm();

    alert(
      editingId
        ? "Movimento mercato aggiornato!"
        : "Movimento mercato salvato su Supabase!"
    );
  }

  async function deleteTransfer(id?: number) {
    if (!id) return;

    const confirmDelete = confirm("Vuoi eliminare questo movimento?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("transfers").delete().eq("id", id);

    if (error) {
      alert("Errore durante l'eliminazione");
      console.error(error);
      return;
    }

    await loadTransfers();

    if (editingId === id) {
      resetForm();
    }
  }

  const spent = transfers
    .filter((item) => item.type === "entrata")
    .reduce((sum, item) => sum + Number(item.cost || 0), 0);

  const earned = transfers
    .filter((item) => item.type === "uscita")
    .reduce((sum, item) => sum + Number(item.cost || 0), 0);

  const balance = earned - spent;

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
          <h1 style={{ margin: 0, fontSize: 42 }}>💰 Admin Mercato</h1>
          <p>Gestisci acquisti, cessioni, prestiti, costi e fonti.</p>
        </section>

        <section style={card}>
          <h2>
            {editingId ? "✏️ Modifica movimento" : "Nuovo movimento"}
          </h2>

          <label>Calciatore</label>
          <input
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="Es. Samuele Ricci"
            style={inputStyle}
          />

          <label>Ruolo</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Es. Centrocampista"
            style={inputStyle}
          />

          <label>Club</label>
          <input
            value={club}
            onChange={(e) => setClub(e.target.value)}
            placeholder="Club provenienza o destinazione"
            style={inputStyle}
          />

          <label>Tipo movimento</label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "entrata" | "uscita" | "prestito")
            }
            style={inputStyle}
          >
            <option value="entrata">Entrata</option>
            <option value="uscita">Uscita</option>
            <option value="prestito">Prestito</option>
          </select>

          <label>Formula</label>
          <input
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="Acquisto, prestito, obbligo, riscatto..."
            style={inputStyle}
          />

          <label>Costo / Incasso in milioni €</label>
          <input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Es. 25"
            style={inputStyle}
          />

          <label>Contratto</label>
          <input
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            placeholder="Es. fino al 2029"
            style={inputStyle}
          />

          <label>Fonte</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Es. AC Milan, Sky, Gazzetta..."
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={saveTransfer}
              disabled={loading}
              style={{
                background: loading ? "#6b7280" : "#991b1b",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: 10,
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Salvataggio..."
                : editingId
                ? "Aggiorna movimento"
                : "Salva movimento"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                style={{
                  background: "#374151",
                  color: "white",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: 10,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Annulla modifica
              </button>
            )}
          </div>
        </section>

        <section style={card}>
          <h2>📊 Riepilogo economico</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 180px), 1fr))",
              gap: 16,
            }}
          >
            <Box title="Spesa" value={`${spent} M€`} />
            <Box title="Incasso" value={`${earned} M€`} />
            <Box title="Saldo" value={`${balance} M€`} />
            <Box title="Movimenti" value={String(transfers.length)} />
          </div>
        </section>

        <section style={card}>
          <h2>Movimenti salvati</h2>

          {transfers.length === 0 ? (
            <p>Nessun movimento inserito.</p>
          ) : (
            transfers.map((item) => (
              <article
                key={item.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 16,
                  marginBottom: 16,
                }}
              >
                <h3>{item.player}</h3>

                <p>
                  <strong>Tipo:</strong> {item.type}
                </p>

                <p>
                  <strong>Ruolo:</strong> {item.role || "-"}
                </p>

                <p>
                  <strong>Club:</strong> {item.club || "-"}
                </p>

                <p>
                  <strong>Formula:</strong> {item.formula || "-"}
                </p>

                <p>
                  <strong>Costo/Incasso:</strong> {item.cost} M€
                </p>

                <p>
                  <strong>Contratto:</strong> {item.contract || "-"}
                </p>

                <p>
                  <strong>Fonte:</strong> {item.source || "-"}
                </p>

                <button
                  onClick={() => editTransfer(item)}
                  style={{
                    background: "#111827",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginRight: 8,
                  }}
                >
                  Modifica
                </button>

                <button
                  onClick={() => deleteTransfer(item.id)}
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
            ))
          )}
        </section>
      </main>
    </AdminGuard>
  );
}

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        padding: 18,
        borderRadius: 14,
        border: "1px solid #e5e7eb",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: 30, fontWeight: "bold", margin: 0 }}>{value}</p>
    </div>
  );
}

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 18,
  background: "white",
  color: "#111827",
  border: "1px solid #d1d5db",
  borderRadius: 10,
};