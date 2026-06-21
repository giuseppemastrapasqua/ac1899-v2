"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Transfer = {
  id: number;
  player: string;
  role: string;
  club: string;
  type: "entrata" | "uscita" | "prestito";
  formula: string;
  cost: number;
  contract: string;
  source: string;
  created_at: string;
};

export default function MercatoPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransfers();
  }, []);

  async function loadTransfers() {
    const { data, error } = await supabase
      .from("transfers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setTransfers(data || []);
    setLoading(false);
  }

  const incoming = transfers.filter((item) => item.type === "entrata");
  const outgoing = transfers.filter((item) => item.type === "uscita");
  const loans = transfers.filter((item) => item.type === "prestito");

  const spent = incoming.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const earned = outgoing.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const balance = earned - spent;
  const biggestDeal = [...transfers].sort(
    (a, b) => Number(b.cost || 0) - Number(a.cost || 0)
  )[0];

  if (loading) {
    return (
      <main style={page}>
        <section style={card}>
          <h1>Caricamento mercato...</h1>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={hero}>
        <h1 style={{ margin: 0, fontSize: 46 }}>💰 Mercato Milan PRO</h1>
        <p>
          Acquisti, cessioni, prestiti, costi, fonti e saldo economico della
          sessione mercato.
        </p>
      </section>

      <section style={summaryGrid}>
        <Box title="Spesa totale" value={`${spent} M€`} />
        <Box title="Incasso totale" value={`${earned} M€`} />
        <Box title="Saldo mercato" value={`${balance} M€`} />
        <Box title="Acquisti" value={String(incoming.length)} />
        <Box title="Cessioni" value={String(outgoing.length)} />
        <Box title="Prestiti" value={String(loans.length)} />
      </section>

      <section style={card}>
        <h2>🔥 Operazione principale</h2>

        {biggestDeal ? (
          <div style={highlightDeal}>
            <div>
              <p style={{ margin: 0, color: "#991b1b", fontWeight: "bold" }}>
                {biggestDeal.type.toUpperCase()}
              </p>
              <h2 style={{ margin: "8px 0" }}>{biggestDeal.player}</h2>
              <p>
                {biggestDeal.club || "-"} · {biggestDeal.formula || "-"}
              </p>
              <p>
                <strong>Fonte:</strong> {biggestDeal.source || "-"}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 42, fontWeight: "bold", margin: 0 }}>
                {biggestDeal.cost || 0} M€
              </p>
              <Badge type={biggestDeal.type} />
            </div>
          </div>
        ) : (
          <p>Nessuna operazione inserita.</p>
        )}
      </section>

      <section style={card}>
        <h2>📋 Tabella movimenti</h2>

        {transfers.length === 0 ? (
          <p>Nessun movimento inserito.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <Th>Giocatore</Th>
                  <Th>Tipo</Th>
                  <Th>Ruolo</Th>
                  <Th>Club</Th>
                  <Th>Formula</Th>
                  <Th>Costo/Incasso</Th>
                  <Th>Contratto</Th>
                  <Th>Fonte</Th>
                </tr>
              </thead>

              <tbody>
                {transfers.map((item) => (
                  <tr key={item.id}>
                    <Td>
                      <strong>{item.player}</strong>
                    </Td>
                    <Td>
                      <Badge type={item.type} />
                    </Td>
                    <Td>{item.role || "-"}</Td>
                    <Td>{item.club || "-"}</Td>
                    <Td>{item.formula || "-"}</Td>
                    <Td>
                      <strong>{item.cost || 0} M€</strong>
                    </Td>
                    <Td>{item.contract || "-"}</Td>
                    <Td>{item.source || "-"}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section style={columnsGrid}>
        <TransferColumn
          title="✅ Acquisti"
          items={incoming}
          empty="Nessun acquisto inserito."
        />

        <TransferColumn
          title="👋 Cessioni"
          items={outgoing}
          empty="Nessuna cessione inserita."
        />

        <TransferColumn
          title="🔄 Prestiti"
          items={loans}
          empty="Nessun prestito inserito."
        />
      </section>

      <section style={card}>
        <h2>🧠 Nota editoriale</h2>
        <p style={{ lineHeight: 1.7 }}>
          Le cifre economiche sono gestite manualmente dalla redazione Milan Hub.
          Ogni operazione può includere formula, fonte e contratto per mantenere
          la sezione chiara, verificabile e sempre aggiornata.
        </p>
      </section>
    </main>
  );
}

function TransferColumn({
  title,
  items,
  empty,
}: {
  title: string;
  items: Transfer[];
  empty: string;
}) {
  const total = items.reduce((sum, item) => sum + Number(item.cost || 0), 0);

  return (
    <section style={card}>
      <h2>{title}</h2>
      <p style={{ color: "#991b1b", fontWeight: "bold" }}>
        Totale: {total} M€
      </p>

      {items.length === 0 ? (
        <p>{empty}</p>
      ) : (
        items.map((item) => (
          <article key={item.id} style={miniCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h3 style={{ marginTop: 0 }}>{item.player}</h3>
                <p>
                  <strong>Club:</strong> {item.club || "-"}
                </p>
                <p>
                  <strong>Formula:</strong> {item.formula || "-"}
                </p>
                <p>
                  <strong>Fonte:</strong> {item.source || "-"}
                </p>
              </div>

              <strong style={{ color: "#991b1b", whiteSpace: "nowrap" }}>
                {item.cost || 0} M€
              </strong>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={{ fontSize: 34, fontWeight: "bold", color: "#991b1b", margin: 0 }}>
        {value}
      </p>
    </div>
  );
}

function Badge({ type }: { type: Transfer["type"] }) {
  const label =
    type === "entrata" ? "Entrata" : type === "uscita" ? "Uscita" : "Prestito";

  const background =
    type === "entrata" ? "#dcfce7" : type === "uscita" ? "#fee2e2" : "#dbeafe";

  const color =
    type === "entrata" ? "#166534" : type === "uscita" ? "#991b1b" : "#1d4ed8";

  return (
    <span
      style={{
        background,
        color,
        padding: "6px 10px",
        borderRadius: 999,
        fontWeight: "bold",
        fontSize: 13,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: 12,
        borderBottom: "2px solid #e5e7eb",
        background: "#f9fafb",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: 12,
        borderBottom: "1px solid #e5e7eb",
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
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
  padding: 36,
  borderRadius: 22,
  marginBottom: 24,
};

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: 16,
};

const columnsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 24,
};

const highlightDeal = {
  display: "flex",
  justifyContent: "space-between",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap" as const,
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: 22,
};

const miniCard = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 16,
  marginBottom: 14,
  background: "#fafafa",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  minWidth: 860,
};