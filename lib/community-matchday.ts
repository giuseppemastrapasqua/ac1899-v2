export const communityMatchday = [
  ["2026-11-21T15:00:00+01:00", "Como", "Cagliari", "1–0", "Il Como ha subito 10 gol in 11 giornate e parte favorito in casa."],
  ["2026-11-21T15:00:00+01:00", "Lazio", "Lecce", "2–0", "La Lazio guida la classifica con 29 punti e ha subito 9 reti. Il Lecce ne ha incassate 22."],
  ["2026-11-21T18:00:00+01:00", "Parma", "Roma", "0–2", "La Roma ha segnato 31 gol in 11 giornate, il Parma 9."],
  ["2026-11-21T20:45:00+01:00", "Napoli", "Torino", "1–0", "Le squadre sono divise da un punto. Il Napoli ha subito tre gol in meno e gioca in casa."],
  ["2026-11-22T12:30:00+01:00", "Juventus", "Venezia", "2–0", "Il Venezia ha segnato otto reti, mentre la Juventus ha una differenza reti positiva di tre gol."],
  ["2026-11-22T15:00:00+01:00", "Bologna", "Udinese", "2–0", "Il Bologna ha 17 punti contro i cinque dell’Udinese, che ha incassato 25 gol."],
  ["2026-11-22T15:00:00+01:00", "Sassuolo", "Genoa", "1–1", "Il Genoa ha subito 13 gol in meno. Il Sassuolo ha segnato cinque reti in più e ha il vantaggio di giocare in casa."],
  ["2026-11-22T18:00:00+01:00", "Milan", "Frosinone", "2–1", "Il Milan ha subito due reti in meno e gioca a San Siro. Il Frosinone ha già segnato 24 gol in 11 partite."],
  ["2026-11-22T20:45:00+01:00", "Atalanta", "Inter", "1–2", "L’Inter ha 28 punti e 28 gol. L’Atalanta ha segnato 17 reti e può sfruttare il fattore campo."],
  ["2026-11-23T20:45:00+01:00", "Monza", "Fiorentina", "1–1", "Entrambe hanno segnato 17 gol e ne hanno subiti 25. La Fiorentina è avanti di due punti."],
] as const;

const matchDate = new Intl.DateTimeFormat("it-IT", {
  weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome",
});

export function formatCommunityKickoff(kickoff: string) {
  return matchDate.format(new Date(kickoff));
}
