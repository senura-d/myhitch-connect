"use client";

import React from "react";
import Image from "next/image";

const DEFAULT_IMAGES = [
  "/hero-backdrop.png",
];

export function HeroBackdrop({
  images = DEFAULT_IMAGES,
}: {
  images?: string[];
  dim?: number;
}) {
  const imgSrc = images[0] || "/hero-backdrop.png";

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-white">
      <Image
        src={imgSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right md:object-center"
      />
      {/* Light subtle left gradient for maximum text contrast on smaller screens */}
      <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent lg:via-white/40" />
      {/* Smooth bottom blend into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent" />
    </div>
  );
}
