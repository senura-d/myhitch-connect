"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatWeDoTextScroll } from "@/components/home/what-we-do-text-scroll";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
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
import { assetPath } from "@/lib/asset-path";

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
  const { data: featuredListings, isLoading: listingsLoading } = useFeaturedListings(4);
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
        {/* HERO — photographic backdrop */}
        <section className="relative flex min-h-[85vh] lg:min-h-[88vh] flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16 pb-16 lg:pb-24 text-slate-900 bg-white">
          <HeroBackdrop />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="max-w-2xl text-left space-y-5 sm:space-y-6">
              {/* Hero Brand Logo */}
              <div className="inline-block -mt-4 sm:-mt-6 lg:-mt-10 mb-1 sm:mb-2">
                <Image
                  src={assetPath("/logo-stacked.png")}
                  alt="MYHitch Connect Logo"
                  width={300}
                  height={160}
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-xs"
                  priority
                />
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-[1.15] uppercase">
                CONNECT WITH TRUSTED LOCAL <span className="gradient-brand-text">SERVICE PROVIDERS</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-medium">
                From licensed plumbers and accountants to personal trainers and photographers. 100% verified credentials, licences, and public liability insurance.
              </p>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full border border-slate-200 shadow-xl shadow-blue-500/10"
              >
                <div className="w-full sm:flex-1 flex items-center gap-2.5 px-4 h-11 bg-slate-50/80 rounded-full border border-slate-200/80 focus-within:border-brand transition-colors">
                  <IconSearch className="h-4 w-4 text-brand shrink-0" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none text-slate-800 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                <div className="w-full sm:flex-1 flex items-center gap-2.5 px-4 h-11 bg-slate-50/80 rounded-full border border-slate-200/80 focus-within:border-brand transition-colors">
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
                  className="w-full sm:w-auto h-11 px-7 rounded-full font-extrabold bg-[#24a1dc] hover:bg-[#1b7faf] text-white text-xs uppercase tracking-widest shadow-md shadow-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/40 shrink-0"
                >
                  <IconSearch className="h-4 w-4 text-white mr-1.5" />
                  <span>Search</span>
                </Button>
              </form>

              {/* TRUST TAGS */}
              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">✓</div> Licence Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <IconShieldCheck className="h-4 w-4 text-brand" /> Public Liability Insurance
                </span>
                <span className="flex items-center gap-1.5">
                  <IconLockCheck className="h-4 w-4 text-brand" /> Secure Instant Bookings
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
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Explore Services
                </h2>
                <p className="text-slate-500 text-sm mt-1.5 font-medium">
                  Find trusted professionals for almost anything you need.
                </p>
              </div>
              <Link
                href="/category"
                className="text-brand hover:text-brand-dark font-bold text-sm flex items-center gap-1.5 hover:underline transition-colors"
              >
                <span>View All Categories</span>
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {taxonomy?.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group rounded-3xl bg-white border border-slate-200/80 p-6 hover:border-brand/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-blue-50/80 text-brand flex items-center justify-center mb-6 border border-brand/10 shadow-2xs group-hover:scale-105 transition-transform">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>18+ Providers</span>
                    <IconArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
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

                      <Button asChild size="sm" className="h-8 px-4 text-xs font-bold bg-[#24a1dc] hover:bg-[#1b7faf] text-white rounded-full shadow-md shadow-blue-500/20">
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
                        {provider.logoUrl ? (
                          <img
                            src={provider.logoUrl}
                            alt={provider.businessName}
                            className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-md shadow-blue-500/10"
                          />
                        ) : (
                          <div className="h-12 w-12 shrink-0 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/25">
                            {provider.businessName.charAt(0)}
                          </div>
                        )}
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
                    <Button asChild size="sm" className="flex-1 rounded-full text-xs font-bold bg-[#24a1dc] text-white hover:bg-[#1b7faf] shadow-md shadow-blue-500/20">
                      <Link href={`/provider/${provider.id}`}>Request Quote</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="group rounded-3xl bg-white border border-slate-200/80 p-6 hover:border-brand/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform font-black text-base">
                    01
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors mb-2">
                    Search & Compare
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Browse vetted local trade professionals, freelancers, and businesses. Filter by price, rating, and location.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Step 01</span>
                  <IconArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="group rounded-3xl bg-white border border-slate-200/80 p-6 hover:border-brand/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform font-black text-base">
                    02
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors mb-2">
                    Book or Request Quotes
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Book instant fixed-price appointment slots or submit a quote request with photos and requirements.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Step 02</span>
                  <IconArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="group rounded-3xl bg-white border border-slate-200/80 p-6 hover:border-brand/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform font-black text-base">
                    03
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors mb-2">
                    Work Done & Review
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    Communicate via secure messaging, track progress in your dashboard, and leave verified reviews.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Step 03</span>
                  <IconArrowRight className="h-4 w-4 text-brand group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVIDER CTA BANNER CARD */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark p-10 sm:p-14 text-white text-center shadow-2xl shadow-blue-900/20">
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
                  <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-white text-[#24a1dc] hover:bg-blue-50 text-xs uppercase tracking-widest shadow-lg border-0">
                    <Link href="/onboarding/provider">Start Provider Onboarding</Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-white text-[#24a1dc] hover:bg-blue-50 text-xs uppercase tracking-widest shadow-lg border-0">
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
