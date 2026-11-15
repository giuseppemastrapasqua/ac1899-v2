import { sectionMetadata } from "../../../lib/site-seo";

export const metadata = sectionMetadata("/europa-league/analisi");

import EuropaMatchAnalyst from "../../../components/EuropaMatchAnalyst";
import EuropaOpponent from "../../../components/EuropaOpponent";

export default function EuropaAnalisiPage() {
  return (
    <main className="ac1899-home min-h-screen">
      <div className="home-section-inner">
        <h1 className="text-4xl">Match Analyst AI · Europa League</h1>
        <EuropaMatchAnalyst />
        <EuropaOpponent />
      </div>
    </main>
  );
}
