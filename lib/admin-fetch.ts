import { supabase } from "./supabase";
export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = new Headers(init.headers);
  if (session) headers.set("Authorization", "Bearer " + session.access_token);
  return fetch(input, { ...init, headers });
}
