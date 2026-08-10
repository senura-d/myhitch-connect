"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconShieldCheck,
  IconSparkles,
  IconUserCheck,
  IconStar,
  IconClock,
  IconHeartHandshake,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      <Header />

      <main className="flex-1">
        {/* HERO BANNER SECTION */}
        <section className="relative overflow-hidden text-slate-900 py-14 lg:py-16 bg-white border-b border-slate-200/80">
          <HeroBackdrop
            images={[
              "/about-hero-backdrop.png",
            ]}
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-left space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-brand border border-brand/20 shadow-xs">
                <IconSparkles className="h-3.5 w-3.5 text-brand" />
                <span>About MYHitch Connect</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 uppercase leading-tight">
                BUILDING AUSTRALIA&apos;S MOST TRUSTED <span className="gradient-brand-text">SERVICE DIRECTORY</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed font-medium">
                Connecting Australian homeowners, businesses, and communities with 100% verified, licensed, and insured trade and professional service experts.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION & VISION CARDS */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 sm:p-10 rounded-3xl bg-brand-light border border-brand/30 space-y-4 shadow-xl shadow-blue-500/5 hover:border-brand transition-all">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/25">
                  <IconHeartHandshake className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Our Core Mission</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To eliminate guesswork when hiring local service providers. We establish a gold standard for trust by auditing every provider’s trade credentials, licenses, identity, and public liability insurance before they connect with customers.
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 space-y-4 shadow-xl shadow-blue-500/5 hover:border-brand transition-all">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/25">
                  <IconSparkles className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Our Vision</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower independent Australian service businesses and skilled tradespeople with digital tools to grow, showcase verified portfolios, and provide seamless, transparent instant booking experiences for customers nationwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MARKETPLACE STATS SECTION */}
        <section className="py-20 bg-brand-dark text-white border-b border-blue-900 relative overflow-hidden">
          <svg
            className="absolute inset-0 h-full w-full opacity-15 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="stats-grid"
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
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-blue-200 font-mono">500+</div>
                <div className="text-xs font-extrabold text-blue-100 uppercase tracking-widest">Verified Providers</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-white font-mono">100%</div>
                <div className="text-xs font-extrabold text-blue-100 uppercase tracking-widest">Licence Audited</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-blue-200 font-mono">50,000+</div>
                <div className="text-xs font-extrabold text-blue-100 uppercase tracking-widest">Completed Bookings</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-white font-mono">4.9★</div>
                <div className="text-xs font-extrabold text-blue-100 uppercase tracking-widest">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE PILLARS SECTION */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge className="bg-brand-light text-brand border border-brand/30 font-extrabold uppercase tracking-wider text-xs px-3 py-1">
                The MYHitch Promise
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Why Customers & Providers Trust MYHitch</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Four foundational pillars that safeguard quality and ensure smooth project delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <IconShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">1. Licence Verification</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every trade professional’s state qualification license is verified against official government registries.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <IconUserCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">2. Insurance Compliance</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We check active public liability insurance coverage up to $5M/$10M policy limits for your peace of mind.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <IconStar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">3. Authentic Reviews</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ratings and reviews originate exclusively from verified completed service transactions.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-brand transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <IconClock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">4. Fast Direct Booking</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Instant scheduling and transparent quotes with zero hidden markups or surprise fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#35c6e6] via-[#24a1dc] to-brand-dark p-10 sm:p-14 text-white text-center shadow-2xl shadow-blue-900/20">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
                  READY TO GET STARTED WITH MYHITCH CONNECT?
                </h2>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                  Whether you need to hire a licensed expert or expand your service business, MYHitch Connect is ready for you.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Button asChild size="lg" className="rounded-full bg-white text-[#24a1dc] hover:bg-blue-50 font-extrabold text-xs uppercase tracking-widest shadow-lg border-0 px-8">
                    <Link href="/search">
                      <span>Browse Service Directory</span>
                      <IconArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-full bg-white text-[#24a1dc] hover:bg-blue-50 font-extrabold text-xs uppercase tracking-widest shadow-lg border-0 px-8">
                    <Link href="/onboarding/provider">
                      <span>Join as a Provider</span>
                    </Link>
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
