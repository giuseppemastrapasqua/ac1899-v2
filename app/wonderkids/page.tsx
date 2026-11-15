import Link from "next/link";
import ItalianWonderkids from "../../components/ItalianWonderkids";
import ItalianTeamOfWeek from "../../components/ItalianTeamOfWeek";

export default function WonderkidsPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section home-section-community">
        <div className="home-section-inner">
          <ItalianTeamOfWeek />
          <ItalianWonderkids />
          <Link href="/" className="text-sm font-semibold">← Torna alla home</Link>
        </div>
      </div>
    </main>
  );
}
