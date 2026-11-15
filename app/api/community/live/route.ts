import { getCommunityScoreboard } from "../../../../lib/api-football";

export async function GET() {
  const fixtures = await getCommunityScoreboard();
  return Response.json({ fixtures }, {
    status: fixtures === null ? 503 : 200,
    headers: { "Cache-Control": fixtures === null ? "no-store" : "public, s-maxage=45" },
  });
}
