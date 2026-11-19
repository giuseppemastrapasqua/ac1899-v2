"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { validateRegistration, registrationError } from "../lib/account-validation";

export default function AccountForm() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [busy, setBusy] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ error: boolean; text: string }>();
  useEffect(() => {
    let active = true;
    async function refresh() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setUserName(null); return; }
      const { data } = await supabase.from("community_profiles").select("nickname").eq("id", user.id).maybeSingle();
      if (active) setUserName(data?.nickname || "tifoso rossonero");
    }
    void refresh();
    const { data } = supabase.auth.onAuthStateChange(() => { setTimeout(() => void refresh(), 0); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const address = email.trim().toLowerCase();
    if (mode === "signup") {
      const invalid = validateRegistration(address, password, nickname);
      if (invalid) { setFeedback({ error: true, text: invalid }); return; }
    }
    setBusy(true); setFeedback(undefined);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: address, password });
        setFeedback(error ? { error: true, text: error.code === "email_not_confirmed" ? "Conferma la tua email prima di accedere: controlla anche la posta indesiderata." : "Accesso non riuscito. Controlla email e password." } : { error: false, text: "Accesso effettuato. Puoi commentare e votare gli articoli." });
        if (!error) setPassword("");
      } else {
        const availability = await supabase.rpc("ac1899_nickname_available", { candidate: nickname.trim() });
        if (availability.error) { setFeedback({ error: true, text: "Verifica del nickname non disponibile. Riprova tra poco." }); return; }
        if (!availability.data) { setFeedback({ error: true, text: "Questo nickname è già utilizzato. Scegline un altro." }); return; }
        const { data, error } = await supabase.auth.signUp({ email: address, password, options: { data: { nickname: nickname.trim() }, emailRedirectTo: window.location.origin + "/iscriviti" } });
        if (error) { setFeedback({ error: true, text: registrationError(error.code, error.message) }); return; }
        setPassword("");
        setFeedback({ error: false, text: data.session ? "Account creato! Ora puoi commentare e votare." : "Controlla la tua email, anche nella posta indesiderata, e apri il link di conferma. Se hai già un account, usa Accedi." });
      }
    } catch { setFeedback({ error: true, text: "Connessione non disponibile. Controlla la rete e riprova." }); }
    finally { setBusy(false); }
  }
  const field = "block w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900";
  return <section className="ac1899-box mx-auto max-w-lg space-y-5 p-6 sm:p-8">
    <span className="text-sm font-bold text-red-700">COMMUNITY AC1899</span>
    <h1 className="text-3xl">{userName ? "Il tuo account" : mode === "signup" ? "Iscriviti" : "Accedi"}</h1>
    <p>{userName ? "Benvenuto, " + userName + "." : "Unisciti alla community per commentare gli articoli e votare. Nei commenti sarà visibile il tuo nickname, non la tua email."}</p>
    {userName ? <div className="grid gap-3"><Link className="rounded-lg bg-red-700 px-4 py-3 text-center font-bold text-white" href="/news">Leggi, commenta e vota</Link><button type="button" disabled={busy} onClick={async () => { setBusy(true); const { error } = await supabase.auth.signOut(); setFeedback(error ? { error: true, text: "Uscita non riuscita. Riprova." } : undefined); setBusy(false); }} className="rounded-lg border p-3">Esci</button></div> : <>
      <form onSubmit={submit} className="grid gap-4" aria-busy={busy}>
        {mode === "signup" && <label className="grid gap-1">Nickname<input className={field} name="nickname" autoComplete="nickname" required minLength={3} maxLength={30} pattern="[A-Za-z0-9_.\-]{3,30}" value={nickname} onChange={e => setNickname(e.target.value)} aria-describedby="nickname-help" /><span id="nickname-help" className="text-sm text-gray-600">3–30 caratteri: lettere, numeri, punto, trattino o underscore.</span></label>}
        <label className="grid gap-1">Email<input className={field} name="email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="grid gap-1">Password<input className={field} name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 8 : undefined} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} aria-describedby={mode === "signup" ? "password-help" : undefined} />{mode === "signup" && <span id="password-help" className="text-sm text-gray-600">Almeno 8 caratteri.</span>}</label>
        <button disabled={busy} className="rounded-lg bg-red-700 p-3 text-base font-bold text-white disabled:opacity-60">{busy ? "Attendi…" : mode === "signup" ? "Crea account" : "Accedi"}</button>
      </form>
      <p>{mode === "signup" ? "Hai già un account? " : "Non hai un account? "}<button type="button" className="font-bold text-red-700 underline" disabled={busy} onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setPassword(""); setFeedback(undefined); }}>{mode === "signup" ? "Accedi" : "Iscriviti"}</button></p>
    </>}
    {feedback && <p role={feedback.error ? "alert" : "status"} className={"rounded-lg p-3 " + (feedback.error ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800")}>{feedback.text}</p>}
    <p className="text-sm text-gray-600">L’iscrizione alla newsletter è separata dalla creazione dell’account.</p>
  </section>;
}
