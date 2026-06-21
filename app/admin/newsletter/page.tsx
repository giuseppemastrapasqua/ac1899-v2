"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type Subscriber = {
id: number;
email: string;
created_at: string;
};

export default function AdminNewsletterPage() {
const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
loadSubscribers();
}, []);

async function loadSubscribers() {
const { data, error } = await supabase
.from("newsletter_subscribers")
.select("*")
.order("created_at", { ascending: false });

if (error) {
  console.error(error);
  setLoading(false);
  return;
}

setSubscribers(data || []);
setLoading(false);

}

return ( <AdminGuard>
<main
style={{
background: "#f3f4f6",
minHeight: "100vh",
padding: 24,
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
📬 Newsletter Milan Hub </h1>

```
      <p>Gestione iscritti alla newsletter.</p>
    </section>

    <section
      style={{
        background: "white",
        padding: 24,
        borderRadius: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        marginBottom: 24,
      }}
    >
      <h2>Totale iscritti</h2>

      <p
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#991b1b",
        }}
      >
        {subscribers.length}
      </p>
    </section>

    <section
      style={{
        background: "white",
        padding: 24,
        borderRadius: 18,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2>Elenco iscritti</h2>

      {loading ? (
        <p>Caricamento...</p>
      ) : subscribers.length === 0 ? (
        <p>Nessun iscritto.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Email</th>
              <th style={th}>Data iscrizione</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.email}</td>

                <td style={td}>
                  {new Date(item.created_at).toLocaleString("it-IT")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  </main>
</AdminGuard>


);
}

const page = {
  background: "#030712",
  minHeight: "100vh",
  padding: 24,
  color: "#f9fafb",
  fontFamily: "Arial",
};

const card = {
  background: "#111827",
  color: "#f9fafb",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  marginBottom: 24,
  border: "1px solid rgba(255,255,255,0.08)",
};

const th = {
  textAlign: "left" as const,
  padding: 12,
  borderBottom: "2px solid #374151",
  color: "#f9fafb",
};

const td = {
  padding: 12,
  borderBottom: "1px solid #374151",
  color: "#e5e7eb",
};
