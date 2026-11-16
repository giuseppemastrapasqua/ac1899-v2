import { timingSafeEqual } from "node:crypto";
import { getLocalNews } from "../../../lib/local-news";

export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = process.env.AC1899_INGEST_SECRET;
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from("Bearer " + (secret ?? ""));
  if (!secret || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const stories = await getLocalNews();
  return Response.json({ ok: true, archiveEntries: stories.length });
}
