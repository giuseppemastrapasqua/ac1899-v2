export function validateRegistration(email: string, password: string, nickname: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > 254) return "Inserisci un indirizzo email valido.";
  if (!/^[A-Za-z0-9_.-]{3,30}$/.test(nickname.trim())) return "Il nickname deve avere da 3 a 30 caratteri: lettere, numeri, punto, trattino o underscore.";
  if (password.length < 8) return "La password deve contenere almeno 8 caratteri.";
  if (password.length > 128) return "La password può contenere al massimo 128 caratteri.";
  return null;
}
export function registrationError(code?: string, message = "") {
  if (/nickname|community_profiles_nickname/i.test(message)) return "Questo nickname è già utilizzato. Scegline un altro.";
  if (code === "user_already_exists" || code === "email_exists") return "Esiste già un account con questa email. Premi Accedi.";
  if (code === "email_address_invalid") return "Inserisci un indirizzo email valido.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") return "Troppe richieste. Attendi qualche minuto prima di riprovare.";
  if (code === "email_address_not_authorized" || /Error sending confirmation|email.*not.*authorized/i.test(message)) return "Invio dell’email di conferma non disponibile. Riprova più tardi.";
  if (code === "weak_password") return "Scegli una password più sicura, con almeno 8 caratteri.";
  if (code === "signup_disabled") return "Le iscrizioni sono temporaneamente sospese.";
  return "Non siamo riusciti a completare l’iscrizione. Riprova tra poco.";
}
