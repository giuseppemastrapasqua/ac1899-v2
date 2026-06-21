import { supabase } from "../../lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("news")
    .select("*");

  return (
    <main style={{ padding: 40 }}>
      <h1>Test Supabase</h1>

      <h2>Errore</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h2>Dati</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}