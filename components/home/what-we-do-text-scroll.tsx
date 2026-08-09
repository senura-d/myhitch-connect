"use client";

import React from "react";

export function WhatWeDoTextScroll() {
  return (
    <section id="what-we-do" className="py-14 bg-white border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Main Header / Statement */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-brand bg-brand-light px-3 py-1 rounded-full border border-brand/20 mb-3">
            100% Verified Australian Network
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            Connecting Australia with{" "}
            <span className="gradient-brand-text">100% Verified Local Experts</span> and Trade Professionals
          </h2>
        </div>

        {/* The Two Points: Short & Pure Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Point 1 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand/40 transition-colors">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              01 &bull; Compliance
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-2">
              Government Licence & Insurance Audits Required
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every trade professional and contractor is cross-referenced with Australian state registries (ABN, licence numbers, and background checks) with mandatory active public liability insurance.
            </p>
          </div>

          {/* Point 2 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand/40 transition-colors">
            <span className="text-[11px] font-bold text-brand uppercase tracking-widest block mb-2">
              02 &bull; Transparency
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-2">
              Authentic Work Portfolios & Verified Client Reviews
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Explore genuine portfolios of completed local jobs and authentic client reviews verified from real platform bookings — ensuring complete transparency with zero fake ratings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
