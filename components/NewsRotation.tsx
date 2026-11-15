"use client";

import { useEffect, useState } from "react";

export type RotationStory = {
  title: string;
  url: string;
  date: string;
  source: string;
  category?: string;
  image?: string;
  credit?: { author: string; url: string };
};

function StoryPhoto({ story }: { story: RotationStory }) {
  return (
    <figure className="relative h-full min-h-0 overflow-hidden rounded-xl bg-gray-800">
      <img src={story.image} alt="" className="aspect-video h-full w-full object-cover" />
      {story.credit && (
        <figcaption className="absolute right-0 bottom-0 bg-black/80 px-2 py-1 text-xs text-white">
          Repertorio · <a href={story.credit.url} className="text-white underline">{story.credit.author}</a>
          {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-white underline">CC BY-SA 4.0</a>
        </figcaption>
      )}
    </figure>
  );
}

function StoryMeta({ story }: { story: RotationStory }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
      <span className="font-bold uppercase text-red-800">{story.source}</span>
      {story.category && <span className="capitalize">{story.category}</span>}
      {story.date && (
        <time dateTime={story.date}>
          {new Date(story.date).toLocaleDateString("it-IT", { dateStyle: "long", timeZone: "Europe/Rome" })}
        </time>
      )}
    </div>
  );
}

export default function NewsRotation({ stories }: { stories: RotationStory[] }) {
  const [start, setStart] = useState(0);
  const [running, setRunning] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const count = stories.length;

  useEffect(() => {
    setRunning(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!running || hovered || focused || count < 2) return;
    const tick = window.setInterval(() => setStart(value => (value + 1) % count), 8500);
    return () => window.clearInterval(tick);
  }, [running, hovered, focused, count]);

  if (!count) return null;
  const [lead, ...side] = Array.from({ length: Math.min(count, 4) }, (_, index) =>
    stories[(start + index) % count]
  );

  return (
    <section
      aria-label="Notizie in evidenza"
      className="mb-7 bg-white px-4 py-6 text-gray-950 sm:px-6 lg:py-9"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <article className="overflow-hidden rounded-2xl border border-gray-200">
            <div className="aspect-video"><StoryPhoto story={lead} /></div>
            <div className="p-4">
              <h1 className="mb-4 text-2xl font-black uppercase sm:text-3xl">{lead.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <StoryMeta story={lead} />
                <a href={lead.url} className="border border-red-700 px-3 py-2 text-sm font-bold text-red-800">
                  Leggi di più →
                </a>
              </div>
            </div>
          </article>
          <div className="grid gap-4 lg:auto-rows-fr">
            {side.map(story => (
              <article key={story.url} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3">
                <div className="aspect-video"><StoryPhoto story={story} /></div>
                <div>
                  <h2 className="mb-2 text-sm font-black uppercase sm:text-lg">
                    <a href={story.url} className="text-gray-950 hover:underline">{story.title}</a>
                  </h2>
                  <StoryMeta story={story} />
                </div>
              </article>
            ))}
          </div>
        </div>
        {count > 1 && (
          <div className="mt-4 flex items-center justify-end gap-3 text-sm">
            <button type="button" className="border px-3 py-2" aria-label="Notizia precedente" onClick={() => setStart(value => (value + count - 1) % count)}>←</button>
            <button type="button" className="border px-3 py-2" onClick={() => setRunning(value => !value)}>
              {running ? "Pausa" : "Riprendi"}
            </button>
            <button type="button" className="border px-3 py-2" aria-label="Notizia successiva" onClick={() => setStart(value => (value + 1) % count)}>→</button>
          </div>
        )}
      </div>
    </section>
  );
}
