"use client";

import * as React from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

export function RatingStars({
  value,
  onChange,
  readOnly = true,
  size = "md",
  max = 5,
  className,
  "aria-label": ariaLabel,
}: {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: keyof typeof SIZE_MAP;
  max?: number;
  className?: string;
  "aria-label"?: string;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const displayValue = hovered ?? value;
  const interactive = !readOnly && !!onChange;

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={ariaLabel ?? `Rating: ${value} out of ${max}`}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
        const filled = star <= Math.round(displayValue);
        const Icon = filled ? IconStarFilled : IconStar;
        if (!interactive) {
          return (
            <Icon
              key={star}
              className={cn(SIZE_MAP[size], filled ? "text-warning" : "text-muted-foreground/40")}
            />
          );
        }
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="cursor-pointer rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            onClick={() => onChange?.(star)}
          >
            <Icon className={cn(SIZE_MAP[size], filled ? "text-warning" : "text-muted-foreground/40")} />
          </button>
        );
      })}
    </div>
  );
}
