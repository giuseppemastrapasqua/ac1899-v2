"use client";

import { useState } from "react";

const themes = [
  { pattern: /mercato|endrick|tresoldi|prestito|trasferiment/i, key: "market", label: "Mercato Milan" },
  { pattern: /cardinale|redbird|holding|stadio|dirigenza/i, key: "club", label: "Società Milan" },
  { pattern: /femminil|women|rossonere/i, key: "women", label: "Milan Femminile" },
  { pattern: /primavera|giovanil|wonderkid|milan futuro/i, key: "youth", label: "Giovani rossoneri" },
  { pattern: /partita|serie a|europa league|derby|risultat|vittoria/i, key: "match", label: "Match Center" },
  { pattern: /tournée|tournee|amichevol|ritiro/i, key: "training", label: "Preparazione Milan" },
];

export default function NewsCover({ image, title, category }: { image?: string; title: string; category?: string }) {
  const [failedImage, setFailedImage] = useState<string>();
  if (image && image !== failedImage) {
    return (
      <img
        src={image}
        alt=""
        loading="lazy"
        className="aspect-video w-full rounded-lg object-cover"
        onError={() => setFailedImage(image)}
      />
    );
  }

  const strikerCover = "/images/confronto-attaccanti-milan.webp";
  if (/endrick/i.test(title) && /tresoldi/i.test(title) && failedImage !== strikerCover) {
    return (
      <figure className="relative overflow-hidden rounded-lg">
        <img src={strikerCover} alt="Endrick con il 9 del Real Madrid e Tresoldi con il 7 del Club Brugge" loading="lazy"
          className="aspect-video w-full object-cover" onError={() => setFailedImage(strikerCover)} />
        <figcaption className="editorial-cover-credit rounded bg-black/75 px-2 py-1">Illustrazione AI</figcaption>
      </figure>
    );
  }

  const theme = themes.find(({ pattern }) => pattern.test(title + " " + (category ?? "")))
    ?? { key: "analysis", label: "Notizie Milan" };

  return (
    <figure className={`editorial-cover editorial-cover--${theme.key}`} aria-label={`Illustrazione editoriale: ${title}`}>
      <div className="editorial-cover-art" aria-hidden="true" />
      <div className="editorial-cover-copy" aria-hidden="true">
        <span className="editorial-cover-label">{theme.label}</span>
        <span className="editorial-cover-title">{title}</span>
      </div>
      <figcaption className="editorial-cover-credit">Illustrazione editoriale</figcaption>
    </figure>
  );
}
