"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type Player = {
  id?: number;
  name: string;
  surname: string;
  shirt_number: number;
  position: string;
  secondary_position: string;
  nationality: string;
  birth_date: string;
  birth_place: string;
  height: number;
  weight: number;
  preferred_foot: string;
  contract_until: string;
  market_value: string;
  photo_url: string;
  appearances: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  minutes_played: number;
  captain: boolean;
  status: string;
  bio: string;
  instagram: string;
  x_profile: string;
};

const emptyPlayer: Player = {
  name: "",
  surname: "",
  shirt_number: 0,
  position: "",
  secondary_position: "",
  nationality: "",
  birth_date: "",
  birth_place: "",
  height: 0,
  weight: 0,
  preferred_foot: "",
  contract_until: "",
  market_value: "",
  photo_url: "",
  appearances: 0,
  goals: 0,
  assists: 0,
  yellow_cards: 0,
  red_cards: 0,
  minutes_played: 0,
  captain: false,
  status: "Prima Squadra",
  bio: "",
  instagram: "",
  x_profile: "",
};

export default function AdminCalciatoriPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [form, setForm] = useState<Player>(emptyPlayer);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("shirt_number", { ascending: true });

    if (error) {
      alert("Errore nel caricamento calciatori");
      console.error(error);
      return;
    }

    setPlayers(data || []);
  }

  function updateField(field: keyof Player, value: any) {
    setForm({ ...form, [field]: value });
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
      .from("players")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert("Errore upload immagine");
      console.error(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("players").getPublicUrl(fileName);

    updateField("photo_url", publicUrl);
  }

  function normalizePlayer(player: Player) {
    return {
      name: player.name,
      surname: player.surname,
      shirt_number: Number(player.shirt_number) || 0,
      position: player.position,
      secondary_position: player.secondary_position,
      nationality: player.nationality,
      birth_date: player.birth_date || null,
      birth_place: player.birth_place,
      height: Number(player.height) || 0,
      weight: Number(player.weight) || 0,
      preferred_foot: player.preferred_foot,
      contract_until: player.contract_until || null,
      market_value: player.market_value,
      photo_url: player.photo_url,
      appearances: Number(player.appearances) || 0,
      goals: Number(player.goals) || 0,
      assists: Number(player.assists) || 0,
      yellow_cards: Number(player.yellow_cards) || 0,
      red_cards: Number(player.red_cards) || 0,
      minutes_played: Number(player.minutes_played) || 0,
      captain: player.captain,
      status: player.status,
      bio: player.bio,
      instagram: player.instagram,
      x_profile: player.x_profile,
      updated_at: new Date().toISOString(),
    };
  }

  async function savePlayer() {
    if (!form.name.trim() || !form.position.trim()) {
      alert("Inserisci almeno nome e ruolo");
      return;
    }

    setLoading(true);

    const payload = normalizePlayer(form);

    const { error } = editingId
      ? await supabase.from("players").update(payload).eq("id", editingId)
      : await supabase.from("players").insert([payload]);

    setLoading(false);

    if (error) {
      alert("Errore durante il salvataggio");
      console.error(error);
      return;
    }

    setForm(emptyPlayer);
    setEditingId(null);
    await loadPlayers();

    alert(editingId ? "Calciatore aggiornato!" : "Calciatore salvato!");
  }

  function editPlayer(player: Player) {
    setEditingId(player.id || null);
    setForm({
      ...emptyPlayer,
      ...player,
      birth_date: player.birth_date || "",
      contract_until: player.contract_until || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyPlayer);
  }

  async function deletePlayer(id?: number) {
    if (!id) return;

    const confirmDelete = confirm("Vuoi eliminare questo calciatore?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("players").delete().eq("id", id);

    if (error) {
      alert("Errore durante l'eliminazione");
      console.error(error);
      return;
    }

    await loadPlayers();
  }

  return (
    <AdminGuard>
      <main style={page}>
        <section style={hero}>
          <h1 style={{ margin: 0, fontSize: 42 }}>👥 Admin Calciatori</h1>
          <p>Gestisci rosa, dati, statistiche, contratti e schede giocatore.</p>
        </section>

        <section style={card}>
          <h2>{editingId ? "✏️ Modifica calciatore" : "Nuovo calciatore"}</h2>

          {form.photo_url && (
            <img
              src={form.photo_url}
              alt="Anteprima giocatore"
              style={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: "50%",
                background: "#e5e7eb",
                marginBottom: 18,
              }}
            />
          )}

          <div style={grid}>
            <Input label="Nome" value={form.name} onChange={(v) => updateField("name", v)} />
            <Input label="Cognome" value={form.surname} onChange={(v) => updateField("surname", v)} />
            <Input label="Numero maglia" type="number" value={form.shirt_number} onChange={(v) => updateField("shirt_number", v)} />
            <Input label="Ruolo" value={form.position} onChange={(v) => updateField("position", v)} />
            <Input label="Ruolo secondario" value={form.secondary_position} onChange={(v) => updateField("secondary_position", v)} />
            <Input label="Nazionalità" value={form.nationality} onChange={(v) => updateField("nationality", v)} />
            <Input label="Data nascita" type="date" value={form.birth_date} onChange={(v) => updateField("birth_date", v)} />
            <Input label="Luogo nascita" value={form.birth_place} onChange={(v) => updateField("birth_place", v)} />
            <Input label="Altezza cm" type="number" value={form.height} onChange={(v) => updateField("height", v)} />
            <Input label="Peso kg" type="number" value={form.weight} onChange={(v) => updateField("weight", v)} />
            <Input label="Piede preferito" value={form.preferred_foot} onChange={(v) => updateField("preferred_foot", v)} />
            <Input label="Contratto fino al" type="date" value={form.contract_until} onChange={(v) => updateField("contract_until", v)} />
            <Input label="Valore mercato" value={form.market_value} onChange={(v) => updateField("market_value", v)} />

            <div>
              <label>Foto giocatore</label>

              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                style={input}
              />

              {uploading && <p>Caricamento immagine...</p>}

              {form.photo_url && (
                <p
                  style={{
                    fontSize: 13,
                    color: "#166534",
                    fontWeight: "bold",
                  }}
                >
                  Foto caricata correttamente ✅
                </p>
              )}
            </div>

            <Input label="Presenze" type="number" value={form.appearances} onChange={(v) => updateField("appearances", v)} />
            <Input label="Gol" type="number" value={form.goals} onChange={(v) => updateField("goals", v)} />
            <Input label="Assist" type="number" value={form.assists} onChange={(v) => updateField("assists", v)} />
            <Input label="Cartellini gialli" type="number" value={form.yellow_cards} onChange={(v) => updateField("yellow_cards", v)} />
            <Input label="Cartellini rossi" type="number" value={form.red_cards} onChange={(v) => updateField("red_cards", v)} />
            <Input label="Minuti giocati" type="number" value={form.minutes_played} onChange={(v) => updateField("minutes_played", v)} />
            <Input label="Status" value={form.status} onChange={(v) => updateField("status", v)} />
            <Input label="Instagram" value={form.instagram} onChange={(v) => updateField("instagram", v)} />
            <Input label="X / Twitter" value={form.x_profile} onChange={(v) => updateField("x_profile", v)} />
          </div>

          <label style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <input
              type="checkbox"
              checked={form.captain}
              onChange={(e) => updateField("captain", e.target.checked)}
            />
            Capitano
          </label>

          <label>Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={5}
            style={input}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={savePlayer} disabled={loading || uploading} style={button}>
              {loading
                ? "Salvataggio..."
                : editingId
                ? "Aggiorna calciatore"
                : "Salva calciatore"}
            </button>

            {editingId && (
              <button onClick={cancelEdit} style={secondaryButton}>
                Annulla modifica
              </button>
            )}
          </div>
        </section>

        <section style={card}>
          <h2>Calciatori salvati</h2>

          {players.length === 0 ? (
            <p>Nessun calciatore inserito.</p>
          ) : (
            players.map((p) => (
              <article
                key={p.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "16px 0",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {p.photo_url ? (
                  <img
                    src={p.photo_url}
                    alt={`${p.name} ${p.surname}`}
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: "50%",
                      background: "#e5e7eb",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: "#e5e7eb",
                    }}
                  />
                )}

                <div>
                  <h3 style={{ margin: 0 }}>
                    #{p.shirt_number} {p.name} {p.surname}
                  </h3>
                  <p><strong>Ruolo:</strong> {p.position}</p>
                  <p><strong>Nazionalità:</strong> {p.nationality || "-"}</p>
                  <p>
                    <strong>Gol:</strong> {p.goals} |{" "}
                    <strong>Assist:</strong> {p.assists}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => editPlayer(p)} style={editButton}>
                    Modifica
                  </button>

                  <button onClick={() => deletePlayer(p.id)} style={deleteButton}>
                    Elimina
                  </button>
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
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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