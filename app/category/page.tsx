"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
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
        {/* MASTHEAD WITH HERO BACKDROP */}
        <section className="relative overflow-hidden text-slate-900 py-14 lg:py-16 bg-white border-b border-slate-200/80">
          <HeroBackdrop
            images={[
              "/category-hero-backdrop.png",
            ]}
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-left space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-brand border border-brand/20 shadow-xs">
                <IconSparkles className="h-3.5 w-3.5 text-brand" />
                <span>THE SERVICE REGISTER</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-950 uppercase">
                EVERY TRADE WE <span className="gradient-brand-text">AUDIT AND LIST</span>
              </h1>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium max-w-xl">
                Nobody appears on this register until their licence, registration and public liability cover have been checked against official sources.
              </p>

              {/* REGISTER STATS */}
              <div className="pt-3 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 border-t border-slate-200/80">
                <div>
                  <div className="text-xl font-black tabular-nums tracking-tight text-slate-900 sm:text-2xl">
                    {taxonomy?.length ?? 0}
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Categories
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black tabular-nums tracking-tight text-slate-900 sm:text-2xl">
                    {totalSubcategories}
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Subcategories
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black tabular-nums tracking-tight text-slate-900 sm:text-2xl">
                    {totalServiceTypes}
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Service types
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black tabular-nums tracking-tight text-emerald-600 sm:text-2xl">
                    100%
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Licence audited
                  </div>
                </div>
              </div>
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
                          ? "bg-[#24a1dc] text-white shadow-md shadow-blue-500/20"
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
                  <Button asChild size="sm" className="rounded-full bg-[#24a1dc] hover:bg-[#1b7faf] text-white font-bold text-xs uppercase tracking-wider px-5 shadow-md shrink-0">
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
