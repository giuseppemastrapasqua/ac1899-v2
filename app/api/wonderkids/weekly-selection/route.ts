import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Candidate = {
  id: number;
  name: string;
  surname: string | null;
  age: number | null;
  nationality: string | null;
  club: string | null;
  position: string | null;
  role_group: string | null;
  average_rating: number | null;
};

const formation = [
  { slot: "GK", role: "goalkeeper", x: 50, y: 88 },
  { slot: "LB", role: "defender", x: 22, y: 66 },
  { slot: "CB", role: "defender", x: 40, y: 66 },
  { slot: "CB", role: "defender", x: 60, y: 66 },
  { slot: "RB", role: "defender", x: 78, y: 66 },
  { slot: "CM", role: "midfielder", x: 34, y: 40 },
  { slot: "CM", role: "midfielder", x: 66, y: 40 },
  { slot: "CAM", role: "midfielder", x: 50, y: 36 },
  { slot: "LW", role: "forward", x: 25, y: 18 },
  { slot: "ST", role: "forward", x: 50, y: 14 },
  { slot: "RW", role: "forward", x: 75, y: 18 },
];

function slugify(name: string, surname?: string | null) {
  return `${name}-${surname || ""}`
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function score(player: Candidate) {
  return Math.min(99, Math.round(Number(player.average_rating || 7) * 12));
}

function pickBest(pool: Candidate[], role: string, count: number) {
  return pool
    .filter((p) => p.role_group === role)
    .sort((a, b) => Number(b.average_rating || 0) - Number(a.average_rating || 0))
    .slice(0, count);
}

function awardType(role: string) {
  const map: Record<string, string> = {
    goalkeeper: "best_goalkeeper",
    defender: "best_defender",
    midfielder: "best_midfielder",
    forward: "best_forward",
  };

  return map[role] || role;
}

function note(slot: string, player: Candidate) {
  const fullName = `${player.name} ${player.surname || ""}`.trim();

  if (slot === "GK") {
    return `${fullName} scelto come portiere della Best XI per rendimento e affidabilità.`;
  }

  if (["LB", "CB", "RB"].includes(slot)) {
    return `${fullName} inserito nella linea difensiva per solidità, continuità e impatto.`;
  }

  if (["CM", "CAM"].includes(slot)) {
    return `${fullName} selezionato a centrocampo per qualità tecnica, influenza e personalità.`;
  }

  return `${fullName} scelto nel tridente offensivo per pericolosità, creatività e rendimento.`;
}

export async function POST() {
  try {
    const { data: candidates, error: loadError } = await supabaseAdmin
      .from("wonderkid_candidates")
      .select("*")
      .eq("status", "hidden");

    if (loadError) {
      return Response.json({ error: loadError.message }, { status: 500 });
    }

    if (!candidates || candidates.length < 11) {
      return Response.json({
        success: false,
        message: `Servono almeno 11 candidati hidden. Trovati: ${candidates?.length || 0}`,
      });
    }

    const typed = candidates as Candidate[];

    const gk = pickBest(typed, "goalkeeper", 1);
    const defenders = pickBest(typed, "defender", 4);
    const midfielders = pickBest(typed, "midfielder", 3);
    const forwards = pickBest(typed, "forward", 3);

    if (
      gk.length < 1 ||
      defenders.length < 4 ||
      midfielders.length < 3 ||
      forwards.length < 3
    ) {
      return Response.json({
        success: false,
        message:
          "Candidati insufficienti per ruolo. Servono 1 GK, 4 DEF, 3 MID, 3 FWD.",
      });
    }

    const selectedPlayers = [...gk, ...defenders, ...midfielders, ...forwards];

    const bestByRole = {
      goalkeeper: gk[0],
      defender: defenders[0],
      midfielder: midfielders[0],
      forward: forwards[0],
    };

    const weekId = "2026-06-17_2026-06-24";
    const weekLabel = "week 1";

    for (const [role, player] of Object.entries(bestByRole)) {
      const playerScore = score(player);
      const playerNote = note(role, player);

      const { error: awardError } = await supabaseAdmin
        .from("wonderkids_weekly_awards")
        .insert({
          week_id: weekId,
          week_label: weekLabel,
          player_name: player.name,
          player_surname: player.surname,
          club: player.club,
          nationality: player.nationality,
          position: player.position,
          award_type: awardType(role),
          rating: playerScore,
          x_position: null,
          y_position: null,
          notes: playerNote,
          photo: null,
          player_image: null,
          slug: slugify(player.name, player.surname),
        });

      if (awardError) {
        return Response.json({ error: awardError.message }, { status: 500 });
      }
    }

    for (let i = 0; i < formation.length; i++) {
      const slot = formation[i];
      const player = selectedPlayers[i];
      const playerScore = score(player);
      const playerNote = note(slot.slot, player);

      const { error: updateError } = await supabaseAdmin
        .from("wonderkid_candidates")
        .update({
          status: "selected",
          selected_category: slot.role,
          selected_for_best_xi: true,
          best_xi_position: slot.slot,
          ai_score: playerScore,
          ai_report: playerNote,
        })
        .eq("id", player.id);

      if (updateError) {
        return Response.json({ error: updateError.message }, { status: 500 });
      }

      const { error: xiError } = await supabaseAdmin
        .from("wonderkids_best_xi")
        .insert({
          week_id: weekId,
          week_label: weekLabel,
          candidate_id: player.id,
          player_name: player.name,
          player_surname: player.surname,
          club: player.club,
          nationality: player.nationality,
          position: player.position,
          formation_slot: slot.slot,
          rating: playerScore,
          x_position: slot.x,
          y_position: slot.y,
          ai_report: playerNote,
          player_image: null,
          slug: slugify(player.name, player.surname),
        });

      if (xiError) {
        return Response.json({ error: xiError.message }, { status: 500 });
      }
    }

    return Response.json({
      success: true,
      mode: "awards-plus-best-xi",
      awards_count: Object.keys(bestByRole).length,
      best_xi_count: selectedPlayers.length,
    });
  } catch (error) {
    console.error("Errore weekly selection:", error);

    return Response.json(
      { error: "Errore durante la selezione settimanale." },
      { status: 500 }
    );
  }
}