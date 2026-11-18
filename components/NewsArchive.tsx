"use client";

import { useState } from "react";
import Link from "next/link";
import NewsCover from "./NewsCover";

export type ArchiveEntry = { title: string; date: string; source: string; href: string; image?: string; category?: string };
const pageSize = 12;

export default function NewsArchive({ entries, initialQuery = "", initialCategory = "" }: { entries: ArchiveEntry[]; initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [source, setSource] = useState("");
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState(initialCategory);
  const categories = [...new Set(entries.map(item => item.category).filter((value): value is string => !!value))].sort((a, b) => a.localeCompare(b, "it"));
  const sources = [...new Set(entries.map(item => item.source))].sort((a, b) => a.localeCompare(b, "it"));
  const filtered = entries.filter(item => (!source || item.source === source) && (!category || item.category === category)
    && (item.title + " " + item.category).toLocaleLowerCase("it").includes(query.trim().toLocaleLowerCase("it")));
  const shown = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section id="rassegna-stampa" aria-label="Archivio notizie">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-semibold">Cerca nell’archivio
          <input value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900" placeholder="Giocatore, titolo o argomento" />
        </label>
        <label className="text-sm font-semibold">Fonte
          <select value={source} onChange={event => { setSource(event.target.value); setPage(0); }} className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900">
            <option value="">Tutte le fonti</option>{sources.map(name => <option key={name}>{name}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Argomento
          <select value={category} onChange={event => { setCategory(event.target.value); setPage(0); }} className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"><option value="">Tutti gli argomenti</option>{categories.map(name => <option key={name}>{name}</option>)}</select>
        </label>
      </div>
      <p className="mb-3 text-sm text-gray-600" aria-live="polite">{filtered.length} articoli</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(item => <article key={item.href} className="ac1899-box p-3">
          <NewsCover image={item.image} title={item.title} category={item.category} />
          <h2 className="my-2 text-xl"><Link href={item.href}>{item.title}</Link></h2>
          <p className="text-sm text-gray-600">{item.source} · <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("it-IT", { timeZone: "Europe/Rome" })}</time></p>
        </article>)}
      </div>
      {filtered.length === 0 && <p className="rounded border border-gray-200 p-5">Nessun articolo corrisponde ai filtri. Prova un altro nome o scegli tutti gli argomenti.</p>}
      {filtered.length > pageSize && <nav className="mt-4 flex justify-between gap-3" aria-label="Pagine archivio">
        <button type="button" disabled={page === 0} onClick={() => setPage(value => value - 1)} className="rounded border border-gray-300 px-3 py-2 disabled:opacity-40">Precedente</button>
        <button type="button" disabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(value => value + 1)} className="rounded border border-gray-300 px-3 py-2 disabled:opacity-40">Successiva</button>
      </nav>}
    </section>
  );
}
