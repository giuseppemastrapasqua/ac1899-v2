import Link from "next/link";
import { scoutingGroups } from "../../lib/italian-scouting";
import ItalianWonderkids from "../../components/ItalianWonderkids";
import ItalianTeamOfWeek from "../../components/ItalianTeamOfWeek";

export default function WonderkidsPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section home-section-community">
        <div className="home-section-inner">
          <ItalianTeamOfWeek />
          <ItalianWonderkids />
          <section aria-labelledby="scouting-by-role">
            <h2 id="scouting-by-role" className="mb-2 text-3xl">Cinque talenti per ruolo</h2>
            <p className="mb-4 text-sm text-gray-600">Selezione editoriale Under 18. Il club identifica la società di appartenenza anche per chi gioca nel vivaio.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {scoutingGroups.map(({ role, players }) => (
                <article key={role} className="ac1899-box p-4">
                  <h3 className="mb-2 text-xl">{role}</h3>
                  <ol className="divide-y divide-gray-100">
                    {players.map(([name, club, evidence, watch, source]) => (
                      <li key={name} className="space-y-1 py-3 text-sm">
                        <p><strong>{name}</strong> · {club}</p>
                        <p>{evidence}</p>
                        <p><strong>Da osservare:</strong> {watch}</p>
                        <p className="text-xs text-gray-600">Fonte: {source}</p>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
          <Link href="/" className="text-sm font-semibold">← Torna alla home</Link>
        </div>
      </div>
    </main>
  );
}
