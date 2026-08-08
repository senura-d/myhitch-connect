"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { Button } from "@/components/ui/button";
import { getCategoryImage, getCategoryIcon } from "@/lib/category-meta";
import { CategoryContent } from "@/components/category/category-content";
import { IconArrowRight, IconSearch, IconSparkles } from "@tabler/icons-react";

/** A hairline-ruled figure. Tabular numerals so the column edges line up. */
function RegisterStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border-t border-white/25 pt-3 relative z-10">
      <div className="text-2xl font-black tabular-nums tracking-tight text-white sm:text-3xl">
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue-100/90">
        {label}
      </div>
    </div>
  );
}

export default function CategoryIndexPage() {
  const { data: taxonomy, isLoading } = useTaxonomy();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const active = taxonomy?.find((c) => c.id === activeId) ?? taxonomy?.[0];
  const activeIndex = taxonomy?.findIndex((c) => c.id === active?.id) ?? 0;

  const totalSubcategories =
    taxonomy?.reduce((sum, cat) => sum + cat.subcategories.length, 0) ?? 0;
  const totalServiceTypes =
    taxonomy?.reduce(
      (sum, cat) =>
        sum + cat.subcategories.reduce((n, sub) => n + sub.serviceTypes.length, 0),
      0
    ) ?? 0;

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#f8fafc] font-sans text-slate-900">
      <Header />

      <main className="flex-1 overflow-x-clip">
        {/* MASTHEAD WITH HERO WAVE GRAPHICS & BACKDROP (MATCHING LOGIN/HOMEPAGE) */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-white py-16 lg:py-24">
          {/* Abstract SVG Grid Lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="cat-grid"
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
            <rect width="100%" height="100%" fill="url(#cat-grid)" />
          </svg>

          {/* Curved Vector Waves */}
          <svg
            className="absolute -top-16 -left-16 w-120 h-120 opacity-30 pointer-events-none"
            viewBox="0 0 500 500"
            fill="none"
          >
            <path
              d="M0,250 C150,180 350,320 500,200 L500,0 L0,0 Z"
              fill="url(#catGrad1)"
            />
            <defs>
              <linearGradient id="catGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>



          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/25 mb-4 shadow-lg">
              <IconSparkles className="h-4 w-4 text-blue-200" />
              <span>THE SERVICE REGISTER</span>
            </div>

            <h1 className="mt-2 max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-wider text-white uppercase">
              EVERY TRADE WE <span className="underline underline-offset-8 decoration-white/50">AUDIT AND LIST</span>
            </h1>

            <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-blue-100/90 font-medium">
              Nobody appears on this register until their licence, registration and public liability cover have been checked against official sources.
            </p>

            {/* REGISTER STATS */}
            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <RegisterStat value={taxonomy?.length ?? 0} label="Categories" />
              <RegisterStat value={totalSubcategories} label="Subcategories" />
              <RegisterStat value={totalServiceTypes} label="Service types" />
              <RegisterStat value="100%" label="Licence audited" />
            </div>
          </div>
        </section>

        {/* REGISTER BODY */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading && (
            <div className="h-96 animate-pulse rounded-3xl bg-slate-100 border border-slate-200/60" />
          )}

          {taxonomy && active && (
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              {/* INDEX RAIL */}
              <aside className="hidden lg:block space-y-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-blue-500/5 h-fit">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block px-3 mb-2">
                  Directory Index
                </span>
                {taxonomy.map((cat, idx) => {
                  const isCurrent = cat.id === active.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveId(cat.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-left transition-all ${
                        isCurrent
                          ? "bg-[#1b76ff] text-white shadow-md shadow-blue-500/20"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${isCurrent ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                        {cat.subcategories.length}
                      </span>
                    </button>
                  );
                })}
              </aside>

              {/* CONTENT AREA */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-blue-500/5">
                <div className="mb-8 border-b border-slate-100 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-brand uppercase tracking-wider block mb-1">
                      Category #{activeIndex + 1}
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {active.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {active.description}
                    </p>
                  </div>
                  <Button asChild size="sm" className="rounded-full bg-[#1b76ff] hover:bg-[#145ed8] text-white font-bold text-xs uppercase tracking-wider px-5 shadow-md shrink-0">
                    <Link href={`/category/${active.slug}`}>
                      Explore {active.name} &rarr;
                    </Link>
                  </Button>
                </div>

                <CategoryContent category={active} />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
