import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { articleContext, generateBrief, type LocalNews } from "./local-news";

const recipient = process.env.AC1899_EDITORIAL_EMAIL;
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));
type Editorial = { status: "ready" | "held" | "duplicate"; title?: string; body?: string[]; reason?: string; version?: string; sentAt?: string };
type Candidate = { story: LocalNews; context: string; editorial?: Editorial };

// Private drafts only. This worker has no archive INSERT or publishing path.
export async function deliverEditorialDrafts() {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const [queue, archive] = await Promise.all([
    client.from("ac1899_news_queue").select("id,candidate,attempted_at").order("attempted_at", { ascending: true, nullsFirst: true }).limit(200),
    client.from("ac1899_news_archive").select("id,story").order("published_at", { ascending: false }).limit(150),
  ]);
  if (queue.error || archive.error) throw new Error("Lettura redazione non disponibile");
  const related = (archive.data ?? []).map(row => ({ id: row.id, title: row.story.title, date: row.story.date, summary: (row.story.body ?? []).join(" ").slice(0, 800) }));
  const known = new Set(related.map(row => row.id));
  for (const row of queue.data ?? []) {
    const c = row.candidate as Candidate;
    if (c.editorial?.status === "ready") related.push({ id: row.id, title: c.editorial.title!, date: c.story.date, summary: c.editorial.body!.join(" ").slice(0,800) });
  }
  const pending = (queue.data ?? []).filter(row => {
    const c = row.candidate as Candidate;
    return !known.has(row.id) && (!c.editorial || (c.editorial.status === "ready" && !c.editorial.sentAt));
  }).sort((a,b) => (b.candidate as Candidate).story.date.localeCompare((a.candidate as Candidate).story.date));
  const result = { pending: pending.length, drafted: 0, sent: 0, held: 0, duplicates: 0, failed: 0, mailConfigured: !!process.env.RESEND_API_KEY && !!recipient };
  const deadline = Date.now() + 35000;
  for (const row of pending.slice(0,4)) {
    if (Date.now() > deadline) break;
    const c = row.candidate as Candidate;
    try {
      if (!c.editorial) {
        const context = c.story.coverSource ? await articleContext(c.story.coverSource, c.context) : c.context;
        if (!c.story.coverSource || context.length < 350) {
          c.editorial = { status: "held", reason: "Fonte integrale insufficiente: verifica redazionale necessaria" };
          result.held++;
        } else {
          const brief = await generateBrief(c.story.title, context.slice(0,9000), related.filter(x => x.id !== row.id));
          if (brief && "duplicateOf" in brief) { c.editorial = { status: "duplicate", reason: brief.duplicateOf }; result.duplicates++; }
          else if (brief && "body" in brief) {
            c.editorial = { status: "ready", title: brief.title, body: brief.body, version: createHash("sha256").update(JSON.stringify(brief)).digest("hex") };
            related.push({ id: row.id, title: brief.title, date: c.story.date, summary: brief.body.join(" ").slice(0,800) });
            result.drafted++;
          } else { c.editorial = { status: "held", reason: "Materiale non sufficiente o non pertinente" }; result.held++; }
        }
        const saved = await client.from("ac1899_news_queue").update({ candidate: c, attempted_at: new Date().toISOString() }).eq("id",row.id);
        if (saved.error) throw saved.error;
      }
      const e = c.editorial;
      if (e?.status !== "ready" || e.sentAt) continue;
      if (!process.env.RESEND_API_KEY || !recipient) { result.failed++; continue; }
      const paragraphs = e.body!;
      const text = [e.title!, ...paragraphs, "Fonte: " + c.story.source, c.story.coverSource!, "Pubblicazione fonte: " + c.story.date, "Bozza privata. Rispondi con il tuo OK in chat per pubblicare questo testo.", "ID: " + row.id].join("\n\n");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(8000),
        headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json", "Idempotency-Key": "ac1899-draft-" + row.id + "-" + e.version },
        body: JSON.stringify({ from: "AC1899 Redazione <noreply@ac1899.it>", to: [recipient], subject: "[BOZZA DA APPROVARE] " + e.title, text, html: "<h1>" + escape(e.title!) + "</h1>" + paragraphs.map(p=>"<p>"+escape(p)+"</p>").join("") + "<p>Fonte: " + escape(c.story.source) + " — <a href=\"" + escape(c.story.coverSource!) + "\">Articolo originale</a></p><p>Bozza privata: torna in chat e dai l’OK per pubblicarla.</p><p>ID: " + escape(row.id) + "</p>" }),
      });
      if (!response.ok) throw new Error("Invio bozze HTTP " + response.status);
      e.sentAt = new Date().toISOString();
      const saved = await client.from("ac1899_news_queue").update({ candidate: c }).eq("id",row.id);
      if (saved.error) throw saved.error;
      result.sent++;
    } catch (error) { result.failed++; console.error("[ac1899-drafts]",row.id,error instanceof Error ? error.message : "failed"); }
  }
  return result;
}
