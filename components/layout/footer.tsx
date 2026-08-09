"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  IconShieldCheck,
  IconCheck,
  IconFileCheck,
  IconRefresh,
  IconSparkles,
  IconLayoutGrid,
  IconSearch,
  IconMapPin,
  IconFilter,
  IconUsers,
  IconTargetArrow,
  IconMail,
  IconPhone,
  IconClock,
  IconHeartHandshake,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";

const SERVICE_CATEGORIES = [
  { href: "/category/home-trade-services", label: "Home & Trade Services" },
  { href: "/category/professional-services", label: "Professional Services" },
  { href: "/category/personal-care-wellness", label: "Personal Care & Wellness" },
  { href: "/category/events-creative", label: "Events & Creative" },
  { href: "/category/community-government-adjacent", label: "Community & Non-Profit" },
  { href: "/category", label: "View all categories" },
];

const FOR_CUSTOMERS = [
  { href: "/search", label: "Find a provider" },
  { href: "/search", label: "Book a service" },
  { href: "/dashboard/customer", label: "Customer dashboard" },
];

const FOR_PROVIDERS = [
  { href: "/dashboard/provider", label: "Provider dashboard" },
  { href: "/admin/providers/verification", label: "Verification queue" },
];

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
  { href: "/", label: "Home" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link, i) => (
          <li key={`${link.href}-${i}`}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-none focus-visible:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================================
   1. HOME FOOTER BAND: Verified Trust Shield & Security Guarantee
   ========================================================================= */
function HomeFooterBand() {
  return (
    <div className="rounded-3xl bg-linear-to-br from-slate-50 via-blue-50/40 to-slate-50 border border-blue-100/90 p-6 sm:p-8 lg:p-10 shadow-sm my-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-center">
        <div className="lg:col-span-5 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand border border-brand/20">
            <IconShieldCheck className="h-3.5 w-3.5 text-brand" />
            <span>THE MYHITCH TRUST PROMISE</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl leading-tight">
            Every provider is checked before you meet them
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium max-w-md">
            We verify trade licences, business registration and public liability cover against official Australian registers. Nobody is listed on MYHitch Connect until those checks pass.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {[
            { icon: IconFileCheck, term: "Licence & ABN", detail: "Matched against state registers and the ABR.", tag: "Verified" },
            { icon: IconShieldCheck, term: "Public Liability", detail: "Cover confirmed before any listing goes live.", tag: "Insured" },
            { icon: IconRefresh, term: "Re-Checked", detail: "Automatically, before a policy or licence expires.", tag: "Continuous" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.term}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors shadow-xs">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-brand transition-colors">
                      {item.term}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600 font-medium">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. EXPLORE SERVICES FOOTER BAND: Industry Quick-Launch Matrix
   ========================================================================= */
function CategoryFooterBand() {
  return (
    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-[#10364f] to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-900/10 my-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-cyan-300 border border-white/20">
              <IconLayoutGrid className="h-3.5 w-3.5 text-cyan-300" />
              <span>EXPLORE ALL CATEGORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Five core sectors. Over 100+ verified trades.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/85 font-normal leading-relaxed">
              Whether you need urgent home repairs, tax accounting, personal wellness, or wedding photography, jump straight to your industry below.
            </p>
          </div>
          <Link
            href="/search"
            className="self-start lg:self-center inline-flex items-center gap-2 rounded-full bg-white text-brand-dark font-extrabold text-xs px-5 py-2.5 shadow-md transition-all hover:bg-brand-light hover:text-brand hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Search All Providers</span>
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick Category Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { href: "/category/home-trade-services", name: "Home & Trades", count: "30+ Services" },
            { href: "/category/professional-services", name: "Professional", count: "24+ Services" },
            { href: "/category/personal-care-wellness", name: "Care & Wellness", count: "18+ Services" },
            { href: "/category/events-creative", name: "Events & Creative", count: "16+ Services" },
            { href: "/category/community-government-adjacent", name: "Community", count: "12+ Services" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex flex-col justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all group backdrop-blur-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </span>
                <IconArrowUpRight className="h-3.5 w-3.5 text-blue-200 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-[10px] text-blue-200/80 font-medium mt-2 block">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. SEARCH PROVIDERS FOOTER BAND: Live Discovery 3-Step Roadmap
   ========================================================================= */
function SearchFooterBand() {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-lg shadow-blue-500/5 my-8 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand border border-brand/20">
            <IconSearch className="h-3.5 w-3.5 text-brand" />
            <span>HOW SEARCH WORKS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find the right verified provider in 3 easy steps
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
            <IconShieldCheck className="h-4 w-4 text-emerald-600" />
            100% Pre-Vetted
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-brand font-extrabold text-xs border border-blue-200">
            <IconClock className="h-4 w-4 text-brand" />
            Avg Response &lt; 15m
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            step: "01",
            title: "Describe Your Job",
            desc: "Search by trade, keyword, or specialized task to view matching verified listings.",
            icon: IconSearch,
          },
          {
            step: "02",
            title: "Filter by Location",
            desc: "Enter your postcode to see verified specialists who actively service your suburb.",
            icon: IconMapPin,
          },
          {
            step: "03",
            title: "Direct Quote & Booking",
            desc: "Compare ratings, verify credentials, and request quotes directly with zero middlemen.",
            icon: IconTargetArrow,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative rounded-2xl bg-slate-50/80 border border-slate-200/80 p-5 transition-all hover:bg-white hover:border-brand/40 hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-black text-slate-300 group-hover:text-brand transition-colors">
                  {item.step}
                </span>
                <div className="h-8 w-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-xs">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   4. ABOUT US FOOTER BAND: Mission Spotlight & Impact Metrics
   ========================================================================= */
function AboutFooterBand() {
  return (
    <div className="rounded-3xl bg-linear-to-br from-slate-900 via-[#103b57] to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-950/15 my-8 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-cyan-300 border border-white/20">
            <IconUsers className="h-3.5 w-3.5 text-cyan-300" />
            <span>OUR AUSTRALIAN MARKETPLACE PROMISE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Building Australia&apos;s most trusted service network
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 font-normal leading-relaxed">
            We started MYHitch Connect to eliminate the guesswork in hiring trades and professionals. Transparent verification, zero fake accounts, and fair marketplace policies.
          </p>
          <div className="pt-2">
            <Link
              href="/login?tab=signup&role=provider"
              className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-dark text-white font-extrabold text-xs px-5 py-2.5 shadow-md transition-all active:scale-95"
            >
              <span>Join as a Verified Provider</span>
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {[
            {
              title: "100% Australian",
              subtitle: "Designed & operated for Australian households & businesses nationwide.",
              icon: IconUsers,
            },
            {
              title: "Strict Screening",
              subtitle: "Every ABN, licence, and public liability policy verified before listing.",
              icon: IconFileCheck,
            },
            {
              title: "Community Driven",
              subtitle: "Empowering honest local trades to grow their business with trust.",
              icon: IconHeartHandshake,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 flex flex-col justify-between hover:bg-white/15 transition-all"
              >
                <div className="h-8 w-8 rounded-xl bg-brand/30 border border-brand/40 flex items-center justify-center text-cyan-300 mb-3 shadow-xs">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-blue-100/80 mt-1 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. CONTACT US FOOTER BAND: Interactive Support Hub & Direct Access
   ========================================================================= */
function ContactFooterBand() {
  return (
    <div className="rounded-3xl bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 border border-blue-100/80 p-6 sm:p-8 lg:p-10 shadow-sm my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand border border-brand/20">
            <IconPhone className="h-3.5 w-3.5 text-brand" />
            <span>DIRECT SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Here to assist you across Australia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Need urgent help with a booking, provider verification, or account questions? Reach our local Australian team directly.
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <a
            href="mailto:support@myhitchconnect.com.au"
            className="group flex flex-col justify-between p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-brand/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                <IconMail className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-extrabold uppercase text-brand bg-brand-light px-2 py-0.5 rounded-full">
                Email
              </span>
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block group-hover:text-brand transition-colors">
                support@myhitchconnect.com.au
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                1 business day response
              </span>
            </div>
          </a>

          <a
            href="tel:1300000000"
            className="group flex flex-col justify-between p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-brand/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                <IconPhone className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Phone
              </span>
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block group-hover:text-brand transition-colors">
                1300 000 000
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Direct booking support
              </span>
            </div>
          </a>

          <div className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-slate-200/90">
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 rounded-xl bg-brand-light text-brand flex items-center justify-center shadow-xs">
                <IconClock className="h-4 w-4" />
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">
                Mon - Fri, 9am - 5pm
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                Australian Eastern Time (AEST)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN FOOTER COMPONENT
   ========================================================================= */
export function Footer() {
  const pathname = usePathname() || "";
  const cleanPath = pathname.replace(/^\/myhitch-connect/, "");

  let renderedBand = <HomeFooterBand />;
  if (cleanPath.includes("category")) {
    renderedBand = <CategoryFooterBand />;
  } else if (cleanPath.includes("search")) {
    renderedBand = <SearchFooterBand />;
  } else if (cleanPath.includes("about")) {
    renderedBand = <AboutFooterBand />;
  } else if (cleanPath.includes("contact")) {
    renderedBand = <ContactFooterBand />;
  }

  return (
    <footer className="border-t border-zinc-200 bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic page-specific top band */}
        {renderedBand}

        {/* Logo above link columns */}
        <div className="border-t border-slate-200/80 pt-4 pb-2">
          <Link href="/" className="flex items-center group">
            <Image
              src="/myhitch-connect/logo-horizontal.png"
              alt="MYHitch Connect"
              width={620}
              height={200}
              className="h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-8 md:grid-cols-4">
          <FooterColumn title="Service categories" links={SERVICE_CATEGORIES} />
          <FooterColumn title="For customers" links={FOR_CUSTOMERS} />
          <FooterColumn title="For providers" links={FOR_PROVIDERS} />
          <FooterColumn title="Company" links={COMPANY} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-slate-200/80 py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} MYHitch Connect. Australia&apos;s
            verified services marketplace.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-zinc-600">
            <span className="inline-flex items-center gap-1.5">
              <IconShieldCheck aria-hidden="true" className="h-4 w-4 text-brand" />
              Licence verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconCheck aria-hidden="true" className="h-4 w-4 text-brand" />
              Public liability insured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
