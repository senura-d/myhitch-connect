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
  // Size-specific dimensions
  const sizes = {
    sm: {
      container: "w-20 h-20",
      spinner: "w-16 h-16",
      logo: 32,
      logoClass: "w-8 h-8",
      textClass: "text-xs mt-3",
      auraClass: "w-10 h-10 blur-md",
    },
    md: {
      container: "w-36 h-36",
      spinner: "w-28 h-28",
      logo: 56,
      logoClass: "w-14 h-14",
      textClass: "text-sm mt-5 font-semibold tracking-wide",
      auraClass: "w-16 h-16 blur-lg",
    },
    lg: {
      container: "w-52 h-52",
      spinner: "w-40 h-40",
      logo: 80,
      logoClass: "w-20 h-20",
      textClass: "text-base mt-6 font-bold tracking-wider",
      auraClass: "w-24 h-24 blur-xl",
    },
  };

  const current = sizes[size];

  const content = (
    <div className="flex flex-col items-center justify-center">
      {/* Animation wrapper */}
      <div className={cn("relative flex items-center justify-center", current.container)}>
        {/* Breathing aura behind the logo */}
        <div 
          className={cn(
            "absolute rounded-full bg-brand/20 animate-pulse duration-1000",
            current.auraClass
          )} 
        />
        
        {/* Outer clockwise rotating ring */}
        <svg
          className={cn("absolute animate-spin", current.spinner)}
          style={{ animationDuration: "3s" }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#24a1dc" stopOpacity="1" />
              <stop offset="50%" stopColor="#35c6e6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#16688f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#outerGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="180 100"
          />
        </svg>

        {/* Inner counter-clockwise rotating ring */}
        <svg
          className={cn("absolute animate-spin", current.spinner)}
          style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16688f" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#24a1dc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#innerGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="90 120"
          />
        </svg>

        {/* Centered logo mark */}
        <div className={cn("relative flex items-center justify-center animate-pulse-subtle z-10", current.logoClass)}>
          <Image
            src="/myhitch-connect/logo-mark.png"
            alt="MYHitch"
            width={current.logo}
            height={current.logo}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Shimmering Text below the animation */}
      {showText && (
        <div className={cn("text-center select-none", current.textClass)}>
          <span className="relative inline-block overflow-hidden rounded">
            <span className="gradient-brand-text bg-size-200 animate-pulse font-sans font-bold">
              {text}
            </span>
          </span>
        </div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl transition-all duration-300",
          className
        )}
        {...props}
      >
        <div className="p-8 md:p-12 rounded-3xl bg-white/40 border border-white/50 shadow-2xl shadow-blue-500/5 max-w-sm w-full mx-4 flex flex-col items-center animate-fade-in">
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
