"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/mock-api/session";
import {
  DEMO_USERS,
  findDemoUserByEmail,
  createSignupUser,
  dashboardPathForRole,
} from "@/lib/mock-api/demo-users";
import {
  IconUser,
  IconBuildingStore,
  IconShieldCheck,
  IconCheck,
  IconAlertCircle,
  IconLock,
  IconMail,
  IconHome,
} from "@tabler/icons-react";
import type { Role } from "@/types/user";

type SignupRole = Exclude<Role, "admin">;

const ROLE_CHOICES: {
  role: SignupRole;
  title: string;
  blurb: string;
  icon: React.ReactNode;
}[] = [
  {
    role: "customer",
    title: "I need a service",
    blurb: "Book verified local professionals and request quotes.",
    icon: <IconUser className="h-4 w-4" />,
  },
  {
    role: "provider",
    title: "I provide services",
    blurb: "List your business and take bookings once verified.",
    icon: <IconBuildingStore className="h-4 w-4" />,
  },
];

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useSession();

  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "signin";
  const initialRole: SignupRole =
    searchParams.get("role") === "provider" ? "provider" : "customer";

  const [tab, setTab] = React.useState<"signin" | "signup">(initialTab);
  const [signupRole, setSignupRole] = React.useState<SignupRole>(initialRole);
  const [keepSignedIn, setKeepSignedIn] = React.useState(true);

  const [signinEmail, setSigninEmail] = React.useState("");
  const [signinPassword, setSigninPassword] = React.useState("");
  const [signinError, setSigninError] = React.useState<string | null>(null);

  const [signupName, setSignupName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = findDemoUserByEmail(signinEmail);

    if (!user) {
      setSigninError(
        "No account matches that email. Try one of the instant demo profiles below."
      );
      return;
    }

    setSigninError(null);
    login(user);
    toast.success(`Signed in as ${user.name}`);
    router.push(dashboardPathForRole(user.role));
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = createSignupUser(signupRole, signupName, signupEmail);
    login(user);
    toast.success(
      signupRole === "provider"
        ? "Provider account created — finish verification to go live"
        : "Account created successfully"
    );
    router.push(dashboardPathForRole(user.role));
  };

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-900/15 border border-slate-200/60 grid grid-cols-1 lg:grid-cols-12 min-h-145">
      {/* LEFT VISUAL PANEL WITH PHOTOGRAPHIC BACKDROP */}
      <div className="relative hidden lg:flex lg:col-span-6 flex-col justify-between p-10 overflow-hidden bg-slate-900 text-white">
        {/* Backdrop Image - Positioned to show the right side (person on laptop & digital nodes) */}
        <Image
          src="/myhitch-connect/login-hero-backdrop.png"
          alt="MYHitch Connect"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-right"
        />

        {/* Scrim/Overlay for text contrast while keeping illustration vivid */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/45 to-slate-950/75" />
        <div className="absolute inset-0 bg-brand/15 mix-blend-overlay" />

        {/* Top Header */}
        <Link href="/" className="relative z-10 inline-flex items-center">
          <Image
            src="/myhitch-connect/logo-horizontal-white.png"
            alt="MYHitch Connect"
            width={620}
            height={200}
            className="h-9 w-auto object-contain transition-opacity duration-200 hover:opacity-90 drop-shadow-md"
            priority
          />
        </Link>

        {/* Center Content */}
        <div className="relative z-10 my-auto text-center px-4">
          <p className="text-sm font-medium text-blue-100 tracking-wide mb-1.5 drop-shadow-xs">
            {tab === "signin" ? "Nice to see you again" : "Start your journey today"}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black tracking-wider text-white uppercase leading-none drop-shadow-md">
            {tab === "signin" ? "WELCOME BACK" : "JOIN MYHITCH"}
          </h2>
          <div className="mx-auto my-4 h-1 w-12 rounded-full bg-white/90 shadow-xs" />
          <p className="mx-auto max-w-xs text-xs text-blue-100/90 leading-relaxed font-medium drop-shadow-xs">
            {tab === "signin"
              ? "Access your provider dashboard, manage service listings, track active bookings, and request custom quotes in one platform."
              : "Create your account to book verified Australian service providers or list your business on the trusted marketplace."}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-100/85">
          <span>&copy; {new Date().getFullYear()} MYHitch Connect</span>
          <span className="flex items-center gap-1 font-medium">
            <IconShieldCheck className="h-3.5 w-3.5 text-blue-200" />
            Verified & Encrypted
          </span>
        </div>
      </div>

      {/* RIGHT WHITE FORM PANEL */}
      <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-12 bg-white relative z-10">
        {/* Header and Mode Toggle */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand tracking-tight">
              {tab === "signin" ? "Login Account" : "Create Account"}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              {tab === "signin"
                ? "Enter your credentials to access your account."
                : "Join MYHitch Connect as a customer or service provider."}
            </p>
          </div>
          <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200/60 shrink-0">
            <button
              type="button"
              onClick={() => {
                setTab("signin");
                setSigninError(null);
              }}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                tab === "signin"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                tab === "signup"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* SIGN IN FORM */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="signin-email" className="sr-only">
                Email ID
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email ID"
                  value={signinEmail}
                  onChange={(e) => {
                    setSigninEmail(e.target.value);
                    setSigninError(null);
                  }}
                  className="h-12 border border-slate-200/90 bg-slate-50/80 pl-4 pr-10 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-xl"
                  aria-invalid={signinError ? true : undefined}
                />
                <IconMail className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="signin-password" className="sr-only">
                Password
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Password"
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                  className="h-12 border border-slate-200/90 bg-slate-50/80 pl-4 pr-10 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-xl"
                />
                <IconLock className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Checkbox and links */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-500 font-medium hover:text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                />
                <span className="flex items-center gap-1">
                  <IconCheck className="h-3.5 w-3.5 text-brand" />
                  Keep me signed in
                </span>
              </label>

              <button
                type="button"
                onClick={() => setTab("signup")}
                className="font-semibold text-brand hover:underline"
              >
                Already a member?
              </button>
            </div>

            {signinError && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-xs font-medium text-red-700"
              >
                <IconAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                {signinError}
              </p>
            )}

            <Button
              type="submit"
              className="mt-2 h-12 w-full rounded-full bg-[#24a1dc] hover:bg-[#1b7faf] text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.99]"
            >
              SUBSCRIBE
            </Button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Select Account Type
              </span>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_CHOICES.map((choice) => {
                  const isSelected = signupRole === choice.role;
                  return (
                    <button
                      key={choice.role}
                      type="button"
                      onClick={() => setSignupRole(choice.role)}
                      className={`flex flex-col gap-1 p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-brand bg-brand-light text-brand shadow-xs"
                          : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{choice.title}</span>
                        {isSelected && <IconCheck className="h-3.5 w-3.5 text-brand" />}
                      </div>
                      <span className="text-[10px] text-slate-500 line-clamp-2">
                        {choice.blurb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <Input
                name="name"
                required
                autoComplete={signupRole === "provider" ? "organization" : "name"}
                placeholder={signupRole === "provider" ? "Business Name" : "Full Name"}
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="h-11 border border-slate-200/90 bg-slate-50/80 pl-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <Input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email ID"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="h-11 border border-slate-200/90 bg-slate-50/80 pl-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Password (min 8 chars)"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="h-11 border border-slate-200/90 bg-slate-50/80 pl-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 rounded-xl"
              />
            </div>

            {signupRole === "provider" && (
              <p className="flex items-center gap-2 rounded-xl border border-blue-100 bg-brand-light p-2.5 text-[11px] text-slate-700">
                <IconShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                Provider credentials and insurance are verified before going live.
              </p>
            )}

            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-[#24a1dc] hover:bg-[#1b7faf] text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/35"
            >
              CREATE ACCOUNT
            </Button>
          </form>
        )}

        {/* DEMO PROFILES SECTION */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Instant Demo Access
            </span>
            <span className="text-[10px] text-brand font-medium">Click to fill</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  setTab("signin");
                  setSigninEmail(user.email);
                  setSigninPassword("demo-password");
                  setSigninError(null);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-brand-light hover:border-brand transition-all text-center group"
              >
                <span className="text-[11px] font-bold text-slate-800 group-hover:text-brand truncate w-full">
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 group-hover:text-brand/80">
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8fafc] font-sans text-slate-900">
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-white hover:text-brand hover:border-brand/30"
      >
        <IconHome className="h-3.5 w-3.5 text-brand" />
        <span>Back to Home</span>
      </Link>
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10">
        <Suspense
          fallback={
            <div className="h-140 w-full max-w-5xl animate-pulse rounded-3xl bg-white shadow-xl" />
          }
        >
          <LoginPageInner />
        </Suspense>
      </main>
    </div>
  );
}
