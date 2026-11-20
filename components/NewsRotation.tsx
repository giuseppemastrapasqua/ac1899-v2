"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsCover from "./NewsCover";

export type RotationStory = {
  title: string;
  url: string;
  date: string;
  source: string;
  category?: string;
  image?: string;
};

function StoryMeta({ story }: { story: RotationStory }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300">
      <span className="font-bold uppercase text-red-400">{story.source}</span>
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
  const router = useRouter();
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, 300_000);
    return () => window.clearInterval(timer);
  }, [router]);

  const [lead, ...side] = stories;
  if (!lead) return null;

  return (
    <section
      aria-label="Notizie in evidenza"
      className="px-4 pt-7 pb-5 text-gray-100 sm:px-6 lg:pt-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <article className="ac1899-box">
            <NewsCover image={lead.image} title={lead.title} category={lead.category} />
            <div className="p-4">
              <h1 className="mb-4 text-2xl font-black uppercase sm:text-3xl">{lead.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <StoryMeta story={lead} />
                <a href={lead.url} className="border border-red-500 px-3 py-2 text-sm font-bold text-red-400 hover:bg-red-50">
                  Leggi di più →
                </a>
              </div>
            </div>
          </article>
          <div className="grid gap-4 lg:auto-rows-fr">
            {side.map(story => (
              <article key={story.url} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <NewsCover image={story.image} title={story.title} category={story.category} />
                <div>
                  <h2 className="mb-2 text-sm font-black uppercase sm:text-lg">
                    <a href={story.url} className="hover:underline">{story.title}</a>
                  </h2>
                  <StoryMeta story={story} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
