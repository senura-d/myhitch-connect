"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchListings } from "@/hooks/use-listings";
import { useProviders } from "@/hooks/use-providers";
import { RatingStars } from "@/components/ui/rating-stars";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getListingImage } from "@/lib/category-meta";
import { IconFilter, IconBuildingStore, IconMapPin, IconClock, IconSparkles } from "@tabler/icons-react";
import type { MainCategory } from "@/types/taxonomy";

export function CategoryContent({
  category,
  variant = "page",
}: {
  category: MainCategory;
  variant?: "page" | "panel";
}) {
  const [selectedSubcategory, setSelectedSubcategory] = React.useState("all");

  React.useEffect(() => {
    setSelectedSubcategory("all");
  }, [category.id]);

  const { data: searchResults, isLoading: listingsLoading } = useSearchListings({
    mainCategoryId: category.id,
  });

  const { data: providers } = useProviders({
    categoryId: category.id,
    onlyApproved: true,
  });

  const filteredListings = searchResults?.filter((item) => {
    if (selectedSubcategory === "all") return true;
    return item.listing.primaryCategoryId.includes(selectedSubcategory);
  });

  const listingGrid =
    variant === "panel"
      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

  const providerGrid =
    variant === "panel"
      ? "grid grid-cols-1 xl:grid-cols-2 gap-5"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";

  return (
    <div className="space-y-12">
      {/* MODERN SUBCATEGORY FILTER PILL BAR */}
      <div className="bg-slate-50/80 p-3 rounded-full border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="mr-2 flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 pl-3">
            <IconFilter className="h-3.5 w-3.5 text-[#2b89ff]" /> Subcategories:
          </span>
          <button
            type="button"
            onClick={() => setSelectedSubcategory("all")}
            aria-pressed={selectedSubcategory === "all"}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
              selectedSubcategory === "all"
                ? "bg-[#2b89ff] text-white shadow-md shadow-blue-500/20 border border-[#2b89ff]"
                : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
            }`}
          >
            All Services ({category.subcategories.length})
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubcategory(sub.slug)}
              aria-pressed={selectedSubcategory === sub.slug}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                selectedSubcategory === sub.slug
                  ? "bg-[#2b89ff] text-white shadow-md shadow-blue-500/20 border border-[#2b89ff]"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* SERVICE LISTINGS */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl flex items-center gap-2">
              Available Service Listings
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full text-xs font-bold bg-[#f0f7ff] text-[#2b89ff] border border-[#2b89ff]/30">
                {filteredListings?.length || 0}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Book instant slots or request custom quotes directly from top verified providers.
            </p>
          </div>
        </div>

        {listingsLoading ? (
          <div className={listingGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100 border border-slate-200/60" />
            ))}
          </div>
        ) : filteredListings?.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
            <h3 className="text-base font-bold text-slate-900">
              No specific listings for this subcategory yet
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              You can request custom quotes directly from approved {category.name} providers below.
            </p>
          </div>
        ) : (
          <div className={listingGrid}>
            {filteredListings?.map(({ listing, provider }) => (
              <Card
                key={listing.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white pt-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2b89ff] hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="relative w-full flex-1 min-h-36 overflow-hidden bg-slate-100">
                  <Image
                    src={getListingImage(listing.primaryCategoryId)}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute right-2.5 top-2.5">
                    <Badge
                      variant="secondary"
                      className="shadow-2xs border border-[#2b89ff]/30 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold capitalize text-[#2b89ff]"
                    >
                      {listing.pricing.method.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="absolute left-2.5 top-2.5">
                    <StatusBadge status={provider.verificationStatus} />
                  </div>
                </div>

                <CardHeader className="space-y-0.5 p-3.5 pb-2">
                  <CardTitle className="line-clamp-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-[#2b89ff]">
                    <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </CardTitle>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500">
                    {listing.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-1.5 border-b border-t border-slate-100 bg-slate-50/50 px-3.5 py-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex max-w-[130px] items-center gap-1.5 truncate font-semibold text-slate-800">
                      <IconBuildingStore className="h-3.5 w-3.5 shrink-0 text-[#2b89ff]" />
                      <span className="truncate">{provider.businessName}</span>
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                      <span className="text-[11px] font-bold text-slate-800">
                        ({provider.ratingCount})
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between p-3.5 pt-2">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Starting at
                    </span>
                    <span className="text-base font-extrabold text-[#2b89ff]">
                      ${listing.pricing.amount || "Quote"}
                    </span>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="h-8 rounded-full bg-[#1b76ff] px-4 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#145ed8] transition-all"
                  >
                    <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                      Book Service
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* APPROVED PROVIDERS DIRECTORY */}
      <div className="border-t border-slate-200/80 pt-10">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl flex items-center gap-2">
            Approved {category.name} Providers
            <IconSparkles className="h-4 w-4 text-brand" />
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Verified local trade professionals and experts with audited credentials and public liability insurance.
          </p>
        </div>

        <div className={providerGrid}>
          {providers?.map((provider) => (
            <div
              key={provider.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
            >
              <div>
                <div className="mb-3.5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-gradient-to-br from-brand/10 to-brand/5 text-base font-extrabold text-brand shadow-2xs">
                      {provider.businessName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-brand">
                        <Link href={`/provider/${provider.id}`}>
                          {provider.businessName}
                        </Link>
                      </h3>
                      <p className="text-[11px] capitalize text-slate-400 font-medium">
                        {provider.providerType.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={provider.verificationStatus} />
                </div>

                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {provider.description}
                </p>

                <div className="mb-3 flex items-center justify-between text-xs border-t border-b border-slate-100 py-2">
                  <div className="flex items-center gap-1.5">
                    <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                    <span className="text-[11px] font-bold text-slate-800">
                      {provider.ratingAverage.toFixed(1)} ({provider.ratingCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <IconMapPin className="h-3 w-3 text-brand" />
                    <span>{provider.locations[0]?.suburb || "Local"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 border-slate-200 text-xs font-bold text-slate-700 hover:border-brand hover:text-brand rounded-lg"
                >
                  <Link href={`/provider/${provider.id}`}>View Profile</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="flex-1 h-8 bg-brand text-xs font-bold text-white hover:bg-[#1d8abe] rounded-lg shadow-2xs"
                >
                  <Link href={`/provider/${provider.id}`}>Request Quote</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
