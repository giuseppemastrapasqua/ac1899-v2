import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const { data: players, error } = await supabaseAdmin
      .from("wonderkids_weekly_awards")
      .select("*")
      .is("player_image", null);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!players || players.length === 0) {
      return Response.json({
        success: true,
        message: "Tutti i giocatori hanno già una immagine.",
      });
    }

    for (const player of players) {
      const initials = `${player.player_name?.[0] || ""}${
        player.player_surname?.[0] || ""
      }`;

      const placeholderUrl = `https://placehold.co/300x300/020617/e30613?text=${encodeURIComponent(
        initials
      )}`;

      await supabaseAdmin
        .from("wonderkids_weekly_awards")
        .update({
          player_image: placeholderUrl,
        })
        .eq("id", player.id);
    }

    return Response.json({
      success: true,
      updated: players.length,
      message: "Placeholder immagini generati automaticamente.",
    });
  } catch (error) {
    console.error("Errore generate images:", error);

    return Response.json(
      { error: "Errore durante la generazione immagini." },
      { status: 500 }
    );
  }
}