"use client";

import Link from "next/link";
import CommunityLive from "../../components/CommunityLive";
import { useState } from "react";
import type { FormEvent } from "react";

type Clip = { id: string; title: string; url: string; liked: boolean };

export default function CommunityPage() {
  const [clips, setClips] = useState<Clip[]>([]);

  function addClip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("video");
    const title = String(data.get("title")).trim();
    if (!(file instanceof File) || !file.type.startsWith("video/") || !title) return;
    const clip = { id: crypto.randomUUID(), title, url: URL.createObjectURL(file), liked: false };
    setClips(previous => [clip, ...previous]);
    form.reset();
  }

  return <main className="ac1899-home min-h-screen">
    <div className="home-section-inner">
      <header><h1 className="text-4xl">Curva 1899</h1><p>Video brevi della community rossonera.</p></header>
      <nav aria-label="Sezioni Community" className="flex flex-wrap gap-3">
        <a className="ac1899-box px-4 py-2 font-bold" href="#live">Live</a>
        <Link className="ac1899-box px-4 py-2 font-bold" href="/community/bet">Bet · Pronostici</Link>
        <a className="ac1899-box px-4 py-2 font-bold" href="#clip">Clip</a>
      </nav>
      <CommunityLive />
      <form id="clip" onSubmit={addClip} className="ac1899-box mx-auto grid w-full max-w-md gap-3 p-4">
        <h2 className="text-xl">Aggiungi una clip</h2>
        <p className="text-sm text-gray-600">In questa anteprima le clip restano visibili nel tuo browser fino alla chiusura o al ricaricamento della pagina.</p>
        <label className="grid gap-1">Titolo<input name="title" required maxLength={100} className="rounded border p-2" /></label>
        <label className="grid gap-1">Video<input name="video" type="file" accept="video/*" required className="w-full text-sm" /></label>
        <button className="rounded bg-red-700 px-4 py-2 font-bold text-white">Aggiungi al feed</button>
      </form>
      {clips.length > 0 && <section aria-label="Feed video" className="mx-auto max-h-[80dvh] w-full max-w-md snap-y snap-mandatory space-y-3 overflow-y-auto">
        {clips.map(clip => <article key={clip.id} className="ac1899-box snap-start p-3">
          <video className="aspect-[9/16] max-h-[60dvh] w-full rounded bg-black object-contain" src={clip.url} controls playsInline preload="metadata" aria-label={clip.title} />
          <div className="mt-2 flex items-center justify-between gap-3">
            <h2 className="break-all text-lg">{clip.title}</h2>
            <button className="shrink-0 rounded border px-3 py-2" aria-pressed={clip.liked} onClick={() => setClips(previous => previous.map(item => item.id === clip.id ? { ...item, liked: !item.liked } : item))}>Mi piace · {Number(clip.liked)}</button>
          </div>
        </article>)}
      </section>}
    </div>
  </main>;
}
