const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-apisports-key": process.env.API_FOOTBALL_KEY!,
  "x-apisports-host": "v3.football.api-sports.io",
};

export async function getSerieAStandings() {
  const res = await fetch(
    `${BASE_URL}/standings?league=135&season=2024`,
    {
      headers,
      next: { revalidate: 60 },
    }
  );

  return res.json();
}

export async function getTopScorers() {
  const res = await fetch(
    `${BASE_URL}/players?team=489&season=2024`,
    {
      headers,
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getMilanFixtures() {
  const res = await fetch(
    `${BASE_URL}/fixtures?team=489&season=2024`,
    {
      headers,
      next: { revalidate: 3600 },
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