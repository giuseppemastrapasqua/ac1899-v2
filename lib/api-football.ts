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
