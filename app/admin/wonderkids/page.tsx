"use client";
import { adminFetch } from "../../../lib/admin-fetch";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type Wonderkid = {
  id?: number;
  name: string;
  surname: string;
  age: number;
  nationality: string;
  club: string;
  position: string;
  preferred_foot: string;
  market_value: string;
  appearances: number;
  goals: number;
  assists: number;
  minutes_played: number;
  photo: string;
  youtube_url: string;
  slug: string;
};

const emptyWonderkid: Wonderkid = {
  name: "",
  surname: "",
  age: 0,
  nationality: "",
  club: "",
  position: "",
  preferred_foot: "",
  market_value: "",
  appearances: 0,
  goals: 0,
  assists: 0,
  minutes_played: 0,
  photo: "",
  youtube_url: "",
  slug: "",
};

function createSlug(name: string, surname: string) {
  return `${name}-${surname}`
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminWonderkidsPage() {
  const [players, setPlayers] = useState<Wonderkid[]>([]);
  const [form, setForm] = useState<Wonderkid>(emptyWonderkid);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiLoadingId, setAiLoadingId] = useState<number | null>(null);

  useEffect(() => {
    loadWonderkids();
  }, []);

  async function loadWonderkids() {
    const { data, error } = await supabase
      .from("wonderkids")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Errore caricamento wonderkids");
      console.error(error);
      return;
    }

    setPlayers(data || []);
  }

  function updateField(field: keyof Wonderkid, value: any) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      slug:
        field === "name" || field === "surname"
          ? createSlug(
              field === "name" ? value : prev.name,
              field === "surname" ? value : prev.surname
            )
          : prev.slug,
    }));
  }

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("wonderkids")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert("Errore upload immagine");
      console.error(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("wonderkids").getPublicUrl(fileName);

    updateField("photo", publicUrl);
  }

  function normalizeWonderkid(player: Wonderkid) {
    const slug = player.slug || createSlug(player.name, player.surname);

    return {
      name: player.name.trim(),
      surname: player.surname.trim(),
      age: Number(player.age) || 0,
      nationality: player.nationality.trim(),
      club: player.club.trim(),
      position: player.position.trim(),
      preferred_foot: player.preferred_foot.trim(),
      market_value: player.market_value.trim(),
      appearances: Number(player.appearances) || 0,
      goals: Number(player.goals) || 0,
      assists: Number(player.assists) || 0,
      minutes_played: Number(player.minutes_played) || 0,
      photo: player.photo.trim(),
      youtube_url: player.youtube_url.trim(),
      slug,
    };
  }

  async function generateAI(id: number) {
    setAiLoadingId(id);

    const res = await adminFetch("/api/wonderkids/generate-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    setAiLoadingId(null);

    if (!res.ok) {
      alert(data.error || "Errore generazione AI");
      console.error(data);
      return;
    }

    await loadWonderkids();
    alert("Analisi AI generata correttamente!");
  }

  async function saveWonderkid() {
    if (!form.name.trim() || !form.surname.trim() || !form.position.trim()) {
      alert("Inserisci almeno nome, cognome e ruolo");
      return;
    }

    setLoading(true);

    const payload = normalizeWonderkid(form);

    if (editingId) {
      const { error } = await supabase
        .from("wonderkids")
        .update(payload)
        .eq("id", editingId);

      setLoading(false);

      if (error) {
        alert("Errore aggiornamento wonderkid");
        console.error(error);
        return;
      }

      await generateAI(editingId);
    } else {
      const { data, error } = await supabase
        .from("wonderkids")
        .insert([payload])
        .select("id")
        .single();

      setLoading(false);

      if (error) {
        alert("Errore salvataggio wonderkid");
        console.error(error);
        return;
      }

      if (data?.id) {
        await generateAI(data.id);
      }
    }

    setForm(emptyWonderkid);
    setEditingId(null);
    await loadWonderkids();
  }

  function editWonderkid(player: Wonderkid) {
    setEditingId(player.id || null);
    setForm({
      ...emptyWonderkid,
      ...player,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteWonderkid(id?: number) {
    if (!id) return;

    const ok = confirm("Vuoi eliminare questo wonderkid?");
    if (!ok) return;

    const { error } = await supabase.from("wonderkids").delete().eq("id", id);

    if (error) {
      alert("Errore eliminazione wonderkid");
      console.error(error);
      return;
    }

    await loadWonderkids();
  }

  return (
    <AdminGuard>
      <main style={page}>
        <section style={hero}>
          <h1 style={{ margin: 0, fontSize: 42 }}>⭐ Admin Wonderkids</h1>
          <p>
            Inserisci solo i dati base. Analisi, rating, scouting report e SEO
            vengono generati automaticamente dall'AI.
          </p>
        </section>

        <section style={card}>
          <h2>{editingId ? "Modifica Wonderkid" : "Nuovo Wonderkid"}</h2>

          {form.photo && (
            <img
              src={form.photo}
              alt="Anteprima"
              style={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: 18,
                marginBottom: 18,
                background: "#e5e7eb",
              }}
            />
          )}

          <div style={grid}>
            <Input label="Nome" value={form.name} onChange={(v) => updateField("name", v)} />
            <Input label="Cognome" value={form.surname} onChange={(v) => updateField("surname", v)} />
            <Input label="Età" type="number" value={form.age} onChange={(v) => updateField("age", v)} />
            <Input label="Nazionalità" value={form.nationality} onChange={(v) => updateField("nationality", v)} />
            <Input label="Club" value={form.club} onChange={(v) => updateField("club", v)} />
            <Input label="Ruolo" value={form.position} onChange={(v) => updateField("position", v)} />
            <Input label="Piede preferito" value={form.preferred_foot} onChange={(v) => updateField("preferred_foot", v)} />
            <Input label="Valore mercato" value={form.market_value} onChange={(v) => updateField("market_value", v)} />
            <Input label="Presenze" type="number" value={form.appearances} onChange={(v) => updateField("appearances", v)} />
            <Input label="Gol" type="number" value={form.goals} onChange={(v) => updateField("goals", v)} />
            <Input label="Assist" type="number" value={form.assists} onChange={(v) => updateField("assists", v)} />
            <Input label="Minuti giocati" type="number" value={form.minutes_played} onChange={(v) => updateField("minutes_played", v)} />
            <Input label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} />
            <Input label="YouTube URL" value={form.youtube_url} onChange={(v) => updateField("youtube_url", v)} />

            <div>
              <label>Foto Wonderkid</label>
              <input type="file" accept="image/*" onChange={uploadImage} style={input} />
              {uploading && <p>Caricamento immagine...</p>}
              {form.photo && <p style={{ color: "#166534", fontWeight: "bold" }}>Foto caricata ✅</p>}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={saveWonderkid} disabled={loading || uploading || aiLoadingId !== null} style={button}>
              {loading
                ? "Salvataggio..."
                : aiLoadingId !== null
                ? "Generazione AI..."
                : editingId
                ? "Aggiorna + rigenera AI"
                : "Salva + genera AI"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyWonderkid);
                }}
                style={secondaryButton}
              >
                Annulla
              </button>
            )}
          </div>
        </section>

        <section style={card}>
          <h2>Wonderkids salvati</h2>

          {players.length === 0 ? (
            <p>Nessun wonderkid inserito.</p>
          ) : (
            players.map((p: any) => (
              <article key={p.id} style={row}>
                {p.photo ? (
                  <img src={p.photo} alt={`${p.name} ${p.surname}`} style={thumb} />
                ) : (
                  <div style={thumbPlaceholder}>
                    {p.name?.[0]}
                    {p.surname?.[0]}
                  </div>
                )}

                <div>
                  <h3 style={{ margin: 0 }}>
                    {p.name} {p.surname}
                  </h3>
                  <p>
                    {p.age} anni · {p.club} · {p.position}
                  </p>
                  <p>
                    AI:{" "}
                    {p.ai_generated_at ? (
                      <strong style={{ color: "#166534" }}>generata ✅</strong>
                    ) : (
                      <strong style={{ color: "#dc2626" }}>mancante</strong>
                    )}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => generateAI(p.id)} style={aiButton}>
                    {aiLoadingId === p.id ? "Genero..." : "Rigenera AI"}
                  </button>

                  <button onClick={() => editWonderkid(p)} style={editButton}>
                    Modifica
                  </button>

                  <button onClick={() => deleteWonderkid(p.id)} style={deleteButton}>
                    Elimina
                  </button>

                  <a href={`/wonderkids/${p.slug}`} target="_blank" style={openButton}>
                    Apri scheda
                  </a>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </AdminGuard>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: any;
  onChange: (value: any) => void;
  type?: string;
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
    </div>
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

const card = {
  background: "white",
  color: "#111827",
  padding: 24,
  borderRadius: 18,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  marginBottom: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 220px), 1fr))",
  gap: 16,
};

const input = {
  display: "block",
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 18,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  color: "#111827",
  background: "white",
};

const button = {
  background: "#991b1b",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryButton = {
  background: "#374151",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};

const row = {
  borderBottom: "1px solid #e5e7eb",
  padding: "16px 0",
  display: "grid",
  gridTemplateColumns: "90px 1fr auto",
  gap: 16,
  alignItems: "center",
};

const thumb = {
  width: 76,
  height: 76,
  objectFit: "cover" as const,
  borderRadius: 14,
  background: "#e5e7eb",
};

const thumbPlaceholder = {
  width: 76,
  height: 76,
  borderRadius: 14,
  background: "#e5e7eb",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
};

const aiButton = {
  background: "#7f1d1d",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const editButton = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const deleteButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const openButton = {
  background: "#2563eb",
  color: "white",
  padding: "8px 12px",
  borderRadius: 8,
  textDecoration: "none",
};