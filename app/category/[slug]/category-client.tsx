"use client";

import React, { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { CategoryContent } from "@/components/category/category-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconShieldCheck, IconCheck } from "@tabler/icons-react";

const CATEGORY_BANNERS: Record<string, { image: string; tag: string }> = {
  "home-trade-services": {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    tag: "Licensed Trades & Home Repairs",
  },
  "professional-services": {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tag: "Accounting, Legal & Business Advisors",
  },
  "personal-care-wellness": {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tag: "Fitness, Massage & Tutoring",
  },
  "events-creative": {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    tag: "Photography, Catering & Entertainment",
  },
  "community-government-adjacent": {
    image: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1200&q=80",
    tag: "Venue Hire & Community Services",
  },
};

export default function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: taxonomy } = useTaxonomy();
  const category = taxonomy?.find((c) => c.slug === slug);

  if (!taxonomy) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="h-64 rounded-2xl bg-zinc-100 animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-black">Category Not Found</h1>
          <p className="text-zinc-600 mt-2">The requested service category standard does not exist.</p>
          <Button asChild className="mt-6 bg-black text-white">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryMeta = CATEGORY_BANNERS[category.slug] || {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    tag: category.name,
  };
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans overflow-x-clip">
      <Header />

      <main className="flex-1 overflow-x-clip">
        {/* MODERN SPLIT HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-50 text-slate-900 py-12 md:py-16 border-b border-slate-200/70">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-4">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-brand">{category.name}</span>
                </nav>

                <Badge className="bg-brand/10 text-brand font-bold border border-brand/20 shadow-2xs px-3 py-1 rounded-full text-xs hover:bg-brand/15 transition-colors">
                  {categoryMeta.tag}
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  {category.name}
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed pt-1 max-w-lg">
                  {category.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs text-[11px] font-semibold">
                    <IconCheck className="h-3.5 w-3.5 text-brand" /> Licence & Registration Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs text-[11px] font-semibold">
                    <IconShieldCheck className="h-3.5 w-3.5 text-brand" /> Public Liability Insured
                  </span>
                </div>
              </div>

              {/* Image Content */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50">
                <img
                  src={categoryMeta.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-brand/10 to-transparent mix-blend-overlay" />
                
                {/* Floating Trust Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 p-3 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl shadow-lg">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <IconShieldCheck size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none">100% Verified</p>
                    <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Background Checked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER + LISTINGS + PROVIDERS */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <CategoryContent category={category} variant="page" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
