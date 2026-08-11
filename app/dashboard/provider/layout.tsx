"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/mock-api/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconLayoutDashboard,
  IconCheckbox,
  IconBox,
  IconShieldCheck,
  IconHelpCircle,
  IconSettings,
  IconLogout,
  IconSearch,
  IconPlus,
  IconHome,
} from "@tabler/icons-react";
import { NotificationBell } from "@/components/ui/notification-panel";
import { assetPath } from "@/lib/asset-path";

const NAV = [
  { href: "/dashboard/provider", label: "Overview", icon: IconLayoutDashboard },
  { href: "/dashboard/provider/bookings", label: "Client Bookings", icon: IconCheckbox },
  { href: "/dashboard/provider/services", label: "My Services", icon: IconBox },
  { href: "/dashboard/provider/verification", label: "Licence & ABN", icon: IconShieldCheck },
  { href: "/dashboard/provider/support", label: "Support Desk", icon: IconHelpCircle },
  { href: "/dashboard/provider/settings", label: "Business Settings", icon: IconSettings },
];

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useSession();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Overview owns the index route exactly; the rest match their own subtree.
  const isActive = (href: string) =>
    href === "/dashboard/provider" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen flex bg-[#f4f6fa] text-slate-900 font-sans">
      {/* LEFT VERTICAL SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/80 hidden lg:flex flex-col p-6 space-y-8 shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center">
            <Image
              src={assetPath("/logo-horizontal.png")}
              alt="MYHitch Connect"
              width={620}
              height={200}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="space-y-1.5">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    active
                      ? "bg-[#24a1dc] text-white shadow-md shadow-blue-500/25"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all text-left"
            >
              <IconLogout className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN BODY AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-xl">


            <div className="relative flex-1">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="provider-dashboard-search"
                name="provider-dashboard-search"
                aria-label="Search the dashboard"
                placeholder="Search jobs, listings, clients..."
                className="h-9 border border-slate-200/80 bg-slate-50 pl-10! text-xs font-medium text-slate-800 placeholder:text-slate-400 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell role="provider" />

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs gap-1.5 h-9 px-3.5"
            >
              <Link href="/">
                <IconHome className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#24a1dc] hover:bg-[#1b7faf] text-white font-bold text-xs gap-1.5 h-9 px-4 shadow-md shadow-blue-500/20"
            >
              <Link href="/dashboard/provider/services">
                <IconPlus className="h-4 w-4" />
                <span>New listing</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Mobile nav — the sidebar is desktop-only */}
        <nav
          aria-label="Dashboard sections"
          className="lg:hidden bg-white border-b border-slate-200/80 px-4 py-2.5 flex gap-2 overflow-x-auto"
        >
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                  active ? "bg-[#24a1dc] text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <main className="p-6 lg:p-8 space-y-6 max-w-350">{children}</main>
      </div>
    </div>
  );
}
