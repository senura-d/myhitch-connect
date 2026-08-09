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
} from "@tabler/icons-react";


/**
 * The footer band changes with the page. Repeating the same trust promise on
 * every route wastes the most-read strip in the footer, so each section gets
 * copy that matches what the visitor is actually doing there.
 */
type BandItem = {
  icon: typeof IconShieldCheck;
  term: string;
  detail: string;
  tag: string;
};

type Band = {
  eyebrow: string;
  heading: string;
  blurb: string;
  items: BandItem[];
};

const DEFAULT_BAND: Band = {
  eyebrow: "THE MYHITCH TRUST PROMISE",
  heading: "Every provider is checked before you meet them",
  blurb:
    "We verify trade licences, business registration and public liability cover against official Australian registers. Nobody is listed on MYHitch Connect until those checks pass.",
  items: [
    { icon: IconFileCheck, term: "Licence & ABN", detail: "Matched against state registers and the ABR.", tag: "Verified" },
    { icon: IconShieldCheck, term: "Public Liability", detail: "Cover confirmed before any listing goes live.", tag: "Insured" },
    { icon: IconRefresh, term: "Re-Checked", detail: "Automatically, before a policy or licence expires.", tag: "Continuous" },
  ],
};

const BANDS: { match: (path: string) => boolean; band: Band }[] = [
  {
    match: (p) => p.startsWith("/category"),
    band: {
      eyebrow: "EXPLORE SERVICES",
      heading: "Five categories. Every trade we cover.",
      blurb:
        "From licensed plumbers and electricians to accountants, trainers and wedding photographers — browse by category to see exactly which services sit under each one.",
      items: [
        { icon: IconLayoutGrid, term: "Browse by category", detail: "Five main categories, each with its own subcategories.", tag: "Structured" },
        { icon: IconFilter, term: "Filter as you go", detail: "Narrow a category down to the exact service you need.", tag: "Fast" },
        { icon: IconTargetArrow, term: "Straight to a quote", detail: "Every listing links to a verified provider who can price it.", tag: "Direct" },
      ],
    },
  },
  {
    match: (p) => p.startsWith("/search"),
    band: {
      eyebrow: "SEARCH PROVIDERS",
      heading: "Find the right provider near you",
      blurb:
        "Search the register by service and suburb. Every result is a business whose licence and insurance we have already checked, so there is nothing to vet yourself.",
      items: [
        { icon: IconSearch, term: "Search by service", detail: "Describe the job and see who can do it.", tag: "Simple" },
        { icon: IconMapPin, term: "Filter by suburb", detail: "Only providers who actually cover your area.", tag: "Local" },
        { icon: IconShieldCheck, term: "Pre-vetted results", detail: "Licence and insurance checked before listing.", tag: "Verified" },
      ],
    },
  },
  {
    match: (p) => p.startsWith("/about"),
    band: {
      eyebrow: "ABOUT MYHITCH CONNECT",
      heading: "Built to take the guesswork out of hiring",
      blurb:
        "We started MYHitch Connect because finding a tradesperson you can trust still meant asking around and hoping for the best. We do the checking, so you can just book.",
      items: [
        { icon: IconTargetArrow, term: "Our mission", detail: "Make every hire in Australia a verified one.", tag: "Purpose" },
        { icon: IconUsers, term: "Who we serve", detail: "Homeowners, businesses and community groups.", tag: "Nationwide" },
        { icon: IconHeartHandshake, term: "For providers", detail: "Verified businesses get found by ready customers.", tag: "Two-sided" },
      ],
    },
  },
  {
    match: (p) => p.startsWith("/contact"),
    band: {
      eyebrow: "CONTACT US",
      heading: "Talk to a real person",
      blurb:
        "Questions about a booking, a provider or your account? Our support team is based in Australia and answers every message.",
      items: [
        { icon: IconMail, term: "Email us", detail: "support@myhitchconnect.test — replies within 1 business day.", tag: "Anytime" },
        { icon: IconPhone, term: "Call us", detail: "1300 000 000 for urgent booking issues.", tag: "Direct" },
        { icon: IconClock, term: "Opening hours", detail: "Monday to Friday, 9am to 5pm AEST.", tag: "AEST" },
      ],
    },
  },
];

function bandForPath(pathname: string): Band {
  return BANDS.find((b) => b.match(pathname))?.band ?? DEFAULT_BAND;
}

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

export function Footer() {
  const pathname = usePathname();
  const band = bandForPath(pathname);

  return (
    <footer className="border-t border-zinc-200 bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Positioning statement — the promise the marketplace is built on */}
        <div className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand border border-brand/20">
              <IconSparkles className="h-3.5 w-3.5 text-brand" />
              <span>{band.eyebrow}</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl leading-tight">
              {band.heading}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium max-w-md">
              {band.blurb}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {band.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.term}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5"
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
