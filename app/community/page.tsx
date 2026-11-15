import { sectionMetadata } from "../../lib/site-seo";

export const metadata = sectionMetadata("/community");

import Link from "next/link";
import CommunityLive from "../../components/CommunityLive";

export default function CommunityPage() {
  return <main className="ac1899-home min-h-screen">
    <div className="home-section-inner">
      <header><h1 className="text-4xl">Curva 1899</h1></header>
      <nav aria-label="Sezioni Community" className="flex flex-wrap gap-3">
        <a className="ac1899-box px-4 py-2 font-bold" href="#live">Live</a>
        <Link className="ac1899-box px-4 py-2 font-bold" href="/community/bet">Bet · Pronostici</Link>
      </nav>
      <CommunityLive />
    </div>
  </main>;
}
