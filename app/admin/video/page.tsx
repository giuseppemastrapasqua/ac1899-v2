export default function AdminVideoPage() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🎥 Gestione Video</h1>

      <form>
        <label>Titolo video</label>
        <br />
        <input placeholder="Es. Highlights Milan - Inter" />

        <br />
        <br />

        <label>ID YouTube</label>
        <br />
        <input placeholder="Es. dQw4w9WgXcQ" />

        <br />
        <br />

        <button type="button">Pubblica Video</button>
      </form>
    </main>
  );
}