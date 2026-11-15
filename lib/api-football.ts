import { milanSquad } from "./milan-squad";
const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-apisports-key": process.env.API_FOOTBALL_KEY!,
  "x-apisports-host": "v3.football.api-sports.io",
};

function currentSeason() {
  const today = new Date();
  const year = today.getUTCFullYear();
  return today.getUTCMonth() >= 6 ? year : year - 1;
}

export async function getSerieAStandings() {
  const res = await fetch(
    `${BASE_URL}/standings?league=135&season=${currentSeason()}`,
    {
      headers,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    }
  );

  return res.json();
}

export async function getTopScorers() {
  const res = await fetch(
    `${BASE_URL}/players?team=489&season=${currentSeason()}`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getMilanFixtures() {
  const res = await fetch(
    `${BASE_URL}/fixtures?team=489&season=${currentSeason()}`,
    {
      headers,
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    }
  );

  return res.json();
}

export async function getMilanSquad() {
  const res = await fetch(
    `${BASE_URL}/players/squads?team=489`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}

export async function getFixtureStatistics(fixtureId: number) {
  const res = await fetch(
    `${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getFixtureEvents(fixtureId: number) {
  const res = await fetch(
    `${BASE_URL}/fixtures/events?fixture=${fixtureId}`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getFixtureLineups(fixtureId: number) {
  const res = await fetch(
    `${BASE_URL}/fixtures/lineups?fixture=${fixtureId}`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getFixturePlayers(fixtureId: number) {
  const res = await fetch(
    `${BASE_URL}/fixtures/players?fixture=${fixtureId}`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}
export async function getNextMilanFixture() {
  const res = await fetch(
    `${BASE_URL}/fixtures?team=489&next=1`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  return res.json();
}
type PlayerStatistics = {
  team: { name: string };
  league: { id: number; season: number };
  games: { position: string; appearences: number | null; lineups: number | null; minutes: number | null };
  goals: { total: number | null; assists: number | null; saves: number | null };
  shots: { total: number | null; on: number | null };
  passes: { total: number | null; key: number | null };
  dribbles: { success: number | null };
  tackles: { total: number | null; interceptions: number | null };
  duels: { won: number | null };
  cards: { yellow: number | null; red: number | null };
};

type LeaguePlayers = {
  response: { player: { id: number; name: string }; statistics: PlayerStatistics[] }[];
  paging: { total: number };
};

export async function getLeaguePlayers(endpoint: "players" | "players/topscorers" | "players/topassists", page = 1): Promise<LeaguePlayers | null> {
  if (!process.env.API_FOOTBALL_KEY) return null;
  const season = 2026;
  const pagination = endpoint === "players" ? `&page=${page}` : "";
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}?league=135&season=${season}${pagination}`, {
      headers, next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data: LeaguePlayers = await res.json();
    if (!Array.isArray(data.response) || !data.paging) return null;
    return {
      ...data,
      response: data.response.flatMap(row => {
        const statistics = row.statistics?.filter(stat => stat.league.id === 135 && stat.league.season === season);
        return statistics?.length ? [{ ...row, statistics }] : [];
      }),
    };
  } catch {
    return null;
  }
}

type LiveFixture = {
  fixture: { id: number; date: string; status: { elapsed: number | null; short: string } };
  league: { id: number; name: string };
  teams: { home: { id: number; name: string }; away: { id: number; name: string } };
  goals: { home: number | null; away: number | null };
  events?: {
    time: { elapsed: number; extra: number | null };
    team: { name: string };
    player: { name: string | null };
    assist?: { name: string | null };
    type: string;
    detail: string;
  }[];
};

async function getLiveFixtures() {
  if (!process.env.API_FOOTBALL_KEY) return null;
  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
      headers, next: { revalidate: 300 }, signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return null;
    const data = await response.json() as { errors: object; response: LiveFixture[] };
    if (!Array.isArray(data.response) || Object.keys(data.errors ?? {}).length) return null;

    return data.response;
  } catch {
    return null;
  }
}

export async function getCommunityScoreboard() {
  const fixtures = await getLiveFixtures();
  if (!fixtures) return null;
  return fixtures.flatMap(match => {
      const milan = match.teams.home.id === 489 || match.teams.away.id === 489;
      if (!milan && match.league.id !== 135) return [];
      return [{
        id: match.fixture.id, league: match.league.name, minute: match.fixture.status.elapsed,
        status: match.fixture.status.short, home: match.teams.home.name, away: match.teams.away.name,
        goals: match.goals, milan,
        events: milan ? (match.events ?? []).filter(event =>
          event.type === "Goal" || event.type === "Var" || event.detail === "Red Card" || event.detail === "Second Yellow card"
        ).map(event => ({
          minute: event.time.elapsed, extra: event.time.extra, team: event.team.name, player: event.player.name,
          action: ({
            "Normal Goal": "Gol", "Own Goal": "Autogol", Penalty: "Gol su rigore", "Missed Penalty": "Rigore sbagliato",
            "Red Card": "Espulsione", "Second Yellow card": "Espulsione per doppia ammonizione",
            "Goal cancelled": "Gol annullato dopo controllo VAR", "Penalty confirmed": "Rigore confermato dal VAR",
          } as Record<string, string>)[event.detail] ?? (event.type === "Var" ? "Controllo VAR" : "Episodio segnalato"),
        })).reverse() : [],
      }];
    }).sort((a, b) => Number(b.milan) - Number(a.milan));
}

// Confirmed fixtures only. One shared query per five-minute cache window.
const liveNewsKickoffs = [
  "2026-11-16T20:45:00+01:00", // Switzerland–Scotland
  "2026-11-17T20:45:00+01:00", // Wales–Portugal
  "2026-11-17T23:00:00+01:00", // United States–Haiti
  "2026-11-22T18:00:00+01:00", // Milan–Frosinone
];

const normalizeName = (name: string) =>
  name.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z]+/g, " ").trim();

export async function getMilanLiveNews(now = Date.now()) {
  if (!liveNewsKickoffs.some(date => now >= Date.parse(date) && now < Date.parse(date) + 135 * 60_000)) return [];

  const fixtures = await getLiveFixtures() ?? [];
  const players = milanSquad.flatMap(group => group.players.map(row => ({
    name: row[1], nation: row[2], keeper: group.role === "Portieri",
  })));
  const nationalTeams: Record<string, string> = {
    italia: "italy", francia: "france", stati: "usa", belgio: "belgium", croazia: "croatia",
    svizzera: "switzerland", portogallo: "portugal", ecuador: "ecuador", serbia: "serbia", inghilterra: "england",
  };

  return fixtures.flatMap(match => (match.events ?? []).flatMap(event => {
    if (!event.player.name) return [];
    const eventName = normalizeName(event.player.name);
    const team = normalizeName(event.team.name);
    const player = players.find(entry => {
      const name = normalizeName(entry.name);
      const first = name.split(" ")[0];
      const surname = name.slice(first.length + 1);
      const isMilan = [match.teams.home, match.teams.away].some(side => side.id === 489 && normalizeName(side.name) === team);
      return (isMilan || nationalTeams[normalizeName(entry.nation).split(" ")[0]] === team)
        && (eventName === name || eventName === first[0] + " " + surname);
    });
    if (!player) return [];
    const minute = event.time.elapsed + (event.time.extra ? "+" + event.time.extra : "") + "′";
    const matchName = match.teams.home.name + "–" + match.teams.away.name;
    const replacement = event.assist?.name;
    const substitution = event.type.toLowerCase() === "subst" && (player.keeper || event.time.elapsed <= 45);
    const dismissal = event.type === "Card" && /red card|second yellow/i.test(event.detail);
    if (!substitution && !dismissal) return [];
    const title = player.name + (dismissal ? " espulso" : " sostituito") + " in " + matchName;
    const body = dismissal
      ? [player.name + " ha ricevuto un’espulsione al " + minute + " in " + matchName + "."]
      : [player.name + " è stato sostituito al " + minute + (replacement ? " da " + replacement : "") + " in " + matchName + ". Motivo del cambio da chiarire."];
    return [{
      id: "live-" + match.fixture.id + "-" + normalizeName(player.name).replaceAll(" ", "-") + "-" + event.time.elapsed + (dismissal ? "-rosso" : "-cambio"),
      title, body, source: "API-Football · tabellino live", category: "Diretta",
      date: new Date(Date.parse(match.fixture.date) + event.time.elapsed * 60_000).toISOString(),
    }];
  }));
}
