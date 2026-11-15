"use client";

import { useState } from "react";

const stadium = "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/San_Siro_stadio_Milano.jpg/960px-San_Siro_stadio_Milano.jpg";
const credit = "https://commons.wikimedia.org/wiki/File:San_Siro_stadio_Milano.jpg";

export function NewsCoverCredit() {
  return <>Foto di repertorio · <a href={credit}>Vasil Evlogiev</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></>;
}

export default function NewsCover({ image, linkedCard = false }: { image?: string; linkedCard?: boolean }) {
  const [failedImage, setFailedImage] = useState<string>();
  const usePublisherImage = Boolean(image && image !== failedImage);

  return (
    <figure className="mb-3">
      <img
        src={usePublisherImage ? image : stadium}
        alt={usePublisherImage ? "" : "Stadio di San Siro, foto di repertorio"}
        loading="lazy"
        className="aspect-video w-full object-cover"
        onError={usePublisherImage ? () => setFailedImage(image) : undefined}
      />
      {!usePublisherImage && (
        <figcaption className="mt-1 text-xs text-gray-400">
          {linkedCard ? "Foto di repertorio" : <NewsCoverCredit />}
        </figcaption>
      )}
    </figure>
  );
}
