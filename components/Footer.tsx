import Link from "next/link";

export default function Footer() {
  return (
    <footer style={footer}>
      <div style={inner}>
        <div>
          <h2 style={logo}>AC1899</h2>
          <p style={text}>
            News, analisi, creator e scouting rossonero.
          </p>
        </div>

        <div style={links}>
          <Link href="/news" style={link}>News</Link>
          <Link href="/creator-video" style={link}>Creator</Link>
          <Link href="/wonderkids" style={link}>Wonderkids</Link>
          <Link href="/avversario" style={link}>AI Room</Link>
        </div>

        <div>
          <p style={copy}>© 2025 AC1899</p>
          <p style={text}>Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
}

const footer = {
  background: "#111827",
  borderTop: "2px solid #e30613",
  color: "#f9fafb",
  marginTop: 48,
  padding: "36px 24px",
};

const inner = {
  maxWidth: 1400,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: 32,
};

const logo = {
  color: "#e30613",
  margin: 0,
  fontSize: 28,
  fontWeight: 900,
};

const text = {
  color: "#9ca3af",
};

const links = {
  display: "grid",
  gap: 10,
};

const link = {
  color: "#f9fafb",
  textDecoration: "none",
  fontWeight: 700,
};

const copy = {
  margin: 0,
  fontWeight: 800,
};