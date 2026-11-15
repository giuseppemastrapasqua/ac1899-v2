"use client";

import { useState } from "react";

export default function NewsCover({ image }: { image?: string }) {
  const [failedImage, setFailedImage] = useState<string>();
  if (!image || image === failedImage) return null;

  return (
    <img
      src={image}
      alt=""
      loading="lazy"
      className="aspect-video w-full rounded-lg object-cover"
      onError={() => setFailedImage(image)}
    />
  );
}
