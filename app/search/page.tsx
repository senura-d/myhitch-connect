"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Footer } from "@/components/layout/footer";
import { useSearchListings } from "@/hooks/use-listings";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { RatingStars } from "@/components/ui/rating-stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconSearch,
  IconMapPin,
  IconFilter,
  IconBuildingStore,
  IconSparkles,
  IconCategory,
  IconChevronDown,
  IconRotate2,
} from "@tabler/icons-react";

const SERVICE_IMAGES: Record<string, string> = {
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");

  const { data: taxonomy } = useTaxonomy();
  const { data: results, isLoading } = useSearchListings({
    query: query || undefined,
    mainCategoryId: selectedCategory || undefined,
    location: location || undefined,
  });

  const getListingImage = (primaryCategoryId: string) => {
    return (
      SERVICE_IMAGES[primaryCategoryId] ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans text-slate-900 overflow-x-clip">
      <Header />

      <main className="flex-1 overflow-x-clip">
        {/* HERO BACKDROP */}
        <section className="relative overflow-hidden text-slate-900 py-14 lg:py-16 bg-white border-b border-slate-200/80">
          <HeroBackdrop
            images={[
              "/myhitch-connect/search-hero-backdrop.png",
            ]}
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-left space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-brand border border-brand/20 shadow-xs">
                <IconSparkles className="h-3.5 w-3.5 text-brand" />
                <span>SEARCH & FIND LICENSED PROVIDERS</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-950 uppercase">
                EXPLORE MARKETPLACE <span className="gradient-brand-text">SERVICE LISTINGS</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed font-medium">
                Browse verified providers, filter by service category and location to connect directly with experts.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
          {/* COMPACT HORIZONTAL FILTER BAR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-lg shadow-blue-500/5 mb-8">
            <div className="flex items-center justify-between font-black text-xs text-slate-900 mb-3 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <IconFilter className="h-4 w-4 text-brand" />
                <span>FILTER PROVIDERS</span>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">{results?.length || 0} listings found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Keyword Search */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Keyword</label>
                <div className="relative flex items-center">
                  <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand z-10 pointer-events-none" />
                  <Input
                    placeholder="e.g. Plumbing, Cleaning"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-11 border border-slate-200/90 bg-slate-50/80 pl-10! pr-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-full transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Category</label>
                <div className="relative flex items-center">
                  <IconCategory className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand z-10 pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-11 pl-10 pr-9 text-xs font-semibold rounded-full border border-slate-200/90 bg-slate-50/80 text-slate-900 focus:outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all appearance-none cursor-pointer shadow-2xs"
                  >
                    <option value="">All Categories</option>
                    {taxonomy?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Location</label>
                <div className="relative flex items-center">
                  <IconMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand z-10 pointer-events-none" />
                  <Input
                    placeholder="Suburb or postcode"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 border border-slate-200/90 bg-slate-50/80 pl-10! pr-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-full transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <div>
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-full border border-slate-200 bg-slate-100/90 hover:bg-slate-200 hover:text-slate-900 text-slate-700 font-extrabold text-xs transition-all shadow-2xs gap-1.5"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("");
                    setLocation("");
                  }}
                >
                  <IconRotate2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Reset Filters</span>
                </Button>
              </div>
            </div>
          </div>

          {/* 4 CARDS PER ROW GRID LAYOUT */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : results?.length === 0 ? (
              <div className="text-center py-16 p-8 border border-dashed border-slate-200 rounded-3xl bg-white shadow-xs">
                <p className="text-base font-bold text-slate-900">No matching listings found.</p>
                <p className="text-xs text-slate-500 mt-1">Try broadening your search keywords or location filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {results?.map(({ listing, provider }) => (
                  <Card key={listing.id} className="overflow-hidden rounded-2xl hover:border-brand hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between border border-slate-200/80 bg-white pt-0">
                    <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={getListingImage(listing.primaryCategoryId)}
                        alt={listing.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="secondary" className="capitalize text-[9px] bg-white/95 text-brand border border-brand/30 font-extrabold px-2 py-0.5 shadow-xs">
                          {listing.pricing.method.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-4 pb-1.5 space-y-1">
                      <CardTitle className="text-xs sm:text-sm font-extrabold line-clamp-1 text-slate-900 hover:text-brand transition-colors">
                        <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                          {listing.title}
                        </Link>
                      </CardTitle>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {listing.description}
                      </p>
                    </CardHeader>

                    <CardContent className="px-4 py-2 border-t border-b border-slate-100 bg-slate-50/50 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate max-w-[110px]">
                          <IconBuildingStore className="h-3.5 w-3.5 text-brand shrink-0" />
                          <span className="truncate">{provider.businessName}</span>
                        </span>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                          <span className="font-bold text-slate-800 text-[10px]">({provider.ratingCount})</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Starting at</span>
                        <span className="text-base font-black text-brand">
                          ${listing.pricing.amount || "Quote Required"}
                        </span>
                      </div>

                      <Button asChild size="sm" className="h-8 px-3.5 text-[11px] font-bold rounded-full bg-[#24a1dc] hover:bg-[#1b7faf] text-white shadow-xs">
                        <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
