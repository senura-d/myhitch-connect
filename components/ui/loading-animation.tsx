"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  text?: string;
  fullPage?: boolean;
}

export function LoadingAnimation({
  size = "md",
  showText = true,
  text = "Connecting you...",
  fullPage = false,
  className,
  ...props
}: LoadingAnimationProps) {
  // Size-specific dimensions & scales
  const sizes = {
    sm: {
      container: "w-24 h-24",
      hub: "w-14 h-14 rounded-2xl p-2",
      logo: 32,
      logoClass: "w-8 h-8",
      textClass: "text-xs mt-3.5",
      trackWidth: "w-24",
      subClass: "text-[10px]",
    },
    md: {
      container: "w-36 h-36",
      hub: "w-20 h-20 rounded-3xl p-3",
      logo: 48,
      logoClass: "w-12 h-12",
      textClass: "text-sm mt-5",
      trackWidth: "w-36",
      subClass: "text-xs",
    },
    lg: {
      container: "w-48 h-48",
      hub: "w-26 h-26 rounded-3xl p-4",
      logo: 64,
      logoClass: "w-16 h-16",
      textClass: "text-base mt-6",
      trackWidth: "w-48",
      subClass: "text-xs",
    },
  };

  const current = sizes[size];

  const content = (
    <div className="flex flex-col items-center justify-center select-none">
      {/* 3D Animated Orbital Pod */}
      <div className={cn("relative flex items-center justify-center", current.container)}>
        {/* Ambient Multi-Layer Radial Glow */}
        <div className="absolute inset-2 rounded-full bg-linear-to-tr from-cyan-400/25 via-brand/35 to-blue-600/20 blur-xl animate-glow-breathe pointer-events-none" />
        <div className="absolute inset-6 rounded-full bg-brand/30 blur-md animate-pulse pointer-events-none" />

        {/* Outer Continuous Glowing Arc */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "2.6s", animationTimingFunction: "linear" }}
          viewBox="0 0 120 120"
        >
          <defs>
            <linearGradient id="neonGlowOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="60%" stopColor="#24a1dc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
            <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#neonGlowOuter)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="210 120"
            filter="url(#glowBlur)"
          />
          {/* Orbiting Satellite Light Bead */}
          <circle cx="60" cy="8" r="3" fill="#38bdf8" className="shadow-lg shadow-cyan-400" />
        </svg>

        {/* Middle Cyber-Dashed Counter-Rotating Ring */}
        <svg
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin-reverse"
          style={{ animationDuration: "3.8s" }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="cyberRing" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16688f" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#24a1dc" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#cyberRing)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="8 6"
            fill="none"
          />
          {/* Reverse Orbiting Pip */}
          <circle cx="50" cy="8" r="2" fill="#24a1dc" />
        </svg>

        {/* Inner Subtle Pulsing Boundary Ring */}
        <div className="absolute inset-4 rounded-full border border-brand/20 animate-pulse pointer-events-none" />

        {/* Central Glassmorphic Floating Pod with Logo */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center bg-white/90 backdrop-blur-md border border-white shadow-xl shadow-blue-900/10 transition-transform duration-500 animate-pulse-subtle",
            current.hub
          )}
        >
          <div className={cn("relative flex items-center justify-center", current.logoClass)}>
            <Image
              src="/myhitch-connect/logo-stacked.png"
              alt="MYHitch Connect"
              width={current.logo}
              height={current.logo}
              priority
              className="object-contain drop-shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Modern Typography and Sleek Progress Scanner */}
      {showText && (
        <div className={cn("flex flex-col items-center text-center", current.textClass)}>
          {/* Subtitle / Dynamic Status with Animated Dots */}
          <div className={cn("mt-1 font-semibold text-slate-500 flex items-center gap-1", current.subClass)}>
            <span>{text}</span>
            <span className="inline-flex gap-0.5 ml-0.5">
              <span className="h-1 w-1 rounded-full bg-brand animate-[dot-bounce_1.4s_infinite_0ms]" />
              <span className="h-1 w-1 rounded-full bg-brand animate-[dot-bounce_1.4s_infinite_200ms]" />
              <span className="h-1 w-1 rounded-full bg-brand animate-[dot-bounce_1.4s_infinite_400ms]" />
            </span>
          </div>

          {/* Sleek Scanning Light-Bar Track */}
          <div className={cn("mt-3 h-1 overflow-hidden rounded-full bg-slate-100 border border-slate-200/60 relative", current.trackWidth)}>
            <div className="absolute inset-y-0 w-1/2 rounded-full bg-linear-to-r from-transparent via-brand to-cyan-400 animate-beam-travel" />
          </div>
        </div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/80 backdrop-blur-2xl transition-all duration-500",
          className
        )}
        {...props}
      >
        <div className="p-8 md:p-12 rounded-3xl bg-white/70 border border-white/80 shadow-2xl shadow-blue-500/10 max-w-sm w-full mx-4 flex flex-col items-center">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)} {...props}>
      {content}
    </div>
  );
}
