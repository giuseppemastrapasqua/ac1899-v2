"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../../../lib/supabase";
import AdminGuard from "../../../components/AdminGuard";

type News = {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  image_url: string;
  featured: boolean;
  created_at?: string;
};

export default function AdminNewsPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Squadra");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Errore nel caricamento news da Supabase");
      console.error(error);
      return;
    }

    setNews(data || []);
  }

  async function uploadNewsImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("news")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert("Errore upload immagine news");
      console.error(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("news").getPublicUrl(fileName);

    setImageUrl(publicUrl);
  }

  function resetForm() {
    setTitle("");
    setSubtitle("");
    setContent("");
    setCategory("Squadra");
    setImageUrl("");
    setFeatured(false);
    setEditingId(null);
  }

  function editNews(item: News) {
    setEditingId(item.id || null);
    setTitle(item.title || "");
    setSubtitle(item.subtitle || "");
    setContent(item.content || "");
    setCategory(item.category || "Squadra");
    setImageUrl(item.image_url || "");
    setFeatured(item.featured || false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveNews() {
    if (!title.trim() || !content.trim()) {
      alert("Inserisci titolo e testo della news");
      return;
    }

    setLoading(true);

    const payload = {
      title,
      subtitle,
      content,
      category,
      image_url: imageUrl,
      featured,
    };

    const { error } = editingId
      ? await supabase.from("news").update(payload).eq("id", editingId)
      : await supabase.from("news").insert([payload]);

    setLoading(false);

    if (error) {
      alert("Errore durante il salvataggio su Supabase");
      console.error(error);
      return;
    }

    await loadNews();
    resetForm();

    alert(editingId ? "News aggiornata!" : "News pubblicata su Supabase!");
  }

  async function deleteNews(id?: number) {
    if (!id) return;

    const confirmDelete = confirm("Vuoi eliminare questa news?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      alert("Errore durante l'eliminazione");
      console.error(error);
      return;
    }

    await loadNews();

    if (editingId === id) {
      resetForm();
    }
  }

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
          <h1 style={{ margin: 0, fontSize: 42 }}>📰 News Admin PRO</h1>
          <p>
            Crea, modifica e pubblica articoli con immagini salvate su Supabase
            Storage.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>{editingId ? "✏️ Modifica news" : "Nuova news"}</h2>

          <label>Titolo news</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Es. Milan vince il derby"
            style={inputStyle}
          />

          <label>Sottotitolo</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Breve descrizione della notizia"
            style={inputStyle}
          />

          <label>Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option>Squadra</option>
            <option>Mercato</option>
            <option>Partita</option>
            <option>Interviste</option>
            <option>Primavera</option>
            <option>Analisi</option>
          </select>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Metti in evidenza nella Home
          </label>

          <label>Carica immagine news dal PC</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadNewsImage}
            style={inputStyle}
          />

          {uploading && <p>Caricamento immagine...</p>}

          {imageUrl && (
            <>
              <p style={{ color: "#166534", fontWeight: "bold" }}>
                Immagine collegata correttamente ✅
              </p>

              <img
                src={imageUrl}
                alt="Anteprima"
                style={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "contain",
                  background: "#f3f4f6",
                  borderRadius: 12,
                  marginBottom: 18,
                }}
              />
            </>
          )}

          <label>Testo news</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Scrivi il contenuto completo della news..."
            rows={8}
            style={{
              ...inputStyle,
              minHeight: 160,
              resize: "vertical",
            }}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={saveNews}
              disabled={loading || uploading}
              style={{
                background: loading || uploading ? "#6b7280" : "#991b1b",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: 10,
                cursor: loading || uploading ? "not-allowed" : "pointer",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {loading
                ? "Salvataggio..."
                : editingId
                ? "Aggiorna News"
                : "Pubblica News"}
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
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Annulla modifica
              </button>
            )}
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>News pubblicate</h2>

          {news.length === 0 ? (
            <p>Nessuna news pubblicata.</p>
          ) : (
            news.map((item) => (
              <article
                key={item.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 18,
                  marginBottom: 18,
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{
                      width: "100%",
                      maxHeight: 220,
                      objectFit: "contain",
                      background: "#f3f4f6",
                      borderRadius: 12,
                      marginBottom: 12,
                    }}
                  />
                )}

                <p
                  style={{
                    color: "#991b1b",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {item.category} {item.featured ? "🔥 In evidenza" : ""}
                </p>

                <h3>{item.title}</h3>

                {item.subtitle && (
                  <p style={{ color: "#4b5563" }}>{item.subtitle}</p>
                )}

                <small>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("it-IT")
                    : ""}
                </small>

                <br />

                <button
                  onClick={() => editNews(item)}
                  style={{
                    marginTop: 12,
                    marginRight: 8,
                    background: "#111827",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Modifica
                </button>

                <button
                  onClick={() => deleteNews(item.id)}
                  style={{
                    marginTop: 12,
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

const sectionStyle = {
  background: "white",
  padding: 24,
  borderRadius: 16,
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