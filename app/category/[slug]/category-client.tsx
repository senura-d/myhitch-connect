"use client";

import React, { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { CategoryContent } from "@/components/category/category-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
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
        <section className="relative overflow-hidden py-16 text-white md:py-20">
          <HeroBackdrop images={[categoryMeta.image]} dim={55} />

          <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/60"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">{category.name}</span>
            </nav>

            <Badge className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20">
              {categoryMeta.tag}
            </Badge>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
              {category.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                <IconCheck className="h-3.5 w-3.5" /> Licence &amp; Registration Verified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                <IconShieldCheck className="h-3.5 w-3.5" /> Public Liability Insured
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                <IconShieldCheck className="h-3.5 w-3.5" /> 100% Background Checked
              </span>
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
