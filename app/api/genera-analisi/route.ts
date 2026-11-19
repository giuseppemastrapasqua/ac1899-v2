import { requireAdmin } from "../../../lib/require-admin";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const type = body.type || "match";

    let prompt = "";

    if (type === "wonderkid") {
      prompt = `
Sei l'AI Scout di AC1899, esperto di giovani talenti del calcio mondiale.

Genera un'analisi completa del wonderkid usando SOLO i dati forniti.
Non inventare trasferimenti, statistiche, infortuni o informazioni non presenti.

Dati giocatore:
${JSON.stringify(body.player, null, 2)}

Restituisci SOLO JSON valido, senza markdown, con questa struttura:
{
  "title": "",
  "summary": "",
  "technical_analysis": "",
  "strengths": [],
  "weaknesses": [],
  "playing_style": "",
  "potential_score": 0,
  "ac1899_rating": 0,
  "comparison": "",
  "seo_title": "",
  "seo_description": ""
}
`;
    } else if (type === "news") {
      prompt = `
Sei un giornalista sportivo esperto di AC Milan.

Scrivi una notizia per AC1899 usando SOLO i dati forniti.
Non inventare mercato, dichiarazioni o dettagli non presenti.

Dati notizia:
${JSON.stringify(body.news, null, 2)}

Struttura richiesta:
- Titolo
- Introduzione
- Corpo della notizia
- Impatto sul Milan
- Conclusione

Stile:
giornalistico, chiaro, rossonero, professionale.
`;
    } else {
      prompt = `
Sei un giornalista sportivo esperto di AC Milan.

Scrivi un'analisi completa, intensa e dettagliata della partita usando SOLO i dati forniti.
Non inventare dichiarazioni, infortuni, mercato o informazioni non presenti.

Dati partita:
${JSON.stringify(body, null, 2)}

Struttura richiesta:
- Titolo
- Introduzione
- Analisi della partita
- Cosa ha funzionato
- Cosa va migliorato
- Chiave tattica
- Migliore in campo
- Verdetto finale

Stile:
giornalistico, competente, coinvolgente, da portale sportivo rossonero.
`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: type === "wonderkid" ? 0.4 : 0.7,
    });

    const text =
      completion.choices[0]?.message?.content || "Analisi non disponibile.";

    if (type === "wonderkid") {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return Response.json(JSON.parse(cleaned));
    }

    return Response.json({ analysis: text });
  } catch (error) {
    console.error("Errore generazione analisi:", error);

    return Response.json(
      { error: "Errore durante la generazione dell'analisi." },
      { status: 500 }
    );
  }
}