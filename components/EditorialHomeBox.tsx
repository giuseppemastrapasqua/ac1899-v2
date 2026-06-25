import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function EditorialHomeBox() {
  const { data } = await supabase
    .from("daily_editorials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        background: "#111827",
        borderTop: "2px solid #e30613",
        padding: 24,
        marginTop: 24,
        marginBottom: 24,
      }}
    >
      <span
        style={{
          color: "#e30613",
          fontWeight: 900,
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        📰 AC1899 DAILY
      </span>

      <h2
        style={{
          color: "white",
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        {data.title}
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: 20,
        }}
      >
        {data.subtitle}
      </p>

      <Link
        href={`/editoriali/${data.id}`}
        style={{
          background: "#e30613",
          color: "white",
          padding: "10px 16px",
          textDecoration: "none",
          fontWeight: 900,
          display: "inline-block",
        }}
      >
        LEGGI EDITORIALE →
      </Link>
    </div>
  );
}