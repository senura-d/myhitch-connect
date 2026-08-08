"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconSearch,
  IconUser,
  IconBuildingStore,
  IconUserCheck,
  IconMenu2,
  IconX,
  IconChevronDown,
  IconHome,
  IconLayoutGrid,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/mock-api/session";


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session, logout } = useSession();

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between gap-3 px-4 sm:px-6 lg:px-6 2xl:gap-4 2xl:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center group">
          <Image
            src="/logo.png"
            alt="MYHitch Connect"
            width={160}
            height={56}
            className="h-16 md:h-20 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            priority
          />
        </Link>

        {/* Desktop Navigation - ORDER: Home -> Explore Services -> Search Providers -> About Us -> Contact Us -> Dashboard (if logged in) */}
        <nav className="hidden xl:flex shrink-0 items-center gap-4 2xl:gap-6 whitespace-nowrap">
          {/* 1. Home */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-brand transition-colors"
          >
            <IconHome className="h-4 w-4 text-brand" />
            <span>Home</span>
          </Link>

          {/* 2. Explore Services — goes straight to the category hub */}
          <Link
            href="/category"
            className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-brand transition-colors"
          >
            <IconLayoutGrid className="h-4 w-4 text-brand" />
            <span>Explore Services</span>
          </Link>

          {/* 3. Search Providers */}
          <Link
            href="/search"
            className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-brand transition-colors"
          >
            <IconSearch className="h-4 w-4 text-brand" />
            <span>Search Providers</span>
          </Link>

          {/* 4. About Us */}
          <Link
            href="/about"
            className="text-sm font-semibold text-black hover:text-brand transition-colors"
          >
            <span>About Us</span>
          </Link>

          {/* 5. Contact Us */}
          <Link
            href="/contact"
            className="text-sm font-semibold text-black hover:text-brand transition-colors"
          >
            <span>Contact Us</span>
          </Link>

        </nav>

        {/* Actions & Session Controls */}
        <div className="hidden xl:flex shrink-0 items-center gap-4 whitespace-nowrap">
          {/* Dashboard Link (ONLY shown when logged in - specifically for user's role) */}
          {user?.role === "customer" && (
            <Link
              href="/dashboard/customer"
              className="flex items-center gap-1.5 text-sm font-bold text-brand hover:underline transition-colors mr-1"
            >
              <IconUser className="h-4 w-4 text-brand" />
              <span>Customer Dashboard</span>
            </Link>
          )}

          {user?.role === "provider" && (
            <Link
              href="/dashboard/provider"
              className="flex items-center gap-1.5 text-sm font-bold text-brand hover:underline transition-colors mr-1"
            >
              <IconBuildingStore className="h-4 w-4 text-brand" />
              <span>Provider Dashboard</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              href="/admin/providers/verification"
              className="flex items-center gap-1.5 text-sm font-bold text-brand hover:underline transition-colors mr-1"
            >
              <IconUserCheck className="h-4 w-4 text-brand" />
              <span>Admin Queue</span>
            </Link>
          )}

          {/* User Session Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-zinc-300 text-black font-semibold hover:border-brand rounded-full px-3 py-1.5 h-9">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="h-6 w-6 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                      <IconUser className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="max-w-30 truncate text-xs">{user.name}</span>
                  <IconChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 bg-white text-black border border-zinc-200 shadow-lg">
                <DropdownMenuLabel className="font-bold text-sm text-zinc-900 px-2.5 py-2">
                  {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "customer" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/customer" className="cursor-pointer flex items-center gap-2 text-black hover:bg-[#f0f9ff] hover:text-brand">
                      <IconUser className="h-4 w-4 text-brand" />
                      <span>Customer Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === "provider" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/provider" className="cursor-pointer flex items-center gap-2 text-black hover:bg-[#f0f9ff] hover:text-brand">
                      <IconBuildingStore className="h-4 w-4 text-brand" />
                      <span>Provider Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/providers/verification" className="cursor-pointer flex items-center gap-2 text-black hover:bg-[#f0f9ff] hover:text-brand">
                      <IconUserCheck className="h-4 w-4 text-brand" />
                      <span>Admin Verification Queue</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center gap-2 font-medium">
                  <IconLogout className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* One button, straight to the shared login page */
            <Button
              asChild
              size="sm"
              className="gap-1.5 rounded-full bg-[#1b76ff] hover:bg-[#145ed8] font-bold text-xs text-white uppercase tracking-wider shadow-md shadow-blue-500/20 px-5 transition-all hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Link href="/login">
                <IconLogin className="h-4 w-4 text-white" />
                <span>Log In</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="text-black"
          >
            {mobileMenuOpen ? <IconX className="h-6 w-6 text-black" /> : <IconMenu2 className="h-6 w-6 text-black" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            className="block text-sm py-2 font-bold text-black hover:text-brand border-b border-zinc-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            🏠 Home Page
          </Link>
          <Link
            href="/category"
            className="block text-sm py-2 font-bold text-black hover:text-brand border-b border-zinc-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            🧭 Explore Services
          </Link>

          <Link
            href="/search"
            className="block text-sm py-2 font-bold text-black hover:text-brand border-t border-zinc-100 pt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            🔎 Search Providers
          </Link>
          <Link
            href="/about"
            className="block text-sm py-1.5 font-bold text-black hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            ℹ️ About Us
          </Link>
          <Link
            href="/contact"
            className="block text-sm py-1.5 font-bold text-black hover:text-brand border-b border-zinc-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✉️ Contact Us
          </Link>

          {/* Conditional Dashboard Link in Mobile Drawer */}
          {user && (
            <div className="pt-2 border-t border-zinc-200 font-semibold text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Your Dashboard
            </div>
          )}
          {user?.role === "customer" && (
            <Link
              href="/dashboard/customer"
              className="block text-sm py-1.5 font-bold text-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              👤 Customer Dashboard
            </Link>
          )}
          {user?.role === "provider" && (
            <Link
              href="/dashboard/provider"
              className="block text-sm py-1.5 font-bold text-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏪 Provider Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              href="/admin/providers/verification"
              className="block text-sm py-1.5 font-bold text-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛡️ Admin Verification Queue
            </Link>
          )}

          {/* Login/Logout in Mobile Drawer */}
          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
            {user ? (
              <Button
                variant="outline"
                className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Log Out ({user.name})
              </Button>
            ) : (
              <Button
                asChild
                className="w-full justify-center bg-brand font-semibold text-white"
              >
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Log In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
