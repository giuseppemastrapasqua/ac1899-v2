import { createClient } from "@supabase/supabase-js";
export async function requireAdmin(request: Request): Promise<Response | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return Response.json({ error: "Accesso richiesto" }, { status: 401 });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { global: { headers: { Authorization: "Bearer " + token } }, auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error } = await client.auth.getUser(token);
  if (error || !user) return Response.json({ error: "Accesso richiesto" }, { status: 401 });
  const { data: admin } = await client.rpc("ac1899_is_admin");
  return admin === true ? null : Response.json({ error: "Accesso riservato alla redazione" }, { status: 403 });
}
