import React from "react";
import {
  IconHammer,
  IconBriefcase,
  IconHeartHandshake,
  IconCamera,
  IconBuildingCommunity,
  IconSparkles,
} from "@tabler/icons-react";

/**
 * Presentation-only metadata for the five main service categories. The taxonomy
 * itself (names, slugs, subcategories) comes from the mock API — this only maps
 * a category to the artwork and icon used to render it.
 */
export const CATEGORY_IMAGES: Record<string, string> = {
  "cat-home-trade":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
  "cat-professional":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  "cat-personal-care":
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
  "cat-events-creative":
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
  "cat-community":
    "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1000&q=80",
};

export const CATEGORY_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";

export function getCategoryImage(categoryId: string) {
  return CATEGORY_IMAGES[categoryId] ?? CATEGORY_FALLBACK_IMAGE;
}

/** Artwork per service type, used on listing cards. */
export const SERVICE_IMAGES: Record<string, string> = {
  "st-plumbing-repair": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=90",
  "st-electrical-repair": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=90",
  "st-home-cleaning": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=90",
  "st-end-of-lease-cleaning": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=90",
  "st-lawn-care": "https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=1000&q=90",
  "st-bookkeeping": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=90",
  "st-tax-prep": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=90",
  "st-one-on-one-training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=90",
  "st-event-photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=90",
  "st-event-catering": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=90",
  "st-wedding-dj": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=90",
  "st-hall-hire": "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1000&q=90",
};

export function getListingImage(primaryCategoryId: string) {
  return SERVICE_IMAGES[primaryCategoryId] ?? CATEGORY_FALLBACK_IMAGE;
}

export function getCategoryIcon(iconName: string, className = "h-6 w-6 text-brand") {
  switch (iconName) {
    case "IconHammer":
      return <IconHammer className={className} />;
    case "IconBriefcase":
      return <IconBriefcase className={className} />;
    case "IconHeartHandshake":
      return <IconHeartHandshake className={className} />;
    case "IconCamera":
      return <IconCamera className={className} />;
    case "IconBuildingCommunity":
      return <IconBuildingCommunity className={className} />;
    default:
      return <IconSparkles className={className} />;
  }
}
