"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  IconShieldCheck,
  IconCheck,
  IconMail,
  IconArrowRight,
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

export function Footer() {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("You're subscribed", {
      description: `We'll email ${email} when new verified providers join your area.`,
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-zinc-200 bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              New verified providers, every week
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
              A short weekly email when licence-checked professionals join in
              your area. No promotions, and you can leave any time.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <IconMail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 w-full border-0 border-l-4 border-l--brand bg-[#f4f6fa] pl-11 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring--brand rounded-r-xl rounded-l-none"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1b76ff] px-6 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#145ed8] hover:shadow-lg hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring--brand"
            >
              <span>Subscribe</span>
              <IconArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </button>
          </form>
        </div>

        {/* Logo above link columns */}
        <div className="border-t border-slate-200/80 pt-4 pb-2">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="MYHitch Connect"
              width={200}
              height={72}
              className="h-20 w-auto object-contain group-hover:opacity-80 transition-opacity duration-200"
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
