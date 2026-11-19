import { timingSafeEqual } from "node:crypto";
import { getLocalNews, type IngestionReport } from "../../../lib/local-news";

import { deliverEditorialDrafts } from "../../../lib/news-editorial-delivery";

export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = process.env.AC1899_INGEST_SECRET;
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from("Bearer " + (secret ?? ""));
  if (!secret || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  try {
    let report: IngestionReport | undefined;
    const stories = await getLocalNews({ ingest: true, onReport: value => { report = value; } });
    const delivery = await deliverEditorialDrafts();
    return Response.json({ ok: !!report?.rewriteConfigured && report.failed === 0 && delivery.failed === 0 && delivery.mailConfigured, archiveEntries: stories.length, report, delivery }, { status: delivery.failed || !delivery.mailConfigured ? 503 : 200 });
  } catch (error) {
    console.error("[ac1899-news] Controllo fallito", error instanceof Error ? error.message : "unknown");
    return Response.json({ ok: false, error: "Controllo non completato. Consultare i log di acquisizione." }, { status: 503 });
  }
}
