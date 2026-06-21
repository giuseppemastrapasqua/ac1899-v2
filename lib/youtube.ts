const BASE_URL = "https://www.googleapis.com/youtube/v3";

type MilanVideo = {
  category: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
};

async function getOfficialMilanUploadsPlaylistId() {
  const res = await fetch(
    `${BASE_URL}/channels?part=contentDetails&forHandle=@ACMilan&key=${process.env.YOUTUBE_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || "";
}

async function getLatestOfficialVideos() {
  const uploadsPlaylistId = await getOfficialMilanUploadsPlaylistId();

  if (!uploadsPlaylistId) {
    return [];
  }

  const res = await fetch(
    `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data?.items || [];
}

function findVideoByWords(
  items: any[],
  category: string,
  words: string[]
): MilanVideo {
  const found =
    items.find((item: any) => {
      const title =
        item?.snippet?.title?.toLowerCase() || "";

      const description =
        item?.snippet?.description?.toLowerCase() || "";

      return words.some(
        (word) =>
          title.includes(word.toLowerCase()) ||
          description.includes(word.toLowerCase())
      );
    }) || items[0];

  return {
    category,
    title: found?.snippet?.title || "Video non disponibile",
    description: found?.snippet?.description || "",
    youtubeId: found?.snippet?.resourceId?.videoId || "",
    thumbnail: found?.snippet?.thumbnails?.high?.url || "",
  };
}

export async function getMilanVideos() {
  const items = await getLatestOfficialVideos();

  if (items.length === 0) {
    return [
      {
        category: "AC Milan",
        title: "Video non disponibile",
        description:
          "Nessun video trovato dal canale ufficiale AC Milan.",
        youtubeId: "",
        thumbnail: "",
      },
    ];
  }

  return [
    findVideoByWords(items, "Highlights", [
      "highlights",
      "extended highlights",
    ]),
    findVideoByWords(items, "Interviste", [
      "interview",
      "intervista",
    ]),
    findVideoByWords(items, "Conferenze stampa", [
      "press conference",
      "conferenza stampa",
      "conference",
    ]),
    findVideoByWords(items, "Gol", [
      "goal",
      "gol",
      "goals",
    ]),
  ];
}