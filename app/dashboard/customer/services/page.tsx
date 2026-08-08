"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { useFeaturedListings } from "@/hooks/use-listings";
import { getCategoryImage, getCategoryIcon, getListingImage } from "@/lib/category-meta";
import { RatingStars } from "@/components/ui/rating-stars";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

export default function CustomerServicesPage() {
  const { data: taxonomy } = useTaxonomy();
  const { data: featured, isLoading } = useFeaturedListings(6);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Services
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Browse what you can book, by category or straight from the shortlist.
          </p>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="gap-1.5 rounded-full border-slate-300 text-xs font-bold text-slate-700 hover:border-[#1b76ff] hover:text-[#1b76ff]"
        >
          <Link href="/search">
            <IconSearch className="h-4 w-4" />
            <span>Search all providers</span>
          </Link>
        </Button>
      </div>

      {/* Categories */}
      <section>
        <h2 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Browse by category
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {taxonomy?.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:border-[#1b76ff]/50 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={getCategoryImage(cat.id)}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(cat.icon, "h-4 w-4 text--brand")}
                  <h3 className="truncate text-sm font-extrabold text-slate-900 transition-colors group-hover:text-[#1b76ff]">
                    {cat.name}
                  </h3>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                  {cat.subcategories.length} subcategories
                </p>
              </div>

              <IconArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1b76ff]" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section>
        <h2 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Popular right now
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl border border-slate-200/60 bg-slate-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featured?.map(({ listing, provider }) => (
              <article
                key={listing.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-[#1b76ff]/50 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={getListingImage(listing.primaryCategoryId)}
                    alt={listing.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-extrabold text-slate-900 transition-colors group-hover:text-[#1b76ff]">
                      {listing.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">
                      {provider.businessName}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                      <span className="text-[11px] font-bold text-slate-700">
                        ({provider.ratingCount})
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        From
                      </span>
                      <span className="text-base font-black text-[#1b76ff]">
                        ${listing.pricing.amount || "Quote"}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="h-8 rounded-full bg-[#1b76ff] px-3 text-xs font-bold text-white hover:bg-[#145ed8]"
                    >
                      <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                        Book
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
