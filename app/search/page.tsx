"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useSearchListings } from "@/hooks/use-listings";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { RatingStars } from "@/components/ui/rating-stars";
import { StatusBadge } from "@/components/ui/status-badge";
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
        {/* HERO WAVE BACKDROP */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white py-14 lg:py-16">
          <svg
            className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="search-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#search-grid)" />
          </svg>

          <svg
            className="absolute -top-16 -left-16 w-120 h-120 opacity-30 pointer-events-none"
            viewBox="0 0 500 500"
            fill="none"
          >
            <path
              d="M0,250 C150,180 350,320 500,200 L500,0 L0,0 Z"
              fill="url(#searchGrad1)"
            />
            <defs>
              <linearGradient id="searchGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-white border border-white/25 mb-3 shadow-lg">
              <IconSparkles className="h-3.5 w-3.5 text-blue-200" />
              <span>SEARCH & FIND LICENSED PROVIDERS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider text-white uppercase leading-tight">
              EXPLORE MARKETPLACE <span className="underline underline-offset-8 decoration-white/50">SERVICE LISTINGS</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed font-medium">
              Browse verified providers, filter by service category and location to connect directly with experts.
            </p>
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
                    className="h-10 border border-slate-200 border-l-4 border-l-brand bg-[#f4f6fa] pl-10! text-xs font-medium text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand rounded-r-xl rounded-l-none transition-all"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-r-xl rounded-l-none border border-slate-200 border-l-4 border-l-brand bg-[#f4f6fa] text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand transition-all"
                >
                  <option value="">All Categories</option>
                  {taxonomy?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                    className="h-10 border border-slate-200 border-l-4 border-l-brand bg-[#f4f6fa] pl-10! text-xs font-medium text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand rounded-r-xl rounded-l-none transition-all"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <div>
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-full border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all shadow-xs"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("");
                    setLocation("");
                  }}
                >
                  Reset Filters
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
                      <div className="absolute top-2.5 left-2.5">
                        <StatusBadge status={provider.verificationStatus} />
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

                      <Button asChild size="sm" className="h-8 px-3.5 text-[11px] font-bold rounded-full bg-[#1b76ff] hover:bg-[#145ed8] text-white shadow-xs">
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
