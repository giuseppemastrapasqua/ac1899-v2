import type { Metadata } from "next";

export const siteUrl = "https://ac1899.it";

export const publicSections = {
  "/": ["AC1899 · News e analisi sul Milan", "Notizie sul Milan, mercato, risultati, statistiche e analisi della prima squadra e del Milan Femminile."],
  "/milan": ["Rosa Milan 2026/27", "Rosa della prima squadra, numeri di maglia, presenze, minuti, gol e assist."],
  "/milan-femminile": ["Milan Femminile 2026/27", "Rosa, risultati, classifica di Serie A Women e notizie sulle rossonere."],
  "/news": ["Notizie Milan", "Ultime notizie sul Milan, mercato, società, nazionali e rassegna stampa italiana ed estera."],
  "/campionato": ["Milan in Serie A 2026/27", "Calendario, risultati, classifica e statistiche di squadre e calciatori della Serie A."],
  "/campionato/analisi": ["Match Analyst Milan · Serie A", "Analisi delle partite del Milan, numeri dell’ultimo incontro e prossimo avversario."],
  "/europa-league": ["Milan in Europa League 2026/27", "Calendario, classifica e prossimi avversari del Milan in Europa League."],
  "/europa-league/analisi": ["Match Analyst Milan · Europa League", "Analisi delle partite europee del Milan e confronto con il prossimo avversario."],
  "/mvp-del-mese": ["MVP del mese Milan", "I migliori rossoneri del mese e lo storico della stagione 2026/27."],
  "/wonderkids": ["Wonderkids italiani Under 18", "Giovani calciatori italiani da seguire e formazione della settimana."],
  "/creator-video": ["Creator rossoneri", "Video, reazioni e approfondimenti dei creator dedicati al Milan."],
  "/community": ["Curva 1899 · Community Milan", "Calendario di Serie A e spazio dedicato ai tifosi rossoneri."],
  "/community/bet": ["Pronostici Serie A · Curva 1899", "Lettura editoriale delle partite del prossimo turno di Serie A."],
} as const;

export function sectionMetadata(path: keyof typeof publicSections): Metadata {
  const [title, description] = publicSections[path];
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "AC1899", locale: "it_IT" },
  };
}
