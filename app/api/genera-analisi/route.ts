import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prompt = `
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const text =
      completion.choices[0]?.message?.content ||
      "Analisi non disponibile.";

    return Response.json({ analysis: text });
  } catch (error) {
    console.error("Errore generazione analisi:", error);

    return Response.json(
      { error: "Errore durante la generazione dell'analisi." },
      { status: 500 }
    );
  }
}