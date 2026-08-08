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
  IconShieldCheck,
  IconBox,
  IconUsers,
  IconHelpCircle,
  IconSettings,
  IconLogout,
  IconSearch,
  IconHome,
} from "@tabler/icons-react";
import { NotificationBell } from "@/components/ui/notification-panel";

const NAV = [
  { href: "/admin", label: "Admin Overview", icon: IconLayoutDashboard },
  { href: "/admin/providers/verification", label: "Verification Queue", icon: IconShieldCheck },
  { href: "/admin/listings", label: "All Service Listings", icon: IconBox },
  { href: "/admin/users", label: "User Directory", icon: IconUsers },
  { href: "/admin/support", label: "Support Audit", icon: IconHelpCircle },
  { href: "/admin/settings", label: "Platform Settings", icon: IconSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useSession();
  const user = session?.user;

  // Authorization check - only admin allowed
  React.useEffect(() => {
    if (session && user?.role !== "admin") {
      router.push("/");
    }
  }, [session, user, router]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-[#f4f6fa] text-slate-900 font-sans">
      {/* LEFT VERTICAL SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/80 hidden lg:flex flex-col p-6 space-y-8 shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/myhitch-connect/logo.png"
              alt="MYHitch Connect"
              width={160}
              height={56}
              className="h-16 md:h-20 w-auto object-contain"
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
                      ? "bg-[#1b76ff] text-white shadow-md shadow-blue-500/25"
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
        {/* TOP HEADER NAVIGATION BAR */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 min-w-0 max-w-xl">
            <div className="relative flex-1 min-w-0">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="admin-search"
                name="admin-search"
                aria-label="Search the administration system"
                placeholder="Search resources, users, listings..."
                className="h-9 border border-slate-200/80 bg-slate-50 pl-10! text-xs font-medium text-slate-800 placeholder:text-slate-400 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <NotificationBell role="admin" />

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
              variant="outline"
              className="rounded-full text-xs font-bold text-slate-700 border-slate-300 gap-1.5 h-9 px-3.5"
            >
              <Link href="/admin/providers/verification">
                <IconShieldCheck className="h-4 w-4" />
                {/* Label would push the row past the viewport on a phone */}
                <span className="hidden sm:inline">Verification Queue</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Mobile nav — sidebar is desktop-only */}
        <nav
          aria-label="Admin sections"
          className="lg:hidden bg-white border-b border-slate-200/80 px-4 py-2.5 flex gap-2 overflow-x-auto"
        >
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                  active ? "bg-[#1b76ff] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-350">
          {children}
        </main>
      </div>
    </div>
  );
}
