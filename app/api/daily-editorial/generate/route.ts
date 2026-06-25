import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST() {
  try {
    const prompt = `
Genera un editoriale AC1899 sulla giornata di Serie A.

Struttura:
- titolo breve
- sottotitolo
- articolo editoriale di 600 parole
- script video da 60 secondi
- post social breve

Tono:
giornalistico, rossonero, competente, diretto.
`;

   let content = "";

try {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "Sei il direttore editoriale di AC1899, media hub dedicato al Milan.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  content = completion.choices[0]?.message?.content || "";
} catch (aiError) {
  console.error("OpenAI non disponibile, uso mock:", aiError);

  content = `
# Milan, la corsa continua

## Editoriale

Il Milan continua il proprio percorso in Serie A con l'obiettivo di consolidare la posizione nelle zone alte della classifica.

La giornata ha mostrato segnali importanti sia per i rossoneri sia per le principali rivali.

## Script Video

Benvenuti su AC1899 Daily.

Analizziamo la giornata di Serie A.

Il Milan continua la propria corsa nelle zone alte della classifica.

## Social Post

Il Milan resta protagonista della corsa ai vertici della Serie A.
`;
}
    const { error } = await supabaseAdmin.from("daily_editorials").insert({
      title: "Editoriale AC1899 Daily",
      subtitle: "Panoramica rossonera sulla giornata di Serie A",
      article: content,
      video_script: content,
      social_post: content.slice(0, 280),
      status: "draft",
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: "Editoriale generato correttamente.",
      content,
    });
  } catch (error) {
    console.error("Errore daily editorial:", error);

    return Response.json(
      { error: "Errore durante la generazione editoriale." },
      { status: 500 }
    );
  }
}