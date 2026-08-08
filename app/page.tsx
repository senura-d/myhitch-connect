"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatWeDoTextScroll } from "@/components/home/what-we-do-text-scroll";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { getCategoryImage } from "@/lib/category-meta";
import { useFeaturedListings } from "@/hooks/use-listings";
import { useProviders } from "@/hooks/use-providers";
import { RatingStars } from "@/components/ui/rating-stars";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconSearch,
  IconMapPin,
  IconShieldCheck,
  IconClock,
  IconBuildingStore,
  IconArrowRight,
  IconSparkles,
  IconHammer,
  IconBriefcase,
  IconHeartHandshake,
  IconCamera,
  IconBuildingCommunity,
  IconLockCheck,
  IconCheck,
  IconCircleDot,
} from "@tabler/icons-react";

const SERVICE_IMAGES: Record<string, string> = {
  "st-plumbing-repair": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=75",
  "st-electrical-repair": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=75",
  "st-home-cleaning": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=75",
  "st-end-of-lease-cleaning": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75",
  "st-lawn-care": "https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=600&q=75",
  "st-bookkeeping": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=75",
  "st-tax-prep": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=75",
  "st-one-on-one-training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=75",
  "st-event-photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=75",
  "st-event-catering": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=75",
  "st-wedding-dj": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=75",
  "st-hall-hire": "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=600&q=75",
};

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { data: taxonomy } = useTaxonomy();
  const { data: featuredListings, isLoading: listingsLoading } = useFeaturedListings(6);
  const { data: providers } = useProviders({ onlyApproved: true });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLocation) params.set("location", selectedLocation);
    router.push(`/search?${params.toString()}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "IconHammer":
        return <IconHammer className="h-5 w-5 text-brand" />;
      case "IconBriefcase":
        return <IconBriefcase className="h-5 w-5 text-brand" />;
      case "IconHeartHandshake":
        return <IconHeartHandshake className="h-5 w-5 text-brand" />;
      case "IconCamera":
        return <IconCamera className="h-5 w-5 text-brand" />;
      case "IconBuildingCommunity":
        return <IconBuildingCommunity className="h-5 w-5 text-brand" />;
      default:
        return <IconSparkles className="h-5 w-5 text-brand" />;
    }
  };

  const getListingImage = (primaryCategoryId: string) => {
    return (
      SERVICE_IMAGES[primaryCategoryId] ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans overflow-x-clip">
      <Header />

      <main className="flex-1 overflow-x-clip">
        {/* HERO SECTION MATCHING LOGIN WAVE DESIGN */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center items-center bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white py-16 px-4">
          {/* Abstract SVG Grid Overlay */}
          <svg
            className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hero-grid"
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
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          {/* Curved Vector Waves */}
          <svg
            className="absolute -top-16 -left-16 w-125 h-125 opacity-30 pointer-events-none"
            viewBox="0 0 500 500"
            fill="none"
          >
            <path
              d="M0,250 C150,180 350,320 500,200 L500,0 L0,0 Z"
              fill="url(#heroGrad1)"
            />
            <defs>
              <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            className="absolute -bottom-24 -right-24 w-150 h-150 opacity-40 pointer-events-none"
            viewBox="0 0 600 600"
            fill="none"
          >
            <path
              d="M0,400 C200,250 400,500 600,350 L600,600 L0,600 Z"
              fill="url(#heroGrad2)"
            />
            <defs>
              <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Constellation Light Nodes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 right-20 w-3 h-3 rounded-full border border-white/60 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
            <div className="absolute bottom-1/3 left-20 w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs shadow-white" />
            <div className="absolute top-20 left-1/3 w-2 h-2 rounded-full bg-white/60" />
          </div>

          <div className="container relative z-10 mx-auto text-center max-w-3xl flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/25 shadow-lg">
                <IconSparkles className="h-4 w-4 text-blue-200" />
                <span>Verified Trade Professionals, Consultants & Experts</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-white leading-tight uppercase text-center">
                CONNECT WITH TRUSTED LOCAL <span className="underline underline-offset-8 decoration-white/50">SERVICE PROVIDERS</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed text-center font-medium">
                From licensed plumbers and accountants to personal trainers and photographers. 100% verified credentials, licences, and public liability insurance.
              </p>

              <form
                onSubmit={handleSearch}
                className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-2 text-left"
              >
                <div className="w-full sm:w-44 flex items-center gap-2 px-4 h-11 bg-[#f4f6fa] rounded-full border-l-4 border-l-brand">
                  <IconSearch className="h-4 w-4 text-brand shrink-0" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none text-slate-800 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                <div className="w-full sm:w-44 flex items-center gap-2 px-4 h-11 bg-[#f4f6fa] rounded-full border-l-4 border-l-brand">
                  <IconMapPin className="h-4 w-4 text-brand shrink-0" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none text-slate-800 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full sm:w-auto h-11 px-7 rounded-full font-bold bg-[#1b76ff] hover:bg-[#145ed8] text-white text-xs uppercase tracking-widest shadow-md shadow-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/40 shrink-0"
                >
                  <IconSearch className="h-4 w-4 text-white mr-1" />
                  <span>Search</span>
                </Button>
              </form>

              {/* TRUST TAGS */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100/90 font-semibold">
                <span className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-blue-200" /> Licence Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <IconShieldCheck className="h-4 w-4 text-blue-200" /> Public Liability Insurance
                </span>
                <span className="flex items-center gap-1.5">
                  <IconLockCheck className="h-4 w-4 text-blue-200" /> Secure Instant Bookings
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* GSAP TEXT SCROLL SHOWCASE */}
        <WhatWeDoTextScroll />

        {/* CATEGORY GRID */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <Badge variant="outline" className="mb-2.5 text-xs border-brand/30 bg-brand-light text-brand font-extrabold uppercase tracking-wider">
                  Taxonomy
                </Badge>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Explore Service Categories
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Discover pre-vetted professionals across trade & expert domain areas.
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full border-slate-300 text-slate-800 hover:border-brand hover:text-brand font-bold text-xs">
                <Link href="/category">View All Categories &rarr;</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {taxonomy?.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group relative rounded-3xl bg-white border border-slate-200/80 overflow-hidden hover:border-brand transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={getCategoryImage(cat.id)}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 p-2.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-brand/30 shadow-xs">
                      {getCategoryIcon(cat.icon)}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>{cat.subcategories.length} subcategories</span>
                      <IconArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES / LISTINGS */}
        <section className="py-20 bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <Badge className="mb-2.5 bg-brand-light text-brand border-brand/30 font-extrabold uppercase tracking-wider text-xs">
                  Featured Services
                </Badge>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Popular Marketplace Listings
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Book instant slots or request custom quotes directly from top-rated providers.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full border-slate-300 text-slate-800 hover:border-brand hover:text-brand font-bold text-xs">
                <Link href="/search">Browse All Listings</Link>
              </Button>
            </div>

            {listingsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 rounded-3xl bg-slate-200/60 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredListings?.map(({ listing, provider }) => (
                  <Card key={listing.id} className="overflow-hidden rounded-3xl hover:border-brand hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between border border-slate-200/80 bg-white pt-0">
                    <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={getListingImage(listing.primaryCategoryId)}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="secondary" className="capitalize text-[10px] bg-white/95 text-brand border border-brand/30 font-bold shadow-xs px-2.5 py-0.5">
                          {listing.pricing.method.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="absolute top-2.5 left-2.5">
                        <StatusBadge status={provider.verificationStatus} />
                      </div>
                    </div>

                    <CardHeader className="p-4 pb-2 space-y-1">
                      <CardTitle className="text-sm font-extrabold line-clamp-1 text-slate-900 hover:text-brand transition-colors">
                        <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                          {listing.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {listing.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 py-2.5 space-y-1.5 border-t border-b border-slate-100 bg-[#f8fafc]">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate max-w-[130px]">
                          <IconBuildingStore className="h-3.5 w-3.5 text-brand shrink-0" />
                          <span className="truncate">{provider.businessName}</span>
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                          <span className="font-bold text-slate-800 text-[11px]">({provider.ratingCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <IconMapPin className="h-3 w-3 text-brand" />
                          {provider.locations[0]?.suburb || "Local Service"}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconClock className="h-3 w-3 text-brand" />
                          ~{provider.responseTimeHours}h
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">Starting at</span>
                        <span className="text-base font-black text-brand">
                          ${listing.pricing.amount || "Quote"}
                        </span>
                        {listing.pricing.unit && (
                          <span className="text-[10px] text-slate-400">/{listing.pricing.unit}</span>
                        )}
                      </div>

                      <Button asChild size="sm" className="h-8 px-4 text-xs font-bold bg-[#1b76ff] hover:bg-[#145ed8] text-white rounded-full shadow-md shadow-blue-500/20">
                        <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                          View & Book
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* VERIFIED PROVIDERS HIGHLIGHT */}
        <section className="py-20 bg-white border-t border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="mb-2.5 border-brand/30 bg-brand-light text-brand font-extrabold uppercase tracking-wider text-xs">
                Top Talent
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Meet Approved Service Providers
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Every provider on MYHitch Connect undergoes licence verification and insurance compliance checks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers?.slice(0, 6).map((provider) => (
                <div
                  key={provider.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-brand hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/25">
                          {provider.businessName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 hover:text-brand transition-colors">
                            <Link href={`/provider/${provider.id}`}>{provider.businessName}</Link>
                          </h3>
                          <p className="text-xs text-slate-400 capitalize font-medium">
                            {provider.providerType.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={provider.verificationStatus} />
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {provider.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <RatingStars value={provider.ratingAverage} readOnly />
                      <span className="text-xs font-bold text-slate-800">
                        {provider.ratingAverage.toFixed(1)} ({provider.ratingCount} reviews)
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between">
                        <span>Response Time</span>
                        <span className="font-bold text-slate-800">~{provider.responseTimeHours}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Service Radius</span>
                        <span className="font-mono text-[11px] text-slate-800 font-semibold">{provider.serviceRadiusKm} km</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    <Button asChild variant="outline" size="sm" className="flex-1 rounded-full text-xs font-bold border-slate-300 text-slate-700 hover:border-brand hover:text-brand">
                      <Link href={`/provider/${provider.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 rounded-full text-xs font-bold bg-[#1b76ff] text-white hover:bg-[#145ed8] shadow-md shadow-blue-500/20">
                      <Link href={`/provider/${provider.id}`}>Request Quote</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-2.5 bg-brand-light text-brand border-brand/30 font-extrabold uppercase tracking-wider text-xs">
                Simple & Transparent
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                How MYHitch Connect Works
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Whether you need a quick repair or a long-term advisor, getting connected takes minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 text-center relative space-y-4 shadow-xs hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/25">
                  1
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Search & Compare</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Browse vetted local trade professionals, freelancers, and businesses. Filter by price, rating, and location.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 text-center relative space-y-4 shadow-xs hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/25">
                  2
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Book or Request Quotes</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Book instant fixed-price appointment slots or submit a quote request with photos and requirements.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 text-center relative space-y-4 shadow-xs hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/25">
                  3
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Work Done & Review</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Communicate via secure messaging, track progress in your dashboard, and leave verified reviews.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROVIDER CTA BANNER CARD */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark p-10 sm:p-14 text-white text-center shadow-2xl shadow-blue-900/20">
              <svg
                className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="cta-grid"
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
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
                  ARE YOU A QUALIFIED SERVICE PROVIDER?
                </h2>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                  Grow your business on MYHitch Connect. Upload your licences, list your services, and receive direct quote requests from local clients.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-white text-[#1b76ff] hover:bg-blue-50 text-xs uppercase tracking-widest shadow-lg border-0">
                    <Link href="/onboarding/provider">Start Provider Onboarding</Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-white text-[#1b76ff] hover:bg-blue-50 text-xs uppercase tracking-widest shadow-lg border-0">
                    <Link href="/admin/providers/verification">Admin Verification Queue</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
